# Treinador de Questões · Engenharia Civil

Treinador para o concurso de **Analista Legislativo – Engenheiro – Área: Engenharia Civil (Cargo 6)** da Câmara dos Deputados (Edital nº 1/2026, banca Cebraspe).

Abra `index.html` no navegador (funciona offline; as fontes vêm do Google Fonts quando há internet).

## Como funciona
- **Início:** escolha um tema do edital, **qualquer tema** ou **questão discursiva**.
- **Objetivas:** cada questão aparece em texto com **contagem regressiva de 60 s**. Ao responder (ou esgotar o tempo), o treinador informa **em texto e em áudio** (voz pt-BR do navegador) se a resposta está certa ou errada e lê a justificativa. Depois, **prosseguir** ou **encerrar**.
- **Discursivas:** texto motivador, comando e quesitos com pontuação; após enviar, mostra o padrão de resposta, os termos-chave encontrados e uma nota sugerida ajustável por quesito.
- **Encerrar:** mostra o desempenho: aproveitamento, acertos, erros, em branco, nota líquida no método Cebraspe (certo − errado), resultado por tema e revisão dos erros.
- Atalhos: `C`/`E` (Certo/Errado), `A`–`E` (múltipla escolha), `Enter` (próxima), `Esc` (encerrar).

## Banco de questões
| Fonte | Itens |
|---|---|
| Câmara dos Deputados 2003 – Eng. Civil (CESPE), itens 101–199 | 96 |
| TRE-BA 2010 – Eng. Civil (CESPE) | 48 |
| TJRO 2012 – Eng. Civil (CESPE), múltipla escolha | 19 |
| Inéditas no estilo Cebraspe (tópicos do edital 2026) | 80 |
| Discursivas (TCE-PR 2016, TRE-BA 2010 adaptadas + inéditas) | 10 |

Gabaritos das provas reais conforme os gabaritos oficiais definitivos. Itens anulados ou de gabarito controverso ficaram de fora; questões baseadas na Lei 8.666/1993 foram atualizadas para a Lei 14.133/2021.

Para incluir questões, edite `js/questoes.js` (funções `ce(...)` e `me(...)`) e `js/discursivas.js`.
