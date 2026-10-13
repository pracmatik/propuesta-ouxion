/* ══════════════════════════════════════════════════════════════════════
   PANEL DE MUESTRA PARA OUXION · datos 100 % inventados, sin servidor

   Este fichero sustituye a la base de datos real. La aplicación es la misma
   que usa un cliente, pero aquí no hay conexión con ningún servidor: todo lo
   que se ve está inventado y vive en la memoria del navegador. Al recargar
   la página, vuelve al estado inicial.

   Las marcas (NORDA, KORE Sport, SALINA, Banco Aurel, MIRA Óptica), las
   personas, los industriales y los importes son inventados.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* La muestra enseña la obra NORDA en su semana 3: el panel vive siempre en
     el 28/10/2026 a mediodía, para que plazos, vencidas y avance cuadren. */
  const HOY = '2026-10-28';
  (function congelaFecha() {
    const Real = Date;
    const desfase = new Real('2026-10-28T12:30:00+01:00').getTime() - Real.now();
    class DateMuestra extends Real {
      constructor(...a) { if (a.length === 0) super(Real.now() + desfase); else super(...a); }
      static now() { return Real.now() + desfase; }
    }
    window.Date = DateMuestra;
  })();

  const EMPRESA_ID = 'e0000000-0000-4000-8000-000000000001';
  const USER_ID = 'u0000000-0000-4000-8000-000000000001';
  const BASE = location.href.replace(/\/panel\/.*$/, '/');
  const ACTA_URL = BASE + 'acta/';
  const uid = (n) => 'v' + String(n).padStart(7, '0') + '-0000-4000-8000-000000000001';
  const tz = (f) => f >= '2026-10-25' ? '+01:00' : '+02:00';
  const z = (f, h) => new Date(f + 'T' + h + ':00' + tz(f)).toISOString();

  /* ── EMPRESA ──────────────────────────────────────────────────────── */
  const empresas = [{
    id: EMPRESA_ID, nombre: 'Ouxion', cif: '', razon_social: 'Ouxion (muestra)', direccion: '',
    municipio: 'Sabadell', provincia: 'Barcelona', cp: '', pais: 'España', web: '', telefono: '',
    email_contacto: 'obras@ejemplo.test', responsable: 'Marc Puig', sector: 'Retail llave en mano',
    created_at: '2026-09-01T09:00:00Z', notas: 'Datos de muestra.'
  }];

  /* ── USUARIOS ─────────────────────────────────────────────────────── */
  const clientes = [
    { id: 'c1', user_id: USER_ID, email: 'demo@ejemplo.test', nombre: 'Marc Puig', empresa_id: EMPRESA_ID, es_representante: true, cargo: 'Jefe de obra · Ouxion', created_at: '2026-09-01T09:00:00Z' },
    { id: 'c2', user_id: 'u0000000-0000-4000-8000-000000000002', email: 'jefa.obra@ejemplo.test', nombre: 'Anna Vidal', empresa_id: EMPRESA_ID, es_representante: false, cargo: 'Jefa de obra · Ouxion', created_at: '2026-09-01T09:05:00Z' },
    { id: 'c3', user_id: 'u0000000-0000-4000-8000-000000000003', email: 'arquitectura@norda.test', nombre: 'Laia Serra Vidal', empresa_id: null, es_representante: false, cargo: 'Arquitecta · NORDA', created_at: '2026-10-12T10:00:00Z' }
  ];

  /* ── OBRAS ────────────────────────────────────────────────────────── */
  const obra = (id, alias, nombre, direccion, municipio, provincia, cp, promotor, arquitecto, licencia, exp, dia, ini, fin, archivada) => ({
    id, chat_id: -1002000000000 - id, alias_obra: alias, nombre_obra: nombre, direccion, municipio, provincia, cp,
    promotor, arquitecto, num_colegiado: '', colegio_profesional: '', email_arquitecto: 'arquitectura@ejemplo.test',
    num_licencia: licencia, num_expediente: exp, dias_visita: dia, fecha_inicio_obra: ini, fecha_fin_prevista: fin,
    archivada, empresa_id: EMPRESA_ID, drive_folder_id: '', latitud: null, longitud: null
  });
  const obras = [
    obra(201, 'NORDA B-14', 'Tienda NORDA · Vía Augusta Plaza, local B-14', 'Centro Comercial Vía Augusta Plaza, local B-14', 'Barcelona', 'Barcelona', '08017',
      'NORDA · departamento de expansión', 'Laia Serra Vidal', 'Licencia de actividad en trámite', 'OUX-2026-041 · 420 m²', 'Miércoles', '2026-10-12', '2026-11-20', false),
    obra(202, 'KORE Madrid', 'Tienda KORE Sport · Centro Comercial Plaza Almendro, local 0.21', 'Centro Comercial Plaza Almendro, local 0.21', 'Madrid', 'Madrid', '28050',
      'KORE Sport · expansión', 'Pablo Ortega Ruiz', 'Licencia de actividad concedida', 'OUX-2026-038 · 680 m²', 'Jueves', '2026-09-28', '2026-11-13', false),
    obra(203, 'SALINA Palma', 'Tienda SALINA · Centro Comercial Mar de Llevant, local 22', 'Centro Comercial Mar de Llevant, local 22', 'Palma', 'Illes Balears', '07007',
      'SALINA · retail', 'Marta Vich Roig', 'Comunicado de obras presentado', 'OUX-2026-043 · 190 m²', 'Lunes', '2026-10-19', '2026-11-27', false),
    obra(204, 'Aurel Sabadell', 'Oficina Banco Aurel · Sabadell centro', 'Rambla 48, bajos', 'Sabadell', 'Barcelona', '08201',
      'Banco Aurel · inmuebles', 'Jordi Pons Valls', 'Licencia de obras concedida', 'OUX-2026-040 · 310 m²', 'Martes', '2026-10-05', '2026-11-13', false),
    obra(205, 'MIRA Lisboa', 'Tienda MIRA Óptica · Centro Comercial Tejo Plaza, loja 1.08', 'Centro Comercial Tejo Plaza, loja 1.08', 'Lisboa', 'Lisboa', '1990-094',
      'MIRA Óptica · expansão', 'Inês Duarte', 'Licença concedida', 'OUX-2026-033 · 140 m²', 'Miércoles', '2026-08-31', '2026-10-02', true)
  ];
  const CHAT = {}; obras.forEach(o => { CHAT[o.id] = o.chat_id; });

  /* ── ACCESOS (la marca NORDA entra con acceso limitado a su obra) ─── */
  const obra_accesos = obras.map((o, i) => ({ id: 'a' + (i + 1), obra_id: o.id, user_id: USER_ID, rol: 'arquitecto', empresa_id: EMPRESA_ID, created_at: o.fecha_inicio_obra + 'T08:00:00Z' }));
  obra_accesos.push({ id: 'a9', obra_id: 201, user_id: 'u0000000-0000-4000-8000-000000000003', rol: 'promotor', empresa_id: null, created_at: '2026-10-12T10:00:00Z' });

  /* ── INDUSTRIALES (pool fijo de Ouxion) ───────────────────────────── */
  const POOL = {
    obra: ['Marc Puig', 'Constructora · jefe de obra', 'Ouxion'],
    tab: ['Àlex Navarro', 'Tabiquería y techos', 'Pladur Sant Quirze'],
    ele: ['Pau Ribes', 'Electricidad', 'Instal·lacions Ribes'],
    cli: ['Oriol Soler', 'Climatización', 'Clima Vallès'],
    pav: ['David Oller', 'Pavimento', 'Paviments Oller'],
    pin: ['Joan Mora', 'Pintura', 'Pintures Mora'],
    mob: ['Núria Abril', 'Mobiliario', 'Fusteria Abril'],
    esc: ['Sílvia Badia', 'Escaparate', 'Vidres Badia']
  };
  const POR_OBRA = {
    201: ['obra', 'tab', 'ele', 'cli', 'pav', 'pin', 'mob', 'esc'],
    202: ['tab', 'ele', 'cli', 'pin', 'pav'],
    203: ['tab', 'ele', 'pav'],
    204: ['tab', 'ele', 'cli', 'mob', 'esc'],
    205: ['tab', 'ele', 'pin']
  };
  const industriales = [];
  Object.entries(POR_OBRA).forEach(([oid, claves]) => claves.forEach(k => {
    const [nombre, especialidad, Empresa] = POOL[k];
    industriales.push({ id: industriales.length + 1, nombre, especialidad, contacto: k + '@ejemplo.test', estado: true, obra_id: String(oid), Empresa });
  }));
  if (POR_OBRA[202]) { /* en Madrid la obra la lleva Anna Vidal */
    industriales.push({ id: industriales.length + 1, nombre: 'Anna Vidal', especialidad: 'Constructora · jefa de obra', contacto: 'obra@ejemplo.test', estado: true, obra_id: '202', Empresa: 'Ouxion' });
  }

  /* ── VISITAS ──────────────────────────────────────────────────────── */
  const visitas = [];
  const FECHAS = {
    201: ['2026-10-14', '2026-10-21', '2026-10-28'],
    202: ['2026-10-01', '2026-10-08', '2026-10-15', '2026-10-22'],
    203: ['2026-10-19', '2026-10-26'],
    204: ['2026-10-06', '2026-10-13', '2026-10-20', '2026-10-27'],
    205: ['2026-09-02', '2026-09-09', '2026-09-16', '2026-09-23', '2026-09-30']
  };
  const ASIST = {
    201: 'Marc Puig (jefe de obra, Ouxion) · Laia Serra Vidal (arquitecta de NORDA) · Pau Ribes (electricidad) · Oriol Soler (climatización) · Àlex Navarro (tabiquería) · David Oller (pavimento)',
    202: 'Anna Vidal (jefa de obra, Ouxion) · Pablo Ortega Ruiz (arquitecto de KORE Sport) · Àlex Navarro (tabiquería) · Pau Ribes (electricidad)',
    203: 'Marc Puig (jefe de obra, Ouxion) · Marta Vich Roig (arquitecta de SALINA) · Àlex Navarro (tabiquería)',
    204: 'Marc Puig (jefe de obra, Ouxion) · Jordi Pons Valls (inmuebles, Banco Aurel) · Oriol Soler (climatización) · Sílvia Badia (escaparate)',
    205: 'Anna Vidal (jefa de obra, Ouxion) · Inês Duarte (arquitecta de MIRA Óptica) · Àlex Navarro (tabiquería)'
  };
  Object.entries(FECHAS).forEach(([oid, fechas]) => {
    const o = obras.find(x => x.id === Number(oid));
    const exp = o.num_expediente.slice(9, 12);
    fechas.forEach((f, i) => visitas.push({
      visit_id: uid(Number(oid) * 10 + i + 1), chat_id: o.chat_id, status: 'completada', nombre_obra: o.nombre_obra,
      fecha_inicio: f + 'T08:30:00' + tz(f), fecha_fin: f + 'T10:05:00' + tz(f), created_at: f + 'T08:28:00' + tz(f),
      hora_inicio: '08:30', hora_fin: '10:05', num_visita: i + 1, num_acta: exp + '/' + String(i + 1).padStart(2, '0'),
      pdf_url: ACTA_URL, impreso: true, asistentes: ASIST[oid], tiene_archivos: true, nombre_carpeta_visita: null,
      drive_folder_id_visita: '', doc_id_texto: '',
      meteo: { descripcion: 'Interior · centro comercial', temperatura: 21, viento: '' }
    }));
  });
  const V = (oid, n) => uid(oid * 10 + n);

  /* ── TAREAS ───────────────────────────────────────────────────────── */
  let _tid = 0;
  const T = (oid, n, descripcion, responsable, empresa, prioridad, estado, fecha_limite) => {
    const f = FECHAS[oid][n - 1];
    return {
      id: ++_tid, visit_id: V(oid, n), chat_id: CHAT[oid], descripcion, responsable, empresa, prioridad, estado, cargo: null,
      fecha_limite, created_at: z(f, '10:05'), fecha_detectada: z(f, '10:05'), origen_ia: true, comentario: null,
      evidencia_cierre_url: null, completada_at: estado === 'RESUELTO' ? z(f, '18:00') : null,
      completada_por: estado === 'RESUELTO' ? 'Marc Puig' : null, imagenes_ids: []
    };
  };
  const P = 'PENDIENTE', R = 'RESUELTO';
  const actas_tareas = [
    /* — NORDA · visita 3 · 28/10 — la del acta de muestra — */
    T(201, 3, 'Desplazar 12 cm el módulo de las cabinas 3 y 4 según el replanteo aprobado. No cerrar la segunda cara hasta el paso de instalaciones.', 'Àlex Navarro', 'Pladur Sant Quirze', 'ALTA', P, '2026-10-30'),
    T(201, 3, 'Pasar el cableado de iluminación y tomas de los probadores antes del cierre de tabiques.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', P, '2026-10-30'),
    T(201, 3, 'Tender la línea independiente del escaparate con reloj astronómico, según las normas técnicas del centro.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', P, '2026-11-03'),
    T(201, 3, 'Dejar la caja de registro y la toma de la pantalla del escaparate a la cota que indique la marca.', 'Pau Ribes', 'Instal·lacions Ribes', 'MEDIA', P, '2026-11-04'),
    T(201, 3, 'Enviar la solución al cruce del conducto de impulsión con el falso techo en zona de caja antes de ejecutarla.', 'Oriol Soler', 'Clima Vallès', 'ALTA', P, '2026-10-30'),
    T(201, 3, 'Coordinar los registros de la máquina interior con el despiece del falso techo.', 'Oriol Soler', 'Clima Vallès', 'MEDIA', P, '2026-11-04'),
    T(201, 3, 'Aplicar autonivelante en la zona del escaparate antes de colocar el pavimento. Junta de 2 mm en gris perla.', 'David Oller', 'Paviments Oller', 'MEDIA', P, '2026-11-02'),
    T(201, 3, 'Enviar el plano de anclajes del mobiliario mural para situar los refuerzos de tabique.', 'Núria Abril', 'Fusteria Abril', 'ALTA', P, '2026-10-29'),
    T(201, 3, 'Colocar los refuerzos de madera en los tabiques de exposición según el plano de anclajes.', 'Àlex Navarro', 'Pladur Sant Quirze', 'ALTA', P, '2026-11-02'),
    T(201, 3, 'Tomar la medida definitiva del vidrio del escaparate en cuanto esté fijado el perfil oculto.', 'Sílvia Badia', 'Vidres Badia', 'MEDIA', P, '2026-11-05'),
    T(201, 3, 'Confirmar por escrito la entrega del mobiliario el 13 de noviembre y el horario de descarga en el muelle.', 'Laia Serra Vidal', 'NORDA', 'ALTA', P, '2026-10-29'),
    T(201, 3, 'Actualizar la planificación con las demoras imputadas y enviarla a la marca.', 'Marc Puig', 'Ouxion', 'ALTA', P, '2026-10-29'),
    T(201, 3, 'Pedir al centro comercial el permiso de trabajos en caliente para la estructura del rótulo.', 'Marc Puig', 'Ouxion', 'MEDIA', P, '2026-10-30'),
    /* — NORDA · visita 2 · 21/10 — */
    T(201, 2, 'Confirmar por escrito la fecha de entrega del mobiliario de la marca.', 'Laia Serra Vidal', 'NORDA', 'ALTA', R, '2026-10-23'),
    T(201, 2, 'Aportar el justificante de trámite de la licencia de actividad para tenerlo en obra.', 'Marc Puig', 'Ouxion', 'ALTA', P, '2026-10-23'),
    T(201, 2, 'Confirmar la fecha de suministro de los proyectores LED del área de venta.', 'Pau Ribes', 'Instal·lacions Ribes', 'MEDIA', R, '2026-10-26'),
    T(201, 2, 'Aportar la ficha técnica y la muestra del porcelánico para su aprobación por la marca.', 'David Oller', 'Paviments Oller', 'MEDIA', R, '2026-10-27'),
    T(201, 2, 'Terminar el desmontaje del falso techo existente en la zona de almacén.', 'Àlex Navarro', 'Pladur Sant Quirze', 'MEDIA', R, '2026-10-23'),
    /* — NORDA · visita 1 · 14/10 — */
    T(201, 1, 'Montar el cierre provisional hacia el pasillo según las normas del centro comercial.', 'Marc Puig', 'Ouxion', 'ALTA', R, '2026-10-15'),
    T(201, 1, 'Pedir a la marca el plano de probadores acotado.', 'Marc Puig', 'Ouxion', 'MEDIA', R, '2026-10-16'),
    T(201, 1, 'Comprobar la potencia disponible antes de dimensionar el cuadro general.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', R, '2026-10-16'),
    T(201, 1, 'Localizar la acometida del anillo de agua del centro para los fancoils.', 'Oriol Soler', 'Clima Vallès', 'ALTA', R, '2026-10-19'),
    T(201, 1, 'Retirar los escombros por el muelle antes de las 10:00 h.', 'Marc Puig', 'Ouxion', 'MEDIA', R, '2026-10-15'),
    /* — KORE Sport · Madrid — */
    T(202, 4, 'Terminar el falso techo del área de venta antes de la entrada de pintura.', 'Àlex Navarro', 'Pladur Sant Quirze', 'ALTA', P, '2026-10-29'),
    T(202, 4, 'Entregar el certificado de la instalación eléctrica para la inspección del centro.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', P, '2026-11-02'),
    T(202, 4, 'Presentar muestra de color de la pared de calzado para aprobación de la marca.', 'Joan Mora', 'Pintures Mora', 'MEDIA', P, '2026-10-30'),
    T(202, 3, 'Repasar la planeidad del tabique del almacén antes de pintar.', 'Àlex Navarro', 'Pladur Sant Quirze', 'MEDIA', R, '2026-10-20'),
    T(202, 2, 'Equilibrar la impulsión de la zona de probadores.', 'Oriol Soler', 'Clima Vallès', 'MEDIA', R, '2026-10-14'),
    T(202, 1, 'Proteger el pavimento del pasillo del centro durante la descarga.', 'Anna Vidal', 'Ouxion', 'ALTA', R, '2026-10-02'),
    /* — SALINA · Palma — */
    T(203, 2, 'Confirmar el replanteo de la caja con la arquitecta de la marca.', 'Àlex Navarro', 'Pladur Sant Quirze', 'ALTA', P, '2026-10-30'),
    T(203, 2, 'Pedir al centro el horario de carga para el material que llega por barco.', 'Marc Puig', 'Ouxion', 'ALTA', P, '2026-10-29'),
    T(203, 1, 'Medir la solera existente antes de pedir el autonivelante.', 'David Oller', 'Paviments Oller', 'MEDIA', R, '2026-10-22'),
    /* — Banco Aurel · Sabadell — */
    T(204, 4, 'Montar la mampara de vidrio de los despachos según el plano del banco.', 'Sílvia Badia', 'Vidres Badia', 'ALTA', P, '2026-11-03'),
    T(204, 4, 'Dejar previstas las cajas de seguridad para el cableado del cajero.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', P, '2026-10-30'),
    T(204, 3, 'Ajustar la altura del mostrador de atención a la norma de accesibilidad.', 'Núria Abril', 'Fusteria Abril', 'MEDIA', R, '2026-10-23'),
    T(204, 2, 'Sellar el paso de instalaciones entre la oficina y el local vecino.', 'Oriol Soler', 'Clima Vallès', 'MEDIA', R, '2026-10-16'),
    /* — MIRA Óptica · Lisboa (terminada) — */
    T(205, 5, 'Entregar la documentación final de obra a la marca.', 'Anna Vidal', 'Ouxion', 'ALTA', R, '2026-10-02'),
    T(205, 4, 'Repasar la pintura de la fachada interior antes de la apertura.', 'Joan Mora', 'Pintures Mora', 'MEDIA', R, '2026-09-28'),
    T(205, 3, 'Fijar la iluminación de las vitrinas.', 'Pau Ribes', 'Instal·lacions Ribes', 'ALTA', R, '2026-09-21')
  ];

  /* ── BITÁCORA: lo que el jefe de obra manda por Telegram en la visita 3 ── */
  let _bid = 0;
  const B = (n, hora, tipo, campos) => Object.assign({
    id: ++_bid, visit_id: V(201, 3), orden: n, tipo, timestamp: z('2026-10-28', hora), strict_timestamp: z('2026-10-28', hora),
    transcripcion: null, descripcion_ia: null, industrial: null, contenido: null, telegram_caption: null
  }, campos);
  const actas_bitacora = [
    B(1, '08:34', 'audio', { transcripcion: 'Semana tres. Demoliciones y falso techo viejo, fuera. Tabiquería más o menos al sesenta por ciento. La apertura del veinte no se mueve.', descripcion_ia: 'Estado general: demoliciones terminadas, tabiquería al 60 %. Apertura del 20/11 confirmada.' }),
    B(2, '08:41', 'audio', { transcripcion: 'En probadores el pilar cuatro se come unos nueve centímetros de la cabina cuatro. Con Laia lo hemos visto: movemos el módulo de la tres y la cuatro doce centímetros hacia el almacén. Que Àlex no cierre la segunda cara hasta que pase Pau.', descripcion_ia: 'Pilar P-4 invade la cabina 4. Se desplaza 12 cm el módulo de cabinas 3 y 4. No cerrar segunda cara hasta paso de instalaciones.', industrial: 'Àlex Navarro' }),
    B(3, '08:42', 'foto', { descripcion_ia: 'Replanteo de las cabinas 3 y 4 junto al pilar P-4, con el desplazamiento marcado en el suelo.', industrial: 'Àlex Navarro', telegram_caption: 'probadores pilar' }),
    B(4, '08:55', 'audio', { transcripcion: 'Escaparate: el centro pide línea aparte con reloj astronómico y no está en el cuadro. Pau, tiéndela antes de que se cierre el techo ahí. Y falta la caja para la pantalla, la cota la dice la marca.', descripcion_ia: 'Falta línea independiente de escaparate con reloj astronómico exigida por el centro. Falta caja de registro de la pantalla.', industrial: 'Pau Ribes' }),
    B(5, '09:12', 'audio', { transcripcion: 'En caja el conducto de impulsión queda a dos ochenta y cinco y el techo va a dos noventa. No cabe. Oriol que mande solución antes de tocar nada, o conducto más plano o desvío por el almacén.', descripcion_ia: 'Interferencia del conducto de impulsión (2,85 m) con el falso techo (2,90 m) en zona de caja.', industrial: 'Oriol Soler' }),
    B(6, '09:13', 'foto', { descripcion_ia: 'Conducto de impulsión por debajo del plano del falso techo en la zona de caja.', industrial: 'Oriol Soler', telegram_caption: 'conducto caja' }),
    B(7, '09:30', 'foto', { descripcion_ia: 'Muestra de porcelánico 60 × 120 colocada con junta de 2 mm.', industrial: 'David Oller', telegram_caption: 'muestra pavimento ok' }),
    B(8, '09:31', 'texto', { contenido: 'Laia aprueba el porcelánico y la junta gris perla. En escaparate hay 8 mm de desnivel: autonivelante antes de colocar.' }),
    B(9, '09:44', 'audio', { transcripcion: 'Malas noticias del mobiliario: la marca dice que llega el trece, no el nueve. Cuatro días, se imputan a la marca. Montaremos en dos turnos. Núria que mande el plano de anclajes ya para los refuerzos.', descripcion_ia: 'Mobiliario de la marca llega el 13/11 en lugar del 9/11: 4 días imputados a la marca. Montaje en dos turnos.', industrial: 'Núria Abril' }),
    B(10, '09:58', 'texto', { contenido: 'Proyectores LED: el fabricante retrasa dos días. Licencia de actividad: seguimos sin papel, tres días. Próxima visita miércoles 4 a las 8:30.' })
  ];

  /* ── HITOS ────────────────────────────────────────────────────────── */
  let _hid = 0;
  const H = (obra_id, titulo, fecha_prevista, completado) => ({ id: ++_hid, obra_id, titulo, fecha_prevista, completado, orden: _hid });
  const obra_milestones = [
    H(201, 'Cierre de obra y demoliciones', '2026-10-16', true),
    H(201, 'Tabiquería y probadores', '2026-11-02', false),
    H(201, 'Instalaciones de electricidad y clima', '2026-11-04', false),
    H(201, 'Falso techo y pintura', '2026-11-09', false),
    H(201, 'Pavimento', '2026-11-11', false),
    H(201, 'Montaje del mobiliario de la marca y escaparate', '2026-11-18', false),
    H(201, 'Limpieza y entrega a la marca', '2026-11-19', false),
    H(201, 'Apertura de la tienda', '2026-11-20', false),
    H(202, 'Tabiquería y techos', '2026-10-23', true),
    H(202, 'Pintura y pavimento', '2026-11-04', false),
    H(202, 'Apertura de la tienda', '2026-11-13', false),
    H(204, 'Instalaciones y mampara', '2026-11-03', false),
    H(204, 'Entrega al banco', '2026-11-13', false)
  ];

  /* ── PRESUPUESTO POR CAPÍTULOS (los de la obra NORDA salen del presupuesto de muestra) ── */
  const obra_presupuesto = [{"id":1,"obra_id":201,"capitulo":"01 · Trabajos previos y demoliciones","importe_estimado":5074.03,"importe_real":5074.03,"notas":"Terminado."},{"id":2,"obra_id":201,"capitulo":"02 · Tabiquería y techos","importe_estimado":20612.97,"importe_real":12368,"notas":"En curso, al 60 %."},{"id":3,"obra_id":201,"capitulo":"03 · Electricidad e iluminación","importe_estimado":22350.54,"importe_real":null,"notas":""},{"id":4,"obra_id":201,"capitulo":"04 · Climatización","importe_estimado":13901.2,"importe_real":null,"notas":""},{"id":5,"obra_id":201,"capitulo":"05 · Pavimentos","importe_estimado":26818.46,"importe_real":null,"notas":""},{"id":6,"obra_id":201,"capitulo":"06 · Pintura","importe_estimado":6737.36,"importe_real":null,"notas":""},{"id":7,"obra_id":201,"capitulo":"07 · Escaparate y fachada al centro","importe_estimado":1426,"importe_real":null,"notas":"Faltan 2 partidas: precio pedido a Vidres Badia."},{"id":8,"obra_id":201,"capitulo":"08 · Mobiliario y montaje","importe_estimado":5747.7,"importe_real":null,"notas":"Mobiliario a cargo de la marca."},{"id":9,"obra_id":201,"capitulo":"09 · Legalización y varios","importe_estimado":3673.1,"importe_real":null,"notas":""}];
  obra_presupuesto.push(
    { id: 101, obra_id: 202, capitulo: '01 · Tabiquería y techos', importe_estimado: 31840, importe_real: 31840, notas: 'Terminado.' },
    { id: 102, obra_id: 202, capitulo: '02 · Instalaciones', importe_estimado: 48200, importe_real: 39100, notas: 'En curso.' },
    { id: 103, obra_id: 202, capitulo: '03 · Acabados', importe_estimado: 36500, importe_real: null, notas: '' }
  );

  /* ── DIARIO DE OBRA ───────────────────────────────────────────────── */
  const obra_diario = [
    { id: 1, obra_id: 201, fecha: '2026-10-28', autor: 'Marc Puig', contenido: 'Visita 3. Pilar P-4 en probadores: se mueve el módulo 12 cm. Conducto de clima choca con el techo en caja. El mobiliario de la marca llega el 13: montaje en dos turnos. La apertura del 20 se mantiene.' },
    { id: 2, obra_id: 201, fecha: '2026-10-23', autor: 'Marc Puig', contenido: 'Falso techo viejo retirado también en almacén. Empieza la tabiquería de probadores.' },
    { id: 3, obra_id: 201, fecha: '2026-10-21', autor: 'Marc Puig', contenido: 'Visita 2. Sin licencia de actividad todavía: el centro no deja conectar el cuadro definitivo. Se imputa la demora.' },
    { id: 4, obra_id: 201, fecha: '2026-10-14', autor: 'Marc Puig', contenido: 'Visita 1. Cierre de obra montado según normas del centro. Potencia del cuadro confirmada.' },
    { id: 5, obra_id: 201, fecha: '2026-10-12', autor: 'Marc Puig', contenido: 'Entrega del local por el centro comercial. Inicio de obra.' }
  ];

  /* ── DEMORAS IMPUTADAS POR CAUSA ──────────────────────────────────── */
  const obra_demoras = [
    { id: 1, obra_id: 201, dias: 4, categoria: 'promotor', responsable: 'NORDA · mobiliario de la marca', fecha: '2026-10-28', justificacion: 'El proveedor central de la marca entrega el mobiliario el 13 de noviembre en lugar del 9. Para llegar a la apertura, el montaje se hará en dos turnos.', created_by: 'Marc Puig', created_at: z('2026-10-28', '10:10') },
    { id: 2, obra_id: 201, dias: 3, categoria: 'licencias', responsable: 'Ayuntamiento · licencia de actividad', fecha: '2026-10-21', justificacion: 'La licencia de actividad sigue en trámite. Sin ella el centro comercial no autoriza la conexión definitiva del cuadro eléctrico.', created_by: 'Marc Puig', created_at: z('2026-10-21', '10:10') },
    { id: 3, obra_id: 201, dias: 2, categoria: 'suministro', responsable: 'Instal·lacions Ribes · proyectores LED', fecha: '2026-10-28', justificacion: 'El fabricante retrasa dos días la entrega de los 64 proyectores LED del área de venta.', created_by: 'Marc Puig', created_at: z('2026-10-28', '10:12') },
    { id: 4, obra_id: 202, dias: 2, categoria: 'industrial', responsable: 'Pladur Sant Quirze', fecha: '2026-10-22', justificacion: 'Falso techo del área de venta sin terminar en la fecha comprometida.', created_by: 'Anna Vidal', created_at: z('2026-10-22', '10:10') },
    { id: 5, obra_id: 204, dias: 1, categoria: 'promotor', responsable: 'Banco Aurel · inmuebles', fecha: '2026-10-13', justificacion: 'El banco cambió la posición del cajero después del replanteo.', created_by: 'Marc Puig', created_at: z('2026-10-13', '10:10') },
    { id: 6, obra_id: 205, dias: 1, categoria: 'suministro', responsable: 'Proveedor de vitrinas de la marca', fecha: '2026-09-23', justificacion: 'Las vitrinas llegaron un día tarde. Se absorbió sin mover la apertura.', created_by: 'Anna Vidal', created_at: z('2026-09-23', '10:10') }
  ];

  /* ── COLA DE PROCESO (lo que el sistema ha digerido en la visita 3) ── */
  const actas_queue = actas_bitacora.filter(b => b.tipo !== 'texto').map((b, i) => ({
    id: i + 1, visit_id: b.visit_id, chat_id: CHAT[201], tipo_archivo: b.tipo, status: 'DONE', attempts: 1,
    created_at: b.timestamp, processing_started_at: b.timestamp, nombre_archivo: (b.tipo === 'foto' ? 'IMG_' : 'audio_') + String(410 + i).padStart(4, '0') + (b.tipo === 'foto' ? '.jpg' : '.ogg')
  }));

  /* ══════════════════════════════════════════════════════════════════
     BASE DE DATOS EN MEMORIA + EMULADOR DE LA API
     ══════════════════════════════════════════════════════════════════ */
  const DB = {
    obras, visitas, actas_tareas, actas_bitacora, actas_queue,
    clientes, empresas, industriales, obra_accesos,
    obra_milestones, obra_presupuesto, obra_diario, obra_demoras
  };

  const SEQ = {};
  function siguienteId(tabla) {
    if (SEQ[tabla] == null) {
      SEQ[tabla] = DB[tabla].reduce((m, r) => Math.max(m, Number(r.id) || 0), 0);
    }
    return ++SEQ[tabla];
  }

  /* Traduce un filtro PostgREST (eq.5, in.(a,b), not.is.null…) a una prueba */
  function pasaFiltro(valor, expr) {
    if (expr.startsWith('eq.')) return String(valor) === expr.slice(3);
    if (expr.startsWith('neq.')) return String(valor) !== expr.slice(4);
    if (expr.startsWith('gte.')) return valor >= expr.slice(4);
    if (expr.startsWith('lte.')) return valor <= expr.slice(4);
    if (expr.startsWith('gt.')) return valor > expr.slice(3);
    if (expr.startsWith('lt.')) return valor < expr.slice(3);
    if (expr === 'is.null') return valor == null;
    if (expr === 'not.is.null') return valor != null;
    if (expr.startsWith('in.(')) {
      const lista = expr.slice(4, -1).split(',').map(s => s.replace(/^"|"$/g, ''));
      return lista.includes(String(valor));
    }
    if (expr.startsWith('ilike.')) {
      const patron = expr.slice(6).replace(/\*/g, '');
      return String(valor || '').toLowerCase().includes(patron.toLowerCase());
    }
    return true;
  }

  function ordenar(filas, orderExpr) {
    if (!orderExpr) return filas;
    const claves = orderExpr.split(',').reduce((acc, parte) => {
      const t = parte.split('.');
      if (t.length && (t[t.length - 1] === 'nullslast' || t[t.length - 1] === 'nullsfirst')) t.pop();
      if (t[0]) acc.push({ col: t[0], desc: t[1] === 'desc' });
      return acc;
    }, []);
    return filas.slice().sort((a, b) => {
      for (const k of claves) {
        const va = a[k.col], vb = b[k.col];
        if (va == null && vb == null) continue;
        if (va == null) return 1;
        if (vb == null) return -1;
        if (va < vb) return k.desc ? 1 : -1;
        if (va > vb) return k.desc ? -1 : 1;
      }
      return 0;
    });
  }

  const RESERVADOS = new Set(['select', 'order', 'limit', 'offset', 'or', 'and', 'columns', 'on_conflict']);

  function consultar(tabla, params) {
    let filas = (DB[tabla] || []).slice();
    params.forEach((valor, clave) => {
      if (RESERVADOS.has(clave)) return;
      filas = filas.filter(f => pasaFiltro(f[clave], valor));
    });
    /* búsqueda libre: or=(campo.ilike.*texto*,otro.ilike.*texto*) */
    const or = params.get('or');
    if (or) {
      const trozos = or.replace(/^\(|\)$/g, '').split(/,(?=[a-z_]+\.)/);
      filas = filas.filter(f => trozos.some(t => {
        const i = t.indexOf('.');
        return pasaFiltro(f[t.slice(0, i)], t.slice(i + 1));
      }));
    }
    filas = ordenar(filas, params.get('order'));
    const limite = parseInt(params.get('limit'), 10);
    if (limite > 0) filas = filas.slice(0, limite);
    return filas;
  }

  window.DEMO_DB = DB;

  window.DEMO_API = async function (ruta, opciones) {
    opciones = opciones || {};
    const metodo = (opciones.method || 'GET').toUpperCase();
    await new Promise(r => setTimeout(r, 90)); /* latencia realista */

    /* Enlaces firmados de almacenamiento → el acta de ejemplo */
    if (ruta.indexOf('/storage/v1/object/sign') === 0) {
      if (metodo === 'POST') {
        const cuerpo = JSON.parse(opciones.body || '{}');
        return (cuerpo.paths || []).map(p => ({ path: p, signedURL: ACTA_URL }));
      }
      return { signedURL: ACTA_URL };
    }
    if (ruta.indexOf('/functions/v1/') === 0 || ruta.indexOf('/rest/v1/rpc/') === 0) {
      throw new Error('Esta acción está desactivada en la demostración.');
    }

    const m = ruta.match(/^\/rest\/v1\/([a-z_]+)(\?(.*))?$/);
    if (!m) return null;
    const tabla = m[1];
    const params = new URLSearchParams(m[3] || '');
    if (!DB[tabla]) return [];

    if (metodo === 'GET') return consultar(tabla, params);

    if (metodo === 'POST') {
      const cuerpo = JSON.parse(opciones.body || '{}');
      const nuevas = (Array.isArray(cuerpo) ? cuerpo : [cuerpo]).map(r => {
        const fila = Object.assign({ id: siguienteId(tabla), created_at: new Date().toISOString() }, r);
        DB[tabla].push(fila);
        return fila;
      });
      return nuevas;
    }

    if (metodo === 'PATCH') {
      const cambios = JSON.parse(opciones.body || '{}');
      const afectadas = consultar(tabla, params);
      afectadas.forEach(f => Object.assign(f, cambios));
      return afectadas;
    }

    if (metodo === 'DELETE') {
      const afectadas = consultar(tabla, params);
      DB[tabla] = DB[tabla].filter(f => afectadas.indexOf(f) === -1);
      return null;
    }
    return null;
  };

  /* Sesión simulada: el panel arranca ya dentro, sin pedir contraseña */
  window.DEMO_SESION = {
    access_token: 'demo',
    user: {
      id: USER_ID, email: 'demo@ejemplo.test',
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin', nombre: 'Marc Puig' }
    }
  };
})();
