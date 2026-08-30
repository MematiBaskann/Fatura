/**
 * e-Arşiv Fatura — form, önizleme, yazdır / PDF
 */
(function () {
  "use strict";

  /** Varsayılan e-Arşiv görseli (yerel); yoksa uzak URL */
  var EARSIV_LOGO_LOCAL = "assets/img/earsiv-logo.jpeg";
  var EARSIV_LOGO_REMOTE =
    "https://uzmanposta.com/blog/wp-content/uploads/2023/06/e-arsiv-fatura-nedir-e-arsiv-fatura-mail-ile-nasil-gonderilir-1200x900.jpeg";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s == null ? "" : String(s);
    return d.innerHTML;
  }

  function val(id) {
    var e = document.getElementById(id);
    return e ? String(e.value).trim() : "";
  }

  function parseNum(s) {
    if (s == null || s === "") return 0;
    return parseFloat(String(s).replace(/\./g, "").replace(",", ".")) || 0;
  }

  function formatTL(n) {
    return (
      n.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + " TL"
    );
  }

  function qrUrl(data) {
    var d = encodeURIComponent(data || "");
    return "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + d;
  }

  function collectItems() {
    var rows = $$("#earsivItemsBody tr");
    var out = [];
    rows.forEach(function (tr, idx) {
      var mal = (tr.querySelector(".ea-mal") && tr.querySelector(".ea-mal").value) || "";
      var miktar = parseNum(tr.querySelector(".ea-miktar") && tr.querySelector(".ea-miktar").value);
      var birim = (tr.querySelector(".ea-birim") && tr.querySelector(".ea-birim").value) || "Adet";
      var bf = parseNum(tr.querySelector(".ea-bf") && tr.querySelector(".ea-bf").value);
      var kdv = parseNum(tr.querySelector(".ea-kdv") && tr.querySelector(".ea-kdv").value);
      if (!mal && !miktar && !bf) return;
      var malTutar = miktar * bf;
      var kdvTutar = malTutar * (kdv / 100);
      var kdvOranStr =
        "%" +
        kdv.toLocaleString("tr-TR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      out.push({
        sira: idx + 1,
        malHizmet: mal || "—",
        miktarStr: miktar.toLocaleString("tr-TR", { maximumFractionDigits: 4 }) + " " + birim,
        bfStr: formatTL(bf),
        kdvOranStr: kdvOranStr,
        kdvTutarStr: formatTL(kdvTutar),
        malHizmetTutarStr: formatTL(malTutar),
        _malTutar: malTutar,
        _kdvTutar: kdvTutar,
      });
    });
    return out;
  }

  function totalsFromItems(items, iskonto) {
    var malTop = 0;
    var kdvTop = 0;
    items.forEach(function (it) {
      malTop += it._malTutar || 0;
      kdvTop += it._kdvTutar || 0;
    });
    var isk = parseNum(iskonto);
    var vergilerDahil = malTop + kdvTop - isk;
    return {
      malTop: malTop,
      kdvTop: kdvTop,
      iskonto: isk,
      odenecek: vergilerDahil,
    };
  }

  function renderEarsiv() {
    var el = $("#earsivPrintArea");
    if (!el) return;

    var saticiUnvan = val("ea-satici-unvan") || "—";
    var saticiAdres = (val("ea-satici-adres") || "—").replace(/\n/g, "<br>");
    var saticiTel = val("ea-satici-tel") || "—";
    var saticiMail = val("ea-satici-email") || "—";
    var saticiVd = val("ea-satici-vd") || "—";
    var saticiTckn = val("ea-satici-tckn") || "----------------";

    var logoOverride = (val("ea-logo-url") || "").trim();
    var logoSrc = logoOverride || EARSIV_LOGO_LOCAL;
    var qrData = val("ea-qr-data") || val("ea-fatura-no") || "QR";

    var musteriUnvan = val("ea-musteri-unvan") || "—";
    var musteriAdres = (val("ea-musteri-adres") || "—").replace(/\n/g, "<br>");
    var musteriSehir = val("ea-musteri-sehir") || "—";
    var musteriUlke = val("ea-musteri-ulke") || "TÜRKİYE";
    var musteriMail = val("ea-musteri-email") || "—";
    var musteriTel = val("ea-musteri-tel") || "—";
    var musteriTckn = val("ea-musteri-tckn") || "----------------";

    var oz = val("ea-ozellestirme") || "TR1.2";
    var senaryo = val("ea-senaryo") || "EARSIVFATURA";
    var ftip = val("ea-fatura-tipi") || "SATIS";
    var fno = val("ea-fatura-no") || "—";
    var ftarih = val("ea-fatura-tarihi") || "—";
    var ettn = val("ea-ettn") || "—";

    var items = collectItems();
    if (items.length === 0) {
      items.push({
        sira: 1,
        malHizmet: "—",
        miktarStr: "—",
        bfStr: "—",
        kdvOranStr: "—",
        kdvTutarStr: "—",
        malHizmetTutarStr: "—",
        _malTutar: 0,
        _kdvTutar: 0,
      });
    }

    var t = totalsFromItems(items, val("ea-iskonto"));
    var firstTr = $$("#earsivItemsBody tr")[0];
    var kdvYuzde = "20";
    if (firstTr && firstTr.querySelector(".ea-kdv")) {
      kdvYuzde = String(parseNum(firstTr.querySelector(".ea-kdv").value) || 20);
    }

    var tbodyHtml = items
      .map(function (it) {
        return (
          "<tr>" +
          "<td>" +
          escapeHtml(String(it.sira)) +
          "</td>" +
          "<td>" +
          escapeHtml(it.malHizmet) +
          "</td>" +
          "<td>" +
          escapeHtml(it.miktarStr) +
          "</td>" +
          "<td>" +
          escapeHtml(it.bfStr) +
          "</td>" +
          "<td>" +
          escapeHtml(it.kdvOranStr) +
          "</td>" +
          "<td>" +
          escapeHtml(it.kdvTutarStr) +
          "</td>" +
          "<td>" +
          escapeHtml(it.malHizmetTutarStr) +
          "</td>" +
          "</tr>"
        );
      })
      .join("");

    var logoBlock =
      '<img src="' +
      escapeHtml(logoSrc) +
      '" alt="e-Arşiv Fatura" class="earsiv-logo-img" decoding="async" onerror="this.onerror=null;this.src=\'' +
      EARSIV_LOGO_REMOTE.replace(/'/g, "\\'") +
      '\'">';

    var kdvLabel = "Hesaplanan KDV (%" + kdvYuzde + ")";

    el.innerHTML =
      '<div class="earsiv-fatura-scope">' +
      '<div class="earsiv-container">' +
      '<div class="earsiv-header">' +
      '<div class="earsiv-company-info">' +
      "<h3>" +
      escapeHtml(saticiUnvan) +
      "</h3>" +
      "<p>" +
      saticiAdres +
      "<br>" +
      "Tel: " +
      escapeHtml(saticiTel) +
      "<br>" +
      "E-Posta: " +
      escapeHtml(saticiMail) +
      "<br>" +
      "Vergi Dairesi: " +
      escapeHtml(saticiVd) +
      "<br>" +
      "TCKN: " +
      escapeHtml(saticiTckn) +
      "</p></div>" +
      '<div class="earsiv-logo-section">' +
      logoBlock +
      '<p style="margin-top: 5px;"><strong>e-Arşiv Fatura</strong></p></div>' +
      '<div class="earsiv-qr-section">' +
      '<img src="' +
      escapeHtml(qrUrl(qrData)) +
      '" alt="QR" width="100" height="100">' +
      "</div></div>" +
      '<div class="earsiv-customer-section">' +
      '<div class="earsiv-customer-info">' +
      "<p><strong>SAYIN</strong><br>" +
      escapeHtml(musteriUnvan) +
      "<br>" +
      musteriAdres +
      "<br><br>" +
      escapeHtml(musteriSehir) +
      "<br>" +
      escapeHtml(musteriUlke) +
      "<br>" +
      "E-Posta: " +
      escapeHtml(musteriMail) +
      "<br>" +
      "Tel: " +
      escapeHtml(musteriTel) +
      "<br>" +
      "TCKN: " +
      escapeHtml(musteriTckn) +
      "</p></div>" +
      '<div class="earsiv-invoice-details">' +
      "<table>" +
      "<tr><th>Özelleştirme No:</th><td>" +
      escapeHtml(oz) +
      "</td></tr>" +
      "<tr><th>Senaryo:</th><td>" +
      escapeHtml(senaryo) +
      "</td></tr>" +
      "<tr><th>Fatura Tipi:</th><td>" +
      escapeHtml(ftip) +
      "</td></tr>" +
      "<tr><th>Fatura No:</th><td>" +
      escapeHtml(fno) +
      "</td></tr>" +
      "<tr><th>Fatura Tarihi:</th><td>" +
      escapeHtml(ftarih) +
      "</td></tr></table></div></div>" +
      "<p><strong>ETTN:</strong> " +
      escapeHtml(ettn) +
      "</p>" +
      '<table class="earsiv-items-table"><thead><tr>' +
      "<th>Sıra No</th><th>Mal Hizmet</th><th>Miktar</th>" +
      "<th>Birim Fiyat</th><th>KDV Oranı</th><th>KDV Tutarı</th><th>Mal Hizmet Tutarı</th>" +
      "</tr></thead><tbody>" +
      tbodyHtml +
      "</tbody></table>" +
      '<div class="earsiv-totals-section"><table class="earsiv-totals-table">' +
      "<tr><td>Mal Hizmet Toplam Tutarı</td><td>" +
      formatTL(t.malTop) +
      "</td></tr>" +
      "<tr><td>Toplam İskonto</td><td>" +
      formatTL(t.iskonto) +
      "</td></tr>" +
      "<tr><td>" +
      escapeHtml(kdvLabel) +
      "</td><td>" +
      formatTL(t.kdvTop) +
      "</td></tr>" +
      "<tr><td>Vergiler Dahil Toplam Tutar</td><td>" +
      formatTL(t.malTop + t.kdvTop - t.iskonto) +
      "</td></tr>" +
      "<tr><td><strong>Ödenecek Tutar</strong></td><td><strong>" +
      formatTL(t.odenecek) +
      "</strong></td></tr></table></div>" +
      '<div class="earsiv-footer-note">' +
      (val("ea-footer-not")
        ? escapeHtml(val("ea-footer-not")).replace(/\n/g, "<br>")
        : "") +
      "</div>" +
      '<div class="earsiv-return-section">' +
      '<div class="earsiv-return-box"><strong>İADE EDEN</strong><br>' +
      "Adı Soyadı: " +
      escapeHtml(val("ea-iade-eden-ad")) +
      "<br>Adresi: " +
      escapeHtml(val("ea-iade-eden-adres")) +
      "<br>İmzası: " +
      escapeHtml(val("ea-iade-eden-imza")) +
      "</div>" +
      '<div class="earsiv-return-box"><strong>İADE EDİLEN</strong><br>' +
      "Ürün Adı: " +
      escapeHtml(val("ea-iade-urun")) +
      "<br>Cinsi: " +
      escapeHtml(val("ea-iade-cins")) +
      "<br>Miktarı: " +
      escapeHtml(val("ea-iade-miktar")) +
      "<br>Birim Fiyat: " +
      escapeHtml(val("ea-iade-bf")) +
      "<br>Tutar: " +
      escapeHtml(val("ea-iade-tutar")) +
      "</div></div></div></div>";
  }

  function bindItemRows() {
    var form = $("#earsivForm");
    if (!form || form.dataset.earsivRowBound) return;
    form.dataset.earsivRowBound = "1";
    form.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("ea-row-remove")) {
        var tr = e.target.closest("tr");
        if (tr && $$("#earsivItemsBody tr").length > 1) tr.remove();
        renderEarsiv();
      }
    });
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
    window.setTimeout(finish, 4000);
  }

  var earsivPrintA4Backup = null;

  function a4FitScale(root, marginMm) {
    if (typeof window.computeA4FitScale === "function") {
      return window.computeA4FitScale(root, marginMm);
    }
    return 1;
  }

  function onBeforePrintFitA4Earsiv() {
    var earsiv = document.getElementById("earsivWorkspace");
    if (!earsiv || earsiv.hasAttribute("hidden")) return;
    var pa = $("#earsivPrintArea");
    if (!pa || !pa.firstElementChild || earsivPrintA4Backup) return;
    var root = pa.firstElementChild;
    var s = a4FitScale(root, 10);
    earsivPrintA4Backup = {
      el: root,
      t: root.style.transform,
      o: root.style.transformOrigin,
    };
    if (s < 0.998) {
      root.style.transformOrigin = "top center";
      root.style.transform = "scale(" + s + ")";
    }
  }

  function onAfterPrintFitA4Earsiv() {
    if (!earsivPrintA4Backup) return;
    var b = earsivPrintA4Backup;
    b.el.style.transform = b.t;
    b.el.style.transformOrigin = b.o;
    earsivPrintA4Backup = null;
  }

  function downloadEarsivPdf() {
    renderEarsiv();
    var el = $("#earsivPrintArea");
    if (!el || !el.firstElementChild) return;
    var root = el.firstElementChild;
    var fno = val("ea-fatura-no") || "earsiv";
    var safeName = "earsiv-fatura-" + fno.replace(/[^\w.-]+/g, "_");
    var opt = {
      margin: [8, 8, 8, 8],
      filename: safeName + ".pdf",
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
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
      var s = a4FitScale(root, side);
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

  function defaultEarsivValues() {
    var set = function (id, v) {
      var e = document.getElementById(id);
      if (e) e.value = v;
    };
    set("ea-satici-unvan", "ÖRNEK SATICI LTD. ŞTİ.");
    set(
      "ea-satici-adres",
      "Örnek Mah. Örnek Cad. No: 1\n34000 İstanbul"
    );
    set("ea-satici-tel", "0212 000 00 00");
    set("ea-satici-email", "satici@ornek.com");
    set("ea-satici-vd", "ÖRNEK VERGİ DAİRESİ");
    set("ea-satici-tckn", "----------------");
    set("ea-logo-url", "");
    set("ea-musteri-unvan", "AHMET YILMAZ");
    set("ea-musteri-adres", "Örnek Mah. Örnek Sok. No: 10");
    set("ea-musteri-sehir", "Kadıköy / İstanbul");
    set("ea-musteri-ulke", "TÜRKİYE");
    set("ea-musteri-email", "alici@ornek.com");
    set("ea-musteri-tel", "05XX XXX XX XX");
    set("ea-musteri-tckn", "----------------");
    set("ea-ozellestirme", "TR1.2");
    set("ea-senaryo", "EARSIVFATURA");
    set("ea-fatura-tipi", "SATIS");
    set("ea-fatura-no", "ORN2026000000001");
    set("ea-fatura-tarihi", "01-01-2026 12:00:00");
    set("ea-ettn", "00000000-0000-4000-8000-000000000001");
    set("ea-qr-data", "ORN2026000000001");
    set("ea-iskonto", "0,00");
    set("ea-footer-not", "");
    set("ea-iade-eden-ad", "");
    set("ea-iade-eden-adres", "");
    set("ea-iade-eden-imza", "");
    set("ea-iade-urun", "");
    set("ea-iade-cins", "");
    set("ea-iade-miktar", "");
    set("ea-iade-bf", "");
    set("ea-iade-tutar", "");

    var body = $("#earsivItemsBody");
    if (body) {
      body.innerHTML = "";
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td><input type="text" class="ea-mal" value="Örnek ürün / hizmet"></td>' +
        '<td><input type="text" class="ea-miktar" value="50"></td>' +
        '<td><input type="text" class="ea-birim" value="Adet"></td>' +
        '<td><input type="text" class="ea-bf" value="68"></td>' +
        '<td><input type="text" class="ea-kdv" value="20"></td>' +
        '<td><button type="button" class="btn btn-ghost ea-row-remove" style="padding:0.25rem 0.5rem;font-size:0.75rem">Sil</button></td>';
      body.appendChild(tr);
    }
  }

  function showDekontMode() {
    var d = $("#dekontWorkspace");
    var e = $("#earsivWorkspace");
    var btnE = $("#btnOpenEarsiv");
    var btnD = $("#btnOpenDekont");
    var btnEM = $("#btnOpenEarsivMobile");
    var btnDM = $("#btnOpenDekontMobile");
    if (e) e.setAttribute("hidden", "");
    if (typeof window.refreshDekontWorkspace === "function") {
      window.refreshDekontWorkspace();
    } else if (d) {
      d.removeAttribute("hidden");
    }
    if (btnE) btnE.removeAttribute("hidden");
    if (btnD) btnD.setAttribute("hidden", "");
    if (btnEM) btnEM.removeAttribute("hidden");
    if (btnDM) btnDM.setAttribute("hidden", "");
  }

  function showEarsivMode() {
    var d = $("#dekontWorkspace");
    var e = $("#earsivWorkspace");
    var btnE = $("#btnOpenEarsiv");
    var btnD = $("#btnOpenDekont");
    var btnEM = $("#btnOpenEarsivMobile");
    var btnDM = $("#btnOpenDekontMobile");
    var empty = $("#dekontEmptyState");
    if (empty) empty.setAttribute("hidden", "");
    if (d) d.setAttribute("hidden", "");
    if (e) e.removeAttribute("hidden");
    if (btnE) btnE.setAttribute("hidden", "");
    if (btnD) btnD.removeAttribute("hidden");
    if (btnEM) btnEM.setAttribute("hidden", "");
    if (btnDM) btnDM.removeAttribute("hidden");
    renderEarsiv();
    closeDrawerIfAny();
  }

  function closeDrawerIfAny() {
    var side = $("#bankDrawer");
    var back = $("#navBackdrop");
    var btn = $("#navMenuBtn");
    if (side) side.classList.remove("is-open");
    if (back) {
      back.setAttribute("hidden", "");
      back.setAttribute("aria-hidden", "true");
    }
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function bindEarsivForm() {
    var form = $("#earsivForm");
    if (form) {
      form.addEventListener("input", renderEarsiv);
      form.addEventListener("change", renderEarsiv);
    }
    var addBtn = $("#earsivAddRow");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var body = $("#earsivItemsBody");
        if (!body) return;
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<td><input type="text" class="ea-mal"></td>' +
          '<td><input type="text" class="ea-miktar" value="1"></td>' +
          '<td><input type="text" class="ea-birim" value="Adet"></td>' +
          '<td><input type="text" class="ea-bf" value="0"></td>' +
          '<td><input type="text" class="ea-kdv" value="20"></td>' +
          '<td><button type="button" class="btn btn-ghost ea-row-remove" style="padding:0.25rem 0.5rem;font-size:0.75rem">Sil</button></td>';
        body.appendChild(tr);
        renderEarsiv();
      });
    }
    bindItemRows();
  }

  function init() {
    var btnOpen = $("#btnOpenEarsiv");
    var btnBack = $("#btnOpenDekont");
    var btnOpenM = $("#btnOpenEarsivMobile");
    var btnBackM = $("#btnOpenDekontMobile");
    if (btnOpen) {
      btnOpen.addEventListener("click", function () {
        showEarsivMode();
      });
    }
    if (btnBack) {
      btnBack.addEventListener("click", function () {
        showDekontMode();
      });
    }
    if (btnOpenM) {
      btnOpenM.addEventListener("click", function () {
        showEarsivMode();
      });
    }
    if (btnBackM) {
      btnBackM.addEventListener("click", function () {
        showDekontMode();
      });
    }
    defaultEarsivValues();
    bindEarsivForm();
    renderEarsiv();

    var bc = $("#earsivBtnCreate");
    var bp = $("#earsivBtnPrint");
    var bf = $("#earsivBtnPdf");
    var br = $("#earsivBtnReset");
    if (bc) {
      bc.addEventListener("click", function () {
        renderEarsiv();
        var prev = $("#earsivPrintArea");
        if (prev) prev.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
    if (bp) {
      bp.addEventListener("click", function () {
        renderEarsiv();
        window.print();
      });
    }
    if (bf) bf.addEventListener("click", downloadEarsivPdf);
    if (br) {
      br.addEventListener("click", function () {
        defaultEarsivValues();
        renderEarsiv();
      });
    }

    window.addEventListener("beforeprint", onBeforePrintFitA4Earsiv);
    window.addEventListener("afterprint", onAfterPrintFitA4Earsiv);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
