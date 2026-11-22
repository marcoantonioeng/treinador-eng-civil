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
- Saíram 4 inéditos que repetiam esses assuntos (NBA09, NBA16, NBA17 e NBA21).

### Câmara dos Deputados 2025 · Conhecimentos Específicos do cargo 1 (gabarito oficial)
No mesmo arquivo, 36 itens do caderno do cargo 1 (Processo Legislativo e Gestão, CD-AL-011), escolhidos por estarem nos Conhecimentos Básicos do cargo 6:
- Regimento Interno e Regimento Comum: 11 itens (91–103; o 93 e o 97 foram anulados).
- Constituição (Poder Legislativo, processo legislativo, fiscalização e servidores, com jurisprudência do STF): 11 itens.
- Gestão de riscos na governança: 1 item (139).
- TI e dados (Teams, navegação, nuvem, segurança, IA e ciência de dados): 13 itens (168–180).
- Ficaram de fora: Código de Ética, teoria política, atualidades, gestão organizacional, hardware, Windows, orçamento e os itens de procedimento regimental fora dos artigos que o edital cobra.
- Saíram mais 4 inéditos repetidos (NBC05, NBC06, NBC32 e NBT21). O banco passa a ter 955 itens.

### Língua Inglesa (complemento)
`js/questoes-ingles.js` leva o tema de 33 para 80 itens, no nível dos demais temas básicos:
- **19 itens da Câmara dos Deputados 2003** (Engenharia Civil, itens 21–40), com gabarito oficial definitivo. O item 27 ficou de fora porque o gabarito oficial aceita uma equivalência de vocabulário discutível. As outras provas anexadas não têm Língua Inglesa.
- **28 itens inéditos** no estilo Cebraspe, com três textos originais (BIM em obras públicas, dados abertos no Legislativo e manutenção de infraestrutura). O gabarito desses itens não é oficial.
- O banco passa a ter 1.002 itens.

### Desempenho diário
O botão **Desempenho diário**, ao lado de Conquistas, abre o registro do treino dia a dia:
- **Período:** 7, 14, 30 ou 90 dias, ou todo o histórico. Acima de 100 dias, os gráficos agrupam por semana.
- **Indicadores:** dias de treino, itens, acerto e nota líquida (certas − erradas), além do melhor dia.
- **Gráficos:** itens por dia (certas, erradas e em branco, com a meta diária) e percentual de acerto por dia (com a média do período). Ao tocar ou passar o mouse, aparecem os números do dia; as setas do teclado percorrem os dias.
- **Tabelas:** desempenho por tema no período e registro dia a dia (itens, certas, erradas, branco, acerto, líquida, XP e tema principal).
- **Dados:** cada resposta grava no dia a divisão por tema e o XP ganho. O histórico guarda até 400 dias (antes eram 120). Dias anteriores a esta versão aparecem com os totais; a divisão por tema é reconstruída a partir das últimas respostas guardadas.

## Aplicativo para celular (PWA)
A pasta `celular/` é o mesmo treinador como aplicativo instalável:
- abre em tela cheia pelo ícone e funciona sem internet depois da primeira abertura;
- funciona no Android (Chrome) e no iPhone (Safari);
- o progresso fica salvo no aparelho;
- para levar o progresso do artefato do Claude para o celular (ou de volta), use Ajustes → Cópia do progresso → Exportar e, no outro lugar, Importar;
- no aplicativo instalado, o botão Voltar do Android leva ao Canteiro em vez de fechar o app.

**Montar:** `./montar.sh celular` gera `celular/index.html` e `celular/sw.js` (a versão do cache muda sozinha a cada alteração). `./montar.sh artefato <saida.html>` gera a página do artefato.

**Publicar:** a pasta precisa estar num endereço https. Neste repositório, o fluxo `.github/workflows/pages.yml` publica `celular/` no GitHub Pages a cada envio para `main`, no endereço https://marcoantonioeng.github.io/treinador-eng-civil/. Para isso, ative uma vez em Settings → Pages → Source: **GitHub Actions**. Outras hospedagens estáticas também servem (Netlify Drop, Cloudflare Pages).

**Instalar:**
- Android: abra o endereço no Chrome → menu ⋮ → **Instalar app** (ou Adicionar à tela inicial).
- iPhone: abra no Safari → Compartilhar → **Adicionar à Tela de Início**.

## Tempo de leitura das questões
Cada questão deve ser lida em até 30 segundos, sobrando ao menos 30 dos 60 segundos para responder. A medida usada é de até 100 palavras, somando comando, texto de apoio, enunciado e alternativas (leitura atenta de prova, cerca de 200 palavras por minuto). `node testes/tempo-leitura.js` confere o banco e falha se alguma questão passar do limite.

Em 22/11/2026, 217 questões passavam do limite. `js/ajustes-leitura.js` corrige todas sem mexer nos arquivos de origem:
- **Texto reduzido ao trecho necessário** (196 itens de Português, Inglês e situações-problema). A questão e o gabarito continuam os mesmos; a fonte ganha “(adaptada)” e as referências como “segundo parágrafo” viram “no trecho”. Outros 23 itens que encostavam no limite tiveram o comando encurtado.
- **Múltipla escolha com cinco alternativas longas virou Certo/Errado** (20 itens, mais 1 que encostava no limite), a partir de uma alternativa oficial: a correta vira item Certo, uma incorreta vira item Errado. O id ganha a letra da alternativa (por exemplo, `TJ26E`).
- **Questão nova sobre o mesmo ponto** (1 item, `BMPGO3R`), porque a original dependia do texto inteiro.
- Resultado: 1.002 questões, a maior com 95 palavras e a mediana com 49.

## APK para Android

O app também é distribuído como APK (pacote `br.eng.treinador.engcivil`), com as questões e as fontes embutidas, funcionando sem internet. O projeto fica em `android/`.

- Baixar a versão atual: https://marcoantonioeng.github.io/treinador-eng-civil/TreinadorEngCivil.apk
- Versão 1.2 (22/11/2026): questões legíveis em até 30 s, tema Marfim & Latão e versão exibida em Ajustes.

Para gerar uma versão nova:

1. Aumente `versionCode` e `versionName` em `android/app/build.gradle`.
2. Rode `./montar.sh apk` (monta `android/app/src/main/assets/index.html` com a ponte `js/ponte-android.js`).
3. Em `android/`, crie `local.properties` (`sdk.dir=…`) e `keystore.properties` apontando para a chave, e rode `gradle assembleRelease`.
4. Copie o APK para `celular/TreinadorEngCivil.apk` e publique.

A chave de assinatura **não** fica no repositório. Sem a mesma chave, a versão nova não instala por cima da anterior. A 1.2 usa uma chave nova; a chave da 1.0/1.1 se perdeu, por isso a troca da 1.1 para a 1.2 exige exportar o progresso, desinstalar e importar.
