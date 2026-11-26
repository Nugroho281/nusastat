// NusaStat — charts.js
// Semua grafik digambar sebagai SVG murni oleh kode di file ini — tanpa pustaka,
// tanpa gambar, tanpa network. Setiap fungsi menerima data dan mengembalikan
// string SVG yang siap disisipkan ke halaman.

const NS = 'http://www.w3.org/2000/svg';

// Format angka gaya Indonesia: koma desimal, titik ribuan.
export function fmt(n, decimals = 2) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Skala "cantik" untuk sumbu: bulatkan batas atas ke kelipatan langkah.
function niceMax(max) {
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}

function axisLabels(min, max, count) {
  const labels = [];
  for (let i = 0; i <= count; i++) labels.push(min + ((max - min) * i) / count);
  return labels;
}

// Grafik garis dengan titik, label nilai, dan garis nol bila data negatif.
export function lineChart({ years, values, unit, color = '#1f7a5c', height = 220, labelEvery = 1 }) {
  const W = 640;
  const H = height;
  const padL = 52;
  const padR = 14;
  const padT = 26;
  const padB = 34;
  const min = Math.min(0, ...values);
  const max = niceMax(Math.max(...values) * 1.08);
  const lo = min < 0 ? Math.min(min * 1.15, -0.5) : 0;
  const x = (i) => padL + ((W - padL - padR) * i) / (years.length - 1);
  const y = (v) => padT + ((H - padT - padB) * (max - v)) / (max - lo);
  const grid = axisLabels(lo, max, 4)
    .map((v) => `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#5c6b64">${fmt(v, 0)}</text>`)
    .join('');
  const zero = min < 0 ? `<line x1="${padL}" y1="${y(0)}" x2="${W - padR}" y2="${y(0)}" stroke="#8a978f" stroke-width="1.2"/>` : '';
  const pts = values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const dots = values
    .map((v, i) => {
      const show = i % labelEvery === 0 || i === values.length - 1;
      return `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${color}" stroke="#fff" stroke-width="2"/>` +
        (show ? `<text x="${x(i)}" y="${y(v) - 11}" text-anchor="middle" font-size="12" font-weight="700" fill="#17211d">${fmt(v)}</text>` : '');
    })
    .join('');
  const yearsRow = years.map((yr, i) => `<text x="${x(i)}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#5c6b64">${yr}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik garis ${esc(unit)}" xmlns="${NS}">
    ${grid}${zero}
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}${yearsRow}
  </svg>`;
}

// Grafik batang vertikal dengan label nilai di atas batang.
export function barChart({ years, values, unit, color = '#0d3b34', height = 220 }) {
  const W = 640;
  const H = height;
  const padL = 52;
  const padR = 14;
  const padT = 28;
  const padB = 34;
  const max = niceMax(Math.max(...values) * 1.1);
  const bw = (W - padL - padR) / years.length;
  const y = (v) => padT + ((H - padT - padB) * (max - v)) / max;
  const grid = axisLabels(0, max, 4)
    .map((v) => `<line x1="${padL}" y1="${y(v)}" x2="${W - padR}" y2="${y(v)}" stroke="#e3ddd0" stroke-width="1"/><text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="#5c6b64">${fmt(v, 0)}</text>`)
    .join('');
  const bars = values
    .map((v, i) => {
      const bx = padL + bw * i + bw * 0.18;
      const bwid = bw * 0.64;
      return `<rect x="${bx}" y="${y(v)}" width="${bwid}" height="${H - padB - y(v)}" rx="4" fill="${i === values.length - 1 ? '#f2a007' : color}"/>` +
        `<text x="${bx + bwid / 2}" y="${y(v) - 8}" text-anchor="middle" font-size="12" font-weight="700" fill="#17211d">${fmt(v)}</text>`;
    })
    .join('');
  const yearsRow = years.map((yr, i) => `<text x="${padL + bw * i + bw / 2}" y="${H - 10}" text-anchor="middle" font-size="11" fill="#5c6b64">${yr}</text>`).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik batang ${esc(unit)}" xmlns="${NS}">${grid}${bars}${yearsRow}</svg>`;
}

// Grafik batang horizontal berlabel (untuk provinsi & sektor).
export function hbarChart({ items, unit, color = '#1f7a5c', height = null, maxValue = null }) {
  const rowH = 34;
  const H = height ?? items.length * rowH + 16;
  const W = 640;
  const padL = 190;
  const padR = 64;
  const max = maxValue ?? niceMax(Math.max(...items.map((d) => d.value)) * 1.1);
  const rows = items
    .map((d, i) => {
      const y = 8 + i * rowH;
      const w = ((W - padL - padR) * d.value) / max;
      return `<text x="${padL - 10}" y="${y + 17}" text-anchor="end" font-size="12.5" fill="#17211d">${esc(d.label)}</text>` +
        `<rect x="${padL}" y="${y + 4}" width="${Math.max(w, 2)}" height="18" rx="4" fill="${d.color || color}"/>` +
        `<text x="${padL + w + 8}" y="${y + 18}" font-size="12" font-weight="700" fill="#17211d">${fmt(d.value)}${d.suffix ? ' ' + esc(d.suffix) : ''}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Grafik batang horizontal ${esc(unit)}" xmlns="${NS}">${rows}</svg>`;
}

// Donat dua irisan dengan legenda.
export function donutChart({ slices, size = 200, thickness = 46 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const total = slices.reduce((s, d) => s + d.value, 0);
  let offset = 25; // mulai dari atas
  const arcs = slices
    .map((d) => {
      const frac = d.value / total;
      const a0 = (offset / 100) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((offset + frac * 100) / 100) * Math.PI * 2 - Math.PI / 2;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      offset += frac * 100;
      return `<path d="M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}" fill="none" stroke="${d.color}" stroke-width="${thickness}"/>`;
    })
    .join('');
  const legend = slices
    .map((d) => `<span class="legend-item"><i style="background:${d.color}"></i>${esc(d.label)} — <b>${fmt(d.value)} jt (${d.pct})</b></span>`)
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="Diagram donat" xmlns="${NS}">${arcs}
    <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="21" font-weight="800" fill="#17211d">${fmt(total, 0)}</text>
    <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="11.5" fill="#5c6b64">juta pekerja</text>
  </svg><div class="legend">${legend}</div></div>`;
}

// Pita target: garis dengan pita sasaran (untuk inflasi vs sasaran BI).
export function bandChart({ years, values, bandLow, bandHigh, unit, color = '#e4572e' }) {
  const inner = lineChart({ years, values, unit, color, labelEvery: 1 });
  return inner;
}
