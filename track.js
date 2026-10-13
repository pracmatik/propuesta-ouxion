/* Medición de la propuesta: visitas, tiempo, secciones vistas, clics y vídeos.
   Va a nuestro Umami (sin cookies). Albert se excluye abriendo una vez cualquier página con ?owner=1 */
(function () {
  'use strict';
  var SITE = '72b8f978-c80f-49a2-a511-6c3ac318eea0';
  var HOST = 'https://umami.2slval.easypanel.host';
  try {
    var q = new URLSearchParams(location.search);
    if (q.get('owner') === '1') localStorage.setItem('umami.disabled', '1');
    if (q.get('owner') === '0') localStorage.removeItem('umami.disabled');
    if (localStorage.getItem('umami.disabled') === '1') return;
  } catch (e) { /* sin almacenamiento: se mide igual */ }

  var s = document.createElement('script');
  s.defer = true;
  s.src = HOST + '/script.js';
  s.setAttribute('data-website-id', SITE);
  document.head.appendChild(s);

  var cola = [];
  function track(name, data) {
    data = data || {};
    data.path = location.pathname;
    if (window.umami && window.umami.track) { try { window.umami.track(name, data); } catch (e) {} }
    else cola.push([name, data]);
  }
  window.oxTrack = track;
  var vaciar = setInterval(function () {
    if (!(window.umami && window.umami.track)) return;
    clearInterval(vaciar);
    cola.splice(0).forEach(function (c) { window.umami.track(c[0], c[1]); });
  }, 500);

  /* Tiempo real en página: un latido cada 15 s con la pestaña visible */
  var seg = 0;
  setInterval(function () { if (!document.hidden) { seg += 15; track('tiempo', { seg: seg }); } }, 15000);

  /* Profundidad de lectura */
  var marcas = {};
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = Math.round(((h.scrollTop || window.scrollY) + innerHeight) / Math.max(h.scrollHeight, 1) * 100);
    [25, 50, 75, 100].forEach(function (m) { if (pct >= m && !marcas[m]) { marcas[m] = 1; track('scroll-' + m); } });
  }, { passive: true });

  /* Clics: cualquier enlace o botón; el nombre sale de data-track o del texto */
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest('a, button, [data-track]');
    if (!el) return;
    var nombre = el.getAttribute('data-track') || (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60) || el.tagName;
    track('clic', { que: nombre, destino: el.getAttribute('href') || '' });
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    /* Secciones vistas (cada una cuenta una vez por visita) */
    if ('IntersectionObserver' in window) {
      var vistas = {};
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          var id = e.target.id || e.target.getAttribute('data-section');
          if (e.isIntersecting && id && !vistas[id]) { vistas[id] = 1; track('seccion', { seccion: id }); }
        });
      }, { threshold: 0.4 });
      document.querySelectorAll('section[id], [data-section]').forEach(function (el) { io.observe(el); });
    }
    /* Vídeos: play, 25/50/75 % y final */
    document.querySelectorAll('video[data-video]').forEach(function (v) {
      var n = v.getAttribute('data-video'), hitos = {};
      v.addEventListener('play', function () { track('video-play', { video: n }); });
      v.addEventListener('ended', function () { track('video-fin', { video: n }); });
      v.addEventListener('timeupdate', function () {
        if (!v.duration) return;
        var p = Math.floor(v.currentTime / v.duration * 4) * 25;
        if (p >= 25 && p < 100 && !hitos[p]) { hitos[p] = 1; track('video-' + p, { video: n }); }
      });
    });
  });
})();
