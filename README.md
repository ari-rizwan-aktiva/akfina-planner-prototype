# Prototipe web — Modul Financial Planner AkFina

14 layar HTML statis. Tanpa build step, tanpa backend.

**Acuan field: `Formulir_Perencanaan_Keuangan_AkFina.pdf`** — paket lima formulir
F-01 s.d. F-05. Setiap layar mencantumkan kode dan bagian formulirnya di header,
supaya gampang dicocokkan balik ke kertas.

> **Versi web lebih maju dari Figma.** Penyelarasan ke formulir baru dikerjakan di
> sini; file Figma masih memakai penomoran dan set rasio yang lama. Lihat
> `../keputusan-modul-planner.md` § Acuan formulir.

## Cara membuka

```bash
cd prototype/web
python3 -m http.server 8000
# buka http://localhost:8000
```

Klik dua kali `index.html` juga bisa, tapi **toolbar anotasi Agentation tidak akan
muncul di `file://`** (lihat bagian Agentation di bawah).

`index.html` adalah peta layar. Untuk menelusuri alur penuh, mulai dari `masuk.html`.

## Agentation — anotasi langsung di halaman

Toolbar anotasi terpasang di semua halaman lewat `assets/agentation.js`. Klik
tombol bulat di kanan bawah, tunjuk elemen mana pun, tulis catatan. Catatan itu
bisa dibaca agen AI lewat MCP server, jadi tidak perlu menjelaskan "tombol yang
di pojok kanan atas itu lho" lewat teks.

**Syarat: harus lewat `http://localhost`, bukan `file://`.** Paket `agentation`
adalah komponen React yang hanya dikirim sebagai ESM, dan prototipe ini bukan
project React. Jadi React + Agentation dimuat dari ESM CDN saat runtime lalu
di-mount manual — dan import ESM dari CDN diblokir CORS di `file://`.

Loader-nya juga hanya aktif di `localhost` / `127.0.0.1`. Itu padanan
`process.env.NODE_ENV === "development"`: kalau folder ini di-deploy, toolbarnya
tidak ikut. Kalau CDN tak terjangkau, prototipe tetap jalan tanpa toolbar.

**MCP server sudah didaftarkan** di `prototype/.mcp.json` (project scope, bukan
global — jadi hanya aktif saat bekerja di folder ini dan gampang dibatalkan
dengan `claude mcp remove agentation --scope project`). Claude Code menjalankan
`npx -y agentation-mcp@1.2.0 server` sendiri saat sesi mulai; server itu
mengangkat HTTP di port 4747 sekaligus MCP di stdio.

Loader mengirim prop `endpoint: "http://localhost:4747"`. **Prop ini wajib** —
tanpa itu Agentation hanya menyimpan anotasi di localStorage dan MCP server tidak
akan pernah melihatnya. Toolbar tetap tampak jalan, tapi anotasinya tidak sampai
ke agen. Kalau nanti portnya diganti, ubah `ENDPOINT` di `assets/agentation.js`.

Verifikasi kapan saja dengan `npx agentation-mcp doctor`.

Untuk agen selain Claude Code, pakai `npx add-mcp` (mendukung 9+ agen).

## Isi

```
assets/tokens.css             SYMLINK ke ../../tokens.css
assets/agentation.js          Loader toolbar anotasi (dev-only)
assets/logo-akfina.png        Logo AkFina asli (709×176, transparan)
index.html                    Peta layar
masuk.html                    Masuk (Google, Facebook, email)
daftar.html                   Daftar sebagai Planner
beranda.html                  Beranda planner
klien.html                    Input Data Klien (roster)
klien-baru.html               Tambah Klien Baru
scan-ocr.html                 Scan Form Kertas → OCR
langkah-1-profil.html         F-01       · Langkah 1 · Profil + kelayakan klien
langkah-2-neraca.html         F-02 A/B/D · Langkah 2 · Aset, kewajiban, proteksi
langkah-3-arus-kas.html       F-02 C     · Langkah 3 · Arus kas
langkah-4-tujuan.html         F-02 E/F/G · Langkah 4 · Tujuan, profil risiko, konfirmasi
kertas-kerja.html             F-03       · Analisa Keuangan (internal)
langkah-5-rekomendasi.html    F-04       · Langkah 5 · Rekomendasi & rencana aksi
serah-terima.html             F-05       · Serah terima & peninjauan berkala
assets/app.css                Seluruh style
assets/app.js                 Sidebar, stepper, ikon, navigasi form
```

