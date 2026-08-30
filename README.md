# faturadekont

E-ticaret faturası ve banka dekont oluşturma aracı. Bilgisayarınızda yerel web sunucusu olarak çalışır; veritabanı gerekmez.

## Hızlı başlangıç (Windows)

1. [Node.js 20 LTS](https://nodejs.org) kurun
2. Bu klasörü açın
3. **`BASLAT.bat`** dosyasına çift tıklayın
4. Tarayıcıda açılır: **http://127.0.0.1:3301**

Mac / Linux: terminalde `./baslat.sh` (ilk seferde `chmod +x baslat.sh`)

## Manuel kurulum

```bash
npm install
npm start
```

Tarayıcı: http://127.0.0.1:3301

## Sayfalar

| Adres | Açıklama |
|-------|----------|
| `/fatura` | E-ticaret faturası (15 platform) |
| `/dekont-olustur` | Banka dekont + e-Arşiv |
| `/api/health` | Sunucu durumu (JSON) |

## Gereksinimler

- Node.js **20.18** veya üzeri
- ~100 MB disk alanı
- İlk kurulumda internet (`npm install` için)

## Yapılandırma

`.env.example` dosyasını `.env` olarak kopyalayın (BASLAT.bat bunu otomatik yapar):

```env
PORT=3301
HOST=127.0.0.1
```

| Değişken | Açıklama |
|----------|----------|
| `PORT` | Sunucu portu (varsayılan 3301) |
| `HOST` | `127.0.0.1` = sadece bu bilgisayar (önerilen) |

Port meşgulse `.env` içinde `PORT=3302` yapın.

## Sorun giderme

**Node bulunamadı**  
→ https://nodejs.org adresinden LTS sürümünü kurun, bilgisayarı yeniden başlatın.

**Port kullanımda (EADDRINUSE)**  
→ `.env` dosyasında `PORT=3302` deneyin.

**npm install hata veriyor**  
→ İnternet bağlantısı ve antivirüs/proxy ayarlarını kontrol edin.

**Sayfa açılmıyor**  
→ `BASLAT.bat` penceresinin açık kaldığından emin olun; kapatınca sunucu durur.

## Paylaşım / zip paketi

Zip’e **dahil edin:**
- `data/`, `public/`, `src/`
- `server.js`, `package.json`, `package-lock.json`
- `BASLAT.bat`, `baslat.sh`, `.env.example`, `README.md`, `LICENSE`

Zip’e **dahil etmeyin:**
- `node_modules/` (kullanıcı `npm install` veya BASLAT.bat ile kurar)

## Güvenlik notu

Bu araç **yalnızca yerel kullanım** için tasarlanmıştır (`127.0.0.1`). İnternete açmadan önce kimlik doğrulama ekleyin. Sahte belge üretmek yasadışıdır; yalnızca eğitim ve kişisel test amaçlı kullanın.

## Lisans

MIT — ayrıntılar için `LICENSE` dosyasına bakın.
