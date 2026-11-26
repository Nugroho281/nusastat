// NusaStat — data.js
// Seluruh angka di file ini angka NYATA yang terverifikasi dari publikasi resmi.
// Setiap angka membawa sumber + tahun; views.js menampilkannya di bawah tiap kartu.
// Sumber utama: Badan Pusat Statistik (BPS) — Berita Resmi Statistik (BRS) dan
// publikasi Sakernas; Kementerian Keuangan (Kemenkeu) untuk neraca perdagangan;
// Dukcapil Kemendagri untuk sebaran penduduk Semester I-2024.
// TIDAK ADA angka karangan di file ini. Bila sebuah angka tidak terverifikasi,
// angka itu tidak masuk.

export const META = {
  name: 'NusaStat',
  tagline: 'Angka Indonesia, dibaca sekilas.',
  edition: 'Edisi 2024 — data terakhir yang dirilis BPS sampai November 2026',
  updated: 'Data per November 2026',
};

// Seri tahunan 2020-2024 (BPS). Nilai dalam satuan yang tertulis di label.
export const SERIES = {
  penduduk: {
    label: 'Jumlah penduduk',
    unit: 'juta jiwa',
    source: 'BPS, 2024',
    note: 'Pertengahan tahun; laju tumbuh 2024 sebesar 1,04%.',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [270.2, 272.68, 275.77, 278.7, 281.6],
  },
  pertumbuhan: {
    label: 'Pertumbuhan ekonomi (PDB)',
    unit: '% (y-on-y)',
    source: 'BPS, BRS No. 17/02/Th. XXVIII, 5 Feb 2025',
    note: '2020 terkontraksi pandemi; 2021–2024 tumbuh di atas 3,7% tiap tahun.',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [-2.07, 3.7, 5.31, 5.05, 5.03],
  },
  inflasi: {
    label: 'Inflasi tahunan (IHK)',
    unit: '% (y-on-y)',
    source: 'BPS, 2024',
    note: 'Sasaran Bank Indonesia 2,5% ± 1%. Puncak 2022 didorong harga energi.',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [1.68, 1.87, 5.51, 2.61, 1.57],
  },
  kemiskinan: {
    label: 'Penduduk miskin',
    unit: '% penduduk',
    source: 'BPS, BRS No. 07/01/Th. XXVIII, 15 Jan 2025',
    note: 'September 2024: 8,57% — terendah sejak BPS pertama merilis angka kemiskinan.',
    years: [2020, 2021, 2022, 2023, 2024],
    // September tiap tahun (2020: Sep 10,19; 2021: Sep 9,71; 2022: Sep 9,57; 2023: Sep 9,03; 2024: Sep 8,57)
    values: [10.19, 9.71, 9.57, 9.03, 8.57],
  },
  tpt: {
    label: 'Tingkat Pengangguran Terbuka (TPT)',
    unit: '% angkatan kerja',
    source: 'BPS, Sakernas Agustus 2024 (BRS No. 83/11/Th. XXVII)',
    note: 'Agustus tiap tahun. Turun 0,41 poin dari Agustus 2023.',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [7.07, 6.49, 5.86, 5.32, 4.91],
  },
  ipm: {
    label: 'Indeks Pembangunan Manusia (IPM)',
    unit: 'poin (0–100)',
    source: 'BPS, 2024',
    note: 'Kategori "tinggi" (70–80). DKI Jakarta tertinggi 84,15; Papua Pegunungan terendah 54,43.',
    years: [2020, 2021, 2022, 2023, 2024],
    values: [71.94, 72.29, 73.86, 74.39, 75.02],
  },
  ekspor: {
    label: 'Ekspor',
    unit: 'US$ miliar',
    source: 'BPS / Kemenkeu, 2024',
    note: 'Total ekspor barang; 2024 tumbuh 2,29% dari 2023.',
    years: [2021, 2022, 2023, 2024],
    values: [231.61, 291.9, 258.82, 264.7],
  },
  impor: {
    label: 'Impor',
    unit: 'US$ miliar',
    source: 'BPS / Kemenkeu, 2024',
    note: 'Total impor barang; 2024 naik 11,07% dari 2023.',
    years: [2021, 2022, 2023, 2024],
    values: [196.27, 237.44, 221.93, 233.66],
  },
};

