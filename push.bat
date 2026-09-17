@echo off
set "PATH=C:\Program Files\Git\cmd;%PATH%"
cd /d "%~dp0"
echo ============================================================
echo   A0 MSS KPI Dashboard — Pushing to GitHub Repository
echo   Repo: https://github.com/JeevaCybersec-JSE/A0-MSS----
echo ============================================================
echo.
git push -u origin main
echo.
pause
