/*
 * Ajuste de tempo de leitura (22/11/2026)
 *
 * Regra: cada questão deve ser lida em até 30 segundos, sobrando ao menos 30 dos 60 segundos para responder.
 * Medida: até 100 palavras somando comando, texto de apoio, enunciado e alternativas (leitura atenta de prova,
 * cerca de 200 palavras por minuto). O teste automático (ver README) recusa qualquer questão acima do limite.
 *
 * Três tratamentos:
 *  A(id, contexto, enunciado?)  mesma questão, mesmo gabarito; o texto de apoio passa a ser só o trecho de que o
 *                               item precisa e as referências (“segundo parágrafo”) viram “no trecho”.
 *                               A fonte ganha “(adaptada)”. O id é mantido, e com ele o progresso do item.
 *  M(id, letra, contexto, enunciado, gabarito, justificativa)
 *                               múltipla escolha com cinco alternativas longas vira Certo/Errado a partir de uma das
 *                               alternativas oficiais. Id novo (id + letra), porque a pergunta mudou.
 *  N(id, novo)                  a questão dependia do texto inteiro e não cabe em 30 s: sai, e entra uma questão nova
 *                               sobre o mesmo ponto, com trecho curto. Id novo; fonte “(adaptada)” quando o trecho e a
 *                               ideia vêm da prova original, ou “Inédita · estilo Cebraspe”.
 */
