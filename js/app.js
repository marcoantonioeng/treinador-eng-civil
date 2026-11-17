/* Treinador em formato de jogo — Analista Legislativo / Engenharia Civil (Câmara dos Deputados, Cebraspe)
 *
 * Duas camadas sobre o mesmo banco de questões:
 *  - Preparação: progresso por item com repetição espaçada (caixas de Leitner), treino adaptativo pelos temas
 *    mais fracos, caderno de erros, simulados no ritmo de prova, estratégia de chute e discursivas.
 *  - Jogo: cada tema é um prédio e cada fase um andar que vale até 3 estrelas; acertos em sequência multiplicam
 *    os pontos, erros custam capacetes, e tudo rende XP, missões do dia, ofensiva e conquistas.
 * O progresso fica no navegador e, como artifact do claude.ai, na conta de quem joga (capacidade `db`).
 */
(function () {
  'use strict';

  var TEMPO = 60;                 // segundos por item nos treinos
  var SEG_SIMULADO = 90;          // segundos por item no simulado
  var DIA = 864e5;
  var INTERVALOS = [0, 1, 3, 7, 16, 35]; // dias por caixa de Leitner
  var ITENS_PROVA = 120;          // referência para a projeção da nota líquida
  var RAPIDA = 20;                // acerto em menos de RAPIDA s conta como "rápido"
  var XP_CONQUISTA = 200;
  var app = document.getElementById('app');
  var TEMAS = window.TEMAS, QUESTOES = window.QUESTOES, DISC = window.DISCURSIVAS;
  var nomeTema = {}, porId = {};
  TEMAS.forEach(function (t) { nomeTema[t.id] = t.nome; });
  QUESTOES.forEach(function (q) { porId[q.id] = q; });
  var SIGLA = { estruturas: 'EST', fundacoes: 'FUN', materiais: 'MAT', execucao: 'EXE', hidro: 'HID', complementares: 'COM', orcamento: 'ORÇ', manutencao: 'MAN', fiscalizacao: 'FIS', portugues: 'POR', ingles: 'ING', administrativo: 'ADM', constitucional: 'CON', ti: 'TIN' };
  var reduzMov = false;
  try { reduzMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* ignora */ }

  /* ================= utilidades ================= */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function embaralhar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function embaralharSeed(arr, seed) {
    var r = rng(seed), a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function normalizar(s) { return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function fmt(n, casas) { return n.toFixed(casas == null ? 2 : casas).replace('.', ','); }
  function fmtN(n) { try { return Math.round(n).toLocaleString('pt-BR'); } catch (e) { return String(Math.round(n)); } }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function chaveDia(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function rotGab(q) { return q.tipo === 'CE' ? (q.gabarito === 'C' ? 'Certo' : 'Errado') : 'Letra ' + q.gabarito; }
  function mmss(s) { s = Math.max(0, s); return (s >= 3600 ? Math.floor(s / 3600) + ':' : '') + pad(Math.floor((s % 3600) / 60)) + ':' + pad(s % 60); }

  /* ---------------- ícones ---------------- */
  var IC = {
    estrela: '<polygon points="12,2 15,9 22,9.5 16.5,14.5 18.5,22 12,17.8 5.5,22 7.5,14.5 2,9.5 9,9"/>',
    capacete: '<path d="M2 16.5h20V19H2z"/><path d="M4 15.5a8 8 0 0 1 16 0z"/>',
    chama: '<path d="M12.5 2c.6 3.6 5.5 5.6 5.5 11.500a6 6 0 0 1-12 0c0-2.200 1-4 2.400-5.200.1 1.900.9 3.100 2 3.300.6-3.200-.6-6 2.100-9.600z"/>',
    raio: '<polygon points="13,2 4,14 11,14 9,22 20,9 13,9"/>',
    chave: '<path d="M21 7a5 5 0 0 1-6.800 4.700L6.500 19.400a1.800 1.800 0 0 1-2.600-2.600l7.700-7.700A5 5 0 0 1 17.800 2.400L14.500 5.700l.6 3 3 .6 3.300-3.300c.4.300.6.600.6 1z"/>',
    calendario: '<path d="M4 6h16v14H4z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 10h16M8 3v5M16 3v5" stroke="currentColor" stroke-width="2" fill="none"/><rect x="7" y="13" width="4" height="4"/>',
    caneta: '<path d="M3 21l1.200-5.200L15.500 4.500l4 4L8.200 19.800z"/>',
    cadeado: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/>',
    x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
    seta: '<path d="M5 12h13M12 5l7 7-7 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    voltar: '<path d="M19 12H6M12 5l-7 7 7 7" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    medalha: '<circle cx="12" cy="15" r="6"/><path d="M8 2h8l-2 6h-4z"/>',
    check: '<path d="M4 12.5l5 5L20 6.500" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
  };
  function ic(n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + IC[n] + '</svg>'; }
  function estrelinhas(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += ic('estrela', i <= n ? 'on' : '');
    return '<span class="estrelinhas" aria-label="' + n + ' de 3 estrelas">' + s + '</span>';
  }

  /* ---------------- fases: divisão fixa do banco por tema ---------------- */
  var FASES = {};
  var TOTAL_FASES = 0;
  TEMAS.forEach(function (t) {
    var qs = embaralharSeed(QUESTOES.filter(function (q) { return q.tema === t.id; }), hashStr('fases-' + t.id));
    var nF = Math.min(14, Math.max(1, Math.round(qs.length / 5))); // até 14 andares por prédio
    var base = Math.floor(qs.length / nF), resto = qs.length % nF, p = 0, fases = [];
    for (var i = 0; i < nF; i++) { var tam = base + (i < resto ? 1 : 0); fases.push(qs.slice(p, p + tam)); p += tam; }
    FASES[t.id] = fases;
    TOTAL_FASES += nF;
  });

  /* ================= carreira, missões e conquistas ================= */
  var NIVEIS = [
    { xp: 0, nome: 'Estagiário' }, { xp: 1500, nome: 'Engenheiro Trainee' }, { xp: 5000, nome: 'Engenheiro Júnior' },
    { xp: 12000, nome: 'Engenheiro Pleno' }, { xp: 25000, nome: 'Engenheiro Sênior' }, { xp: 45000, nome: 'Fiscal de Contrato' },
    { xp: 75000, nome: 'Coordenador de Obras' }, { xp: 120000, nome: 'Especialista' }, { xp: 180000, nome: 'Aprovado no Concurso' },
    { xp: 260000, nome: 'Analista Legislativo' }
  ];
  function nivelDe(xp) {
    var i = 0;
    for (var k = 0; k < NIVEIS.length; k++) if (xp >= NIVEIS[k].xp) i = k;
    var base = NIVEIS[i].xp, prox = NIVEIS[i + 1] ? NIVEIS[i + 1].xp : null;
    return { i: i, nome: NIVEIS[i].nome, base: base, prox: prox, proxNome: prox ? NIVEIS[i + 1].nome : null, frac: prox ? (xp - base) / (prox - base) : 1 };
  }
  function multDe(n) { return n >= 12 ? 5 : n >= 8 ? 4 : n >= 5 ? 3 : n >= 3 ? 2 : 1; }

  var POOL_MISSOES = [
    { txt: 'Acerte 15 itens', meta: 15, xp: 300, val: function (d) { return d.acertos; } },
    { txt: 'Conclua 2 fases', meta: 2, xp: 300, val: function (d) { return d.fases; } },
    { txt: 'Faça uma sequência de 6 acertos', meta: 6, xp: 300, val: function (d) { return d.comboMax; } },
    { txt: 'Acerte 5 itens em menos de ' + RAPIDA + ' s', meta: 5, xp: 250, val: function (d) { return d.rapidas; } },
    { txt: 'Conclua uma fase com 3 estrelas', meta: 1, xp: 300, val: function (d) { return d.perfeitas; } },
    { txt: 'Complete o Desafio do dia', meta: 1, xp: 200, val: function (d) { return d.desafio ? 1 : 0; } }
  ];
  function missoesDoDia() {
    var meta = P.cfg.meta || 30;
    var fixa = { txt: 'Bata a meta do dia: ' + meta + ' itens', meta: meta, xp: 300, val: function () { var h = P.dias[chaveDia()]; return h ? h.n : 0; } };
    var idx = embaralharSeed([0, 1, 2, 3, 4, 5], hashStr('missoes-' + chaveDia())).slice(0, 2);
    return [fixa].concat(idx.map(function (i) { return POOL_MISSOES[i]; }));
  }
  function temaCompleto(id, min) { return P.jogo.estrelas[id].every(function (e) { return e >= min; }); }
  var CONQ = [
    { id: 'fundamental', nome: 'Pedra fundamental', desc: 'Conclua sua primeira fase', ok: function () { return P.jogo.stats.fases >= 1; } },
    { id: 'prumo', nome: 'Prumo perfeito', desc: 'Conclua uma fase com 3 estrelas', ok: function () { return P.jogo.stats.perfeitas >= 1; } },
    { id: 'combo5', nome: 'Ritmo de obra', desc: 'Sequência de 5 acertos', ok: function () { return P.jogo.stats.comboMax >= 5; } },
    { id: 'combo10', nome: 'Concretagem contínua', desc: 'Sequência de 10 acertos', ok: function () { return P.jogo.stats.comboMax >= 10; } },
    { id: 'combo20', nome: 'Sem junta fria', desc: 'Sequência de 20 acertos', ok: function () { return P.jogo.stats.comboMax >= 20; } },
    { id: 'cert50', nome: 'Diário de obra', desc: '50 itens certos', ok: function () { return totais().cert >= 50; } },
    { id: 'cert200', nome: 'Mestre de obras', desc: '200 itens certos', ok: function () { return totais().cert >= 200; } },
    { id: 'cert500', nome: 'As built', desc: '500 itens certos', ok: function () { return totais().cert >= 500; } },
    { id: 'ofensiva3', nome: 'Desforma', desc: '3 dias seguidos de treino', ok: function () { return P.jogo.melhorOfensiva >= 3; } },
    { id: 'ofensiva7', nome: 'Cura de 7 dias', desc: '7 dias seguidos de treino', ok: function () { return P.jogo.melhorOfensiva >= 7; } },
    { id: 'ofensiva28', nome: 'fck aos 28 dias', desc: '28 dias seguidos de treino', ok: function () { return P.jogo.melhorOfensiva >= 28; } },
    { id: 'habitese', nome: 'Habite-se', desc: 'Conclua todas as fases de um tema', ok: function () { return TEMAS.some(function (t) { return temaCompleto(t.id, 1); }); } },
    { id: 'definitivo', nome: 'Recebimento definitivo', desc: '3 estrelas em todas as fases de um tema', ok: function () { return TEMAS.some(function (t) { return temaCompleto(t.id, 3); }); } },
    { id: 'entregue', nome: 'Obra entregue', desc: 'Conclua todas as fases de todos os temas', ok: function () { return TEMAS.every(function (t) { return temaCompleto(t.id, 1); }); } },
    { id: 'rapidas25', nome: 'Caminho crítico', desc: '25 acertos em menos de ' + RAPIDA + ' s', ok: function () { return P.jogo.stats.rapidas >= 25; } },
    { id: 'reparos10', nome: 'Manutenção corretiva', desc: 'Acerte 10 itens que estavam no caderno de erros', ok: function () { return P.jogo.stats.reparados >= 10; } },
    { id: 'maratona15', nome: 'Turno dobrado', desc: '15 acertos em uma só maratona', ok: function () { return P.jogo.recordeAcertos >= 15; } },
    { id: 'simulado', nome: 'Ensaio de carga', desc: 'Entregue um simulado completo', ok: function () { return P.jogo.stats.simulados >= 1; } },
    { id: 'parecer', nome: 'Parecer técnico', desc: 'Envie uma questão discursiva', ok: function () { return P.disc.length >= 1; } },
    { id: 'ponto', nome: 'Ponto batido', desc: 'Complete um Desafio do dia', ok: function () { return P.jogo.stats.desafios >= 1; } }
  ];

  /* ================= progresso persistente ================= */
  function num(v) { return typeof v === 'number' && isFinite(v) && v > 0 ? v : 0; }
  function novoDiaJogo(d) { return { data: d, acertos: 0, fases: 0, perfeitas: 0, comboMax: 0, rapidas: 0, desafio: null, pagas: [false, false, false] }; }
  function novoJogo() {
    var e = {};
    TEMAS.forEach(function (t) { e[t.id] = FASES[t.id].map(function () { return 0; }); });
    return { xp: 0, estrelas: e, recorde: 0, recordeAcertos: 0, melhorOfensiva: 0,
      stats: { rapidas: 0, comboMax: 0, fases: 0, perfeitas: 0, reparados: 0, desafios: 0, simulados: 0 },
      dia: novoDiaJogo(''), conquistas: {}, ultimoTema: null };
  }
  function sanearJogo(o) {
    var j = novoJogo();
    if (!o || typeof o !== 'object') return j;
    j.xp = Math.round(num(o.xp)); j.recorde = num(o.recorde); j.recordeAcertos = num(o.recordeAcertos); j.melhorOfensiva = num(o.melhorOfensiva);
    TEMAS.forEach(function (t) {
      var src = o.estrelas && o.estrelas[t.id];
      if (Array.isArray(src)) j.estrelas[t.id] = j.estrelas[t.id].map(function (_, i) { return Math.min(3, Math.round(num(src[i]))); });
    });
    if (o.stats) Object.keys(j.stats).forEach(function (k) { j.stats[k] = num(o.stats[k]); });
    if (o.dia && typeof o.dia.data === 'string') {
      var d = novoDiaJogo(o.dia.data);
      ['acertos', 'fases', 'perfeitas', 'comboMax', 'rapidas'].forEach(function (k) { d[k] = num(o.dia[k]); });
      if (o.dia.desafio && typeof o.dia.desafio === 'object') d.desafio = { acertos: num(o.dia.desafio.acertos), pontos: num(o.dia.desafio.pontos) };
      if (Array.isArray(o.dia.pagas)) d.pagas = [!!o.dia.pagas[0], !!o.dia.pagas[1], !!o.dia.pagas[2]];
      j.dia = d;
    }
    if (o.conquistas && typeof o.conquistas === 'object') CONQ.forEach(function (c) { if (o.conquistas[c.id]) j.conquistas[c.id] = String(o.conquistas[c.id]); });
    if (typeof o.ultimoTema === 'string' && nomeTema[o.ultimoTema]) j.ultimoTema = o.ultimoTema;
    return j;
  }
  // O formato (v: 1) é o mesmo da versão anterior do treinador; o jogo entra como um campo a mais.
  function novoProgresso() {
    return { v: 1, itens: {}, dias: {}, log: [], simulados: [], disc: [],
      cfg: { audio: true, lerJust: true, dataProva: '', meta: 30 }, jogo: novoJogo(), atualizado: 0 };
  }
  function normalizarP(p) {
    var base = novoProgresso();
    if (!p || p.v !== 1) return base;
    Object.keys(base).forEach(function (k) { if (p[k] == null) p[k] = base[k]; });
    Object.keys(base.cfg).forEach(function (k) { if (p.cfg[k] == null) p.cfg[k] = base.cfg[k]; });
    p.jogo = sanearJogo(p.jogo);
    return p;
  }
  function lerLocal() {
    try {
      var p = JSON.parse(localStorage.getItem('treinador-prog') || 'null');
      if (p) return normalizarP(p);
      var antigo = JSON.parse(localStorage.getItem('treinador-cfg') || 'null');
      var n = novoProgresso();
      if (antigo) { n.cfg.audio = !!antigo.audio; n.cfg.lerJust = !!antigo.lerJust; }
      return n;
    } catch (e) { return novoProgresso(); }
  }
  var P = lerLocal();
  var armaz = { modo: 'local', ref: null, gravando: false, pendente: false, timer: null, aviso: '' };

  function salvar() {
    P.atualizado = Date.now();
    try { localStorage.setItem('treinador-prog', JSON.stringify(P)); } catch (e) { /* sem armazenamento local */ }
    if (!armaz.ref) return;
    clearTimeout(armaz.timer);
    armaz.timer = setTimeout(enviar, 1500);
  }
  function enviar() {
    armaz.timer = null;
    if (!armaz.ref) return;
    if (armaz.gravando) { armaz.pendente = true; return; }
    armaz.gravando = true;
    armaz.ref.set(JSON.parse(JSON.stringify(P))).then(function () {
      armaz.aviso = '';
    }, function (e) {
      if (e && (e.code === 'invalid_argument' || e.code === 'revoked' || e.code === 'not_granted')) {
        armaz.ref = null; armaz.modo = 'local';
        armaz.aviso = 'Não foi possível salvar na conta; o progresso fica neste navegador.';
      }
    }).then(function () {
      armaz.gravando = false;
      if (armaz.pendente) { armaz.pendente = false; enviar(); }
      atualizarSync();
    });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && armaz.ref && armaz.timer) { clearTimeout(armaz.timer); armaz.timer = null; enviar(); }
  });
  function conectarConta() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    Promise.all([window.claude.use('db'), window.claude.use('user')]).then(function (r) {
      var db = r[0], user = r[1];
      if (!db || !user) return null;
      return user.id().then(function (id) {
        if (!id) return null;
        var ref = db.doc('data/users/' + id + '/progresso');
        var limite = new Promise(function (res) { setTimeout(function () { res('tempo'); }, 10000); });
        return Promise.race([ref.get(), limite]).then(function (snap) {
          if (snap === 'tempo') { armaz.aviso = 'Conta sem resposta; o progresso fica neste navegador por enquanto.'; atualizarSync(); return null; }
          armaz.ref = ref; armaz.modo = 'conta';
          var remoto = snap.exists ? normalizarP(JSON.parse(JSON.stringify(snap.data()))) : null;
          if (remoto && (remoto.atualizado || 0) > (P.atualizado || 0)) {
            if (sessao) { armaz.remotoPendente = remoto; }   // não troca o progresso no meio de uma partida
            else { adotar(remoto); reabrirTela(); }
          } else if (P.atualizado || !remoto) {
            if (P.atualizado) enviar();
          }
          atualizarSync();
        });
      });
    }).catch(function () { /* segue só com o navegador */ });
  }
  function adotar(remoto) {
    P = remoto;
    try { localStorage.setItem('treinador-prog', JSON.stringify(P)); } catch (e) { /* ignora */ }
  }
  function textoSync() {
    if (armaz.aviso) return armaz.aviso;
    return armaz.modo === 'conta' ? 'Progresso salvo na sua conta' : 'Progresso salvo neste navegador';
  }
  function atualizarSync() {
    var el = document.getElementById('sync');
    if (el) { el.textContent = textoSync(); el.className = 'sync' + (armaz.modo === 'conta' && !armaz.aviso ? ' conta' : ''); }
  }

  var timer = null, relogioDisc = null;
  function pararTimers() {
    if (timer) { clearInterval(timer); timer = null; }
    if (relogioDisc) { clearInterval(relogioDisc); relogioDisc = null; }
  }

  /* ================= estatísticas ================= */
  function statItem(id) { return P.itens[id] || null; }
  function vencidos(lista) {
    var agora = Date.now();
    return (lista || QUESTOES).filter(function (q) { var it = P.itens[q.id]; return it && it.prox <= agora; });
  }
  function cadernoErros() {
    return QUESTOES.filter(function (q) { var it = P.itens[q.id]; return it && it.ult !== 'C'; });
  }
  function totais() {
    var c = 0, r = 0;
    Object.keys(P.itens).forEach(function (id) { var it = P.itens[id]; c += it.c; r += it.c + it.e + it.b; });
    return { cert: c, resp: r };
  }
  function statTema(tid) {
    var lista = QUESTOES.filter(function (q) { return q.tema === tid; });
    var s = { total: lista.length, vistos: 0, c: 0, e: 0, b: 0, caixas: 0, vencidos: 0 };
    var agora = Date.now();
    lista.forEach(function (q) {
      var it = P.itens[q.id];
      if (!it) return;
      s.vistos++; s.c += it.c; s.e += it.e; s.b += it.b; s.caixas += it.box;
      if (it.prox <= agora) s.vencidos++;
    });
    s.resp = s.c + s.e + s.b;
    s.acerto = pct(s.c, s.resp);
    s.dominio = pct(s.caixas, s.total * 3); // caixa 3 (revisão a cada 7 dias) = item consolidado
    if (s.dominio > 100) s.dominio = 100;
    s.fraqueza = 1 - (s.c + 1) / (s.resp + 2);
    if (!s.vistos) s.estado = ['novo', 'Não iniciado'];
    else if (s.resp >= 3 && s.acerto < 50) s.estado = ['critico', 'Crítico'];
    else if (s.acerto < 70) s.estado = ['atencao', 'Atenção'];
    else if (s.dominio >= 70) s.estado = ['dominado', 'Dominado'];
    else s.estado = ['bom', 'Em progresso'];
    return s;
  }
  function sequencia() {
    var n = 0, d = new Date();
    if (!P.dias[chaveDia(d)]) d.setDate(d.getDate() - 1);
    while (P.dias[chaveDia(d)] && P.dias[chaveDia(d)].n > 0) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function analiseChute() {
    // log: [id, resultado, certeza(1/0), timestamp] — só itens Certo/Errado
    var ce = P.log.filter(function (l) { var q = porId[l[0]]; return q && q.tipo === 'CE'; }).slice(-150);
    var r = { n: ce.length, liq: 0, certC: 0, certE: 0, chuC: 0, chuE: 0, brancos: 0 };
    ce.forEach(function (l) {
      if (l[1] === 'B') { r.brancos++; return; }
      if (l[2]) { if (l[1] === 'C') r.certC++; else r.certE++; }
      else { if (l[1] === 'C') r.chuC++; else r.chuE++; }
    });
    r.liq = r.certC + r.chuC - r.certE - r.chuE;
    r.liqSemChute = r.certC - r.certE;
    r.chutes = r.chuC + r.chuE;
    r.projecao = r.n ? Math.round((r.liq / r.n) * ITENS_PROVA) : null;
    r.projecaoSemChute = r.n ? Math.round((r.liqSemChute / r.n) * ITENS_PROVA) : null;
    return r;
  }
  function diasParaProva() {
    if (!P.cfg.dataProva) return null;
    var alvo = new Date(P.cfg.dataProva + 'T00:00:00');
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    return Math.round((alvo - hoje) / DIA);
  }

  /* ================= registro de respostas (repetição espaçada) ================= */
  function registrar(q, resultado, certeza) {
    var it = P.itens[q.id] || { n: 0, c: 0, e: 0, b: 0, box: 0, prox: 0, ult: '' };
    it.n++;
    if (resultado === 'C') it.c++; else if (resultado === 'E') it.e++; else it.b++;
    if (resultado === 'C') it.box = certeza ? Math.min(5, it.box + 1) : Math.max(1, it.box);
    else if (resultado === 'E') it.box = 0;
    else it.box = Math.max(0, it.box - 1);
    it.prox = Date.now() + (resultado === 'C' ? INTERVALOS[it.box] * DIA : 0);
    it.ult = resultado;
    P.itens[q.id] = it;
    var k = chaveDia();
    var d = P.dias[k] || { n: 0, c: 0, e: 0 };
    d.n++; if (resultado === 'C') d.c++; else if (resultado === 'E') d.e++;
    P.dias[k] = d;
    P.log.push([q.id, resultado, certeza ? 1 : 0, Date.now()]);
    if (P.log.length > 400) P.log = P.log.slice(-400);
    var chaves = Object.keys(P.dias).sort();
    if (chaves.length > 120) chaves.slice(0, chaves.length - 120).forEach(function (c) { delete P.dias[c]; });
    // ofensiva: o primeiro item do dia mantém a sequência de dias
    var of = sequencia();
    if (of > P.jogo.melhorOfensiva) P.jogo.melhorOfensiva = of;
    if (d.n === 1) avisar('chama', 'Ofensiva: ' + of + (of === 1 ? ' dia' : ' dias seguidos'));
    return it;
  }
  function textoAgenda(it, resultado) {
    if (resultado !== 'C') return 'Item enviado ao <b>caderno de erros</b>: volta na próxima revisão.';
    var d = INTERVALOS[it.box];
    return 'Caixa <b>' + it.box + ' de 5</b> · próxima revisão em <b>' + d + (d === 1 ? ' dia' : ' dias') + '</b>.';
  }

  /* ================= montagem das filas ================= */
  function filaInteligente(n, tema) {
    var pool = QUESTOES.filter(function (q) { return !tema || q.tema === tema; });
    var peso = {};
    TEMAS.forEach(function (t) { peso[t.id] = statTema(t.id).fraqueza; });
    var usados = {};
    var fila = [];
    function add(q) { if (!usados[q.id] && fila.length < n) { usados[q.id] = 1; fila.push(q); } }
    var venc = vencidos(pool).sort(function (a, b) {
      var A = P.itens[a.id], B = P.itens[b.id];
      return (A.box - B.box) || (A.prox - B.prox);
    });
    venc.slice(0, Math.ceil(n * 0.45)).forEach(add);
    var novas = pool.filter(function (q) { return !P.itens[q.id]; })
      .map(function (q) { return { q: q, k: Math.random() * (0.35 + peso[q.tema]) }; })
      .sort(function (a, b) { return b.k - a.k; }).map(function (x) { return x.q; });
    novas.forEach(add);
    venc.forEach(add);
    pool.slice().sort(function (a, b) {
      var A = P.itens[a.id] || { box: 0, prox: 0 }, B = P.itens[b.id] || { box: 0, prox: 0 };
      return (A.box - B.box) || (A.prox - B.prox);
    }).forEach(add);
    return embaralhar(fila);
  }

  /* ================= áudio: voz + efeitos ================= */
  var ctxAudio = null, vozPt = null, ttsCap = null, ttsRecusado = false;
  function escolherVoz() {
    if (!('speechSynthesis' in window)) return;
    var vozes = window.speechSynthesis.getVoices() || [];
    vozPt = vozes.filter(function (v) { return /^pt(-|_)BR/i.test(v.lang); })[0] ||
            vozes.filter(function (v) { return /^pt/i.test(v.lang); })[0] || null;
  }
  if ('speechSynthesis' in window) { escolherVoz(); window.speechSynthesis.onvoiceschanged = escolherVoz; }
  if (window.claude && typeof window.claude.use === 'function') {
    window.claude.use('tts').then(function (t) { ttsCap = t || null; }).catch(function () { ttsCap = null; });
  }
  function falarNavegador(texto) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = 'pt-BR'; if (vozPt) u.voice = vozPt; u.rate = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* sem síntese de voz */ }
  }
  function falar(texto) {
    if (!P.cfg.audio || ttsRecusado) return;
    if (ttsCap) {
      ttsCap.speak(String(texto).slice(0, 1990), { language: 'pt-BR', rate: 1.1 }).catch(function (e) {
        var c = e && e.code;
        if (c === 'not_granted') { ttsRecusado = true; return; }      // a pessoa desligou a leitura: respeitar
        if (c === 'rate_limited' || c === 'unavailable' || c === 'upstream_error') falarNavegador(texto);
      });
      return;
    }
    falarNavegador(texto);
  }
  function calarVoz() {
    try { if (ttsCap) ttsCap.stop().catch(function () { /* ignora */ }); } catch (e) { /* ignora */ }
    try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) { /* ignora */ }
  }
  function iniciarAudio() {
    if (ctxAudio) { try { if (ctxAudio.state === 'suspended') ctxAudio.resume(); } catch (e) { /* ignora */ } return; }
    try { var C = window.AudioContext || window.webkitAudioContext; if (C) ctxAudio = new C(); } catch (e) { ctxAudio = null; }
  }
  function tom(freqs, dur, tipo, vol, atraso) {
    if (!P.cfg.audio || !ctxAudio) return;
    try {
      var t0 = ctxAudio.currentTime + (atraso || 0);
      freqs.forEach(function (f, i) {
        var o = ctxAudio.createOscillator(), g = ctxAudio.createGain();
        o.type = tipo || 'sine'; o.frequency.value = f;
        var ini = t0 + i * dur;
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(vol || 0.18, ini + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ini + dur * 1.5);
        o.connect(g); g.connect(ctxAudio.destination);
        o.start(ini); o.stop(ini + dur * 1.5 + 0.03);
      });
    } catch (e) { /* ignora */ }
  }
  var ESCALA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24]; // pentatônica: cada acerto seguido sobe um degrau
  function somAcerto(n) {
    var f = 523.25 * Math.pow(2, ESCALA[Math.min(ESCALA.length - 1, Math.max(0, n - 1))] / 12);
    tom([f, f * 1.5], 0.11, 'triangle', 0.2);
  }
  function somErro() { tom([196, 147], 0.2, 'sawtooth', 0.1); }
  function somTick() { tom([880], 0.05, 'sine', 0.12); }
  function somEstrela(i) { tom([784 * Math.pow(2, (i * 4) / 12)], 0.16, 'triangle', 0.22, 0.05 + i * 0.35); }
  function somFanfarra() { tom([523, 659, 784, 1047, 1319], 0.1, 'triangle', 0.2); }
  function somAviso() { tom([988, 1319], 0.09, 'sine', 0.14); }
  function vibrar(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* ignora */ } }

  /* ================= avisos e confete ================= */
  var semToast = false;
  function limparToasts() { var cx = document.getElementById('toasts'); if (cx) cx.innerHTML = ''; }
  function avisar(icone, txt, extra) {
    var cx = document.getElementById('toasts');
    if (sessao) sessao.eventos.push({ icone: icone, txt: txt, extra: extra || '' });
    if (!cx || semToast) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = ic(icone) + '<span>' + esc(txt) + '</span>' + (extra ? '<small>' + esc(extra) + '</small>' : '');
    cx.appendChild(el);
    while (cx.children.length > 3) cx.removeChild(cx.firstChild);
    somAviso();
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 3400);
  }
  function confete() {
    var c = document.getElementById('confete');
    if (reduzMov || !c || !c.getContext) return;
    var ctx = c.getContext('2d');
    var W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    var cs = getComputedStyle(document.documentElement);
    var cores = ['--ouro', '--azul', '--laranja', '--certo', '--tinta'].map(function (v) { return cs.getPropertyValue(v).trim() || '#f2b51d'; });
    var ps = [];
    for (var i = 0; i < 110; i++) ps.push({ x: W / 2 + (Math.random() - 0.5) * W * 0.5, y: H * 0.32, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 12 - 3, r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - 0.5) * 0.4, c: cores[i % cores.length] });
    var t0 = null;
    function quadro(t) {
      if (!t0) t0 = t;
      var dt = t - t0;
      ctx.clearRect(0, 0, W, H);
      if (dt > 2400) return;
      ps.forEach(function (p) {
        p.vy += 0.32; p.x += p.vx; p.y += p.vy; p.a += p.va;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.globalAlpha = Math.max(0, 1 - dt / 2400);
        ctx.fillStyle = p.c; ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        ctx.restore();
      });
      requestAnimationFrame(quadro);
    }
    requestAnimationFrame(quadro);
  }

  /* ================= regras do jogo: XP, missões, conquistas ================= */
  var sessao = null, combo = 0, tela = 'inicio', temaAberto = null, confirmarApagar = false;
  function rolarDia() { if (P.jogo.dia.data !== chaveDia()) P.jogo.dia = novoDiaJogo(chaveDia()); }
  function ganharXP(n, rotulo) {
    n = Math.round(n);
    if (n <= 0) return;
    var antes = nivelDe(P.jogo.xp).i;
    P.jogo.xp += n;
    if (sessao) sessao.ganhos[rotulo] = (sessao.ganhos[rotulo] || 0) + n;
    var depois = nivelDe(P.jogo.xp);
    if (depois.i > antes) {
      if (sessao) sessao.promocao = depois.nome;
      avisar('medalha', 'Promoção: ' + depois.nome);
    }
  }
  function checarMissoes() {
    missoesDoDia().forEach(function (m, i) {
      if (!P.jogo.dia.pagas[i] && m.val(P.jogo.dia) >= m.meta) {
        P.jogo.dia.pagas[i] = true;
        ganharXP(m.xp, 'Missões do dia');
        avisar('check', 'Missão cumprida: ' + m.txt, '+' + m.xp + ' XP');
      }
    });
  }
  function checarConquistas() {
    CONQ.forEach(function (c) {
      if (!P.jogo.conquistas[c.id] && c.ok()) {
        P.jogo.conquistas[c.id] = chaveDia();
        ganharXP(XP_CONQUISTA, 'Conquistas');
        avisar('medalha', 'Conquista: ' + c.nome, '+' + XP_CONQUISTA + ' XP');
      }
    });
  }
  function fecharRodada() { checarMissoes(); checarConquistas(); salvar(); }
  function reabrirTela() {
    if (tela === 'tema' && temaAberto) telaTema(temaAberto);
    else if (tela === 'painel') telaPainel();
    else if (tela === 'conquistas') telaConquistas();
    else telaInicio();
  }

  /* ---------------- figuras das questões ---------------- */
  function figPortico() {
    var q = '';
    for (var x = 50; x <= 200; x += 25) q += '<line x1="' + x + '" y1="26" x2="' + x + '" y2="54" stroke="currentColor" stroke-width="1.4" marker-end="url(#seta)"/>';
    return '<svg viewBox="0 0 330 270" width="330" role="img" aria-label="Pórtico: barra horizontal AC de comprimento 2a com carga q, montante vertical de altura 2a até B, força P horizontal a meia altura">' +
      '<defs><marker id="seta" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
      '<line x1="44" y1="26" x2="200" y2="26" stroke="currentColor" stroke-width="1"/>' + q +
      '<text x="120" y="18" font-size="13" text-anchor="middle">q</text>' +
      '<path d="M40,60 H200 V220" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M200,140 H232" fill="none" stroke="currentColor" stroke-width="3"/>' +
      '<line x1="290" y1="140" x2="236" y2="140" stroke="currentColor" stroke-width="1.6" marker-end="url(#seta)"/>' +
      '<text x="296" y="145" font-size="14">P</text>' +
      '<line x1="30" y1="44" x2="30" y2="76" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M30,48 l-8,8 M30,58 l-8,8 M30,68 l-8,8" stroke="currentColor" stroke-width="1"/>' +
      '<circle cx="40" cy="60" r="4" fill="var(--folha)" stroke="currentColor" stroke-width="1.6"/>' +
      '<line x1="30" y1="60" x2="36" y2="60" stroke="currentColor" stroke-width="1.6"/>' +
      '<text x="36" y="44" font-size="14">A</text>' +
      '<circle cx="120" cy="60" r="3.5" fill="currentColor"/><text x="116" y="80" font-size="14">C</text>' +
      '<circle cx="200" cy="185" r="3.5" fill="currentColor"/><text x="208" y="190" font-size="14">D</text>' +
      '<path d="M200,220 l-11,18 h22 z" fill="var(--folha)" stroke="currentColor" stroke-width="1.6"/>' +
      '<circle cx="193" cy="242" r="3" fill="none" stroke="currentColor"/><circle cx="207" cy="242" r="3" fill="none" stroke="currentColor"/>' +
      '<line x1="182" y1="247" x2="218" y2="247" stroke="currentColor" stroke-width="1.6"/>' +
      '<text x="224" y="236" font-size="14">B</text>' +
      '<line x1="40" y1="96" x2="200" y2="96" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 3"/>' +
      '<text x="120" y="110" font-size="12" text-anchor="middle">2a</text>' +
      '<line x1="262" y1="60" x2="262" y2="220" stroke="currentColor" stroke-width=".8" stroke-dasharray="3 3"/>' +
      '<text x="268" y="104" font-size="12">a</text><text x="268" y="184" font-size="12">a</text>' +
      '<line x1="256" y1="140" x2="268" y2="140" stroke="currentColor" stroke-width=".8"/>' +
      '</svg>';
  }
  function curva(x0, largura, y0, escala, fn) {
    var d = '';
    for (var i = 0; i <= 40; i++) { var s = i / 40; d += (i ? ' L' : 'M') + (x0 + s * largura).toFixed(1) + ',' + (y0 + fn(s) * escala).toFixed(1); }
    return d;
  }
  function figVigas() {
    var setas = function (x0) {
      var s = '';
      for (var i = 0; i <= 5; i++) { var x = x0 + i * 36; s += '<line x1="' + x + '" y1="22" x2="' + x + '" y2="46" stroke="currentColor" stroke-width="1.3" marker-end="url(#seta2)"/>'; }
      return '<line x1="' + x0 + '" y1="22" x2="' + (x0 + 180) + '" y2="22" stroke="currentColor"/>' + s + '<text x="' + (x0 + 90) + '" y="15" font-size="12" text-anchor="middle">p</text>';
    };
    var engaste = function (x, lado) {
      var s = '<line x1="' + x + '" y1="38" x2="' + x + '" y2="66" stroke="currentColor" stroke-width="2"/>';
      for (var k = 0; k < 4; k++) s += '<line x1="' + x + '" y1="' + (40 + k * 7) + '" x2="' + (x + 7 * lado) + '" y2="' + (46 + k * 7) + '" stroke="currentColor"/>';
      return s;
    };
    var esc1 = 400, base = 150;
    var m1 = function (s) { return 0.375 * s - 0.5 * s * s; };
    var m2 = function (s) { return 0.5 * s - 0.5 * s * s - 1 / 12; };
    var aX = 470 - 0.2113 * 180;
    return '<svg viewBox="0 0 500 220" width="500" role="img" aria-label="Viga apoiada-engastada e viga biengastada sob carga uniforme p, com diagramas de momento fletor">' +
      '<defs><marker id="seta2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
      setas(30) + '<line x1="30" y1="52" x2="210" y2="52" stroke="currentColor" stroke-width="3"/>' +
      '<path d="M30,54 l-8,13 h16 z" fill="var(--folha)" stroke="currentColor" stroke-width="1.4"/>' + engaste(210, 1) +
      '<text x="120" y="84" font-size="12" text-anchor="middle">L</text>' +
      setas(290) + '<line x1="290" y1="52" x2="470" y2="52" stroke="currentColor" stroke-width="3"/>' + engaste(290, -1) + engaste(470, 1) +
      '<text x="380" y="84" font-size="12" text-anchor="middle">L</text>' +
      '<line x1="30" y1="' + base + '" x2="210" y2="' + base + '" stroke="currentColor" stroke-width=".8"/>' +
      '<path d="' + curva(30, 180, base, esc1, m1) + '" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<line x1="290" y1="' + base + '" x2="470" y2="' + base + '" stroke="currentColor" stroke-width=".8"/>' +
      '<path d="' + curva(290, 180, base, esc1, m2) + '" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<text x="94" y="196" font-size="12">M1</text><line x1="97" y1="184" x2="97" y2="' + (base + 26) + '" stroke="currentColor" stroke-width=".6"/>' +
      '<text x="214" y="100" font-size="12">M2</text><text x="262" y="112" font-size="12">M3</text><text x="372" y="190" font-size="12">M4</text>' +
      '<line x1="' + aX.toFixed(1) + '" y1="' + (base + 12) + '" x2="470" y2="' + (base + 12) + '" stroke="currentColor" stroke-width=".8"/>' +
      '<line x1="' + aX.toFixed(1) + '" y1="' + (base + 6) + '" x2="' + aX.toFixed(1) + '" y2="' + (base + 18) + '" stroke="currentColor" stroke-width=".8"/>' +
      '<text x="' + (aX + 12).toFixed(1) + '" y="' + (base + 28) + '" font-size="12">a</text>' +
      '<text x="250" y="214" font-size="10.5" text-anchor="middle">diagramas com momentos positivos para baixo</text></svg>';
  }
  function figRede() {
    var n = { i1: [30, 40], i2: [30, 130], X: [150, 130], Y: [200, 40], Z: [300, 40], V: [270, 130], W: [380, 130], F: [470, 130] };
    var arco = function (a, b, rot, dx, dy) {
      var p = n[a], q = n[b];
      var mx = (p[0] + q[0]) / 2 + (dx || 0), my = (p[1] + q[1]) / 2 + (dy || -8);
      return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" stroke="currentColor" stroke-width="1.5" marker-end="url(#seta3)"/>' +
        '<text x="' + mx + '" y="' + my + '" font-size="12" text-anchor="middle">' + rot + '</text>';
    };
    var nos = '';
    Object.keys(n).forEach(function (k) { nos += '<circle cx="' + n[k][0] + '" cy="' + n[k][1] + '" r="7" fill="var(--folha)" stroke="currentColor" stroke-width="1.5"/>'; });
    return '<svg viewBox="0 0 500 170" width="500" role="img" aria-label="Rede de atividades a1 a a8 com durações em meses">' +
      '<defs><marker id="seta3" viewBox="0 0 10 10" refX="17" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>' +
      arco('i1', 'X', 'a1 ; t=4', 14, -14) + arco('i2', 'X', 'a2 ; t=8', 0, 22) + arco('X', 'Y', 'a3 ; t=6', -34, 4) +
      arco('Y', 'Z', 'a4 ; t=2', 0, -10) + arco('Z', 'W', 'a5 ; t=6', 38, 0) + arco('X', 'V', 'a6 ; t=4', 0, 22) +
      arco('V', 'W', 'a7 ; t=6', 0, 22) + arco('W', 'F', 'a8 ; t=2', 0, 22) + nos + '</svg>';
  }
  function figura(nome) { return nome === 'portico' ? figPortico() : nome === 'vigas' ? figVigas() : nome === 'rede' ? figRede() : ''; }

  /* ================= canteiro: um prédio por tema ================= */
  function proxFase(tema) { return P.jogo.estrelas[tema].indexOf(0); } // -1 = todas concluídas
  function estrelasTotais() { var s = 0; TEMAS.forEach(function (t) { P.jogo.estrelas[t.id].forEach(function (e) { s += e; }); }); return s; }
  function skyline() {
    var col = 40, andarH = 14, lacuna = 16, maxAndares = 10, s = '';
    TEMAS.forEach(function (t) { maxAndares = Math.max(maxAndares, P.jogo.estrelas[t.id].length); });
    var W = TEMAS.length * col + 8 + lacuna, base = maxAndares * andarH + 22, H = base + 18;
    TEMAS.forEach(function (t, i) {
      var est = P.jogo.estrelas[t.id], n = est.length, larg = 26 + (i % 3) * 3, cx = 4 + i * col + col / 2 + (t.grupo === 'basico' ? lacuna : 0), x = cx - larg / 2, prox = proxFase(t.id);
      var feitas = est.filter(function (e) { return e > 0; }).length, g = '';
      for (var f = 0; f < n; f++) {
        var y = base - (f + 1) * andarH;
        var cls = est[f] === 3 ? 'a3' : est[f] > 0 ? 'a1' : (f === prox ? 'a0 prox' : 'a0');
        g += '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + larg + '" height="' + (andarH - 2) + '"/>';
        if (est[f] > 0) for (var k = 0; k < 3; k++) g += '<rect class="jan' + (est[f] === 3 ? ' acesa' : '') + '" x="' + (x + 4 + k * (larg - 13) / 2).toFixed(1) + '" y="' + (y + 3.5) + '" width="5" height="5"/>';
      }
      if (prox < 0) g += '<polygon class="topo" transform="translate(' + (cx - 7) + ',' + (base - n * andarH - 16) + ') scale(.58)" points="12,2 15,9 22,9.5 16.5,14.5 18.5,22 12,17.8 5.5,22 7.5,14.5 2,9.5 9,9"/>';
      g += '<text x="' + cx + '" y="' + (base + 13) + '" text-anchor="middle">' + SIGLA[t.id] + '</text>';
      s += '<g class="predio" data-tema="' + t.id + '" tabindex="0" role="button" aria-label="' + esc(t.nome) + ': ' + feitas + ' de ' + n + ' fases">' +
        '<rect x="' + (cx - col / 2) + '" y="0" width="' + col + '" height="' + H + '" fill="transparent"/>' + g + '</g>';
    });
    s += '<line class="chao" x1="0" y1="' + base + '" x2="' + W + '" y2="' + base + '"/>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-height:300px" role="group" aria-label="Canteiro: um prédio por tema do edital">' + s + '</svg>';
  }
  function alvoContinuar() {
    var ordem = [];
    if (P.jogo.ultimoTema) ordem.push(P.jogo.ultimoTema);
    TEMAS.forEach(function (t) { if (ordem.indexOf(t.id) < 0) ordem.push(t.id); });
    for (var i = 0; i < ordem.length; i++) { var f = proxFase(ordem[i]); if (f >= 0) return { tema: ordem[i], fase: f }; }
    return null;
  }
  function cabecalhoJogador() {
    var nv = nivelDe(P.jogo.xp), of = sequencia(), hoje = P.dias[chaveDia()], garantida = !!(hoje && hoje.n > 0);
    var legenda = nv.prox ? 'faltam ' + fmtN(nv.prox - P.jogo.xp) + ' XP para ' + nv.proxNome : 'nível máximo';
    return '<header class="jogador"><div class="carreira">' +
      '<span class="rot">Treinador de Engenharia Civil · Câmara dos Deputados · Cebraspe</span>' +
      '<h1>Nível ' + (nv.i + 1) + ' · ' + esc(nv.nome) + '</h1>' +
      '<div class="barra-xp" role="img" aria-label="' + Math.round(nv.frac * 100) + '% do nível"><i style="width:' + (nv.frac * 100).toFixed(1) + '%"></i></div>' +
      '<div class="xp-legenda"><span>' + fmtN(P.jogo.xp) + ' XP</span><span>' + esc(legenda) + '</span></div></div>' +
      '<div class="marcas">' +
      '<div class="marca fogo' + (garantida ? '' : ' apagado') + '" title="Dias seguidos de estudo"><strong>' + ic('chama') + of + '</strong><span class="rot">' + (of === 1 ? 'dia' : 'dias') + '</span></div>' +
      '<div class="marca estrelas" title="Estrelas conquistadas"><strong>' + ic('estrela') + estrelasTotais() + '</strong><span class="rot">de ' + (TOTAL_FASES * 3) + '</span></div>' +
      '</div></header>';
  }

  /* ================= gráfico de ritmo ================= */
  function graficoDias() {
    var dias = [], d = new Date();
    d.setDate(d.getDate() - 13);
    for (var i = 0; i < 14; i++) { dias.push({ k: chaveDia(d), dd: d.getDate(), mm: d.getMonth() + 1 }); d.setDate(d.getDate() + 1); }
    var max = Math.max(P.cfg.meta || 1, 1);
    dias.forEach(function (x) { var r = P.dias[x.k]; x.n = r ? r.n : 0; x.c = r ? r.c : 0; if (x.n > max) max = x.n; });
    var W = 420, H = 130, top = 12, base = 104, larg = (W - 20) / 14;
    var metaY = base - ((P.cfg.meta || 0) / max) * (base - top);
    var barras = dias.map(function (x, i) {
      var h = x.n ? Math.max(3, (x.n / max) * (base - top)) : 2;
      var p = x.n ? x.c / x.n : 0;
      var cl = !x.n ? 'b-zero' : p >= 0.7 ? 'b-ok' : p >= 0.5 ? 'b-med' : 'b-ruim';
      var xx = 10 + i * larg + 3;
      return '<rect class="' + cl + '" x="' + xx.toFixed(1) + '" y="' + (base - h).toFixed(1) + '" width="' + (larg - 6).toFixed(1) + '" height="' + h.toFixed(1) + '"><title>' + pad(x.dd) + '/' + pad(x.mm) + ': ' + x.n + ' itens, ' + pct(x.c, x.n) + '% de acerto</title></rect>' +
        ((i % 3 === 1 || i === 13) ? '<text x="' + (xx + (larg - 6) / 2).toFixed(1) + '" y="' + (base + 16) + '" text-anchor="middle">' + (i === 13 ? 'hoje' : pad(x.dd) + '/' + pad(x.mm)) + '</text>' : '');
    }).join('');
    return '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Itens respondidos por dia nos últimos 14 dias">' +
      '<line class="base" x1="10" y1="' + base + '" x2="' + (W - 10) + '" y2="' + base + '"/>' +
      (P.cfg.meta ? '<line x1="10" y1="' + metaY.toFixed(1) + '" x2="' + (W - 10) + '" y2="' + metaY.toFixed(1) + '" stroke="var(--azul)" stroke-width="1" stroke-dasharray="4 3"/>' +
        '<text x="' + (W - 12) + '" y="' + (metaY - 4).toFixed(1) + '" text-anchor="end" style="fill:var(--azul)">meta ' + P.cfg.meta + '</text>' : '') +
      barras + '</svg>';
  }

  /* ================= tela inicial: o canteiro ================= */
  function telaInicio() {
    pararTimers(); calarVoz();
    sessao = null; tela = 'inicio'; rolarDia();
    if (armaz.remotoPendente) { if ((armaz.remotoPendente.atualizado || 0) > (P.atualizado || 0)) adotar(armaz.remotoPendente); armaz.remotoPendente = null; rolarDia(); }
    var vistos = Object.keys(P.itens).length;
    var venc = vencidos().length;
    var erros = cadernoErros().length;
    var hoje = P.dias[chaveDia()] || { n: 0, c: 0, e: 0 };
    var faltam = diasParaProva();
    var ch = analiseChute();
    var stats = TEMAS.map(function (t) { var s = statTema(t.id); s.t = t; return s; });
    var fraco = stats.filter(function (s) { return s.vistos; }).sort(function (a, b) { return b.fraqueza - a.fraqueza; })[0];
    var naoVistos = QUESTOES.length - vistos;
    var alvo = alvoContinuar();

    // ---- indicadores de preparação
    var kProva = faltam == null
      ? '<div class="kpi"><span class="rot">Prova</span><strong>—</strong><small>defina a data em Ajustes</small></div>'
      : '<div class="kpi' + (faltam <= 14 ? ' l' : '') + '"><span class="rot">Prova em</span><strong>' + Math.max(0, faltam) + '</strong><small>' +
        (faltam > 0 ? 'dias · ' + Math.ceil((naoVistos + venc) / Math.max(1, faltam)) + ' itens/dia cobrem o banco' : faltam === 0 ? 'é hoje' : 'data já passou') + '</small></div>';
    var metaPct = Math.min(100, pct(hoje.n, P.cfg.meta || 1));
    var kHoje = '<div class="kpi"><span class="rot">Meta do dia</span><strong>' + hoje.n + '<span style="font-size:.5em;color:var(--tinta-2)"> / ' + P.cfg.meta + '</span></strong>' +
      '<small>' + (hoje.n ? pct(hoje.c, hoje.n) + '% de acerto' : 'meta diária de itens') + '</small><div class="medidor"><i class="' + (metaPct >= 100 ? 'cheio' : '') + '" style="width:' + metaPct + '%"></i></div></div>';
    var kBanco = '<div class="kpi"><span class="rot">Itens já vistos</span><strong>' + vistos + '<span style="font-size:.5em;color:var(--tinta-2)"> / ' + QUESTOES.length + '</span></strong><small>' + QUESTOES.length + ' objetivas + ' + DISC.length + ' discursivas</small></div>';
    var kProj = '<div class="kpi' + (ch.projecao != null && ch.projecao < 0 ? ' e' : ch.projecao != null && ch.projecao >= 60 ? ' c' : '') + '"><span class="rot">Nota líquida estimada</span><strong>' +
      (ch.n >= 10 ? (ch.projecao > 0 ? '+' : '') + ch.projecao : '—') + '</strong><small>' + (ch.n >= 10 ? 'em ' + ITENS_PROVA + ' itens C/E · últimos ' + ch.n : 'responda 10 itens C/E') + '</small></div>';

    var brancosHoje = Math.max(0, hoje.n - hoje.c - hoje.e);
    var placarHoje = '<section class="bloco"><span class="rot">Questões objetivas respondidas hoje</span><div class="hoje">' +
      '<div><span class="rot">Respondidas</span><strong>' + hoje.n + '</strong></div>' +
      '<div class="c"><span class="rot">Certas</span><strong>' + hoje.c + '</strong></div>' +
      '<div class="e"><span class="rot">Erradas</span><strong>' + hoje.e + '</strong></div>' +
      '<div><span class="rot">Em branco</span><strong>' + brancosHoje + '</strong></div>' +
      '</div></section>';

    // ---- treino recomendado
    var titulo, desc, nInt = 20;
    if (!vistos) {
      titulo = 'Diagnóstico inicial';
      desc = '20 itens sorteados de todos os temas para medir seu ponto de partida. A partir daqui, cada treino se ajusta ao seu desempenho.';
    } else if (venc >= 15) {
      titulo = 'Revisão do dia';
      desc = venc + ' itens chegaram à data de revisão. O treino traz os mais urgentes e completa com itens novos' + (fraco ? ' de ' + fraco.t.nome.toLowerCase() : '') + '.';
    } else {
      titulo = 'Treino do dia';
      desc = (venc ? venc + (venc === 1 ? ' revisão pendente' : ' revisões pendentes') + ' + ' : '') + 'itens novos com prioridade para o tema mais fraco' +
        (fraco ? ': ' + fraco.t.nome.toLowerCase() + ' (' + fraco.acerto + '% de acerto)' : '') + '.';
    }
    if (naoVistos === 0 && venc === 0) desc = 'Você já viu todo o banco e não há revisões vencidas. O treino reforça os itens das caixas mais baixas.';

    var missoes = missoesDoDia().map(function (m, i) {
      var v = Math.min(m.meta, m.val(P.jogo.dia)), feita = P.jogo.dia.pagas[i];
      return '<div class="missao' + (feita ? ' feita' : '') + '"><span>' + (feita ? ic('check') + ' ' : '') + esc(m.txt) + ' <span class="dado" style="font-size:12.5px">' + v + '/' + m.meta + '</span></span>' +
        '<span class="premio">' + (feita ? 'recebido' : '+' + m.xp + ' XP') + '</span><div class="trilho"><i style="width:' + pct(v, m.meta) + '%"></i></div></div>';
    }).join('');
    function btnTema(s) {
      var est = P.jogo.estrelas[s.t.id], n = est.length, feitas = est.filter(function (e) { return e > 0; }).length, soma = est.reduce(function (a, b) { return a + b; }, 0);
      return '<button class="tema' + (feitas === n ? ' completo' : '') + '" data-tema="' + s.t.id + '"><span class="nome">' + esc(s.t.nome) + '</span>' +
        '<span class="trilho"><i style="width:' + pct(soma, n * 3) + '%"></i></span>' +
        '<span class="linha2"><span>' + feitas + '/' + n + ' fases · ' + soma + '★</span><span class="st ' + s.estado[0] + '">' + s.estado[1] + '</span></span></button>';
    }
    var temas = stats.filter(function (s) { return s.t.grupo !== 'basico'; }).map(btnTema).join('');
    var temasBasicos = stats.filter(function (s) { return s.t.grupo === 'basico'; }).map(btnTema).join('');
    var des = P.jogo.dia.desafio, nConq = Object.keys(P.jogo.conquistas).length;
    var discFeitas = P.disc.length;
    var discMedia = discFeitas ? P.disc.reduce(function (a, d) { return a + d.total / d.max; }, 0) / discFeitas : 0;
    var ofTxt = hoje.n ? 'ofensiva de hoje garantida' : 'responda 1 item hoje para ' + (sequencia() ? 'manter' : 'começar') + ' a ofensiva';
    var simHist = P.simulados.slice(-5).reverse().map(function (s) {
      var dt = new Date(s.data);
      return '<tr><td class="num" style="text-align:left">' + pad(dt.getDate()) + '/' + pad(dt.getMonth() + 1) + '</td><td class="num">' + s.total + '</td><td class="num">' + s.c + ' / ' + s.e + ' / ' + s.b + '</td>' +
        '<td class="num"><b>' + (s.liq > 0 ? '+' : '') + s.liq + '</b></td><td class="num">' + pct(Math.max(0, s.liq), s.total) + '%</td></tr>';
    }).join('');

    app.innerHTML = cabecalhoJogador() + placarHoje +
      '<div class="kpis">' + kProva + kHoje + kBanco + kProj + '</div>' +
      '<section class="bloco"><span class="rot">Seu canteiro · um prédio por tema, um andar por fase</span><div class="canteiro">' + skyline() + '</div></section>' +
      (alvo ? '<button class="btn prim grande cta" id="btn-continuar"><span class="cta-t">Jogar ' + ic('seta') + '</span><span class="cta-s">' + esc(nomeTema[alvo.tema]) + ' · Fase ' + (alvo.fase + 1) + '</span></button>'
            : '<button class="btn prim grande cta" id="btn-continuar"><span class="cta-t">Jogar a maratona ' + ic('seta') + '</span><span class="cta-s">Obra entregue: todas as fases concluídas</span></button>') +
      '<button class="recomendado" data-modo="inteligente" data-n="' + nInt + '"><span class="nome">' + titulo + '</span><span class="desc">' + esc(desc) + '</span><span class="ir">Começar · ' + nInt + ' itens</span></button>' +
      '<section class="bloco"><span class="rot">Outros treinos</span><div class="modos">' +
      '<button class="modo" data-modo="maratona"><span class="nome">' + ic('raio') + 'Maratona</span><span class="desc">Qualquer tema, 3 capacetes, até onde você aguentar.</span><span class="extra">recorde <b>' + fmtN(P.jogo.recorde) + '</b></span></button>' +
      '<button class="modo" data-modo="desafio"' + (des ? ' disabled' : '') + '><span class="nome">' + ic('calendario') + 'Desafio do dia</span><span class="desc">' + (des ? 'Feito. Amanhã tem outro.' : '10 itens que só valem hoje.') + '</span><span class="extra">' + (des ? 'hoje <b>' + des.acertos + '/10</b>' : '+300 XP de bônus') + '</span></button>' +
      '<button class="modo' + (erros ? ' alerta' : '') + '" data-modo="erros"' + (erros ? '' : ' disabled') + '><span class="nome">' + ic('chave') + 'Caderno de erros</span><span class="desc">Só os itens que você errou, deixou em branco ou perdeu no tempo.</span><span class="extra">refazer <b>' + erros + ' itens</b></span></button>' +
      '<button class="modo" data-modo="revisao"' + (venc ? '' : ' disabled') + '><span class="nome">' + ic('check') + 'Só revisões vencidas</span><span class="desc">Itens cuja data de revisão chegou, dos mais frágeis aos mais firmes.</span><span class="extra">repetição espaçada · ' + venc + ' itens</span></button>' +
      '<button class="modo discursiva" data-modo="disc"><span class="nome">' + ic('caneta') + 'Questão discursiva</span><span class="desc">Texto com limite de linhas, padrão de resposta e nota por quesito.</span><span class="extra">' + (discFeitas ? discFeitas + ' feitas · média ' + Math.round(discMedia * 100) + '%' : DISC.length + ' propostas · sem limite de tempo') + '</span></button>' +
      '<button class="modo" id="btn-painel"><span class="nome">' + ic('medalha') + 'Painel de preparação</span><span class="desc">Mapa de domínio por tema, estratégia de chute e ritmo dos últimos 14 dias.</span><span class="extra">' + vistos + ' de ' + QUESTOES.length + ' itens vistos</span></button>' +
      '</div></section>' +
      '<section class="bloco"><span class="rot">Simulado no ritmo da prova · só itens Certo/Errado · ' + SEG_SIMULADO + ' s por item · correção no fim</span><div class="modos tres">' +
        [[20, 'Curto'], [50, 'Médio'], [100, 'Longo']].map(function (s) {
          return '<button class="modo baixo" data-modo="simulado" data-n="' + s[0] + '"><span class="nome">' + s[1] + ' · ' + s[0] + ' itens</span><span class="extra">' + Math.round(s[0] * SEG_SIMULADO / 60) + ' min · nota líquida</span></button>';
        }).join('') +
      '</div>' +
      (simHist ? '<div class="tabela-wrap"><table><thead><tr><th>Data</th><th class="num">Itens</th><th class="num">C / E / branco</th><th class="num">Líquida</th><th class="num">%</th></tr></thead><tbody>' + simHist + '</tbody></table></div>' : '') +
      '</section>' +
      '<section class="bloco"><span class="rot">Missões de hoje · ' + esc(ofTxt) + '</span><div class="missoes">' + missoes + '</div></section>' +
      '<section class="bloco"><span class="rot">Escolha o tema (edital, item 14.2.4, Cargo 6)</span><div class="temas">' + temas + '</div></section>' +
      '<section class="bloco"><span class="rot">Conhecimentos Básicos (edital, item 14.2.3)</span><div class="temas">' + temasBasicos + '</div></section>' +
      '<div class="acoes"><button class="btn sec" id="btn-conq">' + ic('medalha') + 'Conquistas ' + nConq + '/' + CONQ.length + '</button></div>' +
      '<details class="ajustes-box" id="ajustes-box"><summary>Ajustes</summary><div class="ajustes">' +
        '<label for="opt-data">Data da prova <input type="date" id="opt-data" value="' + esc(P.cfg.dataProva || '') + '"></label>' +
        '<label for="opt-meta">Meta diária <input type="number" id="opt-meta" min="5" max="300" step="5" value="' + P.cfg.meta + '"> itens</label>' +
        '<label><input type="checkbox" id="opt-audio"' + (P.cfg.audio ? ' checked' : '') + '> Sons e correção em áudio</label>' +
        '<label><input type="checkbox" id="opt-just"' + (P.cfg.lerJust ? ' checked' : '') + '> Ler a justificativa em voz alta</label>' +
        '<span id="sync" class="sync">' + esc(textoSync()) + '</span>' +
      '</div><div class="perigo">' +
        (confirmarApagar
          ? '<span>Apagar todo o histórico, caixas de revisão, simulados, níveis, estrelas e conquistas? Isso não pode ser desfeito.</span><button class="btn-perigo forte" id="btn-apagar-sim">Apagar progresso</button><button class="btn-mini" id="btn-apagar-nao">Cancelar</button>'
          : '<button class="btn-perigo" id="btn-apagar">Recomeçar do zero</button>') +
      '</div></details>' +
      '<p class="nota-metodo">Como funciona: cada item tem ' + TEMPO + ' segundos. Acertos seguidos multiplicam os pontos (até ×5) e responder mais rápido rende bônus. Por trás do jogo, cada item fica numa caixa de revisão de 0 a 5: acerto com certeza sobe uma caixa e espaça a próxima revisão (1, 3, 7, 16 e 35 dias); acerto com dúvida mantém o item em revisão diária; erro ou branco devolve o item à caixa 0 e ao caderno de erros. Nos itens Certo/Errado vale o método Cebraspe: cada erro anula um acerto e o branco não pontua nem desconta.</p>';

    atualizarSync();
    document.getElementById('btn-continuar').addEventListener('click', function () { iniciarAudio(); if (alvo) iniciarSessao('fase', { tema: alvo.tema, fase: alvo.fase }); else iniciarSessao('maratona'); });
    app.querySelectorAll('[data-tema]').forEach(function (b) {
      var abrir = function () { iniciarAudio(); telaTema(b.getAttribute('data-tema')); };
      b.addEventListener('click', abrir);
      if (b.tagName !== 'BUTTON') b.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); abrir(); } });
    });
    app.querySelectorAll('[data-modo]').forEach(function (b) {
      b.addEventListener('click', function () { iniciarAudio(); iniciarSessao(b.getAttribute('data-modo'), { n: +b.getAttribute('data-n') || 0 }); });
    });
    document.getElementById('btn-painel').addEventListener('click', telaPainel);
    document.getElementById('btn-conq').addEventListener('click', telaConquistas);
    var box = document.getElementById('ajustes-box');
    if (confirmarApagar) box.open = true;
    document.getElementById('opt-data').addEventListener('change', function (e) { P.cfg.dataProva = e.target.value; salvar(); telaInicioMantendo(); });
    document.getElementById('opt-meta').addEventListener('change', function (e) {
      var v = Math.max(5, Math.min(300, parseInt(e.target.value, 10) || 30)); P.cfg.meta = v; salvar(); telaInicioMantendo();
    });
    document.getElementById('opt-audio').addEventListener('change', function (e) { P.cfg.audio = e.target.checked; salvar(); if (!P.cfg.audio) calarVoz(); });
    document.getElementById('opt-just').addEventListener('change', function (e) { P.cfg.lerJust = e.target.checked; salvar(); });
    var bA = document.getElementById('btn-apagar');
    if (bA) bA.addEventListener('click', function () { confirmarApagar = true; telaInicioMantendo(); });
    var bS = document.getElementById('btn-apagar-sim');
    if (bS) bS.addEventListener('click', function () {
      var cfg = P.cfg; P = novoProgresso(); P.cfg = cfg; combo = 0; confirmarApagar = false; salvar(); telaInicio();
    });
    var bN = document.getElementById('btn-apagar-nao');
    if (bN) bN.addEventListener('click', function () { confirmarApagar = false; telaInicioMantendo(); });
    teclaAtual = function (k) {
      if (k === 'enter' && !(document.activeElement && document.activeElement.closest && document.activeElement.closest('details'))) { document.getElementById('btn-continuar').click(); return true; }
      return false;
    };
    window.scrollTo(0, 0);
  }
  function telaInicioMantendo() { var y = window.scrollY; telaInicio(); var b = document.getElementById('ajustes-box'); if (b) b.open = true; window.scrollTo(0, y); }

  /* ================= painel de preparação ================= */
  function telaPainel() {
    pararTimers(); calarVoz();
    sessao = null; tela = 'painel';
    var ch = analiseChute();
    var stats = TEMAS.map(function (t) { var s = statTema(t.id); s.t = t; return s; });
    var linhas = stats.map(function (s) {
      var cls = s.dominio >= 70 ? '' : s.dominio >= 35 ? 'azul' : 'medio';
      return '<tr><td>' + esc(s.t.nome) + '<small>edital ' + esc(s.t.edital) + '</small></td>' +
        '<td><span class="st ' + s.estado[0] + '">' + s.estado[1] + '</span></td>' +
        '<td class="num">' + s.vistos + '/' + s.total + '</td>' +
        '<td class="num">' + (s.resp ? s.acerto + '%' : '—') + '</td>' +
        '<td class="col-opc"><div class="barra" title="Domínio ' + s.dominio + '%"><i class="' + cls + '" style="width:' + s.dominio + '%"></i></div></td>' +
        '<td class="num">' + (s.vencidos || '') + '</td>' +
        '<td><button class="btn-mini" data-modo="tema" data-tema="' + s.t.id + '">Treinar</button></td></tr>';
    }).join('');
    var chuteHtml;
    if (ch.chutes < 8) {
      chuteHtml = '<p>Ao responder, marque <b>Dúvida</b> quando estiver chutando. Com 8 ou mais chutes registrados, o treinador calcula se chutar aumenta ou reduz sua nota no método Cebraspe.</p>' +
        '<p class="dado" style="font-size:13px;color:var(--tinta-2)">Chutes registrados: ' + ch.chutes + ' de 8</p>';
    } else {
      var saldo = ch.chuC - ch.chuE;
      var taxa = pct(ch.chuC, ch.chutes);
      chuteHtml = '<div class="grande">' + (saldo > 0 ? '+' : '') + saldo + ' <span style="font-size:14px;color:var(--tinta-2)">pontos líquidos vindos de chutes</span></div>' +
        '<p>' + ch.chutes + ' chutes: ' + ch.chuC + ' certos e ' + ch.chuE + ' errados (' + taxa + '%). Nos itens com certeza, ' + ch.certC + ' certos e ' + ch.certE + ' errados.</p>' +
        (saldo > 0
          ? '<div class="veredito-chute bom">Seu chute está acima de 50%. Na prova, arrisque nos itens de dúvida em que consegue eliminar uma hipótese.</div>'
          : '<div class="veredito-chute ruim">Seu chute está tirando pontos. Na prova, deixe em branco os itens de dúvida: a projeção sobe de ' + ch.projecao + ' para ' + ch.projecaoSemChute + ' em ' + ITENS_PROVA + ' itens.</div>');
    }
    var t = totais();
    app.innerHTML = '<div class="topo-tela"><button class="btn sec" id="btn-voltar">' + ic('voltar') + 'Canteiro</button><span class="rot">' + t.resp + ' respostas · ' + pct(t.cert, t.resp) + '% de acerto</span></div>' +
      '<section class="bloco"><h2 class="secao">Mapa de domínio por tema</h2>' +
      '<p class="intro">Domínio sobe quando você acerta com certeza e o item vai para revisões mais espaçadas. Treine primeiro os temas marcados como Crítico ou Atenção.</p>' +
      '<div class="tabela-wrap"><table><thead><tr><th>Tema</th><th>Situação</th><th class="num">Vistos</th><th class="num">Acerto</th><th class="col-opc">Domínio</th><th class="num">Revisar</th><th></th></tr></thead><tbody>' + linhas + '</tbody></table></div></section>' +
      '<div class="duas">' +
        '<section class="cartao"><span class="rot">Estratégia de chute · método Cebraspe</span>' + chuteHtml + '</section>' +
        '<section class="cartao"><span class="rot">Ritmo · últimos 14 dias</span>' + graficoDias() +
          '<div class="legenda"><span><i style="background:var(--certo)"></i>≥ 70%</span><span><i style="background:var(--laranja)"></i>50–69%</span><span><i style="background:var(--errado)"></i>&lt; 50%</span></div></section>' +
      '</div>' +
      '<p class="nota-metodo">Cada item fica numa caixa de revisão de 0 a 5. Acerto com certeza sobe uma caixa e espaça a próxima revisão (1, 3, 7, 16 e 35 dias). Acerto com dúvida mantém o item em revisão diária; erro ou branco devolve o item à caixa 0 e ao caderno de erros.</p>';
    document.getElementById('btn-voltar').addEventListener('click', telaInicio);
    app.querySelectorAll('[data-modo]').forEach(function (b) {
      b.addEventListener('click', function () { iniciarAudio(); iniciarSessao('tema', { tema: b.getAttribute('data-tema') }); });
    });
    teclaAtual = function () { return false; };
    window.scrollTo(0, 0);
  }

  /* ================= tela do tema: os andares ================= */
  function telaTema(id) {
    pararTimers(); calarVoz();
    sessao = null; tela = 'tema'; temaAberto = id;
    var t = TEMAS.filter(function (x) { return x.id === id; })[0], est = P.jogo.estrelas[id], prox = proxFase(id), s = statTema(id);
    var andares = FASES[id].map(function (qs, i) {
      var feito = est[i] > 0, atual = i === prox, trancado = !feito && !atual;
      var info = feito ? 'melhor resultado ' + estrelinhas(est[i]) : atual ? 'próximo andar a construir' : 'conclua a fase ' + i + ' para liberar';
      return '<button class="andar' + (atual ? ' atual' : '') + (trancado ? ' trancado' : '') + '" data-f="' + i + '"' + (trancado ? ' disabled' : '') + '>' +
        '<span class="num"><small>fase</small>' + (i + 1) + '</span>' +
        '<span class="info"><b>' + qs.length + ' itens</b>' + info + '</span>' +
        '<span class="acao">' + (trancado ? ic('cadeado') : atual ? 'Jogar' : est[i] === 3 ? 'Rever' : 'Melhorar') + '</span></button>';
    }).join('');
    var soma = est.reduce(function (a, b) { return a + b; }, 0);
    app.innerHTML = '<div class="topo-tela"><button class="btn sec" id="btn-voltar">' + ic('voltar') + 'Canteiro</button><span class="rot">edital ' + esc(t.edital) + '</span></div>' +
      '<h2>' + esc(t.nome) + '</h2>' +
      '<p class="vazio-msg">Cada fase é um andar. Você entra com 3 capacetes e perde um a cada erro ou tempo esgotado; sem erros, o andar ganha 3 estrelas.</p>' +
      '<div class="andares">' + andares + '</div>' +
      '<div class="terreo"><span>térreo · ' + FASES[id].length + ' fases</span><span>' + soma + ' de ' + (est.length * 3) + ' estrelas</span></div>' +
      '<button class="recomendado" id="btn-bloco"><span class="nome">Bloco adaptativo do tema</span>' +
      '<span class="desc"><span class="st ' + s.estado[0] + '">' + s.estado[1] + '</span> ' + s.vistos + ' de ' + s.total + ' itens vistos' + (s.resp ? ' · ' + s.acerto + '% de acerto' : '') + ' · domínio ' + s.dominio + '%' + (s.vencidos ? ' · ' + s.vencidos + ' para revisar' : '') + '. Revisões vencidas primeiro, depois itens novos.</span>' +
      '<span class="ir">Treinar · 15 itens</span></button>';
    document.getElementById('btn-voltar').addEventListener('click', telaInicio);
    document.getElementById('btn-bloco').addEventListener('click', function () { iniciarAudio(); iniciarSessao('tema', { tema: id }); });
    app.querySelectorAll('.andar:not([disabled])').forEach(function (b) {
      b.addEventListener('click', function () { iniciarAudio(); iniciarSessao('fase', { tema: id, fase: +b.getAttribute('data-f') }); });
    });
    teclaAtual = function (k) { if (k === 'enter' && prox >= 0) { iniciarSessao('fase', { tema: id, fase: prox }); return true; } return false; };
    window.scrollTo(0, 0);
    var at = app.querySelector('.andar.atual');
    if (at && at.scrollIntoView) at.scrollIntoView({ block: 'center' });
  }

  /* ================= conquistas ================= */
  function telaConquistas() {
    pararTimers(); sessao = null; tela = 'conquistas';
    var itens = CONQ.map(function (c) {
      var tem = !!P.jogo.conquistas[c.id];
      return '<div class="conq' + (tem ? ' tem' : '') + '"><span class="selo">' + ic(tem ? 'medalha' : 'cadeado') + '</span><b>' + esc(c.nome) + '</b><span>' + esc(c.desc) + '</span></div>';
    }).join('');
    var t = totais();
    app.innerHTML = '<div class="topo-tela"><button class="btn sec" id="btn-voltar">' + ic('voltar') + 'Canteiro</button><span class="rot">' + Object.keys(P.jogo.conquistas).length + ' de ' + CONQ.length + '</span></div>' +
      '<h2>Conquistas</h2><p class="vazio-msg">Cada conquista vale ' + XP_CONQUISTA + ' XP.</p>' +
      '<div class="conquistas">' + itens + '</div>' +
      '<div class="tabela-wrap"><table><tbody>' +
      '<tr><td>Itens respondidos</td><td class="num">' + fmtN(t.resp) + '</td></tr>' +
      '<tr><td>Itens certos</td><td class="num">' + fmtN(t.cert) + ' (' + pct(t.cert, t.resp) + '%)</td></tr>' +
      '<tr><td>Maior sequência de acertos</td><td class="num">' + P.jogo.stats.comboMax + '</td></tr>' +
      '<tr><td>Melhor ofensiva</td><td class="num">' + P.jogo.melhorOfensiva + ' dias</td></tr>' +
      '<tr><td>Recorde na maratona</td><td class="num">' + fmtN(P.jogo.recorde) + ' pts</td></tr>' +
      '</tbody></table></div>';
    document.getElementById('btn-voltar').addEventListener('click', telaInicio);
    teclaAtual = function () { return false; };
    window.scrollTo(0, 0);
  }

  /* ================= sessão ================= */
  function iniciarSessao(modo, op) {
    op = op || {};
    var fila, rotulo, finita = true, vidas = null;
    rolarDia();
    if (modo === 'disc') {
      var feitas = {}; P.disc.forEach(function (d) { feitas[d.id] = (feitas[d.id] || 0) + 1; });
      fila = embaralhar(DISC).sort(function (a, b) { return (feitas[a.id] || 0) - (feitas[b.id] || 0); });
      rotulo = 'Discursiva'; finita = false;
    } else if (modo === 'fase') {
      fila = embaralhar(FASES[op.tema][op.fase]); rotulo = nomeTema[op.tema] + ' · Fase ' + (op.fase + 1); vidas = 3;
      P.jogo.ultimoTema = op.tema;
    } else if (modo === 'maratona') {
      fila = embaralhar(QUESTOES); rotulo = 'Maratona · qualquer tema'; finita = false; vidas = 3;
    } else if (modo === 'desafio') {
      if (P.jogo.dia.desafio) { telaInicio(); return; }
      fila = embaralharSeed(QUESTOES, hashStr('desafio-' + chaveDia())).slice(0, 10); rotulo = 'Desafio do dia';
    } else if (modo === 'tema') {
      fila = filaInteligente(15, op.tema); rotulo = nomeTema[op.tema] + ' · bloco de ' + fila.length;
    } else if (modo === 'erros') {
      fila = embaralhar(cadernoErros()); rotulo = 'Caderno de erros';
    } else if (modo === 'revisao') {
      fila = vencidos().sort(function (a, b) { return P.itens[a.id].box - P.itens[b.id].box; }).slice(0, 40); fila = embaralhar(fila); rotulo = 'Revisões vencidas';
    } else if (modo === 'simulado') {
      var ce = QUESTOES.filter(function (q) { return q.tipo === 'CE'; });
      var n = Math.min(op.n || 20, ce.length);
      fila = embaralhar(ce).slice(0, n);
      rotulo = 'Simulado · ' + n + ' itens';
    } else if (modo === 'refazer') {
      fila = embaralhar(op.fila); rotulo = 'Refazer erros da sessão';
    } else {
      modo = 'inteligente';
      fila = filaInteligente(op.n || 20); rotulo = Object.keys(P.itens).length ? 'Treino do dia' : 'Diagnóstico inicial';
    }
    if (!fila.length) { telaInicio(); return; }
    sessao = { modo: modo, rotulo: rotulo, fila: fila, pos: 0, inicio: Date.now(), finita: finita, vidas: vidas,
      tema: op.tema || null, faseIdx: op.fase || 0, respostas: [], discursivas: [], certeza: true,
      pontos: 0, acertos: 0, ganhos: {}, eventos: [], promocao: null, xp0: P.jogo.xp, finalizada: false, final: null };
    if (modo === 'simulado') sessao.fim = Date.now() + fila.length * SEG_SIMULADO * 1000;
    proxima();
  }
  function acabou() {
    var s = sessao;
    if (s.vidas !== null && s.vidas <= 0) return true;
    return s.finita && s.pos >= s.fila.length;
  }
  function proxima() {
    pararTimers(); calarVoz();
    if (sessao.modo !== 'disc' && acabou()) { telaResultado(); return; }
    if (sessao.pos >= sessao.fila.length) { sessao.fila = embaralhar(sessao.fila); sessao.pos = 0; }
    var item = sessao.fila[sessao.pos++];
    sessao.certeza = true;
    tela = 'jogo';
    if (sessao.modo === 'disc') telaDiscursiva(item); else telaQuestao(item);
  }
  function encerrar() { pararTimers(); calarVoz(); telaResultado(); }

  function hudHTML(pulsar) {
    var s = sessao, simulado = s.modo === 'simulado';
    var h = '<button class="hud-sair" id="btn-sair" aria-label="' + (simulado ? 'Entregar simulado' : 'Encerrar treino') + '">' + ic('x') + '<span>' + (simulado ? 'Entregar simulado' : 'Encerrar') + '</span></button>';
    if (s.finita && s.fila.length <= 20) {
      h += '<div class="pips" aria-label="Item ' + s.pos + ' de ' + s.fila.length + '">';
      for (var i = 0; i < s.fila.length; i++) {
        var r = s.respostas[i];
        h += '<span class="pip' + (r ? (simulado ? ' b' : r.resultado === 'C' ? ' c' : r.resultado === 'E' ? ' e' : ' b') : (i === s.pos - 1 ? ' atual' : '')) + '"></span>';
      }
      h += '</div>';
    } else if (s.finita) {
      h += '<span class="rot" style="flex:1">item ' + s.pos + ' de ' + s.fila.length + '</span>';
    }
    if (s.vidas !== null) {
      h += '<span class="vidas" aria-label="' + s.vidas + ' de 3 capacetes">';
      for (var v = 1; v <= 3; v++) h += ic('capacete', v <= s.vidas ? '' : 'perdida');
      h += '</span>';
    }
    if (!simulado) {
      var m = multDe(combo);
      h += '<span class="combo' + (m > 1 ? ' quente' : '') + (pulsar ? ' pulso' : '') + '" title="Sequência de ' + combo + ' acertos">' + ic('chama') + '×' + m + '</span>';
      h += '<span class="pontos' + (pulsar ? ' pulso' : '') + '">' + fmtN(s.pontos) + '<small>PTS</small></span>';
    }
    return h;
  }
  function desenharHud(pulsar) {
    var el = document.getElementById('hud');
    if (!el) return;
    el.innerHTML = hudHTML(pulsar);
    document.getElementById('btn-sair').addEventListener('click', encerrar);
  }

  /* ================= escala gráfica (cronômetro) ================= */
  var DIV = 60;
  function escalaSVG(total) {
    var w = 600, x0 = 4, larg = w - 8, h = 14, y = 4, t = '';
    for (var i = 0; i < DIV; i++) {
      var x = x0 + (larg * i) / DIV, wi = larg / DIV;
      t += '<rect class="vazio" x="' + x.toFixed(2) + '" y="' + y + '" width="' + wi.toFixed(2) + '" height="' + (i % 5 === 0 ? h : h - 5) + '"/>';
    }
    var nums = '', passo = total <= 60 ? 10 : total <= 1800 ? 300 : 1800;
    for (var k = 0; k <= total; k += passo) nums += '<text x="' + (x0 + (larg * k) / total).toFixed(1) + '" y="32" text-anchor="middle">' + (total <= 60 ? k : Math.round(k / 60) + "'") + '</text>';
    return '<svg viewBox="0 0 ' + w + ' 36" preserveAspectRatio="none" aria-hidden="true">' + t +
      '<rect id="esc-cheio" class="cheio" x="' + x0 + '" y="' + y + '" width="' + larg + '" height="' + h + '"/>' + nums + '</svg>';
  }
  function atualizarEscala(rest, total, alertaEm) {
    var cheio = document.getElementById('esc-cheio'), seg = document.getElementById('seg');
    if (!cheio || !seg) return;
    cheio.setAttribute('width', ((592 * Math.max(0, rest)) / total).toFixed(2));
    var alerta = rest <= alertaEm;
    cheio.setAttribute('class', 'cheio' + (alerta ? ' alerta' : ''));
    seg.textContent = total <= 60 ? pad(Math.max(0, rest)) + ' s' : mmss(rest);
    seg.className = 'seg dado' + (alerta ? ' alerta' : '');
  }

  /* ================= questão objetiva ================= */
  function telaQuestao(q) {
    var simulado = sessao.modo === 'simulado';
    var it = statItem(q.id);
    var hist = it ? 'já visto ' + it.n + 'x · caixa ' + it.box + (it.ult && it.ult !== 'C' ? ' · último: ' + (it.ult === 'E' ? 'erro' : 'branco') : '') : 'item novo';
    var resp;
    if (q.tipo === 'CE') {
      resp = '<div class="respostas-ce"><button class="btn-resp" data-r="C">Certo <kbd>C</kbd></button><button class="btn-resp" data-r="E">Errado <kbd>E</kbd></button></div>';
    } else {
      resp = '<div class="respostas-me">' + ['A', 'B', 'C', 'D', 'E'].map(function (l) {
        return '<button class="opcao" data-r="' + l + '"><span class="letra">' + l + '</span><span>' + esc(q.opcoes[l]) + '</span></button>';
      }).join('') + '</div>';
    }
    var totalTempo = simulado ? sessao.fila.length * SEG_SIMULADO : TEMPO;
    var contador = sessao.finita ? '' : ' · item ' + (sessao.respostas.length + 1);
    app.innerHTML = '<div class="topo-fixo"><div class="hud" id="hud">' + hudHTML(false) + '</div>' +
      '<div class="escala"><div class="escala-topo"><span class="rot">' + (simulado ? 'Tempo restante do simulado' : esc(sessao.rotulo) + contador) + '</span><span class="seg dado" id="seg"></span></div>' + escalaSVG(totalTempo) + '</div></div>' +
      '<article class="folha" id="folha">' +
      '<span class="fonte"><span>' + esc(nomeTema[q.tema]) + ' · ' + esc(q.fonte) + '</span>' + (simulado ? '' : '<span>' + esc(hist) + '</span>') + '</span>' +
      (q.contexto ? '<div class="contexto">' + esc(q.contexto) + '</div>' : '') +
      (q.figura ? '<div class="figura">' + figura(q.figura) + '</div>' : '') +
      '<p class="enunciado">' + esc(q.enunciado) + '</p>' +
      '<div class="certeza"><span>Antes de responder:</span><span class="seg-ctl" role="group" aria-label="Grau de certeza">' +
        '<button id="cz-sim" aria-pressed="true">Tenho certeza</button><button id="cz-nao" class="duvida" aria-pressed="false">Dúvida / chute</button></span><span class="atalhos"><kbd>D</kbd> alterna</span></div>' +
      resp +
      '<button class="btn-branco" data-r="B">Deixar em branco</button>' +
      '</article><div id="area-correcao"></div>';

    function marcarCerteza(v) {
      sessao.certeza = v;
      document.getElementById('cz-sim').setAttribute('aria-pressed', v ? 'true' : 'false');
      document.getElementById('cz-nao').setAttribute('aria-pressed', v ? 'false' : 'true');
    }
    document.getElementById('cz-sim').addEventListener('click', function () { marcarCerteza(true); });
    document.getElementById('cz-nao').addEventListener('click', function () { marcarCerteza(false); });
    document.getElementById('btn-sair').addEventListener('click', encerrar);

    var t0 = Date.now(), respondida = false, restante = TEMPO;
    function responder(r) {
      if (respondida) return;
      respondida = true;
      var tempo = Math.round((Date.now() - t0) / 1000);
      if (simulado) {
        var resultado = (r === 'B' || r === 'T') ? 'B' : (r === q.gabarito ? 'C' : 'E');
        registrar(q, resultado, sessao.certeza);
        if (resultado === 'C') sessao.acertos++;
        sessao.respostas.push({ q: q, marcada: r, resultado: resultado, tempo: tempo, certeza: sessao.certeza, pts: 0 });
        salvar();
        if (r === 'T') { telaResultado(); return; }
        proxima();
        return;
      }
      pararTimers();
      corrigir(q, r, Math.min(TEMPO, tempo), Math.max(0, restante));
    }
    app.querySelectorAll('[data-r]').forEach(function (b) {
      b.addEventListener('click', function () { iniciarAudio(); responder(b.getAttribute('data-r')); });
    });
    teclaAtual = function (k) {
      if (respondida) return false;
      if (k === 'd') { marcarCerteza(!sessao.certeza); return true; }
      if (q.tipo === 'CE' && (k === 'c' || k === 'e')) { iniciarAudio(); responder(k.toUpperCase()); return true; }
      if (q.tipo === 'ME' && /^[a-e]$/.test(k)) { iniciarAudio(); responder(k.toUpperCase()); return true; }
      return false;
    };
    if (simulado) {
      var tick = function () {
        var rest = Math.round((sessao.fim - Date.now()) / 1000);
        atualizarEscala(rest, totalTempo, 300);
        if (rest <= 0) { pararTimers(); responder('T'); }
      };
      tick(); timer = setInterval(tick, 1000);
    } else {
      atualizarEscala(restante, TEMPO, 10);
      timer = setInterval(function () {
        restante--;
        atualizarEscala(restante, TEMPO, 10);
        if (restante <= 5 && restante > 0) somTick();
        if (restante <= 0) responder('T');
      }, 1000);
    }
    window.scrollTo(0, 0);
  }

  function corrigir(q, marcada, tempo, restante) {
    var s = sessao, resultado = (marcada === 'B' || marcada === 'T') ? 'B' : (marcada === q.gabarito ? 'C' : 'E');
    var antes = statItem(q.id), eraErro = !!(antes && antes.ult !== 'C');
    var pts = 0, mult = 1, perdeuVida = false, consertou = false;
    rolarDia();
    var it = registrar(q, resultado, s.certeza);
    if (resultado === 'C') {
      combo++;
      mult = multDe(combo);
      pts = (100 + restante) * mult;
      s.pontos += pts; s.acertos++;
      P.jogo.dia.acertos++;
      if (tempo < RAPIDA) { P.jogo.stats.rapidas++; P.jogo.dia.rapidas++; }
      P.jogo.stats.comboMax = Math.max(P.jogo.stats.comboMax, combo); P.jogo.dia.comboMax = Math.max(P.jogo.dia.comboMax, combo);
      if (eraErro) { P.jogo.stats.reparados++; consertou = true; }
      ganharXP(pts, 'Itens certos');
    } else {
      combo = 0;
      if (s.vidas !== null && (resultado === 'E' || marcada === 'T')) { s.vidas--; perdeuVida = true; }
    }
    s.respostas.push({ q: q, marcada: marcada, resultado: resultado, tempo: tempo, certeza: s.certeza, pts: pts });
    fecharRodada();

    app.querySelectorAll('[data-r]').forEach(function (b) {
      var r = b.getAttribute('data-r');
      b.disabled = true;
      if (r === q.gabarito) b.classList.add('gab');
      if (r === marcada && r !== 'B') b.classList.add('escolhida');
      if (q.tipo === 'ME' && r === marcada && r !== q.gabarito) b.classList.add('marcada-errada');
    });
    var br = app.querySelector('.btn-branco'); if (br) br.hidden = true;
    var cz = app.querySelector('.certeza'); if (cz) cz.hidden = true;
    desenharHud(resultado === 'C');

    var titulo, classe, fala;
    if (marcada === 'T') { titulo = 'Tempo esgotado'; classe = 'branco'; fala = 'Tempo esgotado.'; }
    else if (marcada === 'B') { titulo = 'Item deixado em branco'; classe = 'branco'; fala = 'Item em branco.'; }
    else if (resultado === 'C') { titulo = s.certeza ? 'Resposta correta' : 'Correta, mas no chute'; classe = 'ok'; fala = 'Resposta correta!'; }
    else { titulo = s.certeza ? 'Resposta errada' : 'Errada · chute'; classe = 'erro'; fala = 'Resposta errada.'; }
    var gabTxt = q.tipo === 'CE' ? (q.gabarito === 'C' ? 'Certo' : 'Errado') : 'letra ' + q.gabarito;
    var sua = (marcada === 'T' || marcada === 'B') ? '—' : (q.tipo === 'CE' ? (marcada === 'C' ? 'Certo' : 'Errado') : marcada);
    var selo = '';
    if (resultado === 'C') selo = '<span class="ganho' + (reduzMov ? '' : ' pulso') + '">+' + fmtN(pts) + ' <small>XP' + (mult > 1 ? ' · ×' + mult : '') + '</small></span>';
    else if (perdeuVida) selo = '<span class="rot">' + ic('capacete') + ' −1 capacete · restam ' + s.vidas + '</span>';
    var fim = acabou();

    var area = document.getElementById('area-correcao');
    area.innerHTML = '<section class="correcao ' + classe + '" aria-live="polite">' +
      '<div class="veredito"><h2>' + titulo + '</h2>' + selo + '</div>' +
      '<span class="gabarito">Gabarito: ' + esc(gabTxt) + ' · sua resposta: ' + esc(sua) + ' · ' + tempo + ' s' + (consertou ? ' · saiu do caderno de erros' : '') + '</span>' +
      '<p class="just">' + esc(q.justificativa) + '</p>' +
      '<p class="agenda">' + textoAgenda(it, resultado) + '</p>' +
      '<div class="acoes"><button class="btn prim" id="btn-prox">' + (fim ? 'Ver resultado' : 'Próximo item') + ' ' + ic('seta') + '</button>' +
      (fim ? '' : '<button class="btn" id="btn-fim">Encerrar e ver desempenho</button>') +
      '<button class="btn sec" id="btn-ouvir">Ouvir de novo</button><button class="btn sec" id="btn-calar">Parar leitura</button></div></section>';

    if (resultado === 'C') { somAcerto(combo); vibrar(18); }
    else if (resultado === 'E' || marcada === 'T') {
      somErro(); vibrar([40, 60, 40]);
      var folha = document.getElementById('folha');
      if (folha && !reduzMov) folha.classList.add('treme');
    }
    var textoFala = fala + ' O gabarito é ' + gabTxt + '.' + (P.cfg.lerJust ? ' ' + q.justificativa : '');
    setTimeout(function () { if (tela === 'jogo') falar(textoFala); }, resultado === 'B' ? 60 : 340);

    document.getElementById('btn-prox').addEventListener('click', proxima);
    var bf = document.getElementById('btn-fim'); if (bf) bf.addEventListener('click', encerrar);
    document.getElementById('btn-ouvir').addEventListener('click', function () { falar(textoFala); });
    document.getElementById('btn-calar').addEventListener('click', calarVoz);
    teclaAtual = function (k) { if (k === 'enter' || k === 'n' || k === 'arrowright') { proxima(); return true; } return false; };
    document.getElementById('btn-prox').focus({ preventScroll: true });
    area.scrollIntoView({ behavior: reduzMov ? 'auto' : 'smooth', block: 'nearest' });
  }

  /* ================= discursiva ================= */
  var CHARS_LINHA = 75;
  function contarLinhas(txt) {
    var total = 0;
    txt.split('\n').forEach(function (p) { total += Math.max(1, Math.ceil(p.length / CHARS_LINHA)); });
    return txt.trim() ? total : 0;
  }
  function telaDiscursiva(d) {
    var max = d.quesitos.reduce(function (a, q) { return a + q.pts; }, 0);
    var anteriores = P.disc.filter(function (x) { return x.id === d.id; });
    var melhor = anteriores.length ? Math.max.apply(null, anteriores.map(function (x) { return x.total / x.max; })) : null;
    var quesitos = d.quesitos.map(function (q) {
      return '<li>' + esc(q.txt) + ' <span class="pts">[valor: ' + fmt(q.pts) + ' ponto' + (q.pts > 1 ? 's' : '') + ']</span></li>';
    }).join('');
    app.innerHTML = '<div class="hud"><button class="hud-sair" id="btn-sair" aria-label="Encerrar treino">' + ic('x') + '<span>Encerrar</span></button>' +
      '<span class="rot" style="flex:1">Discursiva · ' + esc(nomeTema[d.tema]) + ' · até ' + d.linhas + ' linhas · ' + fmt(max) + ' pts' + (melhor != null ? ' · sua melhor nota: ' + Math.round(melhor * 100) + '%' : '') + '</span></div>' +
      '<article class="folha">' +
      '<span class="fonte"><span>' + esc(d.fonte) + '</span></span>' +
      '<div class="contexto">' + esc(d.texto) + '</div>' +
      '<p class="enunciado">' + esc(d.comando) + ' Ao elaborar seu texto, aborde os seguintes aspectos:</p>' +
      '<ol class="quesitos">' + quesitos + '</ol>' +
      '<label class="rot" for="resp-disc">Texto definitivo</label>' +
      '<textarea id="resp-disc" spellcheck="true" placeholder="Escreva aqui sua resposta..."></textarea>' +
      '<div class="info-texto"><span id="linhas">0 de ' + d.linhas + ' linhas (estimativa)</span><span id="relogio">tempo: 00:00 · referência de prova: 60 min por questão</span></div>' +
      '<div class="acoes"><button class="btn prim" id="btn-enviar">Enviar resposta e ver o padrão</button></div>' +
      '</article><div id="area-correcao"></div>';

    document.getElementById('btn-sair').addEventListener('click', encerrar);
    var ta = document.getElementById('resp-disc'), t0 = Date.now();
    relogioDisc = setInterval(function () {
      var seg = Math.floor((Date.now() - t0) / 1000), el = document.getElementById('relogio');
      if (el) { el.textContent = 'tempo: ' + mmss(seg) + ' · referência de prova: 60 min por questão'; el.className = seg > 3600 ? 'excesso' : ''; }
    }, 1000);
    ta.addEventListener('input', function () {
      var n = contarLinhas(ta.value), el = document.getElementById('linhas');
      el.textContent = n + ' de ' + d.linhas + ' linhas (estimativa)' + (n > d.linhas ? ' · excede o limite' : '');
      el.className = n > d.linhas ? 'excesso' : '';
    });
    document.getElementById('btn-enviar').addEventListener('click', function () {
      iniciarAudio(); pararTimers();
      avaliarDiscursiva(d, ta.value, Math.round((Date.now() - t0) / 1000));
    });
    teclaAtual = function () { return false; };
    window.scrollTo(0, 0);
  }
  function termosEncontrados(texto, q) {
    var n = normalizar(texto);
    return q.chaves.map(function (k) {
      var re; try { re = new RegExp(normalizar(k)); } catch (e) { re = null; }
      var achou = re ? re.test(n) : n.indexOf(normalizar(k)) >= 0;
      var rotulo = normalizar(k).split('|')[0].replace(/\\b/g, '').replace(/\\/g, '').replace(/\./g, "'");
      return { rotulo: rotulo, achou: achou };
    });
  }
  var FRACOES = [0, 0.25, 0.5, 0.75, 1];
  function sugerirFracao(termos, texto) {
    if (!texto.trim()) return 0;
    var achados = termos.filter(function (t) { return t.achou; }).length;
    var r = achados / Math.max(1, Math.ceil(termos.length * 0.6));
    if (r >= 1) return 1; if (r >= 0.7) return 0.75; if (r >= 0.4) return 0.5; if (r > 0) return 0.25; return 0;
  }
  function avaliarDiscursiva(d, texto, tempo) {
    document.getElementById('resp-disc').readOnly = true;
    document.getElementById('btn-enviar').hidden = true;
    var max = d.quesitos.reduce(function (a, q) { return a + q.pts; }, 0);
    var reg = { d: d, texto: texto, tempo: tempo, fracoes: [], total: 0, max: max, xp: 0, fechada: false };
    var blocos = d.quesitos.map(function (q, i) {
      var termos = termosEncontrados(texto, q);
      var f = sugerirFracao(termos, texto);
      reg.fracoes[i] = f;
      var chips = termos.map(function (t) { return '<span class="chip' + (t.achou ? ' achou' : '') + '">' + esc(t.rotulo) + '</span>'; }).join('');
      var opts = FRACOES.map(function (fr) {
        return '<option value="' + fr + '"' + (fr === f ? ' selected' : '') + '>' + fmt(fr * q.pts) + ' (' + (fr * 100) + '%)</option>';
      }).join('');
      return '<div class="quesito-av"><header><h3>' + (i + 1) + '. ' + esc(q.txt) + '</h3><span class="rot">valor ' + fmt(q.pts) + '</span></header>' +
        '<p><strong>Padrão de resposta:</strong> ' + esc(q.padrao) + '</p>' +
        '<div class="chips" aria-label="Termos-chave">' + chips + '</div>' +
        '<label class="nota-q" for="nota-' + i + '">Sua nota neste quesito <select id="nota-' + i + '" data-i="' + i + '">' + opts + '</select></label></div>';
    }).join('');
    sessao.discursivas.push(reg);
    var registro = { id: d.id, data: Date.now(), total: 0, max: max };
    P.disc.push(registro);
    if (P.disc.length > 60) P.disc = P.disc.slice(-60);
    function recalcular() {
      reg.total = d.quesitos.reduce(function (a, q, i) { return a + q.pts * reg.fracoes[i]; }, 0);
      registro.total = reg.total;
      salvar();
      var el = document.getElementById('total-disc');
      if (el) el.textContent = 'Nota estimada: ' + fmt(reg.total) + ' de ' + fmt(max) + ' (' + pct(reg.total, max) + '%)';
    }
    var area = document.getElementById('area-correcao');
    area.innerHTML = '<section class="correcao" aria-live="polite">' +
      '<div class="veredito"><h2>Resposta registrada</h2><span class="total-disc" id="total-disc"></span></div>' +
      '<div class="avaliacao"><p class="vazio-msg">Compare seu texto com o padrão de resposta. Os termos em verde aparecem no seu texto; a nota sugerida vem deles e você pode ajustá-la em cada quesito. A nota vira XP ao sair desta tela.</p>' + blocos + '</div>' +
      '<div class="acoes"><button class="btn prim" id="btn-prox">Próxima discursiva ' + ic('seta') + '</button>' +
      '<button class="btn" id="btn-fim">Encerrar e ver desempenho</button></div></section>';
    area.querySelectorAll('select[data-i]').forEach(function (sel) {
      sel.addEventListener('change', function () { reg.fracoes[+sel.getAttribute('data-i')] = parseFloat(sel.value); recalcular(); });
    });
    recalcular();
    var faltas = d.quesitos.filter(function (q, i) { return reg.fracoes[i] < 0.5; }).map(function (q) { return q.txt; });
    falar('Resposta registrada. Nota estimada: ' + fmt(reg.total, 1).replace(',', ' vírgula ') + ' de ' + fmt(max, 1).replace(',', ' vírgula ') + ' pontos.' +
      (texto.trim() ? (faltas.length ? ' Reforce os quesitos: ' + faltas.join('; ') + '.' : ' Todos os quesitos foram abordados.') : ' O texto ficou em branco.'));
    function fechar(depois) {
      if (!reg.fechada) {
        reg.fechada = true;
        reg.xp = texto.trim() ? Math.round(300 * reg.total / max) : 0;
        ganharXP(reg.xp, 'Discursivas');
        fecharRodada();
      }
      depois();
    }
    sessao.fecharDisc = function () { fechar(function () { /* só credita */ }); };
    document.getElementById('btn-prox').addEventListener('click', function () { fechar(proxima); });
    document.getElementById('btn-fim').addEventListener('click', function () { fechar(encerrar); });
    teclaAtual = function () { return false; };
    area.scrollIntoView({ behavior: reduzMov ? 'auto' : 'smooth', block: 'start' });
  }

  /* ================= resultado e desempenho ================= */
  function finalizar() {
    var s = sessao;
    if (s.finalizada) return s.final;
    s.finalizada = true;
    if (s.fecharDisc) s.fecharDisc();
    var f = { estrelas: 0, completa: false, primeira: false, novoRecorde: false };
    var J = P.jogo, rs = s.respostas;
    rolarDia();
    f.completa = s.finita && rs.length >= s.fila.length;
    if (s.modo === 'fase') {
      var n = s.fila.length;
      f.completa = rs.length >= n && s.vidas > 0;
      var falhas = n - s.acertos;
      f.estrelas = f.completa ? (falhas === 0 ? 3 : falhas === 1 ? 2 : falhas === 2 ? 1 : 0) : 0;
      if (f.estrelas > 0) {
        var ant = J.estrelas[s.tema][s.faseIdx];
        f.primeira = ant === 0;
        J.estrelas[s.tema][s.faseIdx] = Math.max(ant, f.estrelas);
        if (f.primeira) { J.stats.fases++; ganharXP(200, 'Andar novo'); }
        J.dia.fases++;
        if (f.estrelas === 3) { J.stats.perfeitas++; J.dia.perfeitas++; }
        ganharXP(100 * f.estrelas, 'Bônus de estrelas');
      }
    } else if (s.modo === 'maratona') {
      if (s.pontos > J.recorde) { f.novoRecorde = true; J.recorde = s.pontos; }
      J.recordeAcertos = Math.max(J.recordeAcertos, s.acertos);
    } else if (s.modo === 'desafio') {
      if (f.completa && !J.dia.desafio) {
        J.dia.desafio = { acertos: s.acertos, pontos: s.pontos };
        J.stats.desafios++;
        ganharXP(300, 'Bônus do desafio');
      }
    } else if (s.modo === 'simulado' && rs.length) {
      var ceC = rs.filter(function (r) { return r.resultado === 'C'; }).length;
      var ceE = rs.filter(function (r) { return r.resultado === 'E'; }).length;
      var brancos = s.fila.length - ceC - ceE;
      P.simulados.push({ data: Date.now(), total: s.fila.length, c: ceC, e: ceE, b: brancos, liq: ceC - ceE, min: Math.max(1, Math.round((Date.now() - s.inicio) / 60000)) });
      if (P.simulados.length > 40) P.simulados = P.simulados.slice(-40);
      J.dia.acertos += ceC;
      if (f.completa) J.stats.simulados++;
      ganharXP(60 * ceC, 'Acertos no simulado');
    }
    fecharRodada();
    s.final = f;
    return f;
  }
  function blocoDesempenho() {
    var s = sessao, simulado = s.modo === 'simulado', rs = s.respostas;
    if (!rs.length) return { html: '', erros: [] };
    var c = 0, e = 0, b = 0;
    rs.forEach(function (r) { if (r.resultado === 'C') c++; else if (r.resultado === 'E') e++; else b++; });
    if (simulado) b += s.fila.length - rs.length;
    var total = simulado ? s.fila.length : rs.length;
    var ce = rs.filter(function (r) { return r.q.tipo === 'CE'; });
    var ceC = ce.filter(function (r) { return r.resultado === 'C'; }).length;
    var ceE = ce.filter(function (r) { return r.resultado === 'E'; }).length;
    var liquida = ceC - ceE;
    var chC = rs.filter(function (r) { return r.q.tipo === 'CE' && !r.certeza && r.resultado === 'C'; }).length;
    var chE = rs.filter(function (r) { return r.q.tipo === 'CE' && !r.certeza && r.resultado === 'E'; }).length;
    var tempoMedio = Math.round(rs.reduce(function (a, r) { return a + r.tempo; }, 0) / rs.length);
    var linhasTema = TEMAS.map(function (t) {
      var r = rs.filter(function (x) { return x.q.tema === t.id; });
      if (!r.length) return '';
      var ct = r.filter(function (x) { return x.resultado === 'C'; }).length;
      var et = r.filter(function (x) { return x.resultado === 'E'; }).length;
      var pc = pct(ct, r.length);
      return '<tr><td>' + esc(t.nome) + '</td><td class="num">' + r.length + '</td><td class="num">' + ct + '</td><td class="num">' + et + '</td>' +
        '<td class="num">' + pc + '%</td><td class="col-opc"><div class="barra"><i class="' + (pc < 50 ? 'baixo' : pc < 70 ? 'medio' : '') + '" style="width:' + pc + '%"></i></div></td></tr>';
    }).join('');
    var erros = rs.filter(function (r) { return r.resultado !== 'C'; });
    var revisao = erros.map(function (r) {
      var sua = r.marcada === 'T' ? 'tempo esgotado' : r.marcada === 'B' ? 'em branco' : (r.q.tipo === 'CE' ? (r.marcada === 'C' ? 'Certo' : 'Errado') : r.marcada);
      return '<details class="item"><summary>' + esc(r.q.enunciado.length > 140 ? r.q.enunciado.slice(0, 137) + '…' : r.q.enunciado) +
        ' <span class="dado">· ' + esc(rotGab(r.q)) + ' · você: ' + esc(sua) + (r.certeza ? '' : ' (chute)') + '</span></summary>' +
        (r.q.contexto ? '<p><em>' + esc(r.q.contexto) + '</em></p>' : '') +
        (r.q.figura ? '<div class="figura">' + figura(r.q.figura) + '</div>' : '') +
        '<p>' + esc(r.q.enunciado) + '</p><p><strong>Justificativa:</strong> ' + esc(r.q.justificativa) + '</p>' +
        '<p class="dado">' + esc(r.q.fonte) + '</p></details>';
    }).join('');
    var chuteNota = (chC + chE) ? '<p class="intro">Chutes nesta sessão: ' + chC + ' certos e ' + chE + ' errados. ' +
      (chC > chE ? 'Arriscar rendeu ' + (chC - chE) + ' ponto(s) líquido(s).' : chC === chE ? 'Arriscar não mudou a nota.' : 'Deixar esses itens em branco teria rendido ' + (chE - chC) + ' ponto(s) a mais.') + '</p>' : '';
    var duracao = Math.max(1, Math.round((Date.now() - s.inicio) / 60000));
    var html = '<section class="bloco"><span class="rot">' + (simulado ? 'Resultado do simulado' : 'Desempenho no treino') + ' · ' + esc(s.rotulo) + ' · ' + duracao + ' min</span><div class="kpis">' +
      '<div class="kpi"><span class="rot">Aproveitamento</span><strong>' + pct(c, total) + '%</strong><small>' + c + ' de ' + total + ' itens</small></div>' +
      '<div class="kpi c"><span class="rot">Acertos</span><strong>' + c + '</strong><small>tempo médio ' + tempoMedio + ' s</small></div>' +
      '<div class="kpi e"><span class="rot">Erros</span><strong>' + e + '</strong><small>' + b + ' em branco ou sem tempo</small></div>' +
      '<div class="kpi' + (liquida < 0 ? ' e' : '') + '"><span class="rot">Nota líquida C/E</span><strong>' + (liquida > 0 ? '+' : '') + liquida + '</strong><small>' + ceC + ' certos − ' + ceE + ' errados</small></div>' +
      '</div>' + chuteNota + '</section>' +
      '<section class="bloco"><span class="rot">Por tema</span><div class="tabela-wrap"><table><thead><tr><th>Tema</th><th class="num">Itens</th><th class="num">Certos</th><th class="num">Errados</th><th class="num">%</th><th class="col-opc">Acerto</th></tr></thead><tbody>' + linhasTema + '</tbody></table></div></section>' +
      '<section class="bloco"><span class="rot">Revisão · ' + erros.length + ' item(ns) errado(s), em branco ou sem tempo · já estão no caderno de erros</span><div class="revisao">' + (revisao || '<p class="vazio-msg">Nenhum erro neste bloco.</p>') + '</div>' +
      (erros.length ? '<div class="acoes"><button class="btn" id="btn-refazer">Refazer os ' + erros.length + ' erros agora</button></div>' : '') + '</section>';
    return { html: html, erros: erros };
  }
  function estrelonas(n) {
    var s = '';
    for (var i = 1; i <= 3; i++) s += '<svg viewBox="0 0 24 24" fill="currentColor" class="' + (i <= n ? 'on' : '') + '" aria-hidden="true">' + IC.estrela + '</svg>';
    return '<div class="estrelonas" role="img" aria-label="' + n + ' de 3 estrelas">' + s + '</div>';
  }
  function telaResultado() {
    pararTimers(); calarVoz();
    if (!sessao) { telaInicio(); return; }
    var s = sessao;
    if (!s.respostas.length && !s.discursivas.length) { telaInicio(); return; }
    limparToasts();
    semToast = true;
    var f;
    try { f = finalizar(); } finally { semToast = false; }
    tela = 'resultado';
    var resp = s.respostas.length, topo = '', fala = '', festa = false, botoes = '';
    var btnCanteiro = '<button class="btn sec" id="r-inicio">' + ic('voltar') + 'Canteiro</button>';
    var nErros = cadernoErros().length;

    if (s.modo === 'fase') {
      var temProx = s.faseIdx + 1 < FASES[s.tema].length;
      if (f.estrelas > 0) {
        topo = estrelonas(f.estrelas) + '<h2>' + (f.primeira ? 'Andar concluído!' : 'Fase concluída!') + '</h2>' +
          '<p class="sub">' + esc(s.rotulo) + ' · ' + s.acertos + ' de ' + s.fila.length + ' itens certos' + (f.estrelas === 3 ? '' : '. Sem erros, o andar ganha 3 estrelas.') + '</p>';
        fala = 'Fase concluída com ' + f.estrelas + (f.estrelas === 1 ? ' estrela.' : ' estrelas.');
        festa = f.estrelas === 3;
        botoes = (temProx ? '<button class="btn prim" id="r-prox">Próxima fase ' + ic('seta') + '</button>' : '<button class="btn prim" id="r-tema">Ver o prédio ' + ic('seta') + '</button>') +
          (f.estrelas < 3 ? '<button class="btn" id="r-de-novo">Tentar 3 estrelas</button>' : '') + btnCanteiro;
      } else {
        var interrompida = s.vidas > 0 && resp < s.fila.length;
        topo = estrelonas(0) + '<h2>' + (interrompida ? 'Fase interrompida' : 'Andar reprovado') + '</h2>' +
          '<p class="sub">' + (interrompida ? 'Você saiu antes do fim, então o andar não foi contado.' : (s.vidas <= 0 ? 'Os 3 capacetes acabaram.' : 'Faltaram acertos para aprovar o andar.') + ' Leia as justificativas abaixo e tente de novo: os itens são os mesmos.') + '</p>';
        fala = interrompida ? 'Fase interrompida.' : 'Andar reprovado. Tente de novo.';
        botoes = '<button class="btn prim" id="r-de-novo">Tentar de novo ' + ic('seta') + '</button>' + btnCanteiro;
      }
    } else if (s.modo === 'maratona') {
      topo = '<span class="rot">Maratona · ' + s.acertos + ' de ' + resp + ' itens certos</span><div class="placarzao">' + fmtN(s.pontos) + '<small>PTS</small></div>' +
        '<span class="recorde' + (f.novoRecorde ? ' novo' : '') + '">' + (f.novoRecorde ? 'Novo recorde!' : 'recorde: ' + fmtN(P.jogo.recorde) + ' pts') + '</span>';
      fala = 'Fim da maratona. ' + s.acertos + ' acertos' + (f.novoRecorde ? '. Novo recorde!' : '.');
      festa = f.novoRecorde;
      botoes = '<button class="btn prim" id="r-de-novo">Jogar de novo ' + ic('seta') + '</button>' + btnCanteiro;
    } else if (s.modo === 'desafio') {
      topo = '<span class="rot">Desafio do dia</span><div class="placarzao">' + s.acertos + '<small>DE ' + s.fila.length + '</small></div>' +
        '<p class="sub">' + (f.completa ? 'Desafio concluído. Amanhã tem outro.' : 'Você saiu antes do fim. O desafio continua disponível hoje.') + '</p>';
      fala = f.completa ? 'Desafio do dia concluído, com ' + s.acertos + ' acertos.' : 'Desafio interrompido.';
      festa = f.completa && s.acertos >= 8;
      botoes = '<button class="btn prim" id="r-inicio2">Voltar ao canteiro ' + ic('seta') + '</button>';
    } else if (s.modo === 'simulado') {
      var liq = s.respostas.filter(function (r) { return r.resultado === 'C'; }).length - s.respostas.filter(function (r) { return r.resultado === 'E'; }).length;
      topo = '<span class="rot">' + esc(s.rotulo) + ' · nota líquida</span><div class="placarzao">' + (liq > 0 ? '+' : '') + liq + '<small>DE ' + s.fila.length + '</small></div>' +
        '<p class="sub">' + s.acertos + ' certos. No método Cebraspe, cada erro anulou um acerto.</p>';
      fala = 'Simulado entregue. Você acertou ' + s.acertos + ' de ' + s.fila.length + ' itens. Nota líquida no método Cebraspe: ' + liq + '.';
      festa = f.completa && liq >= s.fila.length * 0.6;
      botoes = '<button class="btn prim" id="r-inicio2">Voltar ao canteiro ' + ic('seta') + '</button>';
    } else if (s.modo === 'disc') {
      var somaT = 0, somaM = 0;
      var linhas = s.discursivas.map(function (x) {
        somaT += x.total; somaM += x.max;
        return '<tr><td>' + esc(x.d.comando.slice(0, 90)) + (x.d.comando.length > 90 ? '…' : '') + '</td><td class="num">' + fmt(x.total) + ' / ' + fmt(x.max) + '</td><td class="num">' + pct(x.total, x.max) + '%</td></tr>';
      }).join('');
      topo = '<span class="rot">Discursivas · nota total ' + fmt(somaT) + ' de ' + fmt(somaM) + '</span><div class="placarzao">' + pct(somaT, somaM) + '<small>% DA NOTA</small></div>' +
        '<div class="tabela-wrap" style="width:100%;text-align:left"><table><thead><tr><th>Proposta</th><th class="num">Nota</th><th class="num">%</th></tr></thead><tbody>' + linhas + '</tbody></table></div>';
      fala = 'Treino encerrado. Veja a nota das discursivas.';
      botoes = '<button class="btn prim" id="r-de-novo">Outra discursiva ' + ic('seta') + '</button>' + btnCanteiro;
    } else {
      topo = '<span class="rot">' + esc(s.rotulo) + '</span><div class="placarzao">' + s.acertos + '<small>DE ' + resp + '</small></div>' +
        '<p class="sub">' + pct(s.acertos, resp) + '% de aproveitamento' + (s.modo === 'erros' || s.modo === 'refazer' ? ' · restam ' + nErros + (nErros === 1 ? ' item' : ' itens') + ' no caderno de erros' : '') + '.</p>';
      fala = 'Treino encerrado. Você acertou ' + s.acertos + ' de ' + resp + ' itens.';
      festa = f.completa && resp >= 5 && s.acertos === resp;
      botoes = '<button class="btn prim" id="r-inicio2">Voltar ao canteiro ' + ic('seta') + '</button>' +
        (s.modo === 'inteligente' || s.modo === 'tema' ? '<button class="btn" id="r-de-novo">Outro bloco</button>' : '');
    }

    var chaves = Object.keys(s.ganhos), totalXP = 0;
    var ganhos = chaves.map(function (k) { totalXP += s.ganhos[k]; return '<div><span>' + esc(k) + '</span><span>+' + fmtN(s.ganhos[k]) + ' XP</span></div>'; }).join('');
    if (chaves.length) ganhos += '<div><span>Total do treino</span><span>+' + fmtN(totalXP) + ' XP</span></div>';
    var nv = nivelDe(P.jogo.xp), nv0 = nivelDe(s.xp0), deFrac = nv0.i === nv.i ? nv0.frac : 0;
    var feitos = s.eventos.filter(function (ev) { return ev.txt.indexOf('Promoção') !== 0; }).map(function (ev) {
      return '<span class="feito">' + ic(ev.icone) + esc(ev.txt) + '</span>';
    }).join('');
    var of = sequencia();
    var des = blocoDesempenho();

    app.innerHTML = '<section class="resultado">' + topo +
      (s.promocao ? '<div class="promo">Promoção: ' + esc(s.promocao) + '</div>' : '') +
      (feitos ? '<div class="feitos">' + feitos + '</div>' : '') +
      (ganhos ? '<div class="ganhos">' + ganhos + '</div>' : '') +
      '<div class="nivel-box"><div class="xp-legenda"><span>Nível ' + (nv.i + 1) + ' · ' + esc(nv.nome) + '</span><span>' + fmtN(P.jogo.xp) + ' XP</span></div>' +
      '<div class="barra-xp"><i id="r-barra" style="width:' + (deFrac * 100).toFixed(1) + '%"></i></div>' +
      '<div class="xp-legenda"><span>' + (combo >= 2 ? 'sequência de ' + combo + ' acertos continua valendo' : 'ofensiva: ' + of + (of === 1 ? ' dia' : ' dias')) + '</span><span>' + (nv.prox ? 'faltam ' + fmtN(nv.prox - P.jogo.xp) + ' XP' : 'nível máximo') + '</span></div></div>' +
      '<div class="acoes">' + botoes + '</div></section>' + des.html;

    setTimeout(function () { var b = document.getElementById('r-barra'); if (b) b.style.width = (nv.frac * 100).toFixed(1) + '%'; }, 80);
    if (s.modo === 'fase' && f.estrelas > 0) for (var i = 0; i < f.estrelas; i++) somEstrela(i);
    if (festa || s.promocao) { setTimeout(function () { confete(); somFanfarra(); vibrar([30, 40, 30, 40, 80]); }, s.modo === 'fase' ? 1150 : 250); }
    setTimeout(function () { if (tela === 'resultado') falar(fala); }, s.modo === 'fase' && f.estrelas ? 1500 : 400);

    function liga(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }
    liga('r-inicio', telaInicio); liga('r-inicio2', telaInicio);
    liga('r-prox', function () { iniciarSessao('fase', { tema: s.tema, fase: s.faseIdx + 1 }); });
    liga('r-tema', function () { telaTema(s.tema); });
    liga('r-de-novo', function () {
      if (s.modo === 'fase') iniciarSessao('fase', { tema: s.tema, fase: s.faseIdx });
      else if (s.modo === 'tema') iniciarSessao('tema', { tema: s.tema });
      else iniciarSessao(s.modo, { n: 20 });
    });
    liga('btn-refazer', function () { iniciarSessao('refazer', { fila: des.erros.map(function (r) { return r.q; }) }); });
    teclaAtual = function (k) {
      if (k !== 'enter') return false;
      var p = app.querySelector('.resultado .btn.prim'); if (p) p.click();
      return true;
    };
    var prim = app.querySelector('.resultado .btn.prim'); if (prim) prim.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  /* ================= teclado ================= */
  var teclaAtual = function () { return false; };
  document.addEventListener('keydown', function (ev) {
    if (ev.target && (ev.target.tagName === 'TEXTAREA' || ev.target.tagName === 'SELECT' || ev.target.tagName === 'INPUT' || ev.target.tagName === 'SUMMARY')) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var k = (ev.key || '').toLowerCase();
    if (k === 'enter' && ev.target && (ev.target.tagName === 'BUTTON' || (ev.target.getAttribute && ev.target.getAttribute('role') === 'button'))) return;
    if (teclaAtual(k)) ev.preventDefault();
  });

  rolarDia();
  telaInicio();
  conectarConta();
})();
