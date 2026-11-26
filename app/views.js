// NusaStat — views.js
// Satu fungsi render per halaman (hash-route). Setiap angka yang tampil membawa
// sumber + tahunnya; setiap grafik digambar oleh charts.js dari data.js.
import { META, SERIES, HEADLINE, SECTORS, SECTOR_SOURCE, LABOUR, PRICES, PROVINCES, PROVINCE_SOURCE, PROVINCE_HIGHLIGHTS, TRADE } from './data.js';
import { lineChart, barChart, hbarChart, donutChart, fmt } from './charts.js';

function src(text) {
  return `<p class="src">Sumber: ${text}</p>`;
}

function kpiCard(h) {
  return `<a class="kpi" href="${h.route}">
    <span class="kpi-value">${h.value}</span>
    <span class="kpi-label">${h.label}</span>
    <span class="kpi-context">${h.context}</span>
    <span class="kpi-src">Sumber: ${h.source}</span>
  </a>`;
}

function chartCard(title, sub, svg, source) {
  return `<section class="chart-card">
    <h3>${title}</h3>
    <p class="chart-sub">${sub}</p>
    <div class="chart">${svg}</div>
    ${src(source)}
  </section>`;
}

function exploreCard(route, title, desc, figure) {
  return `<a class="explore" href="${route}">
    <span class="explore-figure">${figure}</span>
    <span class="explore-title">${title}</span>
    <span class="explore-desc">${desc}</span>
    <span class="explore-link">Buka halaman →</span>
  </a>`;
}

// ---------------------------------------------------------------- Beranda
export function renderHome() {
  const s = SERIES;
  return `
  <section class="story">
    <p class="eyebrow">Indonesia · Edisi 2024 · Data resmi BPS</p>
    <h1>Indonesia dalam angka: <strong>281,6 juta jiwa</strong>, ekonomi tumbuh <strong>5,03%</strong>.</h1>
    <p class="lead">Enam angka yang paling sering dicari tentang Indonesia — penduduk, ekonomi, harga,
    pekerjaan, kemiskinan, dan pembangunan manusia — diringkas dari publikasi resmi Badan Pusat
    Statistik, masing-masing dengan sumber dan tahunnya, supaya bisa langsung dipakai.</p>
    <p class="story-numbers">
      <span><b>1,57%</b> inflasi 2024</span>
      <span><b>4,91%</b> pengangguran, Agt 2024</span>
      <span><b>8,57%</b> penduduk miskin, Sep 2024</span>
    </p>
  </section>

  <section class="kpi-grid" aria-label="Angka utama">
    ${HEADLINE.map(kpiCard).join('')}
  </section>

  <section class="charts-2">
    ${chartCard('Pertumbuhan ekonomi, 2020–2024', 'PDB tumbuh 5,03% pada 2024 setelah kontraksi −2,07% pada 2020.', lineChart({ years: s.pertumbuhan.years, values: s.pertumbuhan.values, unit: '%', color: '#1f7a5c' }), s.pertumbuhan.source)}
    ${chartCard('Penduduk miskin terus turun', 'September tiap tahun. 2024: 8,57% — terendah sepanjang sejarah pencatatan BPS.', lineChart({ years: s.kemiskinan.years, values: s.kemiskinan.values, unit: '%', color: '#e4572e' }), s.kemiskinan.source)}
  </section>

  <section class="charts-2">
    ${chartCard('Inflasi tahunan, 2020–2024', '2024 sebesar 1,57% — di dalam sasaran Bank Indonesia 2,5% ± 1%.', lineChart({ years: s.inflasi.years, values: s.inflasi.values, unit: '%', color: '#f2a007' }), s.inflasi.source)}
    ${chartCard('Jumlah penduduk, 2020–2024', 'Pertengahan tahun, juta jiwa. Laju tumbuh 2024: 1,04%.', barChart({ years: s.penduduk.years, values: s.penduduk.values, unit: 'juta jiwa' }), s.penduduk.source)}
  </section>

  <section class="charts-2">
    ${chartCard('Lima lapangan usaha terbesar, 2024', 'Pangsa terhadap PDB. Kelimanya = 63,90% perekonomian.', hbarChart({ items: SECTORS.slice(0, 5).map((d) => ({ label: d.short, value: d.share, suffix: '%' })), unit: '% PDB' }), SECTOR_SOURCE)}
    ${chartCard('Ekspor vs impor 2024', 'Surplus neraca perdagangan US$31,04 miliar — tahun kelima berturut-turut.', hbarChart({ items: [
      { label: 'Ekspor', value: 264.7, suffix: 'US$ M', color: '#1f7a5c' },
      { label: 'Impor', value: 233.66, suffix: 'US$ M', color: '#e4572e' },
    ], unit: 'US$ miliar', maxValue: 300 }), TRADE.surplus.source)}
  </section>

  <section class="explore-block">
    <h2>Jelajahi menurut topik</h2>
    <div class="explore-grid">
      ${exploreCard('#/penduduk', 'Penduduk', 'Siapa, di mana, dan seberapa padat penduduk Indonesia.', '281,6 jt jiwa')}
      ${exploreCard('#/ekonomi', 'Ekonomi', 'PDB, pertumbuhan, sektor, dan perdagangan luar negeri.', 'Rp22.139 T')}
      ${exploreCard('#/harga', 'Harga & Kemiskinan', 'Inflasi, garis kemiskinan, dan ketimpangan.', '1,57%')}
      ${exploreCard('#/kerja', 'Ketenagakerjaan', 'Siapa bekerja, di mana, dan berapa upahnya.', '144,64 jt bekerja')}
      ${exploreCard('#/provinsi', 'Provinsi', 'Bandingkan 14 provinsi terbesar menurut penduduk.', '38 provinsi')}
    </div>
  </section>

  <section class="note-block">
    <h2>Cara membaca situs ini</h2>
    <p>Setiap angka disertai sumber dan tahunnya di bawah kartu atau grafiknya. Angka tahunan memakai
    publikasi BPS terbaru yang tersedia saat edisi ini disusun (data 2024, dirilis 2025). NusaStat
    adalah ringkasan independen dari publikasi resmi — bukan situs pemerintah. Daftar lengkap sumber
    ada di halaman <a href="#/tentang">Tentang &amp; Sumber</a>.</p>
  </section>`;
}

