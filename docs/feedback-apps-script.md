# Feedback: recibir ideas y errores en una hoja de cálculo

El botón flotante 💬 de la app envía cada reporte a un **Google Apps Script**
publicado como Web App, que escribe una fila en una hoja de cálculo tuya.
Ni servidor, ni SDK, ni claves en el cliente.

## 1. Crea la hoja

1. Ve a [sheets.new](https://sheets.new) y llámala, por ejemplo, `Gym Calendar — Feedback`.
2. En la fila 1 pon las cabeceras:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Fecha | Tipo | Texto | Versión | Perfil | Dispositivo |

## 2. Pega el script

En la hoja: **Extensiones → Apps Script**. Borra lo que haya y pega esto:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) { d = {}; }

  sheet.appendRow([
    d.date ? new Date(d.date) : new Date(),
    d.type || '',
    String(d.text || '').slice(0, 1000),
    d.version || '',
    d.profile || '',
    d.userAgent || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Guarda (💾).

## 3. Publícalo

**Implementar → Nueva implementación → Tipo: Aplicación web**

- *Ejecutar como*: **Yo** (tu cuenta)
- *Quién tiene acceso*: **Cualquier usuario**

Acepta los permisos que pida y copia la URL que te da, del tipo
`https://script.google.com/macros/s/AKfy…/exec`.

> "Cualquier usuario" solo permite **añadir filas** a través de este script.
> Nadie puede leer la hoja ni ejecutar otra cosa.

## 4. Pega la URL en la app

En `app.js`, en la sección `FEEDBACK`:

```javascript
var FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfy…/exec';
```

Listo. Mientras esté vacío, la app guarda los reportes en `localStorage` y los
reintenta al arrancar, así que no se pierde nada de lo que se escriba antes de
configurarlo.

## Detalles de implementación

- El envío usa `mode: 'no-cors'` con `Content-Type: text/plain`. Apps Script no
  responde al preflight `OPTIONS`, así que esta es la única forma fiable de
  escribir desde el navegador. A cambio, la respuesta es **opaca**: la app no
  puede leer si el script tuvo éxito, solo si la petición salió de la máquina.
- Si falla la red, el reporte se guarda en la cola `gym_feedback_queue`
  (máximo 20) y se reintenta en el siguiente arranque.
- El service worker ignora las peticiones que no son `GET`, así que el envío
  nunca pasa por caché.

## Si actualizas el script

Cada cambio necesita **Implementar → Gestionar implementaciones → ✏️ →
Versión: Nueva versión**. Si creas una implementación nueva desde cero, la URL
cambia y hay que actualizarla en `app.js`.
