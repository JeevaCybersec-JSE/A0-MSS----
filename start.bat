@echo off
cd /d "%~dp0"
echo Starting MSS KPI Dashboard Server...
start "" "http://localhost:4321"
.\node.exe server.js
pause
