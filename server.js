import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import session from './src/middleware/session.js';
import faturaRouter from './src/routes/fatura.js';
import dekontRouter from './src/routes/dekont.js';
import apiRouter from './src/routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const port = 3301;
const host = '0.0.0.0';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '2mb' }));
app.use(session());

app.use('/assets', express.static(path.join(root, 'public/assets')));
app.use('/dekont-sistemi', express.static(path.join(root, 'public/dekont-sistemi')));

app.get('/', (_req, res) => res.redirect('/fatura'));

app.use('/fatura', faturaRouter);
app.use('/dekont-olustur', dekontRouter);
app.use('/api', apiRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).send('Sunucu hatası');
});

app.listen(port, host, () => {
  console.log(`faturadekont http://${host}:${port}`);
});
