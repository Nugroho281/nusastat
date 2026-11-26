# NusaStat — Angka Indonesia, Dibaca Sekilas

![NusaStat](https://img.shields.io/badge/data-BPS%202024-1f7a5c)
![offline](https://img.shields.io/badge/offline-tanpa%20network-0d3b34)
![license](https://img.shields.io/badge/license-MIT-f2a007)

Portal statistik Indonesia berbahasa Indonesia: penduduk, ekonomi, harga,
ketenagakerjaan, dan provinsi — setiap angka disertai sumber dan tahunnya.

## Isi

- **Beranda** — 6 angka utama (penduduk 281,6 jt; PDB Rp22.139 T; inflasi 1,57%;
  TPT 4,91%; kemiskinan 8,57%; IPM 75,02) + 6 grafik SVG + 5 kartu topik.
- **Penduduk** — seri 2020–2024, 5 provinsi terbesar, kepadatan Pulau Jawa.
- **Ekonomi** — PDB, pertumbuhan, struktur lapangan usaha, perdagangan (3 tab).
- **Harga & Kemiskinan** — inflasi, garis kemiskinan Rp595.242, gini 0,381.
- **Ketenagakerjaan** — TPT, formal vs informal, upah Rp3,27 jt/bulan.
- **Provinsi** — tabel 14 provinsi terbesar dengan cari, saring pulau, dan urutkan kolom.
- **Tentang & Sumber** — metodologi + daftar lengkap sumber (BPS, Kemenkeu, Kemendag, Dukcapil).

## Menjalankan

```sh
node serve.ts            # http://localhost:8080
```

Situs statis murni (vanilla HTML/CSS/JS, tanpa framework, tanpa network).
Semua grafik digambar sebagai SVG oleh kode sendiri (`app/charts.js`).

## Menyerahkan (make.fun)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` + `screenshots/` ke `/output` dan menulis
`dossier.json` via `vendor/makefun-frontend.ts` (pustaka kit, tidak diubah).

## Sumber data

Badan Pusat Statistik (BPS) — BRS Pertumbuhan Ekonomi 5 Feb 2025, BRS
Kemiskinan 15 Jan 2025, BRS Ketenagakerjaan 5 Nov 2024, IPM 2024, Gini
September 2024; Kementerian Keuangan (neraca perdagangan 2024); Dukcapil
Kemendagri (sebaran penduduk Semester I-2024). NusaStat adalah ringkasan
independen — bukan situs pemerintah.

## Lisensi

MIT — lihat `LICENSE`.
