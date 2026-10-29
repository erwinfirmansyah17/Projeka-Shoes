$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

# Use the newest Laragon Node installation when Node is not on PATH.
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    $nodeFolder = Get-ChildItem -LiteralPath 'D:/laragon/bin/nodejs' -Directory -ErrorAction SilentlyContinue |
        Where-Object { Test-Path (Join-Path $_.FullName 'node.exe') } |
        Sort-Object { [version]((& (Join-Path $_.FullName 'node.exe') --version).TrimStart('v')) } -Descending |
        Select-Object -First 1
    if (-not $nodeFolder) { throw 'Node.js tidak ditemukan. Buka Terminal Laragon dengan Node.js 22.12+ atau instal Node.js.' }
    $env:Path = $nodeFolder.FullName + ';' + $env:Path
}

if (-not (Test-Path 'node_modules')) { throw 'Jalankan npm install terlebih dahulu di Terminal Laragon.' }
& npm.cmd run dev -- --port 5173
exit $LASTEXITCODE
