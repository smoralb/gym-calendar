# =============================================================
# serve.ps1
#
# Servidor estático para desarrollo local. La app no tiene build:
# son ficheros planos, así que basta con servirlos por HTTP.
#
# Se usa HttpListener (incluido en Windows) en vez de `python -m
# http.server` o `npx serve` para no depender de nada instalado.
#
# Hay que abrirla por http:// y no con doble clic en index.html:
# con file:// fallan el fetch del dataset y el service worker.
#
# Uso:  powershell -ExecutionPolicy Bypass -File tools\serve.ps1
#       powershell -ExecutionPolicy Bypass -File tools\serve.ps1 -Port 8080
#
# Ctrl+C para parar.
# =============================================================

param([int]$Port = 8000)

$ErrorActionPreference = 'Stop'

$root   = Split-Path -Parent $PSScriptRoot
$prefix = "http://localhost:$Port/"

$mime = @{
  '.html'='text/html; charset=utf-8'; '.js'='application/javascript; charset=utf-8';
  '.css'='text/css; charset=utf-8';   '.json'='application/json; charset=utf-8';
  '.png'='image/png';  '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.gif'='image/gif';
  '.svg'='image/svg+xml'; '.webp'='image/webp'; '.ico'='image/x-icon';
  '.webmanifest'='application/manifest+json'; '.mp4'='video/mp4'; '.woff2'='font/woff2'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
try {
  $listener.Start()
} catch {
  Write-Host "No se pudo abrir $prefix (¿puerto ocupado?). Prueba con -Port 8080." -ForegroundColor Red
  throw
}

Write-Host "Sirviendo $root" -ForegroundColor Green
Write-Host "  -> $prefix   (Ctrl+C para parar)" -ForegroundColor Green

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
    if ([string]::IsNullOrEmpty($rel)) { $rel = 'index.html' }

    $path = Join-Path $root ($rel -replace '/', '\')
    # No salir de la carpeta del repo con rutas tipo ../../
    $full = [System.IO.Path]::GetFullPath($path)
    $inRoot = $full.StartsWith([System.IO.Path]::GetFullPath($root), 'OrdinalIgnoreCase')

    if ($inRoot -and (Test-Path $path) -and -not (Get-Item $path).PSIsContainer) {
      $ext = [System.IO.Path]::GetExtension($path).ToLower()
      $ct  = $mime[$ext]
      if (-not $ct) { $ct = 'application/octet-stream' }
      $bytes = [System.IO.File]::ReadAllBytes($path)
      $ctx.Response.ContentType = $ct
      # Sin caché: al recargar se ven los cambios sin pelearse con el navegador.
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host ("  200  /{0}" -f $rel)
    } else {
      $ctx.Response.StatusCode = 404
      Write-Host ("  404  /{0}" -f $rel) -ForegroundColor DarkYellow
    }
    $ctx.Response.Close()
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
