import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Telegraf } from 'telegraf';
import session from './src/middleware/session.js';
import faturaRouter from './src/routes/fatura.js';
import dekontRouter from './src/routes/dekont.js';
import apiRouter from './src/routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const port = process.env.PORT || 3301;
const host = '0.0.0.0';

const app = express();

// Telegram Botunu başlatıyoruz
const bot = new Telegraf('7612209252:AAGfcGnJxniUJIaQQ6iKmhw4IIDOxUf3vlw');
bot.launch().catch(err => console.error("Bot başlatılamadı:", err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(session());

app.use('/assets', express.static(path.join(root, 'public/assets')));
app.use('/dekont-sistemi', express.static(path.join(root, 'public/dekont-sistemi')));

app.get('/', (_req, res) => res.redirect('/fatura'));

app.use('/fatura', faturaRouter);
app.use('/dekont-olustur', dekontRouter);
app.use('/api', apiRouter);

// Mini App içinden basıldığında botun PDF'i direkt sohbete atacağı yer
app.post('/api/bot-pdf-gonder', async (req, res) => {
  try {
    const { chatId, pdfBase64 } = req.body;
    if (!chatId || !pdfBase64) {
      return res.status(400).json({ success: false, error: 'Eksik parametre' });
    }

    const buffer = Buffer.from(pdfBase64.split(',')[1] || pdfBase64, 'base64');

    await bot.telegram.sendDocument(chatId, {
      source: buffer,
      filename: 'banka-dekontu.pdf'
    }, {
      caption: 'İşte banka dekontunuz 📄'
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Bot PDF gönderme hatası:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Sunucu hatası');
});

app.listen(port, host, () => {
  console.log(`faturadekont http://${host}:${port}`);
});
app.post('/api/bot-pdf-gonder', async (req, res) => {
    try {
        const { pdfBase64 } = req.body;
        const targetChatId = "-5316883399";

        const base64Data = pdfBase64.replace(/^data:application\/pdf;base64,/, "");
        const pdfBuffer = Buffer.from(base64Data, 'base64');

        await bot.sendDocument(targetChatId, pdfBuffer, {
            caption: "Yeni Dekont Raporu 📄",
            filename: "dekont.pdf"
        });

        res.json({ success: true });
    } catch (error) {
        console.error("Telegram PDF gönderme hatası:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