// ---------------------------------------------------------------- Penduduk
export function renderPenduduk() {
  const s = SERIES;
  const top5 = PROVINCES.slice(0, 5);
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Penduduk</p>
    <h1>Penduduk Indonesia: 281,6 juta jiwa</h1>
    <p class="lead">Negara berpenduduk terbesar keempat di dunia. Lebih dari separuhnya tinggal di
    Pulau Jawa, yang luasnya hanya sekitar 7% wilayah daratan Indonesia.</p>
  </section>

  <section class="kpi-grid small">
    ${[
      ['281,6 jt', 'Jumlah penduduk, 2024', 'BPS, 2024'],
      ['1,04%', 'Laju pertumbuhan penduduk 2024', 'BPS, 2024'],
      ['55,93%', 'Penduduk tinggal di Pulau Jawa', 'Dukcapil, Sem I-2024'],
      ['101', 'Rasio jenis kelamin (laki-laki per 100 perempuan)', 'BPS, 2024'],
      ['74,15 thn', 'Umur harapan hidup saat lahir, 2024', 'BPS, 2024'],
      ['75,02', 'Indeks Pembangunan Manusia, 2024', 'BPS, 2024'],
    ].map(([v, l, s2]) => `<div class="kpi static"><span class="kpi-value">${v}</span><span class="kpi-label">${l}</span><span class="kpi-src">Sumber: ${s2}</span></div>`).join('')}
  </section>

  <section class="charts-2">
    ${chartCard('Jumlah penduduk, 2020–2024', 'Pertengahan tahun, juta jiwa.', barChart({ years: s.penduduk.years, values: s.penduduk.values, unit: 'juta jiwa' }), s.penduduk.source)}
    ${chartCard('Lima provinsi terpadat penduduknya, 2024', 'Juta jiwa. Jawa Barat sendiri ≈ 50,35 juta — hampir seperlima Indonesia.', hbarChart({ items: top5.map((p) => ({ label: p.name, value: p.pop, suffix: 'jt' })), unit: 'juta jiwa' }), PROVINCE_SOURCE)}
  </section>

  <section class="table-block">
    <h2>Kepadatan penduduk di Pulau Jawa, 2024</h2>
    <p class="chart-sub">DKI Jakarta adalah provinsi terpadat: 16.165 jiwa per km² — lebih dari 11 kali
    Jawa Barat, provinsi terpadat kedua.</p>
    <table class="data-table">
      <thead><tr><th>Provinsi</th><th>Penduduk (juta)</th><th>Kepadatan (jiwa/km²)</th></tr></thead>
      <tbody>
        ${PROVINCES.filter((p) => p.density).sort((a, b) => b.density - a.density).map((p) => `<tr><td>${p.name}</td><td>${fmt(p.pop)}</td><td>${p.density.toLocaleString('id-ID')}</td></tr>`).join('')}
      </tbody>
    </table>
    ${src('BPS, 2024 — penduduk, laju pertumbuhan, distribusi, dan kepadatan menurut provinsi.')}
  </section>

  <section class="note-block">
    <h2>Catatan angka: BPS vs Dukcapil</h2>
    <p>Angka 281,6 juta jiwa adalah proyeksi pertengahan tahun BPS 2024. Dukcapil Kemendagri mencatat
    282,48 juta jiwa pada Data Kependudukan Bersih Semester I-2024 — selisihnya wajar karena metode
    pencatatan berbeda (proyeksi sensus vs administrasi kependudukan). Situs ini memakai angka BPS
    sebagai acuan utama agar konsisten dengan seri tahunannya.</p>
  </section>`;
}

// ---------------------------------------------------------------- Ekonomi
export function renderEkonomi() {
  const s = SERIES;
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Ekonomi</p>
    <h1>Ekonomi Indonesia: Rp22.139 triliun</h1>
    <p class="lead">Ekonomi terbesar di Asia Tenggara. Tumbuh 5,03% pada 2024 — tahun keempat
    berturut-turut di atas 5% setelah 2022 (5,31%) dan 2023 (5,05%).</p>
  </section>

  <section class="kpi-grid small">
    ${[
      ['Rp22.139 T', 'PDB atas dasar harga berlaku, 2024', 'BPS, 2025'],
      ['5,03%', 'Pertumbuhan ekonomi 2024 (c-to-c)', 'BPS, 2025'],
      ['Rp78,6 jt', 'PDB per kapita 2024 (US$4.960,3)', 'BPS, 2025'],
      ['18,98%', 'Pangsa industri pengolahan — lapangan usaha terbesar', 'BPS, 2025'],
      ['US$31,04 M', 'Surplus perdagangan 2024', 'Kemenkeu / BPS, 2025'],
      ['12,48%', 'Pertumbuhan PK-LNPRT 2024 — komponen pengeluaran tertinggi', 'BPS, 2025'],
    ].map(([v, l, s2]) => `<div class="kpi static"><span class="kpi-value">${v}</span><span class="kpi-label">${l}</span><span class="kpi-src">Sumber: ${s2}</span></div>`).join('')}
  </section>

  <div class="tabs" role="tablist" aria-label="Bagian ekonomi">
    <button class="tab active" data-tab="tumbuh" role="tab" aria-selected="true">Pertumbuhan</button>
    <button class="tab" data-tab="struktur" role="tab" aria-selected="false">Struktur PDB</button>
    <button class="tab" data-tab="dagang" role="tab" aria-selected="false">Perdagangan</button>
  </div>

  <div class="tab-panel" id="panel-tumbuh">
    <section class="charts-2">
      ${chartCard('Pertumbuhan ekonomi, 2020–2024', 'Persen, year-on-year. Kontraksi 2020 adalah dampak pandemi COVID-19.', lineChart({ years: s.pertumbuhan.years, values: s.pertumbuhan.values, unit: '%', color: '#1f7a5c' }), s.pertumbuhan.source)}
      ${chartCard('Ekspor Indonesia, 2021–2024', 'US$ miliar. Puncak 2022 didorong harga komoditas; 2024 kembali naik 2,29%.', barChart({ years: s.ekspor.years, values: s.ekspor.values, unit: 'US$ miliar', color: '#1f7a5c' }), s.ekspor.source)}
    </section>
    <section class="note-block">
      <h2>Dari sisi pengeluaran</h2>
      <p>Pertumbuhan tertinggi 2024 dicapai komponen Pengeluaran Konsumsi Lembaga Nonprofit yang
      Melayani Rumah Tangga (PK-LNPRT) sebesar 12,48%. Investasi (Pembentukan Modal Tetap Bruto)
      tumbuh 4,61% sepanjang 2024. Sumber: BPS, BRS No. 17/02/Th. XXVIII, 5 Februari 2025.</p>
    </section>
  </div>

  <div class="tab-panel hidden" id="panel-struktur">
    <section class="charts-2">
      ${chartCard('Pangsa lapangan usaha terhadap PDB, 2024', 'Persen. Lima lapangan usaha teratas menyumbang 63,90% PDB.', hbarChart({ items: SECTORS.slice(0, 5).map((d) => ({ label: d.short, value: d.share, suffix: '%' })), unit: '% PDB' }), SECTOR_SOURCE)}
      <section class="chart-card">
        <h3>Pertumbuhan per lapangan usaha, 2024</h3>
        <p class="chart-sub">Persen, c-to-c. Jasa Lainnya tumbuh paling cepat.</p>
        <table class="data-table compact">
          <thead><tr><th>Lapangan usaha</th><th>Tumbuh 2024</th></tr></thead>
          <tbody>
            <tr><td>Jasa Lainnya</td><td>9,80%</td></tr>
            <tr><td>Transportasi &amp; Pergudangan</td><td>8,69%</td></tr>
            <tr><td>Akomodasi &amp; Makan Minum</td><td>8,56%</td></tr>
            <tr><td>Perdagangan Besar &amp; Eceran</td><td>4,86%</td></tr>
            <tr><td>Industri Pengolahan</td><td>4,43%</td></tr>
            <tr><td>Pertanian, Kehutanan &amp; Perikanan</td><td>0,67%</td></tr>
          </tbody>
        </table>
        ${src(SECTOR_SOURCE)}
      </section>
    </section>
  </div>

  <div class="tab-panel hidden" id="panel-dagang">
    <section class="charts-2">
      ${chartCard('Ekspor vs impor, 2024', 'US$ miliar. Ekspor nonmigas US$248,83 M; migas US$15,89 M.', hbarChart({ items: [
        { label: 'Ekspor', value: 264.7, suffix: 'US$ M', color: '#1f7a5c' },
        { label: 'Impor', value: 233.66, suffix: 'US$ M', color: '#e4572e' },
      ], unit: 'US$ miliar', maxValue: 300 }), TRADE.surplus.source)}
      ${chartCard('Tujuan ekspor nonmigas terbesar, Des 2024', 'US$ miliar. Ketiganya = 44,21% ekspor nonmigas bulan itu.', hbarChart({ items: TRADE.tujuan.map((d) => ({ label: d.country, value: d.value, suffix: 'US$ M' })), unit: 'US$ miliar' }), TRADE.tujuanNote)}
    </section>
    <section class="note-block">
      <h2>Surplus lima tahun berturut-turut</h2>
      <p>Neraca perdagangan surplus sejak 2020: 2021 US$35,34 M; 2022 US$54,46 M; 2023 US$36,89 M;
      2024 US$31,04 M. Sumber: BPS / Kementerian Keuangan, 2025.</p>
    </section>
  </div>`;
}