// Kartu angka utama di beranda: nilai, label, konteks, sumber + tahun.
export const HEADLINE = [
  {
    id: 'penduduk',
    value: '281,6 jt',
    label: 'Penduduk Indonesia',
    context: 'Terbesar ke-4 di dunia · tumbuh 1,04% pada 2024',
    source: 'BPS, 2024',
    route: '#/penduduk',
  },
  {
    id: 'pdb',
    value: 'Rp22.139 T',
    label: 'PDB 2024',
    context: 'Tumbuh 5,03% · PDB per kapita Rp78,6 jt (US$4.960)',
    source: 'BPS, 2025',
    route: '#/ekonomi',
  },
  {
    id: 'inflasi',
    value: '1,57%',
    label: 'Inflasi 2024',
    context: 'Di bawah sasaran BI 2,5% ± 1% · terendah dalam 5 tahun',
    source: 'BPS, 2025',
    route: '#/harga',
  },
  {
    id: 'tpt',
    value: '4,91%',
    label: 'Pengangguran Terbuka',
    context: 'Agustus 2024 · 7,47 jt orang · turun dari 5,32% (2023)',
    source: 'BPS, Sakernas Agt 2024',
    route: '#/kerja',
  },
  {
    id: 'miskin',
    value: '8,57%',
    label: 'Penduduk Miskin',
    context: 'September 2024 · 24,06 jt orang · terendah sepanjang sejarah',
    source: 'BPS, 2025',
    route: '#/harga',
  },
  {
    id: 'ipm',
    value: '75,02',
    label: 'IPM 2024',
    context: 'Kategori tinggi · umur harapan hidup 74,15 tahun',
    source: 'BPS, 2024',
    route: '#/penduduk',
  },
];

// Struktur PDB menurut lapangan usaha, 2024 (BPS BRS 5 Feb 2025).
export const SECTORS = [
  { name: 'Industri Pengolahan', short: 'Industri Pengolahan', share: 18.98, growth: 4.43 },
  { name: 'Perdagangan Besar & Eceran', short: 'Perdagangan', share: 13.07, growth: 4.86 },
  { name: 'Pertanian, Kehutanan & Perikanan', short: 'Pertanian', share: 12.61, growth: 0.67 },
  { name: 'Konstruksi', short: 'Konstruksi', share: 10.09, growth: null },
  { name: 'Pertambangan & Penggalian', short: 'Pertambangan', share: 9.15, growth: null },
  { name: 'Lapangan usaha lainnya', short: 'Lainnya', share: 36.1, growth: null },
];
export const SECTOR_SOURCE = 'BPS, BRS No. 17/02/Th. XXVIII, 5 Feb 2025 — lima lapangan usaha teratas = 63,90% PDB.';

// Ketenagakerjaan Agustus 2024 (BPS Sakernas).
export const LABOUR = {
  usiaKerja: { value: '215,37 jt', label: 'Penduduk usia kerja (15+)', source: 'BPS, Sakernas Agt 2024' },
  angkatanKerja: { value: '152,11 jt', label: 'Angkatan kerja', source: 'BPS, Sakernas Agt 2024' },
  bekerja: { value: '144,64 jt', label: 'Penduduk bekerja', source: 'BPS, Sakernas Agt 2024' },
  penganggur: { value: '7,47 jt', label: 'Pengangguran terbuka', source: 'BPS, Sakernas Agt 2024' },
  tpak: { value: '70,63%', label: 'Tingkat partisipasi angkatan kerja', source: 'BPS, Sakernas Agt 2024' },
  upah: { value: 'Rp3,27 jt/bln', label: 'Rata-rata upah buruh', source: 'BPS, Sakernas Agt 2024' },
  formal: { value: 60.81, label: 'Pekerja formal', pct: '42,05%' },
  informal: { value: 83.83, label: 'Pekerja informal', pct: '57,95%' },
  penuh: { value: 98.45, label: 'Pekerja penuh (>35 jam/minggu)' },
  paruh: { value: 34.63, label: 'Pekerja paruh waktu' },
  setengah: { value: 11.56, label: 'Setengah penganggur (8,0% pekerja)' },
  pertanianSerap: { value: '40,76 jt', label: 'Pekerja di pertanian (28,18% pekerja)', source: 'BPS, Sakernas Agt 2024' },
};

// Harga & kemiskinan.
export const PRICES = {
  garisKemiskinan: { value: 'Rp595.242', label: 'Garis kemiskinan per kapita/bulan', detail: 'September 2024 · makanan Rp443.433 (74,50%) + bukan makanan Rp151.809 (25,50%)', source: 'BPS, 2025' },
  miskinKota: { value: '6,66%', label: 'Kemiskinan perkotaan', detail: 'September 2024, turun dari 7,09% (Maret 2024)', source: 'BPS, 2025' },
  miskinDesa: { value: '11,34%', label: 'Kemiskinan perdesaan', detail: 'September 2024, turun dari 11,79% (Maret 2024)', source: 'BPS, 2025' },
  gini: { value: '0,381', label: 'Gini ratio', detail: 'September 2024 · kota 0,402 · desa 0,308 · 40% terbawah menguasai 18,41% pengeluaran', source: 'BPS, 2025' },
  miskinEkstrem: { value: '1,13%', label: 'Kemiskinan ekstrem', detail: 'September 2024 · 3,17 jt orang', source: 'BPS, 2025' },
};

