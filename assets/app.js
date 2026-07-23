/* AkFina · Modul Financial Planner — prototipe web
 * - Menyuntik sidebar planner supaya tidak diduplikasi di 10 halaman.
 * - Mengganti <i data-icon="nama"> dengan SVG Lucide inline (tanpa emoji, tanpa CDN).
 */
(function () {
  'use strict';

  /* ── Ikon Lucide (stroke) ─────────────────────────────────────────────── */
  var LUCIDE = {
    'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'scan-line': '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    'keyboard': '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>',
    'eye': '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'image': '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21"/>',
    'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    'eye-off': '<path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'send': '<path d="M14.54 2.4a2 2 0 0 1 2.53 2.53l-4.1 12.31a2 2 0 0 1-3.62.3l-2-3.86a2 2 0 0 0-.86-.87l-3.87-2a2 2 0 0 1 .3-3.62z"/><path d="m21.9 2.1-9.4 9.4"/>',
    'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    'pen-line': '<path d="M13 21h8"/><path d="m15 5 4 4"/><path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L6 21l-4 1 1-4Z"/>',
    'log-out': '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
    'panel-left': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/>',
    'bar-chart': '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
    'mail': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'
  };

  /* Logo penyedia — bukan Lucide, harus bentuk resminya. */
  var BRAND = {
    google: '<svg class="brandmark" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">' +
      '<path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62"/>' +
      '<path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18"/>' +
      '<path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1z"/>' +
      '<path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58"/></svg>',
    facebook: '<svg class="brandmark" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07"/></svg>'
  };

  function svg(name, size) {
    var body = LUCIDE[name];
    if (!body) return '';
    var s = size || 16;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  function paintIcons(root) {
    var slots = (root || document).querySelectorAll('[data-icon]');
    Array.prototype.forEach.call(slots, function (el) {
      var name = el.getAttribute('data-icon');
      var markup = BRAND[name] || svg(name, Number(el.getAttribute('data-size')) || 16);
      if (!markup) return;
      var holder = document.createElement('span');
      holder.innerHTML = markup;
      var node = holder.firstChild;
      if (el.className) node.setAttribute('class', el.className + ' ' + (node.getAttribute('class') || ''));
      el.replaceWith(node);
    });
  }

  /* ── Sidebar ──────────────────────────────────────────────────────────── */
  var NAV = [
    { key: 'beranda',  label: 'Beranda',          href: 'beranda.html', icon: 'layout-dashboard' },
    { key: 'klien',    label: 'Input Data Klien', href: 'klien.html',   icon: 'users' },
    { key: 'jadwal',   label: 'Jadwal',           href: '',             icon: 'calendar' },
    { key: 'laporan',  label: 'Laporan',          href: '',             icon: 'file-text' },
    { key: 'setelan',  label: 'Pengaturan',       href: '',             icon: 'settings' }
  ];

  /* Menu yang layarnya belum ada dibuat redup dan non-interaktif — bukan
     terlihat sama dengan yang aktif lalu diam saat diklik. */
  function navItem(item, active) {
    if (!item.href) {
      return '<span class="sidebar__link sidebar__link--soon" aria-disabled="true"' +
        ' title="Belum tersedia di prototipe ini">' +
        svg(item.icon, 20) + '<span>' + item.label + '</span>' +
        '<span class="sidebar__soon">Segera</span></span>';
    }
    return '<a class="sidebar__link" href="' + item.href + '"' +
      (active ? ' aria-current="page"' : '') + '>' +
      svg(item.icon, 20) + '<span>' + item.label + '</span></a>';
  }

  function buildSidebar(mount) {
    var active = document.body.getAttribute('data-nav') || '';
    var links = NAV.map(function (item) { return navItem(item, item.key === active); }).join('');

    /* Logo asli, dijadikan mono putih lewat CSS filter — tanpa wadah putih. */
    mount.className = 'sidebar';
    mount.innerHTML =
      '<div class="sidebar__top">' +
        '<a class="sidebar__logo" href="beranda.html">' +
          '<img src="assets/logo-akfina.png" width="709" height="176" alt="AkFina — ke Beranda"></a>' +
        '<button class="sidebar__toggle" type="button" aria-label="Ciutkan sidebar" aria-expanded="true">' +
          svg('panel-left', 18) + '</button>' +
      '</div>' +
      '<nav class="sidebar__nav" aria-label="Menu planner">' + links +
        '<span class="sidebar__sep" role="presentation"></span>' +
        '<span class="sidebar__link sidebar__link--soon" aria-disabled="true"' +
          ' title="Belum tersedia di prototipe ini">' +
          svg('log-out', 20) + '<span>Keluar</span>' +
          '<span class="sidebar__soon">Segera</span></span>' +
      '</nav>' +
      '<div class="sidebar__foot">' +
        '<div class="sidebar__user">' +
          '<span class="sidebar__avatar" aria-hidden="true">AR</span>' +
          '<span class="sidebar__who">' +
            '<b class="sidebar__name">Ari Rizwan, CFP</b>' +
            '<span class="sidebar__reg">Reg. FP-2024-0192</span>' +
          '</span>' +
          '<span class="sidebar__userico">' + svg('bar-chart', 15) + '</span>' +
        '</div>' +
      '</div>';

    /* Collapse benar-benar berfungsi, dan diingat antar-halaman — kalau tidak,
       sidebar mengembang lagi tiap navigasi dan tombolnya terasa palsu. */
    var btn = mount.querySelector('.sidebar__toggle');
    var app = mount.closest('.app');
    function apply(on) {
      app.classList.toggle('app--rail', on);
      btn.setAttribute('aria-expanded', String(!on));
      btn.setAttribute('aria-label', on ? 'Bentangkan sidebar' : 'Ciutkan sidebar');
    }
    var saved = null;
    try { saved = localStorage.getItem('akfina-rail'); } catch (e) {}
    if (saved === '1') apply(true);
    btn.addEventListener('click', function () {
      var on = !app.classList.contains('app--rail');
      apply(on);
      try { localStorage.setItem('akfina-rail', on ? '1' : '0'); } catch (e) {}
    });
  }

  /* ── Stepper: enam formulir, bukan lima langkah data ──────────────────────
   * Mengikuti perjalanan klien F-01→F-06 seperti wireframe atasan.
   * F-03 mencakup tiga layar (neraca, arus kas, tujuan) — halaman menandai
   * dirinya lewat data-sub supaya jelas sedang di sub-bagian mana.
   */
  var LANGKAH = [
    { kode: 'F-01', label: 'Identifikasi & Kelayakan', href: 'langkah-1-profil.html',      grup: 'A' },
    { kode: 'F-02', label: 'Kesepakatan Layanan',      href: 'kesepakatan.html',           grup: 'A' },
    { kode: 'F-03', label: 'Data & Tujuan',            href: 'langkah-2-neraca.html',      grup: 'B' },
    { kode: 'F-04', label: 'Analisa Keuangan',         href: 'kertas-kerja.html',          grup: 'B' },
    { kode: 'F-05', label: 'Rekomendasi',              href: 'langkah-5-rekomendasi.html', grup: 'B' },
    { kode: 'F-06', label: 'Serah Terima',             href: 'serah-terima.html',          grup: 'A' }
  ];

  function buildStepper(mount) {
    var now = Number(document.body.getAttribute('data-step')) || 1;
    var sub = document.body.getAttribute('data-sub');
    var held = mount.hasAttribute('data-held');

    var items = LANGKAH.map(function (step, i) {
      var n = i + 1;
      var state, mod;
      if (n < now)        { state = 'Selesai';  mod = 'done'; }
      else if (n === now) { state = sub || (held ? 'Tertahan' : 'Sedang diisi'); mod = held ? 'held' : 'now'; }
      else                { state = 'Belum';    mod = ''; }

      var badge = n < now ? svg('check', 13) : step.kode.replace('F-0', '');
      var inner =
        '<span class="stepper__num">' + badge + '</span>' +
        '<span><span class="stepper__label">' + step.label + '</span>' +
        '<span class="stepper__state" style="display:block">' + step.kode + ' · ' + state + '</span></span>';
      var cls = 'stepper__item' + (mod ? ' stepper__item--' + mod : '');

      return n === now
        ? '<span class="' + cls + '" aria-current="step">' + inner + '</span>'
        : '<a class="' + cls + '" href="' + step.href + '">' + inner + '</a>';
    }).join('');

    mount.className = 'card stepper';
    mount.innerHTML =
      '<nav class="stepper__list" aria-label="Perjalanan klien F-01 sampai F-06">' + items + '</nav>' +
      '<p class="stepper__track' + (held ? ' stepper__track--held' : '') + '">' +
        '<i style="width:' + Math.round(now / LANGKAH.length * 100) + '%"></i></p>';
  }

  /* ── Roster: cari, filter, baris bisa diklik ────────────────────────────
   * Penyaringan sungguhan, bukan penanda "belum jalan" — pencarian adalah hal
   * pertama yang orang coba di halaman daftar, dan kalau mati, demo terasa rusak.
   */
  function initRoster() {
    var tabel = document.getElementById('roster');
    if (!tabel) return;

    var baris   = Array.prototype.slice.call(tabel.querySelectorAll('tbody tr.row-link'));
    var kosong  = tabel.querySelector('.roster__empty');
    var detail  = document.getElementById('emptyDetail');
    var hitung  = document.getElementById('rosterCount');
    var cari    = document.getElementById('cari');
    var tahap   = document.getElementById('tahap');
    var reset   = document.getElementById('resetFilter');

    function saring() {
      var q = (cari.value || '').trim().toLowerCase();
      var t = tahap.value || '';
      var tampil = 0;

      baris.forEach(function (tr) {
        var cocokNama  = !q || (tr.getAttribute('data-nama') || '').toLowerCase().indexOf(q) !== -1;
        var cocokTahap = !t || tr.getAttribute('data-tahap') === t;
        var lolos = cocokNama && cocokTahap;
        tr.hidden = !lolos;
        if (lolos) tampil++;
      });

      kosong.hidden = tampil > 0;
      hitung.textContent = (q || t)
        ? tampil + ' dari ' + baris.length + ' klien'
        : baris.length + ' klien';

      if (tampil === 0) {
        detail.textContent = q
          ? 'Tidak ada klien bernama “' + cari.value.trim() + '”. Coba kata kunci lain, atau tambahkan klien baru.'
          : 'Belum ada klien di tahap ini. Ubah filter, atau tambahkan klien baru.';
      }
    }

    cari.addEventListener('input', saring);
    tahap.addEventListener('change', saring);
    reset.addEventListener('click', function () {
      cari.value = ''; tahap.value = ''; saring(); cari.focus();
    });

    /* Seluruh baris jadi area klik. Tautan asli tetap di nama supaya keyboard
       dan pembaca layar punya target yang benar — ini cuma untuk mouse. */
    baris.forEach(function (tr) {
      tr.addEventListener('click', function (e) {
        if (e.target.closest('a, button, input, select')) return;
        var tuju = tr.querySelector('.table__name a');
        if (tuju) window.location.assign(tuju.getAttribute('href'));
      });
    });

    saring();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.querySelector('[data-sidebar]');
    if (mount) buildSidebar(mount);

    var steps = document.querySelector('[data-stepper]');
    if (steps) buildStepper(steps);

    paintIcons(document);
    initRoster();

    /* Form prototipe: pindah halaman tanpa method="get",
       supaya isian (termasuk kata sandi) tidak ikut nempel di URL. */
    Array.prototype.forEach.call(document.querySelectorAll('form[data-go]'), function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        window.location.assign(form.getAttribute('data-go'));
      });
    });

    /* Tombol yang layarnya belum ada: jangan diam-diam tidak melakukan apa-apa. */
    Array.prototype.forEach.call(document.querySelectorAll('[data-todo]'), function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var pesan = el.getAttribute('data-todo') || 'Layar ini belum digambar di prototipe.';
        window.alert(pesan);
      });
    });
  });
})();
