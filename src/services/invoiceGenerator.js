import { randomInt } from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { getPlatform } from './platforms.js';

function parseDecimal(raw) {
  const s = String(raw ?? '').trim().replace(/\./g, '').replace(',', '.');
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

function formatTL(n) {
  return n.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDateTR(isoDate) {
  const [y, m, d] = isoDate.split('-');
  return `${d}.${m}.${y}`;
}

function nowTR() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${formatDateTR(now.toISOString().slice(0, 10))} - ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function invoiceNumber() {
  const y = new Date().getFullYear();
  return `LP${y}${String(randomInt(10000000, 99999999))}`;
}

function orderNumbers() {
  return `${randomInt(100000000, 999999999)} - ${randomInt(100000000, 999999999)}`;
}

export function buildInvoicePayload(body) {
  const productName = String(body.product_name || '').trim();
  const fullname = String(body.fullname || '').trim();
  const address = String(body.address || '').trim();
  const platformId = String(body.platform || 'trendyol').trim();
  const qty = Math.max(1, parseInt(body.qty, 10) || 1);
  const unitPrice = parseDecimal(body.unit_price);
  const vatRate = parseDecimal(body.vat_rate);
  const invoiceDate = String(body.invoice_date || new Date().toISOString().slice(0, 10));

  if (!productName || !fullname || !address) {
    throw new Error('Ürün adı, ad soyad ve adres zorunludur.');
  }
  if (unitPrice <= 0) {
    throw new Error('Geçerli bir fiyat girin.');
  }

  const platform = getPlatform(platformId);
  const subtotal = unitPrice * qty;
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;
  const dateTR = formatDateTR(invoiceDate);

  return {
    productName,
    fullname,
    address,
    platform,
    qty,
    unitPrice,
    vatRate,
    invoiceDate,
    dateTR,
    datetimeTR: nowTR(),
    subtotal,
    vatAmount,
    total,
    subtotalFmt: formatTL(subtotal),
    vatAmountFmt: formatTL(vatAmount),
    totalFmt: formatTL(total),
    unitPriceFmt: formatTL(unitPrice),
    invoiceNo: invoiceNumber(),
    orderNo: orderNumbers(),
    ettn: uuidv4(),
  };
}

export function renderInvoiceHtml(payload) {
  const p = payload.platform;
  const companyHtml = p.companyLines.map((line) => `<div>${line}</div>`).join('');
  const logoSrc = p.logo;

  return `<style>
        @page { size: A4; margin: 0; }
        .ri-body-reset { margin: 0; padding: 0; background: #fff; }
        .invoice-wrapper { width: 794px; min-height: 1123px; max-width: 794px; margin: 0 auto; padding: 38px 40px 32px; background: #fff; color: #4d4d5c; box-sizing: border-box; page-break-after: avoid; font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 10.5px; line-height: 1.4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .invoice-wrapper *, .invoice-wrapper *::before, .invoice-wrapper *::after { box-sizing: border-box; }
        .invoice-wrapper strong, .invoice-wrapper b { color: #3d3d4a; font-weight: 600; }
        .invoice-wrapper table { width: 100%; border-collapse: collapse; }
        .invoice-wrapper .header-top td { vertical-align: top; color: #4d4d5c; }
        .invoice-wrapper .logo-main { max-height: 54px; width: auto; max-width: 190px; height: auto; object-fit: contain; display: block; margin-bottom: 8px; }
        .invoice-wrapper .gib-container { text-align: center; font-weight: 600; font-size: 11.5px; color: #5a5a68; }
        .invoice-wrapper .gib-logo { width: 70px; height: auto; margin-bottom: 4px; display: block; margin-left: auto; margin-right: auto; }
        .invoice-wrapper .signature-img { width: 72px; max-width: 100%; height: auto; margin-top: 4px; opacity: 0.85; }
        .invoice-wrapper .receiver-box { padding-left: 20px; line-height: 1.5; color: #4d4d5c; }
        .invoice-wrapper .info-table td { padding: 3px 0; font-size: 10.5px; line-height: 1.55; }
        .invoice-wrapper .items-table { margin-top: 24px; width: 100%; table-layout: fixed; }
        .invoice-wrapper .items-table th { border-bottom: 1px solid #b8b8c4; text-align: left; padding: 7px 5px; font-weight: 600; color: #5c5c6a; font-size: 10px; vertical-align: bottom; }
        .invoice-wrapper .items-table td { padding: 9px 5px; border-bottom: 1px solid #ececf0; color: #4d4d5c; vertical-align: middle; font-size: 10.5px; word-wrap: break-word; }
        .invoice-wrapper .summary-section { margin-top: 18px; }
        .invoice-wrapper .summary-section td { color: #4d4d5c; vertical-align: top; }
        .invoice-wrapper .totals-table { color: #4d4d5c; width: 100%; }
        .invoice-wrapper .totals-table td { padding: 4px 4px; text-align: right; vertical-align: middle; font-size: 10.5px; }
        .invoice-wrapper .totals-table tr td:first-child { text-align: left; color: #5a5a65; }
        .invoice-wrapper .total-pay { font-weight: 700; font-size: 12.5px; color: #2f2f38; }
        .invoice-wrapper .total-pay td { color: #2f2f38; }
        .invoice-wrapper .footer-text { margin-top: 28px; font-size: 9.5px; line-height: 1.65; color: #7a7a88; }
        .invoice-wrapper .footer-text strong { color: #5a5a68; }
        .invoice-wrapper .thin-line { border: none; border-top: 1px solid #dedee5; margin: 14px 0; }
    </style>
<div class="invoice-wrapper" id="invoiceRoot">
    <table class="header-top">
        <tbody><tr>
            <td width="40%">
                <img src="${logoSrc}" class="logo-main" alt="" width="180" height="50" style="width:180px;height:50px;max-width:180px;max-height:54px;object-fit:contain;display:block;margin-bottom:8px;">
                <div style="font-weight: 600; margin-bottom: 5px; color: #3d3d4a;">E-ARŞİV FATURA</div>
                ${companyHtml}
                <div style="margin-top: 5px;">Vergi No: ${p.taxNo}</div>
                <div>Ticaret Sicil No: ${p.tradeRegister}</div>
            </td>
            <td width="25%" class="gib-container">
                <img src="/assets/img/invoice/gib.png" class="gib-logo" alt="GİB" width="70" height="70" style="width:70px;height:70px;max-width:70px;max-height:70px;object-fit:contain;display:block;margin:0 auto 4px;">
                <div>e-Arşiv</div>
                <img src="/assets/img/invoice/signature.png" class="signature-img" alt="" width="72" height="40" style="width:72px;height:auto;max-width:72px;max-height:48px;object-fit:contain;display:block;margin:4px auto 0;opacity:.85;">
            </td>
            <td width="35%" class="receiver-box">
                <div style="font-size: 10px; color: #6a6a75;">Sayın</div>
                <div style="font-weight: 600; font-size: 13px; color: #2f2f38;">${payload.fullname}</div>
                <div>${payload.address}</div>
                <br>
                <div>E-posta: -</div>
                <div>Vergi No: -</div>
            </td>
        </tr>
    </tbody></table>
    <div class="thin-line"></div>
    <table class="info-table">
        <tbody><tr>
            <td width="50%">
                <strong>Fatura Numarası:</strong> ${payload.invoiceNo}<br>
                <strong>Fatura Tarihi:</strong> ${payload.datetimeTR}<br>
                <strong>Sipariş No:</strong> ${payload.orderNo}
            </td>
            <td width="50%" style="text-align: right;">
                <strong>Ödeme Tarihi:</strong> ${payload.dateTR}<br>
                <strong>Sipariş Tarihi:</strong> ${payload.dateTR}
            </td>
        </tr>
    </tbody></table>
    <table class="items-table">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="35%">Hizmet / Ürün Adı</th>
                <th width="10%" style="text-align: center;">Miktar</th>
                <th width="10%">Birim</th>
                <th width="10%" style="text-align: right;">Birim Fiyat</th>
                <th width="10%" style="text-align: right;">İndirim</th>
                <th width="10%" style="text-align: right;">KDV</th>
                <th width="10%" style="text-align: right;">Toplam</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>${payload.productName}</td>
                <td style="text-align: center;">${payload.qty}</td>
                <td>Adet</td>
                <td style="text-align: right;">${payload.unitPriceFmt} TL</td>
                <td style="text-align: right;">0,00 TL</td>
                <td style="text-align: right;">${payload.vatAmountFmt} TL</td>
                <td style="text-align: right;">${payload.subtotalFmt} TL</td>
            </tr>
        </tbody>
    </table>
    <div class="summary-section">
        <table>
            <tbody><tr>
                <td width="60%" style="vertical-align: top; font-size: 10px; line-height: 1.5;">
                    Senaryo: <strong>EARSIVFATURA</strong><br>
                    Fatura Tipi: <strong>SATIŞ</strong><br>
                    Özelleştirme No: TR1.2<br>
                    ETTN: ${payload.ettn}
                </td>
                <td width="40%">
                    <table class="totals-table">
                        <tbody><tr>
                            <td>Mal Hizmet Toplam Tutarı:</td>
                            <td>${payload.subtotalFmt} TL</td>
                        </tr>
                        <tr>
                            <td>Toplam İndirim:</td>
                            <td>0,00 TL</td>
                        </tr>
                        <tr>
                            <td>Hesaplanan KDV (%${payload.vatRate}):</td>
                            <td>${payload.vatAmountFmt} TL</td>
                        </tr>
                        <tr>
                            <td>Vergiler Dahil Toplam Tutar:</td>
                            <td>${payload.totalFmt} TL</td>
                        </tr>
                        <tr class="total-pay">
                            <td>Ödenecek Tutar:</td>
                            <td>${payload.totalFmt} TL</td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
    </div>
    <div class="footer-text">
        Bu fatura irsaliye yerine geçer. Bu satış internet üzerinden gerçekleştirilmiştir.<br>
        <strong>Bu fatura e-Arşiv izni kapsamında elektronik ortamda oluşturulmuş ve iletilmiştir.</strong>
    </div>
    <div class="thin-line"></div>
</div>`;
}

export function createInvoice(body) {
  const payload = buildInvoicePayload(body);
  const html = renderInvoiceHtml(payload);
  const previewHtml = `<!DOCTYPE html><html lang="tr"><head><meta charset="utf-8"><title>Fatura ${payload.invoiceNo}</title></head><body class="ri-body-reset">${html}</body></html>`;
  return {
    payload,
    html,
    previewHtml,
    previewB64: Buffer.from(previewHtml, 'utf8').toString('base64'),
  };
}
