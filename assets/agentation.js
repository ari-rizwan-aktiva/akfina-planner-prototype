/* Agentation — toolbar anotasi untuk prototipe ini.
 *
 * Prototipe ini HTML statis, bukan React/Next.js, sementara paket `agentation`
 * adalah komponen React yang hanya dikirim sebagai ESM/CJS (tidak ada build
 * browser standalone). Jadi React + Agentation dimuat dari ESM CDN saat runtime
 * dan di-mount manual, bukan lewat bundler.
 *
 * KONSEKUENSI: halaman harus dibuka lewat http://localhost, BUKAN file://.
 * Import ESM dari CDN diblokir CORS di file://.
 *
 *     cd prototype/web && python3 -m http.server 8000
 *     buka http://localhost:8000
 *
 * Guard di bawah adalah padanan `process.env.NODE_ENV === "development"`:
 * toolbar hanya muncul di localhost, tidak akan ikut kalau folder ini di-deploy.
 */
(function () {
  'use strict';

  var LOKAL = ['localhost', '127.0.0.1', '[::1]', '::1'];
  var REACT = '18.3.1';
  var AGENTATION = '3.0.2';

  /* WAJIB. Tanpa prop `endpoint`, Agentation hanya menyimpan anotasi di
     localStorage dan MCP server tidak akan pernah melihatnya — toolbar tampak
     jalan, tapi anotasinya tidak sampai ke agen. Port 4747 adalah default
     `agentation-mcp server`. */
  var ENDPOINT = 'http://localhost:4747';

  if (location.protocol === 'file:') {
    console.info(
      '[agentation] Dilewati: halaman dibuka lewat file://. ' +
      'Jalankan `python3 -m http.server 8000` di folder web/, lalu buka http://localhost:8000.'
    );
    return;
  }

  if (LOKAL.indexOf(location.hostname) === -1) {
    return; // bukan lingkungan dev — jangan muat apa pun
  }

  var deps = '?deps=react@' + REACT + ',react-dom@' + REACT;

  Promise.all([
    import('https://esm.sh/react@' + REACT),
    import('https://esm.sh/react-dom@' + REACT + '/client'),
    import('https://esm.sh/agentation@' + AGENTATION + deps)
  ]).then(function (mods) {
    var React = mods[0].default || mods[0];
    var createRoot = mods[1].createRoot;
    var Agentation = mods[2].Agentation;

    if (!Agentation) throw new Error('Ekspor `Agentation` tidak ditemukan');

    var mount = document.createElement('div');
    mount.id = 'agentation-root';
    document.body.appendChild(mount);

    createRoot(mount).render(React.createElement(Agentation, {
      endpoint: ENDPOINT,
      onSessionCreated: function (id) {
        console.info('[agentation] sesi dibuat:', id);
      }
    }));
  }).catch(function (err) {
    console.warn(
      '[agentation] Gagal dimuat, prototipe tetap jalan tanpa toolbar:',
      err && err.message ? err.message : err
    );
  });
})();
