# Plan: cuentas de usuario y planes múltiples

Objetivo final: cada usuario tiene su sesión (sus datos le siguen entre
dispositivos) y dentro de ella puede tener **varios planes**, pudiendo
modificar el actual o crear uno nuevo desde el selector de perfiles.

## Estado de la decisión

**Se implementa la Fase 1 (local) ahora. La Fase 2 (Supabase) queda aplazada.**

La Fase 1 no necesita servidor y ya deja el modelo con su forma definitiva, así
que cubre lo que se quería a corto plazo —varios planes, crear, modificar,
borrar— sin dar de alta nada.

Y como se decidió que **cada uno usa su móvil** (§5.4), en local **no hace
falta ningún concepto de usuario**: un dispositivo es una persona, los círculos
del modal son planes y ya está. La cuenta, cuando llegue, solo envuelve lo que
ya exista.

Lo que queda pendiente mientras tanto, conviene tenerlo presente: **no hay
copia de seguridad ni multi-dispositivo**. Si se pierde el móvil o se borran
los datos del sitio, se pierde todo. Hoy ya ocurre, así que no es un retroceso
—pero era la motivación original y sigue sin resolverse.

> **Regla que hay que respetar desde ya, aunque no haya servidor:** los planes
> nuevos nacen con **UUID**, nunca con ids correlativos (`plan2`, `plan3`).
> Cuesta una línea hoy y evita que mañana dos planes distintos creados en dos
> dispositivos colisionen al subir a la misma cuenta. Los planes fijos
> (`sergio`, `eva`, `gely`, `mia`) conservan su id legible porque ya son las
> claves de `gym_calendar_data_<id>`.

---

## 1. De dónde partimos

| Pieza | Estado hoy | Problema |
|---|---|---|
| Hosting | GitHub Pages, estático | No hay servidor donde autenticar |
| Backend | Solo Apps Script del feedback (`no-cors`, respuesta opaca) | No sirve como base de datos |
| Estado | `localStorage` **síncrono** repartido por ~6.700 líneas | Volverlo remoto obliga a reescribir medio `app.js` |
| Planes | `PROFILES` con 3 personas fijas + **un solo** `gym_custom_plan` | Crear un plan pisa el anterior |

### El lío conceptual de fondo

Hoy **"perfil" significa dos cosas a la vez**:

- una **persona** — `sergio`, `eva`, `gely` (código fijo en `app.js:1982`)
- un **plan** — `mia` / "Mi plan", el que genera el asistente

Todo el trabajo consiste en separar esos dos conceptos:
**usuario** (cuenta) → **N planes**.

### Claves de `localStorage` en uso

```
gym_calendar_data_<perfil>   estado: progress, completions, swaps, customDays…
gym_custom_plan              el único plan generado
gym_active_profile           perfil seleccionado
gym_onboarding_done          tutorial completado
gym_whatsnew_seen            versión del modal de novedades
gym_custom_plan_removed      bandera de migración antigua
gym_feedback_queue           cola de feedback sin enviar
```

---

## 2. Principio de diseño: local-first, no "mover los datos al servidor"

**`localStorage` sigue siendo la fuente de verdad de la sesión.** La nube es
una copia que se sincroniza por detrás.

Motivos:

1. **Offline.** Es una app de gimnasio; muchos sótanos no tienen cobertura.
   Si marcar una serie dependiera de la red, la app sería inservible justo
   cuando más se usa.
2. **Coste de refactor.** Con local-first, las ~6.700 líneas que leen y
   escriben estado **no cambian**. Solo se añade una capa de sync encima.
3. **Ya existe el patrón en el proyecto.** `flushFeedbackQueue()` hace
   exactamente esto: guarda en local, reintenta al abrir la app. La capa de
   sync es la misma idea, mejor formalizada.

---

## 3. Modelo de datos objetivo

### Local

```
gym_plans        { version: 1, plans: { <planId>: PlanEntry } }
gym_active_plan  <planId>
gym_calendar_data_<planId>   (formato actual, sin cambios)
```

```js
PlanEntry = {
  id: 'uuid-v4',           // estable; sobrevive al login (clave para el sync)
  name: 'Mi plan',
  initial: 'M',            // letra del círculo
  builtin: false,          // true para sergio/eva/gely
  createdAt, updatedAt,
  plan: { phases, trainingDays, daysLabel, answers }
}
```