// ---------------------------------------------------------------- Harga
export function renderHarga() {
  const s = SERIES;
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Harga &amp; Kemiskinan</p>
    <h1>Harga terkendali, kemiskinan terendah</h1>
    <p class="lead">Inflasi 2024 hanya 1,57% dan penduduk miskin turun ke 8,57% pada September 2024 —
    angka terendah sejak BPS pertama kali merilis data kemiskinan.</p>
  </section>

  <section class="kpi-grid small">
    ${[
      ['1,57%', 'Inflasi 2024 (y-on-y)', 'BPS, 2025'],
      ['Rp595.242', 'Garis kemiskinan per kapita/bulan, Sep 2024', 'BPS, 2025'],
      ['8,57%', 'Penduduk miskin, Sep 2024 — 24,06 jt orang', 'BPS, 2025'],
      ['6,66% / 11,34%', 'Kemiskinan kota / desa, Sep 2024', 'BPS, 2025'],
      ['0,381', 'Gini ratio, Sep 2024', 'BPS, 2025'],
      ['1,13%', 'Kemiskinan ekstrem, Sep 2024 — 3,17 jt orang', 'BPS, 2025'],
    ].map(([v, l, s2]) => `<div class="kpi static"><span class="kpi-value">${v}</span><span class="kpi-label">${l}</span><span class="kpi-src">Sumber: ${s2}</span></div>`).join('')}
  </section>

  <section class="charts-2">
    ${chartCard('Inflasi tahunan, 2020–2024', 'Persen, y-on-y. Sasaran Bank Indonesia: 2,5% ± 1%.', lineChart({ years: s.inflasi.years, values: s.inflasi.values, unit: '%', color: '#f2a007' }), s.inflasi.source)}
    ${chartCard('Penduduk miskin, 2020–2024', 'Persen penduduk, September tiap tahun. Turun 1,62 poin dalam 4 tahun.', lineChart({ years: s.kemiskinan.years, values: s.kemiskinan.values, unit: '%', color: '#e4572e' }), s.kemiskinan.source)}
  </section>

  <section class="table-block">
    <h2>Inflasi dan kemiskinan, 2020–2024</h2>
    <table class="data-table">
      <thead><tr><th>Tahun</th><th>Inflasi (%)</th><th>Penduduk miskin, Sep (%)</th></tr></thead>
      <tbody>
        <tr><td>2020</td><td>1,68</td><td>10,19</td></tr>
        <tr><td>2021</td><td>1,87</td><td>9,71</td></tr>
        <tr><td>2022</td><td>5,51</td><td>9,57</td></tr>
        <tr><td>2023</td><td>2,61</td><td>9,03</td></tr>
        <tr><td>2024</td><td>1,57</td><td>8,57</td></tr>
      </tbody>
    </table>
    ${src('BPS, 2024–2025. Garis kemiskinan September 2024: Rp595.242 per kapita per bulan.')}
  </section>

  <section class="note-block">
    <h2>Ketimpangan: gini 0,381</h2>
    <p>Pada September 2024, gini ratio nasional 0,381 (kota 0,402; desa 0,308). Menurut ukuran Bank
    Dunia, 40% penduduk terbawah menguasai 18,41% pengeluaran nasional — naik tipis dari 18,40%
    pada Maret 2024. Sumber: BPS, BRS Tingkat Ketimpangan Pengeluaran Penduduk, Januari 2025.</p>
  </section>`;
}

// ---------------------------------------------------------------- Kerja
export function renderKerja() {
  const s = SERIES;
  const L = LABOUR;
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Ketenagakerjaan</p>
    <h1>144,64 juta orang bekerja</h1>
    <p class="lead">Dari 215,37 juta penduduk usia kerja pada Agustus 2024, 152,11 juta masuk angkatan
    kerja. Pengangguran terbuka 4,91% — tetapi 57,95% pekerja masih berada di sektor informal.</p>
  </section>

  <section class="kpi-grid small">
    ${[
      [L.usiaKerja.value, L.usiaKerja.label, L.usiaKerja.source],
      [L.angkatanKerja.value, L.angkatanKerja.label, L.angkatanKerja.source],
      [L.bekerja.value, L.bekerja.label, L.bekerja.source],
      [L.penganggur.value, L.penganggur.label, L.penganggur.source],
      [L.tpak.value, L.tpak.label, L.tpak.source],
      [L.upah.value, L.upah.label, L.upah.source],
    ].map(([v, l, s2]) => `<div class="kpi static"><span class="kpi-value">${v}</span><span class="kpi-label">${l}</span><span class="kpi-src">Sumber: ${s2}</span></div>`).join('')}
  </section>

  <section class="charts-2">
    ${chartCard('Tingkat Pengangguran Terbuka, 2020–2024', 'Persen angkatan kerja, Agustus tiap tahun.', lineChart({ years: s.tpt.years, values: s.tpt.values, unit: '%', color: '#1f7a5c' }), s.tpt.source)}
    ${chartCard('Formal vs informal, Agustus 2024', 'Juta pekerja. Informal masih mayoritas: 83,83 juta orang.', donutChart({ slices: [
      { label: 'Formal', value: L.formal.value, pct: L.formal.pct, color: '#1f7a5c' },
      { label: 'Informal', value: L.informal.value, pct: L.informal.pct, color: '#f2a007' },
    ] }), 'BPS, Sakernas Agustus 2024')}
  </section>

  <section class="charts-2">
    ${chartCard('Pekerja menurut jam kerja, Agustus 2024', 'Juta orang. Setengah penganggur: 11,56 juta (8,0% pekerja).', hbarChart({ items: [
      { label: 'Pekerja penuh', value: L.penuh.value, suffix: 'jt' },
      { label: 'Paruh waktu', value: L.paruh.value, suffix: 'jt' },
      { label: 'Setengah penganggur', value: L.setengah.value, suffix: 'jt', color: '#e4572e' },
    ], unit: 'juta orang', maxValue: 110 }), 'BPS, Sakernas Agustus 2024')}
    <section class="chart-card">
      <h3>TPT menurut tahun, 2020–2024</h3>
      <p class="chart-sub">Persen angkatan kerja, Agustus tiap tahun.</p>
      <table class="data-table compact">
        <thead><tr><th>Tahun</th><th>TPT</th><th>Penganggur (juta)</th></tr></thead>
        <tbody>
          <tr><td>2020</td><td>7,07%</td><td>9,77</td></tr>
          <tr><td>2021</td><td>6,49%</td><td>9,10</td></tr>
          <tr><td>2022</td><td>5,86%</td><td>8,42</td></tr>
          <tr><td>2023</td><td>5,32%</td><td>7,86</td></tr>
          <tr><td>2024</td><td>4,91%</td><td>7,47</td></tr>
        </tbody>
      </table>
      <p class="chart-sub">Pertanian menyerap tenaga kerja terbanyak: 40,76 juta orang (28,18%
      pekerja) pada Agustus 2024.</p>
      ${src('BPS, Sakernas Agustus 2024.')}
    </section>
  </section>

  <section class="note-block">
    <h2>Yang ekstrem menurut provinsi</h2>
    <p>TPT tertinggi Agustus 2024 ada di Jawa Barat (6,75%), terendah di Papua Pegunungan (1,32%).
    TPAK tertinggi di Papua Pegunungan (88,22%), terendah di DKI Jakarta (65,10%). Sumber: BPS,
    Sakernas Agustus 2024.</p>
  </section>`;
}

