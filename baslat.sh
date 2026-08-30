#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo ""
echo " faturadekont - yerel sunucu başlatılıyor..."
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo " [HATA] Node.js bulunamadı. Kurulum: https://nodejs.org (LTS, v20+)"
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo " [HATA] Node.js 20 veya üzeri gerekli. Mevcut: $(node -v)"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo " İlk kurulum: bağımlılıklar yükleniyor (bir kez)..."
  npm install
  echo ""
fi

if [ ! -f .env ]; then
  cp .env.example .env
fi

echo " Tarayıcı: http://127.0.0.1:3301"
echo " Kapatmak için Ctrl+C"
echo ""

(
  sleep 2
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://127.0.0.1:3301" >/dev/null 2>&1 || true
  elif command -v open >/dev/null 2>&1; then
    open "http://127.0.0.1:3301" || true
  fi
) &

node server.js