> **Decisión importante:** el estado sigue en `gym_calendar_data_<planId>`.
> Para los planes fijos el `planId` es `sergio` / `eva` / `gely`, así que
> **los datos existentes siguen donde están y no hay que tocarlos**.
> La migración se vuelve casi un no-op.

### Supabase

Dos tablas, y la razón de separarlas importa:

```sql
-- Definición del plan. Cambia poco (solo al crearlo o rehacerlo).
create table plans (
  id          text not null,                  -- el mismo id generado en local
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  initial     text,
  plan        jsonb not null,                 -- phases, trainingDays, daysLabel, answers
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (user_id, id)
);

-- Progreso. Cambia en CADA ejercicio marcado.
create table plan_state (
  plan_id     text not null,
  user_id     uuid not null references auth.users(id) on delete cascade,
  state       jsonb not null,                 -- progress, completions, swaps, finished…
  updated_at  timestamptz not null default now(),
  primary key (user_id, plan_id),
  foreign key (user_id, plan_id) references plans(user_id, id) on delete cascade
);
```

> **La clave primaria es compuesta a propósito.** Con la duplicación de §5.3,
> varias cuentas acaban teniendo un plan con el mismo id local (`eva`, por
> ejemplo). Si `id` fuese la clave por sí solo, la segunda cuenta en subirlo
> chocaría con la primera o la sobrescribiría. Con `(user_id, id)` cada copia
> es una fila independiente.
>
> Por lo mismo, `id` es `text` y no `uuid`: los planes fijos usan ids legibles
> (`sergio`, `eva`, `gely`) que ya son las claves de `gym_calendar_data_<id>`
> en local, y cambiarlos obligaría a migrar el estado existente sin ganar nada.

Van separadas porque **el progreso se escribe muchísimo más que la definición**.
En una sola tabla, marcar una serie reenviaría el plan entero (fases,
ejercicios, instrucciones) en cada toque.

El plan va en `jsonb` a propósito: su forma la decide el generador y cambia
entre versiones. La base de datos no necesita entenderla.

### Row Level Security — esto no es opcional

La clave pública de Supabase (`anon key`) va **en el JavaScript, a la vista**.
Eso es normal y seguro **solo si RLS está activo**. Sin estas cuatro líneas,
cualquiera con la clave lee los datos de todos:

