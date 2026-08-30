import { Router } from 'express';
import { getPlatformList } from '../services/platforms.js';
import { createInvoice } from '../services/invoiceGenerator.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'faturadekont', version: '1.0.0' });
});

router.get('/platforms', (_req, res) => {
  res.json({ platforms: getPlatformList() });
});

router.post('/fatura', (req, res) => {
  try {
    const result = createInvoice(req.body);
    res.json({
      ok: true,
      invoiceNo: result.payload.invoiceNo,
      ettn: result.payload.ettn,
      total: result.payload.totalFmt,
      html: result.html,
      previewB64: result.previewB64,
    });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

export default router;
