$gitPath = "C:\Program Files\Git\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    $gitPath = (Get-Command git -ErrorAction SilentlyContinue).Source
}
Set-Location $PSScriptRoot
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  A0 MSS KPI Dashboard — Pushing to GitHub Repository" -ForegroundColor Green
Write-Host "  Repo: https://github.com/JeevaCybersec-JSE/A0-MSS----" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Cyan
& $gitPath push -u origin main
Read-Host -Prompt "Press Enter to exit"
