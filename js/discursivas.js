/*
 * Questões discursivas — no edital da Câmara (item 9.2), a prova discursiva dos cargos de Engenheiro tem
 * três questões sobre os conhecimentos específicos, em 3 horas.
 *
 * Cada quesito traz termos-chave usados apenas como apoio à autoavaliação: o treinador marca os
 * termos que aparecem no texto do aluno e sugere uma nota, que o aluno pode ajustar.
 */
window.DISCURSIVAS = [
  {
    id: 'D-TCEPR-2',
    fonte: 'TCE-PR 2016 · Cebraspe · Questão 2',
    tema: 'orcamento',
    linhas: 15,
    texto: 'Os custos de mão de obra respondem por parcela representativa do custo direto e do valor total de orçamentos de construção civil. O Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil (SINAPI) considera que tais custos podem ser divididos em três tipos distintos: remuneração da mão de obra, encargos sociais e encargos complementares.',
    comando: 'Considerando que o fragmento de texto acima tem caráter unicamente motivador, redija um texto dissertativo acerca dos encargos complementares considerados pelo SINAPI.',
    quesitos: [
      { txt: 'Parcelas que compõem os encargos complementares', pts: 1.25,
        chaves: ['alimenta', 'transporte', '\\bepi|equipamento de protecao', 'ferramenta', 'exame', 'seguro de vida|seguro', 'curso|capacita|treinamento'],
        padrao: 'Alimentação (café da manhã, almoço), transporte, equipamentos de proteção individual (EPI), ferramentas manuais, exames médicos obrigatórios (admissional, periódico, demissional), seguro de vida e cursos de capacitação.' },
      { txt: 'Diferença entre encargos sociais e encargos complementares', pts: 1.5,
        chaves: ['\\blei\\b|legisla', 'percentu', 'convenc|acordo coletivo', 'salario|remunera', 'proporciona', 'norma regulamentadora|\\bnr\\b'],
        padrao: 'Encargos sociais são obrigações trabalhistas e previdenciárias fixadas em lei (INSS, FGTS, férias, 13º, aviso prévio etc.), calculadas como percentual sobre a remuneração. Encargos complementares decorrem de convenções e acordos coletivos e de normas regulamentadoras. Não são proporcionais ao salário: são custos por trabalhador, convertidos em valor por hora.' },
      { txt: 'Forma de incidência nas composições do SINAPI', pts: 2.0,
        chaves: ['composic', 'auxiliar', 'hora|r\\$/h|valor por hora', 'categoria|profissional', 'com encargos complementares', 'coeficiente'],
        padrao: 'No SINAPI, os encargos complementares entram por composições auxiliares de mão de obra (por exemplo, "PEDREIRO COM ENCARGOS COMPLEMENTARES"). Essas composições somam ao custo horário do profissional (salário + encargos sociais) os itens complementares, convertidos em R$/h por coeficientes de consumo. As composições de serviço usam essas composições auxiliares, de modo que os encargos complementares chegam ao custo direto proporcionalmente às horas de cada categoria.' }
    ]
  },
  {
    id: 'D-TCEPR-4',
    fonte: 'TCE-PR 2016 · Cebraspe · Questão 4',
    tema: 'hidro',
    linhas: 15,
    texto: 'As atividades humanas que demandam o uso de água normalmente estão associadas à produção de águas residuárias que, quando não tratadas, poluem o solo, contaminam as águas superficiais e subterrâneas e disseminam doenças. Um sistema de esgotos sanitários é um conjunto de obras e instalações destinadas ao transporte, afastamento, tratamento e disposição final das águas residuárias e do material nela contido. (M. von Sperling, com adaptações)',
    comando: 'Considerando que o fragmento de texto acima tem caráter unicamente motivador, descreva, de maneira sucinta, a estrutura básica de um sistema de esgotamento sanitário.',
    quesitos: [
      { txt: 'Coleta e transporte do esgoto', pts: 1.0,
        chaves: ['ligac|ramal predial', 'coletor', 'tronco', 'interceptor', 'emissario', 'elevatoria', 'poco de visita|\\bpv\\b'],
        padrao: 'Ligações prediais lançam o esgoto na rede coletora: coletores secundários, coletores-tronco, interceptores e emissários, com poços de visita, estações elevatórias onde a topografia exige e, quando necessário, sifões invertidos, até a ETE.' },
      { txt: 'Tratamento biológico e lançamento de efluentes', pts: 2.5,
        chaves: ['preliminar|gradeamento|desarenador', 'primario|decant', 'secundario|biologic', 'lodos ativados|lagoa|uasb|filtro biologico|reator', 'materia organica|dbo', 'desinfec|terciario', 'corpo receptor|conama|lancamento'],
        padrao: 'Tratamento preliminar (grades, desarenador e medidor de vazão) remove sólidos grosseiros e areia. O primário (decantação) remove sólidos sedimentáveis. O secundário, biológico, remove matéria orgânica (DBO) por micro-organismos: lodos ativados, filtros biológicos, lagoas de estabilização, reatores anaeróbios UASB. O terciário, quando exigido, remove nutrientes e patógenos (desinfecção). O efluente é lançado no corpo receptor conforme os padrões da Resolução CONAMA 430/2011, compatíveis com a classe do corpo d\'água (CONAMA 357/2005).' },
      { txt: 'Disposição final do lodo', pts: 1.25,
        chaves: ['adensamento', 'estabiliza|digest', 'desaguamento|leito de secagem|centrifug|filtro prensa', 'higieniza', 'aterro', 'agricola|agricultura', 'incinera'],
        padrao: 'O lodo passa por adensamento, estabilização (digestão anaeróbia ou aeróbia), condicionamento, desaguamento (leitos de secagem, centrífugas, filtros-prensa) e, se for o caso, higienização. A disposição final pode ser em aterro sanitário, uso agrícola controlado (biossólido, conforme CONAMA 498/2020), incineração ou recuperação de áreas degradadas.' }
    ]
  },
  {
    id: 'D-TCEPR-1',
    fonte: 'TCE-PR 2016 · Cebraspe · Questão 1 (adaptada à Lei 14.133/2021)',
    tema: 'fiscalizacao',
    linhas: 15,
    texto: 'A Lei nº 14.133/2021 estabelece normas gerais de licitação e contratação para as administrações públicas, aplicáveis às obras e aos serviços de engenharia.',
    comando: 'Redija um texto dissertativo acerca de aspectos técnicos relativos aos procedimentos licitatórios aplicáveis a obras e serviços de engenharia.',
    quesitos: [
      { txt: 'Situações de contratação direta, sem licitação', pts: 1.05,
        chaves: ['dispensa', 'inexigib', 'inviabilidade de competicao|inviavel', 'valor', 'emergencia|calamidade', 'notoria especializacao|exclusiv'],
        padrao: 'Inexigibilidade (art. 74), quando a competição é inviável: fornecedor exclusivo, serviços técnicos especializados de natureza predominantemente intelectual com profissional ou empresa de notória especialização, credenciamento etc. Dispensa (art. 75), quando a lei autoriza: baixo valor (obras e serviços de engenharia até o limite atualizado anualmente, originalmente R$ 100 mil), emergência ou calamidade, licitação deserta ou fracassada, entre outras hipóteses.' },
      { txt: 'Modalidades aplicáveis a obras de engenharia', pts: 1.2,
        chaves: ['concorrencia', 'pregao', 'dialogo competitivo', 'servicos comuns', 'especial', 'valor|limite'],
        padrao: 'A Lei 14.133 extinguiu convite e tomada de preços. As modalidades não dependem mais do valor: concorrência para obras e serviços especiais e também comuns de engenharia; pregão para serviços comuns de engenharia (vedado para obras e serviços especiais); diálogo competitivo em situações de inovação ou complexidade. Concurso e leilão têm outros objetos.' },
      { txt: 'Critério de preços manifestamente inexequíveis', pts: 0.9,
        chaves: ['75', 'orcado|orcamento', 'inexequ', '85|garantia adicional'],
        padrao: 'No caso de obras e serviços de engenharia, são consideradas inexequíveis as propostas com valores inferiores a 75% do valor orçado pela administração (art. 59, § 4º). Propostas abaixo de 85% exigem garantia adicional (§ 5º). A jurisprudência admite que o licitante demonstre a exequibilidade.' },
      { txt: 'Homologação × adjudicação e responsáveis', pts: 1.6,
        chaves: ['adjudica', 'homolog', 'autoridade superior|autoridade competente', 'vencedor', 'legalidade|regularidade', 'agente de contratacao|comissao'],
        padrao: 'Adjudicação atribui o objeto ao licitante vencedor. Homologação é o ato de controle que confirma a regularidade e a legalidade de todo o procedimento e o encerra. Encerradas as fases conduzidas pelo agente de contratação ou pela comissão, o processo vai à autoridade superior, que adjudica o objeto e homologa a licitação (art. 71, IV).' }
    ]
  },
  {
    id: 'D-TREBA',
    fonte: 'TRE-BA 2010 · CESPE · Prova discursiva (adaptada à Lei 14.133/2021)',
    tema: 'fiscalizacao',
    linhas: 30,
    texto: 'Redija um texto dissertativo a respeito do projeto básico, para constituir parte de um manual de orientação para licitações de serviços em engenharia.',
    comando: 'Em seu texto, necessariamente: conceitue projeto básico; descreva os principais aspectos formais a que ele deve obedecer; enumere os elementos constituintes essenciais e comente cada um deles.',
    quesitos: [
      { txt: 'Conceito de projeto básico', pts: 1.5,
        chaves: ['conjunto de elementos', 'nivel de precisao|precisao adequad', 'estudos tecnicos preliminares|etp', 'viabilidade', 'impacto ambiental|tratamento ambiental', 'custo', 'prazo'],
        padrao: 'Conjunto de elementos necessários e suficientes, com nível de precisão adequado, para definir e dimensionar a obra ou o serviço. É elaborado com base nos estudos técnicos preliminares, assegura a viabilidade técnica e o adequado tratamento ambiental e permite avaliar o custo e definir métodos e prazo de execução (Lei 14.133, art. 6º, XXV).' },
      { txt: 'Aspectos formais', pts: 1.5,
        chaves: ['\\bart\\b|anotacao de responsabilidade', 'profissional habilitado', 'aprova', 'antes da licitacao|previo|anteceder', 'anexo ao edital|edital', 'norma|abnt'],
        padrao: 'É elaborado por profissional legalmente habilitado, com ART ou RRT, segundo as normas técnicas (ABNT) e a Resolução Confea 361/1991. Precisa ser aprovado pela autoridade competente antes da licitação e integrar o edital. Na contratação integrada é substituído pelo anteprojeto.' },
      { txt: 'Elementos constituintes e comentários', pts: 2.0,
        chaves: ['solucao escolhida|desenvolvimento da solucao', 'solucoes tecnicas globais|localizadas', 'materiais e equipamentos|tipos de servicos', 'metodos construtivos|instalacoes provisorias', 'gestao da obra|programacao|suprimento|fiscalizacao', 'orcamento detalhado|quantitativos'],
        padrao: 'a) desenvolvimento da solução escolhida, com visão global da obra; b) soluções técnicas globais e localizadas, detalhadas para minimizar reformulações; c) identificação dos tipos de serviços, materiais e equipamentos e de suas especificações; d) informações sobre métodos construtivos, instalações provisórias e condições organizacionais; e) subsídios para montar o plano de gestão da obra (programação, suprimentos, transporte, fiscalização); f) orçamento detalhado do custo global, baseado em quantitativos de serviços e fornecimentos.' }
    ]
  },
  {
    id: 'D-TCEPR-P',
    fonte: 'TCE-PR 2016 · Cebraspe · Parecer (adaptado)',
    tema: 'orcamento',
    linhas: 20,
    texto: 'Auditoria em obra pública constatou que, embora o edital exigisse orçamento analítico das propostas, a comissão aceitou apenas o orçamento sintético. Na comparação do BDI do orçamento de referência com o da proposta vencedora, houve divergência na composição e no percentual: os itens "riscos e eventuais" e "despesas financeiras" da proposta estavam acima dos do orçamento de referência.',
    comando: 'Na qualidade de analista, redija texto que aborde: o conceito e as parcelas do BDI; os itens que não devem compor o BDI; a importância do orçamento analítico (composições de custos unitários) para a análise das propostas.',
    quesitos: [
      { txt: 'Conceito e parcelas do BDI', pts: 1.75,
        chaves: ['bonificac', 'despesas indiretas', 'administracao central', 'seguro|garantia', 'risco', 'despesas financeiras', 'lucro', 'tributo|\\bpis\\b|cofins|\\biss\\b'],
        padrao: 'BDI (Benefícios e Despesas Indiretas) é a taxa aplicada sobre o custo direto para obter o preço de venda. Cobre administração central, seguros e garantias, riscos, despesas financeiras, lucro e tributos sobre o faturamento (PIS, COFINS, ISS e CPRB, se houver), conforme a fórmula do Acórdão TCU 2.622/2013, que também fixa faixas referenciais por tipo de obra.' },
      { txt: 'Itens que não devem compor o BDI', pts: 1.25,
        chaves: ['administracao local', 'mobiliza', 'canteiro', 'irpj', 'csll', 'custo direto'],
        padrao: 'Administração local, instalação e manutenção do canteiro e mobilização/desmobilização são mensuráveis e devem ser custo direto. IRPJ e CSLL, tributos sobre o lucro, não podem ser repassados ao contratante pelo BDI (Súmula TCU 254).' },
      { txt: 'Importância do orçamento analítico', pts: 1.75,
        chaves: ['composic', 'preco unitario|precos unitarios', 'sobrepreco|superfaturamento', 'jogo de planilha|aditivo', 'criterio de aceitabilidade', 'comparar|referencia'],
        padrao: 'O orçamento analítico (composições de custos unitários e detalhamento do BDI) permite verificar a aceitabilidade dos preços unitários e global, identificar sobrepreço em itens específicos e prevenir o "jogo de planilha" em aditivos. Também é a base para negociar e reequilibrar o contrato. Dispensá-lo contrariou o edital (vinculação ao instrumento convocatório) e impediu a análise das divergências do BDI. Riscos e despesas financeiras acima da referência devem ser justificados ou ajustados.' }
    ]
  },
  {
    id: 'D-IN-CORROSAO',
    fonte: 'Inédita · estilo Cebraspe',
    tema: 'manutencao',
    linhas: 20,
    texto: 'Em vistoria a um edifício administrativo com 30 anos de uso, foram observadas, em vigas e pilares da garagem, fissuras paralelas às armaduras, manchas avermelhadas e desplacamento do cobrimento, com barras expostas.',
    comando: 'Redija um texto dissertativo sobre o caso. Aborde: os mecanismos de despassivação das armaduras; os ensaios e procedimentos de diagnóstico; as etapas de recuperação das peças afetadas.',
    quesitos: [
      { txt: 'Mecanismos de despassivação', pts: 1.75,
        chaves: ['carbonata', 'cloreto', '\\bph\\b', 'pelicula passiva|passivac', 'co2|gas carbonico', 'umidade|oxigenio', 'cobrimento'],
        padrao: 'O aço fica protegido pela película passivadora formada no meio alcalino do concreto (pH em torno de 12,5). Ela se rompe por carbonatação (o CO₂ reage com o Ca(OH)₂ e o pH cai abaixo de cerca de 9) ou pela presença de cloretos acima do teor crítico. Com umidade e oxigênio, a corrosão avança; os produtos expansivos fissuram e destacam o cobrimento. Cobrimento insuficiente, alta relação a/c e fissuras aceleram o processo.' },
      { txt: 'Diagnóstico', pts: 1.5,
        chaves: ['fenolftaleina', 'cloretos|teor de cloreto', 'potencial de corrosao|eletroquimic', 'pacometro|cobrimento', 'esclerometr|extracao de testemunho', 'mapeamento|inspecao visual'],
        padrao: 'Inspeção visual e mapeamento de manifestações; medição da profundidade de carbonatação com fenolftaleína (incolor = carbonatado); determinação do teor de cloretos; pacômetro para cobrimento e posição das barras; potencial de corrosão e resistividade; perda de seção das barras; extração de testemunhos e esclerometria para avaliar a resistência do concreto.' },
      { txt: 'Etapas de recuperação', pts: 1.5,
        chaves: ['escoramento', 'remo|apicoa|delimita', 'limpeza|jateamento|escova', 'reposic|complementa|seção', 'inibidor|protecao da armadura|primer', 'argamassa de reparo|graute|polimer', 'cura', 'protecao superficial|pintura protetora'],
        padrao: 'Escorar, se necessário; delimitar e remover o concreto deteriorado, ultrapassando as barras em cerca de 2 cm; limpar as armaduras (escovação ou jateamento) e complementar a seção perdida; aplicar proteção (primer rico em zinco ou inibidor) e ponte de aderência; reconstituir o cobrimento com argamassa ou graute de reparo; curar; aplicar proteção superficial (hidrofugante ou pintura anticarbonatação). Por fim, incluir as peças no plano de manutenção (NBR 5674).' }
    ]
  },
  {
    id: 'D-IN-MANUTENCAO',
    fonte: 'Inédita · estilo Cebraspe',
    tema: 'manutencao',
    linhas: 20,
    texto: 'A administração de um edifício legislativo pretende estruturar o sistema de gestão da manutenção predial, hoje restrito ao atendimento de chamados.',
    comando: 'Com base nas normas técnicas pertinentes, discorra sobre: os tipos de manutenção e suas características; os documentos e registros do sistema de manutenção; o papel da inspeção predial.',
    quesitos: [
      { txt: 'Tipos de manutenção', pts: 1.5,
        chaves: ['rotineira', 'corretiva', 'preventiva', 'imediata', 'programa|antecedencia', 'nbr 5674'],
        padrao: 'A NBR 5674 classifica a manutenção em rotineira (fluxo constante de serviços padronizados e cíclicos, como limpeza); corretiva (serviços que exigem ação ou intervenção imediata para permitir a continuidade do uso ou evitar riscos ou prejuízos); e preventiva (programada com antecedência, conforme solicitações dos usuários, estimativas de durabilidade e relatórios de inspeção). A preditiva, por monitoramento de condição, é complemento usual.' },
      { txt: 'Documentação do sistema', pts: 1.75,
        chaves: ['manual|nbr 14037', 'programa de manutencao', 'cronograma|periodicidade', 'registro', 'checklist|lista de verificacao', 'orcamento|previsao orcamentaria', 'indicador'],
        padrao: 'Manual de uso, operação e manutenção (NBR 14037); programa de manutenção com sistemas, atividades, periodicidade e responsáveis; previsão orçamentária; listas de verificação; registros das intervenções (ordens de serviço, relatórios, notas fiscais, garantias), para rastreabilidade; indicadores de desempenho. O conjunto documental integra o sistema de gestão da manutenção.' },
      { txt: 'Inspeção predial', pts: 1.5,
        chaves: ['nbr 16747', 'sensorial|vistoria', 'anomalia|falha', 'prioridade|urgencia', 'desempenho', 'recomenda'],
        padrao: 'A inspeção predial (NBR 16747) é avaliação predominantemente sensorial das condições técnicas, de uso, de operação e de manutenção da edificação. Identifica anomalias (construtivas) e falhas (de uso ou manutenção), avalia riscos e organiza as recomendações por prioridade. Seu resultado realimenta o programa de manutenção preventiva e corretiva e preserva o desempenho ao longo da vida útil (NBR 15575).' }
    ]
  },
  {
    id: 'D-IN-CONCRETO',
    fonte: 'Inédita · estilo Cebraspe',
    tema: 'materiais',
    linhas: 20,
    texto: 'Na fiscalização de uma obra de edificação, o engenheiro é responsável pelo recebimento e pelo controle tecnológico do concreto usinado fornecido para a estrutura (fck = 30 MPa).',
    comando: 'Redija um texto dissertativo que aborde: os procedimentos de recebimento do caminhão-betoneira na obra; a moldagem, a cura e o ensaio dos corpos de prova; os critérios de aceitação do concreto e as medidas em caso de não conformidade.',
    quesitos: [
      { txt: 'Recebimento na obra', pts: 1.5,
        chaves: ['nota fiscal|documento de entrega', 'horario|tempo de transporte|90|150', 'abatimento|slump', 'agua|adicao de agua', 'fck|classe|especificacao', 'lacre|volume'],
        padrao: 'Conferir o documento de entrega (classe, fck, abatimento, a/c, volume, horário de saída da central); verificar os tempos da NBR 7212 (90 min até a entrega e descarga concluída em até 150 min); fazer o abatimento do tronco de cone (NBR 16889) antes da descarga e recusar o caminhão fora da tolerância; não admitir adição de água além da prevista na dosagem.' },
      { txt: 'Moldagem, cura e ensaio', pts: 1.5,
        chaves: ['nbr 5738|moldagem', 'nbr 5739|compressao', 'corpo de prova|\\bcps?\\b', 'cura', '28 dias', 'exemplar|dois corpos', 'identifica|rastreab'],
        padrao: 'Coletar amostras do terço médio da descarga e moldar corpos de prova cilíndricos (NBR 5738), em pares (cada exemplar = 2 CPs da mesma betonada, valendo o maior valor). Deixar a cura inicial em local protegido e depois a cura úmida ou submersa em laboratório. Romper à compressão (NBR 5739), em geral aos 28 dias, e mapear cada caminhão aos elementos concretados para rastreabilidade.' },
      { txt: 'Aceitação e não conformidade', pts: 1.75,
        chaves: ['nbr 12655', 'fck,est|fck estimado|estimativa', 'lote', 'amostragem total|parcial', 'testemunho|extra', 'verificacao estrutural|projetista', 'reforco'],
        padrao: 'Pela NBR 12655, dividir a estrutura em lotes e calcular o fck,est por amostragem parcial ou total. O lote é aceito se fck,est ≥ fck. Se não for, extrair testemunhos (NBR 7680), reavaliar a segurança com o projetista (com as resistências reais) e, se preciso, reforçar ou demolir. Registrar a não conformidade e aplicar as sanções contratuais ao fornecedor.' }
    ]
  },
  {
    id: 'D-IN-FUNDACOES',
    fonte: 'Inédita · estilo Cebraspe',
    tema: 'fundacoes',
    linhas: 20,
    texto: 'Para o projeto de um anexo de seis pavimentos, foram realizadas sondagens à percussão (SPT), que indicaram camada de argila mole até 8 m de profundidade, seguida de areia compacta, com nível d\'água a 2 m da superfície.',
    comando: 'Redija um texto dissertativo que aborde: o procedimento do ensaio SPT e as informações que ele fornece; a escolha do tipo de fundação para o caso, com justificativa; os cuidados executivos e de controle da fundação escolhida.',
    quesitos: [
      { txt: 'Ensaio SPT', pts: 1.5,
        chaves: ['65 kg|65kg', '75 cm|75cm', '30 cm|30cm|ultimos 30', 'amostrador', 'nivel d.agua|lencol', 'perfil|estratigraf', 'nbr 6484'],
        padrao: 'O SPT (NBR 6484) crava um amostrador padrão com martelo de 65 kg em queda livre de 75 cm. O índice N é o número de golpes para os 30 cm finais de 45 cm de penetração, medido a cada metro. Fornece o perfil estratigráfico, amostras deformadas para classificação tátil-visual, a compacidade ou consistência das camadas e a posição do nível d\'água.' },
      { txt: 'Escolha da fundação', pts: 1.75,
        chaves: ['profunda', 'estaca', 'areia compacta|camada resistente', 'argila mole', 'atrito negativo', 'recalque', 'helice|pre-moldada|raiz'],
        padrao: 'Fundação rasa (sapatas ou radier) é inadequada: a argila mole tem baixa capacidade de carga e produziria grandes recalques. Indica-se fundação profunda em estacas apoiadas na areia compacta, como hélice contínua monitorada, pré-moldadas de concreto ou metálicas, considerando o atrito negativo se houver aterro ou rebaixamento do lençol sobre a argila mole.' },
      { txt: 'Cuidados executivos e controle', pts: 1.5,
        chaves: ['prova de carga', 'nega|repique', 'carregamento dinamico|\\bpda\\b', 'monitora', 'integridade|\\bpit\\b', 'locacao|desaprumo', 'concretagem'],
        padrao: 'Locar as estacas e controlar o desaprumo. Nas cravadas, controlar nega e repique. Na hélice contínua, monitorar eletronicamente profundidade, pressão e volume de concreto. Fazer ensaios de integridade (PIT), de carregamento dinâmico (PDA) e provas de carga estática conforme a NBR 6122. Prever cuidados com o lençol freático e o arrasamento das cabeças.' }
    ]
  },
  {
    id: 'D-IN-IMPERM',
    fonte: 'Inédita · estilo Cebraspe',
    tema: 'manutencao',
    linhas: 20,
    texto: 'Uma laje de cobertura plana de um edifício público apresenta infiltrações recorrentes, e a administração decidiu refazer integralmente o sistema de impermeabilização.',
    comando: 'Redija um texto dissertativo que aborde: a escolha do tipo de sistema de impermeabilização (rígido ou flexível) para a situação; a sequência de camadas e os detalhes construtivos críticos; os ensaios e verificações para recebimento do serviço.',
    quesitos: [
      { txt: 'Escolha do sistema', pts: 1.25,
        chaves: ['flexivel', 'rigido', 'movimenta|dilatacao|variacao termica', 'manta asfaltica|membrana', 'nbr 9575', 'exposta|protecao'],
        padrao: 'A laje de cobertura sofre variações térmicas e movimentações e pede sistema flexível (mantas asfálticas, membranas acrílicas, poliuretânicas ou asfálticas), conforme a NBR 9575. Sistemas rígidos (argamassas impermeáveis, cristalizantes) servem a estruturas sem movimentação, como subsolos e reservatórios enterrados.' },
      { txt: 'Camadas e detalhes', pts: 2.0,
        chaves: ['regulariza', 'caimento|declividade|1%', 'primer|imprimacao', 'camada separadora|amortecedora', 'protecao mecanica', 'rodape|30 cm|platibanda', 'ralo', 'junta|meia-cana|arredond'],
        padrao: 'Remover o sistema antigo e limpar o substrato; executar regularização com caimento mínimo de 1% para os ralos e cantos arredondados (meia-cana); aplicar imprimação (primer) e a manta com sobreposições de cerca de 10 cm; subir a impermeabilização nos rodapés e platibandas (cerca de 30 cm acima do piso acabado, com encaixe ou rufo); reforçar ralos, tubos passantes e juntas; aplicar camada separadora e proteção mecânica (ou manta autoprotegida).' },
      { txt: 'Ensaios e recebimento', pts: 1.5,
        chaves: ['estanqueidade', '72 h|72 horas', 'lamina d.agua', 'aderencia', 'sobreposic', 'garantia|nbr 9574'],
        padrao: 'Inspecionar sobreposições, aderência e acabamento dos detalhes. Fazer teste de estanqueidade com lâmina d\'água por no mínimo 72 h antes da proteção mecânica (NBR 9574), conferindo a face inferior da laje. Registrar o ensaio e exigir os certificados dos materiais e a garantia do serviço.' }
    ]
  }
];