(function () {
  var Q = window.QUESTOES, idx = {};
  Q.forEach(function (q) { idx[q.id] = q; });
  function pega(id) { var q = idx[id]; if (!q) throw new Error('ajustes-leitura: item inexistente ' + id); return q; }
  function adapt(f) { return f.indexOf('adaptad') >= 0 || f.indexOf('Inédita') === 0 ? f : f + ' (adaptada)'; }
  // Com o texto reduzido a um trecho, “o texto”/“the text” no enunciado passa a ser “o trecho”/“the excerpt”.
  function trecho(enun, ctx) {
    if (ctx.indexOf('«') < 0) return enun;
    return enun.replace(/\b(o|do|no|ao|O) texto\b(?! CG)/g, function (m, a) { return a + ' trecho'; })
      .replace(/\bthe text\b/g, 'the excerpt').replace(/\bThe text\b/g, 'The excerpt');
  }
  function A(id, ctx, enun) {
    var q = pega(id);
    q.contexto = ctx; q.enunciado = trecho(enun || q.enunciado, ctx);
    q.fonte = adapt(q.fonte);
  }
  function troca(q, novo) {
    var i = Q.indexOf(q);
    Q.splice(i, 1, novo); delete idx[q.id]; idx[novo.id] = novo;
  }
  function M(id, letra, ctx, enun, gab, just) {
    var q = pega(id);
    troca(q, { id: id + letra, fonte: q.fonte + ' (alternativa ' + letra + ', em Certo/Errado)', tema: q.tema, tipo: 'CE',
      contexto: ctx, enunciado: enun || q.opcoes[letra], gabarito: gab, justificativa: just, figura: null });
  }
  function N(id, novo) {
    var q = pega(id);
    troca(q, { id: novo.id, fonte: novo.fonte || adapt(q.fonte), tema: q.tema, tipo: 'CE', contexto: novo.ctx,
      enunciado: novo.enun, gabarito: novo.gab, justificativa: novo.just, figura: novo.figura || null });
  }
  var T = function (s) { return 'Considere o trecho a seguir. «' + s + '» Julgue o item.'; };
  var R = function (s) { return 'Read the excerpt below. «' + s + '» Judge the item.'; };

  /* =================== MÚLTIPLA ESCOLHA LONGA → CERTO/ERRADO =================== */
  M('TJ26', 'E', 'A respeito de instalações elétricas prediais, julgue o item.', null, 'C',
    'Certo. A NBR 5410 dimensiona os condutores por seção mínima, capacidade de condução de corrente, queda de tensão, proteção contra sobrecargas e curtos-circuitos e proteção contra contatos indiretos.');
  M('TJ27', 'D', 'Acerca do sistema de alvenaria estrutural, julgue o item.', null, 'E',
    'Errado. Não há limite normativo de dez pavimentos para alvenaria estrutural com blocos cerâmicos: a altura depende do projeto estrutural, da resistência dos blocos e da argamassa.');
  M('TJ28', 'B', 'Acerca da estabilidade estrutural e dos critérios de ruptura, julgue o item.', null, 'E',
    'Errado. O critério de Rankine se baseia na máxima tensão normal. O critério da máxima tensão de cisalhamento é o de Tresca.');
  M('TJ29', 'D', 'Acerca da geotecnia aplicada à construção civil, julgue o item.', null, 'C',
    'Certo. Lentes de areia entre camadas de argila reduzem a distância de drenagem (Hd) e aceleram o adensamento, pois o tempo de adensamento é proporcional a Hd².');
  M('TJ30', 'C', 'No que se refere à hidráulica aplicada à engenharia civil, julgue o item.', null, 'E',
    'Errado. No escoamento laminar, o perfil de velocidades na seção transversal é parabólico, com máximo no centro e velocidade nula junto às paredes.');
  M('TJ57', 'E', 'Considerando a legislação sobre o exercício das profissões de engenheiro, arquiteto e agrônomo, julgue o item.', null, 'C',
    'Certo. A Lei 5.194/1966 exige que as empresas só executem obras de engenharia com a participação efetiva e a autoria declarada de profissional legalmente habilitado e registrado no CREA.');
  M('TJB15', 'C', 'No que se refere ao programa de correio eletrônico Mozilla Thunderbird, julgue o item.', null, 'E',
    'Errado. O filtro de spam (lixo eletrônico) só classifica mensagens indesejadas; não é antivírus e não protege o computador contra programas maliciosos.');
  M('TCEB05', 'B', 'Um agente de autarquia estadual, em fiscalização de rotina, autuou um estabelecimento comercial por infração administrativa e, na mesma ocasião, interditou-o cautelarmente. Acerca dessa situação, julgue o item.',
    'Se o agente tivesse agido por vingança pessoal contra o proprietário do estabelecimento, estaria configurada a nulidade do ato por abuso de poder na modalidade excesso de poder.', 'E',
    'Errado. Agir por vingança pessoal é desvio de finalidade (desvio de poder): o agente tem competência, mas busca fim diverso do interesse público. Excesso de poder é atuar além da competência.');
  M('TCEB07', 'D', 'Lei estadual específica autorizou a instituição da empresa X, sociedade anônima com controle acionário do estado, para explorar atividade econômica de interesse coletivo. Nessa situação, julgue o item.',
    'A empresa X submeter-se-á ao controle do tribunal de contas no que concerne aos bens, valores e dinheiros públicos provenientes diretamente do ente controlador.', 'C',
    'Certo. As estatais estão sujeitas ao controle dos tribunais de contas quanto aos recursos públicos (arts. 70 e 71, II, da Constituição).');
  M('TCEB08', 'D', 'A respeito do controle judicial dos atos administrativos, julgue o item.', null, 'E',
    'Errado. O Brasil adota a jurisdição una (art. 5.º, XXXV, da CF): decisões administrativas, mesmo em última instância, podem ser revistas pelo Judiciário. Não há contencioso administrativo com coisa julgada.');
  M('TCEB09', 'B', 'Com referência à responsabilidade civil do Estado na Constituição Federal, julgue o item.', null, 'C',
    'Certo. Na responsabilidade objetiva (art. 37, § 6.º) basta provar o dano e o nexo causal com a conduta estatal, e mesmo atos lícitos podem gerar o dever de indenizar.');
  M('TCEB10', 'E', 'Acerca dos direitos e garantias fundamentais na Constituição Federal, julgue o item.', null, 'E',
    'Errado. A liberdade de exercício profissional (art. 5.º, XIII) é norma de eficácia contida: vale desde logo e a lei pode restringi-la, exigindo qualificações.');
  M('TCEB11', 'D', 'Em relação à organização político-administrativa do Estado brasileiro, julgue o item.', null, 'C',
    'Certo. O município pode legislar sobre meio ambiente no limite do interesse local, em harmonia com as normas da União e do estado (art. 30, I e II; STF, Tema 145).');
  M('TCEB12', 'A', 'Com referência às atribuições do Congresso Nacional e de suas Casas, julgue o item.', null, 'E',
    'Errado. Sustar os atos normativos do Executivo que exorbitem do poder regulamentar ou dos limites de delegação legislativa é competência exclusiva do Congresso Nacional (art. 49, V, da CF), não do Senado.');

  /* =================== SITUAÇÕES-PROBLEMA ENXUTAS =================== */
  var trelica = 'Uma treliça plana metálica, triangular e simétrica, de vão 2a, apoia-se nos nós A e B. As barras inclinadas ① e ⑤ ligam os apoios ao nó superior; o banzo inferior é formado pelas barras ② e ④; a barra vertical ③ liga o nó superior ao nó central inferior, onde atua a carga vertical P, para baixo. Julgue o item.';
  A('STJ70', trelica); A('STJ71', trelica);

  A('TRF6_92', 'Um contrato de serviços tem orçamento de abril de 2022, mês de referência para os reajustes anuais. O grupo de serviços C, de R$ 1.000.000,00 e reajustado pelo índice Y, será executado de julho de 2024 a agosto de 2025. Julgue o item.',
    'Se, em agosto de 2024, o gestor verificar que o índice Y variou 2,5% entre abril e julho de 2024, poderá reajustar o saldo do grupo C para julho de 2024, para iniciar a execução com valores de mercado.');
  A('TRF6_93', 'Um contrato de serviços assinado em agosto de 2023 teve o orçamento concluído em abril de 2022, mês de referência para os reajustes anuais. A execução começou em setembro de 2023. Julgue o item.',
    'Em setembro de 2023, no início da execução, a contratada tem direito ao reajuste referente ao período de abril de 2022 a abril de 2023.');
  A('TRF6_94', 'Um contrato de serviços tem orçamento de abril de 2022, mês de referência para os reajustes anuais. Por planejamento interno da Administração, a ordem de serviço do grupo B (índice Y) saiu só em maio de 2024. Em março de 2024, o saldo do grupo B, já reajustado, era de R$ 1.030.000,00. Julgue o item.',
    'Se o índice Y variou 1,5% entre abril de 2023 e abril de 2024, o saldo reajustado do grupo B, a partir de abril de 2024, será de R$ 1.045.450,00.');
  A('TRF6_95', 'Um contrato de serviços tem orçamento de abril de 2022, mês de referência para os reajustes. O grupo A (índice X) deveria terminar em fevereiro de 2024, mas, por culpa exclusiva da contratada, só 50% foi entregue até março. O saldo, já reajustado, era de R$ 262.500,00. Julgue o item.',
    'Se o índice X variou 3% entre abril de 2023 e abril de 2024, o saldo reajustado do grupo A, a partir de abril de 2024, será de R$ 270.375,00.');
  A('TCEAC114', 'Um engenheiro civil, servidor público, foi designado fiscal da obra da nova sede do seu órgão, contratada pelo regime de execução semi-integrada. Julgue o item.');
  var fiscObra = 'Julgue o item, relativo à fiscalização de obras públicas.';
  A('MPGO58', fiscObra, 'Em contrato regido pela Lei n.º 14.133/2021, a contratada, com prévia e expressa autorização da fiscalização, pode antecipar acréscimos, supressões ou serviços novos sem termo aditivo, que poderão ser medidos e pagos se o aditivo for formalizado em até 90 dias, antes do fim da vigência.');
  A('MPGO60', fiscObra, 'A administração pode alterar unilateralmente o contrato de forma qualitativa, ao modificar projeto ou especificações, ou quantitativa, ao acrescer ou diminuir o objeto; o limite é de 25% para obras, serviços e compras e de 50% para acréscimos em reforma de edifício.');
  A('MPGO63', fiscObra, 'Na concretagem de estrutura de concreto armado, a fiscalização deve exigir lançamento contínuo, sem interrupções superiores ao tempo de pega, adensamento de cada camada até a máxima densidade praticável e ausência de vazios ou ninhos junto às fôrmas e peças embutidas.');
  var orc = 'A respeito de orçamento e planejamento de obras, julgue o item.';
  A('MPGO82', orc); A('MPGO83', orc);
  var canteiro = 'Uma edificação de subsolo, térreo e dez pavimentos tipo terá 40 operários no pico da obra e um elevador do tipo cremalheira. O canteiro não terá cozinha, pois não haverá preparo de refeições no local. Julgue o item.';
  ['MPGO116', 'MPGO117', 'MPGO118', 'MPGO119', 'MPGO120'].forEach(function (id) { A(id, canteiro); });
  A('PETRO55', 'Em uma obra de concreto pré-moldado, os elementos protendidos receberam argamassa de injeção com aditivos à base de halogenetos. Julgue o item, conforme as normas vigentes.');
  A('PETRO56', 'Em uma obra de concreto pré-moldado, a fiscalização reprovou as alças de içamento porque eram de aço CA-60. Julgue o item, conforme as normas vigentes.');
  A('PETRO58', 'O projetista de uma estrutura de aço determinou os esforços internos por análise global elástica. Julgue o item, com base nas normas vigentes.');
  A('PETRO60', 'O projetista de uma estrutura de aço considerou todas as ações relevantes e verificou tanto o estado-limite de serviço quanto o estado-limite último. Julgue o item, com base nas normas vigentes.');
  A('PETRO61', 'O projetista de uma estrutura de aço desprezou a carga de vento, alegando as condições locais. Julgue o item, com base nas normas vigentes.');
  var graf = 'Um gráfico, sem escala, mostra os diagramas tensão-deformação convencional (linha contínua, pontos 0, 1, 2, 3 e 4) e real (linha tracejada, pontos 0, 1, 2 e 5) de uma barra de aço. Regiões: A, de 0 a 1, trecho inicial reto; B, de 1 a 2, patamar de escoamento; C, de 2 a 3; D, de 3 a 4. Julgue o item.';
  A('PETRO62', graf); A('PETRO63', graf); A('PETRO64', graf);
  var cronog = 'Em uma obra de R$ 10 milhões, pagamentos de R$ 5 milhões ocorreram conforme o programado, mas algumas atividades estavam atrasadas. Nenhum pagamento foi feito sem a execução dos serviços, e há R$ 1 milhão em insumos estocados no almoxarifado. Julgue o item.';
  A('PETRO86', cronog); A('PETRO87', cronog);
  /* Itens que já cabiam no limite, mas encostavam nele: comandos longos encurtados para dar folga */
  ['MPGO51', 'MPGO52', 'MPGO53', 'MPGO54', 'MPGO55', 'MPGO56'].forEach(function (id) { A(id, 'Julgue o item, relativo a projetos de edificações e à investigação geotécnica.'); });
  ['MPGO109', 'MPGO110', 'MPGO111'].forEach(function (id) { A(id, 'Um engenheiro civil contratado para vistoriar uma edificação pública construída há menos de um ano identificou vícios de execução. Julgue o item, relativo à vistoria, ao laudo e à documentação técnica.'); });
  ['PETRO51', 'PETRO52', 'PETRO53', 'PETRO54'].forEach(function (id) { A(id, 'Considere a seção central de uma viga de concreto armado em balanço, engastada em um único apoio, com carga uniformemente distribuída de cima para baixo. A seção tem a linha neutra (tracejada), quatro barras longitudinais, duas acima e duas abaixo dela, e o estribo (retângulo interno). Julgue o item.'); });
  ['BMPGO37', 'BMPGO38', 'BMPGO41', 'BMPGO42', 'BMPGO43'].forEach(function (id) { A(id, 'A respeito da Constituição Federal de 1988, julgue o item.'); });
  M('TJ21', 'E', 'A respeito da execução e da inspeção de alvenaria, julgue o item.', null, 'E',
    'Errado. A verga fica sobre o vão, na parte superior da abertura. A peça sob a abertura das janelas é a contraverga.');
  A('PETRO91', 'Em uma obra de concreto armado, as barras de aço foram emendadas com solda, pois sua composição atendia aos limites da norma. Julgue o item, conforme as normas vigentes.');
  A('PETRO92', 'Em uma obra de concreto armado que ficaria paralisada por mais de três meses, as armaduras expostas foram revestidas com graxa para evitar oxidação. Julgue o item, conforme as normas vigentes.');
  A('PETRO93', 'Durante a concretagem de uma estrutura de concreto armado, a usina informou que um caminhão betoneira foi carregado com atraso. Julgue o item, conforme as normas vigentes.',
    'Se, na chegada do caminhão, for constatado o início da pega, a concretagem só pode ser liberada após a adição de água para melhorar a trabalhabilidade, verificada pelo ensaio de abatimento (slump).');
  A('CD25G47', 'Na Câmara dos Deputados, houve redistribuição interna de competências entre secretarias, diretorias e coordenações já existentes, sem criação de órgãos e mantida a hierarquia. Considerando os conceitos de centralização, descentralização, concentração e desconcentração, julgue o item.');
  A('CD25G48', 'Por instrumento de cooperação, atividades internas de apoio da Câmara dos Deputados passaram a ser executadas materialmente por fundação pública federal de direito privado. Não houve transferência da titularidade nem da execução de serviço público; a Câmara manteve a direção e o controle. Julgue o item.');
  var maria = 'Maria, servidora federal efetiva e estável regida pela Lei n.º 8.112/1990, ocupava cargo em comissão no próprio órgão. Obteve licença para tratar de interesses particulares, sem remuneração, e a autoridade a exonerou do cargo em comissão. Julgue o item.';
  A('CD25G55', maria); A('CD25G56', maria); A('CD25G57', maria);

  /* =================== LÍNGUA PORTUGUESA E LÍNGUA INGLESA =================== */
  /* TRF6 2024 — texto de Grégore Moreira de Moura sobre o custo da Justiça */
  var justica1 = T('O Poder Judiciário brasileiro tem em torno de 80 milhões de processos judiciais. Esse número é estarrecedor quando comparado com a população do país, cuja estimativa é de 203 milhões de brasileiros. Sendo assim, para pouco mais de dois brasileiros, há um processo judicial, o que representa uma situação praticamente insustentável sob o aspecto econômico, gerencial e jurídico.');
  A('BTRF61', T('Em relação ao custo processual, no ano de 2015, por exemplo, cada brasileiro desembolsou R$ 387,00 para manter o Poder Judiciário, o que equivalia a 1,3% do PIB.'),
    'Haveria prejuízo da correção gramatical do trecho caso se inserisse vírgula logo após “R$ 387,00”.');
  A('BTRF62', justica1, 'Para atingir seu propósito comunicativo, o autor constrói o trecho com base nas tipologias textuais expositiva e argumentativa.');
  A('BTRF63', T('Já houve redução no tempo e no custo do processo judicial com a implantação do processo eletrônico, mas há muito o que fazer quando se depara com o tempo de resolutividade e os gastos para a manutenção do serviço de prestação jurisdicional.'),
    'Infere-se do trecho que a implantação do processo eletrônico é ineficiente para a redução da quantidade de processos a serem resolvidos pelo Poder Judiciário.');
  A('BTRF64', justica1, 'Com o adjetivo “estarrecedor”, o autor expressa uma avaliação negativa da quantidade de processos em tramitação no Poder Judiciário.');
  A('BTRF65', justica1, 'No segundo período do trecho, “cuja” é elemento de coesão que tanto se refere a um antecedente quanto estabelece a conexão entre orações.');
  A('BTRF66', 'Julgue o item, relativo a aspectos linguísticos de um texto sobre o custo da Justiça no Brasil.',
    'No segmento “estima-se que, no ano de 2022, tenham sido gastos, só na justiça federal, R$ 12.369.100.765”, a oração introduzida por “que” funciona como complemento direto de “estima-se”.');

  /* TRF6 2024 — texto de José Reinaldo de Lima Lopes sobre a história da justiça */
  var direito = T('O direito se constitui em esfera especial e profissional à qual se tem acesso apenas por meio de um curso universitário, enquanto a política permite acesso aos lugares de poder por meio de eleições e não exige, pois, nenhum preparo intelectual determinado.');
  A('BTRF68', direito, 'No trecho, o vocábulo “pois” está empregado com sentido conclusivo.');
  A('BTRF69', 'Ao tratar da pouca atenção dos historiadores à história da justiça, o autor escreve: «Pode-se levantar uma hipótese: a justiça foi percebida como um poder alheio àquilo que se chamou comumente política a partir do século XIX, ou seja, a luta e a disputa para ocupar posições de governo, de mando em geral e de decisão em lugar dos outros.» Julgue o item.',
    'O autor apresenta como fato comprovado que a pouca atenção à história da justiça decorre do distanciamento entre a justiça e a política.');
  A('BTRF610', T('O direito se constitui em esfera especial e profissional à qual se tem acesso apenas por meio de um curso universitário [...]. Qualquer um do povo pode ser político, mas nem todos podem ser juristas ou juízes profissionais.'),
    'Conforme o trecho, o direito e a justiça constituem campos específicos que restringem o ingresso das pessoas neles.');
  A('BTRF611', T('Uma curiosa característica da historiografia geral, política e social foi a relativamente pequena atenção dada à história da justiça ou, se quisermos ser mais limitados, à história do Poder Judiciário.'),
    'Seriam mantidos os sentidos e a correção do trecho se ele fosse reescrito assim: Uma característica curiosa da historiografia geral, política e social, se quisermos ser mais limitados, foi a atenção relativamente pequena dada à história da justiça ou à história do Poder Judiciário.');
  A('BTRF612', direito, 'A supressão do acento grave em “à qual” manteria a correção gramatical do trecho.');
  A('BTRF613', 'Considere os trechos «a justiça foi percebida como um poder alheio àquilo que se chamou comumente política» e «a política permite acesso aos lugares de poder por meio de eleições». Julgue o item.',
    'Nos trechos, “àquilo” e “aos lugares de poder” complementam, respectivamente, o sentido de um adjetivo e de um substantivo, por isso exercem a função de complemento nominal.');
  A('BTRF614', direito, 'A colocação enclítica do pronome em “O direito se constitui” prejudicaria a correção gramatical do trecho.');

  /* TCE-AC 2024 (Analista) — texto sobre inovação em compras públicas */
  var comp1 = 'O setor público enfrenta o desafio particular de oferecer serviços públicos cada vez melhores a uma população gradualmente mais bem informada, mais consciente de seus direitos e com expectativas crescentes quanto ao papel do Estado.';
  var comp2 = 'Diante desse cenário, o discurso científico sobre inovação em compras públicas ganhou maior atenção nas últimas décadas. A União Europeia reconheceu as compras públicas como instrumento de inovação e de provimento de mercados pioneiros para novos produtos, definindo-as como compras de bens e serviços que ainda não existem, que precisam ser aperfeiçoados ou que requerem pesquisa e inovação para atender às necessidades especificadas pelos usuários.';
  A('BTCEAC1', T(comp1), 'O emprego do acento grave no “a” que antecede “uma população” prejudicaria a correção gramatical do trecho.');
  A('BTCEAC2', T(comp1 + ' Devido aos recursos limitados, desenvolver serviços públicos inovadores tem sido visto [...] como fator fundamental para sustentar um alto nível de serviços.'),
    'Segundo o trecho, a população mais informada, consciente de seus direitos e exigente quanto ao Estado é um entrave à oferta de serviços públicos de qualidade.');
  A('BTCEAC3', T('Devido aos recursos limitados, desenvolver serviços públicos inovadores tem sido visto crescentemente como fator fundamental para sustentar um alto nível de serviços para cidadãos e negócios, bem como para enfrentar desafios sociais e aprimorar o bem-estar social da população.'),
    'Entende-se do trecho que o desenvolvimento de serviços públicos inovadores é considerado essencial para o enfrentamento de desafios sociais e o aprimoramento do bem-estar social da população.');
  A('BTCEAC4', T('Entre países da OCDE, a média de gastos públicos representa 12% do GDP (equivalente ao PIB) por ano. No Brasil, anualmente o governo federal gasta, em média, 5% do PIB em compras apenas de bens e serviços. Quando se incluem nos cálculos as despesas efetuadas por estados, municípios e estatais, o percentual chega próximo a 15% do PIB.'),
    'Segundo o trecho, a média anual de gastos das diferentes esferas de governo no Brasil é maior que a média anual de gastos públicos nos países da OCDE.');
  A('BTCEAC5', T(comp2), 'Depreende-se do trecho que, nos países da União Europeia, a inovação é fortemente influenciada pelas compras públicas.');
  A('BTCEAC6', 'Julgue o item, relativo a aspectos linguísticos de um texto sobre inovação em compras públicas.',
    'O trecho “A União Europeia reconheceu as compras públicas como instrumento de inovação e de provimento de mercados pioneiros para novos produtos” poderia ser reescrito, mantendo-se a correção e os sentidos, assim: A União Europeia concebe as compras públicas como forma de inovar e de provir mercados pioneiros para novos produtos.');
  A('BTCEAC7', T(comp2), 'A forma verbal “requerem” está empregada no trecho com o sentido de demandam, necessitam de.');
  A('BTCEAC8', T('Quando se incluem nos cálculos as despesas efetuadas por estados, municípios e estatais, o percentual chega próximo a 15% do PIB.'),
    'A correção gramatical e os sentidos do trecho seriam mantidos se a forma verbal “incluem” fosse substituída por considera.');

  /* TCE-AC 2024 (Analista) — texto em inglês sobre política fiscal dos estados */
  A('BTCEAC9', R('Responsible state fiscal policy requires more than just balancing the current year’s budget. It must also include ensuring that the budget is on a sustainable path. Otherwise, policymakers cannot have the lasting impact they hope for. This risk is especially high in the aftermath of the COVID-19 pandemic.'));
  A('BTCEAC10', R('Long-term budget assessments project revenue and spending several years into the future, and stress tests estimate the size of temporary budget shortfalls that would result from recessions or other economic events and gauge whether states are prepared for these events.'),
    'The word “gauge” has a similar meaning to estimate.');
  A('BTCEAC11', R('One key strategy for changing this short-term focus is for states to use long-term budget assessments and budget stress tests to regularly measure risks, anticipate potential shortfalls, and identify ways to address impending challenges.'),
    'It is correct to conclude from the excerpt that long-term budget assessments and stress tests are two crucial tools for states that seek more than a short-term approach to their budgets.');
  A('BTCEAC12', R('State leaders must be able to assess whether their decisions will be affordable over the long term or will jeopardize their ability to solve state problems or even sustain programs and services in the future.'),
    'The word “jeopardize” is used with a similar meaning to enhance.');

  /* TCE-AC 2024 (Auditor) — texto de Stanislas Dehaene sobre Descartes */
  var desc1 = T('Ridicularizar Descartes tornou-se moda em neurociência. [...] A verdade, porém, é que Descartes foi um cientista pioneiro, fundamentalmente um reducionista, cuja análise mecânica da mente humana, muito à frente de seu tempo, foi o primeiro exercício de biologia sintética e de modelagem teórica.');
  var desc2 = T('Mas foi o filósofo francês René Descartes (1596-1650) quem estabeleceu aquilo que é hoje conhecido como dualismo: a tese de que a mente dotada de consciência é feita de uma substância imaterial que não está sujeita às leis da física.');
  A('BTCEACA1', T('Ridicularizar Descartes tornou-se moda em neurociência.'), 'Na oração, “Ridicularizar Descartes” funciona como complemento da forma verbal “tornou-se”.');
  A('BTCEACA2', desc1, 'Conclui-se do trecho que o autor tem uma visão negativa do trabalho de Descartes, o que se comprova pelo emprego de “reducionista” e de “análise mecânica da mente humana”.');
  A('BTCEACA3', T('A ideia de que a mente pertence a um domínio separado, distinto do corpo, foi teorizada bem cedo, em grandes textos como o Fédon, de Platão (IV a.C.) e a Suma teológica, de Tomás de Aquino [...]. Mas foi o filósofo francês René Descartes (1596-1650) quem estabeleceu aquilo que é hoje conhecido como dualismo.'),
    'Conforme o trecho, a distinção entre mente e corpo já era conhecida desde a Antiguidade, mas apenas com Descartes ela foi teorizada e difundida.');
  A('BTCEACA4', T('O dualismo de Descartes não foi um capricho de momento — fundamentava-se em um argumento lógico que afirmava a impossibilidade, para qualquer máquina, de imitar a liberdade da mente consciente.'),
    'O trecho é construído com base na tipologia argumentativa.');
  A('BTCEACA5', desc2, 'No trecho, os dois pontos são empregados para introduzir uma explicação.');
  A('BTCEACA6', desc2, 'A supressão do acento grave em “às leis da física” prejudicaria a correção gramatical do trecho.');
  A('BTCEACA7', desc1, 'Caso se suprimisse a vírgula logo após “pioneiro”, não haveria prejuízo da correção gramatical nem da coerência, embora o sentido original fosse alterado.');

  /* TCE-AC 2024 (Auditor) — texto em inglês sobre cortes de impostos em Iowa */
  A('BTCEACA8', R('Virtually all states, regardless of political make-up, have lowered their citizens’ tax bills since 2021.'),
    'Even though both forms refer to past actions, replacing “have lowered” with lowered would make the sentence grammatically wrong.');
  A('BTCEACA9', R('Iowa, a small midwestern state, finds itself in the national economic spotlight. For conservative commentators, Iowa has emerged as America’s tax-cutting champion, a paragon of fiscal responsibility. To critics it looks more like an example of economic recklessness.'));
  A('BTCEACA10', R('Iowa is far from alone. Some 25 states have cut individual income taxes over the past years.'),
    'The word “Some” indicates that the author is giving an approximate number of states that have cut individual income taxes.');
  A('BTCEACA11', R('Until a few years ago [Iowa] had one of the highest income-tax rates in America. By 2026 it will be down to a flat tax of 3.9%.'));

  /* MPGO 2024 — texto de Renata Penzani sobre a escrita */
  var escrita2 = T('Quando o suporte sai do corpo da pessoa e vai para a argila, a cerâmica, a pedra, mais tarde para o pergaminho e o papel — suportes que criam a possibilidade de a pessoa retomar a leitura para relembrar ou refletir sobre um acontecimento —, a própria elaboração do pensamento e a transmissão do conhecimento são afetadas.');
  A('BMPGO1', 'Julgue o item, relativo a um texto sobre o surgimento da escrita.',
    'Os sentidos e a correção gramatical seriam preservados se o trecho “o surgimento da escrita não foi apenas a aquisição de mais um modo de expressão, mas também uma revolução” fosse reescrito assim: o surgimento da escrita não foi a aquisição de mais um modo de expressão, mas sim uma revolução.');
  A('BMPGO2', T('Na cultura oral, a memória é que determina o conhecimento, portanto só sabemos o que podemos recordar [...]. Dessa forma, o pensamento foi moldado a partir da repetição oral, dos padrões rítmicos ou de alguma forma mnemônica, e de um ritmo mais lento na evolução dos acontecimentos.'),
    'O vocábulo “mnemônica” está empregado no trecho no sentido de prolongada.');
  N('BMPGO3', { id: 'BMPGO3R', ctx: T('Na cultura oral, [...] o pensamento foi moldado a partir da repetição oral [...] e de um ritmo mais lento na evolução dos acontecimentos. Quando o suporte sai do corpo da pessoa e vai para a argila, a pedra, o pergaminho e o papel — suportes que criam a possibilidade de a pessoa retomar a leitura para relembrar ou refletir —, a própria elaboração do pensamento é afetada.'),
    enun: 'Infere-se do trecho que a escrita acelerou a evolução do conhecimento e favoreceu um pensamento mais reflexivo.', gab: 'C',
    just: 'Certo. O trecho opõe o ritmo “mais lento” da cultura oral ao efeito da escrita, cujo suporte permite retomar a leitura para relembrar ou refletir e altera a própria elaboração do pensamento.' });
  A('BMPGO4', T('Para além disso, sendo a leitura em suporte escrito uma atividade individualizada, solitária na maioria das vezes, ela modifica a relação de comunicação que se tinha antes na cultura oral, na qual há unidade entre quem fala e quem ouve.'),
    'Não haveria prejuízo da correção gramatical e da coerência do trecho caso se substituísse “sendo” por por ser.');
  A('BMPGO5', T('Ong classifica a escrita como uma tecnologia ainda mais extrema que a impressão e os computadores, por exemplo.'),
    'A correção gramatical e os sentidos do trecho seriam preservados se “que a impressão e os computadores” fosse reescrito como da impressão e dos computadores.');
  A('BMPGO6', escrita2, 'Seriam preservadas a correção gramatical e a coerência do trecho se o segmento entre travessões fosse isolado por vírgulas.');
  A('BMPGO7', T('Quando se fala que o surgimento da escrita não foi apenas a aquisição de mais um modo de expressão, mas também uma revolução, é porque ela mudou toda uma forma de organizar os pensamentos.'),
    'No trecho, o segmento “mas também” correlaciona ideias que se opõem, visto que o vocábulo “mas” veicula noção de oposição.');
  A('BMPGO8', escrita2, 'A flexão de “afetadas” no feminino plural justifica-se pela concordância com os termos “elaboração” e “transmissão”.');
  A('BMPGO9', T('Ela iniciou o que a impressão e os computadores apenas continuam, a redução do som dinâmico a um espaço mudo, o afastamento da palavra em relação ao presente vivo, único lugar em que as palavras faladas podem existir.'),
    'A substituição de “em que” por onde não prejudicaria a correção gramatical do trecho.');

  /* Petrobras 2021 — texto de Danilo Marcondes sobre a Alegoria da Caverna */
  var caverna = T('O texto mais célebre de A República é sem dúvida a Alegoria da Caverna, em que Platão, utilizando-se de linguagem alegórica, discute o processo pelo qual o ser humano pode passar da visão habitual que tem das coisas, “a visão das sombras”, [...] até a visão do Sol, que representa a possibilidade de alcançar o conhecimento da realidade em seu sentido mais elevado.');
  A('BPETRO1', T('A visão do Sol representa não só o alcance da Verdade e, portanto, do conhecimento em sua acepção mais completa, já que o Sol é “a causa de tudo”, mas também, como diz Sócrates na conclusão dessa passagem: “Nos últimos limites do mundo inteligível, aparece-me a ideia do Bem [...]”.'),
    'Como o “mas” tem, no trecho, sentido adversativo, os sentidos originais seriam mantidos se ele fosse substituído por porém.');
  A('BPETRO2', T('[...] como diz Sócrates: “aparece-me a ideia do Bem, [...] a causa de tudo o que há de reto e de belo. Acrescento que é preciso vê-la se se quer comportar-se com sabedoria, seja na vida privada, seja na vida pública.” [...] Para Platão, conhecer o Bem significa tornar-se virtuoso. Aquele que conhece a justiça não pode deixar de agir de modo justo.'),
    'Depreende-se do trecho que as visões de Sócrates e Platão convergem ao relacionar a justiça ao conhecimento do Bem.');
  A('BPETRO4', caverna, 'O termo “Alegoria” alude à ideia de representação.');
  A('BPETRO5', T('A possibilidade de um indivíduo tornar-se justo e virtuoso depende de um processo de transformação pelo qual deve passar. Assim, afasta-se das aparências, rompe com as cadeias de preconceitos e condicionamentos e adquire o verdadeiro conhecimento. Tal processo culmina com a visão da forma do Bem [...].'),
    'Segundo as ideias do trecho, se se acredita que pessoas que vivem unicamente a partir de redes sociais vivem de aparências, conclui-se que elas não conhecem a Verdade.');
  A('BPETRO6', caverna, 'Seria mantida a correção gramatical do trecho caso “pelo qual” fosse substituído por porque.');
  A('BPETRO8', T('Para Platão, conhecer o Bem significa tornar-se virtuoso. Aquele que conhece a justiça não pode deixar de agir de modo justo.'),
    'No último período do trecho, o termo “Aquele” exerce a função sintática de sujeito da oração “que conhece a justiça”.');

  /* Petrobras 2021 — texto sobre fake news e crimes contra a honra */
  var fake2 = T('Sob um olhar semântico, dizer “compartilhei fake news de alguém” não carrega qualquer sentimento de culpa, ou se carrega, ela é mínima. Agora, dizer “cometi um crime contra honra” já traz outras implicações, não só de ordem jurídica, mas também de grande responsabilidade pessoal.');
  A('BPETRO9', T('Muito tem sido escrito e debatido sobre a afirmativa de que a “Internet é terra de ninguém”. Tal afirmativa [...] ainda alimenta uma sensação de impunidade [...]. A expressão fake news, em particular, representa um estrangeirismo que mascara diversos crimes cometidos contra a honra, como injúria, calúnia e difamação.'),
    'No trecho, predomina o tipo textual dissertativo-argumentativo.');
  A('BPETRO10', fake2, 'No trecho, as frases “compartilhei fake news de alguém” e “cometi um crime contra honra” são consideradas equivalentes, já que o compartilhamento de fake news pode ser crime.');
  A('BPETRO12', T('A expressão fake news, em particular, representa um estrangeirismo que mascara diversos crimes cometidos contra a honra, como injúria, calúnia e difamação.'),
    'Infere-se do segmento “um estrangeirismo que mascara diversos crimes” que há outros estrangeirismos que não mascaram crimes nem a eles se associam.');
  A('BPETRO13', T('Tal afirmativa não é de hoje, mas ainda alimenta uma sensação de impunidade ou de falsa responsabilidade do que é postado ou compartilhado na Internet e pelas redes sociais.'),
    'Sem prejuízo dos sentidos e da correção, o segmento “falsa responsabilidade do que é postado ou compartilhado” poderia ser substituído por falsa responsabilidade do que se posta ou se compartilha.');
  A('BPETRO14', T('Muito tem sido escrito e debatido sobre a afirmativa de que a “Internet é terra de ninguém”.'),
    'A forma verbal “escrito” poderia ser corretamente substituída por escrevido.');
  A('BPETRO15', fake2, 'Feitas as devidas alterações de maiúsculas e minúsculas, o ponto final logo após “ela é mínima” poderia ser corretamente substituído por ponto e vírgula.');

  /* Petrobras 2021 — texto sobre o caminho do petróleo */
  A('BPETRO16', T('O caminho do petróleo do poço até virar combustível no carro das pessoas é longo e complexo. Começa na procura: acertar onde furar e encontrar petróleo exige conhecimento técnico de geólogos e geofísicos e bastante investimento. E, mesmo com um time de experts do mais alto nível, achar petróleo não é certo.'),
    'Infere-se do trecho que achar petróleo não é uma certeza porque os erros na identificação do local de perfuração impedem o reconhecimento da localização exata do produto.');
  A('BPETRO17', T('O caminho do petróleo do poço até virar combustível no carro das pessoas é longo e complexo. Começa na procura [...]. Transportar o petróleo do mar até as refinarias é também uma tarefa complexa [...]. Em terra, ele é tratado em refinarias [...]. Os produtos são então disponibilizados às diversas distribuidoras [...].'),
    'A informação apresentada no primeiro período do trecho é desenvolvida nos períodos seguintes.');
  A('BPETRO18', 'Julgue o item, relativo a um texto sobre a cadeia do petróleo no Brasil.',
    'Se o trecho “A PETROBRAS responde por cerca de 80% dos combustíveis ofertados no Brasil” fosse reescrito como A PETROBRAS está à frente de aproximadamente 80% dos combustíveis que produz-se no Brasil, seriam mantidos os sentidos e a correção gramatical.');
  A('BPETRO19', T('Em terra, ele é tratado em refinarias, que separam desse óleo as frações de gasolina, diesel e gás de cozinha, entre outros derivados.'),
    'No trecho, a oração iniciada por “que separam” é adjetiva restritiva, na medida em que delimita o tipo específico de refinarias a que o texto se refere.');

  /* Petrobras 2021 — texto de Guy Deutscher sobre a origem da linguagem */
  var latente = 'Além disso, a capacidade para a linguagem pode ter permanecido latente no cérebro por milhões de anos, sem ter sido de fato colocada em uso.';
  A('BPETRO21', T('Alguns linguistas acreditam que o Homo erectus [...] já tinha uma linguagem. Os argumentos que eles dão são que o Homo erectus tinha um cérebro relativamente grande e usava ferramentas de pedra primitivas [...]. O uso de ferramentas certamente não requer linguagem. [...] O tamanho do cérebro é igualmente problemático como indicador da presença de linguagem [...].'),
    'O autor do trecho contesta os argumentos usados por alguns linguistas que defendem a ideia de que o Homo erectus apresentava linguagem.');
  A('BPETRO23', T('Os argumentos que eles dão são que o Homo erectus tinha um cérebro relativamente grande e usava ferramentas de pedra primitivas, porém bastante padronizadas.'),
    'A correção do trecho seria mantida se “primitivas” fosse flexionado no singular, mas o sentido mudaria: no original, o adjetivo qualifica “ferramentas”; no singular, qualificaria “pedra”.');
  A('BPETRO24', T('O uso de ferramentas certamente não requer linguagem. Chimpanzés usam galhos como ferramentas para caçar cupins, ou pedras para quebrar nozes. Obviamente, mesmo as ferramentas mais primitivas do Homo erectus (pedras lascadas) são muito mais sofisticadas que qualquer coisa usada por chimpanzés, mas ainda assim não há uma razão convincente para crer que essas pedras não pudessem ter sido produzidas sem linguagem.'),
    'O advérbio “Obviamente” tem papel importante na argumentação, ao realçar uma informação já tomada como conhecimento geral.');
  A('BPETRO25', T(latente), 'Caso fosse suprimida a vírgula logo antes de “sem”, haveria prejuízo para a correção gramatical do trecho, embora o sentido fosse mantido.');
  A('BPETRO26', T('O tamanho do cérebro é igualmente problemático como indicador da presença de linguagem, porque ninguém tem uma boa ideia de quanto cérebro exatamente é necessário para a linguagem. ' + latente),
    'A expressão “Além disso” introduz o argumento mais forte apresentado pelo autor para comprovar sua tese acerca do surgimento da linguagem humana.');

  /* Petrobras 2021 — texto de Martin Puchner sobre a história da escrita */
  var puchner = T('As tecnologias de contar e escrever histórias não seguiram um caminho linear. A própria escrita foi inventada pelo menos duas vezes, primeiro na Mesopotâmia e depois nas Américas. Os sacerdotes indianos se recusavam a escrever as histórias sagradas por medo de perder o controle sobre elas. [...] As invenções relacionadas à escrita tinham muitas vezes efeitos colaterais inesperados.');
  A('BPETRO27', puchner, 'O trecho é predominantemente informativo.');
  A('BPETRO28', 'Julgue o item, relativo a um texto sobre a história da escrita.',
    'Estaria mantida a correção gramatical do trecho “Os sacerdotes indianos se recusavam a escrever as histórias sagradas por medo de perder o controle sobre elas. Professores carismáticos (como Sócrates) se recusaram a escrever” se o pronome “se”, nas duas ocorrências, passasse de proclítico a enclítico.');
  A('BPETRO29', puchner, 'O emprego predominante do pretérito perfeito no trecho tem o propósito de apresentar fatos ocorridos no passado cujos efeitos ainda são sentidos e afetam o tempo presente.');
  A('BPETRO30', puchner, 'Em “As invenções relacionadas à escrita”, o acento indicativo de crase justifica-se pela fusão de preposição e artigo feminino em uma locução adverbial de modo.');

  /* Petrobras 2021 — texto em inglês sobre o Velho Oeste na Espanha */
  var tabernas = R('But this busy movie site is located in Spain — not Montana or Texas. It’s one of three faux Old Western towns in the small village of Tabernas and the surrounding desert of the Almería province.');
  var almeria = R('Almería has hosted more than 500 productions, including blockbuster films (Patton, Terminator: Dark Fate) and TV shows (Doctor Who). “Our landscapes are very convenient. We have sea, desert, and snowy mountains all within a short distance,” says local producer Plácido Martínez. “We can serve as Texas, New Mexico, Arizona, California, and endless other natural settings.”');
  A('BPETRO31', tabernas);
  A('BPETRO32', R('“I’ve always liked horses and the [U.S.] West,” says 29-year-old Ricardo Cruz Fernández, a stuntman and cowboy who appeared in recent productions including Game of Thrones.'),
    'In the excerpt, the word “stuntman” means a man who performs a dangerous action which needs to be done by someone skilled, especially instead of an actor in a film or television programme.');
  A('BPETRO33', R('Molina belongs to a small community of local cowboy actors and stuntmen in Tabernas [...]. Steeped in the golden era of Westerns, these actors embody the values of their movie heroes: pride, bravado, freedom, and a trusting relationship with horses.'),
    'According to the excerpt, the actors of the small community in Tabernas avoid being like their movie heroes.');
  A('BPETRO35', almeria, 'According to the excerpt, Almería’s actors have already played in Texas, New Mexico, Arizona, California, and endless other natural settings.');
  A('BPETRO36', R('Between productions, he performs daily shows at Fort Bravo for thousands of tourists who visit the set each year. In one show, Fernández portrays a bank robber who absconds with some gold.'),
    'The fragment “absconds with” could be correctly replaced with keeps, without changing the meaning of the excerpt.');
  A('BPETRO37', 'Judge the item, concerning a text about cowboy actors in southern Spain.',
    'The fragment “Fernández started his career as a cowboy after completing a stuntman course a decade ago” can be correctly rewritten as A decade ago, Fernández started his career as a cowboy and then he completed a stuntman course, without changing its meaning.');
  A('BPETRO38', almeria, 'It can be inferred from the excerpt that many different productions were made in Almería because its landscapes are very convenient and diversified.');
  A('BPETRO39', R('“When I was a kid, I could only dream about all this,” says the 68-year-old former actor and stuntman [Rafael Molina]. “My aspiration was to see a film set firsthand. Today I own one of the most famous ones in the history of Western movies.”'));
  A('BPETRO40', tabernas, 'According to the excerpt, in Spain there are villages that were very important cities during the time of the American Wild West.');

  /* Petrobras 2021 — texto em inglês sobre quem abandona o smartphone */
  var godsend = R('Yet, while some worry about how much time they spend on their handset, for millions of others they are a godsend. “More than ever, access to healthcare, education, social services and often to our friends and family is digital, and the smartphone is an essential lifeline for people,” says a spokesperson for UK mobile network Vodafone.');
  A('BPETRO41', godsend, 'According to the excerpt, handsets are essential for people because sometimes healthcare, education and social services are offered only through smartphones.');
  A('BPETRO42', godsend, 'In the excerpt, the word “Yet” is synonymous with However.');
  A('BPETRO44', R('Dulcie Cowling: “Everyone is missing out on real life. [...] I thought about how much of my life is spent looking at the phone and what else could I do.” Alex Dunedin: “I think that the danger of technologies is that they are emptying our lives.”'),
    'People who are giving up on their mobile devices believe they were spending too much time being connected and were missing their real lives because of that.');
  A('BPETRO45', R('The 36-year-old [Dulcie Cowling] decided at the end of last year that getting rid of her handset would improve her mental health. So, over Christmas she told her family and friends [...]. She recalls that one of the pivotal moments that led to her decision was a day at the park with her two boys.'),
    'Dulcie Cowling decided to ditch her smartphone while she was in the park with her kids and told her family and friends about it after Christmas.');
  A('BPETRO46', R('Alex Dunedin binned his smartphone two years ago. “Culturally we have become addicted to these tools,” says the educational researcher and technology expert. “They are blunting cognition and impeding productivity.”'),
    'In the excerpt, the pronoun “They” refers to the people who own a smartphone.');
  A('BPETRO47', R('Yet for a small, but growing number of people, enough is enough. [...] Yet, while some worry about how much time they spend on their handset, for millions of others they are a godsend.'),
    'Although there is a movement of people ditching their smartphones to have what they think is a better quality of life, millions believe digital technology is essential to their lives.');

  /* Petrobras 2021 — texto em inglês sobre Marte */
  A('BPETRO49', R('This led to numerous stories about Martians, some of whom invade Earth, like in the 1938 radio drama, The War of the Worlds. According to an enduring urban legend, many listeners believed the story to be real news coverage of an invasion, causing widespread panic.'));

  /* TRT8 2022 — texto sobre o capitalismo de vigilância (múltipla escolha → Certo/Errado com trecho) */
  var vig4 = T('Ao se generalizar na sociedade e se aprofundar na vida cotidiana, o capitalismo de vigilância capturou e desviou o efeito democratizador da Internet, que abrira a todos o acesso à informação. Ele passou a elaborar instrumentos para modificar e conformar os nossos comportamentos.');
  M('BTRT81', 'E', vig4, null, 'E',
    'Errado. O trecho diz o contrário: o capitalismo de vigilância capturou e desviou o efeito democratizador da Internet, que abrira a todos o acesso à informação, e passou a elaborar instrumentos para conformar comportamentos.');
  M('BTRT82', 'A', T('As Big Techs — seguidas por outras firmas, laboratórios e governos — usam tecnologias da informação e comunicação (TIC) para expropriar a experiência humana, que se torna matéria-prima processada e mercantilizada como dados comportamentais.'),
    'Esta reescrita do trecho é gramaticalmente correta e preserva seus sentidos: As Big Techs, seguidas de outras firmas, laboratórios e governos, usam TIC para expropriar a experiência humana, que se torna matéria-prima processada e mercantilizada na forma de dados de comportamento.', 'C',
    'Certo. “Seguidas de” e “seguidas por” são regências admitidas, o intercalado fica bem delimitado por vírgulas e “na forma de dados de comportamento” equivale a “como dados comportamentais”.');
  M('BTRT83', 'C', T('O usuário cede gratuitamente as suas informações ao concordar com termos de uso, utilizar serviços gratuitos ou, simplesmente, circular em espaços onde as máquinas estão presentes.'),
    'A oração “onde as máquinas estão presentes” qualifica e restringe o termo “espaços”.', 'C',
    'Certo. “Onde as máquinas estão presentes” é oração adjetiva restritiva: delimita de que espaços se fala.');
  M('BTRT84', 'C', T('A primeira provocou a retração dos investimentos nas startups, o que levou a Google a explorar comercialmente os dados dos usuários de seus serviços.'),
    'O pronome “seus” funciona como elemento de coesão e retoma o termo “Google”.', 'C',
    'Certo. Em “os dados dos usuários de seus serviços”, “seus” retoma “a Google”: são os serviços da Google.');
  M('BTRT85', 'C', T('Outras circunstâncias foram ocasionais: o estouro da bolha da internet em 2000 e os ataques terroristas do 11 de setembro.'),
    'O segmento “o estouro da bolha da internet em 2000 e os ataques terroristas do 11 de setembro” exerce a função de sujeito.', 'E',
    'Errado. O sujeito é “Outras circunstâncias”. Depois dos dois pontos, o segmento enumera essas circunstâncias: é aposto enumerativo.');
  M('BTRT86', 'B', T('Para se prevenir contra novos ataques, as autoridades norte-americanas tornaram-se ávidas de programas de monitoramento dos usuários da Internet e se associaram às empresas de tecnologia.'),
    'O termo “ávidas” poderia ser substituído, sem alterar o sentido e a correção do trecho, por avarentas.', 'E',
    'Errado. “Ávido” é quem deseja algo com ardor: o sinônimo é “desejosas”. “Avarento” é quem tem apego excessivo ao dinheiro, o que muda o sentido.');

  /* Câmara 2025 — texto sobre Linguagem Simples */
  var ls1 = 'Linguagem Simples é o nome dado no Brasil a um conjunto de técnicas de redação e de design da informação usadas para produzir textos claros para o público-alvo das comunicações oficiais.';
  var lsMeta = 'Tendo-se em mente que a clareza, e não a simplicidade, é a meta última da técnica, é possível e desejável usá-la até mesmo para redigir um texto técnico para o público especialista em determinado assunto.';
  var lsMote = 'Embora no Brasil o termo “Linguagem Simples” tenha prevalecido, o mote da técnica não é exatamente “quanto mais simples, melhor”, mas “quanto mais claro, melhor”.';
  var lsBenef = T('Uma pessoa pode, por exemplo, redigir um texto para um site de câmara municipal com o objetivo de que seja compreendido por cidadãos com ensino médio completo [...]. Em qualquer dessas situações, tanto o público como a instituição vão se beneficiar do uso da Linguagem Simples.');
  A('CD25G01', T('Quando falamos em “público-alvo”, estamos tratando especificamente da parcela da população a quem a informação se destina.'),
    'O emprego da vírgula logo após “público-alvo” é obrigatório e se justifica pela necessidade de separar duas orações que apresentam o mesmo sujeito.');
  A('CD25G02', T(ls1), 'Seria mantida a correção gramatical do trecho caso o termo “usadas” fosse substituído por usado.');
  A('CD25G03', T(ls1 + ' [...] Tendo-se em mente que a clareza, e não a simplicidade, é a meta última da técnica [...].'),
    'O trecho informa que Linguagem Simples é um padrão de linguagem, com estruturas e palavras próprias, voltado à simplificação dos textos para a completa assimilação de seu conteúdo pelo público.');
  A('CD25G04', T(lsMeta), 'A substituição de “a meta última” por a última meta alteraria o sentido original do trecho e poderia comprometer a coerência.');
  A('CD25G05', T(lsMeta + ' Em casos como esse, trocar palavras difíceis por outras mais fáceis não será a primeira preocupação. [...] A Linguagem Simples vai muito além da escolha de palavras.'),
    'Segundo o trecho, o cuidado com a escolha das palavras varia conforme o público e pode chegar a ser considerado irrelevante.');
  A('CD25G06', T(lsMote + ' Tendo-se em mente que a clareza, e não a simplicidade, é a meta última da técnica [...].'),
    'Conforme o trecho, a clareza é uma ferramenta da Linguagem Simples para simplificar os temas, de modo que sejam plenamente entendidos por toda a população.');
  A('CD25G07', lsBenef, 'Os termos “por cidadãos com ensino médio completo” e “do uso da Linguagem Simples” desempenham a mesma função sintática, ambos em orações na voz passiva.');
  A('CD25G08', lsBenef, 'O pronome “se”, em “vão se beneficiar”, poderia ser corretamente deslocado para depois do infinitivo: vão beneficiar-se.');
  A('CD25G09', T(lsMote), 'Como a locução “tenha prevalecido” está no pretérito, o verbo da oração principal está no presente histórico, em obediência ao paralelismo temporal.');

  /* Câmara 2025 — texto sobre o aquecimento do pantanal */
  A('CD25G10', 'Considere os trechos «o pantanal, o menor bioma brasileiro, foi o que mais aqueceu» e «para o Brasil como um todo e para os biomas amazônia e cerrado». Julgue o item.',
    'O termo “brasileiro” desempenha a mesma função sintática dos termos “amazônia” e “cerrado”: o primeiro modifica o nome “bioma”, e os dois últimos, “biomas”.');
  A('CD25G11', T('O ritmo de crescimento do aquecimento no pantanal é 60% superior ao calculado no mesmo período para o Brasil como um todo.'),
    'O segmento “superior ao calculado no mesmo período” poderia ser corretamente reescrito como superior aquele calculado em idêntico período.');
  A('CD25G12', T('Entre 1985 e 2024, a temperatura média no bioma subiu 0,47 °C por década. Em quatro décadas, o aumento acumulado no pantanal chega a quase 1,9 °C. O ritmo de crescimento do aquecimento no pantanal é 60% superior ao calculado no mesmo período para o Brasil como um todo [...].'),
    'Predomina, no trecho, a tipologia descritiva.');
  A('CD25G13', T('Em quatro décadas, o pantanal, o menor bioma brasileiro, foi o que mais aqueceu e teve a maior redução na quantidade de chuvas. [...] Entre 1985 e 2024, a temperatura média no bioma subiu 0,47 °C por década.'),
    'De acordo com o trecho, menor pluviosidade e aumento do calor no pantanal se caracterizam como um processo gradativo.');

  /* Câmara 2025 — texto sobre mulheres na política */
  var uip4 = T('A presidente da UIP, Tulia Ackson, classificou o ritmo de avanço como “glacial” e ressaltou a urgência de medidas concretas para garantir representação igualitária. O secretário-geral da UIP, Martin Chungong, defendeu o engajamento ativo de homens como parte da solução.');
  A('CD25G14', 'Considere os trechos «É hora de os governos agirem para assegurar que as mulheres tenham um assento igual em todas as mesas onde o poder é exercido» e «[Tulia Ackson] ressaltou a urgência de medidas concretas para garantir representação igualitária». Julgue o item.',
    'As orações “para assegurar...” e “para garantir representação igualitária” exercem função adverbial e expressam circunstância de finalidade.');
  A('CD25G15', T('Ainda, o mapa de 2025 mostra que, enquanto as mulheres lideram importantes pastas ligadas a direitos humanos, igualdade de gênero e proteção social, os homens dominam áreas como relações exteriores, orçamento e defesa.'),
    'Estariam mantidos os sentidos e a correção do trecho se “Ainda, o mapa de 2025 mostra que” fosse reescrito assim: O mapa de 2025 mostra, ainda, que.');
  A('CD25G16', T('A edição de 2025 do mapa Mulheres na política mostra que os homens continuam a superar as mulheres em mais de três vezes nas posições executivas e legislativas em todo o mundo.'),
    'É facultativo o emprego do acento indicativo de crase no vocábulo “as” em “superar as mulheres”.');
  A('CD25G17', uip4, 'Infere-se do trecho que a UIP defende a proteção masculina às mulheres como medida concreta para a representação igualitária, o que sugere o enraizamento do machismo na sociedade.');
  A('CD25G18', uip4, 'O ritmo de avanço das medidas para a igualdade de gênero na liderança política no mundo é considerado desalentador pela autoridade máxima da UIP.');
  A('CD25G19', T('Bahous também lembrou que cotas, reformas eleitorais e vontade política são soluções para desmantelar barreiras sistêmicas. “O tempo das medidas paliativas acabou. É hora de os governos agirem para assegurar que as mulheres tenham um assento igual em todas as mesas onde o poder é exercido”, destacou.'),
    'O vocábulo “paliativas” poderia ser substituído, sem comprometimento da coerência do trecho, por protelatórias.');
  A('CD25G20', T('A presidente da UIP, Tulia Ackson, classificou o ritmo de avanço como “glacial” e ressaltou a urgência de medidas concretas para garantir representação igualitária.'),
    'O emprego de presidenta em vez de “presidente” não só preservaria a correção do trecho como também evidenciaria uma opção política de gênero, em consonância com os ideais de maior representatividade das mulheres no poder.');

  /* Câmara 2025 — texto sobre racismo e machismo */
  A('CD25G21', T('Todos reconhecem que há discriminação contra pretos e pardos, mas não contra as mulheres; todos reconhecem que há racismo, mas não reconhecem que há machismo.'),
    'Nos segmentos “reconhecem que há discriminação” e “reconhecem que há machismo”, a substituição de “que há” por a existência de manteria a correção gramatical e o paralelismo sintático.');
  A('CD25G22', 'Sobre uma pesquisa feita em 1988 a respeito do racismo, o autor escreve: «Seus resultados mostravam um cenário contraditório: ao mesmo tempo em que 97% dos entrevistados afirmavam não ter preconceito racial, 98% dos entrevistados diziam conhecer pessoas racistas e ter presenciado situações de discriminação racial.» Julgue o item.',
    'Infere-se dos resultados da pesquisa que os entrevistados implicitamente negavam fazer parte do coletivo a que pertenciam.');
  A('CD25G23', T('Todas as gerações negam a discriminação contra as mulheres, apesar de a geração dos que nasceram no novo milênio ser a que menos percebe a discriminação de gênero, tanto mulheres quanto homens.'),
    'Depreende-se do trecho que a geração dos nascidos no novo milênio é menos afetada pela discriminação de gênero que as demais.');
  A('CD25G24', T('Em 1988, ano do centenário da abolição da escravatura no Brasil, foi promulgada a atual Constituição Federal, a primeira a tratar da questão racial e a que tornou o racismo crime inafiançável e imprescritível.'),
    'No segmento “a primeira a tratar da questão racial e a que tornou o racismo crime”, a conjunção “e” liga por adição duas orações adjetivas introduzidas pela preposição “a”.');
  A('CD25G26', T('Hoje, o debate sobre o racismo cresceu. As cotas raciais são um sucesso social e acadêmico comprovado.'),
    'Os dois períodos do trecho poderiam ser reescritos em um só, sem prejuízo da correção e da coerência, assim: Atualmente, considerando o avanço do debate sobre o racismo, as cotas raciais já são aceitas como um sucesso social e acadêmico.');

  /* Câmara 2025 — texto em inglês de David Marcello sobre a redação legislativa */
  var marcello1 = R('Little attention has been devoted to legislation’s point of origin — the legislative drafting process. Such commentary as has been offered is essentially technical in nature. However, the relationship between drafter and text is the furthest thing from a technical, value-neutral enterprise.');
  A('CD25G27', R('Obviously, the drafter who less frequently inquires about the client’s desires will have greater latitude to exercise discretion and accordingly can play more of an “advocacy” role in shaping the legislation.'),
    'The fragment “greater latitude to exercise discretion” could be replaced with greater possibilities to be discreet without changing the original meaning.');
  A('CD25G28', R('Obviously, the drafter who less frequently inquires about the client’s desires will have greater latitude to exercise discretion [...], a situation which can lead to his or her sidestepping the duty of abiding by a client’s decisions [...]. But this is not to paint too malevolent a portrait of legislative drafting personnel.'),
    'In “But this is not to paint too malevolent a portrait”, “this” does not refer to a specific previous word, but to the entire previous statement.');
  A('CD25G29', marcello1, 'The excerpt confronts the idea of neutrality of those whose work is to write texts that may become law.');
  A('CD25G31', R('But this is not to paint too malevolent a portrait of legislative drafting personnel. They are not a fifth column of subversives who pursue personal advocacy objectives in everything that they do. Indeed, many may even be unaware of their power.'),
    'The author’s main point is to reveal how drafters deliberately manipulate the drafting process according to their own interests.');
  A('CD25G32', marcello1, 'It is correct to conclude from the excerpt that its author believes that not much has been explored about the true nature of legislative drafters’ work, which is not merely technical and impartial.');

  /* Câmara 2025 — texto em inglês de Sean J. Kealy sobre tecnologia no Legislativo */
  A('CD25G33', R('I spent 9 years working with legislators and senior staff, and the way they sometimes approached technology was at times comical―at times frightening.'),
    'The negative way some legislators reacted to technology sometimes scared the author of the excerpt.');
  A('CD25G34', R('When conducting a survey on the use of technology in the legislative process, one of the questions I asked was “Has the legislature, as an institution or in part, resisted technology based changes?”'),
    'The verb tense used in the survey question indicates that there was no specific point in time respondents had to consider in their answers.');
  A('CD25G35', R('I asked this question based on my own experience with the Massachusetts Legislature. I spent 9 years working with legislators and senior staff [...]. I also saw an older legislative drafter become befuddled and angry when he was forced to start using the “track changes” and “comment” functions on Microsoft Word rather than marking up a bill with his beloved red pencil.'));
  A('CD25G36', R('My friends and I watched on―and laughed―the first time a laptop computer or an iPhone made its way onto the floor of the Massachusetts House or Senate and the members gathered around it, acting as though they were looking at an artifact that had been dropped from Mars.'),
    'In the excerpt, the author shows his skepticism about the use of technology in the legislative process.');

  /* Câmara 2003 — texto em inglês sobre patrimônio arquitetônico */
  var her1 = 'Buildings are the clearest expression of a people at a given historical period, exemplifying their way of living, their available technology and their artistic ideals. Being more durable than other cultural manifestations, often sheltering or incorporating other arts, such as sculpture, painting, furniture and popular art and artefacts, buildings make up the great majority of listed items, even those which are listed simply because of their historical significance.';
  var her2 = 'In Brazil, the preservation of the country’s cultural heritage, where it is of national importance, is the responsibility of the federal government, through the Institute for National Artistic and Historical Heritage (IPHAN). Under the Brazilian constitution, it is also the responsibility of state and municipal governments, within their respective spheres, to provide for the preservation of items of local or regional interest [...].';
  var infere = function (s) { return 'Read the excerpt below. «' + s + '» From the excerpt, it can be inferred that'; };
  var noTrecho = function (s) { return 'Read the excerpt below. «' + s + '» In the excerpt,'; };
  A('CDI21', infere(her1)); A('CDI22', infere(her1)); A('CDI23', infere(her1));
  A('CDI24', infere(her2)); A('CDI25', infere(her2));
  A('CDI26', infere('Buildings are the clearest expression of a people at a given historical period [...]. In Brazil, the preservation of the country’s cultural heritage, where it is of national importance, is the responsibility of the federal government, through [...] IPHAN. [...] State governments and many municipal governments have their own organs dedicated to cultural preservation.'));
  A('CDI28', noTrecho(her1), 'the plural of “people” can be peoples.');
  A('CDI29', noTrecho(her1), '“those” refers to “other arts”.');
  A('CDI30', noTrecho(her2), '“through” can be correctly replaced by though.');
  A('CDI31', noTrecho(her2), '“also” means as well.');

  /* Câmara 2003 — texto em inglês sobre a ponte Gateshead Millennium */
  var conclui = function (s) { return 'Read the excerpt below. «' + s + '» From the excerpt, it can be concluded that'; };
  var ponte1 = conclui('Rising high above the Tyne, the “blinking eye” has become more of a fashion icon than a bridge since it opened a year ago. But the debate about whether the shiny, graceful curves of the 413 ft-wide span on the world’s first tilting bridge represent adventurous engineering or design at its best, intensified last night when the Gateshead Millennium bridge scooped Britain’s premier architectural award.');
  var ponte2 = conclui('Judges for the RIBA’s annual Stirling Prize said the “simple and incredibly elegant” £22 million bridge was not only an innovative and bold engineering challenge, but also the one piece of architecture that would be remembered by people this year.');
  A('CDI32', ponte1, 'the “blinking eye” is an unquestionable piece of art.');
  A('CDI33', ponte1, 'the “Tyne” is a river, a road or a railway.');
  A('CDI34', ponte1, 'the so-called “fashion icon” is an old-dated construction.');
  A('CDI35', ponte1); A('CDI36', ponte1); A('CDI37', ponte2); A('CDI38', ponte2); A('CDI39', ponte1);
  A('CDI40', conclui('Praising the structure at an awards ceremony last night, Paul Finch, editorial director of the Architects Journal [...], hailed the bridge as a “truly heroic piece of engineering and construction.”'));

  /* Inéditas em inglês: cada item passa a trazer só o parágrafo de que precisa */
  var bim1 = R('For decades, public works were designed on paper and later on two-dimensional drawings that rarely spoke to one another. As a result, clashes between structural, electrical and plumbing systems were often discovered only on site, when fixing them was expensive.');
  var bim2 = R('Building Information Modelling (BIM) has changed that picture. Rather than producing separate drawings, designers build a shared digital model in which every element — a beam, a duct, a door — carries data about its geometry, materials and cost. Because the model is shared, conflicts can be detected before construction begins.');
  var bim3 = R('Several countries now require BIM on large publicly funded projects, arguing that it reduces waste and improves accountability. Critics, however, point out that small firms may struggle to afford the software and training, which could narrow competition in public tenders.');
  var bim4 = R('Even so, the trend seems irreversible. The question is no longer whether public agencies will adopt BIM, but how quickly they can train their own staff to read and audit the models they receive.');
  A('NBI01', bim1, 'According to the excerpt, conflicts between building systems were usually identified during construction.');
  A('NBI02', bim1, 'In “when fixing them was expensive”, “them” refers to “public works”.');
  A('NBI03', bim2, '“Rather than” could be replaced with Instead of without changing the meaning of the sentence.');
  A('NBI04', bim2, 'The excerpt states that BIM models contain only geometric information about building elements.');
  A('NBI05', bim2, '“Because” introduces the reason why conflicts can be detected before construction begins.');
  A('NBI06', bim3, 'The critics mentioned in the excerpt argue that BIM increases waste in public works.');
  A('NBI07', bim3, '“however” introduces an idea that contrasts with the governments’ arguments.');
  A('NBI08', bim3, 'In the context, the word “tenders” refers to public bidding processes.');
  A('NBI09', bim4, 'The author concludes that public agencies will probably abandon BIM because of its costs.');
  A('NBI10', bim4, 'It can be inferred from the excerpt that public agencies need staff capable of checking the models delivered by contractors.');
  var dados1 = R('Parliaments have always published their decisions, but for most of their history they did so in formats that citizens could hardly use: printed journals, scanned documents and lengthy minutes. Over the past fifteen years, a growing number of legislatures have begun releasing information as open data — machine-readable files that anyone can download, combine and analyse free of charge.');
  var dados3 = R('Nevertheless, openness does not automatically lead to participation. Data that is published but poorly documented may be misread, and online consultations sometimes attract only well-organised interest groups. Transparency, in other words, is a necessary but not a sufficient condition for accountability.');
  var dados4 = R('Experts therefore recommend that legislatures pair open data with plain-language summaries and active outreach, so that people who are not specialists can actually make use of what is made available.');
  A('NBI11', dados1, 'According to the excerpt, parliaments only started publishing their decisions fifteen years ago.');
  A('NBI12', dados1, '“Machine-readable files” are files that can be processed by computers.');
  A('NBI13', dados1, 'The expression “free of charge” means without payment.');
  A('NBI14', R('Journalists can now track how each member votes, civic groups build apps that alert users when a bill on a topic of interest is introduced, and researchers compare legislative productivity across countries.'),
    'The excerpt gives examples of how journalists, civic groups and researchers use open parliamentary data.');
  A('NBI15', dados3, '“Nevertheless” could be replaced with Moreover without changing the meaning of the excerpt.');
  A('NBI16', dados3, 'The author believes that publishing data is enough to guarantee accountability.');
  A('NBI17', dados4, 'In the excerpt, “actually” means currently.');
  A('NBI18', dados4, 'In the excerpt, “pair” is used as a verb meaning combine.');
  A('NBI19', dados3, 'In “Data that is published but poorly documented may be misread”, “may” expresses possibility.');
  var ponteM1 = R('When a bridge collapses, the headlines usually focus on the moment of failure. Engineers, however, know that most collapses are the final chapter of a long story of deferred maintenance. Cracks that went unrepaired, drainage that was allowed to clog and corroded steel that was never replaced slowly reduce a structure’s capacity until an ordinary load becomes too much.');
  var ponteM2 = R('Climate change is shortening that story. Heavier rainfall erodes foundations, longer heat waves stress expansion joints and rising sea levels accelerate corrosion in coastal areas. Infrastructure designed for the climate of the twentieth century is increasingly operating outside the conditions it was built for.');
  var ponteM3 = R('Budget rules often make the problem worse. Inaugurating a new road is politically attractive; repainting an old viaduct is not. Unless maintenance is planned and funded as carefully as new construction, the bill will eventually arrive — and it will be higher.');
  A('NBI20', ponteM1, 'According to the excerpt, bridge collapses are usually caused by a single unexpected event.');
  A('NBI21', ponteM1, 'The expression “deferred maintenance” refers to maintenance that was postponed.');
  A('NBI22', ponteM1, '“too much” refers to an ordinary load that the weakened structure can no longer support.');
  A('NBI23', ponteM2); A('NBI24', ponteM2, 'The excerpt claims that infrastructure built in the twentieth century is immune to climate change.');
  A('NBI25', ponteM3, 'In the excerpt, the semicolon separates two contrasting ideas.');
  A('NBI26', ponteM3); A('NBI27', ponteM3);
  A('NBI28', R('Engineers [...] know that most collapses are the final chapter of a long story of deferred maintenance. [...] Climate change is shortening that story. [...] Unless maintenance is planned and funded as carefully as new construction, the bill will eventually arrive — and it will be higher.'),
    'The main idea of the excerpt is that maintenance should receive the same attention as new construction, especially in a changing climate.');
})();