```sql
alter table plans      enable row level security;
alter table plan_state enable row level security;

create policy "solo mis planes" on plans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "solo mi progreso" on plan_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Verificación obligatoria antes de desplegar: con la sesión de un usuario A,
un `select` sobre `plans` debe devolver **solo** las filas de A.

---

## 4. Fase 1 — Multi-plan en local (sin backend)

No necesita servidor y ya deja el modelo con la forma definitiva, así que la
capa de sync de la Fase 2 se escribe **una sola vez**.

### 4.1 Registro de planes

Nuevo bloque que sustituye al `PROFILES` fijo:

- `loadPlans()` / `savePlans()` sobre `gym_plans`.
- `PROFILES` pasa a **derivarse**: plantillas fijas (`sergio`, `eva`, `gely`,
  con sus `phases` de código) + planes del registro. Se mantiene el nombre
  `PROFILES` para no tocar los ~30 puntos que lo leen.
- `migratePlansRegistry()`: si no existe `gym_plans`, lo construye desde los
  builtin + `gym_custom_plan` (con id `mia`, conservando su estado) y copia
  `gym_active_profile` → `gym_active_plan`. **No borra las claves viejas**,
  para poder revertir el despliegue sin pérdida de datos. Mismo patrón que
  `migrateOldData()` (`app.js:1988`).

> **La migración no adivina de quién es cada plan.** Registra **todos** los
> que encuentre (`sergio`, `eva`, `gely`, `mia`) y deja que cada uno borre lo
> que no le sirva. Es exactamente lo que ya ve hoy el usuario en el modal, así
> que no cambia nada de golpe, y evita heurísticas de propiedad que acertarían
> a medias. El precio de simplificarlo así es que **borrar tiene que ser fácil
> y seguro** (§4.5).

### 4.2 Funciones a tocar

| Función | Línea aprox. | Cambio |
|---|---|---|
| `PROFILES` | 1982 | Pasa a derivarse del registro |
| `CUSTOM_PROFILE_ID` / `CUSTOM_PLAN_KEY` | 1979-80 | Solo para migración; dejan de usarse |
| `getStorageKey()` | 2029 | `'gym_calendar_data_' + activePlanId` (sin cambio real) |
| `loadCustomPlan()` / `saveCustomPlan()` | 6022-31 | → `getPlan(id)` / `upsertPlan(entry)` |
| `installCustomPlan()` | ~5892 | Registra **cualquier** plan, no solo `mia` |
| `addCustomProfileOption()` | 6340 | → `renderPlanOptions()`, pinta N planes + botón "+" |
| `updateProfileUI()` | 6355 | Igual, leyendo del registro |
| `switchProfile()` | 6405 | → `switchPlan(planId)` (se deja alias) |
| `openRoutineWizard()` | 5977 | Nuevo parámetro `opts` (ver abajo) |
| `needsOnboarding()` | 6042 | Comprueba el registro en vez de `gym_custom_plan` |
| Handler `wizardSave` | ~6208 | Crea plan nuevo o actualiza el existente según el modo |

### 4.3 Asistente: crear vs modificar

Hoy `openRoutineWizard(onboarding)` **siempre** recarga las respuestas
guardadas, así que "modificar mi plan actual" ya funciona casi entero — lo
único que falla es que al guardar **sobrescribe el plan único**.

Nueva firma:

```js
openRoutineWizard(onboarding, opts)
// opts.mode === 'create'  → respuestas en blanco, genera planId nuevo
// opts.mode === 'edit'    → carga answers de opts.planId y lo actualiza
```

- "Cambiar mi objetivo" (botón actual) → `{ mode: 'edit', planId: activo }`
- Botón "+" (nuevo) → `{ mode: 'create' }`

### 4.4 UI: el botón "+"

En `index.html` los tres perfiles están **escritos a mano** (líneas 53-64);
pasan a renderizarse desde el registro. Al final de
`.profile-modal-options` se añade:

```html
<button class="profile-option profile-option-new">
  <span class="profile-option-initial">+</span>
  <span class="profile-option-name">Nuevo plan</span>
