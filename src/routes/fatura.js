import { Router } from 'express';
import { getPlatformList } from '../services/platforms.js';
import { createInvoice } from '../services/invoiceGenerator.js';

const router = Router();

router.get('/preview', (req, res) => {
  const html = req.session?.lastInvoiceHtml;
  if (!html) {
    return res.status(404).send('Önizleme bulunamadı. Önce fatura oluşturun.');
  }
  res.send(`<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><title>Fatura önizleme</title></head><body class="ri-body-reset">${html}</body></html>`);
});

router.get('/', (req, res) => {
  const ok = req.query.ok === '1';
  const error = req.query.err ? String(req.query.err) : null;
  const form = req.session?.lastInvoiceForm || {
    product_name: '',
    unit_price: '',
    qty: 1,
    vat_rate: '10',
    invoice_date: new Date().toISOString().slice(0, 10),
    fullname: '',
    address: '',
    platform: 'trendyol',
  };

  res.render('fatura', {
    platforms: getPlatformList(),
    form,
    ok,
    error,
    invoiceHtml: req.session?.lastInvoiceHtml || null,
  });
});

router.post('/', (req, res) => {
  try {
    const result = createInvoice(req.body);
    req.session.lastInvoiceForm = req.body;
    req.session.lastInvoiceHtml = result.html;
    return res.redirect('/fatura?ok=1');
  } catch (err) {
    req.session.lastInvoiceForm = req.body;
    return res.redirect(`/fatura?err=${encodeURIComponent(err.message)}`);
  }
});

export default router;