// ---------------------------------------------------------------- Provinsi
export function renderProvinsi() {
  const total = 281.6;
  const rows = PROVINCES.map((p, i) => {
    const share = (p.pop / total) * 100;
    return `<tr data-name="${p.name.toLowerCase()}" data-island="${p.island}">
      <td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td>
      <td data-sort="${p.pop}">${fmt(p.pop)}</td>
      <td data-sort="${share.toFixed(2)}">${fmt(share)}%</td></tr>`;
  }).join('');
  return `
  <section class="page-head">
    <p class="eyebrow">Topik · Provinsi</p>
    <h1>38 provinsi, satu peta angka</h1>
    <p class="lead">Tabel 14 provinsi terbesar menurut penduduk 2024. Cari nama provinsi, saring
    menurut pulau, atau klik judul kolom untuk mengurutkan.</p>
  </section>

  <section class="controls" aria-label="Filter provinsi">
    <label>Cari provinsi <input id="prov-search" type="search" placeholder="mis. Jawa Barat" autocomplete="off"></label>
    <label>Pulau
      <select id="prov-island">
        <option value="">Semua pulau</option>
        <option>Jawa</option><option>Sumatera</option><option>Sulawesi</option>
        <option>Kalimantan</option><option>Nusa Tenggara</option>
      </select>
    </label>
    <p class="controls-hint">Klik judul kolom <b>Penduduk</b> atau <b>Pangsa</b> untuk mengurutkan.</p>
  </section>

  <section class="table-block">
    <table class="data-table sortable" id="prov-table">
      <thead><tr><th>#</th><th data-sortkey="name">Provinsi ↕</th><th>Pulau</th><th data-sortkey="pop">Penduduk 2024 (juta) ↕</th><th data-sortkey="share">Pangsa ↕</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${src(PROVINCE_SOURCE)}
    <p class="src">14 provinsi ini mencakup ${fmt(PROVINCES.reduce((a, p) => a + p.pop, 0))} juta jiwa — ${fmt((PROVINCES.reduce((a, p) => a + p.pop, 0) / total) * 100)}% penduduk Indonesia.</p>
  </section>

  <section class="charts-2">
    ${chartCard('Penduduk 14 provinsi terbesar, 2024', 'Juta jiwa. Tiga provinsi Jawa teratas = 130,16 juta jiwa.', hbarChart({ items: PROVINCES.map((p) => ({ label: p.name, value: p.pop, suffix: 'jt' })), unit: 'juta jiwa' }), PROVINCE_SOURCE)}
    <section class="chart-card">
      <h3>Sorotan provinsi</h3>
      <p class="chart-sub">Angka ekstrem yang terverifikasi — bukan tebakan.</p>
      ${PROVINCE_HIGHLIGHTS.map((h) => `<div class="highlight"><b>${h.title}</b><span class="highlight-value">${h.value}</span><span>${h.note}</span><span class="kpi-src">Sumber: ${h.source}</span></div>`).join('')}
    </section>
  </section>`;
}