</button>
```

Mismo círculo que los perfiles, con borde discontinuo y color apagado para
que se lea como "añadir" y no como un plan más.

El "+" abre dos caminos, no uno:

- **Responder el cuestionario** → asistente en modo `create`.
- **Empezar desde una plantilla** → `sergio` / `eva` / `gely`, que son
  constantes del código. Esto es lo que hace que borrarlas sea reversible.

### 4.5 Borrar y renombrar planes

Al registrar todos los planes en la migración (§4.1), **borrar deja de ser un
extra y pasa a ser parte del flujo principal**: es la forma en que cada uno se
queda solo con lo suyo.

**Interacción.** Un botón de editar (lápiz) en la cabecera del modal que
revela una `×` sobre cada círculo. Descartada la pulsación larga: en una PWA
de iOS no se descubre sola y además choca con el menú contextual del sistema.

**Confirmación que dice qué se pierde.** Este es el punto crítico. Hoy los
tres perfiles conviven en el `localStorage` del mismo dispositivo, así que
quien borre "Eva" se lleva por delante el historial de Eva. El diálogo tiene
que ser concreto, no genérico:

```
¿Borrar el plan «Eva»?
Se perderán 47 entrenamientos registrados y 12 semanas de progreso.
Esta acción no se puede deshacer.
```

El recuento sale de contar `state.completions` y `state.progress` de ese plan.
Un "¿seguro?" a secas no da la información necesaria para decidir.

**Qué se borra:** la entrada de `gym_plans`, su `gym_calendar_data_<planId>` y
—en Fase 2— sus filas en `plans` y `plan_state`.

**Qué es recuperable:** las plantillas fijas siempre vuelven desde el "+".
El progreso, no. Por eso el aviso.

**No se puede quedar sin planes:** si se borra el último, la app vuelve al
asistente de onboarding en vez de quedarse en un estado vacío sin salida.

**Renombrar:** en el mismo modo edición, tocando el nombre. Necesario en
cuanto haya tres planes generados que se llamen todos "Mi plan".

---

## 5. Fase 2 — Cuentas y sincronización

### 5.1 Login opcional, no obligatorio

**Recomendación:** la app sigue funcionando sin cuenta, y el login se ofrece
como "inicia sesión para sincronizar entre dispositivos".

Motivo: forzar el registro rompería el uso actual de quien ya tiene datos
locales, y obligaría a Eva/Gely a crear cuenta para algo que hoy ya les
funciona. Además mantiene la app utilizable sin cobertura desde el primer
arranque.

### 5.2 Piezas

- `<script>` de `@supabase/supabase-js` por CDN + `supabaseUrl` / `anonKey`.
  Sin build step, encaja con el proyecto tal cual está.
- **Auth por enlace mágico** (email, sin contraseñas que gestionar) y/o
  Google. Para un grupo familiar, el enlace mágico sobra.
- `syncPush()`: `saveState()` marca el plan como *sucio*; con un debounce de
  ~3-5 s se sube. Nunca bloquea la UI.
- `syncPull()`: al arrancar y al volver del segundo plano, compara
  `updated_at` por plan.
- **Resolución de conflictos: last-write-wins por `updated_at`.** Para un
  usuario con uno o dos dispositivos es suficiente; CRDTs aquí serían
  sobreingeniería.
- **Offline:** si falla la subida, se queda marcado como sucio y se reintenta
  al volver la conexión — igual que `flushFeedbackQueue()`.

### 5.3 Primer login: subir lo local

Los planes ya tienen `id` estable (UUID) desde la Fase 1, así que subirlos es
un `upsert` directo. Si el mismo usuario entra desde dos dispositivos con
planes creados por separado, son planes distintos legítimos y ambos suben —
no hay colisión de ids ni duplicados falsos.

**Mismo criterio que en la Fase 1: cada cuenta se lleva una copia de todo y
luego borra lo que le sobre.** No se pregunta nada en el alta.

Cada persona entra en su móvil, recibe los cuatro planes y se queda con el
suyo. Las copias son **independientes**: a partir del primer login, la copia
de `eva` que tiene Sergio y la que tiene Eva son dos filas distintas que ya no
se hablan. Es una foto fija, no un plan compartido.

**El coste real de duplicar es despreciable.** Un plan son ~50KB de JSON y el
progreso bastante menos; cuatro planes en cuatro cuentas no llegan a 2MB
frente a los 500MB del plan gratuito. No hay motivo para optimizar esto.

Y resuelve el riesgo de §4.5 casi del todo: una vez Eva ha entrado una vez,
que Sergio borre su copia le da igual. **La ventana de riesgo es solo entre el
despliegue de la Fase 2 y el primer login de cada uno**, así que el diálogo de
borrado debe avisar más fuerte cuando el plan todavía no está sincronizado en
ninguna cuenta.

### 5.3.1 Cuándo sincroniza exactamente

**Las lecturas nunca tocan la red.** La UI pinta siempre desde `localStorage`
de forma síncrona. Sin sesión o sin cobertura, la app se comporta igual que
hoy; el sync solo añade copias por detrás.

**Subida (`syncPush`)**

| Disparador | Por qué |
|---|---|
| Tras `saveState()`, con debounce de ~5 s | Marcar tres ejercicios de una superserie no debe ser tres subidas |
| `visibilitychange` → oculto | **El más importante en iOS**: la PWA se suspende al salir y puede no volver. Aquí se sube ya, sin esperar al debounce |
| `pagehide` | Cierre de pestaña. En iOS `beforeunload` no es fiable, por eso no se usa |
| Evento `online` | Vaciar lo que quedó pendiente al recuperar cobertura |
| Al arrancar, después del pull | Si quedó algo sin subir de la sesión anterior |

**Bajada (`syncPull`)**

| Disparador | Por qué |
|---|---|
| Al arrancar, cuando la sesión ya está resuelta | Traer lo que se hizo en otro dispositivo |
| `visibilitychange` → visible, si han pasado >5 min desde el último pull | Sin el umbral, alternar apps machacaría el servidor |
| Evento `online` | Reconciliar al volver la red |

Nada de *polling*. Nada de sincronizar en cada render.

**Regla de conflictos: lo sucio local siempre gana.**

El orden al arrancar importa, y es lo que evita el fallo clásico de "el sync
me ha borrado el entrenamiento":

1. Cargar local y pintar. Instantáneo, sin esperar a nadie.
2. Pull del servidor.
3. Por cada plan:
   - si hay cambios locales **sin subir** → gana el local y se sube;
   - si el local está limpio → se acepta el remoto si su `updated_at` es mayor.

Nunca se sobrescribe un estado con contenido con uno vacío: una instalación
recién hecha que aún no ha bajado nada no puede vaciar los datos buenos.

**Qué se guarda para sobrevivir a que iOS mate la app**

La marca de "pendiente de subir" vive en `localStorage`, no en memoria:

```
gym_sync_pending   { plans: [<planId>…], states: [<planId>…] }
```

Dos listas porque son dos tablas: la definición del plan cambia poco (crear,
rehacer, renombrar) y el progreso cambia en cada ejercicio marcado.

Es el mismo patrón que ya usa `gym_feedback_queue` con `flushFeedbackQueue()`
(`app.js:6621`): guardar en local, reintentar al volver a abrir. Aquí solo se
formaliza.

**Si falla, no se avisa a mitad de entrenamiento.** El plan sigue marcado como
pendiente y se reintenta en el siguiente disparador. Un indicador discreto
(*al día / sin conexión / subiendo*) en el modal de planes basta para dar
confianza sin interrumpir.

### 5.4 Una cuenta por dispositivo

**Decidido: cada uno usa su móvil con su cuenta.** No se soportan varias
sesiones simultáneas ni cambio rápido de usuario.

Esto simplifica bastante —un solo token, una sola caché, sin selector de
cuentas— y además **deshace del todo el lío conceptual del §1**: a partir de
aquí los círculos del modal son **planes y solo planes**, y la persona es la
cuenta. El título del modal deja de ser *"¿Quién entrena hoy?"* y pasa a algo
como *"Tus planes"*.

Consecuencia a asumir: en un dispositivo compartido, cambiar de persona exige
cerrar sesión y abrir otra. Es más fricción que hoy, pero es el precio de que
los datos de cada uno le sigan a su móvil, que es lo que se busca.

---

## 6. Punto de corte del despliegue

Dos opciones, ninguna bloqueante:

- **Desplegar Fase 1 sola** — Sergio/Eva/Gely crean planes en local; al llegar
  la Fase 2, el primer login los sube. Riesgo bajo gracias a los ids estables.
- **Desplegar las dos juntas** — evita esa migración intermedia, pero tarda
  más en verse algo.

Recomendación: **desplegar la Fase 1 sola**. Aporta valor ya (crear varios
planes es útil sin cuentas) y la migración posterior es un `upsert`.

---

## 7. Riesgos

| Riesgo | Mitigación |
|---|---|
| **RLS mal configurado deja los datos a la vista** | Verificar con dos usuarios antes de desplegar. Es el fallo clásico |
| Perder datos de quien ya usa la app | La migración no borra claves viejas; los planes fijos conservan su `gym_calendar_data_<id>` |
| Refactor grande en un `app.js` de 6.700 líneas | Fase 1 no toca la lógica de entrenamiento, solo el registro de planes y el modal |
| El sync pisa datos buenos con datos viejos | `updated_at` por plan; nunca subir un estado vacío sobre uno con contenido |
| Acumular planes sin poder borrarlos | Renombrar/borrar entra en la Fase 1, no se deja para después |
| **Borrar un plan ajeno antes de que su dueño haya entrado destruye su historial** | Diálogo con recuento (§4.5) y aviso reforzado si el plan no está sincronizado en ninguna cuenta. Tras el primer login de cada uno, el riesgo desaparece |
| Quedarse sin ningún plan tras borrar | Si se borra el último, vuelve al onboarding en vez de a una pantalla vacía |
| Colisión de ids al duplicar planes entre cuentas | Clave primaria compuesta `(user_id, id)` en las dos tablas |
| Más fricción al cambiar de persona en un dispositivo compartido | Asumido: una cuenta por dispositivo (§5.4). Cada uno en su móvil |

---

## 8. Orden de trabajo propuesto

1. Registro de planes + migración que registra **todos** los planes (sin UI)
2. Modal dinámico + modo edición: borrar (con recuento de historial) y renombrar
3. Botón "+": cuestionario o plantilla
4. Asistente con modos crear/editar
5. **Desplegar Fase 1**
6. Proyecto Supabase, esquema con clave compuesta, RLS y verificación con dos usuarios
7. Login opcional + `syncPush` / `syncPull`
8. Primer login: subir una copia de todos los planes locales
9. Modal pasa a "Tus planes" (los círculos ya son solo planes)
10. **Desplegar Fase 2**
