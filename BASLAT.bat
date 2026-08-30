@echo off
chcp 65001 >nul
title faturadekont
cd /d "%~dp0"

echo.
echo  faturadekont - yerel sunucu baslatiliyor...
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  [HATA] Node.js bulunamadi.
  echo  Kurulum: https://nodejs.org  ^(LTS, v20+^)
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%v in ('node -p "process.versions.node.split('.')[0]"') do set NODE_MAJOR=%%v
if %NODE_MAJOR% LSS 20 (
  echo  [HATA] Node.js 20 veya uzeri gerekli. Mevcut: 
  node -v
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo  Ilk kurulum: bagimliliklar yukleniyor ^(bir kez, 1-2 dk^)...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  [HATA] npm install basarisiz. Internet baglantinizi kontrol edin.
    pause
    exit /b 1
  )
  echo.
)

if not exist .env (
  copy .env.example .env >nul
)

echo  Tarayici acilacak: http://127.0.0.1:3301
echo  Kapatmak icin bu pencereyi kapatin veya Ctrl+C
echo.

start "" cmd /c "ping -n 3 127.0.0.1 >nul && start http://127.0.0.1:3301"

node server.js

echo.
pause
