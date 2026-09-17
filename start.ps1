Set-Location $PSScriptRoot
Write-Host "Starting MSS KPI Dashboard Server..." -ForegroundColor Green
Start-Process "http://localhost:4321"
.\node.exe server.js
