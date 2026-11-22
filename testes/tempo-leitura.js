#!/usr/bin/env node
/*
 * Confere o tempo de leitura das questões: cada uma deve ser lida em até 30 s (até 100 palavras somando
 * comando, texto de apoio, enunciado e alternativas), sobrando ao menos 30 dos 60 s para responder.
 * Também confere ids repetidos. Uso: node testes/tempo-leitura.js   (sai com código 1 se algo falhar)
 */
var path = require('path');
global.window = { QUESTOES: [] };
['questoes', 'questoes-basicos', 'questoes-camara2025', 'questoes-ingles', 'ajustes-leitura'].forEach(function (f) {
  require(path.join(__dirname, '..', 'js', f + '.js'));
});
var LIMITE = 100;
var pal = function (s) { return String(s || '').split(/\s+/).filter(Boolean).length; };
var palavras = function (q) {
  var op = q.opcoes ? Object.keys(q.opcoes).reduce(function (a, k) { return a + pal(q.opcoes[k]); }, 0) : 0;
  return pal(q.contexto) + pal(q.enunciado) + op;
};
var Q = window.QUESTOES, longas = Q.filter(function (q) { return palavras(q) > LIMITE; });
var vistos = {}, repetidos = Q.filter(function (q) { var r = vistos[q.id]; vistos[q.id] = 1; return r; });
longas.forEach(function (q) { console.log('Acima de ' + LIMITE + ' palavras: ' + q.id + ' (' + palavras(q) + ')'); });
repetidos.forEach(function (q) { console.log('Id repetido: ' + q.id); });
var maior = Q.reduce(function (m, q) { return Math.max(m, palavras(q)); }, 0);
console.log(Q.length + ' questões · maior: ' + maior + ' palavras · acima do limite: ' + longas.length + ' · ids repetidos: ' + repetidos.length);
process.exit(longas.length || repetidos.length ? 1 : 0);