// ---------------------------------------------------------------- Tentang
export function renderTentang() {
  return `
  <section class="page-head">
    <p class="eyebrow">Tentang</p>
    <h1>Tentang NusaStat</h1>
    <p class="lead">NusaStat adalah ringkasan independen angka-angka Indonesia — dibuat untuk orang
    yang butuh angka resmi dengan cepat, lengkap dengan sumber dan tahunnya.</p>
  </section>

  <section class="note-block">
    <h2>Metodologi</h2>
    <p>Semua angka di situs ini diambil dari publikasi resmi yang terverifikasi: Berita Resmi
    Statistik (BRS) dan publikasi Badan Pusat Statistik (BPS), Survei Angkatan Kerja Nasional
    (Sakernas), serta siaran Kementerian Keuangan dan Kementerian Perdagangan untuk perdagangan
    luar negeri. Setiap kartu dan grafik mencantumkan sumber + tahunnya. Angka yang tidak
    terverifikasi tidak ditampilkan — sel kosong di tabel berarti data belum terverifikasi, bukan nol.</p>
    <h2>Daftar sumber</h2>
    <ul class="sources">
      <li>BPS — Pertumbuhan Ekonomi Indonesia Triwulan IV-2024, BRS No. 17/02/Th. XXVIII, 5 Februari 2025 (PDB Rp22.139,0 T; tumbuh 5,03%; struktur lapangan usaha).</li>
      <li>BPS — Profil Kemiskinan di Indonesia September 2024, BRS No. 07/01/Th. XXVIII, 15 Januari 2025 (kemiskinan 8,57%; garis kemiskinan Rp595.242).</li>
      <li>BPS — Keadaan Ketenagakerjaan Indonesia Agustus 2024, BRS No. 83/11/Th. XXVII, 5 November 2024 (TPT 4,91%; angkatan kerja 152,11 jt; upah Rp3,27 jt).</li>
      <li>BPS — Indeks Pembangunan Manusia Indonesia 2024 (IPM 75,02; UHH 74,15 tahun), 15 November 2024.</li>
      <li>BPS — Tingkat Ketimpangan Pengeluaran Penduduk Indonesia September 2024 (gini 0,381), 15 Januari 2025.</li>
      <li>BPS — Jumlah penduduk menurut provinsi, 2024 (281,6 jt jiwa; Jawa Barat 50,35 jt).</li>
      <li>Kementerian Keuangan — Siaran Pers SP-2/BKF/2025, 16 Januari 2025 (ekspor US$264,70 M; impor US$233,66 M; surplus US$31,04 M).</li>
      <li>Kementerian Perdagangan / BPS — Perkembangan Ekspor-Impor 2024 (tujuan ekspor nonmigas).</li>
      <li>Dukcapil Kemendagri — Rilis Data Kependudukan Bersih Semester I-2024 (282,48 jt jiwa; Jawa 55,93%).</li>
    </ul>
    <h2>Bukan situs resmi</h2>
    <p>NusaStat bukan situs pemerintah dan tidak berafiliasi dengan BPS atau instansi mana pun.
    Untuk data mentah dan tabel lengkap, kunjungi publikasi resmi BPS. Situs ini berjalan
    sepenuhnya offline dari file-nya sendiri: tanpa network, tanpa pelacak, tanpa cookie.</p>
  </section>`;
}

export const VIEWS = {
  '/': { title: 'Beranda', render: renderHome },
  '/penduduk': { title: 'Penduduk', render: renderPenduduk },
  '/ekonomi': { title: 'Ekonomi', render: renderEkonomi },
  '/harga': { title: 'Harga & Kemiskinan', render: renderHarga },
  '/kerja': { title: 'Ketenagakerjaan', render: renderKerja },
  '/provinsi': { title: 'Provinsi', render: renderProvinsi },
  '/tentang': { title: 'Tentang & Sumber', render: renderTentang },
};
