/*
 * Banco de questões objetivas — Treinador Analista Legislativo / Engenharia Civil
 * Base de conteúdo: Edital nº 1 – Câmara dos Deputados – Analista Legislativo (2026), Cargo 6.
 *
 * Fontes das questões:
 *  - CD 2003  : Câmara dos Deputados, Analista Legislativo / Engenheiro Civil (CESPE/UnB, 23/11/2003), itens 101–200.
 *  - TRE-BA   : TRE/BA, Analista Judiciário – Engenharia Civil (CESPE/UnB, 21/2/2010), itens 41–110.
 *  - TJRO     : TJ/RO, Analista Judiciário – Engenheiro Civil (CESPE/UnB, 11/11/2012), questões 21–60.
 *  - Inédita  : itens escritos no estilo Cebraspe para cobrir tópicos do edital atual.
 * Os gabaritos das provas reais são os definitivos oficiais. Itens anulados ou de gabarito
 * controverso foram deixados de fora.
 *
 * Formato:
 *  tipo 'CE' → julgar Certo/Errado (método Cebraspe).  tipo 'ME' → múltipla escolha A–E.
 */

window.TEMAS = [
  { id: 'estruturas', nome: 'Estruturas e resistência dos materiais', edital: '1.2, 1.6, 4.5' },
  { id: 'fundacoes', nome: 'Fundações, contenções e solos', edital: '1.1, 4.2, 4.4' },
  { id: 'materiais', nome: 'Materiais e controle tecnológico', edital: '1.5, 6.2' },
  { id: 'execucao', nome: 'Execução de obras e canteiro', edital: '4.1, 4.3, 4.6–4.10' },
  { id: 'hidro', nome: 'Hidrossanitárias, drenagem e incêndio', edital: '1.3, 2.5, 4.11' },
  { id: 'complementares', nome: 'Projetos complementares, CAD e BIM', edital: '1.7, 2.1–2.7, 4.12' },
  { id: 'orcamento', nome: 'Orçamento, custos e PERT/CPM', edital: '3.1–3.6' },
  { id: 'manutencao', nome: 'Manutenção, patologia e impermeabilização', edital: '4.7, 5.1–5.7' },
  { id: 'fiscalizacao', nome: 'Fiscalização, contratos e segurança do trabalho', edital: '4.13, 6.1–6.4' }
];