## Keputusan teknis

**Warna diimpor, bukan disalin.** `assets/app.css` diawali
`@import url("tokens.css")`, dan `assets/tokens.css` adalah **symlink** ke
`../../tokens.css`. Satu sumber kebenaran; mengubah token di `prototype/tokens.css`
langsung terasa di sini. Jangan hardcode warna brand.

Symlink-nya perlu, bukan gaya-gayaan: mengimpor `../../tokens.css` langsung akan
**404 saat folder ini diserve lewat HTTP**, karena path itu keluar dari document
root. Akibatnya seluruh token warna dan font hilang — sidebar jadi putih, font
jadi serif. Di `file://` masalah ini tidak kelihatan, jadi mudah lolos.
Kalau menyalin folder ini ke tempat lain dan symlink-nya putus, ganti saja dengan
salinan asli `tokens.css`.

**Sidebar dan stepper disuntik lewat JS.** Keduanya muncul di 10 halaman. Kalau
ditulis manual, satu perubahan berarti 10 edit. Halaman cukup menyediakan
`<aside data-sidebar>` dan `<div data-stepper>`, lalu `data-nav` / `data-step` di
`<body>` yang menentukan item mana yang aktif.

**Ikon SVG Lucide inline, tanpa CDN.** Path-nya ada di `assets/app.js`, dipasang
lewat `<i data-icon="nama">`. Logo Google dan Facebook memakai bentuk resminya,
bukan ikon generik. Tidak ada emoji sebagai ikon.

**Form tidak memakai `method="get"`.** Kalau memakai GET, isian termasuk kata
sandi akan nempel di URL. Form pakai `data-go="tujuan.html"` dan JS yang
menangani submit, jadi Enter tetap jalan tanpa membocorkan isian.

**Logo asli, dua perlakuan.** File `assets/logo-akfina.png` (709×176, transparan)
disalin dari `AkFina/logo/`. Di latar terang (peta layar) dipakai apa adanya.
Di latar gelap — sidebar dan panel brand — dipakai **mono putih** lewat
`filter: brightness(0) invert(1)`, **tanpa wadah putih**. Alasannya huruf "Ak"
pada logo asli berwarna navy dan tidak terbaca di atas `#0d3f35`.
Begitu file logo versi putih tersedia, ganti `src`-nya dan buang filter itu di
`.sidebar__logo img` dan `.auth__logo img`.

## Beda dari file Figma

1. **Teks sekunder lebih gelap.** Di Figma teks muted memakai `--foreground`
   opacity .5 (≈3.4:1) yang **gagal WCAG AA**. Di web dipakai `--fg-muted` /
   `--fg-subtle` yang lolos ≥4.5:1. Kalau Figma nanti disamakan, ambil nilai dari
   blok `:root` di `app.css`.
2. **Ikon sudah asli.** Di Figma masih kotak placeholder `icon-slot/*`.
3. **Responsif.** Figma hanya 1280×832. Web menyesuaikan di 1440 / 1024 / 768 /
   375: di bawah 1024 sidebar jadi bar horizontal, kartu menumpuk, tabel
   di-scroll ke samping.
4. **Klien di kertas kerja diseragamkan jadi Richi Ramadhan.** Di Figma layar itu
   memakai Rina Kusuma, yang jadi janggal begitu layarnya bisa diklik dari alur
   Richi.
5. **Font Manrope sudah dipakai** (Google Fonts), sesuai `design.md`. Figma masih
   Inter.
6. **Logo asli sudah terpasang, tanpa wadah putih.** Figma memakai kotak
   placeholder `logo/akfina — TARUH PNG DI SINI` di atas wadah putih. Di web
   wadah itu dibuang; logo dibuat mono putih di latar gelap. **Figma sebaiknya
   menyusul**: hapus `logo/wadah-putih`, pasang logo versi putih.

## Yang sengaja belum ada

Menu Jadwal, Laporan, Pengaturan; lupa kata sandi; langkah 2 registrasi; halaman
pengguna biasa; dan layar setelah gerbang terbuka. Tombolnya tetap ada dan akan
memberi tahu kalau diklik, bukan diam saja.

Daftar lengkap yang masih terbuka ada di `../keputusan-modul-planner.md`.
