// NusaStat — main.ts (Node 22, standard library only)
// Program penyerahan: menyalin app/ dan screenshots/ dari samping file ini ke
// /output (atau MAKEFUN_OUTPUT_DIR di luar grader) lalu menulis dossier.json
// dengan buildDossier dari vendor/makefun-frontend.ts — pustaka kit yang tidak
// diubah. Dijalankan dua kali oleh grader; kedua run harus menulis byte yang sama.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas gate (lihat RULES.txt): maks 4 screenshot @ 256 KiB, app/ maks 993
// file dan 16 MiB, teks dossier maks 160 KiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
