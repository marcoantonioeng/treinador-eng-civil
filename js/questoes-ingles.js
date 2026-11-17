/*
 * Língua Inglesa — complemento (edital, item 14.2.3)
 *
 * 1) 19 itens da prova da Câmara dos Deputados 2003 (CESPE/UnB, Analista Legislativo — Engenheiro/Engenharia Civil,
 *    aplicada em 23/11/2003), itens 21–40, com o gabarito oficial definitivo. O item 27 ficou de fora: o gabarito
 *    oficial dá como certa a equivalência entre “clearest” e “most certainly”, leitura discutível que ensinaria mal.
 *    As outras provas anexadas não têm Língua Inglesa (os itens 41–50 dessa prova são de espanhol).
 * 2) 28 itens inéditos no estilo Cebraspe, com textos originais sobre temas do cargo (obras públicas, dados
 *    abertos no Legislativo, manutenção de infraestrutura). Gabarito e justificativa são do autor do treinador.
 */
(function () {
  var Q = window.QUESTOES;
  function ce(id, fonte, ctx, enun, gab, just) {
    Q.push({ id: id, fonte: fonte, tema: 'ingles', tipo: 'CE', contexto: ctx, enunciado: enun, gabarito: gab, justificativa: just, figura: null });
  }

  /* ===================== CÂMARA DOS DEPUTADOS 2003 ===================== */
  var F03 = 'Câmara dos Deputados 2003 · CESPE · item ';
  var tHer = 'Read the text. [1] Buildings are the clearest expression of a people at a given historical period, exemplifying their way of living, their available technology and their artistic ideals. Being more durable than other cultural manifestations, often sheltering or incorporating other arts, such as sculpture, painting, furniture and popular art and artefacts, buildings make up the great majority of listed items, even those which are listed simply because of their historical significance. [2] In Brazil, the preservation of the country’s cultural heritage, where it is of national importance, is the responsibility of the federal government, through the Institute for National Artistic and Historical Heritage (IPHAN). Under the Brazilian constitution, it is also the responsibility of state and municipal governments, within their respective spheres, to provide for the preservation of items of local or regional interest, and, of course, of national interest. In the same way as at federal level, state governments and many municipal governments have their own organs dedicated to cultural preservation. This is so that the number of significant listed items will grow and has two purposes: firstly, to protect the character of the item in question, and secondly to recognize and proclaim its exceptional or historic value. (www.brazil.org.uk, with adaptations.)';
  var cInf = tHer + ' From the text above, it can be inferred that';
  var cTxt = tHer + ' In the text above,';
  ce('CDI21', F03 + '21', cInf, 'buildings are as clear as any other expressions of a particular historical period.', 'E',
    'Errado. O texto diz que os edifícios são “the clearest expression”, a expressão mais clara, e não tão clara quanto as outras. O superlativo foi trocado por uma comparação de igualdade.');
  ce('CDI22', F03 + '22', cInf, 'the history of engineering technology can be attested through the attentive exams of former constructions.', 'C',
    'Certo. Os edifícios exemplificam “their available technology”. Examinar construções antigas revela, portanto, a tecnologia de cada época.');
  ce('CDI23', F03 + '23', cInf, 'buildings of architectural interest can reveal artistic ideals of a certain age.', 'C',
    'Certo. O primeiro período diz que os edifícios exemplificam “their artistic ideals” em um dado período histórico.');
  ce('CDI24', F03 + '24', cInf, 'the Brazilian preservation of its cultural tradition is only a federal concern.', 'E',
    'Errado. Segundo o texto, estados e municípios também são responsáveis pela preservação, em suas esferas, e muitos têm órgãos próprios para isso.');
  ce('CDI25', F03 + '25', cInf, 'the IPHAN is an important public institution responsible for preventing our cultural heritage from decaying.', 'C',
    'Certo. O IPHAN é o meio pelo qual o governo federal cumpre a responsabilidade de preservar o patrimônio de importância nacional.');
  ce('CDI26', F03 + '26', cInf, 'a possible title for this text can be: A form of cultural heritage.', 'C',
    'Certo. O texto trata dos edifícios como manifestação cultural e da preservação desse patrimônio. O título resume a ideia central.');
  ce('CDI28', F03 + '28', cTxt, 'the plural of “people” (paragraph 1) can be peoples.', 'C',
    'Certo. Em “a people”, a palavra significa povo, nação, e é contável. Nesse sentido, o plural é “peoples” (povos). Já “people” no sentido de pessoas não tem essa forma.');
  ce('CDI29', F03 + '29', cTxt, '“those” (paragraph 1) refers to “other arts”.', 'E',
    'Errado. Em “even those which are listed simply because of their historical significance”, “those” retoma “listed items”, os bens tombados, e não “other arts”.');
  ce('CDI30', F03 + '30', cTxt, '“through” (paragraph 2) can be correctly replaced by though.', 'E',
    'Errado. “Through” é preposição (por meio de). “Though” é conjunção concessiva (embora). As palavras são parecidas na grafia, mas não equivalentes.');
  ce('CDI31', F03 + '31', cTxt, '“also” (paragraph 2) means as well.', 'C',
    'Certo. “Also” e “as well” significam também, indicando adição: a responsabilidade é também dos estados e municípios.');

  var tBridge = 'Read the text. [1] Rising high above the Tyne, the “blinking eye” has become more of a fashion icon than a bridge since it opened a year ago. But the debate about whether the shiny, graceful curves of the 413 ft-wide span on the world’s first tilting bridge represent adventurous engineering or design at its best, intensified last night when the Gateshead Millennium bridge scooped Britain’s premier architectural award. [2] Judges for the RIBA’s annual Stirling Prize said the “simple and incredibly elegant” £22 million bridge was not only an innovative and bold engineering challenge, but also the one piece of architecture that would be remembered by people this year. [3] Praising the structure at an awards ceremony last night, Paul Finch, editorial director of the Architects Journal and deputy chairman of the Commission for Architecture hailed the bridge as a “truly heroic piece of engineering and construction.” (www.guardian.co.uk, with adaptations.) From the text, it can be concluded that';
  ce('CDI32', F03 + '32', tBridge, 'the “blinking eye” (paragraph 1) is an unquestionable piece of art.', 'E',
    'Errado. O texto fala justamente de um debate sobre se a ponte é engenharia ousada ou design. Ela não é tratada como obra de arte indiscutível.');
  ce('CDI33', F03 + '33', tBridge, 'the “Tyne” (paragraph 1) is a river, a road or a railway.', 'C',
    'Certo. A ponte se ergue “high above the Tyne”, algo que ela transpõe. O Tyne é um rio do norte da Inglaterra, o que torna a afirmação (rio, estrada ou ferrovia) verdadeira.');
  ce('CDI34', F03 + '34', tBridge, 'the so-called “fashion icon” (paragraph 1) is an old-dated construction.', 'E',
    'Errado. A ponte foi inaugurada “a year ago”, há um ano. É uma obra recente.');
  ce('CDI35', F03 + '35', tBridge, 'the bridge described displays a sloping position.', 'C',
    'Certo. É “the world’s first tilting bridge”, ponte basculante que se inclina, com “graceful curves”.');
  ce('CDI36', F03 + '36', tBridge, 'the Gateshead Millennium bridge was awarded a British prize.', 'C',
    'Certo. A ponte “scooped Britain’s premier architectural award”, o Stirling Prize do RIBA.');
  ce('CDI37', F03 + '37', tBridge, 'the Gateshead Millennium bridge cost less than twenty million pounds.', 'E',
    'Errado. O texto informa o custo de £22 million, mais de vinte milhões de libras.');
  ce('CDI38', F03 + '38', tBridge, 'RIBA’s judges considered the bridge an utter failure.', 'E',
    'Errado. Os jurados a chamaram de “simple and incredibly elegant” e de desafio de engenharia inovador e ousado.');
  ce('CDI39', F03 + '39', tBridge, 'A unique bridge can be a suitable title for this passage.', 'C',
    'Certo. O texto destaca que é a primeira ponte basculante do mundo, premiada e elogiada. “A unique bridge” resume bem o conteúdo.');
  ce('CDI40', F03 + '40', tBridge, 'Paul Finch was also rather critical of the bridge.', 'E',
    'Errado. Paul Finch elogiou a ponte como “truly heroic piece of engineering and construction”.');

  /* ===================== INÉDITAS ===================== */
  var F_IN = 'Inédita · estilo Cebraspe';
  var tBim = 'Read the text. [1] For decades, public works were designed on paper and later on two-dimensional drawings that rarely spoke to one another. As a result, clashes between structural, electrical and plumbing systems were often discovered only on site, when fixing them was expensive. [2] Building Information Modelling (BIM) has changed that picture. Rather than producing separate drawings, designers build a shared digital model in which every element — a beam, a duct, a door — carries data about its geometry, materials and cost. Because the model is shared, conflicts can be detected before construction begins. [3] Governments have taken notice. Several countries now require BIM on large publicly funded projects, arguing that it reduces waste and improves accountability. Critics, however, point out that small firms may struggle to afford the software and training, which could narrow competition in public tenders. [4] Even so, the trend seems irreversible. The question is no longer whether public agencies will adopt BIM, but how quickly they can train their own staff to read and audit the models they receive. Judge the item according to the text.';
  ce('NBI01', F_IN, tBim, 'According to the text, before BIM, conflicts between building systems were usually identified during construction.', 'C',
    'Certo. O primeiro parágrafo diz que os conflitos “were often discovered only on site”, isto é, já na obra.');
  ce('NBI02', F_IN, tBim, 'In “when fixing them was expensive” (first paragraph), “them” refers to “public works”.', 'E',
    'Errado. “Them” retoma “clashes”: o caro era corrigir os conflitos entre os sistemas, e não as obras.');
  ce('NBI03', F_IN, tBim, 'The expression “Rather than” (second paragraph) could be replaced with Instead of without changing the meaning of the sentence.', 'C',
    'Certo. “Rather than producing” e “Instead of producing” significam “em vez de produzir”. Ambas aceitam o verbo com -ing.');
  ce('NBI04', F_IN, tBim, 'The text states that BIM models contain only geometric information about building elements.', 'E',
    'Errado. Cada elemento traz dados de “geometry, materials and cost”, e não só de geometria.');
  ce('NBI05', F_IN, tBim, 'In the second paragraph, “Because” introduces the reason why conflicts can be detected before construction begins.', 'C',
    'Certo. “Because the model is shared” é a causa; a detecção antecipada dos conflitos é a consequência.');
  ce('NBI06', F_IN, tBim, 'The critics mentioned in the text argue that BIM increases waste in public works.', 'E',
    'Errado. Os críticos dizem que empresas pequenas podem não conseguir pagar software e treinamento, o que reduziria a competição nas licitações. Não falam em desperdício.');
  ce('NBI07', F_IN, tBim, 'In the third paragraph, “however” introduces an idea that contrasts with the governments’ arguments.', 'C',
    'Certo. Os governos defendem os benefícios do BIM; “however” introduz a objeção dos críticos.');
  ce('NBI08', F_IN, tBim, 'In the context, the word “tenders” (third paragraph) refers to public bidding processes.', 'C',
    'Certo. “Public tenders” são licitações públicas. Reduzir a competição nelas é a preocupação dos críticos.');
  ce('NBI09', F_IN, tBim, 'The author concludes that public agencies will probably abandon BIM because of its costs.', 'E',
    'Errado. O autor diz que a tendência “seems irreversible”. A dúvida é apenas a velocidade de capacitação das equipes.');
  ce('NBI10', F_IN, tBim, 'It can be inferred from the last paragraph that public agencies need staff capable of checking the models delivered by contractors.', 'C',
    'Certo. O desafio é treinar “their own staff to read and audit the models they receive”, isto é, os modelos entregues pelos contratados.');

  var tOpen = 'Read the text. [1] Parliaments have always published their decisions, but for most of their history they did so in formats that citizens could hardly use: printed journals, scanned documents and lengthy minutes. Over the past fifteen years, a growing number of legislatures have begun releasing information as open data — machine-readable files that anyone can download, combine and analyse free of charge. [2] The effects have been remarkable. Journalists can now track how each member votes, civic groups build apps that alert users when a bill on a topic of interest is introduced, and researchers compare legislative productivity across countries. Some parliaments have gone further, allowing citizens to comment on draft bills online. [3] Nevertheless, openness does not automatically lead to participation. Data that is published but poorly documented may be misread, and online consultations sometimes attract only well-organised interest groups. Transparency, in other words, is a necessary but not a sufficient condition for accountability. [4] Experts therefore recommend that legislatures pair open data with plain-language summaries and active outreach, so that people who are not specialists can actually make use of what is made available. Judge the item according to the text.';
  ce('NBI11', F_IN, tOpen, 'According to the text, parliaments only started publishing their decisions fifteen years ago.', 'E',
    'Errado. Os parlamentos “have always published their decisions”. O que começou há quinze anos foi a divulgação em formato de dados abertos.');
  ce('NBI12', F_IN, tOpen, '“Machine-readable files” (first paragraph) are files that can be processed by computers.', 'C',
    'Certo. “Machine-readable” significa legível por máquina: o computador processa o arquivo diretamente, ao contrário de um documento escaneado.');
  ce('NBI13', F_IN, tOpen, 'The expression “free of charge” (first paragraph) means without payment.', 'C',
    'Certo. “Free of charge” é gratuitamente, sem custo.');
  ce('NBI14', F_IN, tOpen, 'The second paragraph gives examples of how journalists, civic groups and researchers use open parliamentary data.', 'C',
    'Certo. Jornalistas acompanham votos, grupos cívicos criam aplicativos de alerta e pesquisadores comparam a produtividade legislativa.');
  ce('NBI15', F_IN, tOpen, '“Nevertheless” (third paragraph) could be replaced with Moreover without changing the meaning of the text.', 'E',
    'Errado. “Nevertheless” é concessivo (no entanto) e introduz uma ressalva. “Moreover” é aditivo (além disso). O sentido mudaria.');
  ce('NBI16', F_IN, tOpen, 'The author believes that publishing data is enough to guarantee accountability.', 'E',
    'Errado. A transparência é “a necessary but not a sufficient condition for accountability”: necessária, mas não suficiente.');
  ce('NBI17', F_IN, tOpen, 'In the last paragraph, “actually” means currently.', 'E',
    'Errado. Falso cognato: “actually” significa de fato, realmente. “Atualmente” é currently ou nowadays.');
  ce('NBI18', F_IN, tOpen, 'In the last paragraph, “pair” is used as a verb meaning combine.', 'C',
    'Certo. Em “legislatures pair open data with plain-language summaries”, “pair” é verbo: associar, combinar uma coisa com outra.');
  ce('NBI19', F_IN, tOpen, 'In “Data that is published but poorly documented may be misread” (third paragraph), “may” expresses possibility.', 'C',
    'Certo. “May” indica possibilidade: dados mal documentados podem ser mal interpretados.');

  var tMaint = 'Read the text. [1] When a bridge collapses, the headlines usually focus on the moment of failure. Engineers, however, know that most collapses are the final chapter of a long story of deferred maintenance. Cracks that went unrepaired, drainage that was allowed to clog and corroded steel that was never replaced slowly reduce a structure’s capacity until an ordinary load becomes too much. [2] Climate change is shortening that story. Heavier rainfall erodes foundations, longer heat waves stress expansion joints and rising sea levels accelerate corrosion in coastal areas. Infrastructure designed for the climate of the twentieth century is increasingly operating outside the conditions it was built for. [3] Budget rules often make the problem worse. Inaugurating a new road is politically attractive; repainting an old viaduct is not. Unless maintenance is planned and funded as carefully as new construction, the bill will eventually arrive — and it will be higher. Judge the item according to the text.';
  ce('NBI20', F_IN, tMaint, 'According to the text, bridge collapses are usually caused by a single unexpected event.', 'E',
    'Errado. Para os engenheiros, a maioria dos colapsos é “the final chapter of a long story of deferred maintenance”, um processo longo, e não um evento isolado.');
  ce('NBI21', F_IN, tMaint, 'The expression “deferred maintenance” (first paragraph) refers to maintenance that was postponed.', 'C',
    'Certo. “To defer” é adiar. Manutenção diferida é a que foi postergada.');
  ce('NBI22', F_IN, tMaint, 'In the first paragraph, “too much” refers to an ordinary load that the weakened structure can no longer support.', 'C',
    'Certo. Com a capacidade reduzida, uma carga comum passa a ser excessiva para a estrutura.');
  ce('NBI23', F_IN, tMaint, 'The author mentions heat waves as a factor that increases stress on expansion joints.', 'C',
    'Certo. “Longer heat waves stress expansion joints” (segundo parágrafo).');
  ce('NBI24', F_IN, tMaint, 'The text claims that infrastructure built in the twentieth century is immune to climate change.', 'E',
    'Errado. O texto diz o contrário: essa infraestrutura opera cada vez mais fora das condições para as quais foi projetada.');
  ce('NBI25', F_IN, tMaint, 'In the third paragraph, the semicolon separates two contrasting ideas.', 'C',
    'Certo. Inaugurar uma estrada nova é politicamente atraente; repintar um viaduto antigo não é. O ponto e vírgula une as duas ideias em contraste.');
  ce('NBI26', F_IN, tMaint, 'In the last sentence, “eventually” means occasionally.', 'E',
    'Errado. Falso cognato: “eventually” significa no fim, mais cedo ou mais tarde. “Ocasionalmente” é occasionally.');
  ce('NBI27', F_IN, tMaint, 'In the last sentence, “Unless” has the same meaning as if not.', 'C',
    'Certo. “Unless maintenance is planned” equivale a “if maintenance is not planned”: a menos que, se não.');
  ce('NBI28', F_IN, tMaint, 'The main idea of the text is that maintenance should receive the same attention as new construction, especially in a changing climate.', 'C',
    'Certo. O texto liga os colapsos à manutenção adiada, mostra que o clima agrava o quadro e conclui que a manutenção deve ser planejada e financiada com o mesmo cuidado que as obras novas.');
})();
