# Treinador de Questões · Engenharia Civil

Treinador para o concurso de **Analista Legislativo – Engenheiro – Área: Engenharia Civil (Cargo 6)** da Câmara dos Deputados (Edital nº 1/2026, banca Cebraspe).

Abra `index.html` no navegador (funciona offline; as fontes vêm do Google Fonts quando há internet).

## Como funciona
O treino é um jogo montado sobre um sistema de repetição espaçada. Cada tema do edital é um **prédio** e cada fase (cerca de 5 itens) é um **andar**.

**Jogo**
- **Fases e estrelas:** você entra com 3 capacetes e perde um a cada erro ou tempo esgotado. Sem erros o andar ganha 3 estrelas; com 1 erro, 2; com 2 erros, 1. No terceiro erro a fase é reprovada e pode ser refeita. As fases de um tema abrem em sequência; todos os temas ficam liberados desde o início.
- **Pontos e XP:** cada acerto vale 100 pontos mais 1 por segundo restante, multiplicados pela sequência de acertos (×2 a partir de 3 seguidos, até ×5 com 12). O XP sobe de nível, de Estagiário a Analista Legislativo.
- **Maratona** (qualquer tema, 3 capacetes, recorde de pontos) e **Desafio do dia** (10 itens, uma vez por dia).
- **Hábito:** ofensiva de dias seguidos, três missões diárias (a primeira é a meta diária de itens) e 20 conquistas.

**Preparação**
- **Repetição espaçada:** cada item fica numa caixa de 0 a 5. Acerto com certeza sobe uma caixa (revisões em 1, 3, 7, 16 e 35 dias); acerto marcado como dúvida mantém a revisão diária; erro ou branco volta à caixa 0 e ao caderno de erros.
- **Treino do dia** adaptativo (revisões vencidas + itens novos do tema mais fraco), **bloco adaptativo por tema**, **caderno de erros**, **só revisões vencidas**.
- **Simulados** de 20, 50 ou 100 itens Certo/Errado, 90 s por item, correção só no fim e histórico de nota líquida.
- **Painel de preparação:** mapa de domínio por tema, estratégia de chute no método Cebraspe e ritmo dos últimos 14 dias. A tela inicial mostra dias até a prova, meta diária e nota líquida estimada.
- **Discursivas:** texto motivador, comando e quesitos com pontuação; após enviar, mostra o padrão de resposta, os termos-chave encontrados e uma nota sugerida ajustável por quesito.

**Em cada item:** contagem regressiva de **60 s**; depois da resposta, correção **em texto e em áudio** com a justificativa, e a escolha entre **prosseguir** ou **encerrar**. Ao encerrar aparece o **desempenho**: aproveitamento, acertos, erros, em branco, nota líquida (certo − errado), resultado por tema e revisão dos erros.

**Progresso:** fica salvo no navegador (`localStorage`, chave `treinador-prog`). Publicado como artifact do claude.ai, também é salvo na conta de quem joga, e a voz usa a leitura do próprio Claude quando disponível.

Atalhos: `C`/`E` (Certo/Errado), `A`–`E` (múltipla escolha), `D` (alterna certeza/dúvida), `Enter` (próximo).

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

### Conhecimentos Básicos (reforço de 17/11/2026)
`js/questoes-basicos.js` acrescenta 137 itens aos temas de Direito Constitucional e Regimento Interno, Direito Administrativo e TI e Dados:
- **37 itens de provas anexadas**, com gabarito definitivo oficial: Câmara dos Deputados 2003 (21), TRE-BA 2010 (6), TJRO 2012 (3) e TCE-PR 2016 (7).
- **100 itens inéditos no estilo Cebraspe** sobre os tópicos que essas provas não cobrem: Regimento Interno da Câmara, Regimento Comum, Lei 9.784, improbidade (Lei 14.230), governança (Decreto 9.203), LAI, LGPD, Microsoft 365, IA e visualização de dados. O gabarito desses itens não é oficial.

### Câmara dos Deputados 2025 · Conhecimentos Gerais (gabarito oficial)
`js/questoes-camara2025.js` traz 78 itens reais da prova da Câmara 2025 (Cebraspe, aplicada em 8/3/2026), com o gabarito definitivo depois dos recursos:
- Língua Portuguesa: 25 itens (1–26; o 25 foi anulado).
- Língua Inglesa: 9 itens (27–36; o 30 foi anulado).
- Direito Administrativo e Administração Pública: 44 itens (47–90).
- Raciocínio lógico (37–46) ficou de fora: não consta do edital do cargo 6.
- Saíram 4 inéditos que repetiam esses assuntos (NBA09, NBA16, NBA17 e NBA21). O banco passa a ter 923 itens.
- Os itens de Regimento Interno estão no caderno de Conhecimentos Específicos, cujo gabarito ainda não foi incorporado.
