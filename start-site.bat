@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel% neq 0 (
  echo Python is not installed. Please open index.html directly or install Python.
  pause
  exit /b 1
)
start "Moments Screens" http://127.0.0.1:8765/
python -m http.server 8765
