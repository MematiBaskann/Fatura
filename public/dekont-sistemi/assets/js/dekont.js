/**
 * Dekont oluşturma — Ziraat (hesaptan hesaba) + diğer bankalar
 */
(function () {
  "use strict";

  /** Yerel PNG (XAMPP’te güvenilir); yoksa Wikimedia yedek */
  var ZIRAAT_LOGO_LOCAL = "assets/img/ziraat-logo.png";
  var ZIRAAT_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Ziraat_Bankas%C4%B1_logo.svg/1280px-Ziraat_Bankas%C4%B1_logo.svg.png";

  var ZIRAAT_LOGO_IMG_HTML =
    '<img src="' +
    ZIRAAT_LOGO_LOCAL +
    '" alt="Ziraat Bankası" height="42" decoding="async" onerror="this.onerror=null;this.src=\'' +
    ZIRAAT_LOGO_REMOTE.replace(/'/g, "\\'") +
    "'\">";

  var ISBANK_LOGO_LOCAL = "assets/img/isbank-logo.svg";
  var ISBANK_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/2/24/T%C3%BCrkiye_%C4%B0%C5%9F_Bankas%C4%B1_logo.svg";
  var ISBANK_LOGO_IMG_HTML =
    '<img src="' +
    ISBANK_LOGO_LOCAL +
    '" alt="İş Bankası" decoding="async" onerror="this.onerror=null;this.src=\'' +
    ISBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
    "'\">";

  var IS_EDEKONT_ICON_SVG =
    '<svg class="edekont-e-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13" fill="none" stroke="#1a4a8e" stroke-width="1.8"/><text x="16" y="21" text-anchor="middle" fill="#1a4a8e" font-size="15" font-weight="700" font-family="Arial,sans-serif">e</text></svg>';

  var GARANTI_LOGO_LOCAL = "assets/img/garanti-bbva-logo.png";
  var GARANTI_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/tr/7/75/Garanti_BBVA.png";
  var GARANTI_LOGO_IMG_HTML =
    '<img src="' +
    GARANTI_LOGO_LOCAL +
    '" alt="Garanti BBVA" height="55" decoding="async" onerror="this.onerror=null;this.src=\'' +
    GARANTI_LOGO_REMOTE.replace(/'/g, "\\'") +
    "'\">";

  var AKBANK_LOGO_LOCAL = "assets/img/akbank-logo.svg";
  var AKBANK_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/7/7b/Akbank_logo.svg";
  var AKBANK_LOGO_IMG_HTML =
    '<img src="' +
    AKBANK_LOGO_LOCAL +
    '" alt="Akbank" decoding="async" onerror="this.onerror=null;this.src=\'' +
    AKBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
    "'\">";

  var YAPIKREDI_LOGO_LOCAL = "assets/img/yapikredi-logo.png";
  var YAPIKREDI_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/d/d6/Yap%C4%B1_kredi_logo.png";
  var YAPIKREDI_LOGO_IMG_HTML =
    '<img src="' +
    YAPIKREDI_LOGO_LOCAL +
    '" alt="Yapı Kredi" width="180" decoding="async" onerror="this.onerror=null;this.src=\'' +
    YAPIKREDI_LOGO_REMOTE.replace(/'/g, "\\'") +
    "'\">";

  var HALKBANK_LOGO_LOCAL = "assets/img/halkbank-logo.jpg";
  var HALKBANK_LOGO_REMOTE =
    "https://www.halkbank.com.tr/content/dam/corporate-website/tr/gorseller/bankamiz/kurumsal-iletisim/logolar/halkbanklogoerkek.jpg";
  var HALKBANK_LOGO_IMG_HTML =
    '<img src="' +
    HALKBANK_LOGO_LOCAL +
    '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
    HALKBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
    '\'">';

  var VAKIFBANK_LOGO_LOCAL = "assets/img/vakifbank-logo.png";
  var VAKIFBANK_LOGO_REMOTE = "https://dto.vakifbank.com.tr/Images/VB_Logo.png";
  var VAKIFBANK_LOGO_IMG_HTML =
    '<img src="' +
    VAKIFBANK_LOGO_LOCAL +
    '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
    VAKIFBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
    '\'">';

  var QNB_LOGO_LOCAL = "assets/img/qnb-finansbank-logo.png";
  var QNB_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/tr/1/11/Qnb-finansbank.png";
  var QNB_LOGO_IMG_HTML =
    '<img src="' +
    QNB_LOGO_LOCAL +
    '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
    QNB_LOGO_REMOTE.replace(/'/g, "\\'") +
    '\'">';

  var DENIZBANK_LOGO_LOCAL = "assets/img/denizbank-logo.svg";
  var DENIZBANK_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/DenizBank_logo.svg";
  var DENIZBANK_LOGO_IMG_HTML =
    '<img src="' +
    DENIZBANK_LOGO_LOCAL +
    '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
    DENIZBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
    '\'">';

  var ING_LOGO_LOCAL = "assets/img/ing-logo.png";
  var ING_LOGO_FALLBACK = "assets/img/ing-logo.svg";
  var ING_LOGO_IMG_HTML =
    '<img src="' +
    ING_LOGO_LOCAL +
    '" alt="ING" style="height:auto;max-height:40px;width:auto;max-width:160px;object-fit:contain;display:block" decoding="async" onerror="this.onerror=null;this.src=\'' +
    ING_LOGO_FALLBACK.replace(/'/g, "\\'") +
    '\'">';

  var TEB_LOGO_LOCAL = "assets/img/teb-logo.jpg";
  var TEB_LOGO_FALLBACK = "assets/img/teb-logo.svg";
  var TEB_LOGO_IMG_HTML =
    '<img src="' +
    TEB_LOGO_LOCAL +
    '" alt="TEB" style="width:150px;max-width:100%;height:auto;object-fit:contain;display:block" decoding="async" onerror="this.onerror=null;this.src=\'' +
    TEB_LOGO_FALLBACK.replace(/'/g, "\\'") +
    '\'">';

  var SBERBANK_LOGO_LOCAL = "assets/img/sberbank-logo.svg";
  var SBERBANK_LOGO_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_Sberbank.svg";

  var SIGNATURE_SAMPLE_LOCAL = "assets/img/sample-signature.png";
  var SIGNATURE_SAMPLE_REMOTE =
    "https://upload.wikimedia.org/wikipedia/commons/3/39/Ingvar_Carlsson_signature.png";

  function bankBadgeHtml(letter, bg, fg, wide) {
    return (
      '<span class="bank-badge' +
      (wide ? " bank-badge--wide" : "") +
      '" style="background:' +
      bg +
      ";color:" +
      (fg || "#fff") +
      '">' +
      letter +
      "</span>"
    );
  }

  var BANKS = [
    {
      id: "ziraat",
      name: "Ziraat Bankası",
      className: "bank-ziraat",
      badge: { letter: "Z", bg: "#E30613", fg: "#fff" },
      logoSvg:
        '<img src="' +
        ZIRAAT_LOGO_LOCAL +
        '" alt="" width="120" height="18" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
        ZIRAAT_LOGO_REMOTE.replace(/'/g, "\\'") +
        '\'">',
    },
    {
      id: "isbank",
      name: "İş Bankası",
      className: "bank-isbank",
      badge: { letter: "İŞ", bg: "#004F9F", fg: "#fff", wide: true },
      logoSvg:
        '<img src="' +
        ISBANK_LOGO_LOCAL +
        '" alt="" width="120" height="24" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
        ISBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
        '\'">',
    },
    {
      id: "garanti",
      name: "Garanti BBVA",
      className: "bank-garanti",
      badge: { letter: "G", bg: "#00A651", fg: "#fff" },
      logoSvg:
        '<img src="' +
        GARANTI_LOGO_LOCAL +
        '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
        GARANTI_LOGO_REMOTE.replace(/'/g, "\\'") +
        '\'">',
    },
    {
      id: "akbank",
      name: "Akbank",
      className: "bank-akbank",
      badge: { letter: "A", bg: "#ED1C24", fg: "#fff" },
      logoSvg:
        '<img src="' +
        AKBANK_LOGO_LOCAL +
        '" alt="" width="120" height="20" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
        AKBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
        '\'">',
    },
    {
      id: "yapikredi",
      name: "Yapı Kredi",
      className: "bank-yapikredi",
      badge: { letter: "YK", bg: "#004990", fg: "#fff", wide: true },
      logoSvg:
        '<img src="' +
        YAPIKREDI_LOGO_LOCAL +
        '" alt="" width="120" height="28" style="max-height:28px;width:auto;object-fit:contain;display:block;border-radius:4px" onerror="this.onerror=null;this.src=\'' +
        YAPIKREDI_LOGO_REMOTE.replace(/'/g, "\\'") +
        '\'">',
    },
    {
      id: "halkbank",
      name: "Halkbank",
      className: "bank-halkbank",
      badge: { letter: "H", bg: "#00539F", fg: "#fff" },
      logoSvg: HALKBANK_LOGO_IMG_HTML,
    },
    {
      id: "vakifbank",
      name: "VakıfBank",
      className: "bank-vakifbank",
      badge: { letter: "V", bg: "#FFB81C", fg: "#1a1a1a" },
      logoSvg: VAKIFBANK_LOGO_IMG_HTML,
    },
    {
      id: "qnb",
      name: "QNB Finansbank",
      className: "bank-qnb",
      badge: { letter: "Q", bg: "#6E2585", fg: "#fff" },
      logoSvg: QNB_LOGO_IMG_HTML,
    },
    {
      id: "denizbank",
      name: "Denizbank",
      className: "bank-denizbank",
      badge: { letter: "D", bg: "#004B87", fg: "#fff" },
      logoSvg: DENIZBANK_LOGO_IMG_HTML,
    },
    {
      id: "ing",
      name: "ING",
      className: "bank-ing",
      badge: { letter: "ING", bg: "#FF6200", fg: "#fff", wide: true },
      logoSvg: ING_LOGO_IMG_HTML,
    },
    {
      id: "teb",
      name: "TEB",
      className: "bank-teb",
      badge: { letter: "T", bg: "#006341", fg: "#fff" },
      logoSvg: TEB_LOGO_IMG_HTML,
    },
  ];

  var state = { bankId: null };

  var BIRLER = ["", "BİR", "İKİ", "ÜÇ", "DÖRT", "BEŞ", "ALTI", "YEDİ", "SEKİZ", "DOKUZ"];
  var ONLAR = ["", "ON", "YİRMİ", "OTUZ", "KIRK", "ELLİ", "ATMIŞ", "YETMİŞ", "SEKSEN", "DOKSAN"];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function val(id) {
    var e = document.getElementById(id);
    return e ? String(e.value).trim() : "";
  }

  function parseTryAmount(raw) {
    var s = String(raw || "").trim();
    if (!s) return { lira: 0, kurus: 0 };
    s = s.replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
    var n = parseFloat(s);
    if (isNaN(n)) return { lira: 0, kurus: 0 };
    var lira = Math.floor(n);
    var kurus = Math.round((n - lira) * 100);
    if (kurus >= 100) {
      lira += 1;
      kurus -= 100;
    }
    return { lira: lira, kurus: kurus };
  }

  function formatTry(n) {
    var num = parseFloat(String(n).replace(/\./g, "").replace(",", ".")) || 0;
    return num.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  /** İki TL tutarını (form metni) toplar — "3.150,00" formatında döner */
  function addTryStrings(s1, s2) {
    var a = parseTryAmount(s1);
    var b = parseTryAmount(s2);
    var totalKurus = a.kurus + b.kurus + (a.lira + b.lira) * 100;
    var lira = Math.floor(totalKurus / 100);
    var kurus = totalKurus % 100;
    return formatTry(lira + kurus / 100);
  }

  function ikiBasamak(n) {
    if (n <= 0) return "";
    if (n < 10) return BIRLER[n];
    var o = n % 10;
    var t = (n - o) / 10;
    if (t === 1) return o === 0 ? "ON" : "ON " + BIRLER[o];
    return ONLAR[t] + (o ? " " + BIRLER[o] : "");
  }

  function ucBasamak(n) {
    if (n <= 0) return "";
    var y = Math.floor(n / 100);
    var r = n % 100;
    var parca = [];
    if (y > 0) parca.push(y === 1 ? "YÜZ" : BIRLER[y] + " YÜZ");
    var k = ikiBasamak(r);
    if (k) parca.push(k);
    return parca.join(" ");
  }

  function sayiOkunusTrUpper(n) {
    if (typeof n !== "number" || isNaN(n)) return "";
    n = Math.floor(n);
    if (n === 0) return "SIFIR";
    if (n < 0) return "EKSİ " + sayiOkunusTrUpper(-n);

    var grupAd = ["", "BİN", "MİLYON", "MİLYAR", "TRİLYON"];
    var gruplar = [];
    var x = n;
    while (x > 0) {
      gruplar.push(x % 1000);
      x = Math.floor(x / 1000);
    }
    var son = [];
    for (var i = gruplar.length - 1; i >= 0; i--) {
      var v = gruplar[i];
      if (v === 0) continue;
      if (i === 1 && v === 1) {
        son.push("BİN");
        continue;
      }
      var parca = ucBasamak(v);
      if (i > 0) son.push(parca + " " + grupAd[i]);
      else son.push(parca);
    }
    return son.join(" ").replace(/\s+/g, " ").trim();
  }

  /** Dekont örneğiyle aynı: (Yalnız YÜZKIRKÜÇTL) — rakam yazısı + TL bitişik */
  function tutarYaziBankaStili(rawTry) {
    var p = parseTryAmount(rawTry);
    var liraW = sayiOkunusTrUpper(p.lira);
    var compact = liraW.replace(/\s+/g, "");
    if (p.kurus > 0) {
      var kr = sayiOkunusTrUpper(p.kurus).replace(/\s+/g, "");
      return {
        parantez: "Yalnız " + compact + "TL " + kr + "KR",
        tek: compact,
      };
    }
    return { parantez: "Yalnız " + compact + "TL", tek: compact };
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function getBank() {
    if (!state.bankId) {
      return null;
    }
    for (var i = 0; i < BANKS.length; i++) {
      if (BANKS[i].id === state.bankId) {
        return BANKS[i];
      }
    }
    return null;
  }

  function readForm() {
    return {
      islemTarihi: val("f-islem-tarihi"),
      islemSaati: val("f-islem-saati"),
      dekontNo: val("f-dekont-no"),
      islemTipi: ($("#f-islem-tipi") && $("#f-islem-tipi").value) || "havale",
      gonderen: val("f-gonderen"),
      gonderenIban: val("f-gonderen-iban").replace(/\s/g, ""),
      alici: val("f-alici"),
      aliciIban: val("f-alici-iban").replace(/\s/g, ""),
      tutar: val("f-tutar"),
      aciklama: val("f-aciklama"),
      kanal: ($("#f-kanal") && $("#f-kanal").value) || "",
      referas: val("f-referans"),
      onayKodu: val("f-onay"),
      ziSube: val("f-zi-sube"),
      ziHesap: val("f-zi-hesap"),
      ziVd: val("f-zi-vd"),
      ziVkn: val("f-zi-vkn"),
      ziIslemEk: val("f-zi-islem-ek"),
      ziValor: val("f-zi-valor"),
      ziYer: val("f-zi-yer"),
      ziSayin: val("f-zi-sayin"),
      ziAdres: val("f-zi-adres"),
      ziAlacakliSube: val("f-zi-alacakli-sube"),
      ziAlacakliHesap: val("f-zi-alacakli-hesap"),
      ziAlacakliVkn: val("f-zi-alacakli-vkn"),
      ziKomisyon: val("f-zi-komisyon"),
      ziAltTs: val("f-zi-alt-ts"),
      ziKanalKod: val("f-zi-kanal-kod"),
      ziImza: val("f-zi-imza"),
      isMusteriNo: val("f-is-musteri-no"),
      isTckn: val("f-is-tckn"),
      isFastUcret: val("f-is-fast-ucret"),
      isValor: val("f-is-valor"),
      isRef: val("f-is-ref"),
      isDekontTs: val("f-is-dekont-ts"),
      isEdocNo: val("f-is-edoc-no"),
      isEttn: val("f-is-ettn"),
      isSenaryo: val("f-is-senaryo"),
      isSorguNo: val("f-is-sorgu-no"),
      isAliciBanka: val("f-is-alici-banka"),
      isBaslik: val("f-is-baslik"),
      gaSube: val("f-ga-sube"),
      gaMusteriNo: val("f-ga-musteri-no"),
      gaHesapNo: val("f-ga-hesap-no"),
      gaTckn: val("f-ga-tckn"),
      gaIslemYeri: val("f-ga-islem-yeri"),
      gaDuzenleme: val("f-ga-duzenleme"),
      gaSayinAdres: val("f-ga-sayin-adres"),
      gaOrtaBaslik: val("f-ga-orta-baslik"),
      gaAlacakliSube: val("f-ga-alacakli-sube"),
      gaAlacakliHesapDetay: val("f-ga-alacakli-hesap-detay"),
      gaMasrafHesabi: val("f-ga-masraf-hesabi"),
      gaMasraf: val("f-ga-masraf"),
      gaBsmv: val("f-ga-bsmv"),
      gaMasrafToplam: val("f-ga-masraf-toplam"),
      gaTutarYazi: val("f-ga-tutar-yazi"),
      gaSiraNo: val("f-ga-sira-no"),
      akHeaderSub: val("f-akb-header-sub"),
      akQrUrl: val("f-akb-qr-url"),
      akDuzenleyenSube: val("f-akb-duzenleyen-sube"),
      akBorcluHesap: val("f-akb-borclu-hesap"),
      akMusteriNo: val("f-akb-musteri-no"),
      akGonderenVkn: val("f-akb-gonderen-vkn"),
      akGonderenAdres: val("f-akb-gonderen-adres"),
      akAliciHesapSatir: val("f-akb-alici-hesap-satir"),
      akKarsiSube: val("f-akb-karsi-sube"),
      akAliciVknVd: val("f-akb-alici-vkn-vd"),
      akAliciAdres: val("f-akb-alici-adres"),
      akIbanAciklama: val("f-akb-iban-aciklama"),
      akAmtMev1: val("f-akb-amt-mev-1"),
      akAmtMev2: val("f-akb-amt-mev-2"),
      akAmtSch1: val("f-akb-amt-sch-1"),
      akAmtSch2: val("f-akb-amt-sch-2"),
      akAmtKom1: val("f-akb-amt-kom-1"),
      akAmtKom2: val("f-akb-amt-kom-2"),
      akAmtBsm1: val("f-akb-amt-bsm-1"),
      akAmtBsm2: val("f-akb-amt-bsm-2"),
      akTutarYazi: val("f-akb-tutar-yazi"),
      akValor: val("f-akb-valor"),
      akRefFooter: val("f-akb-ref-footer"),
      akIslemYapan: val("f-akb-islem-yapan"),
      akIslemYapanTckn: val("f-akb-islem-yapan-tckn"),
      akFooterKod: val("f-akb-footer-kod"),
      ykDekontBaslik: val("f-yk-dekont-baslik"),
      ykMusteriNo: val("f-yk-musteri-no"),
      ykVknMask: val("f-yk-vkn-mask"),
      ykIslemRef: val("f-yk-islem-ref"),
      ykBarkod: val("f-yk-barkod"),
      ykDekontSira: val("f-yk-dekont-sira"),
      ykPersonelSicil: val("f-yk-personel-sicil"),
      ykValor: val("f-yk-valor"),
      ykKrediKartNo: val("f-yk-kredi-kart-no"),
      ykKartSahibi: val("f-yk-kart-sahibi"),
      ykYatirilanHesap: val("f-yk-yatirilan-hesap"),
      ykFaizOrani: val("f-yk-faiz-orani"),
      ykNakitUcret: val("f-yk-nakit-ucret"),
      ykHavaleUcret: val("f-yk-havale-ucret"),
      ykAciklamaLong: val("f-yk-aciklama-long"),
      ykStatusText: val("f-yk-status-text"),
      ykImzaSol: val("f-yk-imza-sol"),
      ykImzaSag: val("f-yk-imza-sag"),
      hbBimref: val("f-hb-bimref"),
      hbReferans: val("f-hb-referans"),
      hbAmirAdi: val("f-hb-amir-adi"),
      hbAmirNo: val("f-hb-amir-no"),
      hbTarih: val("f-hb-tarih"),
      hbValor: val("f-hb-valor"),
      hbBSube: val("f-hb-bsube"),
      hbASube: val("f-hb-asube"),
      hbLehdar: val("f-hb-lehdar"),
      hbLehdarNo: val("f-hb-lehdar-no"),
      hbIbanMask: val("f-hb-iban-mask"),
      hbSubeAdres: val("f-hb-sube-adres"),
      hbOdemeTuru: val("f-hb-odeme-turu"),
      hbTutarYazi: val("f-hb-tutar-yazi"),
      vbIslemTuru: val("f-vb-islem-turu"),
      vbHesapNo: val("f-vb-hesap-no"),
      vbIslemNo: val("f-vb-islem-no"),
      vbFisNo: val("f-vb-fis-no"),
      vbIslemAciklama: val("f-vb-islem-aciklama"),
      vbBankTitle: val("f-vb-bank-title"),
      vbBranchlessLabel: val("f-vb-branchless-label"),
      qnbMusteriAd: val("f-qnb-musteri-ad"),
      qnbMusteriAdres: val("f-qnb-musteri-adres"),
      qnbMusteriNo: val("f-qnb-musteri-no"),
      qnbVkn: val("f-qnb-vkn"),
      qnbVergiDairesi: val("f-qnb-vergi-dairesi"),
      qnbIslemYeri: val("f-qnb-islem-yeri"),
      qnbIslemTarihSaat: val("f-qnb-islem-tarih-saat"),
      qnbR1Iban: val("f-qnb-r1-iban"),
      qnbR1Aciklama: val("f-qnb-r1-aciklama"),
      qnbR1Ba: val("f-qnb-r1-ba"),
      qnbR1Para: val("f-qnb-r1-para"),
      qnbR1Tutar: val("f-qnb-r1-tutar"),
      qnbR2Iban: val("f-qnb-r2-iban"),
      qnbR2Aciklama: val("f-qnb-r2-aciklama"),
      qnbR2Ba: val("f-qnb-r2-ba"),
      qnbR2Para: val("f-qnb-r2-para"),
      qnbR2Tutar: val("f-qnb-r2-tutar"),
      qnbR3Iban: val("f-qnb-r3-iban"),
      qnbR3Aciklama: val("f-qnb-r3-aciklama"),
      qnbR3Ba: val("f-qnb-r3-ba"),
      qnbR3Para: val("f-qnb-r3-para"),
      qnbR3Tutar: val("f-qnb-r3-tutar"),
      qnbDetay: val("f-qnb-detay"),
      qnbSiraNo: val("f-qnb-sira-no"),
      qnbIslemYapan: val("f-qnb-islem-yapan"),
      qnbFisNoAlt: val("f-qnb-fis-no-alt"),
      qnbSubeSatir1: val("f-qnb-sube-satir1"),
      qnbSubeSatir2: val("f-qnb-sube-satir2"),
      dnRightTel: val("f-dn-right-tel"),
      dnRightRef: val("f-dn-right-ref"),
      dnSayin: val("f-dn-sayin"),
      dnVknLine: val("f-dn-vkn-line"),
      dnIslemTuru: val("f-dn-islem-turu"),
      dnHesapNo: val("f-dn-hesap-no"),
      dnIbanLine: val("f-dn-iban-line"),
      dnMusteriAdiFull: val("f-dn-musteri-adi-full"),
      dnIslemTarihiText: val("f-dn-islem-tarihi-text"),
      dnValorText: val("f-dn-valor-text"),
      dnAliciBanka: val("f-dn-alici-banka"),
      dnAliciSube: val("f-dn-alici-sube"),
      dnAliciIbanLine: val("f-dn-alici-iban-line"),
      dnAliciAdi: val("f-dn-alici-adi"),
      dnAliciVkn: val("f-dn-alici-vkn"),
      dnTutarText: val("f-dn-tutar-text"),
      dnMasrafText: val("f-dn-masraf-text"),
      dnAciklamaTable: val("f-dn-aciklama-table"),
      dnSummaryHesap: val("f-dn-summary-hesap"),
      dnSummaryToplam: val("f-dn-summary-toplam"),
      dnEftSorgu: val("f-dn-eft-sorgu"),
      dnWatermark: val("f-dn-watermark"),
      ingDekontBaslik: val("f-ing-dekont-baslik"),
      ingSubHeader: val("f-ing-sub-header"),
      ingSayin: val("f-ing-sayin"),
      ingVergiDairesi: val("f-ing-vergi-dairesi"),
      ingVergiNo: val("f-ing-vergi-no"),
      ingDekontNoOverride: val("f-ing-dekont-no-override"),
      ingBasimTarihi: val("f-ing-basim-tarihi"),
      ingFisBilgileri: val("f-ing-fis-bilgileri"),
      ingIslemTarihiText: val("f-ing-islem-tarihi-text"),
      ingHesapSahibi: val("f-ing-hesap-sahibi"),
      ingIbanGoster: val("f-ing-iban-goster"),
      ingTutarMetin: val("f-ing-tutar-metin"),
      ingToplamMetin: val("f-ing-toplam-metin"),
      ingTutarYazi: val("f-ing-tutar-yazi"),
      ingAciklamaMultiline: val("f-ing-aciklama-multiline"),
      ingTelefon: val("f-ing-telefon"),
      ingWebsite: val("f-ing-website"),
      ingFooterYasal: val("f-ing-footer-yasal"),
      tebBankInfo: val("f-teb-bank-info"),
      tebTitle: val("f-teb-title"),
      tebTarihSaat: val("f-teb-tarih-saat"),
      tebIslemNo: val("f-teb-islem-no"),
      tebMusteriNo: val("f-teb-musteri-no"),
      tebHesapNo: val("f-teb-hesap-no"),
      tebIban: val("f-teb-iban"),
      tebEftNo: val("f-teb-eft-no"),
      tebHesapSahibi: val("f-teb-hesap-sahibi"),
      tebHesapSubesi: val("f-teb-hesap-subesi"),
      tebKarsiBankaSatir: val("f-teb-karsi-banka-satir"),
      tebValor: val("f-teb-valor"),
      tebTutarSatir: val("f-teb-tutar-satir"),
      tebOdemeCumlesi: val("f-teb-odeme-cumlesi"),
      tebAlacakliAdi: val("f-teb-alacakli-adi"),
      tebAlacakliHesap: val("f-teb-alacakli-hesap"),
      tebAlacakliBanka: val("f-teb-alacakli-banka"),
      tebSayin: val("f-teb-sayin"),
      tebAciklama: val("f-teb-aciklama"),
      tebIslemTipi: val("f-teb-islem-tipi"),
      tebIslemYeri: val("f-teb-islem-yeri"),
      tebFooterIrtibat: val("f-teb-footer-irtibat"),
    };
  }

  function fmtDateSlash(iso) {
    if (!iso || iso.length < 10) return iso || "—";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return p[2] + "/" + p[1] + "/" + p[0];
  }

  /** Örn. 16/07/21 */
  function fmtDateSlashShortYy(iso) {
    if (!iso || iso.length < 10) return iso || "—";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return p[2] + "/" + p[1] + "/" + p[0].slice(-2);
  }

  function fmtIsoToDot(iso) {
    if (!iso || iso.length < 10) return iso || "";
    var p = iso.split("-");
    if (p.length !== 3) return iso;
    return p[2] + "." + p[1] + "." + p[0];
  }

  function splitIban(raw) {
    if (!raw) return "—";
    var s = raw.replace(/\s/g, "").toUpperCase();
    return s.replace(/(.{4})/g, "$1 ").trim();
  }

  /** Özel şablonu olan bankalar — diğerlerinde yalnızca ortak form + kısa not */
  var BANKS_WITH_EXTRA_FORM = {
    ziraat: 1,
    isbank: 1,
    garanti: 1,
    akbank: 1,
    yapikredi: 1,
    halkbank: 1,
    vakifbank: 1,
    qnb: 1,
    denizbank: 1,
    ing: 1,
    teb: 1,
  };

  function setBankSpecificFieldsVisible() {
    var bankOnlySelectors = [
      ".field-ziraat-only",
      ".field-isbank-only",
      ".field-garanti-only",
      ".field-akbank-only",
      ".field-yapikredi-only",
      ".field-halkbank-only",
      ".field-vakifbank-only",
      ".field-qnb-only",
      ".field-denizbank-only",
      ".field-ing-only",
      ".field-teb-only",
    ];
    var b = getBank();
    if (!b) {
      bankOnlySelectors.forEach(function (sel) {
        $$(sel).forEach(function (el) {
          el.setAttribute("hidden", "");
          el.setAttribute("aria-hidden", "true");
        });
      });
      var titleEl0 = $("#bankFormSectionTitle");
      if (titleEl0) {
        titleEl0.setAttribute("hidden", "");
        titleEl0.setAttribute("aria-hidden", "true");
      }
      var hintEl0 = $("#bankEmptyHint");
      if (hintEl0) {
        hintEl0.setAttribute("hidden", "");
        hintEl0.setAttribute("aria-hidden", "true");
      }
      return;
    }
    var id = b.id;
    var hasExtra = !!BANKS_WITH_EXTRA_FORM[id];
    var titleEl = $("#bankFormSectionTitle");
    var hintEl = $("#bankEmptyHint");
    if (titleEl) {
      if (hasExtra) {
        titleEl.textContent = b.name + " — özel alanlar";
        titleEl.removeAttribute("hidden");
        titleEl.setAttribute("aria-hidden", "false");
      } else {
        titleEl.setAttribute("hidden", "");
        titleEl.setAttribute("aria-hidden", "true");
      }
    }
    if (hintEl) {
      if (hasExtra) {
        hintEl.setAttribute("hidden", "");
        hintEl.setAttribute("aria-hidden", "true");
      } else {
        hintEl.removeAttribute("hidden");
        hintEl.setAttribute("aria-hidden", "false");
      }
    }
    $$(".field-ziraat-only").forEach(function (el) {
      var show = id === "ziraat";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-isbank-only").forEach(function (el) {
      var show = id === "isbank";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-garanti-only").forEach(function (el) {
      var show = id === "garanti";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-akbank-only").forEach(function (el) {
      var show = id === "akbank";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-yapikredi-only").forEach(function (el) {
      var show = id === "yapikredi";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-halkbank-only").forEach(function (el) {
      var show = id === "halkbank";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-vakifbank-only").forEach(function (el) {
      var show = id === "vakifbank";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-qnb-only").forEach(function (el) {
      var show = id === "qnb";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-denizbank-only").forEach(function (el) {
      var show = id === "denizbank";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-ing-only").forEach(function (el) {
      var show = id === "ing";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
    $$(".field-teb-only").forEach(function (el) {
      var show = id === "teb";
      if (show) {
        el.removeAttribute("hidden");
        el.setAttribute("aria-hidden", "false");
      } else {
        el.setAttribute("hidden", "");
        el.setAttribute("aria-hidden", "true");
      }
    });
  }

  function zrecIbanCardValue(formatted) {
    if (!formatted || formatted === "—") return ": " + escapeHtml(formatted || "");
    var p = formatted.trim().split(/\s+/);
    if (p.length <= 1) return ": " + escapeHtml(formatted);
    var last = p[p.length - 1];
    var first = p.slice(0, -1).join(" ");
    return ": " + escapeHtml(first) + "<br>&nbsp;&nbsp;" + escapeHtml(last);
  }

  /** HTML şablonu: ": 08/11/2023-22:38:43 -<br>&nbsp;&nbsp;F35544_4003" */
  function zrecIslemTarihiValueInner(f) {
    var t = f.islemSaati || "00:00:00";
    var parts = t.split(":");
    if (parts.length === 2) t = t + ":00";
    var l1 = fmtDateSlash(f.islemTarihi) + "-" + t + " -";
    var l2 = f.ziIslemEk || "";
    var s = ": " + escapeHtml(l1);
    if (l2) s += "<br>&nbsp;&nbsp;" + escapeHtml(l2);
    return s;
  }

  function zrecRow(label, valueInnerHtml) {
    return (
      '<div class="row"><div class="label">' +
      escapeHtml(label) +
      '</div><div class="value">' +
      valueInnerHtml +
      "</div></div>"
    );
  }

  function zrecDetailItem(label, val) {
    return (
      '<div class="detail-item"><strong>' +
      escapeHtml(label) +
      ' :</strong> ' +
      escapeHtml(val || "—") +
      "</div>"
    );
  }

  function zrecReceiverAddrHtml(adres) {
    var raw = String(adres || "").trim();
    if (!raw) return "";
    var lines = raw
      .split(/\r?\n/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    if (lines.length === 0) return "";
    return lines
      .map(function (L) {
        return "<div>" + escapeHtml(L) + "</div>";
      })
      .join("");
  }

  function renderZiraatDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var komFmt = formatTry(f.ziKomisyon || "0");
    var yaz = tutarYaziBankaStili(f.tutar);
    var valorDisp = f.ziValor || fmtIsoToDot(f.islemTarihi);
    var ibanG = splitIban(f.gonderenIban);

    var leftCard =
      zrecRow("ŞUBE KODU/ADI", ": " + escapeHtml(f.ziSube || "—")) +
      zrecRow("IBAN", zrecIbanCardValue(ibanG)) +
      zrecRow("HESAP NUMARASI", ": " + escapeHtml(f.ziHesap || "—")) +
      zrecRow("VERGİ DAİRESİ", ": " + escapeHtml(f.ziVd || "")) +
      zrecRow("VERGİ KİMLİK NO", ": " + escapeHtml(f.ziVkn || "—")) +
      zrecRow("İŞLEM TARİHİ", zrecIslemTarihiValueInner(f)) +
      zrecRow("VALÖR", ": " + escapeHtml(valorDisp || "—")) +
      zrecRow("İŞLEM YERİ", ": " + escapeHtml(f.ziYer || "—"));

    var rightCard =
      '<div class="receiver-title">SAYIN</div>' +
      '<div class="receiver-name">' +
      escapeHtml(f.ziSayin || f.gonderen || "—") +
      "</div>" +
      zrecReceiverAddrHtml(f.ziAdres);

    var details =
      zrecDetailItem("Açıklama", f.aciklama) +
      zrecDetailItem("Alacaklı Şube", f.ziAlacakliSube) +
      zrecDetailItem("Alacaklı Hesap", f.ziAlacakliHesap) +
      zrecDetailItem("Alacaklı IBAN", splitIban(f.aliciIban)) +
      zrecDetailItem("Alacaklı Adı Soyadı", f.alici) +
      zrecDetailItem("Alacaklı Vergi No", f.ziAlacakliVkn) +
      zrecDetailItem("Komisyon", komFmt + " TRY") +
      zrecDetailItem("Havale Tutarı", tutarFmt + " TRY");

    var altLine = ((f.ziAltTs || "") + (f.ziKanalKod ? " " + f.ziKanalKod : "")).trim();
    var footerLeft =
      "Hesabınızdan " +
      escapeHtml(tutarFmt) +
      " TL (" +
      escapeHtml(yaz.parantez) +
      ") Çekilmiştir." +
      (altLine ? "<br>" + escapeHtml(altLine) : "");

    var legalBody =
      "Taraflar arasında tüm uyuşmazlıklarda, Bankanın defter kayıtları ve belgeleri, müstenitli olsun olmasın, kesin ve aksi ileri sürülemez delil niteliğindedir.";
    var legalAddr =
      "Merkez: Finanskent Mahallesi Finans Caddesi No:44A Ümraniye/İstanbul Ticaret Sicil No:475225-5 www.ziraatbank.com.tr";

    return (
      '<div class="ziraat-slip-scope" id="ziraatDekontRoot">' +
      '<div class="header">' +
      '<div class="logo-box">' +
      ZIRAAT_LOGO_IMG_HTML +
      '</div><div class="main-title">Hesaptan Hesaba Havale</div></div>' +
      '<div class="receipt-border-wrap">' +
      '<div class="receipt-container">' +
      '<div class="grid-container">' +
      '<div class="info-card">' +
      leftCard +
      "</div>" +
      '<div class="info-card">' +
      rightCard +
      "</div></div>" +
      '<div class="payment-details">' +
      details +
      "</div>" +
      '<div class="footer-wrap">' +
      '<div class="footer-left">' +
      footerLeft +
      "</div>" +
      '<div class="footer-right">' +
      '<div class="respects">Saygılarımızla</div>' +
      '<div class="bank-title">T.C. ZİRAAT BANKASI A.Ş.</div>' +
      '<div class="bank-title">' +
      escapeHtml(f.ziImza || "İNTERNET ŞUBESİ") +
      "</div></div></div>" +
      "</div>" +
      "</div>" +
      '<div class="legal-notice">' +
      escapeHtml(legalBody) +
      '<div class="address-bar">' +
      escapeHtml(legalAddr) +
      "</div></div></div>"
    );
  }

  function isbankRow(label, valueInnerHtml) {
    return (
      '<div class="row"><div class="label">' +
      escapeHtml(label) +
      '</div><div class="value">' +
      valueInnerHtml +
      "</div></div>"
    );
  }

  function isbankKanalBuyuk(s) {
    return String(s || "")
      .trim()
      .toLocaleUpperCase("tr-TR");
  }

  function isbankIslemValorValue(f) {
    var d = fmtIsoToDot(f.islemTarihi);
    var t = f.islemSaati || "00:00:00";
    if (t.split(":").length === 2) t = t + ":00";
    var val = (f.isValor || "").trim() || d;
    return ": " + escapeHtml(d + " " + t + " / " + val);
  }

  function isbankTcknValue(raw) {
    var d = String(raw || "").replace(/\D/g, "");
    if (!d) return ": —";
    var bas = d.length >= 7 ? d.slice(0, 7) : d;
    return ": " + escapeHtml(bas) + "****";
  }

  function renderIsbankEdekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var fastFmt = formatTry(f.isFastUcret || "0");
    var toplamFmt = addTryStrings(f.tutar, f.isFastUcret || "0");

    var merkezBilgi =
      "Şirket Merkezi: İstanbul<br>" +
      "Büyük Mükellefler V.D. 481 005 8590 Sicil No: 431112<br>" +
      "www.isbank.com.tr | 0 850 724 0 724";

    var footerUyari =
      "İşbu dekonta konu olan işlem gerçekleştirilmeden önce, işlem ücreti hakkında bankaca tarafıma gerekli bilgilendirme yapılmıştır. İşlem ücretini onaylıyorum.";

    var gib =
      "GİB izni ile elektronik olarak üretilmiştir. e-Dekontu Şube, İşCep ve www.isbank.com.tr'den temin edebilirsiniz.";

    return (
      '<div class="isbank-edekont-scope" id="isbankDekontRoot">' +
      '<div class="edekont-container">' +
      '<div class="edekont-header">' +
      '<div class="logo-section">' +
      ISBANK_LOGO_IMG_HTML +
      "</div>" +
      '<div class="center-info">' +
      merkezBilgi +
      "</div>" +
      '<div class="e-dekont-logo">' +
      IS_EDEKONT_ICON_SVG +
      '<div class="e-dekont-text">e-Dekont</div></div></div>' +
      '<div class="info-grid">' +
      "<div>" +
      '<div style="margin-bottom: 25px;">' +
      "<strong>" +
      escapeHtml(f.gonderen || "—") +
      "</strong><br><br>" +
      isbankRow("Müşteri No", ": " + escapeHtml(f.isMusteriNo || "—")) +
      isbankRow("TCKN", isbankTcknValue(f.isTckn)) +
      "</div>" +
      '<div class="title-blue">' +
      escapeHtml(f.isBaslik || "Giden Fast İşlemi") +
      "</div>" +
      isbankRow("IBAN", ": " + escapeHtml(splitIban(f.gonderenIban))) +
      isbankRow("İşlem Tutarı", ": " + escapeHtml(tutarFmt) + " TRY") +
      isbankRow("FAST Ücreti ve Vergi", ": " + escapeHtml(fastFmt) + " TRY") +
      isbankRow(
        "Toplam İşlem Tutarı",
        "<strong>: " + escapeHtml(toplamFmt) + " TRY</strong>"
      ) +
      "</div>" +
      '<div style="margin-top: 15px;">' +
      isbankRow("İşlem Yeri", ": " + escapeHtml(isbankKanalBuyuk(f.kanal))) +
      isbankRow("İşlem Zam./Valör", isbankIslemValorValue(f)) +
      isbankRow(
        "Referans Numarası",
        ": " + escapeHtml(f.isRef || f.referas || "—")
      ) +
      isbankRow("Dekont Tarihi", ": " + escapeHtml(f.isDekontTs || "—")) +
      isbankRow(
        "e-Dekont Belge No",
        ": " + escapeHtml(f.isEdocNo || f.dekontNo || "—")
      ) +
      isbankRow("ETTN", ": " + escapeHtml(f.isEttn || "—")) +
      isbankRow(
        "Senaryo/Dekont Tipi",
        ": " + escapeHtml(f.isSenaryo || "—")
      ) +
      "<br>" +
      isbankRow("Sorgu Numarası", ": " + escapeHtml(f.isSorguNo || "—")) +
      isbankRow(
        "Alıcı Banka",
        ": " + escapeHtml(f.isAliciBanka || "—")
      ) +
      isbankRow("Alıcı IBAN", ": " + escapeHtml(splitIban(f.aliciIban))) +
      isbankRow("Alıcı İsim/Unvan", ": " + escapeHtml(f.alici || "—")) +
      "</div></div>" +
      '<div class="row" style="margin-top: 30px;"><div class="label" style="width: 100px;">Açıklama:</div><div class="value">' +
      escapeHtml(f.aciklama || "—") +
      "</div></div>" +
      '<div class="footer-note">' +
      footerUyari +
      "</div>" +
      '<div class="gib-note">' +
      gib +
      "</div></div></div>"
    );
  }

  function garantiRow(label, valueInnerHtml) {
    return (
      '<div class="grt-data-row"><div class="grt-label">' +
      escapeHtml(label) +
      '</div><div class="grt-separator">:</div><div class="grt-value">' +
      valueInnerHtml +
      "</div></div>"
    );
  }

  function garantiAdresHtml(adres) {
    var lines = String(adres || "")
      .split(/\r?\n/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    if (lines.length === 0) return "";
    return lines
      .map(function (L) {
        return "<div>" + escapeHtml(L) + "</div>";
      })
      .join("");
  }

  function renderGarantiDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var bankInfoStatic =
      "<strong>T. Garanti Bankası A.Ş.</strong><br>" +
      "Genel Müdürlük: Nispetiye Mah. Aytar Cad. No:2, Beşiktaş, Levent, 34340, İstanbul<br>" +
      "Büyük Mükellefler Vergi Dairesi Vergi Başkanlığı Vergi No: 8790017566<br>" +
      "Mersis Numarası: 0879 0017 5660 0379 | www.garantibbva.com.tr";

    var islemYer = (f.gaIslemYeri || "").trim() || "MOBİL";
    var yaziSatir =
      (f.gaTutarYazi || "").trim() ||
      "YALNIZ " + tutarYaziBankaStili(f.tutar).tek.replace(/\s+/g, "") + "TL.";

    return (
      '<div class="garanti-slip-scope" id="garantiDekontRoot">' +
      '<div class="grt-container">' +
      '<div class="grt-header">' +
      '<div class="grt-logo-area">' +
      GARANTI_LOGO_IMG_HTML +
      "</div>" +
      '<div class="grt-green-banner">' +
      '<div class="grt-dekont-title">Dekont</div>' +
      '<div class="grt-bank-info">' +
      bankInfoStatic +
      "</div></div></div>" +
      '<div class="grt-centered-text">HESAPTAN HESABA HAVALE</div>' +
      '<div class="grt-top-boxes">' +
      '<div class="grt-box">' +
      garantiRow("ŞUBE ADI", escapeHtml(f.gaSube || "—")) +
      garantiRow("MÜŞTERİ NUMARASI", escapeHtml(f.gaMusteriNo || "—")) +
      garantiRow("HESAP NUMARASI", escapeHtml(f.gaHesapNo || "—")) +
      garantiRow("İŞLEM TARİHİ", escapeHtml(fmtDateSlash(f.islemTarihi))) +
      garantiRow("TC KİMLİK NO", escapeHtml(f.gaTckn || "—")) +
      garantiRow("İŞLEM YERİ", escapeHtml(islemYer)) +
      "<br>" +
      '<div style="font-size: 11px;">DÜZENLENME TARİHİ: ' +
      escapeHtml(f.gaDuzenleme || "—") +
      "</div>" +
      '<div style="font-size: 11px;">IBAN: ' +
      escapeHtml(splitIban(f.gonderenIban)) +
      "</div></div>" +
      '<div class="grt-box">' +
      '<div style="margin-bottom: 5px;">SAYIN</div>' +
      '<div class="grt-value grt-sayin-name">' +
      escapeHtml(f.gonderen || "—") +
      "</div>" +
      garantiAdresHtml(f.gaSayinAdres) +
      "</div></div>" +
      '<div class="grt-middle-box">' +
      '<div class="grt-value" style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">' +
      escapeHtml(f.gaOrtaBaslik || f.aciklama || "—") +
      "</div>" +
      garantiRow("ALACAKLI ŞUBE", escapeHtml(f.gaAlacakliSube || "—")) +
      garantiRow(
        "ALACAKLI HESAP",
        escapeHtml(f.gaAlacakliHesapDetay || "—")
      ) +
      garantiRow("ALACAKLI IBAN", escapeHtml(splitIban(f.aliciIban))) +
      garantiRow("MASRAF HESABI", escapeHtml(f.gaMasrafHesabi || "—")) +
      garantiRow("MASRAF TUTARI", escapeHtml(f.gaMasraf || "—")) +
      garantiRow("BSMV", escapeHtml(f.gaBsmv || "—")) +
      garantiRow("MASRAF TOPLAMI", escapeHtml(f.gaMasrafToplam || "—")) +
      "<br><br>" +
      '<div class="grt-yazi-italic">' +
      escapeHtml(yaziSatir) +
      "</div></div>" +
      '<div class="grt-bottom-row">' +
      '<div class="grt-box" style="display: flex; align-items: center;">' +
      '<div style="font-size: 10px;">SIRA NO : ' +
      escapeHtml(f.gaSiraNo || f.dekontNo || "—") +
      "</div></div>" +
      '<div class="grt-box grt-total-row">' +
      '<span style="font-size: 14px;">TUTAR :</span>' +
      '<span>- ' +
      escapeHtml(tutarFmt) +
      " TL</span></div></div></div></div>"
    );
  }

  function ibanCompact(raw) {
    if (!raw) return "—";
    return String(raw).replace(/\s/g, "").toUpperCase();
  }

  function akbIslemTarihSaat(f) {
    var d = fmtIsoToDot(f.islemTarihi);
    var t = f.islemSaati || "00:00:00";
    if (t.split(":").length === 2) t = t + ":00";
    return d + " " + t;
  }

  function akbRow(label, val) {
    var v = val == null ? "" : String(val);
    return (
      '<div class="akb-row"><span class="akb-label">' +
      escapeHtml(label) +
      '</span><span class="akb-value">: ' +
      escapeHtml(v) +
      "</span></div>"
    );
  }

  function akbAmtRow(label, c2, c3) {
    return (
      "<tr><td>" +
      escapeHtml(label) +
      '</td><td class="akb-col-right">' +
      escapeHtml(c2) +
      '</td><td class="akb-col-right">' +
      escapeHtml(c3) +
      "</td></tr>"
    );
  }

  function akbQrImgSrc(data) {
    return (
      "https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=" +
      encodeURIComponent(data || "https://www.akbank.com")
    );
  }

  function renderAkbankDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var yazi = (f.akTutarYazi || "").trim();
    if (!yazi) {
      var p = parseTryAmount(f.tutar);
      var l = sayiOkunusTrUpper(p.lira).replace(/\s+/g, "");
      yazi =
        "YALNIZ " +
        l +
        " TL" +
        (p.kurus > 0 ? " " + sayiOkunusTrUpper(p.kurus).replace(/\s+/g, "") + " KR" : "");
    }

    var qrData = (f.akQrUrl || "").trim() || "https://www.akbank.com";
    var bankInfoLeft =
      "Akbank T.A.Ş.<br>" +
      "Genel Müdürlük: Sabancı Center 4. Levent 34330<br>" +
      "İstanbul<br>" +
      "Mersis No: 0015001526400497";

    return (
      '<div class="akbank-slip-scope" id="akbankDekontRoot">' +
      '<div class="akb-receipt-container">' +
      '<div class="akb-header">' +
      '<div class="akb-header-logo">' +
      AKBANK_LOGO_IMG_HTML +
      "</div>" +
      '<div class="akb-header-title">' +
      "<h1>DEKONT</h1>" +
      "<p>" +
      escapeHtml(f.akHeaderSub || "EFT BANKALAR ARASI HESABA HAVALE") +
      "</p></div>" +
      '<div class="akb-qr-code">' +
      '<img src="' +
      akbQrImgSrc(qrData) +
      '" alt="QR" width="50" height="50" decoding="async">' +
      "</div></div>" +
      '<div class="akb-info-grid">' +
      '<div class="akb-info-box akb-border-right">' +
      '<span class="akb-box-title">GÖNDERİCİ BİLGİLERİ</span>' +
      akbRow("Düzenleyen Şube", f.akDuzenleyenSube || "—") +
      akbRow("Borçlu Hesap No", f.akBorcluHesap || "—") +
      akbRow("Müşteri No", f.akMusteriNo || "—") +
      akbRow("VKN/Vergi Dairesi", f.akGonderenVkn || "—") +
      akbRow("Adı Soyadı/Unvan", f.gonderen || "—") +
      akbRow("Adres", f.akGonderenAdres || "—") +
      "</div>" +
      '<div class="akb-info-box">' +
      '<span class="akb-box-title">ALICI BİLGİLERİ</span>' +
      akbRow(
        "Alacaklı Hesap No",
        f.akAliciHesapSatir || splitIban(f.aliciIban)
      ) +
      akbRow("Karşı Şube", f.akKarsiSube || "—") +
      akbRow("VKN/Vergi Dairesi", f.akAliciVknVd || "") +
      akbRow("Adı Soyadı/Unvan", f.alici || "—") +
      akbRow("Adres", f.akAliciAdres || "") +
      "</div></div>" +
      '<div class="akb-iban-section">' +
      escapeHtml(ibanCompact(f.gonderenIban)) +
      "<br>" +
      escapeHtml(f.akIbanAciklama || "—") +
      "</div>" +
      '<div class="akb-amount-section">' +
      '<span class="akb-box-title">TUTAR BİLGİLERİ</span>' +
      '<table class="akb-amount-table">' +
      akbAmtRow(
        "MEVDUAT",
        f.akAmtMev1 || "0,00 TL",
        f.akAmtMev2 || "0,00 TL"
      ) +
      akbAmtRow("ŞCH", f.akAmtSch1 || "0,00 TL", f.akAmtSch2 || "0,00 TL") +
      akbAmtRow(
        "KOMİSYON",
        f.akAmtKom1 || "0,00 TL",
        f.akAmtKom2 || "0,00 TL"
      ) +
      akbAmtRow("BSMV", f.akAmtBsm1 || "0,00 TL", f.akAmtBsm2 || "0,00 TL") +
      "</table>" +
      '<div class="akb-total-row">' +
      "<span>TOPLAM</span>" +
      "<span>" +
      escapeHtml(tutarFmt) +
      " TL</span></div>" +
      '<div class="akb-amount-text">' +
      escapeHtml(yazi) +
      "</div></div>" +
      '<div class="akb-footer-grid">' +
      '<div class="akb-footer-box akb-border-right">' +
      akbRow("İşlem Tarihi/Saati", akbIslemTarihSaat(f)) +
      akbRow("Valör", f.akValor || "") +
      akbRow("Referans", f.akRefFooter || "") +
      akbRow("İşlemi Yapan", f.akIslemYapan || "—") +
      akbRow("İşlemi Yapan Ad-Soyad", f.gonderen || "—") +
      akbRow("İşlemi Yapan TCKN", f.akIslemYapanTckn || "—") +
      '<div style="font-weight: bold; margin-top: 5px;">' +
      escapeHtml(f.akFooterKod || "—") +
      "</div></div>" +
      '<div class="akb-footer-box">' +
      '<span class="akb-signature-title">MÜŞTERİ İMZASI</span>' +
      "</div></div>" +
      '<div class="akb-footer-grid akb-footer-grid--extra">' +
      '<div class="akb-footer-box akb-border-right">' +
      '<div class="akb-bank-info">' +
      bankInfoLeft +
      "</div></div>" +
      '<div class="akb-footer-box">' +
      '<span class="akb-signature-title">YETKİLİ İMZASI</span>' +
      '<div style="font-size: 8px; margin-top: 20px;">' +
      "Vergi Dairesi: Büyük Mükellefler<br>" +
      "Vergi No: 0150015264<br>" +
      "www.akbank.com" +
      "</div></div></div>" +
      '<div class="akb-version">v2.0</div></div></div>'
    );
  }

  function ykNextDaySlash(iso) {
    if (!iso || iso.length < 10) return "—";
    var p = iso.split("-");
    if (p.length !== 3) return "—";
    var d = new Date(
      parseInt(p[0], 10),
      parseInt(p[1], 10) - 1,
      parseInt(p[2], 10)
    );
    if (isNaN(d.getTime())) return "—";
    d.setDate(d.getDate() + 1);
    var dd = String(d.getDate());
    if (dd.length === 1) dd = "0" + dd;
    var mm = String(d.getMonth() + 1);
    if (mm.length === 1) mm = "0" + mm;
    return dd + "/" + mm + "/" + d.getFullYear();
  }

  function ykIslemTarihSaat(f) {
    var d = fmtDateSlash(f.islemTarihi);
    var t = f.islemSaati || "00:00:00";
    if (t.split(":").length === 2) t = t + ":00";
    return d + " " + t;
  }

  function ykRow(label, val) {
    var v = val == null ? "" : String(val);
    return (
      '<div class="yk-row"><span class="yk-label">' +
      escapeHtml(label) +
      '</span><span class="yk-value">: ' +
      escapeHtml(v) +
      "</span></div>"
    );
  }

  function renderYapikrediDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var ibanDisp = splitIban(f.gonderenIban);
    var baslik =
      (f.ykDekontBaslik || "").trim() ||
      "KREDİ KARTI NAKİT AVANS DEKONTU";
    var islemRef =
      (f.ykIslemRef || "").trim() ||
      (f.referas || "").trim() ||
      f.dekontNo ||
      "—";
    var barkod = (f.ykBarkod || "").trim() || "—";
    var dekontSira = (f.ykDekontSira || "").trim() || "-";
    var valorDisp =
      (f.ykValor || "").trim() || ykNextDaySlash(f.islemTarihi);
    var yatirilan =
      (f.ykYatirilanHesap || "").trim() ||
      (ibanCompact(f.gonderenIban) !== "—"
        ? "IBAN: " + splitIban(f.gonderenIban)
        : "—");
    var faiz = (f.ykFaizOrani || "").trim() || "- (KKDF VE BSMV DAHİL DEĞİL)";
    var nakUcr = (f.ykNakitUcret || "").trim() || "- (BSMV DAHİL)";
    var havUcr = (f.ykHavaleUcret || "").trim() || "- (BSMV DAHİL)";
    var aciklama =
      (f.ykAciklamaLong || "").trim() ||
      "Kk (İşlem NAKİT ÇEKİM statüsündedir. Tutar geri ödenene kadar, Bankamızca uygulanan faiz oranları üzerinden, günlük faiz hesaplanır.)";
    var statusLine =
      (f.ykStatusText || "").trim() ||
      "İŞLEMİNİZ AN İTİBARIYLA TAMAMLANMIŞTIR.";
    var imzaSol = (f.ykImzaSol || "").trim() || "NURTEN ATLI";
    var imzaSag = (f.ykImzaSag || "").trim() || "GENEL MÜDÜRLÜK";

    return (
      '<div class="yapikredi-slip-scope" id="yapikrediDekontRoot">' +
      '<div class="yk-wrapper">' +
      '<div class="yk-header">' +
      '<div class="yk-logo">' +
      YAPIKREDI_LOGO_IMG_HTML +
      "</div>" +
      '<div class="yk-header-title">' +
      escapeHtml(baslik) +
      "</div></div>" +
      '<div class="yk-info-box yk-grid-2">' +
      '<div class="yk-left-col">' +
      ykRow("MÜŞTERİ NO", f.ykMusteriNo || "—") +
      ykRow("VKN/TCKN/YKN", f.ykVknMask || "**********") +
      ykRow("IBAN NO", ibanDisp) +
      ykRow("İŞLEM TARİHİ", ykIslemTarihSaat(f)) +
      ykRow("VALÖR", valorDisp) +
      "</div>" +
      '<div class="yk-right-col">' +
      ykRow("İŞLEM REF", islemRef) +
      ykRow("BARKOD", barkod) +
      ykRow("DEKONT SIRA NO", dekontSira) +
      ykRow("PERSONEL SİCİL", f.ykPersonelSicil || "—") +
      "</div></div>" +
      '<div class="yk-info-box yk-middle-box">' +
      ykRow("KREDİ KART NO", f.ykKrediKartNo || "—") +
      ykRow("KREDİ KARTI SAHİBİ", (f.ykKartSahibi || "").trim() || "-") +
      ykRow("NAKİT ÇEKİM TUTARI", tutarFmt) +
      ykRow("YATIRILAN HESAP NO", yatirilan) +
      ykRow("NAKİT ÇEKİM FAİZ ORANI", faiz) +
      ykRow("NAKİT ÇEKİM ÜCRETİ", nakUcr) +
      ykRow("HAVALE İŞLEM ÜCRETİ", havUcr) +
      '<div class="yk-status-text">' +
      escapeHtml(statusLine) +
      "</div></div>" +
      '<div class="yk-divider-text">YUKARIDAKİ TUTAR HESABINIZA BORÇ/ALACAK KAYDEDİLMİŞTİR.</div>' +
      '<div class="yk-info-box">' +
      '<div class="yk-row yk-aciklama-row">' +
      '<span class="yk-label">AÇIKLAMA:</span>' +
      '<span class="yk-value">' +
      escapeHtml(aciklama) +
      "</span></div></div>" +
      '<div class="yk-signature-grid">' +
      '<div class="yk-signature-box">' +
      escapeHtml(imzaSol) +
      "</div>" +
      '<div class="yk-signature-box">' +
      escapeHtml(imzaSag) +
      "</div></div>" +
      '<div class="yk-footer-info">' +
      '<div class="yk-footer-col">Yapı ve Kredi Bankası A.Ş.<br>www.yapikredi.com.tr</div>' +
      '<div class="yk-footer-col">Büyük Mükellefler VD<br>9370020892</div>' +
      '<div class="yk-footer-col">Ticaret Sicil Numarası: 32736<br>Mersis No: 0937002089200741</div>' +
      '<div class="yk-footer-col" style="border-right:none">İşletmenin Merkezi: Yapı Kredi Plaza<br>D Blok 34330 Levent - İstanbul</div>' +
      "</div></div></div>"
    );
  }

  function hbTimeHHmm(t) {
    var s = (t || "").trim();
    if (!s) return "—";
    var p = s.split(":");
    if (p.length >= 2) return p[0] + ":" + p[1];
    return s;
  }

  function hbComputeTutarYazi(rawTry) {
    var p = parseTryAmount(rawTry);
    var liraW = sayiOkunusTrUpper(p.lira).replace(/\s+/g, "");
    var kurus2 = String(p.kurus).padStart(2, "0");
    return "Y/(TL ) " + liraW + " %" + kurus2;
  }

  function renderHalkbankDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var hhmm = hbTimeHHmm(f.islemSaati);

    var hbTarih =
      (f.hbTarih || "").trim() || fmtIsoToDot(f.islemTarihi) || "—";
    var hbValor =
      (f.hbValor || "").trim() || hbTarih || fmtIsoToDot(f.islemTarihi) || "—";

    var ibanMask = (f.hbIbanMask || "").trim();
    if (!ibanMask) {
      var srcIban = (f.aliciIban || f.gonderenIban || "").trim();
      ibanMask = srcIban ? splitIban(srcIban) : "—";
    }

    var tutarYazi = (f.hbTutarYazi || "").trim() || hbComputeTutarYazi(f.tutar);
    var odemeTuru = (f.hbOdemeTuru || "").trim() || "99";

    var hbLogoBig =
      '<img src="' +
      HALKBANK_LOGO_LOCAL +
      '" alt="Halkbank Logo" style="width:250px; height:auto; display:block;" decoding="async" onerror="this.onerror=null;this.src=\'' +
      HALKBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
      '\'">';

    return (
      '<div class="halkbank-slip-scope" id="halkbankDekontRoot">' +
      '<div class="hb-receipt-container">' +
      '<div class="hb-header">' +
      '<div class="hb-logo">' +
      hbLogoBig +
      "</div>" +
      '<div class="hb-bank-info">' +
      "Ticaret Sicil No: 862070, Finanskent<br>" +
      "Mahallesi Finans Caddesi No:42 / 1 34760<br>" +
      "Ümraniye / İSTANBUL<br>" +
      "Tel: (216) 503 70 70 Faks: (212) 340 93 99<br>" +
      "www.halkbank.com.tr" +
      "</div>" +
      "</div>" +
      '<div class="hb-content">' +
      '<div class="hb-row">' +
      '<div class="hb-left-col">' +
      '<span class="hb-label">BIMREF (SERI-SIRANO) :</span> ' +
      escapeHtml(f.hbBimref || "—") +
      "<br>" +
      '<span class="hb-label">REFERANS:</span> ' +
      escapeHtml(f.hbReferans || "—") +
      "<br>" +
      '<span class="hb-label">AMİR :</span> ' +
      escapeHtml(f.hbAmirAdi || "—") +
      "<br>" +
      escapeHtml(f.hbAmirNo || "") +
      "</div>" +
      '<div class="hb-right-col">' +
      '<span class="hb-label">Tarih :</span> ' +
      escapeHtml(hbTarih) +
      "<br>" +
      '<span class="hb-label">Valör :</span> ' +
      escapeHtml(hbValor) +
      "<br>" +
      "B.Şube<br>" +
      escapeHtml(f.hbBSube || "—") +
      "</div>" +
      "</div>" +
      '<div class="hb-row" style="margin-top: 20px;">' +
      '<div class="hb-left-col">' +
      '<span class="hb-label">LEHDAR:</span> ' +
      escapeHtml(f.hbLehdar || "—") +
      "<br>" +
      escapeHtml(f.hbLehdarNo || "") +
      "<br>" +
      '<span class="hb-label">IBAN:</span> ' +
      escapeHtml(ibanMask) +
      "</div>" +
      '<div class="hb-right-col">' +
      "A.Şube<br>" +
      escapeHtml(f.hbASube || "—") +
      "<br><br>" +
      escapeHtml(f.hbSubeAdres || "—") +
      "</div>" +
      "</div>" +
      '<div class="hb-amount-section">' +
      "<div>HAVALE TUTARI &nbsp;&nbsp; (TL )</div>" +
      "<div>" +
      escapeHtml(tutarFmt) +
      "</div>" +
      "</div>" +
      '<div class="hb-row">' +
      '<div class="hb-left-col">' +
      escapeHtml(tutarYazi) +
      "</div>" +
      "</div>" +
      '<div class="hb-row" style="margin-top: 15px;">' +
      '<div class="hb-left-col">' +
      '<span class="hb-label">AÇIKLAMA :</span> ' +
      escapeHtml(f.aciklama || "—") +
      "</div>" +
      '<div class="hb-right-col" style="text-align:right;">' +
      "ÖDEME TURU :" +
      escapeHtml(odemeTuru) +
      "</div>" +
      "</div>" +
      '<div class="hb-row" style="margin-top: 20px;">' +
      '<div class="hb-left-col">WAPB &nbsp;&nbsp;&nbsp; HVLE ' +
      escapeHtml(hhmm) +
      "</div>" +
      '<div class="hb-right-col" style="text-align:right;">' +
      "TÜRKİYE HALK BANKASI A.Ş." +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="hb-footer-note">' +
      "Bu dekont bilgi amaçlıdır. Banka kayıtları ile arasında farklılık olması halinde Banka kayıtları geçerlidir." +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  function vbIslemSaatFull(f) {
    var t = (f.islemSaati || "").trim();
    if (!t) return "—";
    if (t.split(":").length === 2) t = t + ":00";
    return t;
  }

  function renderVakifbankDekont(f) {
    var tutarFmt = formatTry(f.tutar);
    var miktarCell = tutarFmt + " TL";
    var tarih = fmtIsoToDot(f.islemTarihi) || "—";
    var islemTuru = (f.vbIslemTuru || "").trim() || "FAST Anlık Ödeme";
    var hesapNo = (f.vbHesapNo || "").trim() || "—";
    var islemNo = (f.vbIslemNo || "").trim() || f.dekontNo || "—";
    var fisNo = (f.vbFisNo || "").trim();
    if (fisNo === "") fisNo = "0";
    var desc =
      (f.vbIslemAciklama || "").trim() ||
      (f.aciklama || "").trim() ||
      "—";
    var bankTitle = (f.vbBankTitle || "").trim() || "VAKIFBANK";
    var branchless = (f.vbBranchlessLabel || "").trim() || "Şubesiz Bankacılık";

    var logoHtml =
      '<img src="' +
      VAKIFBANK_LOGO_LOCAL +
      '" alt="VakıfBank Logo" class="vb-logo" decoding="async" onerror="this.onerror=null;this.src=\'' +
      VAKIFBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
      '\'">';

    return (
      '<div class="vakifbank-slip-scope" id="vakifbankDekontRoot">' +
      '<div class="vb-container">' +
      '<div class="vb-header">' +
      logoHtml +
      '<div class="vb-branchless-label">' +
      escapeHtml(branchless) +
      "</div></div>" +
      '<div class="vb-bank-title">' +
      escapeHtml(bankTitle) +
      "</div>" +
      '<div class="vb-section-box">' +
      '<div class="vb-section-header">İŞLEM BİLGİLERİ</div>' +
      '<table class="vb-info-table">' +
      "<tr>" +
      '<td class="vb-label">İŞLEM TÜRÜ</td><td>' +
      escapeHtml(islemTuru) +
      '</td><td class="vb-label">İŞLEM TARİHİ</td><td>' +
      escapeHtml(tarih) +
      "</td></tr>" +
      "<tr>" +
      '<td class="vb-label">MİKTARI</td><td>' +
      escapeHtml(miktarCell) +
      '</td><td class="vb-label">İŞLEM SAATİ</td><td>' +
      escapeHtml(vbIslemSaatFull(f)) +
      "</td></tr>" +
      "<tr>" +
      '<td class="vb-label">HESAP NO</td><td>' +
      escapeHtml(hesapNo) +
      '</td><td class="vb-label">İŞLEM NO</td><td>' +
      escapeHtml(islemNo) +
      "</td></tr>" +
      "<tr>" +
      '<td class="vb-label">FİŞ NO</td><td>' +
      escapeHtml(fisNo) +
      "</td><td></td><td></td></tr>" +
      "</table></div>" +
      '<div class="vb-section-box">' +
      '<div class="vb-section-header">İŞLEM AÇIKLAMASI</div>' +
      '<div class="vb-description-box">' +
      escapeHtml(desc) +
      "</div></div>" +
      '<div class="vb-footer-info">' +
      "Sicil Numarası: 776444<br>" +
      "Ticaret Ünvanı: Türkiye Vakıfllar Bankası T.A.O<br>" +
      "Ticaret Merkezi Adresi: Finanskent Mahallesi Finans Caddesi No:40/1 Ümraniye/İSTANBUL<br>" +
      "İnternet Sitesi Adresi: www.vakifbank.com.tr" +
      "</div>" +
      '<div class="vb-disclaimer">' +
      "Bu dekont bilgilendirme amaçlı hazırlanmıştır. Dekont üzerinde herhangi bir değişiklik yapılması ve/veya bu dekont üzerindeki bilgiler ile banka kayıtlarının uyuşmaması halinde banka kayıtları esas alınacaktır." +
      "</div></div></div>"
    );
  }

  function qnbFmtIslemTarihSaat(f) {
    var o = (f.qnbIslemTarihSaat || "").trim();
    if (o) return o;
    var d = fmtDateSlash(f.islemTarihi);
    var t = f.islemSaati || "00:00:00";
    if (t.split(":").length === 2) t = t + ":00";
    return d + " " + t;
  }

  function qnbAdresLinesHtml(raw) {
    var lines = String(raw || "")
      .split(/\r?\n/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    if (lines.length === 0) return "";
    return lines
      .map(function (L) {
        return escapeHtml(L);
      })
      .join("<br>");
  }

  function qnbDetayHtml(raw) {
    var lines = String(raw || "").split(/\r?\n/);
    return lines
      .map(function (line) {
        return escapeHtml(line);
      })
      .join("<br>");
  }

  function qnbTr(iban, aciklama, ba, para, tutar) {
    return (
      "<tr>" +
      "<td>" +
      escapeHtml(iban || "") +
      "</td><td>" +
      escapeHtml(aciklama || "") +
      "</td><td>" +
      escapeHtml(ba || "B") +
      "</td><td>" +
      escapeHtml(para || "TL") +
      '</td><td style="text-align:right;">' +
      escapeHtml(tutar || "") +
      "</td></tr>"
    );
  }

  function renderQnbDekont(f) {
    var ad = (f.qnbMusteriAd || "").trim() || f.gonderen || "—";
    var adresHtml = qnbAdresLinesHtml(f.qnbMusteriAdres);
    var musteriNo = (f.qnbMusteriNo || "").trim() || "—";
    var vkn = (f.qnbVkn || "").trim() || "—";
    var vd = (f.qnbVergiDairesi || "").trim();
    var islemYeri = (f.qnbIslemYeri || "").trim() || "MOBİL BANKACILIK";
    var islemTs = qnbFmtIslemTarihSaat(f);

    var logoHtml =
      '<div class="qnb-logo"><img src="' +
      QNB_LOGO_LOCAL +
      '" alt="QNB Finansbank" decoding="async" onerror="this.onerror=null;this.src=\'' +
      QNB_LOGO_REMOTE.replace(/'/g, "\\'") +
      '\'"></div>';

    var detayRaw = (f.qnbDetay || "").trim();
    if (!detayRaw) {
      var aliciIbanDisp = splitIban(f.aliciIban);
      detayRaw =
        "HESAPTAN HESABA HAVALE\n" +
        "HAVALEYİ GÖNDEREN HESAP UNVANI: " +
        (f.gonderen || ad) +
        "\n" +
        "HAVALEYİ ALAN MÜŞTERİ UNVANI: " +
        (f.alici || "—") +
        "\n" +
        "AÇIKLAMA: " +
        (f.aciklama || "—") +
        " YETKİ TİPİ:\n" +
        "HAVALEYİ ALAN HESAP NO 90830327 IBAN: " +
        (aliciIbanDisp !== "—" ? aliciIbanDisp : "—");
    }

    var sira = (f.qnbSiraNo || "").trim() || "—";
    var yapan = (f.qnbIslemYapan || "").trim() || "—";
    var fisAlt = (f.qnbFisNoAlt || "").trim() || "—";
    var sube1 = (f.qnbSubeSatir1 || "").trim() || "QNB Finansbank A.Ş.";
    var sube2 = (f.qnbSubeSatir2 || "").trim() || "ZEYTİNBURNU ŞUBESİ";

    return (
      '<div class="qnb-slip-scope" id="qnbDekontRoot">' +
      '<div class="qnb-dekont-container">' +
      '<div class="qnb-header">' +
      '<div class="qnb-bank-info">' +
      "<strong>QNB Finansbank A.Ş.</strong><br>" +
      "Büyük Mükellefler Vergi Dairesi<br>" +
      "Vergi No: 388 002 3334" +
      "</div>" +
      '<div class="qnb-dekont-title">DEKONT</div>' +
      logoHtml +
      "</div>" +
      '<div class="qnb-info-section">' +
      '<div class="qnb-customer-info">' +
      "<strong>" +
      escapeHtml(ad) +
      "</strong><br>" +
      (adresHtml || "&nbsp;") +
      "</div>" +
      '<div class="qnb-transaction-meta">' +
      '<div class="qnb-meta-row"><span class="qnb-meta-label">Müşteri No</span>: <span class="qnb-meta-value">' +
      escapeHtml(musteriNo) +
      "</span></div>" +
      '<div class="qnb-meta-row"><span class="qnb-meta-label">VKN / TCKN</span>: <span class="qnb-meta-value">' +
      escapeHtml(vkn) +
      "</span></div>" +
      '<div class="qnb-meta-row"><span class="qnb-meta-label">Vergi Dairesi</span>: <span class="qnb-meta-value">' +
      escapeHtml(vd) +
      "</span></div>" +
      '<div class="qnb-meta-row"><span class="qnb-meta-label">İşlem Yeri</span>: <span class="qnb-meta-value">' +
      escapeHtml(islemYeri) +
      "</span></div>" +
      '<div class="qnb-meta-row"><span class="qnb-meta-label">İşlem Tarihi</span>: <span class="qnb-meta-value">' +
      escapeHtml(islemTs) +
      "</span></div>" +
      "</div></div>" +
      '<div class="qnb-table-title">Aşağıdaki hesap/kredi artınızda karşılarında gösterilen hareketler gerçekleştirilmiştir.</div>' +
      '<table class="qnb-transaction-table">' +
      "<thead><tr>" +
      '<th style="width:25%;">Hesap/K Kart No / IBAN</th>' +
      '<th style="width:45%;">Açıklama</th>' +
      '<th style="width:5%;">B/A</th>' +
      '<th style="width:10%;">Para Cinsi</th>' +
      '<th style="width:15%;text-align:right;">TUTAR</th>' +
      "</tr></thead><tbody>" +
      qnbTr(
        f.qnbR1Iban,
        f.qnbR1Aciklama,
        f.qnbR1Ba,
        f.qnbR1Para,
        f.qnbR1Tutar
      ) +
      qnbTr(
        f.qnbR2Iban,
        f.qnbR2Aciklama,
        f.qnbR2Ba,
        f.qnbR2Para,
        f.qnbR2Tutar
      ) +
      qnbTr(
        f.qnbR3Iban,
        f.qnbR3Aciklama,
        f.qnbR3Ba,
        f.qnbR3Para,
        f.qnbR3Tutar
      ) +
      "</tbody></table>" +
      '<div class="qnb-details">' +
      qnbDetayHtml(detayRaw) +
      "</div>" +
      '<div class="qnb-footer">' +
      '<div class="qnb-footer-left">' +
      "Sıra No: " +
      escapeHtml(sira) +
      " &nbsp;&nbsp;&nbsp; İşlemi Yapan: " +
      escapeHtml(yapan) +
      " &nbsp;&nbsp;&nbsp; Fiş No: " +
      escapeHtml(fisAlt) +
      '<div style="margin-top:10px;">' +
      "QNB Finansbank Telefon Bankacılığı: 0850 222 0 000<br>" +
      "QNB Finansbank İnternet Bankacılığı: www.qnbfinansbank.com" +
      "</div></div>" +
      '<div class="qnb-footer-right">' +
      '<div class="qnb-branch-info">' +
      escapeHtml(sube1) +
      "<br>" +
      escapeHtml(sube2) +
      "</div>" +
      '<div class="qnb-legal-footer">' +
      "Merkez: Esentepe Mah. Büyükdere Cad. Kristal Kule No:215 Şişli-İstanbul<br>" +
      "Ticaret Sicil Numarası: 237525 Mersis No: 0388-0023-3346-0078" +
      "</div></div></div></div></div>"
    );
  }

  function renderDenizbankDekont(f) {
    function dnTarih(isoFallback) {
      var o = (f.dnIslemTarihiText || "").trim();
      if (o) return o;
      return fmtIsoToDot(isoFallback) || "—";
    }
    function dnValor(isoFallback) {
      var o = (f.dnValorText || "").trim();
      if (o) return o;
      return dnTarih(isoFallback);
    }
    var sayin = (f.dnSayin || "").trim() || f.gonderen || "—";
    var vknLine = (f.dnVknLine || "").trim() || "—";
    var rightTel = (f.dnRightTel || "").trim() || "4440800";
    var rightRef = (f.dnRightRef || "").trim() || "—";
    var islemTuru = (f.dnIslemTuru || "").trim() || "HESAPTAN EFT - Hesaba";
    var hesapNo = (f.dnHesapNo || "").trim() || "—";
    var ibanGoster =
      (f.dnIbanLine || "").trim() || splitIban(f.gonderenIban) || "—";
    var musteriAdi = (f.dnMusteriAdiFull || "").trim() || f.gonderen || "—";
    var islemT = dnTarih(f.islemTarihi);
    var valorT = dnValor(f.islemTarihi);
    var aliciBanka = (f.dnAliciBanka || "").trim() || "—";
    var aliciSube = (f.dnAliciSube || "").trim() || "—";
    var aliciIban =
      (f.dnAliciIbanLine || "").trim() || ibanCompact(f.aliciIban) || "—";
    var aliciAdi = (f.dnAliciAdi || "").trim() || f.alici || "—";
    var aliciVkn = (f.dnAliciVkn || "").trim();
    var tutarStr = (f.dnTutarText || "").trim() || formatTry(f.tutar);
    var masrafStr =
      (f.dnMasrafText || "").trim() ||
      "4,50 (Masraf EFT Tutarının Dışından)";
    var aciklamaTbl = (f.dnAciklamaTable || "").trim() || f.aciklama || "";
    var sumHesap = (f.dnSummaryHesap || "").trim() || hesapNo.split(" ")[0] || "—";
    var sumToplam = (f.dnSummaryToplam || "").trim() || "—";
    var eftSorgu = (f.dnEftSorgu || "").trim() || "—";
    var wm = (f.dnWatermark || "").trim();

    var denizLogo =
      '<img src="' +
      DENIZBANK_LOGO_LOCAL +
      '" alt="DenizBank Logo" decoding="async" onerror="this.onerror=null;this.src=\'' +
      DENIZBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
      "'\">";
    var sberLogo =
      '<img src="' +
      SBERBANK_LOGO_LOCAL +
      '" class="dn-sberbank-logo" alt="Sberbank" decoding="async" onerror="this.onerror=null;this.src=\'' +
      SBERBANK_LOGO_REMOTE.replace(/'/g, "\\'") +
      "'\">";
    var sigImg =
      '<img src="' +
      SIGNATURE_SAMPLE_LOCAL +
      '" class="dn-signature-img" alt="" decoding="async" onerror="this.onerror=null;this.src=\'' +
      SIGNATURE_SAMPLE_REMOTE.replace(/'/g, "\\'") +
      "'\">";

    return (
      '<div class="denizbank-slip-scope" role="document">' +
      '<div class="dn-dekont-container">' +
      (wm
        ? '<div class="dn-watermark">' + escapeHtml(wm) + "</div>"
        : "") +
      '<div class="dn-header">' +
      '<div class="dn-logo-area">' +
      denizLogo +
      '<div class="dn-bank-info">' +
      "Genel Müdürlük: Büyükdere Cad. No: 141 34394 Esentepe-İstanbul<br>" +
      "İstanbul Ticaret Sicil Memurluğu: 368587/316169<br>" +
      "Büyük Mükellefler V.D. No: 2920084498<br>" +
      "www.denizbank.com / 444 0 800" +
      "</div></div>" +
      '<div class="dn-center-title">' +
      "AçıkDeniz<br>İnternet Bankacılığı<br>e-Dekont" +
      "</div>" +
      '<div class="dn-right-info">' +
      "Şube Tel No: " +
      escapeHtml(rightTel) +
      "<br><br>" +
      escapeHtml(rightRef) +
      "</div></div>" +
      '<table class="dn-top-table"><tr>' +
      '<td style="width:50%;">' +
      "SAYIN : <strong>" +
      escapeHtml(sayin) +
      "</strong><br><br><br>" +
      "VKN/TCKN : " +
      escapeHtml(vknLine) +
      "</td><td>" +
      "İŞLEM TÜRÜ : " +
      escapeHtml(islemTuru) +
      "<br>" +
      "HESAP NUMARASI : " +
      escapeHtml(hesapNo) +
      "<br>" +
      "IBAN NUMARASI : " +
      escapeHtml(ibanGoster) +
      "<br>" +
      "MÜŞTERİ ADI : " +
      escapeHtml(musteriAdi) +
      "<br>" +
      "İŞLEM TARİHİ : " +
      escapeHtml(islemT) +
      "<br>" +
      "VALÖR TARİHİ : " +
      escapeHtml(valorT) +
      "</td></tr></table>" +
      '<div class="dn-section-title">İŞLEM BİLGİLERİ ve AÇIKLAMASI</div>' +
      '<table class="dn-details-table">' +
      "<tr><td>Alıcı Banka</td><td>: " +
      escapeHtml(aliciBanka) +
      "</td></tr>" +
      "<tr><td>Alıcı Şube</td><td>: " +
      escapeHtml(aliciSube) +
      "</td></tr>" +
      "<tr><td>Alıcı Hesap/IBAN No</td><td>: " +
      escapeHtml(aliciIban) +
      "</td></tr>" +
      "<tr><td>Alıcı Adı</td><td>: " +
      escapeHtml(aliciAdi) +
      "</td></tr>" +
      "<tr><td>Alıcı VKN</td><td>: " +
      escapeHtml(aliciVkn) +
      "</td></tr>" +
      "<tr><td>Tutar</td><td>: " +
      escapeHtml(tutarStr) +
      "</td></tr>" +
      "<tr><td>Masraf</td><td>: " +
      escapeHtml(masrafStr) +
      "</td></tr>" +
      "<tr><td>Açıklama</td><td>: " +
      escapeHtml(aciklamaTbl) +
      "</td></tr>" +
      "</table>" +
      '<div class="dn-summary-text">' +
      "Yukarıda detay bilgileri verilen EFT işlemi için " +
      escapeHtml(sumHesap) +
      " hesabınıza<br>" +
      "toplam " +
      escapeHtml(sumToplam) +
      " TL Borç kaydedilmiştir.<br><br>" +
      "<strong>EFT Sorgu Numarası: " +
      escapeHtml(eftSorgu) +
      "</strong></div>" +
      '<p class="dn-islem-notu">İşlem tamamlanma süresi azami 1 gündür.</p>' +
      '<div class="dn-footer"><div>' +
      sberLogo +
      "</div>" +
      '<div class="dn-signatures">' +
      "DenizBank A.Ş.<br>" +
      sigImg +
      "</div></div></div></div>"
    );
  }

  function renderIngDekont(f) {
    function ingBasimDisplay() {
      var o = (f.ingBasimTarihi || "").trim();
      if (o) return o;
      var d = fmtDateSlash(f.islemTarihi);
      var t = (f.islemSaati || "00:00:00").trim();
      if (t.split(":").length === 2) t = t + ":00";
      return d + " - " + t;
    }
    function ingTutarYaziAuto() {
      var o = (f.ingTutarYazi || "").trim();
      if (o) return o;
      var p = parseTryAmount(f.tutar);
      var l = sayiOkunusTrUpper(p.lira);
      if (p.kurus > 0) {
        return "YALNIZ " + l + " TL " + sayiOkunusTrUpper(p.kurus) + " KR'DİR";
      }
      return "YALNIZ " + l + " TL";
    }
    function ingAciklamaHtml() {
      var raw = (f.ingAciklamaMultiline || "").trim();
      if (!raw) raw = (f.aciklama || "").trim();
      if (!raw) return "—";
      var lines = raw
        .split(/\r?\n/)
        .map(function (x) {
          return x.trim();
        })
        .filter(Boolean);
      if (lines.length === 0) return "—";
      var out = ": " + escapeHtml(lines[0]);
      for (var i = 1; i < lines.length; i++) {
        out += "<br> &nbsp; " + escapeHtml(lines[i]);
      }
      return out;
    }

    var baslik = (f.ingDekontBaslik || "").trim() || "Dekont - ATM İŞLEMLERİ";
    var subHead = (f.ingSubHeader || "").trim() || "ING BANK A.Ş.";
    var sayin = (f.ingSayin || "").trim() || f.gonderen || "—";
    var vd = (f.ingVergiDairesi || "").trim() || "—";
    var vno = (f.ingVergiNo || "").trim() || "—";
    var dekNo =
      (f.ingDekontNoOverride || "").trim() || f.dekontNo || "—";
    var basim = ingBasimDisplay();
    var fisBil = (f.ingFisBilgileri || "").trim() || "—";
    var islemTar =
      (f.ingIslemTarihiText || "").trim() ||
      fmtDateSlash(f.islemTarihi) ||
      "—";
    var hesapAd = (f.ingHesapSahibi || "").trim() || f.gonderen || "—";
    var ibanG = (f.ingIbanGoster || "").trim();
    if (!ibanG && f.gonderenIban) {
      var rawIb = String(f.gonderenIban).replace(/\s/g, "").toUpperCase();
      if (rawIb.length >= 8) {
        ibanG =
          rawIb.slice(0, 3) + "**************************" + rawIb.slice(-2);
      } else ibanG = rawIb || "—";
    }
    if (!ibanG) ibanG = "—";
    var tutarDisp =
      (f.ingTutarMetin || "").trim() ||
      formatTry(f.tutar) + " TL";
    var toplamDisp =
      (f.ingToplamMetin || "").trim() || tutarDisp;
    var yazi = ingTutarYaziAuto();
    var tel = (f.ingTelefon || "").trim() || "0 850 222 0 600";
    var web = (f.ingWebsite || "").trim() || "www.ing.com.tr";
    var webHref = web.indexOf("http") === 0 ? web : "https://" + web.replace(/^\/\//, "");
    var footerLeg =
      (f.ingFooterYasal || "").trim() ||
      "Ticaret Ünvanı: ING Bank Anonim Şirketi; Sicil Numarası: 269682; İşletme Merkezi: İstanbul (Merkez Adresi: Reşitpaşa Mh. Eski Büyükdere Caddesi, No:8 34467 Sarıyer/İstanbul); İnternet Sitesi: www.ing.com.tr 0850 222 0 600 MERSİS No: 0876-0042-2430-0365";

    var ingLogo =
      '<img src="' +
      ING_LOGO_LOCAL +
      '" alt="ING Logo" class="ing-logo-img" decoding="async" onerror="this.onerror=null;this.src=\'' +
      ING_LOGO_FALLBACK.replace(/'/g, "\\'") +
      '\'">';

    return (
      '<div class="ing-slip-scope" role="document">' +
      '<div class="ing-dekont-container">' +
      '<div class="ing-header">' +
      '<div class="ing-logo">' +
      ingLogo +
      "</div>" +
      '<div class="ing-baslik">' +
      escapeHtml(baslik) +
      "</div></div>" +
      '<div class="ing-sub-header">' +
      escapeHtml(subHead) +
      "</div>" +
      '<div class="ing-sayin-text">Sayın ' +
      escapeHtml(sayin) +
      "</div>" +
      '<table class="ing-info-table">' +
      "<tr>" +
      '<td class="ing-label">Vergi Dairesi</td><td>: ' +
      escapeHtml(vd) +
      '</td><td class="ing-label">Dekont No</td><td>: ' +
      escapeHtml(dekNo) +
      "</td></tr>" +
      "<tr>" +
      '<td class="ing-label">Vergi No</td><td>: ' +
      escapeHtml(vno) +
      '</td><td class="ing-label">Basım Tarihi</td><td>: ' +
      escapeHtml(basim) +
      "</td></tr>" +
      "<tr>" +
      '<td class="ing-label">Fiş Bilgileri</td><td>: ' +
      escapeHtml(fisBil) +
      '</td><td class="ing-label">İşlem Tarihi</td><td>: ' +
      escapeHtml(islemTar) +
      "</td></tr></table>" +
      '<div class="ing-content-box">' +
      '<div class="ing-row">' +
      '<div class="ing-row-label">Kullanılan Hesap</div>' +
      '<div class="ing-row-value">: ' +
      escapeHtml(hesapAd) +
      "<br> &nbsp; IBAN: " +
      escapeHtml(ibanG) +
      "</div></div>" +
      '<div class="ing-row">' +
      '<div class="ing-row-label">İşlem Tutarı</div>' +
      '<div class="ing-row-value">: ' +
      escapeHtml(tutarDisp) +
      "</div></div>" +
      '<div class="ing-tutar-section">' +
      '<div class="ing-row">' +
      '<div class="ing-row-label">Toplam</div>' +
      '<div class="ing-row-value ing-toplam-tutar">: ' +
      escapeHtml(toplamDisp) +
      "</div></div>" +
      '<div class="ing-yazi-ile">' +
      escapeHtml(yazi) +
      "</div></div></div>" +
      '<div class="ing-aciklama-block">' +
      '<div class="ing-row">' +
      '<div class="ing-row-label" style="width:140px;">Açıklama</div>' +
      '<div class="ing-row-value">' +
      ingAciklamaHtml() +
      "</div></div></div>" +
      '<div class="ing-footer">' +
      '<div class="ing-phone">' +
      escapeHtml(tel) +
      "</div>" +
      '<a href="' +
      escapeHtml(webHref) +
      '" class="ing-website">' +
      escapeHtml(web) +
      "</a>" +
      "<div>" +
      escapeHtml(footerLeg) +
      "</div></div></div></div>"
    );
  }

  function renderTebDekont(f) {
    function tebTarihSaatDisplay() {
      var o = (f.tebTarihSaat || "").trim();
      if (o) return o;
      var d = fmtDateSlash(f.islemTarihi);
      var t = (f.islemSaati || "12:00:00").trim();
      var p = t.split(":");
      var hh = String(p[0] != null ? p[0] : "12");
      if (hh.length === 1) hh = "0" + hh;
      var mm = String((p[1] != null ? p[1] : "00") + "00").slice(0, 2);
      return d + " " + hh + "." + mm;
    }
    function tebBankInfoHtml() {
      var raw = (f.tebBankInfo || "").trim();
      if (!raw) {
        raw =
          "Türk Ekonomi Bankası A.Ş.\n" +
          "Ticaret Sicil: 189356, Mersis: 0876004342000105\n" +
          "Büyük Mükellefler V.D: 8760043420\n" +
          "TEB Kampüs C ve D Blok Saray Mah. Sokullu Cd. No: 7A-7B Ümraniye 34768 / İSTANBUL | www.teb.com.tr";
      }
      return raw
        .split(/\r?\n/)
        .map(function (line) {
          return escapeHtml(line);
        })
        .join("<br>");
    }
    function tebOdemeCumlesiAuto() {
      var o = (f.tebOdemeCumlesi || "").trim();
      if (o) return o;
      var tutarPart = formatTry(f.tutar);
      if (/,00$/.test(tutarPart)) tutarPart = tutarPart.slice(0, -3) + ",-";
      else tutarPart = tutarPart + "-";
      var p = parseTryAmount(f.tutar);
      var compact = sayiOkunusTrUpper(p.lira).replace(/\s+/g, "");
      return (
        "Hesaptan toplam TL " +
        tutarPart +
        " (Yalnız " +
        compact +
        "TL) ödenmiştir."
      );
    }

    var title =
      (f.tebTitle || "").trim() || "BANKALARARASI PARA TRANSFER DEKONTU";
    var islemNo =
      (f.tebIslemNo || "").trim() ||
      (f.dekontNo ? String(f.dekontNo) + " SYS" : "—");
    var musteri = (f.tebMusteriNo || "").trim() || "—";
    var hesapNo = (f.tebHesapNo || "").trim() || "—";
    var iban =
      (f.tebIban || "").trim() || splitIban(f.gonderenIban) || "—";
    var eftNo = (f.tebEftNo || "").trim() || "—";
    var hesapSahibi =
      (f.tebHesapSahibi || "").trim() || f.gonderen || "—";
    var sube = (f.tebHesapSubesi || "").trim() || "—";
    var karsiBanka =
      (f.tebKarsiBankaSatir || "").trim() ||
      "TÜRKİYE CUMHURİYETİ ZİRAAT BANKASI / IBAN MERKEZ ŞUBESİ";
    var valor =
      (f.tebValor || "").trim() ||
      fmtDateSlashShortYy(f.islemTarihi) ||
      "—";
    var tutarSatir =
      (f.tebTutarSatir || "").trim() ||
      formatTry(f.tutar) + "-";
    var odemeCumle = tebOdemeCumlesiAuto();
    var alacakliAd =
      (f.tebAlacakliAdi || "").trim() || f.alici || "—";
    var alacakliHes =
      (f.tebAlacakliHesap || "").trim() ||
      splitIban(f.aliciIban) ||
      "—";
    var alacakliBanka =
      (f.tebAlacakliBanka || "").trim() || "—";
    var sayin = (f.tebSayin || "").trim() || f.gonderen || "—";
    var aciklama =
      (f.tebAciklama || "").trim() || f.aciklama || "—";
    var islemTipi = (f.tebIslemTipi || "").trim() || "Diğer";
    var islemYeri =
      (f.tebIslemYeri || "").trim() ||
      "CEPTETEB Mobil Bankacılık Uygulaması";
    var footerTel =
      (f.tebFooterIrtibat || "").trim() || "0850 200 0 666";

    var tebLogo =
      '<img src="' +
      TEB_LOGO_LOCAL +
      '" alt="TEB Logo" class="teb-logo" decoding="async" onerror="this.onerror=null;this.src=\'' +
      TEB_LOGO_FALLBACK.replace(/'/g, "\\'") +
      '\'">';

    return (
      '<div class="teb-slip-scope" role="document">' +
      '<div class="teb-dekont-container">' +
      '<div class="teb-header">' +
      tebLogo +
      '<div class="teb-bank-info">' +
      tebBankInfoHtml() +
      "</div></div>" +
      '<div class="teb-title">' +
      escapeHtml(title) +
      "</div>" +
      '<div class="teb-top-meta">' +
      "Tarih-Saat: " +
      escapeHtml(tebTarihSaatDisplay()) +
      "<br>" +
      "İşlem No: " +
      escapeHtml(islemNo) +
      "</div>" +
      '<div class="teb-section-box">' +
      '<div class="teb-col teb-col-left">' +
      "Müşteri Numarası: " +
      escapeHtml(musteri) +
      "<br>" +
      "Hesap Numarası: " +
      escapeHtml(hesapNo) +
      "<br>" +
      "IBAN: " +
      escapeHtml(iban) +
      "<br>" +
      "EFT No: " +
      escapeHtml(eftNo) +
      "</div>" +
      '<div class="teb-col">' +
      "Hesap Sahibi: " +
      escapeHtml(hesapSahibi) +
      "<br>" +
      "Hesap Şubesi: " +
      escapeHtml(sube) +
      "</div></div>" +
      '<div class="teb-amount-section">' +
      '<div class="teb-amount-row">' +
      "<span>" +
      escapeHtml(karsiBanka) +
      "</span><span>Valör: " +
      escapeHtml(valor) +
      " &nbsp;&nbsp;&nbsp; TL &nbsp;&nbsp;&nbsp; " +
      escapeHtml(tutarSatir) +
      "</span></div>" +
      "<div>" +
      escapeHtml(odemeCumle) +
      "</div>" +
      "<br><br>" +
      "<div>" +
      "Alacaklı Adı: " +
      escapeHtml(alacakliAd) +
      "<br>" +
      "Alacaklı Hesap: " +
      escapeHtml(alacakliHes) +
      "<br>" +
      "Alacaklı Banka: " +
      escapeHtml(alacakliBanka) +
      "</div></div>" +
      '<div class="teb-section-box">' +
      '<div class="teb-col teb-col-left">' +
      "Sayın " +
      escapeHtml(sayin) +
      "</div>" +
      '<div class="teb-col">' +
      "Açıklama: " +
      escapeHtml(aciklama) +
      "<br><br><br>" +
      "İşlem Tipi: " +
      escapeHtml(islemTipi) +
      "<br>" +
      "İşlem Yeri: " +
      escapeHtml(islemYeri) +
      "</div></div>" +
      '<div class="teb-footer-text">' +
      "Elektronik olarak onaylanmıştır.<br>" +
      "Detaylı bilgi için irtibat numarası: " +
      escapeHtml(footerTel) +
      "</div></div></div>"
    );
  }

  function renderGenericDekont(b, f) {
    var tutarFmt = formatTry(f.tutar);
    var titleMap = {
      havale: "HAVALE İŞLEM DEKONTU",
      eft: "EFT / FAST İŞLEM DEKONTU",
      virman: "VİRMAN İŞLEM DEKONTU",
      odeme: "ÖDEME İŞLEM DEKONTU",
    };
    var title = titleMap[f.islemTipi] || "İŞLEM DEKONTU";

    function row(label, val_) {
      return (
        '<div class="dekont-row"><dt>' +
        escapeHtml(label) +
        '</dt><dd>' +
        escapeHtml(val_ || "—") +
        "</dd></div>"
      );
    }

    return (
      '<article class="dekont-paper ' +
      escapeHtml(b.className) +
      '" role="document">' +
      '<header class="dekont-header">' +
      '<div class="logo-slot">' +
      b.logoSvg +
      "</div>" +
      '<div class="dekont-type"><strong>Elektronik Dekont</strong>' +
      escapeHtml(f.kanal) +
      "</div></header>" +
      '<div class="dekont-body">' +
      '<h4 class="dekont-title">' +
      escapeHtml(title) +
      "</h4>" +
      '<dl class="dekont-rows">' +
      row("İşlem tarihi", fmtIsoToDot(f.islemTarihi).replace(/\./g, "/") + " — " + f.islemSaati) +
      row("Dekont / işlem no", f.dekontNo) +
      row("Gönderen", f.gonderen) +
      row("Gönderen IBAN", splitIban(f.gonderenIban)) +
      row("Alıcı", f.alici) +
      row("Alıcı IBAN", splitIban(f.aliciIban)) +
      row("Açıklama", f.aciklama) +
      row("Referans", f.referas) +
      row("Onay kodu", f.onayKodu) +
      "</dl>" +
      '<div class="dekont-amount"><div class="lbl">İşlem tutarı</div>' +
      '<div class="val">' +
      escapeHtml(tutarFmt) +
      " TL</div></div></div>" +
      '<footer class="dekont-footer">Bu belge elektronik ortamda üretilmiştir; ıslak imza gerektirmez.<div class="qr-line">' +
      escapeHtml(b.name + " | " + f.dekontNo + " | " + tutarFmt + " TRY") +
      "</div></footer></article>"
    );
  }

  function renderDekont() {
    var b = getBank();
    if (!b) {
      var paEmpty = $("#printArea");
      if (paEmpty) {
        paEmpty.innerHTML =
          '<div class="dekont-preview-placeholder" role="status"><p class="dekont-preview-placeholder__title">Önizleme</p><p class="dekont-preview-placeholder__sub">Banka seçildiğinde dekont taslağı burada oluşur.</p></div>';
      }
      return;
    }
    var f = readForm();
    if (b.id === "ziraat") {
      $("#printArea").innerHTML = renderZiraatDekont(f);
    } else if (b.id === "isbank") {
      $("#printArea").innerHTML = renderIsbankEdekont(f);
    } else if (b.id === "garanti") {
      $("#printArea").innerHTML = renderGarantiDekont(f);
    } else if (b.id === "akbank") {
      $("#printArea").innerHTML = renderAkbankDekont(f);
    } else if (b.id === "halkbank") {
      $("#printArea").innerHTML = renderHalkbankDekont(f);
    } else if (b.id === "vakifbank") {
      $("#printArea").innerHTML = renderVakifbankDekont(f);
    } else if (b.id === "qnb") {
      $("#printArea").innerHTML = renderQnbDekont(f);
    } else if (b.id === "denizbank") {
      $("#printArea").innerHTML = renderDenizbankDekont(f);
    } else if (b.id === "ing") {
      $("#printArea").innerHTML = renderIngDekont(f);
    } else if (b.id === "teb") {
      $("#printArea").innerHTML = renderTebDekont(f);
    } else if (b.id === "yapikredi") {
      $("#printArea").innerHTML = renderYapikrediDekont(f);
    } else {
      $("#printArea").innerHTML = renderGenericDekont(b, f);
    }
  }

  function defaultFormValues() {
    var b = getBank();
    if (!b) {
      return;
    }

    var today = new Date();
    var pad = function (n) {
      return String(n).padStart(2, "0");
    };
    var dateStr =
      today.getFullYear() +
      "-" +
      pad(today.getMonth() + 1) +
      "-" +
      pad(today.getDate());
    var timeStr =
      pad(today.getHours()) + ":" + pad(today.getMinutes()) + ":" + pad(today.getSeconds());

    $("#f-islem-tarihi").value = dateStr;
    $("#f-islem-saati").value = timeStr;
    $("#f-dekont-no").value = String(Math.floor(1e9 + Math.random() * 9e8));
    $("#f-gonderen").value = "AHMET YILMAZ";
    $("#f-gonderen-iban").value = "TR33 0006 1005 1978 6457 8413 26";
    $("#f-alici").value = "ORNEK ALICI LTD. ŞTİ.";
    $("#f-alici-iban").value = "TR33 0006 1005 1978 6457 8413 27";
    $("#f-tutar").value = "1.250,00";
    $("#f-aciklama").value = "Örnek işlem açıklaması";
    $("#f-referans").value = "REF-" + String(Math.floor(Math.random() * 1e6));
    $("#f-onay").value = String(Math.floor(100000 + Math.random() * 900000));
    if ($("#f-kanal")) $("#f-kanal").value = "Mobil Bankacılık";
  }

  function onBankChange() {
    setBankSpecificFieldsVisible();
    renderDekont();
  }

  function whenImagesLoaded(root, cb) {
    var ran = false;
    function finish() {
      if (ran) return;
      ran = true;
      cb();
    }
    var imgs = Array.prototype.slice.call(root.querySelectorAll("img"));
    var pending = imgs.filter(function (im) {
      return !im.complete;
    });
    if (pending.length === 0) {
      window.requestAnimationFrame(finish);
      return;
    }
    var left = pending.length;
    function one() {
      left--;
      if (left <= 0) finish();
    }
    pending.forEach(function (im) {
      im.addEventListener("load", one);
      im.addEventListener("error", one);
    });
    window.setTimeout(finish, 3000);
  }

  /** px → mm (96 DPI); tek A4 sayfasına sığdırmak için orantılı ölçek */
  function computeA4FitScale(el, sideMarginMm) {
    if (!el) return 1;
    sideMarginMm = sideMarginMm == null ? 8 : sideMarginMm;
    var innerWmm = 210 - 2 * sideMarginMm;
    var innerHmm = 297 - 2 * sideMarginMm;
    var mmPerPx = 25.4 / 96;
    try {
      var rw = el.scrollWidth;
      var rh = el.scrollHeight;
      if (rw < 2 || rh < 2) return 1;
      var wMm = rw * mmPerPx;
      var hMm = rh * mmPerPx;
      var s = Math.min(innerWmm / wMm, innerHmm / hMm, 1);
      return typeof s === "number" && isFinite(s) && s > 0 ? s : 1;
    } catch (e) {
      return 1;
    }
  }

  window.computeA4FitScale = computeA4FitScale;

  var printA4Backup = null;

  function onBeforePrintFitA4() {
    var earsiv = document.getElementById("earsivWorkspace");
    if (earsiv && !earsiv.hasAttribute("hidden")) return;
    var pa = $("#printArea");
    if (!pa || !pa.firstElementChild || printA4Backup) return;
    var root = pa.firstElementChild;
    var s = computeA4FitScale(root, 10);
    printA4Backup = {
      el: root,
      t: root.style.transform,
      o: root.style.transformOrigin,
    };
    if (s < 0.998) {
      root.style.transformOrigin = "top center";
      root.style.transform = "scale(" + s + ")";
    }
  }

  function onAfterPrintFitA4() {
    if (!printA4Backup) return;
    var b = printA4Backup;
    b.el.style.transform = b.t;
    b.el.style.transformOrigin = b.o;
    printA4Backup = null;
  }

  function downloadPdf() {
    if (!getBank()) {
      return;
    }
    renderDekont();
    var el = $("#printArea");
    if (!el || !el.firstElementChild) return;
    var root = el.firstElementChild;
    var safeName = "ziraat-dekont";
    var f = readForm();
    var bid = getBank().id;
    if (bid === "ziraat") safeName = "ziraat-hesaptan-havale-" + (f.dekontNo || "dekont").replace(/[^\w.-]+/g, "_");
    else if (bid === "isbank")
      safeName =
        "isbank-e-dekont-" +
        (f.isEdocNo || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "garanti")
      safeName =
        "garanti-havale-" +
        (f.gaSiraNo || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "akbank")
      safeName =
        "akbank-eft-" + (f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "halkbank")
      safeName =
        "halkbank-havale-" +
        (f.hbReferans || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "vakifbank")
      safeName =
        "vakifbank-fast-" +
        (f.vbIslemNo || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "qnb")
      safeName =
        "qnb-finansbank-dekont-" +
        (f.qnbSiraNo || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "yapikredi")
      safeName =
        "yapikredi-nakit-avans-" +
        (f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "denizbank")
      safeName =
        "denizbank-e-dekont-" +
        (f.dnEftSorgu || f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "ing")
      safeName =
        "ing-dekont-" +
        (f.dekontNo || f.ingDekontNoOverride || "cikti").replace(/[^\w.-]+/g, "_");
    else if (bid === "teb")
      safeName =
        "teb-transfer-dekont-" +
        (f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");
    else safeName = (bid || "dekont") + "-" + (f.dekontNo || "cikti").replace(/[^\w.-]+/g, "_");

    var opt = {
      margin: [8, 8, 8, 8],
      filename: safeName + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        scrollY: 0,
        scrollX: 0,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    function runPdf() {
      if (typeof html2pdf === "undefined") {
        window.print();
        return;
      }
      var side = Array.isArray(opt.margin) ? opt.margin[0] : 8;
      var s = computeA4FitScale(root, side);
      var prevT = root.style.transform;
      var prevO = root.style.transformOrigin;
      function restore() {
        root.style.transform = prevT;
        root.style.transformOrigin = prevO;
      }
      if (s < 0.998) {
        root.style.transformOrigin = "top center";
        root.style.transform = "scale(" + s + ")";
      }
      window.requestAnimationFrame(function () {
        html2pdf()
          .set(opt)
          .from(root)
          .save()
          .then(function () {
            restore();
          })
          .catch(function () {
            restore();
            window.print();
          });
      });
    }

    whenImagesLoaded(root, runPdf);
  }

  function syncBankSelectInline() {
    var sel = $("#bankSelectInline");
    if (sel) {
      sel.value = state.bankId || "";
    }
  }

  function closeBankDrawer() {
    var side = $("#bankDrawer");
    var back = $("#navBackdrop");
    var btn = $("#navMenuBtn");
    if (side) side.classList.remove("is-open");
    if (back) {
      back.setAttribute("hidden", "");
      back.setAttribute("aria-hidden", "true");
    }
    if (btn) {
      btn.setAttribute("aria-expanded", "false");
    }
  }

  /** Banka seçili değilken form/önizleme gizli; e-Arşiv açıkken boş ekran gösterme. */
  function updateWorkspaceVisibility() {
    var earsiv = document.getElementById("earsivWorkspace");
    var inEarsiv = !!(earsiv && !earsiv.hasAttribute("hidden"));
    var empty = $("#dekontEmptyState");
    var ws = $("#dekontWorkspace");
    if (inEarsiv) {
      if (empty) empty.setAttribute("hidden", "");
      return;
    }
    var has = !!state.bankId;
    if (empty) {
      if (has) {
        empty.setAttribute("hidden", "");
      } else {
        empty.removeAttribute("hidden");
      }
    }
    if (ws) {
      if (has) {
        ws.removeAttribute("hidden");
      } else {
        ws.setAttribute("hidden", "");
      }
    }
  }

  function toggleBankDrawer() {
    var side = $("#bankDrawer");
    var back = $("#navBackdrop");
    var btn = $("#navMenuBtn");
    if (!side || !window.matchMedia("(max-width: 900px)").matches) return;
    var open = !side.classList.contains("is-open");
    side.classList.toggle("is-open", open);
    if (back) {
      if (open) {
        back.removeAttribute("hidden");
        back.setAttribute("aria-hidden", "false");
      } else {
        back.setAttribute("hidden", "");
        back.setAttribute("aria-hidden", "true");
      }
    }
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function bindNavDrawer() {
    var btn = $("#navMenuBtn");
    var back = $("#navBackdrop");
    if (btn) {
      btn.addEventListener("click", function () {
        toggleBankDrawer();
      });
    }
    if (back) {
      back.addEventListener("click", function () {
        closeBankDrawer();
      });
    }
    $$(".app-nav-link").forEach(function (a) {
      a.addEventListener("click", function () {
        closeBankDrawer();
      });
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") closeBankDrawer();
    });
  }

  var bankSelectInlineBound = false;

  function bindBankSelectInline() {
    var sel = $("#bankSelectInline");
    if (!sel || bankSelectInlineBound) {
      return;
    }
    bankSelectInlineBound = true;
    sel.addEventListener("change", function () {
      var id = sel.value;
      if (!id) {
        state.bankId = null;
        $("#selectedBankTitle").textContent = "—";
        $$(".bank-btn").forEach(function (x) {
          x.classList.remove("active");
        });
        setBankSpecificFieldsVisible();
        renderDekont();
        updateWorkspaceVisibility();
        return;
      }
      var b = null;
      for (var i = 0; i < BANKS.length; i++) {
        if (BANKS[i].id === id) {
          b = BANKS[i];
          break;
        }
      }
      if (!b) {
        return;
      }
      var wasEmpty = !state.bankId;
      state.bankId = b.id;
      $$(".bank-btn").forEach(function (x) {
        x.classList.toggle("active", x.dataset.bankId === state.bankId);
      });
      $("#selectedBankTitle").textContent = b.name;
      if (wasEmpty) {
        defaultFormValues();
      }
      onBankChange();
      updateWorkspaceVisibility();
      closeBankDrawer();
    });
  }

  function bankSidebarIcon(b) {
    if (b.badge) {
      return bankBadgeHtml(b.badge.letter, b.badge.bg, b.badge.fg, b.badge.wide);
    }
    return b.logoSvg || "";
  }

  function renderSidebar() {
    var ul = $("#bankList");
    if (ul) {
      ul.innerHTML = "";
      BANKS.forEach(function (b) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className =
          "bank-btn" + (state.bankId && b.id === state.bankId ? " active" : "");
        btn.dataset.bankId = b.id;
        btn.innerHTML =
          '<span class="bank-mini">' + bankSidebarIcon(b) + '</span><span class="bank-label">' + b.name + "</span>";
        btn.addEventListener("click", function () {
          var wasEmpty = !state.bankId;
          state.bankId = b.id;
          $$(".bank-btn").forEach(function (x) {
            x.classList.toggle("active", x.dataset.bankId === state.bankId);
          });
          $("#selectedBankTitle").textContent = b.name;
          syncBankSelectInline();
          if (wasEmpty) {
            defaultFormValues();
          }
          onBankChange();
          updateWorkspaceVisibility();
          closeBankDrawer();
        });
        li.appendChild(btn);
        ul.appendChild(li);
      });
    }
    var sel = $("#bankSelectInline");
    if (sel) {
      sel.innerHTML = "";
      var o0 = document.createElement("option");
      o0.value = "";
      o0.textContent = "Banka seçin";
      sel.appendChild(o0);
      BANKS.forEach(function (b) {
        var o = document.createElement("option");
        o.value = b.id;
        o.textContent = b.name;
        sel.appendChild(o);
      });
      sel.value = state.bankId || "";
    }
  }

  function bind() {
    if ($("#f-islem-saati")) $("#f-islem-saati").setAttribute("step", "1");
    bindNavDrawer();
    bindBankSelectInline();
    renderSidebar();
    if (state.bankId) {
      defaultFormValues();
      $("#selectedBankTitle").textContent = getBank() ? getBank().name : "—";
      syncBankSelectInline();
      onBankChange();
    } else {
      $("#selectedBankTitle").textContent = "—";
      syncBankSelectInline();
      setBankSpecificFieldsVisible();
      renderDekont();
    }
    updateWorkspaceVisibility();
    window.refreshDekontWorkspace = updateWorkspaceVisibility;

    $$("#panelForm input, #panelForm select, #panelForm textarea").forEach(function (el) {
      el.addEventListener("input", renderDekont);
      el.addEventListener("change", renderDekont);
    });

    $("#btnCreate").addEventListener("click", function () {
      if (!getBank()) return;
      renderDekont();
      $("#printArea").scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    $("#btnPrint").addEventListener("click", function () {
      if (!getBank()) return;
      renderDekont();
      window.print();
    });

    $("#btnPdf").addEventListener("click", downloadPdf);

    $("#btnReset").addEventListener("click", function () {
      if (!getBank()) return;
      defaultFormValues();
      renderDekont();
    });

    window.addEventListener("beforeprint", onBeforePrintFitA4);
    window.addEventListener("afterprint", onAfterPrintFitA4);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
