/* Treinador de questões — Analista Legislativo / Engenharia Civil (Câmara dos Deputados, Cebraspe) */
(function () {
  'use strict';

  var TEMPO = 60; // segundos por questão objetiva
  var app = document.getElementById('app');
  var TEMAS = window.TEMAS;
  var QUESTOES = window.QUESTOES;
  var DISC = window.DISCURSIVAS;
  var nomeTema = {};
  TEMAS.forEach(function (t) { nomeTema[t.id] = t.nome; });

  var cfg = { audio: true, lerJust: true };
  try {
    var salvo = JSON.parse(localStorage.getItem('treinador-cfg') || 'null');
    if (salvo) { cfg.audio = !!salvo.audio; cfg.lerJust = !!salvo.lerJust; }
  } catch (e) { /* armazenamento indisponível */ }
  function salvarCfg() { try { localStorage.setItem('treinador-cfg', JSON.stringify(cfg)); } catch (e) { /* ignora */ } }

  var sessao = null;   // estado do treino em andamento
  var timer = null;
  var relogioDisc = null;

  /* ---------------- utilidades ---------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function embaralhar(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function normalizar(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function fmt(n, casas) { return n.toFixed(casas == null ? 2 : casas).replace('.', ','); }
  function rotGab(q) { return q.tipo === 'CE' ? (q.gabarito === 'C' ? 'Certo' : 'Errado') : 'Letra ' + q.gabarito; }
  function pararTimers() {
    if (timer) { clearInterval(timer); timer = null; }
    if (relogioDisc) { clearInterval(relogioDisc); relogioDisc = null; }
  }

  /* ---------------- áudio: voz + sinal sonoro ---------------- */
  var ctxAudio = null;
  var vozPt = null;
  function escolherVoz() {
    if (!('speechSynthesis' in window)) return;
    var vozes = window.speechSynthesis.getVoices() || [];
    vozPt = vozes.filter(function (v) { return /^pt(-|_)BR/i.test(v.lang); })[0] ||
            vozes.filter(function (v) { return /^pt/i.test(v.lang); })[0] || null;
  }
  if ('speechSynthesis' in window) {
    escolherVoz();
    window.speechSynthesis.onvoiceschanged = escolherVoz;
  }
  function falar(texto) {
    if (!cfg.audio || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(texto);
      u.lang = 'pt-BR';
      if (vozPt) u.voice = vozPt;
      u.rate = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* sem síntese de voz */ }
  }
  function calarVoz() { try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (e) { /* ignora */ } }
  function iniciarAudio() {
    if (ctxAudio) return;
    try { var C = window.AudioContext || window.webkitAudioContext; if (C) ctxAudio = new C(); } catch (e) { ctxAudio = null; }
  }
  function tom(freqs, dur, tipo) {
    if (!cfg.audio || !ctxAudio) return;
    try {
      var t0 = ctxAudio.currentTime;
      freqs.forEach(function (f, i) {
        var o = ctxAudio.createOscillator();
        var g = ctxAudio.createGain();
        o.type = tipo || 'sine';
        o.frequency.value = f;
        var ini = t0 + i * dur;
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(0.18, ini + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
        o.connect(g); g.connect(ctxAudio.destination);
        o.start(ini); o.stop(ini + dur + 0.02);
      });
    } catch (e) { /* ignora */ }
  }
  function somAcerto() { tom([660, 990], 0.14, 'sine'); }
  function somErro() { tom([220, 165], 0.2, 'square'); }
  function somTick() { tom([880], 0.05, 'sine'); }

  /* ---------------- figuras ---------------- */
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
    for (var i = 0; i <= 40; i++) {
      var s = i / 40;
      d += (i ? ' L' : 'M') + (x0 + s * largura).toFixed(1) + ',' + (y0 + fn(s) * escala).toFixed(1);
    }
    return d;
  }
  function figVigas() {
    var setas = function (x0) {
      var s = '';
      for (var i = 0; i <= 5; i++) { var x = x0 + i * 36; s += '<line x1="' + x + '" y1="22" x2="' + x + '" y2="46" stroke="currentColor" stroke-width="1.3" marker-end="url(#seta2)"/>'; }
      return '<line x1="' + x0 + '" y1="22" x2="' + (x0 + 180) + '" y2="22" stroke="currentColor"/>' + s +
        '<text x="' + (x0 + 90) + '" y="15" font-size="12" text-anchor="middle">p</text>';
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
      '<text x="214" y="100" font-size="12">M2</text>' +
      '<text x="262" y="112" font-size="12">M3</text>' +
      '<text x="372" y="190" font-size="12">M4</text>' +
      '<line x1="' + aX.toFixed(1) + '" y1="' + (base + 12) + '" x2="470" y2="' + (base + 12) + '" stroke="currentColor" stroke-width=".8"/>' +
      '<line x1="' + aX.toFixed(1) + '" y1="' + (base + 6) + '" x2="' + aX.toFixed(1) + '" y2="' + (base + 18) + '" stroke="currentColor" stroke-width=".8"/>' +
      '<text x="' + (aX + 12).toFixed(1) + '" y="' + (base + 28) + '" font-size="12">a</text>' +
      '<text x="250" y="214" font-size="10.5" text-anchor="middle">diagramas com momentos positivos para baixo</text>' +
      '</svg>';
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
      arco('V', 'W', 'a7 ; t=6', 0, 22) + arco('W', 'F', 'a8 ; t=2', 0, 22) + nos +
      '</svg>';
  }
  function figura(nome) {
    if (nome === 'portico') return figPortico();
    if (nome === 'vigas') return figVigas();
    if (nome === 'rede') return figRede();
    return '';
  }

  /* ---------------- carimbo ---------------- */
  function carimbo(folha, faixa) {
    return '<header class="carimbo">' +
      '<div class="titulo"><h1>Treinador de Questões · Engenharia Civil</h1>' +
      '<div class="sub">Câmara dos Deputados · Analista Legislativo · Cargo 6 · banca Cebraspe</div></div>' +
      '<div class="folha-n"><span class="rot">Folha</span><strong>' + esc(folha) + '</strong></div>' +
      (faixa ? '<div class="faixa">' + faixa + '</div>' : '') +
      '</header>';
  }

  /* ---------------- tela inicial ---------------- */
  function contarTema(id) { return QUESTOES.filter(function (q) { return q.tema === id; }).length; }
  function telaInicio() {
    pararTimers(); calarVoz();
    sessao = null;
    var temas = TEMAS.map(function (t) {
      return '<button class="btn-tema" data-modo="tema" data-tema="' + t.id + '">' +
        '<span class="nome">' + esc(t.nome) + '</span>' +
        '<span class="meta"><span>edital ' + esc(t.edital) + '</span><span>' + contarTema(t.id) + ' itens</span></span></button>';
    }).join('');
    var nCD = QUESTOES.filter(function (q) { return /^CD/.test(q.id); }).length;
    app.innerHTML = carimbo('00', '<span>Banco: <b>' + QUESTOES.length + '</b> itens objetivos</span><span>Câmara 2003: <b>' + nCD + '</b></span><span>Discursivas: <b>' + DISC.length + '</b></span><span>Tempo por item: <b>' + TEMPO + ' s</b></span>') +
      '<p class="intro">Escolha o treino. As questões objetivas aparecem uma a uma, com ' + TEMPO + ' segundos para responder. Depois de cada resposta, o treinador diz se você acertou, em texto e em voz, e explica o gabarito.</p>' +
      '<section class="bloco"><span class="rot">Treino completo</span><div class="destaques">' +
      '<button class="btn-tema grande" data-modo="todos"><span class="nome">Qualquer tema</span><span class="desc">Itens sorteados de todo o conteúdo específico do edital.</span><span class="meta"><span>objetivas</span><span>' + QUESTOES.length + ' itens</span></span></button>' +
      '<button class="btn-tema grande discursiva" data-modo="disc"><span class="nome">Questão discursiva</span><span class="desc">Texto livre com padrão de resposta e autoavaliação por quesito.</span><span class="meta"><span>sem limite de tempo</span><span>' + DISC.length + ' propostas</span></span></button>' +
      '</div></section>' +
      '<section class="bloco"><span class="rot">Por tema do edital (item 14.2.4, Cargo 6)</span><div class="opcoes-treino">' + temas + '</div></section>' +
      '<div class="ajustes">' +
      '<label><input type="checkbox" id="opt-audio"' + (cfg.audio ? ' checked' : '') + '> Correção em áudio</label>' +
      '<label><input type="checkbox" id="opt-just"' + (cfg.lerJust ? ' checked' : '') + '> Ler a justificativa em voz alta</label>' +
      '</div>' +
      '<p class="nota-metodo">Nos itens Certo/Errado vale o método Cebraspe: cada erro anula um acerto, e deixar em branco não pontua nem desconta. O resumo final mostra essa nota líquida.</p>';

    document.getElementById('opt-audio').addEventListener('change', function (e) { cfg.audio = e.target.checked; salvarCfg(); if (!cfg.audio) calarVoz(); });
    document.getElementById('opt-just').addEventListener('change', function (e) { cfg.lerJust = e.target.checked; salvarCfg(); });
    app.querySelectorAll('[data-modo]').forEach(function (b) {
      b.addEventListener('click', function () {
        iniciarAudio();
        iniciarSessao(b.getAttribute('data-modo'), b.getAttribute('data-tema'));
      });
    });
    window.scrollTo(0, 0);
  }

  /* ---------------- sessão ---------------- */
  function iniciarSessao(modo, tema) {
    var fila;
    if (modo === 'disc') fila = embaralhar(DISC);
    else if (modo === 'tema') fila = embaralhar(QUESTOES.filter(function (q) { return q.tema === tema; }));
    else fila = embaralhar(QUESTOES);
    sessao = {
      modo: modo, tema: tema || null, fila: fila, pos: 0, inicio: Date.now(),
      respostas: [],      // objetivas: {q, marcada, resultado: 'C'|'E'|'B', tempo}
      discursivas: [],    // {d, texto, notas[], total, max}
      voltas: 0
    };
    proxima();
  }
  function rotuloModo() {
    if (!sessao) return '';
    if (sessao.modo === 'disc') return 'Discursiva';
    if (sessao.modo === 'tema') return nomeTema[sessao.tema];
    return 'Qualquer tema';
  }
  function proxima() {
    pararTimers(); calarVoz();
    if (sessao.pos >= sessao.fila.length) {
      sessao.fila = embaralhar(sessao.fila);
      sessao.pos = 0;
      sessao.voltas++;
    }
    var item = sessao.fila[sessao.pos++];
    if (sessao.modo === 'disc') telaDiscursiva(item); else telaQuestao(item);
  }
  function numFolha() {
    var n = sessao.respostas.length + sessao.discursivas.length + 1;
    return (n < 10 ? '0' : '') + n;
  }
  function placar() {
    var c = 0, e = 0, b = 0;
    sessao.respostas.forEach(function (r) { if (r.resultado === 'C') c++; else if (r.resultado === 'E') e++; else b++; });
    return { c: c, e: e, b: b };
  }
  function barraSup() {
    var p = placar();
    var aviso = sessao.voltas ? ' · banco reiniciado' : '';
    return '<div class="barra-sup"><span class="rot">' + esc(rotuloModo()) + aviso + '</span>' +
      (sessao.modo === 'disc' ? '' : '<span class="placar"><span class="c">✓ ' + p.c + '</span><span class="e">✗ ' + p.e + '</span><span class="b">○ ' + p.b + '</span></span>') +
      '<button class="btn-link" id="btn-encerrar-topo">Encerrar treino</button></div>';
  }

  /* ---------------- escala gráfica (cronômetro) ---------------- */
  function escalaSVG() {
    var w = 600, x0 = 4, larg = w - 8, h = 14, y = 4, t = '';
    for (var i = 0; i < TEMPO; i++) {
      var x = x0 + (larg * i) / TEMPO, wi = larg / TEMPO;
      t += '<rect class="' + (i % 2 ? 'vazio' : 'vazio') + '" x="' + x.toFixed(2) + '" y="' + y + '" width="' + wi.toFixed(2) + '" height="' + (i % 5 === 0 ? h : h - 5) + '"/>';
    }
    var nums = '';
    for (var k = 0; k <= TEMPO; k += 10) nums += '<text x="' + (x0 + (larg * k) / TEMPO).toFixed(1) + '" y="32" text-anchor="middle">' + k + '</text>';
    return '<svg viewBox="0 0 ' + w + ' 36" preserveAspectRatio="none" aria-hidden="true">' + t +
      '<rect id="esc-cheio" class="cheio" x="' + x0 + '" y="' + y + '" width="' + larg + '" height="' + h + '"/>' + nums + '</svg>';
  }
  function atualizarEscala(rest) {
    var cheio = document.getElementById('esc-cheio');
    var seg = document.getElementById('seg');
    if (!cheio || !seg) return;
    var larg = 592;
    cheio.setAttribute('width', ((larg * rest) / TEMPO).toFixed(2));
    var alerta = rest <= 10;
    cheio.setAttribute('class', 'cheio' + (alerta ? ' alerta' : ''));
    seg.textContent = (rest < 10 ? '0' : '') + rest + ' s';
    seg.className = 'seg' + (alerta ? ' alerta' : '');
  }

  /* ---------------- questão objetiva ---------------- */
  function telaQuestao(q) {
    var faixa = '<span>Tema: <b>' + esc(nomeTema[q.tema]) + '</b></span><span>Tipo: <b>' + (q.tipo === 'CE' ? 'Certo/Errado' : 'Múltipla escolha') + '</b></span>';
    var resp;
    if (q.tipo === 'CE') {
      resp = '<div class="respostas-ce">' +
        '<button class="btn-resp" data-r="C">Certo <kbd>C</kbd></button>' +
        '<button class="btn-resp" data-r="E">Errado <kbd>E</kbd></button></div>' +
        '<button class="btn-branco" data-r="B">Deixar em branco</button>';
    } else {
      resp = '<div class="respostas-me">' + ['A', 'B', 'C', 'D', 'E'].map(function (l) {
        return '<button class="opcao" data-r="' + l + '"><span class="letra">' + l + '</span><span>' + esc(q.opcoes[l]) + '</span></button>';
      }).join('') + '</div><button class="btn-branco" data-r="B">Deixar em branco</button>';
    }
    app.innerHTML = carimbo(numFolha(), faixa) + barraSup() +
      '<div class="escala"><div class="escala-topo"><span class="rot">Tempo restante · escala 1:' + TEMPO + '</span><span class="seg dado" id="seg">' + TEMPO + ' s</span></div>' + escalaSVG() + '</div>' +
      '<article class="folha" id="folha">' +
      '<span class="fonte">' + esc(q.fonte) + '</span>' +
      (q.contexto ? '<div class="contexto">' + esc(q.contexto) + '</div>' : '') +
      (q.figura ? '<div class="figura">' + figura(q.figura) + '</div>' : '') +
      '<p class="enunciado">' + esc(q.enunciado) + '</p>' + resp +
      '</article><div id="area-correcao"></div>';

    document.getElementById('btn-encerrar-topo').addEventListener('click', telaResumo);
    var t0 = Date.now();
    var restante = TEMPO;
    var respondida = false;
    function responder(r) {
      if (respondida) return;
      respondida = true;
      pararTimers();
      corrigir(q, r, Math.min(TEMPO, Math.round((Date.now() - t0) / 1000)));
    }
    app.querySelectorAll('[data-r]').forEach(function (b) {
      b.addEventListener('click', function () { iniciarAudio(); responder(b.getAttribute('data-r')); });
    });
    teclaAtual = function (k) {
      if (respondida) return false;
      if (q.tipo === 'CE' && (k === 'c' || k === 'e')) { responder(k.toUpperCase()); return true; }
      if (q.tipo === 'ME' && /^[a-e]$/.test(k)) { responder(k.toUpperCase()); return true; }
      return false;
    };
    atualizarEscala(restante);
    timer = setInterval(function () {
      restante--;
      atualizarEscala(Math.max(0, restante));
      if (restante <= 5 && restante > 0) somTick();
      if (restante <= 0) responder('T');
    }, 1000);
    window.scrollTo(0, 0);
  }

  function corrigir(q, marcada, tempo) {
    var resultado;
    if (marcada === 'B' || marcada === 'T') resultado = 'B';
    else resultado = marcada === q.gabarito ? 'C' : 'E';
    sessao.respostas.push({ q: q, marcada: marcada, resultado: resultado, tempo: tempo });

    // marca visualmente as opções
    app.querySelectorAll('[data-r]').forEach(function (b) {
      var r = b.getAttribute('data-r');
      b.disabled = true;
      if (r === q.gabarito) b.classList.add('gab');
      if (r === marcada && r !== 'B') b.classList.add('escolhida');
      if (q.tipo === 'ME' && r === marcada && r !== q.gabarito) b.classList.add('marcada-errada');
    });
    var br = app.querySelector('.btn-branco'); if (br) br.hidden = true;

    var titulo, classe, fala;
    if (marcada === 'T') { titulo = 'Tempo esgotado'; classe = 'branco'; fala = 'Tempo esgotado.'; }
    else if (marcada === 'B') { titulo = 'Item deixado em branco'; classe = 'branco'; fala = 'Item em branco.'; }
    else if (resultado === 'C') { titulo = 'Resposta correta'; classe = 'ok'; fala = 'Resposta correta!'; }
    else { titulo = 'Resposta errada'; classe = 'erro'; fala = 'Resposta errada.'; }
    var gabTxt = q.tipo === 'CE' ? (q.gabarito === 'C' ? 'Certo' : 'Errado') : 'letra ' + q.gabarito;
    var sua = (marcada === 'T' || marcada === 'B') ? '—' : (q.tipo === 'CE' ? (marcada === 'C' ? 'Certo' : 'Errado') : marcada);

    var area = document.getElementById('area-correcao');
    area.innerHTML = '<section class="correcao ' + classe + '" aria-live="polite">' +
      '<div class="veredito"><h2>' + titulo + '</h2><span class="gabarito">Gabarito: ' + esc(gabTxt) + ' · sua resposta: ' + esc(sua) + ' · ' + tempo + ' s</span></div>' +
      '<p class="just">' + esc(q.justificativa) + '</p>' +
      '<div class="acoes"><button class="btn prim" id="btn-prox">Prosseguir com o treino</button>' +
      '<button class="btn" id="btn-fim">Encerrar e ver desempenho</button>' +
      '<button class="btn sec" id="btn-ouvir">Ouvir de novo</button></div></section>';

    if (resultado === 'C') somAcerto(); else if (resultado === 'E') somErro();
    var textoFala = fala + ' O gabarito é ' + gabTxt + '.' + (cfg.lerJust ? ' ' + q.justificativa : '');
    setTimeout(function () { falar(textoFala); }, resultado === 'B' ? 0 : 320);

    document.getElementById('btn-prox').addEventListener('click', proxima);
    document.getElementById('btn-fim').addEventListener('click', telaResumo);
    document.getElementById('btn-ouvir').addEventListener('click', function () { falar(textoFala); });
    teclaAtual = function (k) {
      if (k === 'enter' || k === 'n' || k === 'arrowright') { proxima(); return true; }
      if (k === 'escape') { telaResumo(); return true; }
      return false;
    };
    document.getElementById('btn-prox').focus({ preventScroll: true });
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------------- discursiva ---------------- */
  var CHARS_LINHA = 75; // estimativa de caracteres por linha manuscrita
  function contarLinhas(txt) {
    var total = 0;
    txt.split('\n').forEach(function (p) { total += Math.max(1, Math.ceil(p.length / CHARS_LINHA)); });
    return txt.trim() ? total : 0;
  }
  function telaDiscursiva(d) {
    var max = d.quesitos.reduce(function (s, q) { return s + q.pts; }, 0);
    var faixa = '<span>Tema: <b>' + esc(nomeTema[d.tema]) + '</b></span><span>Extensão: <b>até ' + d.linhas + ' linhas</b></span><span>Valor: <b>' + fmt(max) + ' pts</b></span>';
    var quesitos = d.quesitos.map(function (q, i) {
      return '<li>' + esc(q.txt) + ' <span class="pts">[valor: ' + fmt(q.pts) + ' ponto' + (q.pts > 1 ? 's' : '') + ']</span></li>';
    }).join('');
    app.innerHTML = carimbo(numFolha(), faixa) + barraSup() +
      '<article class="folha">' +
      '<span class="fonte">' + esc(d.fonte) + '</span>' +
      '<div class="contexto">' + esc(d.texto) + '</div>' +
      '<p class="enunciado">' + esc(d.comando) + ' Ao elaborar seu texto, aborde os seguintes aspectos:</p>' +
      '<ol class="quesitos">' + quesitos + '</ol>' +
      '<label class="rot" for="resp-disc">Texto definitivo</label>' +
      '<textarea id="resp-disc" spellcheck="true" placeholder="Escreva aqui sua resposta..."></textarea>' +
      '<div class="info-texto"><span id="linhas">0 de ' + d.linhas + ' linhas (estimativa)</span><span id="relogio">tempo: 00:00</span></div>' +
      '<div class="acoes" style="padding:0"><button class="btn prim" id="btn-enviar">Enviar resposta e ver o padrão</button></div>' +
      '</article><div id="area-correcao"></div>';

    document.getElementById('btn-encerrar-topo').addEventListener('click', telaResumo);
    var ta = document.getElementById('resp-disc');
    var t0 = Date.now();
    relogioDisc = setInterval(function () {
      var s = Math.floor((Date.now() - t0) / 1000);
      var el = document.getElementById('relogio');
      if (el) el.textContent = 'tempo: ' + (s >= 3600 ? Math.floor(s / 3600) + ':' : '') + ('0' + Math.floor((s % 3600) / 60)).slice(-2) + ':' + ('0' + (s % 60)).slice(-2);
    }, 1000);
    ta.addEventListener('input', function () {
      var n = contarLinhas(ta.value);
      var el = document.getElementById('linhas');
      el.textContent = n + ' de ' + d.linhas + ' linhas (estimativa)' + (n > d.linhas ? ' · excede o limite' : '');
      el.className = n > d.linhas ? 'excesso' : '';
    });
    document.getElementById('btn-enviar').addEventListener('click', function () {
      iniciarAudio();
      pararTimers();
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
    var ta = document.getElementById('resp-disc'); ta.readOnly = true;
    document.getElementById('btn-enviar').hidden = true;
    var max = d.quesitos.reduce(function (s, q) { return s + q.pts; }, 0);
    var reg = { d: d, texto: texto, tempo: tempo, fracoes: [], total: 0, max: max };
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
        '<label class="nota-q">Sua nota neste quesito <select id="nota-' + i + '" data-i="' + i + '">' + opts + '</select></label></div>';
    }).join('');
    sessao.discursivas.push(reg);
    function recalcular() {
      reg.total = d.quesitos.reduce(function (s, q, i) { return s + q.pts * reg.fracoes[i]; }, 0);
      var el = document.getElementById('total-disc');
      if (el) el.textContent = 'Nota estimada: ' + fmt(reg.total) + ' de ' + fmt(max) + ' (' + pct(reg.total, max) + '%)';
    }
    var area = document.getElementById('area-correcao');
    area.innerHTML = '<section class="correcao" aria-live="polite">' +
      '<div class="veredito"><h2>Resposta registrada</h2><span class="total-disc" id="total-disc"></span></div>' +
      '<div class="avaliacao"><p class="vazio-msg">Compare seu texto com o padrão de resposta. Os termos destacados em verde aparecem no seu texto; a nota sugerida vem deles e você pode ajustá-la em cada quesito.</p>' + blocos + '</div>' +
      '<div class="acoes"><button class="btn prim" id="btn-prox">Prosseguir com o treino</button>' +
      '<button class="btn" id="btn-fim">Encerrar e ver desempenho</button></div></section>';
    area.querySelectorAll('select[data-i]').forEach(function (s) {
      s.addEventListener('change', function () { reg.fracoes[+s.getAttribute('data-i')] = parseFloat(s.value); recalcular(); });
    });
    recalcular();
    var faltas = d.quesitos.filter(function (q, i) { return reg.fracoes[i] < 0.5; }).map(function (q) { return q.txt; });
    var fala = 'Resposta registrada. Nota estimada: ' + fmt(reg.total, 1).replace(',', ' vírgula ') + ' de ' + fmt(max, 1).replace(',', ' vírgula ') + ' pontos.' +
      (texto.trim() ? (faltas.length ? ' Reforce os quesitos: ' + faltas.join('; ') + '.' : ' Todos os quesitos foram abordados.') : ' O texto ficou em branco.');
    falar(fala);
    document.getElementById('btn-prox').addEventListener('click', proxima);
    document.getElementById('btn-fim').addEventListener('click', telaResumo);
    teclaAtual = function () { return false; };
    area.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------------- resumo de desempenho ---------------- */
  function telaResumo() {
    pararTimers(); calarVoz();
    if (!sessao) { telaInicio(); return; }
    var rs = sessao.respostas, p = placar();
    var resp = rs.length;
    var ce = rs.filter(function (r) { return r.q.tipo === 'CE'; });
    var ceC = ce.filter(function (r) { return r.resultado === 'C'; }).length;
    var ceE = ce.filter(function (r) { return r.resultado === 'E'; }).length;
    var liquida = ceC - ceE;
    var tempoMedio = resp ? Math.round(rs.reduce(function (s, r) { return s + r.tempo; }, 0) / resp) : 0;
    var duracao = Math.round((Date.now() - sessao.inicio) / 60000);

    var linhasTema = TEMAS.map(function (t) {
      var r = rs.filter(function (x) { return x.q.tema === t.id; });
      if (!r.length) return '';
      var c = r.filter(function (x) { return x.resultado === 'C'; }).length;
      var e = r.filter(function (x) { return x.resultado === 'E'; }).length;
      var pc = pct(c, r.length);
      return '<tr><td>' + esc(t.nome) + '</td><td class="num">' + r.length + '</td><td class="num">' + c + '</td><td class="num">' + e + '</td>' +
        '<td class="num">' + pc + '%</td><td><div class="barra"><i class="' + (pc < 50 ? 'baixo' : pc < 70 ? 'medio' : '') + '" style="width:' + pc + '%"></i></div></td></tr>';
    }).join('');

    var erros = rs.filter(function (r) { return r.resultado !== 'C'; });
    var revisao = erros.map(function (r) {
      var sua = r.marcada === 'T' ? 'tempo esgotado' : r.marcada === 'B' ? 'em branco' : (r.q.tipo === 'CE' ? (r.marcada === 'C' ? 'Certo' : 'Errado') : r.marcada);
      return '<details><summary>' + esc(r.q.enunciado.length > 140 ? r.q.enunciado.slice(0, 137) + '…' : r.q.enunciado) +
        ' <span class="dado">· ' + esc(rotGab(r.q)) + ' · você: ' + esc(sua) + '</span></summary>' +
        (r.q.contexto ? '<p><em>' + esc(r.q.contexto) + '</em></p>' : '') +
        '<p>' + esc(r.q.enunciado) + '</p><p><strong>Justificativa:</strong> ' + esc(r.q.justificativa) + '</p>' +
        '<p class="dado">' + esc(r.q.fonte) + '</p></details>';
    }).join('');

    var discHtml = '';
    if (sessao.discursivas.length) {
      var somaT = 0, somaM = 0;
      var linhas = sessao.discursivas.map(function (x) {
        somaT += x.total; somaM += x.max;
        return '<tr><td>' + esc(x.d.comando.slice(0, 90)) + (x.d.comando.length > 90 ? '…' : '') + '</td><td class="num">' + fmt(x.total) + ' / ' + fmt(x.max) + '</td><td class="num">' + pct(x.total, x.max) + '%</td></tr>';
      }).join('');
      discHtml = '<section class="bloco"><span class="rot">Discursivas · nota total ' + fmt(somaT) + ' de ' + fmt(somaM) + ' (' + pct(somaT, somaM) + '%)</span>' +
        '<div class="tabela-wrap"><table><thead><tr><th>Proposta</th><th style="text-align:right">Nota</th><th style="text-align:right">%</th></tr></thead><tbody>' + linhas + '</tbody></table></div></section>';
    }

    var temObj = resp > 0;
    var kpis = temObj ? '<div class="kpis">' +
      '<div class="kpi"><span class="rot">Aproveitamento</span><strong>' + pct(p.c, resp) + '%</strong><small>' + p.c + ' de ' + resp + ' itens</small></div>' +
      '<div class="kpi c"><span class="rot">Acertos</span><strong>' + p.c + '</strong><small>tempo médio ' + tempoMedio + ' s</small></div>' +
      '<div class="kpi e"><span class="rot">Erros</span><strong>' + p.e + '</strong><small>' + p.b + ' em branco ou sem tempo</small></div>' +
      '<div class="kpi"><span class="rot">Nota líquida C/E</span><strong>' + (liquida > 0 ? '+' : '') + liquida + '</strong><small>' + ceC + ' certos − ' + ceE + ' errados</small></div>' +
      '</div>' : '';

    app.innerHTML = carimbo('FIM', '<span>Treino: <b>' + esc(rotuloModo()) + '</b></span><span>Duração: <b>' + duracao + ' min</b></span><span>Itens respondidos: <b>' + (resp + sessao.discursivas.length) + '</b></span>') +
      '<h2 style="font-size:30px">Desempenho no treino</h2>' +
      (temObj || sessao.discursivas.length ? '' : '<p class="vazio-msg">Nenhuma questão foi respondida neste treino.</p>') +
      kpis +
      (temObj ? '<section class="bloco"><span class="rot">Por tema</span><div class="tabela-wrap"><table><thead><tr><th>Tema</th><th style="text-align:right">Itens</th><th style="text-align:right">Certos</th><th style="text-align:right">Errados</th><th style="text-align:right">%</th><th>Acerto</th></tr></thead><tbody>' + linhasTema + '</tbody></table></div></section>' : '') +
      discHtml +
      (temObj ? '<section class="bloco"><span class="rot">Revisão · ' + erros.length + ' item(ns) errado(s), em branco ou sem tempo</span><div class="revisao">' + (revisao || '<p class="vazio-msg">Nenhum erro. Bom treino!</p>') + '</div></section>' : '') +
      '<div class="acoes" style="padding:0"><button class="btn prim" id="btn-novo">Novo treino</button></div>';

    var fala = temObj
      ? 'Treino encerrado. Você acertou ' + p.c + ' de ' + resp + ' itens, ' + pct(p.c, resp) + ' por cento de aproveitamento.' + (ce.length ? ' Nota líquida no método Cebraspe: ' + liquida + '.' : '')
      : (sessao.discursivas.length ? 'Treino encerrado. Veja a nota das discursivas.' : 'Treino encerrado.');
    falar(fala);
    document.getElementById('btn-novo').addEventListener('click', telaInicio);
    teclaAtual = function (k) { if (k === 'enter') { telaInicio(); return true; } return false; };
    window.scrollTo(0, 0);
  }

  /* ---------------- teclado ---------------- */
  var teclaAtual = function () { return false; };
  document.addEventListener('keydown', function (ev) {
    if (ev.target && (ev.target.tagName === 'TEXTAREA' || ev.target.tagName === 'SELECT' || ev.target.tagName === 'INPUT')) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var k = (ev.key || '').toLowerCase();
    if (k === 'enter' && ev.target && ev.target.tagName === 'BUTTON') return; // deixa o botão focado agir
    if (teclaAtual(k)) ev.preventDefault();
  });

  telaInicio();
})();
