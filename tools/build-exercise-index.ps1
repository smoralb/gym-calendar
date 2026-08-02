# =============================================================
# build-exercise-index.ps1
#
# Descarga data/exercises.json (~17 MB) del dataset público
#   https://github.com/smoralb/exercises-dataset
# y genera data/exercises-index.json (~0.9 MB): sólo los campos
# que necesita la app, con las instrucciones únicamente en español.
#
# El GIF y la miniatura NO se copian al repo: se sirven bajo demanda
# desde jsDelivr (ver EXERCISE_DB.CDN en app.js).
#
# Uso:  powershell -ExecutionPolicy Bypass -File tools\build-exercise-index.ps1
# =============================================================

$ErrorActionPreference = 'Stop'

$repoRoot  = Split-Path -Parent $PSScriptRoot
$outDir    = Join-Path $repoRoot 'data'
$outFile   = Join-Path $outDir 'exercises-index.json'
$sourceUrl = 'https://raw.githubusercontent.com/smoralb/exercises-dataset/main/data/exercises.json'
$tmpFile   = Join-Path ([System.IO.Path]::GetTempPath()) 'exercises-full.json'

if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

Write-Host "Descargando $sourceUrl ..."
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri $sourceUrl -OutFile $tmpFile
Write-Host "  $((Get-Item $tmpFile).Length) bytes"

Add-Type -AssemblyName System.Web.Extensions
$ser = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$ser.MaxJsonLength  = [int]::MaxValue
$ser.RecursionLimit = 200

$all = $ser.DeserializeObject([System.IO.File]::ReadAllText($tmpFile))
Write-Host "Ejercicios en el dataset: $($all.Count)"

$out = New-Object System.Collections.ArrayList
foreach ($e in $all) {
  $steps = @()
  if ($e['instruction_steps'] -and $e['instruction_steps']['es']) { $steps = @($e['instruction_steps']['es']) }
  [void]$out.Add([ordered]@{
    id  = [string]$e['id']          # "0289"
    mid = [string]$e['media_id']    # "9zX4kQp"  -> images/0289-9zX4kQp.jpg
    n   = [string]$e['name']        # nombre en inglés (el dataset sólo trae EN)
    bp  = [string]$e['body_part']
    eq  = [string]$e['equipment']
    tg  = [string]$e['target']
    mg  = [string]$e['muscle_group']
    sm  = @($e['secondary_muscles'])
    es  = $steps                    # instrucciones paso a paso en español
  })
}

$json = $ser.Serialize(@($out))
[System.IO.File]::WriteAllText($outFile, $json, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "Escrito $outFile ($((Get-Item $outFile).Length) bytes)"

Remove-Item $tmpFile -Force