(function () {
  var Q = [];
  var F_CD = 'Câmara dos Deputados 2003 · CESPE · item ';
  var F_TRE = 'TRE-BA 2010 · CESPE · item ';
  var F_TJ = 'TJRO 2012 · CESPE · questão ';
  var F_IN = 'Inédita · estilo Cebraspe';

  function ce(id, fonte, tema, ctx, enun, gab, just, fig) {
    Q.push({ id: id, fonte: fonte, tema: tema, tipo: 'CE', contexto: ctx || '', enunciado: enun, gabarito: gab, justificativa: just, figura: fig || null });
  }
  function me(id, fonte, tema, enun, opcoes, gab, just) {
    Q.push({ id: id, fonte: fonte, tema: tema, tipo: 'ME', contexto: '', enunciado: enun, opcoes: opcoes, gabarito: gab, justificativa: just, figura: null });
  }

  /* ===================== CÂMARA DOS DEPUTADOS 2003 ===================== */
  var cArg = 'As argamassas constituem um elemento importante para revestimentos de alvenaria, pisos etc. Com respeito às argamassas, julgue o item abaixo.';
  ce('CD101', F_CD + '101', 'materiais', cArg, 'As argamassas contendo cimento devem ser usadas no prazo de, no máximo, quatro horas e meia a contar do primeiro contato do cimento com a água.', 'E',
    'Errado. A prática normativa (NBR 7200) limita o uso da argamassa com cimento a cerca de 2 h 30 min após o primeiro contato do cimento com a água, salvo uso de aditivo retardador. Depois disso a pega já comprometeu a aderência e a resistência.');
  ce('CD102', F_CD + '102', 'materiais', cArg, 'A resistência à compressão, a resistência à tração e o módulo de deformação da argamassa mista aumentam com o aumento do teor de cal.', 'E',
    'Errado. A cal aumenta a plasticidade, a retenção de água e a capacidade de absorver deformações. Mais cal no traço reduz o módulo de deformação e as resistências mecânicas, que dependem do cimento.');
  ce('CD103', F_CD + '103', 'materiais', cArg, 'No cálculo da argamassa mista, a massa unitária de cal corresponde a 2,9 g/cm³.', 'E',
    'Errado. A cal hidratada em pó tem massa unitária baixa, da ordem de 0,5 a 0,7 g/cm³ (kg/dm³). Mesmo a massa específica real da cal fica em torno de 2,2 a 2,3 g/cm³, abaixo de 2,9.');
  ce('CD104', F_CD + '104', 'manutencao', cArg, 'O bolor é um tipo de patologia de argamassas de revestimento, caracterizado por manchas esverdeadas ou escuras que provocam a desagregação do revestimento.', 'C',
    'Certo. Bolor (mofo) é o desenvolvimento de fungos em superfícies úmidas, com manchas verdes, pretas ou escuras. A ação contínua dos micro-organismos e da umidade pode levar à desagregação da camada superficial do revestimento.');
  ce('CD105', F_CD + '105', 'manutencao', cArg, 'A hidratação retardada do óxido de magnésio da cal pode provocar o aparecimento de fissuras horizontais em argamassas de assentamento.', 'C',
    'Certo. Cal com óxidos livres mal hidratados (MgO e CaO) continua a hidratar depois de aplicada, com aumento de volume. Nas juntas de assentamento essa expansão gera fissuras horizontais ao longo das fiadas.');

  var cAr = 'Em certas regiões, a refrigeração de ambientes é indispensável para o conforto térmico dos usuários. Com relação a sistemas de ar condicionado, julgue o item a seguir.';
  ce('CD106', F_CD + '106', 'complementares', cAr, 'Filtros secos, filtros de carvão ativado ou filtros úmidos podem ser corretamente utilizados para a purificação do ar em um sistema de ar condicionado.', 'C',
    'Certo. São tipos de filtragem usados em condicionamento de ar: filtros secos (mantas, fibras) retêm particulados, o carvão ativado adsorve odores e gases, e os filtros úmidos (lavadores de ar) retêm poeira por contato com água.');
  ce('CD107', F_CD + '107', 'complementares', cAr, 'Para a manutenção das condições de conforto térmico, o fator de calor latente depende das quantidades de calor sensível e de calor latente a serem retiradas de um ambiente condicionado.', 'C',
    'Certo. O fator de calor latente é a razão entre o calor latente e o calor total (sensível + latente) a ser retirado do ambiente. Por definição, depende das duas parcelas.');
  ce('CD108', F_CD + '108', 'complementares', cAr, 'Os aparelhos de condicionamento de ar de janela são indicados para grandes ambientes, em que a distribuição de ar tratado pode ser feita por circulação direta do aparelho.', 'E',
    'Errado. Aparelhos de janela têm pequena capacidade e insuflam o ar diretamente, sem dutos. Servem a ambientes pequenos. Grandes ambientes pedem sistemas centrais, self-contained ou VRF com rede de distribuição.');
  ce('CD109', F_CD + '109', 'complementares', cAr, 'A carga térmica de uma instalação de ar condicionado corresponde à taxa média de variação de temperatura, por unidade de tempo, no período de 10 min após o desligamento do sistema de condicionamento de ar de um ambiente com temperatura inicial igual a 20ºC.', 'E',
    'Errado. Carga térmica é a quantidade de calor (sensível + latente) por unidade de tempo que deve ser retirada do ambiente, ou a ele fornecida, para mantê-lo nas condições de projeto. É expressa em W, kcal/h ou TR, não em variação de temperatura.');

  var cPortico = 'A figura apresenta um pórtico plano rígido, articulado em A e apoiado em B, submetido a uma carga uniformemente distribuída q no trecho horizontal de comprimento 2a e a uma força horizontal P aplicada à meia altura do montante. Desprezando o peso próprio do pórtico, julgue o item.';
  ce('CD111', F_CD + '111', 'estruturas', cPortico, 'A componente horizontal da reação no apoio A independe da sobrecarga uniformemente distribuída q.', 'C',
    'Certo. B é apoio móvel e só tem reação vertical. Pelo equilíbrio de forças horizontais, H_A equilibra sozinha a força P (H_A = P). A carga q é vertical e não entra nessa equação.', 'portico');
  ce('CD112', F_CD + '112', 'estruturas', cPortico, 'Para as condições geométricas e de carregamento apresentadas, a tensão na fibra externa da peça no ponto D deve ser sempre de compressão.', 'C',
    'Certo. Somando momentos em A: V_B·2a = q·2a·a + P·a, logo V_B = qa + P/2 > 0. Abaixo de P, o montante recebe apenas V_B, axial e de compressão. Não há cortante nem momento em D, então toda a seção, inclusive a fibra externa, está comprimida.', 'portico');
  ce('CD113', F_CD + '113', 'estruturas', cPortico, 'Dependendo dos valores de a, q e P, o valor da componente vertical da reação no apoio A pode ser nulo.', 'C',
    'Certo. V_A = 2qa − V_B = 2qa − (qa + P/2) = qa − P/2. Para P = 2qa, V_A = 0.', 'portico');
  ce('CD114', F_CD + '114', 'estruturas', cPortico, 'Independentemente dos valores de a, q e P, o momento fletor na seção transversal da peça no ponto C nunca é nulo.', 'E',
    'Errado. Em C (meio do trecho horizontal): M_C = V_A·a − q·a²/2 = (qa − P/2)·a − qa²/2 = (qa² − Pa)/2. Para P = qa, M_C = 0.', 'portico');
  ce('CD115', F_CD + '115', 'estruturas', cPortico, 'Independentemente dos valores de a, q e P, a força cortante na seção transversal da peça no ponto D deve ser sempre nula.', 'C',
    'Certo. Abaixo da força P, o único esforço externo é a reação vertical de B (apoio móvel), alinhada ao eixo do montante. Não há força transversal ao eixo, logo o cortante em D é nulo.', 'portico');

  var cOrc = 'O planejamento, o orçamento e a execução de serviços de construção civil são de fundamental importância para a viabilidade técnico-econômica de uma obra. Julgue o item relacionado a orçamento e administração de obras civis.';
  ce('CD116', F_CD + '116', 'orcamento', cOrc, 'Na modalidade de contratação de uma obra por administração direta, o proprietário da obra a constrói sob sua própria administração.', 'C',
    'Certo. Na administração direta (execução direta) o dono da obra a executa com meios próprios: contrata a mão de obra, compra materiais e administra o empreendimento, sem empreiteiro.');
  ce('CD117', F_CD + '117', 'orcamento', cOrc, 'A empreitada por preços unitários exige uma constante atualização do orçamento, em razão da variação de custos associados à execução da obra.', 'E',
    'Errado. Na empreitada por preço unitário, os preços de cada unidade de serviço ficam fixados no contrato e o pagamento varia com as quantidades medidas. Atualização constante pela variação de custos é típica da administração (custo + taxa), e não deste regime.');
  ce('CD118', F_CD + '118', 'orcamento', cOrc, 'Na elaboração de um orçamento, são necessários a descrição das fases construtivas da obra e os levantamentos dos quantitativos e da composição dos preços unitários dos serviços.', 'C',
    'Certo. O orçamento parte da discriminação dos serviços (fases construtivas), do levantamento de quantidades e das composições de custo unitário. Sobre o custo direto aplica-se o BDI.');
  ce('CD119', F_CD + '119', 'orcamento', cOrc, 'Os preços unitários incluem os custos com mão-de-obra e material de construção.', 'C',
    'Certo. A composição de preço unitário reúne insumos de mão de obra (com encargos), materiais e equipamentos. Somada ao BDI, forma o preço unitário de venda.');
  ce('CD120', F_CD + '120', 'orcamento', cOrc, 'As despesas com mão-de-obra, matéria-prima e equipamentos efetivamente empregados no canteiro para a execução dos serviços são consideradas custos diretos da construção.', 'C',
    'Certo. Custo direto é o que pode ser apropriado diretamente aos serviços: mão de obra, materiais e equipamentos aplicados na obra. Despesas da sede, tributos e lucro ficam no BDI.');

  var cMad = 'As estruturas de madeira são frequentemente utilizadas na confecção de coberturas de construções. Julgue o item relacionado a esse assunto.';
  ce('CD121', F_CD + '121', 'execucao', cMad, 'As terças são peças de madeira colocadas verticalmente e apoiadas sobre o rincão.', 'E',
    'Errado. Terças são peças horizontais, dispostas paralelamente à cumeeira e apoiadas nas tesouras ou nas paredes de oitão. Sobre elas apoiam-se os caibros. Peça vertical da tesoura é o pendural ou o pontalete.');
  ce('CD122', F_CD + '122', 'execucao', cMad, 'A mão-francesa é um tipo de peça disposta de forma inclinada, com a finalidade de travar (contraventar) a estrutura.', 'C',
    'Certo. Mão-francesa é a peça inclinada que liga um elemento vertical a um horizontal, reduzindo vãos e travando o conjunto.');
  ce('CD123', F_CD + '123', 'execucao', cMad, 'Denomina-se chapuz o componente da estrutura de madeira da cobertura colocado horizontalmente e pregado sobre o caibro para atuar como apoio de telhas cerâmicas.', 'E',
    'Errado. A peça pregada sobre os caibros para apoiar as telhas é a ripa. Chapuz é um calço de madeira fixado na perna (empena) da tesoura para apoiar e impedir o escorregamento da terça.');
  ce('CD124', F_CD + '124', 'execucao', cMad, 'O tirante, ou banzo inferior, é um componente vertical indispensável no pontalete da cobertura.', 'E',
    'Errado. O tirante (linha ou banzo inferior) é a peça horizontal da tesoura, solicitada à tração. Os elementos verticais são o pendural e os pontaletes.');
  ce('CD125', F_CD + '125', 'execucao', cMad, 'Denomina-se espigão a aresta inclinada resultante do encontro de duas águas que formam um ângulo saliente, sendo caracterizado como um divisor de águas.', 'C',
    'Certo. Espigão é o encontro saliente de duas águas e divide o escoamento. O encontro reentrante, que recolhe água, chama-se rincão (água-furtada).');

  var cRev = 'Os revestimentos são fundamentais para a durabilidade e para o aspecto estético final de uma obra, e a forma como são executados condiciona seu comportamento e sua vida útil. Em relação a revestimentos, julgue o item.';
  ce('CD126', F_CD + '126', 'execucao', cRev, 'Antes da aplicação do emboço sobre o reboco, as superfícies das paredes devem estar limpas e totalmente secas.', 'E',
    'Errado. A sequência é chapisco, emboço e reboco: o emboço vem antes do reboco. Além disso, a base deve estar limpa e umedecida, e não totalmente seca, para que não absorva a água de amassamento da argamassa.');
  ce('CD127', F_CD + '127', 'execucao', cRev, 'A dimensão máxima característica dos grãos da areia utilizada para a confecção do reboco deve ser igual a 5 mm.', 'E',
    'Errado. O reboco (camada de acabamento) usa areia fina, com grãos bem menores, da ordem de 1 mm ou menos, para dar textura lisa. Areia com 5 mm é grossa e serve a outras camadas e usos.');
  ce('CD128', F_CD + '128', 'execucao', cRev, 'A velocidade de endurecimento da massa de gesso depende de fatores como temperatura e tempo de calcinação e quantidade de água de amassamento.', 'C',
    'Certo. A pega do gesso depende das condições de calcinação (temperatura e tempo, que definem as fases do sulfato), da finura, da relação água/gesso e de impurezas ou aditivos.');
  ce('CD129', F_CD + '129', 'execucao', cRev, 'A camada de regularização para o assentamento de azulejos deve ser executada pouco tempo antes da colocação dos mesmos, de forma a facilitar a instalação dos azulejos e atenuar os efeitos de retração da argamassa sobre o revestimento.', 'E',
    'Errado. O emboço precisa de prazo de cura (em geral de 7 a 14 dias) antes do assentamento cerâmico, para que boa parte da retração ocorra antes. Assentar logo depois transmite a retração às placas e favorece descolamentos.');

  var cEle = 'As instalações elétricas de obras civis devem ser dimensionadas e executadas de forma a garantir o abastecimento elétrico de forma segura e eficiente. Com relação a instalações elétricas, julgue o item.';
  ce('CD131', F_CD + '131', 'complementares', cEle, 'O aterramento funcional em uma instalação consiste na ligação à terra de um dos condutores do sistema, com o objetivo de garantir o funcionamento correto, seguro e confiável da instalação.', 'C',
    'Certo. Aterramento funcional é a ligação à terra de um ponto do sistema, em geral o neutro, para o funcionamento adequado da instalação. O aterramento de proteção liga as massas à terra para proteger pessoas.');
  ce('CD132', F_CD + '132', 'complementares', cEle, 'Em uma instalação de aterramento, o condutor de equipotencialidade é o elemento de proteção que liga o terminal de aterramento principal ao eletrodo de aterramento.', 'E',
    'Errado. Quem liga o terminal de aterramento principal (BEP) ao eletrodo é o condutor de aterramento. O condutor de equipotencialidade interliga massas e elementos condutores estranhos à instalação ao BEP.');
  ce('CD133', F_CD + '133', 'complementares', cEle, 'Uma eletrocalha é um bloco de construção com um ou mais furos que, por justaposição com outros blocos, forma um ou mais condutos fechados.', 'E',
    'Errado. A definição dada é a de bloco alveolado. Eletrocalha é um conduto aberto ou fechado (com tampa), geralmente metálico e apoiado em suportes, que conduz cabos.');
  ce('CD134', F_CD + '134', 'complementares', cEle, 'Em uma instalação elétrica típica de uma residência com alimentação de 127/220 V, a ligação elétrica do quadro de distribuição a um chuveiro elétrico requer somente uma fase elétrica e o neutro.', 'E',
    'Errado. Em sistemas 127/220 V o chuveiro costuma ser ligado em 220 V, entre duas fases, para reduzir a corrente. Também é obrigatório o condutor de proteção (PE). Uma fase e neutro não é o arranjo típico.');
  ce('CD135', F_CD + '135', 'complementares', cEle, 'No projeto de uma instalação elétrica, a potência nominal típica que deve ser adotada para um forno microondas (tipo residencial) é da ordem de 4.600 VA.', 'E',
    'Errado. Um micro-ondas residencial demanda em geral de 1.200 a 2.000 VA. Potências de cerca de 4.600 VA são de chuveiros elétricos.');

  var cExe = 'Julgue o item relacionado à execução de obras civis e materiais de construção.';
  ce('CD136', F_CD + '136', 'materiais', cExe, 'O filler, cujos grãos devem ficar retidos na peneira n.º 200, é um agregado graúdo utilizado na preparação de concretos.', 'E',
    'Errado. Filler é material pulverulento muito fino, que passa na peneira nº 200 (0,075 mm), usado para preencher vazios. Não é agregado graúdo nem fica retido nessa peneira.');
  ce('CD137', F_CD + '137', 'materiais', cExe, 'O processo de inchamento durante o umedecimento de areias é maior para as areias mais finas, com maior área específica.', 'C',
    'Certo. O inchamento vem da película de água que afasta os grãos. Areias finas têm maior superfície específica e por isso incham mais. Daí a correção do volume quando a dosagem é feita em volume (NBR 6467).');
  ce('CD138', F_CD + '138', 'materiais', cExe, 'O traço indicado para a confecção de argamassa para assentamento de tijolos é de 1:4:3,5.', 'E',
    'Errado. Argamassas mistas de assentamento usam traços como 1:2:8 ou 1:1:6 (cimento:cal:areia), com areia em proporção bem maior que a cal. O traço 1:4:3,5 não é referência para esse uso.');
  ce('CD139', F_CD + '139', 'execucao', cExe, 'Para a execução de chapisco, é necessário o preparo de argamassa composta por cimento e areia fina, com consistência plástica.', 'E',
    'Errado. O chapisco usa cimento e areia grossa (traço usual 1:3), com consistência fluida, lançado com energia para criar superfície rugosa e aumentar a aderência.');
  ce('CD140', F_CD + '140', 'execucao', cExe, 'Os cimbramentos constituem a parte estrutural de suporte das formas, em que escoras de madeira ou metálicas transmitem a carga para apoios disponíveis em nível inferior.', 'C',
    'Certo. Cimbramento (escoramento) é a estrutura provisória que sustenta as fôrmas e leva as cargas do concreto fresco a apoios inferiores, como o solo ou lajes já executadas.');

  var cVigas = 'A figura mostra, à esquerda, uma viga apoiada-engastada e, à direita, uma viga biengastada, ambas de vão L sob carga uniformemente distribuída p, com seus diagramas de momentos fletores (M1 = máximo positivo e M2 = momento no engaste da primeira; M3 = momento nos engastes e M4 = máximo positivo da segunda; a = distância do engaste à seção de momento nulo). Julgue o item.';
  ce('CD141', F_CD + '141', 'estruturas', cVigas, 'O módulo do valor do momento fletor M1 é igual a pL²/4.', 'E',
    'Errado. Na viga apoiada-engastada, a reação no apoio simples vale 3pL/8 e o máximo positivo ocorre a 3L/8 desse apoio: M1 = 9pL²/128 ≈ 0,070pL².', 'vigas');
  ce('CD142', F_CD + '142', 'estruturas', cVigas, 'O módulo do valor do momento M2 é igual a pL²/8.', 'C',
    'Certo. O momento no engaste da viga apoiada-engastada com carga uniforme é pL²/8.', 'vigas');
  ce('CD143', F_CD + '143', 'estruturas', cVigas, 'O módulo do valor do momento M3 é igual a pL²/12.', 'C',
    'Certo. Na viga biengastada com carga uniforme, os momentos nos engastes valem pL²/12.', 'vigas');
  ce('CD144', F_CD + '144', 'estruturas', cVigas, 'O módulo do valor do momento M4 é igual à metade do módulo do valor de M3.', 'C',
    'Certo. O momento no meio do vão da biengastada é pL²/8 − pL²/12 = pL²/24, metade de pL²/12.', 'vigas');
  ce('CD145', F_CD + '145', 'estruturas', cVigas, 'A dimensão a, para a qual o momento é nulo na peça biengastada, é igual a 0,3L.', 'E',
    'Errado. M(x) = pLx/2 − px²/2 − pL²/12 = 0 leva a x = L/2 − L/(2√3) ≈ 0,211L. Logo a ≈ 0,21L, e não 0,3L.', 'vigas');

  var cSolos = 'O conhecimento das propriedades dos solos é de fundamental importância quando esses materiais são submetidos a carregamentos provocados por construções civis ou quando são utilizados como materiais de construção. Julgue o item.';
  ce('CD146', F_CD + '146', 'fundacoes', cSolos, 'As argilas saturadas apresentam ângulos de atrito efetivos nulos quando carregadas rapidamente sem se permitir drenagem.', 'E',
    'Errado. No carregamento rápido não drenado (ensaio UU) da argila saturada, o ângulo de atrito é nulo em termos de tensões totais (φu = 0). O ângulo de atrito efetivo φ\' não é nulo.');
  ce('CD147', F_CD + '147', 'fundacoes', cSolos, 'O coeficiente de permeabilidade dos solos depende somente do tamanho dos vazios entre os seus grãos.', 'E',
    'Errado. A permeabilidade depende também do índice de vazios, da estrutura e do arranjo das partículas, do grau de saturação, da composição mineralógica e da viscosidade (temperatura) do fluido.');
  ce('CD148', F_CD + '148', 'fundacoes', cSolos, 'Em um ensaio de adensamento unidimensional, quanto maior o coeficiente de adensamento de uma argila, mais rapidamente ela atinge uma determinada porcentagem de adensamento.', 'C',
    'Certo. Pela teoria de Terzaghi, t = T·Hd²/cv. Para o mesmo fator tempo T (mesma porcentagem de adensamento), cv maior significa tempo menor.');
  ce('CD149', F_CD + '149', 'fundacoes', cSolos, 'O índice de atividade de um solo é calculado em função do seu índice de plasticidade e da porcentagem de areia presente no mesmo.', 'E',
    'Errado. O índice de atividade de Skempton é IP dividido pela porcentagem da fração argila (partículas menores que 2 µm), e não da areia.');
  ce('CD150', F_CD + '150', 'fundacoes', cSolos, 'Os solos saprolíticos são formados em decorrência da sedimentação dos grãos transportados por água.', 'E',
    'Errado. Solos saprolíticos são residuais jovens: formam-se no próprio local pela decomposição da rocha e conservam sua estrutura reliquiar. Solos transportados e depositados por água são sedimentares (aluviões).');

  var cBomba = 'Em uma adutora por recalque, a potência do conjunto motobomba é P = γ·Q·Hman/η, em que γ é o peso específico da água, Q a vazão recalcada, Hman a altura manométrica e η o rendimento do conjunto. Julgue o item.';
  ce('CD151', F_CD + '151', 'hidro', cBomba, 'A potência necessária do conjunto motobomba diminui com o envelhecimento do material da tubulação.', 'E',
    'Errado. Com o tempo a rugosidade da tubulação aumenta (incrustações, corrosão), o que eleva a perda de carga e a altura manométrica. A potência necessária aumenta.');
  ce('CD152', F_CD + '152', 'hidro', cBomba, 'A substituição de parte da tubulação por outra com diâmetro maior diminui a potência necessária do conjunto motobomba.', 'C',
    'Certo. Diâmetro maior reduz a velocidade e a perda de carga distribuída, o que reduz Hman e, mantidos Q e η, a potência.');
  ce('CD153', F_CD + '153', 'hidro', cBomba, 'O aumento do rendimento do conjunto motobomba aumenta necessariamente o consumo de energia.', 'E',
    'Errado. η está no denominador. Rendimento maior significa menor potência absorvida para a mesma vazão e altura, logo menor consumo.');
  ce('CD154', F_CD + '154', 'hidro', cBomba, 'O aumento de perda de carga localizada provoca o aumento da vazão recalcada.', 'E',
    'Errado. Perda de carga maior eleva a curva do sistema. O ponto de operação se desloca para menor vazão.');
  ce('CD155', F_CD + '155', 'hidro', cBomba, 'O aumento da cota altimétrica da saída da adutora provoca o aumento da altura manométrica.', 'C',
    'Certo. Hman = desnível geométrico + perdas de carga. Elevar a cota de saída aumenta o desnível geométrico.');

  var cIdf = 'Em estudos de chuvas intensas, usam-se equações intensidade-duração-frequência do tipo i = a·T^m/(b + dc)^n, em que i é a intensidade, T o período de retorno, dc a duração da chuva e a, b, m, n parâmetros locais. Julgue o item acerca de elementos básicos para estudos de drenagem.';
  ce('CD156', F_CD + '156', 'hidro', cIdf, 'As vazões máximas de escoamento superficial independem do tempo de concentração da bacia.', 'E',
    'Errado. No método racional, a duração da chuva de projeto é igual ao tempo de concentração. Esse tempo define a intensidade i pela curva IDF e, portanto, a vazão máxima.');
  ce('CD157', F_CD + '157', 'hidro', cIdf, 'Em uma mesma região, chuvas mais intensas têm normalmente maior duração.', 'E',
    'Errado. Pela curva IDF, quanto maior a duração, menor a intensidade média. Chuvas muito intensas costumam ser curtas.');
  ce('CD158', F_CD + '158', 'hidro', cIdf, 'Para uma dada duração, a probabilidade de ocorrência de uma chuva intensa está diretamente associada ao período de retorno.', 'C',
    'Certo. O período de retorno é o inverso da probabilidade anual de a chuva ser igualada ou superada (P = 1/T).');
  ce('CD159', F_CD + '159', 'hidro', cIdf, 'A vazão máxima de escoamento superficial determinada em um projeto não é totalmente confiável, podendo ser superada.', 'C',
    'Certo. A vazão de projeto está associada a um período de retorno, ou seja, a um risco aceito. Eventos mais raros podem superá-la.');
  ce('CD160', F_CD + '160', 'hidro', cIdf, 'A escolha do período de retorno independe de critérios que consideram a ocupação da área do projeto.', 'E',
    'Errado. O período de retorno é escolhido conforme a ocupação e o risco envolvido: áreas comerciais e obras de maior dano potencial adotam T maiores.');

  var cRac = 'Para a quantificação das vazões de drenagem urbana, é possível utilizar a equação racional Q = C·i·A, em que Q é o deflúvio, C o coeficiente de escoamento superficial, i a intensidade da chuva e A a área da bacia. Julgue o item.';
  ce('CD161', F_CD + '161', 'hidro', cRac, 'O tipo de ocupação da bacia não influencia na determinação das vazões.', 'E',
    'Errado. O coeficiente C depende da ocupação e da impermeabilização do solo. Quanto mais urbanizada a bacia, maior C e maior a vazão.');
  ce('CD162', F_CD + '162', 'hidro', cRac, 'A equação racional permite analisar qualquer tipo de bacia urbana.', 'E',
    'Errado. O método racional vale para pequenas bacias, da ordem de até 2 a 3 km² conforme a referência. Bacias maiores pedem métodos como o hidrograma unitário.');
  ce('CD163', F_CD + '163', 'hidro', cRac, 'O coeficiente de escoamento superficial pode variar no transcorrer do tempo.', 'C',
    'Certo. C muda com a urbanização (impermeabilização crescente) e com o estado de umidade do solo.');
  ce('CD164', F_CD + '164', 'hidro', cRac, 'A equação racional não leva em consideração a duração da chuva.', 'E',
    'Errado. A duração entra de forma implícita: adota-se chuva com duração igual ao tempo de concentração, e a intensidade i correspondente vem da curva IDF.');
  ce('CD165', F_CD + '165', 'hidro', cRac, 'A equação racional permite calcular o deflúvio máximo de um evento.', 'C',
    'Certo. O método racional fornece a vazão de pico (máxima), e não o hidrograma completo.');

  var cInc = 'Uma das alternativas possíveis para combate a incêndios consiste no sistema hidráulico, comandado por hidrantes e mangotinhos. Com referência a esse sistema, julgue o item.';
  ce('CD166', F_CD + '166', 'hidro', cInc, 'A pressão hidráulica no sistema deve, necessariamente, corresponder à pressão do reservatório.', 'E',
    'Errado. O sistema deve garantir pressão e vazão mínimas no hidrante mais desfavorável (NBR 13714). Essa pressão pode vir de bomba de incêndio e não precisa corresponder à do reservatório.');
  ce('CD167', F_CD + '167', 'hidro', cInc, 'A água armazenada no reservatório de abastecimento de água fria de uma edificação pode corresponder à reserva de incêndio da mesma.', 'C',
    'Certo. A reserva técnica de incêndio pode ficar no mesmo reservatório da água fria, desde que a saída do consumo normal esteja acima do volume reservado ao incêndio, garantindo esse volume.');
  ce('CD168', F_CD + '168', 'hidro', cInc, 'O volume de água da reserva de incêndio depende do tempo de funcionamento estipulado para o sistema.', 'C',
    'Certo. A reserva é calculada pela vazão dos hidrantes ou mangotinhos em uso simultâneo vezes o tempo mínimo de funcionamento exigido.');
  ce('CD169', F_CD + '169', 'hidro', cInc, 'A instalação de hidrantes deve prever a possibilidade de conexão com veículos de bombeiros.', 'C',
    'Certo. Exige-se registro de recalque (hidrante de passeio ou fachada) para que o Corpo de Bombeiros injete água no sistema.');
  ce('CD170', F_CD + '170', 'hidro', cInc, 'Os pontos de tomada de água devem localizar-se preferencialmente nas escadas de edifícios, para facilitar a distribuição de água em casos de incêndios.', 'E',
    'Errado. Os hidrantes ficam próximos às portas externas, escadas e acessos, mas fora das escadas de emergência, que são rotas de fuga e não podem ser obstruídas por mangueiras e equipamentos.');

  var cInd = 'Quanto ao abastecimento de água potável de uma edificação pelo sistema indireto com bombeamento, com dois reservatórios e uma elevatória, julgue o item.';
  ce('CD171', F_CD + '171', 'hidro', cInd, 'O volume do reservatório superior deve ser sempre maior que o do inferior.', 'E',
    'Errado. Na prática usual o reservatório inferior guarda a maior parte da reserva (cerca de 3/5) e o superior o restante (cerca de 2/5), o que reduz a carga sobre a estrutura.');
  ce('CD172', F_CD + '172', 'hidro', cInd, 'Perdas de carga localizadas não são consideradas no dimensionamento hidráulico, por serem insignificantes.', 'E',
    'Errado. Em instalações prediais as perdas localizadas (conexões, registros) costumam ser relevantes e entram no cálculo, por comprimentos equivalentes ou coeficientes K.');
  ce('CD173', F_CD + '173', 'hidro', cInd, 'No dimensionamento hidráulico dos condutos, considera-se a probabilidade de uso simultâneo dos aparelhos.', 'C',
    'Certo. A NBR 5626 usa o método dos pesos relativos (Q = 0,3·√ΣP), que considera a probabilidade de uso simultâneo dos aparelhos.');
  ce('CD174', F_CD + '174', 'hidro', cInd, 'Bombas centrífugas só devem ser utilizadas quando o conjunto motobomba estiver afogado.', 'E',
    'Errado. Bombas centrífugas operam também com sucção positiva (não afogadas), desde que escorvadas, com válvula de pé, e respeitado o NPSH disponível.');
  ce('CD175', F_CD + '175', 'hidro', cInd, 'Para melhorar a manutenção, recomenda-se a utilização de reservatório superior com duas câmaras, interligadas pelo barrilete.', 'C',
    'Certo. Duas câmaras ligadas pelo barrilete permitem limpar ou reparar uma delas sem interromper o abastecimento.');

  var cFossa = 'Em locais onde não há rede pública de coleta de esgoto, é possível atender a uma edificação com um sistema constituído por tanque séptico seguido por tratamento e disposição de efluentes. Julgue o item.';
  ce('CD176', F_CD + '176', 'hidro', cFossa, 'O volume do tanque séptico é determinado com base exclusivamente no número de usuários e na contribuição de despejos.', 'E',
    'Errado. Pela NBR 7229, V = 1000 + N·(C·T + K·Lf): entram também o tempo de detenção T, a contribuição de lodo fresco Lf e a taxa de acumulação de lodo K, que depende do intervalo de limpeza e da temperatura.');
  ce('CD177', F_CD + '177', 'hidro', cFossa, 'Uma alternativa viável tecnicamente para a disposição final dos efluentes consiste no poço absorvente.', 'C',
    'Certo. Poço absorvente (sumidouro) é uma das alternativas de disposição no solo previstas, junto com valas de infiltração.');
  ce('CD178', F_CD + '178', 'hidro', cFossa, 'Uma alternativa viável tecnicamente para o tratamento complementar dos efluentes consiste na vala de filtração.', 'C',
    'Certo. A NBR 13969 prevê como pós-tratamento do efluente do tanque séptico, entre outros, filtro anaeróbio, filtro de areia e vala de filtração.');
  ce('CD179', F_CD + '179', 'hidro', cFossa, 'A determinação da capacidade de absorção de um solo deve ser feita em períodos chuvosos.', 'E',
    'Errado. O ensaio de infiltração (percolação) prevê a saturação prévia da cava antes das leituras, o que simula a condição desfavorável. Não há exigência de realizá-lo em época de chuva.');
  ce('CD180', F_CD + '180', 'hidro', cFossa, 'O lodo gerado deve sair do tanque misturado ao efluente líquido.', 'E',
    'Errado. O tanque séptico serve justamente para reter e digerir os sólidos. O lodo fica no fundo e é removido periodicamente. O efluente deve sair clarificado.');

  var cSep = 'Os possíveis sistemas de esgotos sanitários são o sistema unitário, o separador absoluto e o separador parcial. Cada um implica funcionamento específico para as instalações prediais hidrossanitárias. Julgue o item.';
  ce('CD181', F_CD + '181', 'hidro', cSep, 'No sistema unitário, o esgoto doméstico e as águas pluviais dos telhados devem ser encaminhados para uma tubulação única.', 'C',
    'Certo. No sistema unitário (combinado), esgoto e águas pluviais escoam pela mesma rede.');
  ce('CD182', F_CD + '182', 'hidro', cSep, 'No sistema separador parcial, o esgoto doméstico e as águas pluviais dos telhados devem ser encaminhados para uma tubulação única.', 'C',
    'Certo. No separador parcial, parte das águas pluviais (telhados e pátios dos lotes) segue junto com o esgoto. As pluviais das vias vão para a rede de drenagem.');
  ce('CD183', F_CD + '183', 'hidro', cSep, 'No sistema separador absoluto, o esgoto doméstico deve ser encaminhado para uma tubulação específica.', 'C',
    'Certo. No separador absoluto, adotado no Brasil, esgoto sanitário e águas pluviais têm redes independentes.');
  ce('CD184', F_CD + '184', 'hidro', cSep, 'No sistema separador absoluto, as águas pluviais dos telhados devem ser encaminhadas para a tubulação coletora de esgoto.', 'E',
    'Errado. No separador absoluto é vedado lançar águas pluviais na rede de esgoto (NBR 8160 e NBR 10844). Elas vão para a drenagem pluvial.');
  ce('CD185', F_CD + '185', 'hidro', cSep, 'No sistema separador absoluto, as águas pluviais dos telhados devem passar por sifão antes de serem lançadas no ramal predial.', 'E',
    'Errado. As águas pluviais não podem ser lançadas no ramal predial de esgoto no separador absoluto, com ou sem sifão.');

  var cRede = 'A figura representa a rede de atividades de uma obra, em que ai e ti representam as atividades e seus tempos de execução, em meses: a1 (4) e a2 (8) chegam ao mesmo evento; dele partem a3 (6) e a6 (4); a3 é seguida de a4 (2) e a5 (6); a6 é seguida de a7 (6); a5 e a7 chegam ao evento que antecede a8 (2), última atividade. Julgue o item.';
  ce('CD186', F_CD + '186', 'orcamento', cRede, 'A atividade a6 depende unicamente da atividade a2.', 'E',
    'Errado. a6 parte do evento em que chegam a1 e a2. Só começa depois de ambas, logo depende de a1 e de a2.', 'rede');
  ce('CD187', F_CD + '187', 'orcamento', cRede, 'O tempo mínimo para a conclusão da atividade a7 é de 18 meses a partir do início da obra.', 'C',
    'Certo. Início mais cedo de a6 = máx(4; 8) = 8. a6 termina em 12 e a7 em 12 + 6 = 18 meses.', 'rede');
  ce('CD188', F_CD + '188', 'orcamento', cRede, 'A atividade a5 depende das atividades a2 e a3.', 'C',
    'Certo. a5 vem depois de a4, que vem depois de a3, que só começa após a1 e a2. Logo a5 depende, ainda que indiretamente, de a2 e de a3.', 'rede');
  ce('CD189', F_CD + '189', 'orcamento', cRede, 'A atividade a6 inicia-se após 4 meses do início da obra.', 'E',
    'Errado. a6 só pode começar quando a1 (4 meses) e a2 (8 meses) terminarem, ou seja, aos 8 meses.', 'rede');
  ce('CD190', F_CD + '190', 'orcamento', cRede, 'O tempo mínimo para o término da obra é de 22 meses.', 'E',
    'Errado. Caminho crítico: a2–a3–a4–a5–a8 = 8 + 6 + 2 + 6 + 2 = 24 meses. O caminho por a6–a7 chega ao evento final de a5/a7 em 18 meses, contra 22 pelo caminho crítico, e a8 acrescenta 2. Duração mínima: 24 meses.', 'rede');

  var cTop = 'Durante a realização de uma obra, o apoio de topografia é fundamental para a boa execução dos trabalhos. Com referência a essa atividade e aos equipamentos nela utilizados, julgue o item.';
  ce('CD191', F_CD + '191', 'execucao', cTop, 'O clinômetro é empregado para a determinação dos ângulos horizontais das divisas do terreno.', 'E',
    'Errado. O clinômetro mede ângulos verticais (inclinações e declividades). Ângulos horizontais são medidos com teodolito ou estação total.');
  ce('CD192', F_CD + '192', 'execucao', cTop, 'Mediante o uso de teodolito, é possível verificar tanto aspectos planimétricos como altimétricos da construção.', 'C',
    'Certo. O teodolito mede ângulos horizontais (planimetria) e verticais. Com estadimetria ou distâncias, permite também obter desníveis (altimetria).');
  ce('CD193', F_CD + '193', 'execucao', cTop, 'O nível óptico permite grande precisão no controle de cotas altimétricas nas diversas etapas da construção.', 'C',
    'Certo. O nível óptico, usado com mira, faz nivelamento geométrico, o método mais preciso para transferir e controlar cotas.');
  ce('CD194', F_CD + '194', 'execucao', cTop, 'Durante a conferência de distâncias horizontais com emprego de trena, deve-se verificar o nível.', 'C',
    'Certo. Para medir distância horizontal, a trena deve estar nivelada (e esticada). Caso contrário mede-se a distância inclinada.');

  var cPc = 'As medidas de segurança adotadas em uma obra para proteger uma ou mais pessoas constituem as medidas de proteção coletiva. Julgue o item.';
  ce('CD196', F_CD + '196', 'fiscalizacao', cPc, 'As proteções incorporadas à obra constituem um dos grupos de proteções coletivas.', 'C',
    'Certo. Proteções incorporadas à obra, como guarda-corpos definitivos, fechamentos de vãos e linhas de vida permanentes, compõem as proteções coletivas.');
  ce('CD197', F_CD + '197', 'fiscalizacao', cPc, 'Sinalizações constituem medidas de proteção coletiva.', 'C',
    'Certo. A sinalização de segurança (placas, faixas, isolamento de áreas) protege todos os que circulam pela obra. A NR-18 e a NR-26 tratam do tema.');
  ce('CD198', F_CD + '198', 'fiscalizacao', cPc, 'Medidas de proteção coletiva incluem organização de estoque de materiais.', 'C',
    'Certo. Armazenagem e estocagem organizadas, com ordem e limpeza, evitam quedas de materiais, desmoronamento de pilhas e obstrução de circulação. É medida de alcance coletivo prevista na NR-18.');
  ce('CD199', F_CD + '199', 'fiscalizacao', cPc, 'Medidas de proteção coletiva incluem cuidados com a área externa à obra.', 'C',
    'Certo. Tapumes, galerias e plataformas de proteção protegem terceiros e transeuntes no entorno.');

  /* ===================== TRE-BA 2010 ===================== */
  var cRad = 'O projeto de uma fundação do tipo radier exige que determinadas condições sejam observadas. A respeito das condicionantes desse tipo de fundação, julgue o item.';
  ce('TRE41', F_TRE + '41', 'fundacoes', cRad, 'Esse tipo de fundação pode ser construída em concreto ou concreto armado.', 'E',
    'Errado. O radier é uma placa que recebe todos os pilares e trabalha à flexão. Precisa ser de concreto armado ou protendido. Concreto simples não resiste aos esforços de tração da flexão.');
  ce('TRE42', F_TRE + '42', 'fundacoes', cRad, 'Para esse tipo de fundação é requerida a execução precoce de todos os serviços enterrados em sua área.', 'C',
    'Certo. Tubulações e caixas sob o radier precisam ser executadas antes da concretagem da placa, porque depois o acesso fica inviável.');
  ce('TRE43', F_TRE + '43', 'fundacoes', cRad, 'Nos casos em que possam existir pressões devido à presença de lençóis freáticos, a fundação do tipo radier não é recomendável.', 'E',
    'Errado. O radier pode ser usado com lençol freático. Basta dimensioná-lo para a subpressão, ou rebaixar o lençol durante a obra.');
  ce('TRE44', F_TRE + '44', 'fundacoes', cRad, 'Pelo fato de ser uma estrutura esbelta, a fundação do tipo radier normalmente apresenta baixa rigidez estrutural, o que limita sua aplicação.', 'E',
    'Errado. O radier pode ser projetado rígido ou flexível, com nervuras ou espessura adequada, e é usado justamente para uniformizar recalques. A rigidez é escolha de projeto, e não uma limitação inerente.');

  var cVent = 'Um sistema de ventilação para circulação de ar condicionado é constituído de ventiladores, dutos e diversos elementos auxiliares com função específica. Em relação a esses elementos auxiliares, julgue o item.';
  ce('TRE45', F_TRE + '45', 'complementares', cVent, 'Os dampers de controle são usados para controlar e ajustar a vazão do gás de trabalho.', 'C',
    'Certo. Dampers (registros) regulam e balanceiam a vazão de ar nos dutos. O ar é o fluido de trabalho.');
  ce('TRE46', F_TRE + '46', 'complementares', cVent, 'As caixas de volume variável suprem uma vazão variável de ar condicionado ao ambiente.', 'C',
    'Certo. As caixas VAV modulam a vazão de ar insuflado conforme a carga térmica de cada zona.');

  var cEsp = 'Um aspecto essencial para garantir a qualidade de uma obra civil é a especificação correta dos materiais, as condições de estocagem e a realização de testes em amostras desses materiais. Julgue o item.';
  ce('TRE49', F_TRE + '49', 'materiais', cEsp, 'Para concreto, os cascalhos de campo (lateríticos) são melhores que os cascalhos depositados nos leitos dos rios, porque não exigem qualquer tratamento prévio.', 'E',
    'Errado. Cascalhos lateríticos costumam conter finos e impurezas aderidas e exigem lavagem e classificação. O seixo de rio, lavado naturalmente, é em geral mais limpo.');
  ce('TRE50', F_TRE + '50', 'fiscalizacao', cEsp, 'As amostras de materiais aprovadas pela fiscalização, depois de convenientemente autenticadas por essa e pela empreiteira, deverão ser descartadas.', 'E',
    'Errado. As amostras aprovadas devem ser guardadas na obra como padrão de comparação para o recebimento dos lotes entregues.');

  var cOrc2 = 'A elaboração de um orçamento envolve determinados conceitos, como custos diretos e indiretos, composição de custos unitários, encargos sociais, BDI, entre outros. Julgue o item.';
  ce('TRE52', F_TRE + '52', 'orcamento', cOrc2, 'Os custos indiretos variam em função do local de execução dos serviços, do tipo de obra, dos impostos incidentes e, ainda, das exigências do edital ou contrato.', 'C',
    'Certo. Custos indiretos e BDI variam com a localização, o porte e o tipo de obra, a carga tributária e as exigências contratuais, como seguros e garantias.');
  ce('TRE53', F_TRE + '53', 'orcamento', cOrc2, 'O custo da administração central corresponde ao rateio dos custos da sede da construtora que deverá ser absorvido pelo contrato.', 'C',
    'Certo. A administração central é a parcela do BDI que rateia as despesas da sede (pessoal, aluguel, contabilidade) entre os contratos da empresa.');
  ce('TRE54', F_TRE + '54', 'orcamento', cOrc2, 'O BDI é afetado, entre outros aspectos, pela localização, pelo tipo de administração local exigida, pelos impostos gerais, mas não pelas leis sociais sobre a mão de obra aplicada no custo direto.', 'C',
    'Certo. Os encargos sociais incidem sobre a mão de obra e entram no custo direto (nas composições), e não no BDI.');

  var cCant = 'O planejamento, o arranjo e a operação do canteiro de obras são atividades de vital importância na construção civil. A respeito desses temas, julgue o item.';
  ce('TRE58', F_TRE + '58', 'fiscalizacao', cCant, 'Antes do início da implantação do canteiro de obras, é obrigatória a comunicação à inspeção do trabalho de informações como endereço da obra, qualificação do contratante, empregador ou condomínio etc.', 'C',
    'Certo. A NR-18 exige comunicação prévia da obra à inspeção do trabalho antes do início das atividades, com endereço, dados do contratante e do empregador, tipo de obra, datas previstas e número de trabalhadores. Hoje ela é feita por sistema informatizado.');
  ce('TRE59', F_TRE + '59', 'fiscalizacao', cCant, 'Todo canteiro de obras deve estar equipado com material necessário à prestação de primeiros socorros, considerando-se as características da atividade desenvolvida.', 'C',
    'Certo. A NR-18, com a NR-7, exige material de primeiros socorros adequado às atividades, sob guarda de pessoa treinada.');
  ce('TRE60', F_TRE + '60', 'execucao', cCant, 'A implantação de um canteiro de obras é definitiva, ou seja, não é permitido o deslocamento das instalações durante a execução do projeto, pois esse procedimento provoca desperdício de material e mão de obra.', 'E',
    'Errado. O canteiro é dinâmico e passa por fases (inicial, intermediária e final). Instalações podem ser remanejadas conforme o avanço da obra. O planejamento busca apenas minimizar esses remanejamentos.');

  var cAgua = 'Durante a construção de um prédio, há a necessidade de acompanhamento e controle das obras de instalação de água do prédio. Julgue o item.';
  ce('TRE62', F_TRE + '62', 'hidro', cAgua, 'As furações e aberturas necessárias em elementos estruturais de concreto armado para passagem de tubulações deverão ser locadas e tomadas por tacos ou buchas.', 'C',
    'Certo. Passagens em elementos estruturais devem ser previstas em projeto e deixadas antes da concretagem, com tacos, buchas ou tubos-camisa. Furar a peça depois compromete a estrutura.');
  ce('TRE63', F_TRE + '63', 'hidro', cAgua, 'As canalizações de distribuição de água nunca devem ser inteiramente horizontais, devendo apresentar declividade no sentido do escoamento.', 'C',
    'Certo. Uma pequena declividade facilita a saída de ar e o esvaziamento da rede, evitando bolsas de ar que reduzem a vazão.');

  var cMed = 'Em obras públicas contratadas por licitação, a emissão de faturas e o correspondente pagamento dos serviços executados estão sujeitos à medição por parte da fiscalização. Em relação aos critérios empregados nas medições, julgue o item.';
  ce('TRE64', F_TRE + '64', 'fiscalizacao', cMed, 'No caso de serviços de revestimentos com pastilhas e cerâmica, deve-se medir a área efetivamente aplicada, descontando os vãos.', 'C',
    'Certo. Revestimentos cerâmicos e pastilhas são medidos pela área efetivamente revestida, com desconto dos vãos.');
  ce('TRE65', F_TRE + '65', 'fiscalizacao', cMed, 'Para serviços de pintura de parede, o critério de medição é o mesmo utilizado para serviços de emboço e reboco.', 'E',
    'Errado. Pintura e revestimento argamassado têm critérios próprios, com regras distintas de desconto de vãos e de consideração de requadros e faces. Os critérios devem constar do caderno de encargos.');
  ce('TRE66', F_TRE + '66', 'fiscalizacao', cMed, 'As estruturas de concreto são medidas pela planta de formas ou, excepcionalmente, no próprio local da execução.', 'C',
    'Certo. Volume de concreto, área de fôrmas e peso de aço são apurados pelos projetos (planta de fôrmas e de armação). A medição no local é exceção.');

  var cTopo2 = 'Durante um levantamento topográfico, são determinados pontos de apoio (planimétricos, altimétricos ou planialtimétricos) a partir dos quais se levantam os demais pontos. Julgue o item.';
  ce('TRE67', F_TRE + '67', 'execucao', cTopo2, 'O levantamento de uma poligonal enquadrada parte de dois pontos com coordenadas conhecidas e acaba em outros dois pontos com coordenadas conhecidas.', 'C',
    'Certo. A poligonal enquadrada (apoiada) liga-se a pontos de coordenadas conhecidas no início e no fim, o que permite verificar e distribuir os erros angulares e lineares.');
  ce('TRE68', F_TRE + '68', 'execucao', cTopo2, 'Para a poligonal aberta, antes de se calcular o azimute das direções, é necessário fazer a verificação dos ângulos medidos.', 'E',
    'Errado. A poligonal aberta não fecha nem se apoia em pontos conhecidos no final, então não há como verificar os ângulos por fechamento. É sua principal limitação.');

  var cCA = 'A construção de peças de concreto armado demanda que determinadas condições gerais sejam observadas. Julgue o item.';
  ce('TRE69', F_TRE + '69', 'estruturas', cCA, 'As barras de aço que fazem parte da armadura devem estar limpas e ficar em contato direto com a forma, antes da concretagem.', 'E',
    'Errado. As barras devem estar limpas, mas afastadas da fôrma por espaçadores, para garantir o cobrimento nominal exigido pela NBR 6118, que protege contra corrosão e fogo.');
  ce('TRE70', F_TRE + '70', 'execucao', cCA, 'O adensamento da massa de concreto deve ser do tipo mecânico, mas deve-se tomar o devido cuidado para evitar a vibração da armadura.', 'C',
    'Certo. O adensamento usual é mecânico, com vibrador de imersão. Encostar a agulha na armadura pode deslocá-la e prejudicar a aderência do concreto já em início de pega.');
  ce('TRE71', F_TRE + '71', 'execucao', cCA, 'Durante a concretagem, é permitida a formação de juntas de concretagem (junta fria). Contudo, a sua posição não deve coincidir com os planos de cisalhamento.', 'C',
    'Certo. Juntas de concretagem são admitidas se previstas e tratadas. Devem ficar onde os esforços, em especial o cisalhamento, sejam menores, e nunca em planos de cisalhamento críticos.');

  var cAces = 'Os prédios públicos ou de uso coletivo devem contemplar disposições específicas para garantir a acessibilidade de todos os usuários. Julgue o item.';
  ce('TRE75', F_TRE + '75', 'complementares', cAces, 'Em edificações que tenham mais de um acesso ao seu interior, todos eles deverão estar dotados de rampas para circulação de pessoas com deficiência ou mobilidade reduzida, com declividade máxima de 5%.', 'E',
    'Errado. Nem todos os acessos precisam ser acessíveis: a regra é haver acesso acessível, preferencialmente o principal. Além disso, a NBR 9050 admite rampas de até 8,33% (com limites de desnível), e 5% é o limite a partir do qual o piso passa a ser considerado rampa.');
  ce('TRE76', F_TRE + '76', 'complementares', cAces, 'Os ambientes destinados a conferências deverão dispor de espaços específicos reservados para pessoas com deficiência auditiva e visual, inclusive acompanhante.', 'C',
    'Certo. Auditórios e salas de conferência devem reservar espaços para pessoas com deficiência e acompanhantes, com localização adequada à visão e à audição (NBR 9050).');

  var cMad2 = 'A madeira natural pode ter emprego provisório (andaimes, tapumes, moldes) ou definitivo. No último caso, deve apresentar características que garantam sua durabilidade, resistência e aparência. Julgue o item sobre os testes de controle desse material.';
  ce('TRE78', F_TRE + '78', 'materiais', cMad2, 'A resistência é determinada, convencionalmente, pela máxima tensão que pode ser aplicada em corpos de prova, até o aparecimento de fenômenos particulares de comportamento.', 'C',
    'Certo. A NBR 7190 define a resistência como a máxima tensão aplicada ao corpo de prova até a ruptura ou até deformações específicas excessivas.');
  ce('TRE79', F_TRE + '79', 'materiais', cMad2, 'A rigidez é medida pelo valor médio do módulo de elasticidade, determinado na fase de comportamento elástico linear.', 'C',
    'Certo. A rigidez da madeira é caracterizada pelo módulo de elasticidade médio obtido no trecho elástico linear do ensaio.');
  ce('TRE80', F_TRE + '80', 'estruturas', cMad2, 'O projeto das estruturas de madeira deverá ser executado admitindo-se umidade de equilíbrio da madeira de, no máximo, 10%.', 'E',
    'Errado. A NBR 7190 adota 12% como umidade de referência. As propriedades são corrigidas para esse valor, e as classes de umidade do ambiente ajustam o coeficiente de modificação.');

  var cDren = 'Para a drenagem de pavimentos, são empregadas técnicas que procuram evitar ou minimizar o dano causado pela infiltração de água. Julgue o item.';
  ce('TRE87', F_TRE + '87', 'hidro', cDren, 'Camada drenante é uma camada de material granular colocada imediatamente abaixo do pavimento cuja função é drenar a água infiltrada para fora da pista de rolamento.', 'C',
    'Certo. A camada drenante, granular e de alta permeabilidade, fica sob o revestimento e conduz a água infiltrada para drenos laterais, fora da pista.');

  var cPerda = 'No dimensionamento hidráulico de tubulações para transporte de água em regime turbulento, um dos aspectos importantes é a determinação das perdas de carga ao longo do escoamento. Julgue o item.';
  ce('TRE89', F_TRE + '89', 'hidro', cPerda, 'É possível expressar a perda de carga localizada a partir de funções que a correlacionam com a velocidade do escoamento.', 'C',
    'Certo. A perda localizada é hL = K·V²/2g, proporcional à carga cinética.');
  ce('TRE90', F_TRE + '90', 'hidro', cPerda, 'Em se tratando de escoamento permanente em uma tubulação, sendo mantidos o diâmetro do tubo e a posição relativa ao plano horizontal entre dois pontos, não há perda de carga distribuída.', 'E',
    'Errado. Há perda distribuída sempre que há escoamento real, por atrito com as paredes (Darcy-Weisbach: hf = f·L/D·V²/2g), mesmo com diâmetro constante e tubo horizontal.');

  var cIdf2 = 'Nos estudos hidrológicos sobre precipitações máximas, as curvas intensidade-duração-frequência (i-d-f) são fundamentais para o dimensionamento de obras hidráulicas. Julgue o item.';
  ce('TRE91', F_TRE + '91', 'hidro', cIdf2, 'Para a determinação da curva i-d-f de certa localidade, devem ser consideradas unicamente as precipitações ocorridas no mês mais chuvoso da série anual.', 'E',
    'Errado. A curva i-d-f usa a série histórica de máximas anuais (ou parciais) para cada duração ao longo de todos os anos registrados, e não só o mês mais chuvoso.');
  ce('TRE92', F_TRE + '92', 'hidro', cIdf2, 'Na utilização de uma curva i-d-f a fim de determinar precipitações máximas, um maior tempo de retorno conduz a menores durações.', 'E',
    'Errado. Duração e período de retorno são variáveis independentes de entrada. Para uma mesma duração, T maior conduz a maior intensidade, e não a menor duração.');

  var cSolo2 = 'Nos estudos das propriedades dos solos, o emprego de relações entre características dos constituintes do solo é decisivo. Julgue o item.';
  ce('TRE93', F_TRE + '93', 'fundacoes', cSolo2, 'O peso específico aparente de um tipo de solo pode ser determinado em campo com o emprego do processo do frasco de areia.', 'C',
    'Certo. O frasco de areia (NBR 7185) determina a massa específica aparente in situ e é muito usado no controle de compactação.');
  ce('TRE94', F_TRE + '94', 'fundacoes', cSolo2, 'A porosidade de um solo é a razão entre o volume de vazios e o volume total de uma amostra de solo.', 'C',
    'Certo. n = Vv/V. Não confundir com o índice de vazios, e = Vv/Vs (vazios sobre sólidos).');

  var cAval = 'Alguns métodos são indicados pela literatura técnica para identificar o valor de um bem, tornando menos subjetivo o trabalho de avaliar bens, principalmente imóveis. Julgue o item.';
  ce('TRE95', F_TRE + '95', 'manutencao', cAval, 'O método comparativo direto de dados de mercado utiliza base de dados fornecida pelo Sistema Financeiro Nacional.', 'E',
    'Errado. O método comparativo (NBR 14653) usa uma amostra de dados de mercado de imóveis semelhantes (ofertas e transações), tratada por fatores ou inferência estatística, e não uma base do Sistema Financeiro.');
  ce('TRE96', F_TRE + '96', 'manutencao', cAval, 'O método evolutivo identifica o valor do bem pelo somatório das suas parcelas componentes.', 'C',
    'Certo. No método evolutivo, valor = (terreno + custo de reedição das benfeitorias) × fator de comercialização.');
  ce('TRE97', F_TRE + '97', 'manutencao', cAval, 'O método da capitalização da renda identifica o valor do bem com base na média de valor das ações de empresas produtoras desse bem.', 'E',
    'Errado. A capitalização da renda estima o valor pelo valor presente das rendas líquidas futuras do próprio bem, em cenários viáveis.');

  var cLic = 'Nas licitações da área de engenharia, existem definições previstas na legislação que são relevantes para o desfecho adequado dos trabalhos. Julgue o item.';
  ce('TRE98', F_TRE + '98', 'fiscalizacao', cLic, 'Recuperação ou ampliação estão classificadas na categoria de obra.', 'C',
    'Certo. A Lei 8.666/1993 definia obra como construção, reforma, fabricação, recuperação ou ampliação. Na Lei 14.133/2021 (art. 6º, XII), obra é a atividade privativa de engenheiro ou arquiteto que inova o espaço físico ou altera substancialmente as características originais de bem imóvel, conceito que abrange ampliações e recuperações dessa natureza.');
  ce('TRE99', F_TRE + '99', 'fiscalizacao', cLic, 'Empreitada por preço global é um regime para a execução indireta de uma obra.', 'C',
    'Certo. Empreitada por preço global é regime de execução indireta, em que a obra é contratada com terceiros por preço certo e total. A Lei 14.133 (art. 46) a mantém, ao lado da empreitada por preço unitário, da empreitada integral, da contratação por tarefa, da contratação integrada, da semi-integrada e do fornecimento com serviço associado.');

  var cIncorp = 'Em pareceres relacionados ao andamento de incorporações imobiliárias, o uso correto de termos técnicos (NBR 12721) define com clareza o atendimento ou não de obrigações previamente acordadas. Julgue o item.';
  ce('TRE100', F_TRE + '100', 'orcamento', cIncorp, 'Dependências de uso privativo são aquelas que podem ser utilizadas em comum por parte dos titulares de direito das unidades autônomas.', 'E',
    'Errado. Dependências de uso privativo são de uso exclusivo do titular da unidade autônoma. As usadas em comum pelos condôminos são as de uso comum.');
  ce('TRE101', F_TRE + '101', 'orcamento', cIncorp, 'Área real é a medida da superfície de uma dependência, excluídas as superfícies das projeções de paredes e elementos construtivos.', 'E',
    'Errado. Na NBR 12721, a área real inclui as superfícies ocupadas por paredes e demais elementos construtivos.');
  ce('TRE102', F_TRE + '102', 'orcamento', cIncorp, 'Área de construção sub-rogada é a área de construção a ser entregue em pagamento de parte ou de todo o terreno.', 'C',
    'Certo. É a área que o incorporador entrega ao proprietário do terreno como pagamento, na permuta.');

  var cOrc3 = 'O orçamento é uma peça essencial para o planejamento e controle de obras. Para a sua elaboração, alguns métodos, com suas características específicas, podem ser empregados. Julgue o item.';
  ce('TRE106', F_TRE + '106', 'orcamento', cOrc3, 'Nos custos unitários obtidos por meio de composição de custos, a composição dos serviços contempla exclusivamente os serviços de mão de obra.', 'E',
    'Errado. A composição unitária reúne materiais, mão de obra e equipamentos, com seus coeficientes de consumo ou produtividade.');
  ce('TRE107', F_TRE + '107', 'orcamento', cOrc3, 'Área equivalente de construção está relacionada com o padrão de especificação da obra.', 'C',
    'Certo. Área equivalente (NBR 12721) é a área virtual cujo custo equivale ao de uma área real de padrão diferente, ajustada por coeficientes ligados ao padrão de acabamento.');

  var cSeg = 'Na construção civil, devem ser tomados cuidados quanto à segurança do trabalho, com regulamentos específicos aplicáveis ao ambiente da construção. Julgue o item.';
  ce('TRE108', F_TRE + '108', 'fiscalizacao', cSeg, 'Nos alojamentos para mais de cem usuários, é permitido o uso de até três camas na vertical.', 'E',
    'Errado. A NR-18 proíbe mais de duas camas na mesma vertical (beliche com dois níveis), qualquer que seja o número de usuários.');
  ce('TRE110', F_TRE + '110', 'fiscalizacao', cSeg, 'Cabe ao empregado substituir imediatamente o equipamento de proteção individual que usa em seu serviço, caso este se danifique ou seja extraviado.', 'E',
    'Errado. Pela NR-6, cabe ao empregador substituir imediatamente o EPI danificado ou extraviado, sem custo. Ao empregado cabe comunicar o fato.');

  /* ===================== TJRO 2012 (múltipla escolha) ===================== */
  me('TJ21', F_TJ + '21', 'execucao', 'Assinale a opção correta a respeito da execução e inspeção do serviço de alvenaria em obras de construção civil.', {
    A: 'Na fixação da alvenaria, não há a necessidade de preencher toda a largura do bloco com argamassa.',
    B: 'No assentamento da argamassa para a execução da alvenaria, são utilizadas as seguintes ferramentas: colher de pedreiro, desempenadeira de madeira, bisnaga e meia-cana.',
    C: 'O encontro entre alvenarias pode ser executado sem travamento.',
    D: 'A verga e a contraverga devem ser apoiadas na alvenaria em no mínimo 5 cm.',
    E: 'A verga é construída na parte inferior da abertura e pode ser de bloco, canaleta ou pré-fabricada.'
  }, 'B', 'B. Colher, desempenadeira, bisnaga e meia-cana são ferramentas de aplicação da argamassa (a bisnaga e a meia-cana servem aos cordões). A: a junta horizontal deve ser preenchida conforme especificado. C: encontros exigem amarração ou travamento. D: o apoio usual é de 20 a 30 cm além do vão. E: a verga fica na parte superior; a contraverga, na inferior.');
  me('TJ23', F_TJ + '23', 'materiais', 'No que se refere ao concreto utilizado nas obras da construção civil e a seus materiais constituintes, assinale a opção correta.', {
    A: 'O uso de determinadas adições minerais melhora a trabalhabilidade e as propriedades de resistência à fissuração térmica do concreto.',
    B: 'As reações de hidratação dos compostos do cimento Portland são endotérmicas.',
    C: 'Cimentos expansivos são cimentos hidráulicos que, ao contrário do cimento Portland, expandem-se durante os períodos iniciais de hidratação, antes da pega.',
    D: 'A fissuração não proporciona mudanças de volume do concreto.',
    E: 'A dosagem do concreto deve ser feita apenas em volume dos materiais.'
  }, 'A', 'A. Adições como pozolanas, escória e sílica ativa melhoram a coesão e reduzem o calor de hidratação, diminuindo a fissuração térmica. B: a hidratação é exotérmica. C: os cimentos expansivos expandem depois da pega, para compensar a retração. D: fissuras vêm de variações de volume. E: a dosagem em massa é a preferida; o volume é admitido com correções.');
  me('TJ24', F_TJ + '24', 'manutencao', 'Em relação às patologias e à recuperação das construções, assinale a opção correta.', {
    A: 'Reações envolvendo hidrólise e lixiviações dos componentes da pasta de cimento endurecidos causam apenas a redução da porosidade.',
    B: 'O aumento da permeabilidade do concreto melhora a sua durabilidade.',
    C: 'A reação álcali-agregado ocorre em ambientes secos e úmidos.',
    D: 'O nível da água e a sua variação sazonal podem influenciar o ataque das peças de concreto e alvenarias por sulfatos.',
    E: 'A deterioração do concreto ocorre apenas por reações químicas.'
  }, 'D', 'D. Sulfatos chegam ao concreto dissolvidos na água; a variação do nível freático (molhagem e secagem) intensifica o ataque. A: a lixiviação aumenta a porosidade. B: mais permeabilidade, menos durabilidade. C: a RAA exige umidade. E: há também causas físicas (abrasão, gelo-degelo) e biológicas.');
  me('TJ25', F_TJ + '25', 'hidro', 'O uso de extintores contendo espuma é recomendado para combater incêndios', {
    A: 'cuja classe é representada pela cor azul.',
    B: 'em materiais pirofóricos.',
    C: 'em materiais combustíveis sólidos e líquidos inflamáveis.',
    D: 'em materiais condutores de eletricidade.',
    E: 'em instalações de alumínio.'
  }, 'C', 'C. A espuma atua por abafamento e resfriamento e é indicada para as classes A (sólidos) e B (líquidos inflamáveis). Por conter água, não deve ser usada em equipamentos energizados (classe C) nem em metais pirofóricos (classe D).');
  me('TJ26', F_TJ + '26', 'complementares', 'A respeito de instalações de gás, elétricas, hidráulicas e sanitárias das edificações, assinale a opção correta.', {
    A: 'A proteção contra descargas elétricas do tipo Franklin é mais adequada para edifícios de pequena altura e de grande área de projeção horizontal ou para casas residenciais.',
    B: 'A rede primária de uma instalação interna de gás liquefeito de petróleo é o trecho da instalação predial situado entre a central de gás e o regulador de primeiro estágio ou estágio único.',
    C: 'As instalações da central de gás devem permitir o reabastecimento dos recipientes, com interrupção da alimentação do gás aos aparelhos de utilização de no máximo uma hora.',
    D: 'No caso da utilização do sistema de redes de coleta de água e esgoto do tipo separador absoluto, as águas servidas da pia da cozinha e os dejetos oriundos dos vasos sanitários de uma residência devem receber destinos distintos.',
    E: 'Entre os critérios técnicos de dimensionamento de circuitos elétricos residenciais, incluem-se os de seção mínima, queda de tensão, proteção contra sobrecargas e proteção contra contatos indiretos.'
  }, 'E', 'E. A NBR 5410 dimensiona os condutores por seção mínima, capacidade de condução, queda de tensão, proteção contra sobrecargas e curtos e proteção contra contatos indiretos. A: o método Franklin serve a estruturas altas e de pequena área de cobertura. D: no separador absoluto, pia e vaso vão para a mesma rede de esgoto; o que se separa são as águas pluviais.');
  me('TJ27', F_TJ + '27', 'execucao', 'Assinale a opção correta no que diz respeito ao sistema de alvenaria estrutural utilizado na construção civil.', {
    A: 'As canaletas compensadoras em J são utilizadas no acabamento para racionalizar o encaixe entre as paredes e a laje.',
    B: 'O argamassamento dos cordões laterais dos blocos de alvenaria estrutural tem a função de melhorar a resistência aos esforços de tração e compressão.',
    C: 'Não existem blocos cerâmicos estruturais para a passagem de tubulações de água, esgoto e eletrodutos.',
    D: 'Para o uso de alvenaria estrutural com bloco cerâmico, a altura da edificação é limitada em dez pavimentos.',
    E: 'A ferramenta para a aplicação da argamassa nos blocos cerâmicos estruturais não pode ser a mesma utilizada em alvenaria de vedação.'
  }, 'A', 'A. O bloco J (canaleta em J) faz o arremate da última fiada junto à laje, servindo de fôrma lateral e compensando a altura. C: existem blocos hidráulicos e elétricos próprios para passagem de tubulações. D: a altura não é limitada a dez pavimentos.');
  me('TJ28', F_TJ + '28', 'estruturas', 'Assinale a opção correta a respeito da estabilidade estrutural das edificações.', {
    A: 'O estado limite de utilização é caracterizado pela perda de capacidade de suporte da estrutura.',
    B: 'A teoria de ruptura de Rankine se baseia na máxima tensão de cisalhamento.',
    C: 'Na eventualidade de colapsos localizados em estruturas, elementos estruturais calculados no regime linear elástico poderão vir a trabalhar no estado plástico, sem comprometimento da estabilidade global.',
    D: 'Em uma estrutura de concreto armado, calculada no regime linear elástico, o coeficiente de segurança estabelece a relação entre o momento de cálculo e o momento último.',
    E: 'A flambagem é um fenômeno que ocorre apenas em colunas.'
  }, 'C', 'C. A redistribuição de esforços pela plastificação permite que a estrutura hiperestática suporte colapsos localizados sem perder a estabilidade global. A: perda de capacidade é estado-limite último. B: Rankine usa a máxima tensão normal; Tresca, o cisalhamento. E: placas, cascas e mesas comprimidas também flambam.');
  me('TJ29', F_TJ + '29', 'fundacoes', 'Em relação à geotecnia e suas diversas aplicações na área da construção civil, assinale a opção correta.', {
    A: 'Vane Test é o ensaio realizado em laboratório para a verificação da resistência ao cisalhamento de solos não coesivos.',
    B: 'O fenômeno da capilaridade, prejudicial na construção de pavimentos rodoviários, pode ser contornado com a substituição dos materiais arenosos pelos siltosos.',
    C: 'A geomembrana é utilizada, entre outras finalidades, para evitar a colmatação dos vazios do material constituinte de drenos.',
    D: 'O uso de camadas delgadas de areia dispostas entre camadas de argila facilita a drenagem e incrementa a velocidade de adensamento de camadas compressíveis de solo.',
    E: 'No controle de compactação, verifica-se que quanto maior é a umidade do solo menor é o seu peso específico.'
  }, 'D', 'D. Lentes de areia reduzem a distância de drenagem (Hd) e aceleram o adensamento (t ∝ Hd²). A: o Vane Test é ensaio de campo para argilas moles. B: siltes têm maior ascensão capilar. C: quem filtra e evita colmatação é o geotêxtil; a geomembrana é impermeável. E: o peso específico seco cresce com a umidade até a umidade ótima.');
  me('TJ30', F_TJ + '30', 'hidro', 'No que se refere à hidráulica e hidrologia aplicadas à engenharia civil, assinale a opção correta.', {
    A: 'A equação de Bernoulli para o escoamento dos fluidos pode ser aplicada ao escoamento de fluidos através de orifícios.',
    B: 'No escoamento dos fluidos, o movimento variado é aquele em que força, velocidade e pressão mudam de ponto para ponto, mas se mantêm constantes em cada ponto ao longo do tempo.',
    C: 'No escoamento laminar, a velocidade da água em uma seção transversal qualquer tem um perfil linear.',
    D: 'A perda de carga que ocorre no escoamento de fluidos ao longo das canalizações depende da pressão interna sob a qual o fluido escoa.',
    E: 'De acordo com o teorema de Bernoulli para o escoamento dos fluidos, a soma das cargas de velocidade, pressão e posição varia ao longo do movimento de um fluido.'
  }, 'A', 'A. A fórmula de Torricelli (v = √2gh) para orifícios sai de Bernoulli. B: a definição dada é de escoamento permanente. C: o perfil laminar é parabólico. D: a perda de carga não depende da pressão interna. E: no fluido ideal, a soma das cargas é constante.');
  me('TJ32', F_TJ + '32', 'hidro', 'Em um sistema de abastecimento, a fim de se eliminar as impurezas e melhorar as características físicas, químicas e biológicas da água, a desinfecção pode ser feita com o uso de', {
    A: 'filtração rápida.', B: 'reagentes floculadores.', C: 'aeração.', D: 'carvão ativado.', E: 'ozônio.'
  }, 'E', 'E. O ozônio é agente desinfetante, oxidante forte, assim como cloro e radiação UV. Filtração, floculação, aeração e carvão ativado são etapas de clarificação ou remoção de gosto e odor, e não de desinfecção.');
  me('TJ46', F_TJ + '46', 'manutencao', 'A atividade relativa à apuração das causas de determinado evento denomina-se', {
    A: 'parecer.', B: 'perícia.', C: 'laudo de avaliação.', D: 'vistoria.', E: 'arbitramento.'
  }, 'B', 'B. Perícia é a atividade técnica que apura as causas de um fato, evento ou dano. Vistoria é a constatação de um fato sem investigar causas. Parecer é opinião técnica. Arbitramento é a determinação de valores.');
  me('TJ47', F_TJ + '47', 'manutencao', 'De acordo com as normas vigentes, falhas construtivas que causem prejuízo material ou financeiro ao consumidor denominam-se', {
    A: 'vícios construtivos.', B: 'depreciações.', C: 'avarias.', D: 'distorções.', E: 'defeitos.'
  }, 'A', 'A. Vícios construtivos são anomalias que afetam o desempenho ou o valor do bem e causam prejuízo material ou financeiro. Na terminologia de perícias, defeito é a anomalia que pode afetar a saúde ou a segurança do usuário.');
  me('TJ49', F_TJ + '49', 'orcamento', 'Tratando-se da orçamentação de obras, a composição de custos unitários é um dos processos do método do(a)', {
    A: 'custo baseado em atividades.', B: 'quantificação.', C: 'correlação simples.', D: 'correlação múltipla.', E: 'depreciação.'
  }, 'B', 'B. No orçamento detalhado (método da quantificação), levantam-se os quantitativos e aplica-se a cada serviço uma composição de custo unitário. Os métodos por correlação estimam o custo por parâmetros globais, como o CUB por m².');
  me('TJ50', F_TJ + '50', 'orcamento', 'O custo que compõe as bonificações e despesas indiretas (BDI) e corresponde ao rateio dos custos da sede da empresa construtora denomina-se', {
    A: 'mobilização.', B: 'instalação e manutenção do canteiro.', C: 'despesas financeiras.', D: 'encargos sociais.', E: 'administração central.'
  }, 'E', 'E. Administração central é o rateio das despesas da sede. Mobilização, canteiro e administração local são custos diretos, e encargos sociais incidem sobre a mão de obra.');
  me('TJ53', F_TJ + '53', 'complementares', 'No programa AutoCAD, ao selecionar o comando rectangle e clicar um ponto da tela, deve-se digitar, para obter um retângulo de 20 unidades de largura e 10 unidades de altura,', {
    A: 'draw20x10.', B: 'write20,10.', C: '@20,10.', D: 'go20,10.', E: '#20,10.'
  }, 'C', 'C. O prefixo @ indica coordenadas relativas ao último ponto. @20,10 define o canto oposto a 20 unidades em x e 10 em y.');
  me('TJ54', F_TJ + '54', 'complementares', 'No programa AutoCAD, ao se aplicar o comando scale em um quadrado de duas unidades de medida de lado, com um fator de escala dois, ele se altera para um', {
    A: 'quadrado de oito unidades de lado.', B: 'quadrado de quatro unidades de lado.', C: 'quadrado de uma unidade de lado.', D: 'retângulo de quatro unidades de base e duas unidades de altura.', E: 'retângulo de duas unidades de base e quatro unidades de altura.'
  }, 'B', 'B. O SCALE altera o objeto uniformemente nas duas direções: 2 × 2 = 4 unidades de lado. A forma continua quadrada.');
  me('TJ55', F_TJ + '55', 'orcamento', 'Em orçamentação de obras, para o cálculo da depreciação de um equipamento, utiliza-se, entre outros, método baseado na hipótese de que a depreciação do bem varia de modo uniforme ao longo de sua vida útil. Esse método corresponde ao', {
    A: 'do serviço executado.', B: 'do índice de aproveitamento.', C: 'da correlação.', D: 'linear de depreciação.', E: 'do fundo de reserva.'
  }, 'D', 'D. No método linear, D = (Vi − Vr)/n: a depreciação é constante em cada período da vida útil. É o usado no custo horário de equipamentos (SINAPI e SICRO).');
  me('TJ57', F_TJ + '57', 'fiscalizacao', 'Considerando o que dispõe a legislação vigente sobre o exercício das profissões de engenheiro, arquiteto e agrônomo, assinale a opção correta.', {
    A: 'Caso não seja contratado para executar a obra, o autor do projeto só poderá acompanhar a sua execução mediante autorização expressa do dono do empreendimento.',
    B: 'Entidades públicas que executam atividades de engenharia estão dispensadas da fiscalização dos conselhos regionais de Engenharia, Arquitetura e Agronomia (CREA).',
    C: 'A atribuição da denominação de engenheiro a profissionais de nível médio que detenham notório saber na área de engenharia condiciona-se à aprovação do CONFEA.',
    D: 'Em órgãos públicos que realizam atividades de engenharia, para os cargos e funções de chefia, que exijam conhecimentos de engenharia, a obrigatoriedade de habilitação é dispensável.',
    E: 'Empresas construtoras somente poderão executar obras de engenharia se houver a participação efetiva e autoria declarada de profissional legalmente habilitado e registrado pelo CREA.'
  }, 'E', 'E. A Lei 5.194/1966 exige que empresas só executem obras de engenharia com participação efetiva e autoria declarada de profissional habilitado e registrado. A: o autor do projeto tem direito de acompanhar a execução. B e D: órgãos públicos também se sujeitam à fiscalização e à exigência de habilitação. C: a denominação de engenheiro é privativa dos diplomados.');
  me('TJ60', F_TJ + '60', 'fiscalizacao', 'De acordo com a NR-18, a área de vivência de um canteiro de obras inclui', {
    A: 'área de lazer.', B: 'central de concreto.', C: 'carpintaria.', D: 'almoxarifado.', E: 'guarita.'
  }, 'A', 'A. Áreas de vivência atendem às necessidades dos trabalhadores: instalações sanitárias, vestiário, local para refeições, alojamento e área de lazer (esta quando há alojamento). Central de concreto, carpintaria, almoxarifado e guarita são áreas operacionais ou de apoio.');

  /* ===================== INÉDITAS (estilo Cebraspe) ===================== */
  var cNbr6118 = 'Acerca do projeto de estruturas de concreto armado conforme a ABNT NBR 6118, julgue o item.';
  ce('IN01', F_IN, 'estruturas', cNbr6118, 'Para vigas e pilares de concreto armado situados em ambiente de classe de agressividade ambiental III, o cobrimento nominal mínimo é de 40 mm.', 'C',
    'Certo. Tabela 7.2 da NBR 6118 (Δc = 10 mm), para viga e pilar: CAA I = 25 mm, II = 30 mm, III = 40 mm e IV = 50 mm. Para lajes, 20, 25, 35 e 45 mm.');
  ce('IN02', F_IN, 'estruturas', cNbr6118, 'Em ambiente de classe de agressividade ambiental II, o concreto armado deve ter classe mínima C25 e relação água/cimento máxima de 0,60.', 'C',
    'Certo. Tabela 7.1 da NBR 6118 para concreto armado: CAA I – C20 e a/c ≤ 0,65; II – C25 e 0,60; III – C30 e 0,55; IV – C40 e 0,45.');
  ce('IN03', F_IN, 'estruturas', cNbr6118, 'Para a verificação de aceitabilidade sensorial visual, o deslocamento-limite das flechas totais de vigas e lajes é L/250.', 'C',
    'Certo. A tabela 13.3 da NBR 6118 fixa L/250 para deslocamentos visíveis (efeito visual) e L/350 para vibrações sentidas no piso.');
  ce('IN04', F_IN, 'estruturas', cNbr6118, 'Nas combinações normais de estado-limite último, os coeficientes de ponderação das resistências do concreto e do aço valem, respectivamente, 1,4 e 1,15.', 'C',
    'Certo. γc = 1,4 e γs = 1,15 nas combinações normais. Nas combinações especiais ou de construção, 1,2 e 1,15; nas excepcionais, 1,2 e 1,0.');
  ce('IN05', F_IN, 'estruturas', cNbr6118, 'No estádio II, admite-se que o concreto tracionado colabora com o aço na resistência à tração da seção fissurada.', 'E',
    'Errado. No estádio II o concreto já fissurou na zona tracionada e sua resistência à tração é desprezada; toda a tração vai para a armadura. O concreto à tração só é considerado no estádio I.');
  ce('IN06', F_IN, 'estruturas', cNbr6118, 'Uma laje retangular apoiada nos quatro bordos cuja relação entre o vão maior e o vão menor seja superior a 2 é usualmente calculada como armada em uma só direção.', 'C',
    'Certo. Com λ = ly/lx > 2, a carga vai quase toda na direção do menor vão, e a laje é tratada como armada em uma direção, com armadura de distribuição na outra.');

  var cRes = 'Com relação à resistência dos materiais e à análise de estruturas, julgue o item.';
  ce('IN07', F_IN, 'estruturas', cRes, 'Em uma viga biapoiada sob carga uniformemente distribuída p, de vão L e rigidez EI, a flecha máxima vale 5pL⁴/(384EI) e o momento máximo vale pL²/8.', 'C',
    'Certo. São os resultados clássicos da viga biapoiada com carga uniforme, ambos no meio do vão.');
  ce('IN08', F_IN, 'estruturas', cRes, 'Dobrando-se o comprimento de flambagem de um pilar, mantidos material e seção, sua carga crítica de Euler reduz-se à metade.', 'E',
    'Errado. Pcr = π²EI/Le². Dobrar Le reduz a carga crítica a um quarto.');
  ce('IN09', F_IN, 'estruturas', cRes, 'Uma viga biengastada submetida a carregamento plano genérico é três vezes hiperestática.', 'C',
    'Certo. São 6 reações (3 em cada engaste) e 3 equações de equilíbrio no plano: grau de hiperestaticidade 6 − 3 = 3.');
  ce('IN10', F_IN, 'estruturas', cRes, 'O aço estrutural ASTM A36, muito usado em perfis laminados, possui resistência ao escoamento de 250 MPa.', 'C',
    'Certo. O A36 tem fy = 250 MPa e fu entre 400 e 550 MPa. Perfis de alta resistência, como o A572 Gr. 50, têm fy = 345 MPa.');
  ce('IN11', F_IN, 'estruturas', 'Sobre projetos de fôrmas e escoramentos e a NBR 14931, julgue o item.', 'A retirada das fôrmas e do escoramento pode ser feita em qualquer sequência, desde que transcorridos sete dias da concretagem.', 'E',
    'Errado. A desforma depende de o concreto ter atingido a resistência necessária e de seguir um plano que evite esforços não previstos. Balanços, por exemplo, são desescorados da extremidade para o apoio. Não existe prazo único que autorize qualquer sequência.');

  var cFund = 'Acerca de investigações geotécnicas, fundações e contenções, julgue o item.';
  ce('IN12', F_IN, 'fundacoes', cFund, 'No ensaio SPT, o índice N corresponde ao número de golpes necessários para cravar os 30 cm finais do amostrador padrão, com martelo de 65 kg caindo de 75 cm de altura.', 'C',
    'Certo. NBR 6484: o amostrador é cravado 45 cm em três segmentos de 15 cm, e o NSPT é a soma dos golpes dos dois últimos (30 cm). O martelo tem 65 kg e cai de 75 cm.');
  ce('IN13', F_IN, 'fundacoes', cFund, 'Pela NBR 8036, para edificação com área de projeção de 350 m², o número mínimo de sondagens de simples reconhecimento é três.', 'C',
    'Certo. A NBR 8036 pede no mínimo 2 furos para áreas até 200 m² e 3 furos entre 200 e 400 m². Acima disso, 1 furo a cada 200 m² até 1.200 m².');
  ce('IN14', F_IN, 'fundacoes', cFund, 'Segundo a teoria de Rankine, para solo não coesivo com ângulo de atrito φ, o coeficiente de empuxo ativo é Ka = tan²(45° − φ/2), sempre menor que o coeficiente de empuxo passivo.', 'C',
    'Certo. Ka = tan²(45° − φ/2) e Kp = tan²(45° + φ/2) = 1/Ka. Para φ > 0, Ka < 1 < Kp.');
  ce('IN15', F_IN, 'fundacoes', cFund, 'O atrito negativo em estacas ocorre quando o solo ao redor do fuste recalca mais que a estaca, como no caso de aterro recente sobre argila mole, acrescentando carga à fundação.', 'C',
    'Certo. Quando o solo desce em relação à estaca, o atrito lateral passa a atuar para baixo e soma carga à fundação, em vez de resistir.');
  ce('IN16', F_IN, 'fundacoes', cFund, 'Na estaca hélice contínua monitorada, o concreto é bombeado pelo tubo central do trado durante sua retirada, e a armadura é introduzida após a concretagem.', 'C',
    'Certo. É a sequência executiva da hélice contínua: perfuração contínua, concretagem por bombeamento durante a extração do trado e inserção da armação no concreto fresco.');
  ce('IN17', F_IN, 'fundacoes', cFund, 'Tubulões a céu aberto são indicados para escavações abaixo do nível d\'água em areias puras, dispensando revestimento ou uso de ar comprimido.', 'E',
    'Errado. Tubulões a céu aberto são escavados acima do nível d\'água, em solos coesivos que se mantêm estáveis. Abaixo do lençol, sobretudo em areias, usam-se revestimento e ar comprimido, ou outra solução.');
  ce('IN18', F_IN, 'fundacoes', cFund, 'Muros de arrimo de gravidade resistem ao empuxo de terra principalmente por meio do próprio peso.', 'C',
    'Certo. Muros de gravidade (concreto ciclópico, pedra, gabiões) equilibram o empuxo pelo peso próprio e são verificados quanto a tombamento, deslizamento e capacidade de carga da base.');

  var cMat = 'Julgue o item acerca de materiais de construção e de seu controle tecnológico.';
  ce('IN19', F_IN, 'materiais', cMat, 'Segundo a NBR 7212, o concreto dosado em central deve ser transportado de modo que o intervalo entre o início da mistura e a entrega não ultrapasse 90 minutos, e a descarga deve terminar em até 150 minutos do início da mistura.', 'C',
    'Certo. São os limites usuais da NBR 7212 para concreto sem aditivo retardador: 90 min até a entrega e 150 min até o fim da descarga.');
  ce('IN20', F_IN, 'materiais', cMat, 'O ensaio de abatimento do tronco de cone permite estimar diretamente a resistência à compressão do concreto fresco.', 'E',
    'Errado. O slump test (NBR 16889) mede a consistência e a trabalhabilidade. A resistência é verificada em corpos de prova cilíndricos rompidos à compressão (NBR 5739).');
  ce('IN21', F_IN, 'materiais', cMat, 'No controle de aceitação do concreto (NBR 12655), cada exemplar é constituído por dois corpos de prova da mesma amassada, adotando-se como resistência do exemplar o maior dos dois valores obtidos.', 'C',
    'Certo. A NBR 12655 define o exemplar como dois CPs moldados da mesma betonada, e vale o maior dos dois resultados.');
  ce('IN22', F_IN, 'materiais', cMat, 'O aço CA-60 é fornecido em barras laminadas a quente, com diâmetros nominais a partir de 12,5 mm.', 'E',
    'Errado. O CA-60 é fornecido em fios trefilados a frio (deformação a frio), com diâmetros pequenos, até 10 mm. Barras laminadas a quente de maior diâmetro são CA-50.');
  ce('IN23', F_IN, 'materiais', cMat, 'O cimento Portland de alto-forno (CP III), por apresentar menor calor de hidratação e maior resistência a sulfatos, é indicado para concreto massa e obras em ambiente agressivo.', 'C',
    'Certo. O alto teor de escória do CP III reduz o calor de hidratação e a permeabilidade e aumenta a resistência a sulfatos e cloretos. O ganho inicial de resistência é mais lento.');
  ce('IN24', F_IN, 'materiais', cMat, 'Mantida a mesma trabalhabilidade, o uso de aditivo plastificante permite reduzir a água de amassamento e, assim, a relação água/cimento.', 'C',
    'Certo. Plastificantes e superplastificantes dispersam as partículas de cimento. Com menos água para a mesma consistência, a relação a/c cai e a resistência e a durabilidade aumentam (lei de Abrams).');
  ce('IN25', F_IN, 'materiais', cMat, 'O vidro temperado pode ser cortado e furado na obra, após a têmpera, para ajustes de instalação.', 'E',
    'Errado. Depois da têmpera o vidro não pode ser cortado nem furado: as tensões internas fazem a peça estilhaçar. Cortes, furos e recortes são feitos antes do tratamento.');
  ce('IN26', F_IN, 'materiais', cMat, 'Blocos cerâmicos de vedação devem apresentar resistência característica à compressão mínima de 1,5 MPa, segundo a NBR 15270.', 'C',
    'Certo. A NBR 15270-1 fixa fbk mínimo de 1,5 MPa para blocos de vedação. Blocos estruturais têm exigências maiores, a partir de 3,0 MPa.');

  var cExec = 'Julgue o item acerca da execução de obras de edificações.';
  ce('IN27', F_IN, 'execucao', cExec, 'Para evitar segregação, a altura de lançamento livre do concreto deve ser limitada a cerca de 2 m; alturas maiores exigem cuidados especiais, como tubos de lançamento ou janelas nas fôrmas.', 'C',
    'Certo. A NBR 14931 recomenda limitar a altura de queda livre (em torno de 2 m) ou usar funis, trombas e janelas para evitar segregação.');
  ce('IN28', F_IN, 'execucao', cExec, 'No adensamento com vibrador de imersão, recomenda-se encostar a agulha na armadura para transmitir a vibração a toda a massa de concreto.', 'E',
    'Errado. A agulha deve ser introduzida verticalmente, sem tocar armaduras nem fôrmas, em pontos espaçados conforme o raio de ação, e retirada lentamente.');
  ce('IN29', F_IN, 'execucao', cExec, 'O encunhamento da alvenaria de vedação na estrutura deve ser feito no mesmo dia da elevação da parede, para garantir a solidarização imediata com a viga ou laje superior.', 'E',
    'Errado. O encunhamento é feito dias depois, aguardando a acomodação da argamassa e, de preferência, o carregamento da estrutura (em geral de cima para baixo), para reduzir fissuras por deformação.');
  ce('IN30', F_IN, 'execucao', cExec, 'Em revestimentos cerâmicos de pisos de grandes áreas, dispensam-se juntas de movimentação, bastando as juntas de assentamento entre as placas.', 'E',
    'Errado. As normas de revestimento cerâmico (NBR 13753 e NBR 13755) exigem juntas de movimentação em grandes áreas e em mudanças de material ou de plano, além de juntas estruturais e de assentamento.');
  ce('IN31', F_IN, 'execucao', cExec, 'Antes da pintura de reboco novo com tinta látex, deve-se aguardar a cura da base, em geral cerca de 28 dias, e aplicar fundo preparador ou selador adequado.', 'C',
    'Certo. A base precisa estar curada, seca e com alcalinidade reduzida. Pintar cedo causa saponificação, manchas e descascamento.');

  var cHid = 'A respeito de instalações prediais hidrossanitárias e de combate a incêndio, julgue o item.';
  ce('IN32', F_IN, 'hidro', cHid, 'Segundo a NBR 5626, a pressão estática máxima nos pontos de utilização é de 400 kPa, e a pressão dinâmica mínima em qualquer ponto da rede é de 5 kPa.', 'C',
    'Certo. A NBR 5626 limita a pressão estática a 400 kPa (cerca de 40 m.c.a.), o que pode exigir válvulas redutoras. Exige pressão dinâmica mínima de 5 kPa em qualquer ponto da rede e de 10 kPa nos pontos de utilização.');
  ce('IN33', F_IN, 'hidro', cHid, 'Os desconectores das instalações de esgoto devem ter fecho hídrico com altura mínima de 50 mm.', 'C',
    'Certo. A NBR 8160 exige fecho hídrico mínimo de 50 mm. O sistema de ventilação protege esse fecho contra sifonagem e sobrepressões.');
  ce('IN34', F_IN, 'hidro', cHid, 'O diâmetro de um tubo de queda de esgoto pode ser reduzido no sentido do escoamento, desde que a vazão nos pavimentos inferiores seja menor.', 'E',
    'Errado. A NBR 8160 não admite redução de diâmetro no sentido do escoamento em tubulações de esgoto. O tubo de queda tem diâmetro uniforme, dimensionado para o total de UHC.');
  ce('IN35', F_IN, 'hidro', cHid, 'O golpe de aríete é a sobrepressão provocada pela interrupção brusca do escoamento, como no fechamento rápido de válvulas.', 'C',
    'Certo. A variação brusca de velocidade gera ondas de pressão que podem romper tubos e conexões. Mitiga-se com fechamento lento, válvulas antigolpe e ventosas.');
  ce('IN36', F_IN, 'hidro', cHid, 'Extintores de água pressurizada são indicados para incêndios classe C, em equipamentos elétricos energizados.', 'E',
    'Errado. A água conduz eletricidade. Classe C pede agentes não condutores, como CO₂ e pó químico. A água é indicada para a classe A.');
  ce('IN37', F_IN, 'hidro', cHid, 'Nos chuveiros automáticos (sprinklers) do tipo ampola, o acionamento ocorre individualmente, quando o líquido da ampola termossensível se expande e a rompe pela elevação da temperatura.', 'C',
    'Certo. Cada bico abre sozinho ao atingir a temperatura nominal da ampola. Só atuam os chuveiros próximos ao foco.');

  var cComp = 'Julgue o item acerca de projetos complementares, CAD e BIM.';
  ce('IN38', F_IN, 'complementares', cComp, 'A NBR 5410 exige dispositivo diferencial-residual de alta sensibilidade (IΔn ≤ 30 mA) nos circuitos que sirvam a pontos situados em locais com banheira ou chuveiro.', 'C',
    'Certo. O DR de 30 mA é obrigatório em banheiros, áreas externas, cozinhas, lavanderias, áreas de serviço e outros locais molhados.');
  ce('IN39', F_IN, 'complementares', cComp, 'No esquema de aterramento TN-S, as funções de neutro e de proteção são exercidas por condutores distintos em toda a instalação.', 'C',
    'Certo. No TN-S, N e PE são separados. No TN-C são combinados (PEN). No TN-C-S, combinados em parte da instalação.');
  ce('IN40', F_IN, 'complementares', cComp, 'Na modelagem BIM, a dimensão 4D associa o modelo ao custo, e a dimensão 5D, ao planejamento temporal.', 'E',
    'Errado. Está invertido: 4D é o tempo (cronograma, simulação da sequência construtiva) e 5D é o custo (quantitativos e orçamento).');
  ce('IN41', F_IN, 'complementares', cComp, 'O IFC (Industry Foundation Classes) é formato aberto e neutro, normatizado pela ISO 16739, destinado à interoperabilidade entre softwares BIM.', 'C',
    'Certo. O IFC, mantido pela buildingSMART, é o padrão aberto de troca de modelos BIM entre plataformas diferentes.');
  ce('IN42', F_IN, 'complementares', cComp, 'A detecção de interferências (clash detection) entre disciplinas é aplicação típica do modelo BIM federado na fase de compatibilização de projetos.', 'C',
    'Certo. Os modelos de arquitetura, estrutura e instalações são combinados para achar conflitos geométricos antes da obra.');
  ce('IN43', F_IN, 'complementares', cComp, 'A Lei nº 13.589/2018 obriga edifícios de uso público e coletivo com ambientes climatizados artificialmente a dispor de Plano de Manutenção, Operação e Controle (PMOC).', 'C',
    'Certo. A Lei do PMOC exige o plano para garantir a qualidade do ar interior, sob responsabilidade técnica de profissional habilitado.');
  ce('IN44', F_IN, 'complementares', cComp, 'Nos sistemas VRF (fluxo de refrigerante variável), uma unidade condensadora pode atender várias unidades evaporadoras, modulando a vazão de refrigerante conforme a carga.', 'C',
    'Certo. O VRF é de expansão direta, com compressores de velocidade variável e várias evaporadoras por condensadora.');
  ce('IN45', F_IN, 'complementares', cComp, 'Nos elevadores sem casa de máquinas (MRL), a máquina de tração fica instalada na própria caixa de corrida.', 'C',
    'Certo. No MRL (machine room-less), máquina e quadro de comando ficam na caixa de corrida, sem casa de máquinas.');
  ce('IN46', F_IN, 'complementares', cComp, 'O Decreto nº 10.306/2020 estabelece a utilização do BIM na execução direta ou indireta de obras e serviços de engenharia por órgãos e entidades da administração pública federal, de forma gradual.', 'C',
    'Certo. O decreto implanta o BIM em fases desde 2021, inicialmente em projetos de arquitetura e engenharia de obras novas e ampliações, depois em orçamento, planejamento e gestão.');

  var cOrcI = 'Acerca de orçamento de obras, BDI e planejamento, julgue o item.';
  ce('IN47', F_IN, 'orcamento', cOrcI, 'Segundo o modelo adotado pelo TCU (Acórdão 2.622/2013), BDI = {[(1 + AC + S + R + G)·(1 + DF)·(1 + L)] / (1 − I)} − 1, em que I representa os tributos incidentes sobre o preço de venda.', 'C',
    'Certo. AC = administração central; S + G = seguros e garantias; R = riscos; DF = despesas financeiras; L = lucro; I = tributos (PIS, COFINS, ISS e CPRB, quando houver).');
  ce('IN48', F_IN, 'orcamento', cOrcI, 'Pelo entendimento do TCU, a administração local, a mobilização e a instalação do canteiro devem compor o BDI, e não a planilha de custos diretos.', 'E',
    'Errado. O TCU orienta que administração local, mobilização/desmobilização e canteiro sejam itens de custo direto da planilha, porque são mensuráveis. IRPJ e CSLL também não entram no BDI (Súmula 254).');
  ce('IN49', F_IN, 'orcamento', cOrcI, 'Na curva ABC de insumos ou serviços, a classe A reúne pequena quantidade de itens que respondem pela maior parcela do custo total da obra.', 'C',
    'Certo. A curva ABC (Pareto) mostra que cerca de 20% dos itens concentram algo como 50% a 80% do custo. Esses itens merecem atenção prioritária no orçamento e na fiscalização.');
  ce('IN50', F_IN, 'orcamento', cOrcI, 'Nas obras e serviços de engenharia contratados com recursos da União, o custo global de referência deve ser obtido, em regra, a partir das composições do SINAPI, ou do SICRO para obras rodoviárias.', 'C',
    'Certo. É o que determinam o Decreto 7.983/2013 e a Lei 14.133/2021 (art. 23, § 2º).');
  ce('IN51', F_IN, 'orcamento', cOrcI, 'Na técnica PERT, o tempo esperado de uma atividade é te = (a + 4m + b)/6, em que a, m e b são as durações otimista, mais provável e pessimista.', 'C',
    'Certo. É a média da distribuição beta adotada no PERT. A variância é ((b − a)/6)².');
  ce('IN52', F_IN, 'orcamento', cOrcI, 'Em uma rede CPM, a folga livre de uma atividade é sempre maior ou igual à sua folga total.', 'E',
    'Errado. A folga livre (atraso que não afeta o início mais cedo das sucessoras) é sempre menor ou igual à folga total (atraso que não afeta o prazo final).');
  ce('IN53', F_IN, 'orcamento', cOrcI, 'Qualquer atraso em atividade do caminho crítico, mantidas as demais durações, implica atraso no prazo final do empreendimento.', 'C',
    'Certo. As atividades críticas têm folga total nula, então todo atraso nelas se transfere ao término da obra.');
  ce('IN54', F_IN, 'orcamento', cOrcI, 'O cronograma físico-financeiro relaciona a evolução física dos serviços ao desembolso em cada período; sua representação acumulada gera a chamada curva S.', 'C',
    'Certo. A curva S acumulada mostra ritmo lento no início, aceleração no meio e desaceleração no fim. Serve ao controle de avanço e ao planejamento de desembolso.');
  ce('IN55', F_IN, 'orcamento', cOrcI, 'O diagrama de Gantt, em sua forma básica, evidencia as dependências entre atividades e identifica automaticamente o caminho crítico.', 'E',
    'Errado. O Gantt básico mostra só a duração e a posição das atividades no tempo. Dependências e caminho crítico aparecem nas redes PERT/CPM ou em Gantts vinculados de softwares de planejamento.');
  ce('IN56', F_IN, 'orcamento', cOrcI, 'No custo horário produtivo de um equipamento, consideram-se, entre outras parcelas, depreciação, juros do capital, manutenção, materiais de operação e mão de obra de operação.', 'C',
    'Certo. O SINAPI e o SICRO compõem o custo horário produtivo com depreciação, juros, manutenção, combustível ou energia e operador. O improdutivo exclui as parcelas de operação.');
  ce('IN57', F_IN, 'orcamento', cOrcI, 'Nos orçamentos do SINAPI, os encargos sociais incidem sobre a remuneração da mão de obra e variam conforme a modalidade de contratação (horista ou mensalista) e a opção pela desoneração da folha.', 'C',
    'Certo. O SINAPI publica percentuais de encargos sociais para horistas e mensalistas, com e sem desoneração, por unidade da federação.');

  var cMan = 'Acerca de manutenção predial, patologia das construções e impermeabilização, julgue o item.';
  ce('IN58', F_IN, 'manutencao', cMan, 'Segundo a NBR 5674, a manutenção corretiva caracteriza-se por serviços que demandam ação ou intervenção imediata, a fim de permitir a continuidade do uso dos sistemas, elementos ou componentes, ou de evitar graves riscos ou prejuízos.', 'C',
    'Certo. É a definição da NBR 5674. A manutenção rotineira é um fluxo constante de serviços padronizados; a preventiva tem realização programada com antecedência.');
  ce('IN59', F_IN, 'manutencao', cMan, 'A NBR 15575 estabelece vida útil de projeto mínima de 50 anos para o sistema estrutural de edificações habitacionais.', 'C',
    'Certo. VUP mínima: estrutura ≥ 50 anos; vedações verticais externas ≥ 40; coberturas ≥ 20; hidrossanitários ≥ 20; pisos internos ≥ 13.');
  ce('IN60', F_IN, 'manutencao', cMan, 'A carbonatação reduz o pH da solução dos poros do concreto, podendo levar à despassivação das armaduras quando a frente de carbonatação as alcança.', 'C',
    'Certo. O CO₂ reage com o hidróxido de cálcio e o pH cai de cerca de 12,5 para menos de 9. A película passivadora do aço se desfaz e a corrosão começa, na presença de umidade e oxigênio.');
  ce('IN61', F_IN, 'manutencao', cMan, 'No ensaio com fenolftaleína, a região carbonatada do concreto adquire coloração vermelho-carmim, enquanto a região não carbonatada permanece incolor.', 'E',
    'Errado. É o contrário: a região alcalina (não carbonatada) fica vermelho-carmim e a carbonatada (pH abaixo de cerca de 9) permanece incolor.');
  ce('IN62', F_IN, 'manutencao', cMan, 'A eflorescência consiste em depósitos salinos, geralmente esbranquiçados, formados na superfície de alvenarias e concretos pela migração de sais solúveis transportados pela água.', 'C',
    'Certo. Exige sais solúveis, água e evaporação na superfície. O tratamento começa por eliminar a fonte de umidade.');
  ce('IN63', F_IN, 'manutencao', cMan, 'Segundo a Lei de Sitter, os custos de intervenção crescem em progressão geométrica de razão 5 conforme a fase em que a medida é tomada: projeto, execução, manutenção preventiva e manutenção corretiva.', 'C',
    'Certo. A "lei dos cinco" mostra que corrigir na fase de projeto custa muito menos que corrigir na manutenção corretiva.');
  ce('IN64', F_IN, 'manutencao', cMan, 'Fissuras inclinadas a aproximadamente 45° a partir dos cantos de janelas e portas em alvenarias são típicas da ausência ou insuficiência de vergas e contravergas.', 'C',
    'Certo. A concentração de tensões nos cantos das aberturas gera fissuras inclinadas, que vergas e contravergas bem ancoradas previnem.');
  ce('IN65', F_IN, 'manutencao', cMan, 'Sistemas de impermeabilização rígidos, como argamassas com aditivo hidrófugo, são os mais indicados para lajes de cobertura sujeitas a grandes variações térmicas e movimentações.', 'E',
    'Errado. Estruturas sujeitas a movimentação e fissuração pedem sistemas flexíveis, como mantas asfálticas e membranas. Os rígidos servem a locais sem movimentação, como subsolos e reservatórios enterrados (NBR 9575).');
  ce('IN66', F_IN, 'manutencao', cMan, 'Concluída a impermeabilização de uma laje, deve-se realizar teste de estanqueidade com lâmina d\'água mantida por, no mínimo, 72 horas.', 'C',
    'Certo. A NBR 9574 prevê o teste de estanqueidade (lâmina d\'água) por no mínimo 72 h, antes da proteção mecânica.');
  ce('IN67', F_IN, 'manutencao', cMan, 'Para recuperar uma viga com armaduras corroídas e concreto desagregado, basta aplicar pintura impermeabilizante sobre a superfície fissurada.', 'E',
    'Errado. É preciso remover o concreto deteriorado ou contaminado além das barras, limpar a armadura (e repor seção perdida), aplicar proteção e reconstituir o cobrimento com argamassa ou graute de reparo. Proteção superficial vem depois.');
  ce('IN68', F_IN, 'manutencao', cMan, 'A NBR 16747 trata da inspeção predial, avaliação predominantemente sensorial das condições de uso, manutenção e desempenho da edificação, com classificação das irregularidades e recomendação de ações por ordem de prioridade.', 'C',
    'Certo. A NBR 16747 (2020) define diretrizes, conceitos e procedimentos da inspeção predial, com organização das prioridades em patamares de urgência.');

  var cFis = 'Acerca da fiscalização de obras e serviços de engenharia, da Lei nº 14.133/2021 e das normas de segurança do trabalho, julgue o item.';
  ce('IN69', F_IN, 'fiscalizacao', cFis, 'A execução do contrato deve ser acompanhada e fiscalizada por um ou mais fiscais do contrato, representantes da administração especialmente designados, permitida a contratação de terceiros para assisti-los.', 'C',
    'Certo. É o que dispõe o art. 117 da Lei 14.133/2021. O fiscal anota em registro próprio as ocorrências e determina a regularização de faltas ou defeitos.');
  ce('IN70', F_IN, 'fiscalizacao', cFis, 'Em obras, o recebimento provisório é feito pelo responsável pelo acompanhamento e fiscalização, mediante termo detalhado, e o definitivo, por servidor ou comissão designada pela autoridade competente, após comprovação do atendimento das exigências contratuais.', 'C',
    'Certo. Art. 140, I, da Lei 14.133. O recebimento definitivo não exclui a responsabilidade do contratado pela solidez e segurança da obra.');
  ce('IN71', F_IN, 'fiscalizacao', cFis, 'Após o recebimento definitivo da obra, cessa a responsabilidade do contratado por vícios que comprometam a solidez e a segurança da edificação.', 'E',
    'Errado. O contratado responde pela solidez e segurança por no mínimo 5 anos, conforme o art. 140, § 6º, da Lei 14.133 e o art. 618 do Código Civil.');
  ce('IN72', F_IN, 'fiscalizacao', cFis, 'Nos contratos de obras, a administração pode impor ao contratado acréscimos ou supressões de até 25% do valor inicial atualizado, e, no caso de reforma de edifício ou equipamento, acréscimos de até 50%.', 'C',
    'Certo. São os limites do art. 125 da Lei 14.133/2021.');
  ce('IN73', F_IN, 'fiscalizacao', cFis, 'Na contratação integrada, a administração fornece o projeto básico e o contratado elabora apenas o projeto executivo e executa a obra.', 'E',
    'Errado. Isso descreve a contratação semi-integrada. Na integrada, o contratado elabora o projeto básico e o executivo a partir do anteprojeto fornecido pela administração (art. 6º, XXXII e XXXIII).');
  ce('IN74', F_IN, 'fiscalizacao', cFis, 'O estudo técnico preliminar é o documento da fase preparatória que caracteriza o interesse público envolvido e a melhor solução, servindo de base ao anteprojeto, ao termo de referência ou ao projeto básico.', 'C',
    'Certo. Definição do art. 6º, XX, da Lei 14.133. Os elementos do ETP estão no art. 18, § 1º.');
  ce('IN75', F_IN, 'fiscalizacao', cFis, 'É obrigatória a Anotação de Responsabilidade Técnica (ART) para todo contrato, escrito ou verbal, de execução de obras ou prestação de serviços de engenharia.', 'C',
    'Certo. A Lei 6.496/1977 instituiu a ART. A Resolução Confea 1.137/2023 regulamenta o tema.');
  ce('IN76', F_IN, 'fiscalizacao', cFis, 'Pela NR-35, considera-se trabalho em altura toda atividade executada acima de 2,00 m do nível inferior, onde haja risco de queda.', 'C',
    'Certo. A NR-35 exige análise de risco, capacitação, aptidão médica e sistemas de proteção contra quedas.');
  ce('IN77', F_IN, 'fiscalizacao', cFis, 'Com a revisão da NR-18 de 2020, o Programa de Gerenciamento de Riscos (PGR) substituiu o PCMAT nos canteiros de obras.', 'C',
    'Certo. A NR-18 de 2020 alinhou-se à NR-1: o PGR da construção substituiu o PCMAT, com projetos de proteção coletiva elaborados por profissional legalmente habilitado.');
  ce('IN78', F_IN, 'fiscalizacao', cFis, 'Pela NR-18, o sistema de guarda-corpo deve ter travessão superior a 1,20 m de altura, travessão intermediário e rodapé.', 'C',
    'Certo. A NR-18 fixa o travessão superior a 1,20 m, com travessão intermediário e rodapé, ou fechamento por tela, nas periferias e aberturas com risco de queda.');
  ce('IN79', F_IN, 'fiscalizacao', cFis, 'O pagamento ao contratado deve corresponder aos serviços efetivamente executados e medidos, sendo vedado, em regra, o pagamento antecipado.', 'C',
    'Certo. Art. 145 da Lei 14.133: a antecipação só é admitida se representar sensível economia ou condição indispensável, prevista no edital e com garantia.');
  ce('IN80', F_IN, 'fiscalizacao', cFis, 'A Lei nº 14.133/2021 considera inexequíveis, no caso de obras e serviços de engenharia, as propostas com valores inferiores a 75% do valor orçado pela administração.', 'C',
    'Certo. Art. 59, § 4º. O § 5º exige garantia adicional para propostas abaixo de 85% do valor orçado.');

  window.QUESTOES = Q;
})();
