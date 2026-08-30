@echo off
chcp 65001 >nul
cd /d "%~dp0"

set ZIPNAME=faturadekont.zip
if exist "%ZIPNAME%" del "%ZIPNAME%"

echo.
echo  Paylasim paketi olusturuluyor: %ZIPNAME%
echo  (node_modules dahil DEGIL - kullanici ilk acilista kurar)
echo.

powershell -NoProfile -Command ^
  "$root = Get-Location; " ^
  "$items = @('data','public','src','server.js','package.json','package-lock.json','ecosystem.config.cjs','.env.example','.gitignore','BASLAT.bat','baslat.sh','README.md','LICENSE','KURULUM.txt'); " ^
  "$existing = $items | Where-Object { Test-Path (Join-Path $root $_) }; " ^
  Compress-Archive -Path $existing -DestinationPath (Join-Path $root '%ZIPNAME%') -Force"

if exist "%ZIPNAME%" (
  echo.
  echo  Tamam: %CD%\%ZIPNAME%
  for %%A in ("%ZIPNAME%") do echo  Boyut: %%~zA byte
) else (
  echo  [HATA] Zip olusturulamadi.
)

echo.
pause
