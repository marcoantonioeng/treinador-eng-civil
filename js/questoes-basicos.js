/*
 * Conhecimentos Básicos — reforço (edital, item 14.2.3)
 *
 * 1) 37 itens das provas anexadas ao treinador, com gabarito definitivo oficial:
 *    Câmara dos Deputados 2003 (CESPE), TRE-BA 2010 (CESPE), TJRO 2012 (CESPE) e TCE-PR 2016 (Cebraspe).
 *    Ficaram de fora os itens presos a telas de programas antigos, os de licitação pela Lei 8.666 e os que
 *    mudaram de resposta com a jurisprudência atual.
 * 2) 100 itens inéditos no estilo Cebraspe sobre os tópicos do edital que as provas anexadas não cobrem:
 *    Regimento Interno da Câmara, Regimento Comum, Lei 9.784, improbidade, governança, LAI, LGPD,
 *    Microsoft 365, inteligência artificial e dados/visualização. Gabarito e justificativa são do autor do
 *    treinador, com base no texto legal; não são gabaritos oficiais.
 */
(function () {
  var Q = window.QUESTOES;
  function ce(id, fonte, tema, ctx, enun, gab, just) {
    Q.push({ id: id, fonte: fonte, tema: tema, tipo: 'CE', contexto: ctx || '', enunciado: enun, gabarito: gab, justificativa: just, figura: null });
  }
  function me(id, fonte, tema, enun, opcoes, gab, just) {
    Q.push({ id: id, fonte: fonte, tema: tema, tipo: 'ME', contexto: '', enunciado: enun, opcoes: opcoes, gabarito: gab, justificativa: just, figura: null });
  }

  /* ===================== CÂMARA DOS DEPUTADOS 2003 · 1.ª parte ===================== */
  var F_CDB = 'Câmara dos Deputados 2003 · CESPE · item ';
  var cCdConst = 'Acerca do direito constitucional, julgue o item a seguir.';
  ce('CDB71', F_CDB + '71', 'constitucional', cCdConst, 'A Constituição da República determina expressamente que os candidatos aprovados em um concurso público têm direito a ser nomeados durante o prazo de validade do concurso.', 'E',
    'Errado. O texto constitucional não traz essa garantia expressa. O art. 37, IV, assegura apenas a prioridade do aprovado sobre novos concursados durante o prazo improrrogável do edital. O direito subjetivo à nomeação do aprovado dentro do número de vagas foi reconhecido depois pela jurisprudência do STF (RE 598.099), não pela letra da Constituição.');
  ce('CDB72', F_CDB + '72', 'constitucional', cCdConst, 'Seria inválido um dispositivo de lei federal que determinasse que 20% dos cargos em comissão existentes em cada órgão da administração federal direta deveriam ser ocupados por servidores de carreira, pois esse dispositivo violaria a regra constitucional que define que os cargos em comissão são de livre nomeação.', 'E',
    'Errado. O art. 37, V, da Constituição manda que os cargos em comissão sejam preenchidos por servidores de carreira nos casos, condições e percentuais mínimos previstos em lei. A lei que fixa esse percentual cumpre a Constituição.');
  ce('CDB73', F_CDB + '73', 'constitucional', cCdConst, 'Violaria a Constituição da República uma lei que permitisse que os ocupantes dos cargos da carreira de analista legislativo da Câmara dos Deputados fossem remunerados mediante subsídio, pois esse tipo de remuneração é reservado apenas aos ocupantes de cargos eletivos.', 'E',
    'Errado. O subsídio é obrigatório para membros de Poder, detentores de mandato eletivo, ministros e secretários (art. 39, § 4.º), mas a remuneração dos servidores organizados em carreira também pode ser fixada por subsídio, nos termos do art. 39, § 8.º.');
  ce('CDB74', F_CDB + '74', 'constitucional', cCdConst, 'Seria inconstitucional uma lei que determinasse que, no serviço público, a remuneração do serviço extraordinário fosse apenas 30% superior à do serviço normal.', 'C',
    'Certo. O art. 7.º, XVI, aplicado aos servidores pelo art. 39, § 3.º, garante remuneração do serviço extraordinário superior, no mínimo, em 50% à do normal. Uma lei que fixasse 30% violaria esse piso.');

  var cCdRenato = 'Considerando que Renato ocupa, na Câmara dos Deputados, cargo público de analista legislativo — atribuição arquiteto —, julgue o item.';
  ce('CDB75', F_CDB + '75', 'administrativo', cCdRenato, 'No exercício de suas atividades funcionais, é lícito que Renato pratique atos não permitidos pela legislação, desde que a legislação tampouco os proíba.', 'E',
    'Errado. Pelo princípio da legalidade (art. 37 da Constituição), o agente público só pode fazer o que a lei autoriza. A lógica de "o que não é proibido é permitido" vale para o particular, não para a Administração.');
  ce('CDB76', F_CDB + '76', 'administrativo', cCdRenato, 'É lícito que Renato acumule seu cargo na Câmara dos Deputados com um cargo de professor de arquitetura em uma universidade pública federal, desde que haja compatibilidade de horários.', 'C',
    'Certo. O art. 37, XVI, b, da Constituição permite acumular um cargo de professor com outro técnico ou científico, havendo compatibilidade de horários. O cargo de analista legislativo com atribuição de arquiteto é técnico.');
  ce('CDB77', F_CDB + '77', 'administrativo', cCdRenato, 'É ilícito que Renato acumule seu cargo de analista legislativo com uma função pública de natureza técnica em uma autarquia federal, mesmo que haja compatibilidade de horários.', 'C',
    'Certo. Dois cargos ou funções técnicos não estão entre as exceções do art. 37, XVI. A vedação se estende a empregos e funções na administração indireta, inclusive autarquias (art. 37, XVII).');
  ce('CDB78', F_CDB + '78', 'administrativo', cCdRenato, 'É vedado a Renato participar da gerência de uma empresa privada.', 'C',
    'Certo. O art. 117, X, da Lei 8.112/1990 proíbe ao servidor participar de gerência ou administração de sociedade privada, salvo como acionista, cotista ou comanditário. As exceções legais (conselhos de empresas com participação da União, licença para tratar de interesses particulares) não se aplicam à situação descrita.');

  var cCd8112 = 'Com relação ao regime jurídico dos servidores públicos federais, julgue o item.';
  ce('CDB79', F_CDB + '79', 'administrativo', cCd8112, 'Nos casos de provimento de cargo efetivo mediante nomeação, a investidura no cargo dá-se mediante a assinatura do termo de posse.', 'C',
    'Certo. A investidura ocorre com a posse (art. 7.º da Lei 8.112/1990), e a posse se dá pela assinatura do respectivo termo (art. 13).');
  ce('CDB80', F_CDB + '80', 'administrativo', cCd8112, 'O servidor ocupante de cargo efetivo somente pode exercer funções de direção, chefia e assessoramento após findo o estágio probatório.', 'E',
    'Errado. O art. 20, § 3.º, da Lei 8.112/1990 permite ao servidor em estágio probatório exercer cargos em comissão e funções de direção, chefia ou assessoramento no órgão de lotação.');
  ce('CDB81', F_CDB + '81', 'administrativo', cCd8112, 'Se um servidor for devidamente investido em cargo de provimento efetivo, mas não entrar em exercício no prazo definido em lei, a autoridade competente não deverá exonerar de ofício o servidor, mas anular a sua nomeação.', 'E',
    'Errado. Quem tomou posse e não entra em exercício no prazo legal é exonerado (art. 15, § 2.º, da Lei 8.112/1990). Tornar sem efeito a nomeação é a consequência para quem não toma posse no prazo (art. 13, § 6.º).');
  ce('CDB83', F_CDB + '83', 'administrativo', cCd8112, 'O servidor público inativo tem direito a perceber gratificação natalina, bem como a receber quantia equivalente ao adicional de férias devido aos servidores ativos.', 'E',
    'Errado. O aposentado recebe a gratificação natalina com base nos proventos, mas não tem férias e, por isso, não recebe o adicional de um terço, que remunera o período de descanso do servidor em atividade.');
  ce('CDB84', F_CDB + '84', 'administrativo', cCd8112, 'Bernardo é um servidor público federal que exerce suas atividades em Salvador e que foi recentemente nomeado, em decorrência de aprovação em concurso público, para o cargo efetivo de analista legislativo da Câmara dos Deputados, para exercer atividades em Brasília – DF. Nessa situação, se Bernardo vier a ser investido no cargo de analista legislativo, ele terá direito a receber ajuda de custo para compensar as despesas decorrentes de sua mudança de Salvador para Brasília.', 'E',
    'Errado. A ajuda de custo compensa despesas de instalação do servidor que, no interesse do serviço, passa a ter exercício em nova sede (art. 53 da Lei 8.112/1990). A posse em novo cargo por aprovação em concurso é iniciativa do próprio candidato, não deslocamento no interesse da Administração.');
  ce('CDB85', F_CDB + '85', 'administrativo', cCd8112, 'Acusado da prática de um ato que caracteriza simultaneamente crime e infração administrativa, Rafael foi processado nessas duas instâncias. Na esfera administrativa, ele foi considerado culpado e demitido. Posteriormente, foi absolvido na esfera criminal por ausência de provas suficientes para a condenação. Nessa situação, a autoridade competente deverá anular a demissão de Rafael, pois a absolvição penal afasta a responsabilidade administrativa.', 'E',
    'Errado. As instâncias são independentes. A responsabilidade administrativa só é afastada pela absolvição criminal que negue a existência do fato ou a autoria (art. 126 da Lei 8.112/1990). Absolvição por falta de provas não repercute na esfera administrativa.');

  var cCdPoderes = 'A respeito da organização dos poderes, julgue o item.';
  ce('CDB87', F_CDB + '87', 'constitucional', cCdPoderes, 'Enquanto os senadores são eleitos segundo o princípio majoritário, os deputados são eleitos pelo sistema proporcional.', 'C',
    'Certo. Art. 45 (Câmara, sistema proporcional) e art. 46 (Senado, princípio majoritário) da Constituição.');
  ce('CDB88', F_CDB + '88', 'constitucional', cCdPoderes, 'Se, na eleição para presidente da República, a maioria dos eleitores votar em branco, a eleição será considerada nula e nenhum dos candidatos será eleito.', 'E',
    'Errado. Pelo art. 77, § 2.º, é eleito o candidato que obtiver a maioria absoluta dos votos, não computados os em branco e os nulos. Votos em branco não anulam a eleição.');
  ce('CDB89', F_CDB + '89', 'constitucional', cCdPoderes, 'Salvo disposição em contrário, as deliberações da Câmara dos Deputados devem ser tomadas pelo voto da maioria absoluta de seus membros.', 'E',
    'Errado. Salvo disposição constitucional em contrário, as deliberações de cada Casa são tomadas por maioria dos votos, presente a maioria absoluta de seus membros (art. 47). Maioria absoluta é o quórum de presença, não o de aprovação.');
  ce('CDB90', F_CDB + '90', 'constitucional', cCdPoderes, 'Por ser um ato interno do Poder Executivo, a fusão de dois ministérios pode ser realizada por ato do presidente da República, sendo desnecessário que seja aprovada pelo Congresso Nacional.', 'E',
    'Errado. A criação e a extinção de ministérios dependem de lei (art. 48, XI, e art. 88). O decreto autônomo do art. 84, VI, a, só alcança a organização da administração federal quando não implicar aumento de despesa nem criação ou extinção de órgãos públicos.');
  ce('CDB92', F_CDB + '92', 'constitucional', cCdPoderes, 'O Tribunal de Contas da União e as câmaras de arbitragem são órgãos do Poder Judiciário.', 'E',
    'Errado. O TCU auxilia o Congresso Nacional no controle externo (art. 71) e não integra o Judiciário. Câmaras de arbitragem são entidades privadas. Os órgãos do Judiciário estão listados no art. 92.');
  ce('CDB93', F_CDB + '93', 'constitucional', cCdPoderes, 'Caso o presidente e o vice-presidente da República encontrem-se simultaneamente impedidos de exercer as suas funções, deverá exercer a presidência da República o presidente da Câmara dos Deputados.', 'C',
    'Certo. Pelo art. 80, a ordem de substituição é: presidente da Câmara, presidente do Senado e presidente do STF.');

  ce('CDB69', F_CDB + '69', 'ti', 'Considere uma planilha do Excel com valores numéricos nas células de B3 a B9 e de C3 a C9 e julgue o item.', 'Para se obter a soma total dos conteúdos das células de B3 a B9 e de C3 a C9 e pôr o resultado na célula C10, é suficiente clicar a célula C10, digitar =SOMA(B3:B9;C3:C9) e teclar Enter.', 'C',
    'Certo. A função SOMA aceita vários intervalos separados por ponto e vírgula (separador de argumentos na versão em português). O resultado é a soma de todos os valores dos dois intervalos.');

  /* ===================== TRE-BA 2010 · Conhecimentos Básicos (parte I) ===================== */
  var F_TREB = 'TRE-BA 2010 · CESPE · item ';
  ce('TREB21', F_TREB + '21', 'ti', 'Com relação aos aplicativos do Microsoft Office, julgue o item.', 'No Microsoft Word, os botões Desfazer e Refazer permitem, respectivamente, desfazer uma ação indesejada e refazer uma ação desfeita. Esses efeitos também podem ser obtidos por meio das combinações de teclas Ctrl + Z e Ctrl + R, respectivamente.', 'C',
    'Certo. Na versão em português do Word, Ctrl + Z desfaz e Ctrl + R refaz (ou repete) a última ação. Na versão em inglês, o atalho de refazer é Ctrl + Y.');
  ce('TREB22', F_TREB + '22', 'ti', 'Com relação aos aplicativos do Microsoft Office, julgue o item.', 'Para se inserir dados em uma planilha do Microsoft Excel, deve-se, inicialmente, selecionar a célula onde os dados serão inseridos. Esse procedimento pode ser realizado com o uso do mouse, posicionando o cursor na célula desejada, ou a partir das setas do teclado, ou teclando Enter, para, em seguida, se digitar os dados na célula e, por fim, confirmar a operação com Enter.', 'C',
    'Certo. A célula ativa pode ser escolhida com o mouse, com as setas ou com Enter, que desloca a seleção para a célula seguinte. O conteúdo digitado é confirmado com Enter.');
  var cTrebNet = 'Acerca de navegação, correio eletrônico e uso seguro das tecnologias de informação e comunicação, julgue o item.';
  ce('TREB24', F_TREB + '24', 'ti', cTrebNet, 'A caixa postal de correio eletrônico é um diretório criado no servidor de e-mail, o qual fica localizado no computador do usuário. Ao ser ligada a máquina, esse servidor recebe da Internet, via provedor de acesso, as mensagens que foram enviadas para o endereço do usuário.', 'E',
    'Errado. A caixa postal fica no servidor de e-mail do provedor, que recebe as mensagens continuamente, esteja o computador do usuário ligado ou não. O usuário acessa a caixa pelo webmail ou baixa e sincroniza as mensagens com um cliente de e-mail (POP3 ou IMAP).');
  ce('TREB26', F_TREB + '26', 'ti', cTrebNet, 'No acesso à Internet por meio de uma linha digital assimétrica de assinante (ADSL), a conexão é feita usando-se uma linha de telefone ligada a um modem e os dados trafegam em alta velocidade.', 'C',
    'Certo. O ADSL usa a linha telefônica comum, com modem, e oferece banda larga. É assimétrico porque a velocidade de recebimento (download) é maior que a de envio (upload).');
  ce('TREB27', F_TREB + '27', 'ti', cTrebNet, 'Firewall é um recurso utilizado para a segurança tanto de estações de trabalho como de servidores ou de toda uma rede de comunicação de dados. Esse recurso possibilita o bloqueio de acessos indevidos a partir de regras preestabelecidas.', 'C',
    'Certo. O firewall, em software ou em equipamento, filtra o tráfego entre redes ou para um computador conforme regras definidas, bloqueando acessos não autorizados.');
  ce('TREB28', F_TREB + '28', 'ti', cTrebNet, 'Confidencialidade, disponibilidade e integridade da informação são princípios básicos que orientam a definição de políticas de uso dos ambientes computacionais. Esses princípios são aplicados exclusivamente às tecnologias de informação, pois não podem ser seguidos por seres humanos.', 'E',
    'Errado. A primeira parte está correta, mas esses princípios valem para a informação em qualquer meio e orientam também o comportamento das pessoas, como o sigilo de senhas e o cuidado com documentos impressos.');

  /* ===================== TJRO 2012 · Conhecimentos Básicos ===================== */
  var F_TJB = 'TJRO 2012 · CESPE · questão ';
  me('TJB14', F_TJB + '14', 'ti', 'Redes de computadores modernas utilizam a pilha de protocolos TCP/IP para acesso à Internet. Assinale a opção em que os protocolos apresentados são todos da camada de aplicação do TCP/IP.', {
    A: 'TCP e IMAP', B: 'UDP e SMTP', C: 'IMAP e SMTP', D: 'UDP e SNMP', E: 'IP e SNMP'
  }, 'C', 'C. IMAP (acesso às mensagens) e SMTP (envio de e-mail) são protocolos de aplicação. TCP e UDP são da camada de transporte, e IP é da camada de rede (internet). SNMP também é de aplicação, mas aparece em D e E ao lado de UDP e IP.');
  me('TJB15', F_TJB + '15', 'ti', 'No que se refere ao programa de correio eletrônico Mozilla Thunderbird, assinale a opção correta.', {
    A: 'O Thunderbird utiliza a linguagem XML para a estruturação de mensagens de email, em vez da tradicional linguagem HTML, o que permite, entre outros recursos, o envio de vídeo no corpo de uma mensagem de email.',
    B: 'No Thunderbird, o usuário pode criar filtros personalizados para que mensagens recebidas indesejadas sejam excluídas automaticamente. Entre os critérios que podem ser utilizados na definição dos referidos filtros, inclui-se a origem da mensagem indesejada.',
    C: 'No Thunderbird, quando a funcionalidade de identificação de spam está ativada, o computador no qual o programa está em execução fica, automaticamente, protegido contra os vírus de computador e outros aplicativos maliciosos distribuídos através da Internet.',
    D: 'É padrão do Thunderbird proteger, com criptografia, toda a caixa de entrada do usuário, o que impede que pessoas não autorizadas tenham acesso ao conteúdo das informações armazenadas na referida caixa.',
    E: 'O Thunderbird utiliza um protocolo de envio de email exclusivo que impede, automaticamente, que as mensagens enviadas sofram riscos de quebra de privacidade e de segurança durante o percurso na rede, entre o remetente e o destinatário da mensagem.'
  }, 'B', 'B. Filtros de mensagens permitem mover, marcar ou excluir mensagens conforme critérios como remetente, assunto ou conteúdo. C: filtro de spam não é antivírus. D: a caixa de entrada não é criptografada por padrão. E: o envio usa SMTP, protocolo padrão, não exclusivo. Os mesmos conceitos valem para o Outlook do Microsoft 365, que tem regras de caixa de entrada equivalentes.');
  me('TJB16', F_TJB + '16', 'ti', 'Em uma planilha do Microsoft Excel, as células de B2 a B4 contêm valores numéricos, e deseja-se que a célula B5 exiba a soma desses três valores. A operação que, digitada em B5, produz corretamente esse resultado é (questão adaptada: o original trazia a figura da planilha)', {
    A: 'ADICIONAR(B2,B3,B4)', B: '=SOMA(B2:B4)', C: 'B2+B3+B4', D: '=[B2+B4]', E: '+<B2,B3,B4>'
  }, 'B', 'B. Fórmulas começam com sinal de igual, e SOMA com o intervalo B2:B4 soma as três células. Em C, sem o "=", o Excel trata o conteúdo como texto. ADICIONAR não é função do Excel, e colchetes e sinais de menor/maior não delimitam argumentos.');

  /* ===================== TCE-PR 2016 · Conhecimentos Básicos ===================== */
  var F_TCEB = 'TCE-PR 2016 · Cebraspe · questão ';
  me('TCEB05', F_TCEB + '5', 'administrativo', 'Um agente de determinada autarquia estadual, em fiscalização de rotina, autuou estabelecimento comercial em razão de infração administrativa verificada. Procedeu ainda, naquela mesma ocasião, à interdição cautelar do estabelecimento em questão. Acerca dessa situação hipotética, do poder de polícia e da disciplina dos atos administrativos, assinale a opção correta.', {
    A: 'Os atos administrativos praticados são dotados de presunção de veracidade e legitimidade, bem como de presunção absoluta de conformidade à lei.',
    B: 'Se, na situação hipotética em questão, o administrador público tivesse agido motivado por vingança pessoal contra o proprietário do estabelecimento comercial, estaria configurada a nulidade do ato por abuso de poder na modalidade excesso de poder.',
    C: 'Se, na situação hipotética em apreço, fosse aplicada pena de multa ao estabelecimento comercial, sua cobrança poderia ser executada diretamente pela administração pública.',
    D: 'Na hipótese apresentada, a aplicação de punição administrativa ao estabelecimento comercial submete-se ao princípio da legalidade, uma vez que somente lei pode instituir sanções administrativas.',
    E: 'Na hipótese em apreço, a interdição cautelar do estabelecimento comercial não poderia prescindir da observância do devido processo legal e somente poderia ser efetivada após o exercício do direito de defesa por parte do interessado.'
  }, 'D', 'D. Sanções administrativas só podem ser criadas por lei. A: a presunção de legitimidade é relativa. B: agir por vingança pessoal é desvio de finalidade (desvio de poder), não excesso de poder. C: a multa não é autoexecutória; se não paga, é cobrada judicialmente. E: medidas cautelares de polícia admitem contraditório diferido.');
  me('TCEB07', F_TCEB + '7', 'administrativo', 'Com base em lei específica estadual, foi autorizada a instituição da empresa X, pessoa jurídica sob a forma de sociedade anônima, com controle acionário pertencente ao ente federativo estadual, para fins de exploração de determinada atividade econômica de interesse coletivo. Nessa situação hipotética,', {
    A: 'a pessoa federativa a que estará vinculada a empresa X será solidariamente responsável pela solvência dos débitos dessa empresa.',
    B: 'a empresa X deverá ser constituída como sociedade de economia mista, com personalidade jurídica de direito privado, pertencente à administração indireta, à qual é delegada a titularidade de atividade típica do Estado.',
    C: 'por se tratar de pessoa jurídica que exercerá atividade econômica, a empresa X submeter-se-á ao regime jurídico próprio das empresas privadas, salvo em relação a obrigações trabalhistas e tributárias.',
    D: 'a empresa X submeter-se-á ao controle do tribunal de contas no que concerne aos bens, valores e dinheiros públicos provenientes diretamente do ente público controlador.',
    E: 'a empresa X não poderá realizar contratações e licitações em regime diverso daquele previsto para a administração direta.'
  }, 'D', 'D. Estatais estão sujeitas ao controle dos tribunais de contas quanto aos recursos públicos (art. 70 e art. 71, II, da Constituição). A: o ente não responde solidariamente pelas dívidas da estatal. B: sociedade anônima com controle acionário do Estado pode ser empresa pública ou sociedade de economia mista, e titularidade de atividade típica de Estado não se delega. C: o regime privado inclui as obrigações trabalhistas e tributárias (art. 173, § 1.º, II). E: as estatais têm regime próprio de licitações (Lei 13.303/2016).');
  me('TCEB08', F_TCEB + '8', 'administrativo', 'A respeito do controle judicial dos atos administrativos, assinale a opção correta.', {
    A: 'Em razão da presunção de legitimidade e autoexecutoriedade do ato administrativo, o controle judicial deste se dá, em regra, posteriormente à sua edição, podendo, todavia, ocorrer de forma prévia, a fim de evitar ameaça de lesão a direito.',
    B: 'No ordenamento jurídico pátrio, inexiste hipótese em que o acesso ao Poder Judiciário somente seja admitido após o esgotamento da instância administrativa.',
    C: 'A ação de improbidade administrativa é meio de controle judicial de condutas de improbidade praticadas no âmbito da administração pública, para as quais são previstas penalidades de cassação dos direitos políticos, perda da função pública e ressarcimento ao erário, entre outras.',
    D: 'Em razão do sistema do contencioso administrativo, adotado no Brasil, determinadas causas, quando julgadas em última instância na esfera administrativa, não podem ser reapreciadas pelo Poder Judiciário.',
    E: 'Com base no princípio da inafastabilidade da jurisdição, o Poder Judiciário pode reapreciar o mérito dos atos administrativos relativamente aos critérios de oportunidade e conveniência utilizados pelo administrador público.'
  }, 'A', 'A. O controle judicial costuma ser posterior, mas a lei não exclui da apreciação do Judiciário ameaça a direito (art. 5.º, XXXV), o que permite controle preventivo. B: a Justiça Desportiva é exemplo de exigência de esgotamento prévio (art. 217, § 1.º). C: a sanção é suspensão, não cassação, dos direitos políticos (art. 37, § 4.º). D: o Brasil adota a jurisdição una, não o contencioso administrativo. E: o Judiciário controla a legalidade, não o mérito (oportunidade e conveniência).');
  me('TCEB09', F_TCEB + '9', 'administrativo', 'Assinale a opção correta, com referência ao tratamento constitucional conferido à responsabilidade civil do Estado.', {
    A: 'A Constituição Federal de 1988 adota como regra a teoria do risco administrativo, segundo a qual o Estado deve arcar com o risco inerente às numerosas atividades que desempenha, inclusive quando a culpa do dano decorrer de conduta da própria vítima.',
    B: 'A aplicação da responsabilidade objetiva independe da verificação do elemento culpa, de modo que, demonstrados o prejuízo pelo lesado e a relação de causalidade entre a conduta estatal e a lesão sofrida, o dever de indenizar poderá ser reconhecido mesmo que decorra de atos lícitos estatais.',
    C: 'Diferentemente das pessoas jurídicas de direito público, as quais respondem objetivamente pelos danos que seus agentes causarem a terceiros, é subjetiva a responsabilidade das pessoas jurídicas de direito privado prestadoras de serviço público, em se tratando de danos causados a terceiros não usuários do serviço.',
    D: 'Por se tratar de atividade exercida em caráter privado, por delegação do poder público, o Estado não responde por danos causados a terceiros por notários (tabeliães) e oficiais de registro.',
    E: 'Segundo a Constituição Federal de 1988, o indivíduo que for condenado criminalmente em virtude de sentença que contenha erro judiciário terá direito a reparação cível, desde que seja demonstrada a conduta dolosa por parte do juiz da causa.'
  }, 'B', 'B. Na responsabilidade objetiva (art. 37, § 6.º) basta provar dano e nexo causal, e atos lícitos também podem gerar dever de indenizar. A: a culpa exclusiva da vítima exclui a responsabilidade no risco administrativo. C: o STF fixou que a responsabilidade das prestadoras é objetiva também perante não usuários (RE 591.874). D: o Estado responde objetivamente pelos atos de tabeliães e registradores (RE 842.846). E: a indenização por erro judiciário (art. 5.º, LXXV) independe de dolo do juiz.');
  me('TCEB10', F_TCEB + '10', 'constitucional', 'Acerca dos direitos e garantias fundamentais previstos na Constituição Federal de 1988, assinale a opção correta.', {
    A: 'Tratados e convenções internacionais recepcionados pela República Federativa do Brasil, em geral, têm status equivalente ao das emendas constitucionais.',
    B: 'Os direitos sociais relativos a educação, saúde, alimentação, trabalho e moradia constituem norma constitucional de conteúdo programático, razão por que não se pode exigir dos poderes públicos atuação no sentido de provê-los.',
    C: 'Os direitos e garantias individuais previstos no texto constitucional não são assegurados apenas às pessoas físicas brasileiras e estrangeiras residentes no país, alcançando também as pessoas jurídicas, como, por exemplo, no reconhecimento de indenização por danos morais por violação à imagem.',
    D: 'Em nome da proteção constitucional à privacidade, a quebra do sigilo de dados bancários, fiscais, ou informáticos de entes privados somente pode ser determinada por decisão judicial ou de comissão parlamentar de inquérito ou por requisição do Ministério Público.',
    E: 'A norma constitucional que prevê o livre exercício da atividade profissional tem eficácia limitada, uma vez que sua aplicabilidade depende da edição de lei posterior.'
  }, 'C', 'C. Pessoas jurídicas são titulares de direitos fundamentais compatíveis com sua natureza, e a Súmula 227 do STJ admite que sofram dano moral. A: só os tratados de direitos humanos aprovados pelo rito do art. 5.º, § 3.º, equivalem a emendas. B: direitos sociais são exigíveis judicialmente. D: o MP não pode requisitar diretamente a quebra de sigilo bancário. E: a liberdade profissional (art. 5.º, XIII) é norma de eficácia contida.');
  me('TCEB11', F_TCEB + '11', 'constitucional', 'Em relação à organização político-administrativa do Estado brasileiro, assinale a opção correta.', {
    A: 'Lei estadual que dispuser sobre sistema de consórcios e sorteios não usurpará a competência da União, pois se inserirá no âmbito da competência legislativa suplementar.',
    B: 'No exercício de sua competência para legislar sobre assuntos de interesse local, pode o município editar lei municipal que discipline horário comercial e bancário para o atendimento ao público.',
    C: 'Em matéria de competência legislativa concorrente, a superveniência de lei federal sobre normas gerais revoga lei estadual anterior no que elas forem contrárias.',
    D: 'Em matéria de proteção ao meio ambiente, a competência legislativa concorrente entre a União e os estados não afasta a competência do município para legislar sobre o assunto de forma suplementar.',
    E: 'Lei complementar federal pode autorizar estados e municípios a legislar sobre questões específicas de matérias de competência privativa da União.'
  }, 'D', 'D. O município pode legislar sobre meio ambiente no limite do interesse local e em harmonia com as normas da União e do estado (art. 30, I e II; STF, Tema 145). A: consórcios e sorteios são competência privativa da União (Súmula Vinculante 2). B: o município fixa horário do comércio (Súmula Vinculante 38), mas o horário bancário é matéria federal. C: a lei federal superveniente suspende a eficácia da lei estadual no que lhe for contrário (art. 24, § 4.º), não a revoga. E: a delegação do art. 22, parágrafo único, alcança apenas os estados (e o DF), não os municípios.');
  me('TCEB12', F_TCEB + '12', 'constitucional', 'Com referência às atribuições do Congresso Nacional, da Câmara dos Deputados e do Senado Federal, assinale a opção correta.', {
    A: 'Cabe ao Senado Federal suspender a execução de atos normativos do Poder Executivo que exorbitem do poder regulamentar ou dos limites de delegação legislativa.',
    B: 'Compete privativamente à Câmara dos Deputados autorizar operações externas de natureza financeira de interesse da União, dos estados, do Distrito Federal e dos municípios.',
    C: 'Cabe ao Congresso Nacional, com a sanção do presidente da República, dispor sobre a organização e o funcionamento da administração federal, mesmo nos casos em que a disposição não implique aumento de despesa nem a criação ou extinção de órgãos públicos.',
    D: 'É de competência exclusiva do Congresso Nacional, mediante decreto legislativo, resolver definitivamente sobre tratados, acordos ou atos internacionais que acarretem encargos ou compromissos gravosos ao patrimônio nacional.',
    E: 'A concessão de anistia, indulto e comutação de penas é de competência do Congresso Nacional, mediante lei sancionada pelo presidente da República.'
  }, 'D', 'D. Literal do art. 49, I. A: sustar atos normativos do Executivo que exorbitem do poder regulamentar é competência exclusiva do Congresso Nacional (art. 49, V). B: autorizar operações externas financeiras é privativo do Senado (art. 52, V). C: sem aumento de despesa nem criação ou extinção de órgãos, a matéria é tratada por decreto do presidente (art. 84, VI, a). E: o Congresso legisla sobre anistia (art. 48, VIII), mas indulto e comutação de penas são concedidos pelo presidente (art. 84, XII).');

  /* ===================== INÉDITAS · Direito Constitucional e Regimento Interno ===================== */
  var F_IN = 'Inédita · estilo Cebraspe';
  var cRi = 'Com base no Regimento Interno da Câmara dos Deputados (RICD), julgue o item.';
  ce('NBC01', F_IN, 'constitucional', cRi, 'A Mesa da Câmara dos Deputados compõe-se de Presidência e de Secretaria: a primeira é constituída pelo Presidente e por dois Vice-Presidentes, e a segunda, por quatro Secretários.', 'C',
    'Certo. É a composição prevista no RICD, que ainda prevê quatro Suplentes de Secretário.');
  ce('NBC02', F_IN, 'constitucional', cRi, 'Os membros da Mesa da Câmara dos Deputados são eleitos para mandato de quatro anos, coincidente com a legislatura.', 'E',
    'Errado. O mandato dos membros da Mesa é de dois anos (art. 57, § 4.º, da Constituição e RICD). Por isso há eleição da Mesa na primeira e na terceira sessões legislativas de cada legislatura.');
  ce('NBC03', F_IN, 'constitucional', cRi, 'A eleição dos membros da Mesa é feita por escrutínio secreto, exigindo-se maioria absoluta de votos em primeiro escrutínio e maioria simples em segundo, presente a maioria absoluta dos Deputados.', 'C',
    'Certo. É a regra do RICD para a eleição da Mesa. Se nenhum candidato alcança a maioria absoluta no primeiro escrutínio, disputam o segundo os dois mais votados.');
  ce('NBC04', F_IN, 'constitucional', cRi, 'Na composição da Mesa da Câmara, assegura-se, tanto quanto possível, a representação proporcional dos partidos e blocos parlamentares que participam da Casa.', 'C',
    'Certo. A proporcionalidade partidária na Mesa e nas comissões é exigida pelo art. 58, § 1.º, da Constituição e reproduzida no RICD.');
  ce('NBC05', F_IN, 'constitucional', cRi, 'O Presidente da Câmara é o representante da Casa quando ela se pronuncia coletivamente e o supervisor dos seus trabalhos e da sua ordem.', 'C',
    'Certo. É a definição do RICD para o papel do Presidente, que abre o rol de suas atribuições.');
  ce('NBC06', F_IN, 'constitucional', cRi, 'As representações de dois ou mais partidos podem constituir Bloco Parlamentar, sob liderança comum, independentemente do número de Deputados que reúnam.', 'E',
    'Errado. O RICD não admite a formação de Bloco Parlamentar composto de menos de três centésimos dos membros da Câmara.');
  ce('NBC07', F_IN, 'constitucional', cRi, 'O Colégio de Líderes é integrado pelos Líderes da Maioria, da Minoria, dos Partidos, dos Blocos Parlamentares e do Governo; os Líderes de partidos que participem de Bloco Parlamentar e o Líder do Governo têm direito a voz, mas não a voto.', 'C',
    'Certo. É o que dispõe o RICD sobre a composição do Colégio de Líderes.');
  ce('NBC08', F_IN, 'constitucional', cRi, 'As decisões do Colégio de Líderes são tomadas por maioria simples, atribuindo-se a cada Líder um voto, independentemente do tamanho de sua bancada.', 'E',
    'Errado. O Colégio de Líderes decide preferencialmente por consenso. Não havendo consenso, decide por maioria absoluta, ponderados os votos de cada Líder pela expressão numérica de sua bancada.');
  ce('NBC09', F_IN, 'constitucional', cRi, 'A Procuradoria Parlamentar tem por finalidade promover, em colaboração com a Mesa, a defesa da Câmara, de seus órgãos e de seus integrantes quando atingidos em sua honra ou imagem perante a sociedade, em razão do exercício do mandato ou de suas funções institucionais.', 'C',
    'Certo. É a finalidade da Procuradoria Parlamentar no RICD. Ela é composta por Deputados designados pelo Presidente da Câmara.');
  ce('NBC10', F_IN, 'constitucional', cRi, 'Compete à Ouvidoria Parlamentar receber, examinar e encaminhar aos órgãos competentes as reclamações ou representações de pessoas físicas ou jurídicas sobre, entre outros temas, violações a direitos e liberdades fundamentais, ilegalidades ou abuso de poder e mau funcionamento dos serviços da Casa.', 'C',
    'Certo. São atribuições da Ouvidoria Parlamentar previstas no RICD.');
  ce('NBC11', F_IN, 'constitucional', cRi, 'A sessão plenária da Câmara só pode ser aberta com a presença da maioria absoluta dos Deputados.', 'E',
    'Errado. Pelo RICD, a sessão é aberta com a presença de pelo menos um décimo do número total de Deputados. A maioria absoluta é exigida para as deliberações (art. 47 da Constituição), não para a abertura.');
  ce('NBC12', F_IN, 'constitucional', cRi, 'As sessões preparatórias precedem a inauguração dos trabalhos legislativos na primeira e na terceira sessões legislativas de cada legislatura.', 'C',
    'Certo. Nelas ocorrem a posse dos Deputados (no início da legislatura) e a eleição da Mesa para o mandato de dois anos.');
  ce('NBC13', F_IN, 'constitucional', cRi, 'Segundo o RICD, as sessões da Câmara podem ser preparatórias, deliberativas — ordinárias ou extraordinárias — e não deliberativas, estas abrangendo as sessões de debates e as solenes.', 'C',
    'Certo. É a classificação das sessões no RICD. As sessões solenes destinam-se a comemorações e homenagens, sem deliberação de proposições.');
  ce('NBC14', F_IN, 'constitucional', cRi, 'O policiamento do edifício da Câmara e de suas dependências compete privativamente à Mesa, sob a suprema direção do Presidente, sem intervenção de qualquer outro Poder.', 'C',
    'Certo. É regra do título do RICD sobre a administração e a economia interna, coerente com a competência privativa da Câmara para dispor sobre sua polícia (art. 51, IV, da Constituição).');
  ce('NBC15', F_IN, 'constitucional', cRi, 'Deputados e servidores da Câmara podem portar arma no edifício da Casa, desde que a arma esteja devidamente registrada.', 'E',
    'Errado. O RICD proíbe o porte de arma de qualquer espécie no edifício da Câmara e em suas adjacências, excetuados apenas os membros da segurança.');
  ce('NBC16', F_IN, 'constitucional', cRi, 'Os serviços administrativos da Câmara regem-se por regulamentos especiais aprovados pela Mesa.', 'C',
    'Certo. O RICD remete a organização dos serviços administrativos a regulamentos aprovados pela Mesa, a quem cabe dirigir os serviços da Casa.');
  ce('NBC17', F_IN, 'constitucional', cRi, 'Para a votação de matérias em Plenário, exige-se a presença da maioria absoluta dos membros da Câmara.', 'C',
    'Certo. Salvo disposição constitucional em contrário, as deliberações exigem a presença da maioria absoluta (257 Deputados) e são tomadas por maioria dos votos (art. 47 da Constituição).');

  var cParl = 'A respeito do regime jurídico-constitucional dos parlamentares e dos Deputados, julgue o item.';
  ce('NBC18', F_IN, 'constitucional', cParl, 'O Deputado que se afastar do exercício do mandato para investir-se no cargo de Ministro de Estado não perde o mandato e pode optar pela remuneração do mandato.', 'C',
    'Certo. Art. 56, I e § 3.º, da Constituição.');
  ce('NBC19', F_IN, 'constitucional', cParl, 'O suplente é convocado nos casos de vaga, de investidura do Deputado em funções como a de Ministro de Estado ou de licença superior a cento e vinte dias.', 'C',
    'Certo. Art. 56, § 1.º, da Constituição.');
  ce('NBC20', F_IN, 'constitucional', cParl, 'Perde o mandato o Deputado que deixar de comparecer, em cada sessão legislativa, à terça parte das sessões ordinárias da Casa, salvo licença ou missão por esta autorizada; nesse caso, a perda é declarada pela Mesa.', 'C',
    'Certo. Art. 55, III e § 3.º, da Constituição: a perda é declarada pela Mesa, de ofício ou mediante provocação, assegurada ampla defesa.');
  ce('NBC21', F_IN, 'constitucional', cParl, 'Nos casos de procedimento incompatível com o decoro parlamentar, a perda do mandato é declarada pela Mesa da Câmara, de ofício, assegurada ampla defesa.', 'E',
    'Errado. Na quebra de decoro (art. 55, II), a perda é decidida pelo Plenário da Câmara, por maioria absoluta, mediante provocação da Mesa ou de partido político com representação no Congresso (art. 55, § 2.º).');
  ce('NBC22', F_IN, 'constitucional', cParl, 'A votação que decide sobre a perda de mandato de Deputado por quebra de decoro parlamentar é secreta.', 'E',
    'Errado. Desde a Emenda Constitucional 76/2013, essa votação é aberta.');
  ce('NBC23', F_IN, 'constitucional', cParl, 'Desde a expedição do diploma, os Deputados não podem ser presos, salvo em flagrante de crime inafiançável; nesse caso, os autos são remetidos em vinte e quatro horas à Câmara, que, pelo voto da maioria de seus membros, resolve sobre a prisão.', 'C',
    'Certo. Art. 53, § 2.º, da Constituição.');
  ce('NBC24', F_IN, 'constitucional', cParl, 'Recebida a denúncia contra Deputado por crime ocorrido após a diplomação, o STF dará ciência à Câmara, que, por iniciativa de partido político nela representado e pelo voto da maioria de seus membros, poderá sustar o andamento da ação até a decisão final.', 'C',
    'Certo. Art. 53, § 3.º, da Constituição. A sustação suspende a prescrição enquanto durar o mandato (§ 5.º).');
  ce('NBC25', F_IN, 'constitucional', cParl, 'As imunidades dos Deputados são automaticamente suspensas durante o estado de sítio.', 'E',
    'Errado. As imunidades subsistem durante o estado de sítio. Só podem ser suspensas pelo voto de dois terços da Casa, e apenas quanto a atos praticados fora do recinto do Congresso que sejam incompatíveis com a execução da medida (art. 53, § 8.º).');

  var cLeg = 'Acerca do Poder Legislativo na Constituição Federal de 1988, julgue o item.';
  ce('NBC26', F_IN, 'constitucional', cLeg, 'A Câmara dos Deputados compõe-se de representantes do povo, eleitos pelo sistema proporcional, e nenhuma unidade da Federação terá menos de oito nem mais de setenta Deputados.', 'C',
    'Certo. Art. 45, caput e § 1.º, da Constituição.');
  ce('NBC27', F_IN, 'constitucional', cLeg, 'Compete privativamente à Câmara dos Deputados processar e julgar o Presidente da República nos crimes de responsabilidade.', 'E',
    'Errado. A Câmara autoriza, por dois terços de seus membros, a instauração do processo (art. 51, I). O processo e o julgamento cabem ao Senado Federal (art. 52, I).');
  ce('NBC28', F_IN, 'constitucional', cLeg, 'Compete privativamente à Câmara dos Deputados proceder à tomada de contas do Presidente da República quando não apresentadas ao Congresso Nacional dentro de sessenta dias após a abertura da sessão legislativa.', 'C',
    'Certo. Art. 51, II, da Constituição.');
  ce('NBC29', F_IN, 'constitucional', cLeg, 'As comissões parlamentares de inquérito, criadas mediante requerimento de um terço dos membros da Casa, para apuração de fato determinado e por prazo certo, podem decretar a interceptação das comunicações telefônicas dos investigados.', 'E',
    'Errado. A primeira parte reproduz o art. 58, § 3.º, mas a interceptação telefônica está sujeita à reserva de jurisdição (art. 5.º, XII) e só pode ser determinada por juiz. A CPI pode quebrar sigilo bancário, fiscal e de dados telefônicos (registros), mas não interceptar conversas.');
  ce('NBC30', F_IN, 'constitucional', cLeg, 'A iniciativa popular de lei pode ser exercida pela apresentação à Câmara dos Deputados de projeto subscrito por, no mínimo, 1% do eleitorado nacional, distribuído pelo menos por cinco estados, com não menos de três décimos por cento dos eleitores de cada um deles.', 'C',
    'Certo. Art. 61, § 2.º, da Constituição.');

  var cRc = 'Com relação ao Regimento Comum do Congresso Nacional e às sessões conjuntas, julgue o item.';
  ce('NBC31', F_IN, 'constitucional', cRc, 'A Mesa do Congresso Nacional é presidida pelo Presidente do Senado Federal, e os demais cargos são exercidos, alternadamente, pelos ocupantes de cargos equivalentes na Câmara dos Deputados e no Senado Federal.', 'C',
    'Certo. Art. 57, § 5.º, da Constituição, reproduzido no Regimento Comum.');
  ce('NBC32', F_IN, 'constitucional', cRc, 'Nas deliberações em sessão conjunta do Congresso Nacional, os votos de Deputados e de Senadores são computados em conjunto, como se integrassem uma só Casa.', 'E',
    'Errado. Pelo Regimento Comum, nas deliberações os votos da Câmara dos Deputados e do Senado Federal são sempre computados separadamente. A matéria só é aprovada se obtiver a maioria exigida em cada Casa.');
  ce('NBC33', F_IN, 'constitucional', cRc, 'O veto presidencial é apreciado em sessão conjunta, dentro de trinta dias a contar de seu recebimento, e só pode ser rejeitado pelo voto da maioria absoluta dos Deputados e Senadores.', 'C',
    'Certo. Art. 66, § 4.º, da Constituição. Esgotado o prazo sem deliberação, o veto é colocado na ordem do dia da sessão imediata, sobrestadas as demais proposições (§ 6.º).');

  /* ===================== INÉDITAS · Direito Administrativo e Administração Pública ===================== */
  var c9784 = 'Com base na Lei n.º 9.784/1999, que regula o processo administrativo no âmbito da administração pública federal, julgue o item.';
  ce('NBA01', F_IN, 'administrativo', c9784, 'Nos processos administrativos, a Administração deve interpretar a norma da forma que melhor garanta o atendimento do fim público a que se dirige, vedada a aplicação retroativa de nova interpretação.', 'C',
    'Certo. Art. 2.º, parágrafo único, XIII, da Lei 9.784/1999, expressão do princípio da segurança jurídica.');
  ce('NBA02', F_IN, 'administrativo', c9784, 'Pode ser objeto de delegação a decisão de recursos administrativos, desde que o ato de delegação seja publicado no meio oficial.', 'E',
    'Errado. Não podem ser delegados a edição de atos de caráter normativo, a decisão de recursos administrativos e as matérias de competência exclusiva do órgão ou da autoridade (art. 13).');
  ce('NBA03', F_IN, 'administrativo', c9784, 'Está impedido de atuar em processo administrativo o servidor que tenha amizade íntima ou inimizade notória com algum dos interessados.', 'E',
    'Errado. Amizade íntima ou inimizade notória é hipótese de suspeição, que pode ser arguida (art. 20). Impedimento é o caso de interesse direto na matéria, participação anterior como perito, testemunha ou representante, ou litígio com o interessado (art. 18).');
  ce('NBA04', F_IN, 'administrativo', c9784, 'O direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em cinco anos, contados da data em que foram praticados, salvo comprovada má-fé.', 'C',
    'Certo. Art. 54 da Lei 9.784/1999. Nos atos com efeitos patrimoniais contínuos, o prazo conta da percepção do primeiro pagamento.');
  ce('NBA05', F_IN, 'administrativo', c9784, 'Salvo disposição legal específica, é de dez dias o prazo para interposição de recurso administrativo, contado a partir da ciência ou da divulgação oficial da decisão recorrida.', 'C',
    'Certo. Art. 59 da Lei 9.784/1999. A decisão do recurso deve sair em até 30 dias, prorrogáveis por igual período mediante justificativa.');
  ce('NBA06', F_IN, 'administrativo', c9784, 'Em regra, o recurso administrativo tem efeito suspensivo.', 'E',
    'Errado. Salvo disposição legal em contrário, o recurso não tem efeito suspensivo (art. 61). A autoridade pode concedê-lo quando houver justo receio de prejuízo de difícil ou incerta reparação.');
  ce('NBA07', F_IN, 'administrativo', c9784, 'O recurso administrativo tramitará no máximo por três instâncias administrativas, salvo disposição legal diversa.', 'C',
    'Certo. Art. 57 da Lei 9.784/1999.');
  ce('NBA08', F_IN, 'administrativo', c9784, 'Da revisão do processo administrativo de que resultem sanções poderá resultar agravamento da sanção, desde que o interessado seja previamente cientificado para formular alegações.', 'E',
    'Errado. Da revisão não pode resultar agravamento da sanção (art. 65, parágrafo único). A possibilidade de agravamento, com ciência prévia do interessado, existe no julgamento de recurso (art. 64).');

  var cImp = 'Acerca da improbidade administrativa, nos termos da Lei n.º 8.429/1992, com as alterações da Lei n.º 14.230/2021, julgue o item.';
  ce('NBA09', F_IN, 'administrativo', cImp, 'A configuração de ato de improbidade administrativa exige conduta dolosa, não havendo mais previsão de improbidade culposa.', 'C',
    'Certo. Desde a Lei 14.230/2021, todas as modalidades (enriquecimento ilícito, lesão ao erário e atentado aos princípios) exigem dolo, entendido como vontade livre e consciente de alcançar o resultado ilícito (art. 1.º, §§ 1.º a 3.º).');
  ce('NBA10', F_IN, 'administrativo', cImp, 'Os atos de improbidade que atentam contra os princípios da administração pública sujeitam o agente, entre outras sanções, à suspensão dos direitos políticos por até catorze anos.', 'E',
    'Errado. Para os atos do art. 11, a lei prevê multa civil de até 24 vezes a remuneração e proibição de contratar com o poder público por até 4 anos (art. 12, III). A suspensão dos direitos políticos de até 14 anos é sanção do enriquecimento ilícito (art. 12, I).');
  ce('NBA11', F_IN, 'administrativo', cImp, 'A ação para a aplicação das sanções da Lei de Improbidade prescreve em oito anos, contados a partir da ocorrência do fato ou, no caso de infrações permanentes, do dia em que cessou a permanência.', 'C',
    'Certo. Art. 23 da Lei 8.429/1992, com a redação da Lei 14.230/2021.');
  ce('NBA12', F_IN, 'administrativo', cImp, 'Permitir ou facilitar a aquisição, a permuta ou a locação de bem ou serviço por preço superior ao de mercado constitui ato de improbidade que causa lesão ao erário.', 'C',
    'Certo. Art. 10, V, da Lei 8.429/1992, desde que a conduta seja dolosa e cause perda patrimonial efetiva.');
  ce('NBA13', F_IN, 'administrativo', cImp, 'A nomeação de cônjuge da autoridade nomeante para cargo em comissão, em violação ao princípio da impessoalidade, está tipificada como ato de improbidade que atenta contra os princípios da administração pública.', 'C',
    'Certo. O nepotismo foi incluído expressamente no art. 11, XI, da Lei 8.429/1992 pela Lei 14.230/2021, em linha com a Súmula Vinculante 13.');
  ce('NBA14', F_IN, 'administrativo', cImp, 'É imprescritível a ação de ressarcimento ao erário fundada em qualquer ato ilícito praticado por agente público.', 'E',
    'Errado. O STF fixou que só é imprescritível o ressarcimento fundado em ato doloso tipificado como improbidade (Tema 897). O ressarcimento por ilícito civil comum prescreve (Tema 666).');

  var cGov = 'Acerca de governança na administração pública e da evolução dos modelos de gestão, julgue o item.';
  ce('NBA15', F_IN, 'administrativo', cGov, 'Segundo o Decreto n.º 9.203/2017, governança pública é o conjunto de mecanismos de liderança, estratégia e controle postos em prática para avaliar, direcionar e monitorar a gestão, com vistas à condução de políticas públicas e à prestação de serviços de interesse da sociedade.', 'C',
    'Certo. Definição do art. 2.º, I, do Decreto 9.203/2017.');
  ce('NBA16', F_IN, 'administrativo', cGov, 'São princípios da governança pública, nos termos do Decreto n.º 9.203/2017, a capacidade de resposta, a integridade, a confiabilidade, a melhoria regulatória, a prestação de contas e responsabilidade e a transparência.', 'C',
    'Certo. É o rol do art. 3.º do Decreto 9.203/2017.');
  ce('NBA17', F_IN, 'administrativo', cGov, 'Governança e governabilidade são sinônimos, pois ambos os termos designam a legitimidade política do governo perante a sociedade.', 'E',
    'Errado. Governabilidade refere-se às condições políticas e institucionais para exercer o poder (legitimidade, apoio, relação entre Poderes). Governança refere-se à capacidade de gestão para formular e implementar políticas e entregar resultados.');
  ce('NBA18', F_IN, 'administrativo', cGov, 'Valor público, nos termos do Decreto n.º 9.203/2017, corresponde ao lucro contábil gerado pelas empresas estatais e transferido ao Tesouro.', 'E',
    'Errado. Valor público são os produtos e resultados gerados, preservados ou entregues pela organização que respondam de forma efetiva e útil às necessidades de interesse público e modifiquem aspectos da sociedade ou de grupos destinatários legítimos (art. 2.º, II).');
  ce('NBA19', F_IN, 'administrativo', cGov, 'Na Nova Gestão Pública (New Public Management), a ênfase recai sobre resultados, eficiência e orientação ao cidadão-cliente, com incorporação de práticas gerenciais do setor privado.', 'C',
    'Certo. O modelo gerencial reage à rigidez burocrática com foco em resultados, contratualização de metas, descentralização e técnicas de gestão privadas.');
  ce('NBA20', F_IN, 'administrativo', cGov, 'A Nova Governança Pública (New Public Governance) enfatiza redes de cooperação entre Estado, mercado e sociedade civil, a coprodução de serviços e a participação cidadã.', 'C',
    'Certo. A Nova Governança Pública vê o Estado como articulador de redes, valoriza parcerias, coprodução do bem público, transparência e participação, para além da eficiência gerencial.');

  var cLai = 'Com base na Lei de Acesso à Informação (Lei n.º 12.527/2011), julgue o item.';
  ce('NBA21', F_IN, 'administrativo', cLai, 'O pedido de acesso à informação deve conter a identificação do requerente e a especificação da informação requerida, sendo vedadas quaisquer exigências relativas aos motivos determinantes da solicitação.', 'C',
    'Certo. Art. 10, caput e § 3.º, da Lei 12.527/2011.');
  ce('NBA22', F_IN, 'administrativo', cLai, 'Não sendo possível conceder o acesso imediato à informação disponível, o órgão deve fazê-lo em prazo não superior a vinte dias, prorrogável por mais dez dias mediante justificativa expressa.', 'C',
    'Certo. Art. 11, §§ 1.º e 2.º, da Lei 12.527/2011.');
  ce('NBA23', F_IN, 'administrativo', cLai, 'A informação classificada no grau secreto tem prazo máximo de restrição de acesso de vinte e cinco anos.', 'E',
    'Errado. Os prazos máximos são de 25 anos para a ultrassecreta, 15 para a secreta e 5 para a reservada (art. 24, § 1.º).');
  ce('NBA24', F_IN, 'administrativo', cLai, 'As informações pessoais relativas à intimidade, à vida privada, à honra e à imagem têm acesso restrito pelo prazo máximo de cem anos a contar da sua data de produção.', 'C',
    'Certo. Art. 31, § 1.º, I, da Lei 12.527/2011. O acesso é permitido aos agentes públicos legalmente autorizados e à própria pessoa.');

  var cLgpd = 'Com base na Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018), julgue o item.';
  ce('NBA25', F_IN, 'administrativo', cLgpd, 'O consentimento do titular é a única base legal que autoriza o tratamento de dados pessoais pelo poder público.', 'E',
    'Errado. O consentimento é uma das bases do art. 7.º. O poder público trata dados, em geral, para cumprir obrigação legal e executar políticas públicas (art. 7.º, II e III, e art. 23), sem depender de consentimento.');
  ce('NBA26', F_IN, 'administrativo', cLgpd, 'Dados referentes à saúde, à convicção religiosa, à opinião política e dados biométricos são considerados dados pessoais sensíveis.', 'C',
    'Certo. Art. 5.º, II, da LGPD, que inclui também origem racial ou étnica, filiação sindical, vida sexual e dado genético.');
  ce('NBA27', F_IN, 'administrativo', cLgpd, 'A Autoridade Nacional de Proteção de Dados pode aplicar a órgãos públicos que infringirem a LGPD multa simples de até 2% do faturamento, limitada a cinquenta milhões de reais por infração.', 'E',
    'Errado. As multas não se aplicam a órgãos e entidades públicos (art. 52, § 3.º). A eles cabem sanções como advertência, publicização da infração, bloqueio, eliminação dos dados e suspensão do tratamento.');

  /* ===================== INÉDITAS · Tecnologia da Informação e Dados ===================== */
  var c365 = 'Acerca do Microsoft 365 (Word, Excel, PowerPoint e OneDrive) e de ferramentas de colaboração, julgue o item.';
  ce('NBT01', F_IN, 'ti', c365, 'Arquivos do Word, do Excel e do PowerPoint salvos no OneDrive ou no SharePoint podem ser editados simultaneamente por vários usuários, com as alterações sincronizadas quase em tempo real (coautoria).', 'C',
    'Certo. A coautoria é recurso do Microsoft 365 para arquivos armazenados na nuvem, com o salvamento automático ativado.');
  ce('NBT02', F_IN, 'ti', c365, 'O OneDrive mantém histórico de versões dos arquivos, o que permite restaurar uma versão anterior de um documento alterado indevidamente.', 'C',
    'Certo. O histórico de versões permite visualizar e restaurar versões anteriores, o que também ajuda a recuperar arquivos atingidos por ransomware.');
  ce('NBT03', F_IN, 'ti', c365, 'Ao compartilhar um arquivo do OneDrive por link, não é possível restringir o acesso a pessoas específicas nem impedir a edição, pois todo link de compartilhamento concede permissão de edição a qualquer pessoa que o receba.', 'E',
    'Errado. O OneDrive permite escolher quem pode usar o link (qualquer pessoa, pessoas da organização ou pessoas específicas), conceder apenas visualização, bloquear download e definir data de expiração, conforme as políticas da organização.');
  ce('NBT04', F_IN, 'ti', c365, 'No Excel, ao se copiar a fórmula =A1*$B$1 da célula C1 para a célula C2, a fórmula resultante em C2 será =A2*$B$1.', 'C',
    'Certo. A referência relativa A1 se ajusta para A2. A referência absoluta $B$1, fixada pelos cifrões, não muda.');
  ce('NBT05', F_IN, 'ti', c365, 'No Excel, a fórmula =SE(A1>=7;"Aprovado";"Reprovado") retorna "Aprovado" quando a célula A1 contém o valor 6,9.', 'E',
    'Errado. Como 6,9 não é maior nem igual a 7, o teste é falso e a função retorna "Reprovado".');
  ce('NBT06', F_IN, 'ti', c365, 'No Excel, a função MÉDIA, aplicada a um intervalo que contém células vazias, considera essas células como zero no cálculo.', 'E',
    'Errado. MÉDIA ignora células vazias e com texto. Células com o valor zero digitado, ao contrário, entram no cálculo.');
  ce('NBT07', F_IN, 'ti', c365, 'No Excel do Microsoft 365, a função PROCX permite buscar um valor em um intervalo e retornar o item correspondente de outro intervalo, inclusive situado à esquerda da coluna de pesquisa, o que não é possível diretamente com a função PROCV.', 'C',
    'Certo. O PROCV só retorna colunas à direita da primeira coluna da tabela. O PROCX recebe separadamente o intervalo de pesquisa e o de retorno, em qualquer posição.');
  ce('NBT08', F_IN, 'ti', c365, 'No Excel, a fórmula =2+3*4 retorna 20, pois as operações são executadas da esquerda para a direita.', 'E',
    'Errado. O Excel respeita a precedência dos operadores: a multiplicação vem antes da adição, e o resultado é 14. Para obter 20, seria preciso escrever =(2+3)*4.');
  ce('NBT09', F_IN, 'ti', c365, 'No Word, a geração automática de sumário baseia-se, por padrão, nos parágrafos formatados com os estilos de Título.', 'C',
    'Certo. O sumário automático lista os parágrafos com estilos Título 1, Título 2 etc. e é atualizado pelo comando Atualizar Sumário.');
  ce('NBT10', F_IN, 'ti', c365, 'No Word, o recurso Controlar Alterações, da guia Revisão, registra inserções, exclusões e mudanças de formatação, que podem depois ser aceitas ou rejeitadas.', 'C',
    'Certo. É o recurso usado na revisão de documentos por mais de uma pessoa.');
  ce('NBT11', F_IN, 'ti', c365, 'No PowerPoint, alterações feitas no Slide Mestre refletem-se em todos os slides baseados nos layouts a ele associados.', 'C',
    'Certo. O Slide Mestre define fontes, cores, planos de fundo e posições de espaços reservados para todos os layouts do modelo.');
  ce('NBT12', F_IN, 'ti', c365, 'No PowerPoint, a tecla F5 inicia a apresentação a partir do slide atualmente selecionado.', 'E',
    'Errado. F5 inicia a apresentação do primeiro slide. Para começar do slide atual, usa-se Shift + F5.');
  ce('NBT13', F_IN, 'ti', c365, 'No Microsoft Teams, as equipes são organizadas em canais, e um canal privado só é acessível aos membros da equipe expressamente adicionados a ele.', 'C',
    'Certo. Canais padrão ficam abertos a todos os membros da equipe. Canais privados restringem conversas e arquivos a um subgrupo.');
  ce('NBT14', F_IN, 'ti', c365, 'Ao enviar um e-mail com destinatários no campo Cco (cópia oculta), esses destinatários ficam visíveis para os que estão nos campos Para e Cc.', 'E',
    'Errado. Os endereços em Cco não aparecem para os demais destinatários. O recurso protege a privacidade de listas de envio.');
  ce('NBT15', F_IN, 'ti', c365, 'O protocolo IMAP mantém as mensagens no servidor e sincroniza o estado delas (lida, movida, excluída) entre os diferentes dispositivos do usuário.', 'C',
    'Certo. No POP3, ao contrário, as mensagens costumam ser baixadas para um único dispositivo e removidas do servidor.');

  var cRede = 'Acerca de redes de computadores, Internet e intranet, julgue o item.';
  ce('NBT16', F_IN, 'ti', cRede, 'Intranet é uma rede privada que utiliza os mesmos protocolos da Internet (TCP/IP), mas cujo acesso é restrito aos usuários de uma organização.', 'C',
    'Certo. A intranet usa navegadores, servidores web e protocolos da Internet, com acesso controlado. A extranet estende parte desse acesso a parceiros externos.');
  ce('NBT17', F_IN, 'ti', cRede, 'O DNS é o serviço responsável por traduzir nomes de domínio, como camara.leg.br, em endereços IP.', 'C',
    'Certo. O DNS resolve nomes em endereços IP, o que permite usar nomes fáceis de lembrar em vez de números.');
  ce('NBT18', F_IN, 'ti', cRede, 'O protocolo HTTPS dispensa o uso de certificados digitais, pois a criptografia da conexão é negociada apenas com a senha do usuário.', 'E',
    'Errado. O HTTPS usa TLS, que se apoia em certificados digitais para autenticar o servidor e estabelecer chaves de criptografia. A senha do usuário não participa dessa negociação.');

  var cSeg = 'Acerca de segurança da informação e de ameaças digitais, julgue o item.';
  ce('NBT19', F_IN, 'ti', cSeg, 'Pharming é o ataque em que o usuário é redirecionado para um sítio falso mesmo digitando corretamente o endereço desejado, por exemplo, por meio da alteração de registros de DNS.', 'C',
    'Certo. No pharming o desvio ocorre na resolução de nomes (DNS envenenado ou arquivo hosts alterado), sem depender de o usuário clicar em link falso.');
  ce('NBT20', F_IN, 'ti', cSeg, 'Phishing consiste no envio de mensagens que se passam por instituições confiáveis para induzir o usuário a fornecer dados pessoais ou credenciais.', 'C',
    'Certo. É técnica de engenharia social, por e-mail, SMS, aplicativos de mensagem ou páginas falsas.');
  ce('NBT21', F_IN, 'ti', cSeg, 'O worm, diferentemente do vírus, precisa ser anexado a um arquivo hospedeiro e depende da execução desse arquivo pelo usuário para se propagar.', 'E',
    'Errado. É o contrário. O vírus se anexa a arquivos e depende de execução. O worm se propaga sozinho pela rede, explorando vulnerabilidades, sem hospedeiro.');
  ce('NBT22', F_IN, 'ti', cSeg, 'No backup incremental, são copiados apenas os arquivos criados ou alterados desde o último backup realizado, seja ele completo ou incremental.', 'C',
    'Certo. O backup diferencial, por sua vez, copia o que mudou desde o último backup completo.');
  ce('NBT23', F_IN, 'ti', cSeg, 'Um firewall corretamente configurado dispensa o uso de antivírus, pois bloqueia qualquer código malicioso que chegue ao computador.', 'E',
    'Errado. O firewall filtra conexões conforme regras, mas não analisa todo o conteúdo dos arquivos. Malware recebido por e-mail, download ou pendrive passa por ele. Antivírus e firewall são complementares.');
  ce('NBT24', F_IN, 'ti', cSeg, 'A autenticação multifator combina fatores de categorias diferentes, como algo que o usuário sabe (senha) e algo que ele possui (token ou celular).', 'C',
    'Certo. As categorias são: algo que se sabe, algo que se tem e algo que se é (biometria). Duas senhas não formam autenticação multifator.');

  var cIa = 'Acerca de conceitos de inteligência artificial (IA), julgue o item.';
  ce('NBT25', F_IN, 'ti', cIa, 'No aprendizado supervisionado, o modelo é treinado com exemplos rotulados, isto é, com as respostas esperadas, como em tarefas de classificação e de regressão.', 'C',
    'Certo. Exemplo: classificar e-mails como spam ou não spam a partir de mensagens já rotuladas.');
  ce('NBT26', F_IN, 'ti', cIa, 'O agrupamento (clusterização) de documentos por similaridade, sem categorias previamente definidas, é exemplo típico de aprendizado por reforço.', 'E',
    'Errado. Agrupar dados sem rótulos é tarefa de aprendizado não supervisionado.');
  ce('NBT27', F_IN, 'ti', cIa, 'No aprendizado por reforço, um agente aprende por tentativa e erro, recebendo recompensas ou penalidades em razão das ações que executa no ambiente.', 'C',
    'Certo. O agente busca a política de ações que maximize a recompensa acumulada, como em jogos e robótica.');
  ce('NBT28', F_IN, 'ti', cIa, 'Modelos de IA generativa, como os grandes modelos de linguagem, podem produzir respostas plausíveis, mas factualmente incorretas, fenômeno conhecido como alucinação.', 'C',
    'Certo. Por isso, conteúdo gerado por IA deve ser conferido em fontes confiáveis, sobretudo citações de leis, números e referências.');
  ce('NBT29', F_IN, 'ti', cIa, 'Na engenharia de prompts, fornecer contexto, especificar o formato desejado da resposta e incluir exemplos tende a melhorar a qualidade das respostas de um modelo de linguagem.', 'C',
    'Certo. Instruções claras, papel, contexto, restrições, formato de saída e exemplos reduzem a ambiguidade do pedido.');
  ce('NBT30', F_IN, 'ti', cIa, 'A técnica de prompt denominada few-shot consiste em pedir ao modelo que execute uma tarefa sem fornecer nenhum exemplo dela.', 'E',
    'Errado. Sem exemplos é zero-shot. Few-shot é incluir no prompt alguns exemplos de entrada e saída da tarefa.');
  ce('NBT31', F_IN, 'ti', cIa, 'Inserir documentos sigilosos ou dados pessoais em ferramentas públicas de IA generativa não traz riscos, pois esses serviços não armazenam nem processam os conteúdos enviados.', 'E',
    'Errado. Os conteúdos enviados são processados e podem ser armazenados ou usados conforme os termos do serviço. Dados sigilosos ou pessoais exigem ferramentas autorizadas pela organização, em respeito à LGPD e às normas de segurança.');
  ce('NBT32', F_IN, 'ti', cIa, 'O sobreajuste (overfitting) ocorre quando o modelo se ajusta excessivamente aos dados de treinamento e perde a capacidade de generalizar para dados novos.', 'C',
    'Certo. O modelo memoriza ruídos do treino: acerta muito nos dados conhecidos e erra nos novos. Detecta-se comparando o desempenho em dados de teste.');
  ce('NBT33', F_IN, 'ti', cIa, 'Textos produzidos com apoio de IA generativa e usados em documentos oficiais devem ser revisados por pessoa responsável, que responde pelo conteúdo, em atenção à ética e à responsabilidade digital no serviço público.', 'C',
    'Certo. A ferramenta não assume responsabilidade. O agente público responde pela correção, pela legalidade e pela adequação do que assina.');

  var cDados = 'Acerca de dados e de visualização de dados, julgue o item.';
  ce('NBT34', F_IN, 'ti', cDados, 'O histograma é indicado para mostrar a distribuição de frequências de uma variável quantitativa contínua agrupada em classes, com barras adjacentes.', 'C',
    'Certo. As barras encostadas indicam a continuidade dos intervalos. Gráficos de barras comuns, com barras separadas, servem a categorias.');
  ce('NBT35', F_IN, 'ti', cDados, 'O gráfico de linhas é o mais indicado para comparar a participação de poucas categorias na composição de um total em um único momento.', 'E',
    'Errado. Gráfico de linhas é próprio para séries temporais. Para partes de um todo, usam-se barras (inclusive empilhadas a 100%) ou, com poucas categorias, setores.');
  ce('NBT36', F_IN, 'ti', cDados, 'O box plot exibe a mediana, os quartis e a amplitude dos dados e permite identificar valores discrepantes (outliers).', 'C',
    'Certo. A caixa vai do primeiro ao terceiro quartil, a linha interna marca a mediana, e pontos além das hastes indicam valores atípicos.');
  ce('NBT37', F_IN, 'ti', cDados, 'O gráfico de dispersão é adequado para investigar a relação entre duas variáveis quantitativas, como o orçamento e o prazo de execução de obras.', 'C',
    'Certo. Cada ponto é uma observação, e a forma da nuvem sugere correlação positiva, negativa ou ausência de relação.');
  ce('NBT38', F_IN, 'ti', cDados, 'No Power BI, o Power Query é usado para obter e transformar dados, enquanto a linguagem DAX é usada para criar medidas e colunas calculadas.', 'C',
    'Certo. O Power Query faz a etapa de ETL (extração, transformação e carga). O DAX trabalha sobre o modelo de dados já carregado.');
  ce('NBT39', F_IN, 'ti', cDados, 'Em gráficos de barras, iniciar o eixo vertical em valor diferente de zero pode exagerar visualmente as diferenças entre as categorias.', 'C',
    'Certo. O comprimento da barra codifica o valor, e um eixo truncado distorce essa proporção.');
  ce('NBT40', F_IN, 'ti', cDados, 'Em storytelling com dados, recomenda-se incluir o maior número possível de gráficos e cores em cada painel, para que o público tenha acesso a todas as informações ao mesmo tempo.', 'E',
    'Errado. Storytelling com dados parte de uma mensagem principal para um público definido e reduz a poluição visual, destacando o que importa.');
})();