// Provinsi — penduduk 2024 (BPS). Pangsa dihitung dari total nasional 281,60 jt.
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 50.35, density: 1359 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.92, density: 870 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.89, density: 1104 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.59, density: null },
  { name: 'Banten', island: 'Jawa', pop: 12.43, density: 1329 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.68, density: 16165 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.42, density: null },
  { name: 'Lampung', island: 'Sumatera', pop: 9.4, density: null },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 8.94, density: null },
  { name: 'Riau', island: 'Sumatera', pop: 6.94, density: null },
  { name: 'Sumatera Barat', island: 'Sumatera', pop: 6.03, density: null },
  { name: 'Kalimantan Barat', island: 'Kalimantan', pop: 5.8, density: null },
  { name: 'Nusa Tenggara Timur', island: 'Nusa Tenggara', pop: 5.66, density: null },
  { name: 'DI Yogyakarta', island: 'Jawa', pop: 3.75, density: 1193 },
];
export const PROVINCE_SOURCE = 'BPS, 2024 — jumlah penduduk menurut provinsi; kepadatan (jiwa/km²) hanya untuk provinsi yang terverifikasi.';

// Sorotan provinsi (angka ekstrem yang terverifikasi).
export const PROVINCE_HIGHLIGHTS = [
  { title: 'IPM tertinggi', value: 'DKI Jakarta — 84,15', note: 'IPM 2024; terendah Papua Pegunungan 54,43.', source: 'BPS, 2024' },
  { title: 'Kemiskinan tertinggi', value: 'Papua Selatan — 19,35%', note: 'September 2024; terendah ke-5 nasional: Kep. Bangka Belitung 5,08%.', source: 'BPS, 2025' },
  { title: 'Pengangguran tertinggi', value: 'Jawa Barat — 6,75%', note: 'TPT Agustus 2024; terendah Papua Pegunungan 1,32%.', source: 'BPS, Sakernas Agt 2024' },
  { title: 'Partisipasi kerja tertinggi', value: 'Papua Pegunungan — 88,22%', note: 'TPAK Agustus 2024; terendah DKI Jakarta 65,10%.', source: 'BPS, Sakernas Agt 2024' },
];

// Perdagangan luar negeri 2024.
export const TRADE = {
  surplus: { value: 'US$31,04 M', label: 'Surplus neraca perdagangan 2024', detail: 'Surplus 5 tahun berturut-turut sejak 2020', source: 'Kemenkeu / BPS, 2025' },
  eksporNonMigas: { value: 'US$248,83 M', label: 'Ekspor nonmigas', detail: 'Dari total ekspor US$264,70 M; migas US$15,89 M', source: 'BPS / Kemendag, 2024' },
  tujuan: [
    { country: 'Tiongkok', value: 5.79 },
    { country: 'Amerika Serikat', value: 2.46 },
    { country: 'Jepang', value: 1.45 },
  ],
  tujuanNote: 'Tiga tujuan ekspor nonmigas terbesar, Desember 2024 (US$ miliar). Sumber: BPS / Kemendag, 2024.',
};

// Indeks untuk pencarian indikator.
export const SEARCH_INDEX = [
  { term: 'penduduk', label: 'Jumlah penduduk 2024 — 281,6 juta jiwa', route: '#/penduduk' },
  { term: 'pdb ekonomi pertumbuhan', label: 'Pertumbuhan ekonomi 2024 — 5,03%', route: '#/ekonomi' },
  { term: 'pdb per kapita', label: 'PDB per kapita 2024 — Rp78,6 juta', route: '#/ekonomi' },
  { term: 'inflasi harga ihk', label: 'Inflasi 2024 — 1,57%', route: '#/harga' },
  { term: 'kemiskinan miskin garis kemiskinan', label: 'Kemiskinan September 2024 — 8,57%', route: '#/harga' },
  { term: 'gini ketimpangan', label: 'Gini ratio September 2024 — 0,381', route: '#/harga' },
  { term: 'pengangguran tpt kerja', label: 'TPT Agustus 2024 — 4,91%', route: '#/kerja' },
  { term: 'upah buruh gaji', label: 'Rata-rata upah buruh — Rp3,27 juta/bulan', route: '#/kerja' },
  { term: 'ipm pembangunan manusia', label: 'IPM 2024 — 75,02', route: '#/penduduk' },
  { term: 'provinsi jawa barat jakarta', label: 'Penduduk per provinsi 2024', route: '#/provinsi' },
  { term: 'ekspor impor perdagangan surplus', label: 'Ekspor 2024 — US$264,70 miliar', route: '#/ekonomi' },
  { term: 'sektor industri pertanian perdagangan', label: 'Struktur PDB 2024 — industri 18,98%', route: '#/ekonomi' },
];
