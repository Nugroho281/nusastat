// NusaStat — app.js
// Router hash, pencarian indikator, tab halaman Ekonomi, dan kontrol tabel
// provinsi (cari, saring pulau, urutkan kolom). Semua kontrol benar-benar bekerja.
import { VIEWS } from './views.js';
import { SEARCH_INDEX } from './data.js';

const view = document.getElementById('view');
const searchInput = document.getElementById('site-search');
const searchResults = document.getElementById('search-results');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function currentRoute() {
  const hash = location.hash.replace(/^#/, '') || '/';
  return VIEWS[hash] ? hash : '/';
}

function render() {
  const route = currentRoute();
  const page = VIEWS[route];
  view.innerHTML = page.render();
  document.title = `${page.title} — NusaStat`;
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${route}` || (route === '/' && href === '#/'));
    if (href === `#${route}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  mountRouteControls(route);
  window.scrollTo(0, 0);
}

// Kontrol yang hidup di dalam halaman yang sedang tampil.
function mountRouteControls(route) {
  // Tab halaman Ekonomi.
  const tabs = view.querySelectorAll('.tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      view.querySelectorAll('.tab-panel').forEach((p) => p.classList.add('hidden'));
      const panel = view.querySelector(`#panel-${tab.dataset.tab}`);
      if (panel) panel.classList.remove('hidden');
    });
  });

  // Tabel provinsi: cari + saring pulau + urutkan kolom.
  const table = view.querySelector('#prov-table');
  if (table) {
    const search = view.querySelector('#prov-search');
    const island = view.querySelector('#prov-island');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    let sortKey = null;
    let sortDir = 1;

    function applyFilter() {
      const q = (search.value || '').trim().toLowerCase();
      const isl = island.value;
      rows.forEach((r) => {
        const okName = !q || r.dataset.name.includes(q);
        const okIsland = !isl || r.dataset.island === isl;
        r.style.display = okName && okIsland ? '' : 'none';
      });
    }
    search.addEventListener('input', applyFilter);
    island.addEventListener('change', applyFilter);

    table.querySelectorAll('th[data-sortkey]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sortkey;
        if (sortKey === key) sortDir = -sortDir;
        else {
          sortKey = key;
          sortDir = key === 'name' ? 1 : -1;
        }
        const sorted = [...rows].sort((a, b) => {
          if (key === 'name') return sortDir * a.dataset.name.localeCompare(b.dataset.name, 'id');
          const av = parseFloat(a.querySelector(`td:nth-child(${key === 'pop' ? 4 : 5})`).dataset.sort);
          const bv = parseFloat(b.querySelector(`td:nth-child(${key === 'pop' ? 4 : 5})`).dataset.sort);
          return sortDir * (av - bv);
        });
        sorted.forEach((r) => tbody.appendChild(r));
        table.querySelectorAll('th[data-sortkey]').forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));
        th.classList.add(sortDir === 1 ? 'sorted-asc' : 'sorted-desc');
      });
    });
  }
}

// Pencarian indikator di header: ketik, pilih hasil, lompat ke halaman.
function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length < 2) {
    searchResults.innerHTML = '';
    searchResults.hidden = true;
    return;
  }
  const hits = SEARCH_INDEX.filter((item) => item.term.includes(q) || item.label.toLowerCase().includes(q)).slice(0, 6);
  if (!hits.length) {
    searchResults.innerHTML = '<li class="search-empty">Tidak ada indikator yang cocok.</li>';
  } else {
    searchResults.innerHTML = hits.map((h) => `<li><a href="${h.route}">${h.label}</a></li>`).join('');
  }
  searchResults.hidden = false;
}

searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('focus', runSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchResults.hidden = true;
    searchInput.blur();
  }
});
searchResults.addEventListener('click', () => {
  searchResults.hidden = true;
  searchInput.value = '';
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box')) searchResults.hidden = true;
});

window.addEventListener('hashchange', render);
render();
