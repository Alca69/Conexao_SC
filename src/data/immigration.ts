import type { LanguageCode } from '@/constants/i18n';

/**
 * Conteúdo fixo do guia "Documentos e regularização" (Florianópolis / Santa Catarina).
 * Todos os links levam a sites oficiais (gov.br, Polícia Federal, Receita Federal, DPU, Prefeitura, ACNUR).
 * Informação geral: regras, prazos e taxas mudam, então o texto sempre orienta a confirmar no site oficial.
 */

export type GuideStep = { title: string; text: string; url?: string };
export type GuidePath = { id: string; tag: string; title: string; who: string; text: string; url: string };
export type GuideLocal = { name: string; role: string; text: string; url: string };

export type ImmigrationGuide = {
  eyebrow: string;
  title: string;
  intro: string;
  notice: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: GuideStep[];
  pathsTitle: string;
  pathsIntro: string;
  paths: GuidePath[];
  docsTitle: string;
  docsIntro: string;
  docs: string[];
  docsNote: string;
  localTitle: string;
  localIntro: string;
  local: GuideLocal[];
  scamTitle: string;
  scamText: string;
  whoLabel: string;
  officialSite: string;
  openStep: string;
};

const GOV_SERVICES = 'https://www.gov.br/pt-br/servicos';
const PF = 'https://www.gov.br/pf/pt-br/assuntos/imigracao';

const urls = {
  register: `${GOV_SERVICES}/registrar-se-como-estrangeiro-no-brasil`,
  cpf: `${GOV_SERVICES}/inscrever-no-cpf`,
  immigrantServices: {
    pt: 'https://www.gov.br/pt-br/temas/servicos-para-imigrantes',
    es: 'https://www.gov.br/pt-br/temas/servicios-para-inmigrantes',
    en: 'https://www.gov.br/pt-br/temas/immigration-public-services',
  },
  ctps: 'https://www.gov.br/trabalho-e-emprego/pt-br/servicos/trabalhador/carteira-de-trabalho',
  meuSus: 'https://meususdigital.saude.gov.br/',
  residence: `${GOV_SERVICES}/obter-autorizacao-de-residencia-e-carteira-de-registro-migratorio`,
  refuge: `${GOV_SERVICES}/solicitar-refugio`,
  naturalization: `${GOV_SERVICES}/solicitar-naturalizacao`,
  extend: `${GOV_SERVICES}/prorrogar-estada-no-brasil`,
  visas: 'https://www.gov.br/mre/pt-br/assuntos/portal-consular/vistos',
  diploma: 'https://plataformacarolinabori.mec.gov.br/',
  pf: { pt: `${PF}/inicio`, es: `${PF}/es`, en: `${PF}/en` },
  prefeitura: 'https://www.pmf.sc.gov.br/',
  dpu: 'https://www.dpu.def.br/',
  acnur: 'https://help.unhcr.org/brazil/',
  circulos: 'https://circulosdehospitalidade.org/',
};

const guides: Record<LanguageCode, ImmigrationGuide> = {
  pt: {
    eyebrow: 'GUIA DO IMIGRANTE · FLORIANÓPOLIS E SC',
    title: 'Documentos e regularização no Brasil',
    intro:
      'Um roteiro simples para quem chegou ou está chegando a Santa Catarina: quais documentos tirar, quais caminhos existem para se regularizar e onde pedir ajuda. Todos os botões levam aos sites oficiais.',
    notice:
      'Informação geral e de caráter educativo. Regras, prazos, taxas e exigências mudam; confirme sempre no site oficial antes de agir. Esta página não substitui orientação jurídica.',
    stepsTitle: 'Primeiros passos',
    stepsIntro: 'A ordem pode variar conforme o seu caso, mas estes são os documentos e cadastros mais usados no dia a dia.',
    steps: [
      {
        title: 'Regularize sua situação migratória',
        text: 'Descubra qual é a sua situação (visto, autorização de residência, pedido de refúgio) e faça o registro na Polícia Federal, órgão responsável pela Carteira de Registro Nacional Migratório (CRNM).',
        url: urls.register,
      },
      {
        title: 'Faça o CPF',
        text: 'O CPF é necessário para trabalhar, abrir conta em banco, alugar um imóvel e usar muitos serviços. A inscrição é feita na Receita Federal e em instituições parceiras.',
        url: urls.cpf,
      },
      {
        title: 'Crie sua conta gov.br',
        text: 'A conta gov.br dá acesso a serviços públicos digitais. Veja a página oficial com todos os serviços para imigrantes.',
        url: urls.immigrantServices.pt,
      },
      {
        title: 'Carteira de Trabalho',
        text: 'Com a situação migratória regular, você pode obter a Carteira de Trabalho (digital) e trabalhar com carteira assinada. Quem solicita refúgio também pode pedir o documento.',
        url: urls.ctps,
      },
      {
        title: 'Saúde: Cartão SUS',
        text: 'O SUS atende também imigrantes. Procure o posto de saúde do seu bairro e peça o Cartão SUS. O aplicativo Meu SUS Digital reúne seu histórico.',
        url: urls.meuSus,
      },
    ],
    pathsTitle: 'Caminhos para se legalizar',
    pathsIntro: 'Cada caminho tem regras próprias. Leia o resumo e abra o site oficial para ver requisitos, taxas e como pedir.',
    paths: [
      {
        id: 'residencia',
        tag: 'RESIDÊNCIA',
        title: 'Autorização de residência',
        who: 'Quem quer morar no Brasil por trabalho, reunião familiar, estudo, acolhida humanitária, pesquisa, investimento e outros motivos. Nacionais de países do Mercosul e associados têm regras específicas.',
        text: 'Depois de aprovada, a pessoa recebe a Carteira de Registro Nacional Migratório (CRNM), que funciona como documento de identidade de estrangeiro.',
        url: urls.residence,
      },
      {
        id: 'refugio',
        tag: 'REFÚGIO',
        title: 'Pedido de refúgio',
        who: 'Quem não pode voltar ao país de origem por perseguição (raça, religião, nacionalidade, opinião política, grupo social) ou grave violação de direitos humanos.',
        text: 'O pedido é gratuito e pode ser feito junto à Polícia Federal. Durante a análise, a pessoa recebe um protocolo provisório e pode trabalhar.',
        url: urls.refuge,
      },
      {
        id: 'visto',
        tag: 'VISTOS',
        title: 'Vistos e prorrogação de estada',
        who: 'Quem entra como visitante (turismo, negócios) ou precisa de visto para entrar. O visto de visita não dá direito a residir nem a trabalhar com vínculo.',
        text: 'Consulte o Ministério das Relações Exteriores sobre o tipo de visto e, se já estiver no país, veja como pedir prorrogação do prazo de estada.',
        url: urls.visas,
      },
      {
        id: 'naturalizacao',
        tag: 'NATURALIZAÇÃO',
        title: 'Naturalização brasileira',
        who: 'Quem quer se tornar brasileiro. Em geral é preciso ter residência por tempo mínimo, comunicar-se em português e não ter condenação penal. Há prazos reduzidos em alguns casos.',
        text: 'O pedido é feito pelos canais oficiais do Ministério da Justiça e da Polícia Federal.',
        url: urls.naturalization,
      },
      {
        id: 'diploma',
        tag: 'ESTUDOS',
        title: 'Reconhecer diploma estrangeiro',
        who: 'Quem tem curso superior feito fora do Brasil e quer exercer a profissão ou continuar os estudos.',
        text: 'A revalidação de diplomas é feita por universidades públicas, pela Plataforma Carolina Bori, do Ministério da Educação.',
        url: urls.diploma,
      },
    ],
    docsTitle: 'Documentos que costumam ser pedidos',
    docsIntro: 'A lista muda conforme o tipo de pedido. Estes são os mais comuns.',
    docs: [
      'Passaporte ou outro documento de viagem válido',
      'Certidão de nascimento e, se for o caso, de casamento ou de união estável',
      'Tradução juramentada e apostilamento (ou legalização) dos documentos estrangeiros, quando exigidos',
      'Certidão de antecedentes criminais do país de origem',
      'Comprovante de endereço no Brasil',
      'Fotografia, conforme o padrão informado no pedido',
      'Comprovante de pagamento das taxas (GRU), quando houver',
      'Documentos do motivo do pedido: contrato de trabalho, matrícula, comprovante de parentesco, entre outros',
    ],
    docsNote: 'Guarde cópias digitais de todos os documentos e protocolos. Eles facilitam qualquer novo pedido.',
    localTitle: 'Onde buscar ajuda em Florianópolis e SC',
    localIntro: 'Órgãos públicos e organizações que atendem imigrantes na região.',
    local: [
      { name: 'Polícia Federal · Florianópolis', role: 'REGISTRO E CRNM', text: 'Responsável pelo registro migratório e pela carteira de estrangeiro. O atendimento é feito com agendamento; consulte o site para o passo a passo.', url: urls.pf.pt },
      { name: 'Prefeitura de Florianópolis', role: 'SAÚDE, ESCOLA E ASSISTÊNCIA', text: 'Centros de saúde, matrícula escolar e assistência social (CRAS) atendem moradores da cidade, inclusive imigrantes.', url: urls.prefeitura },
      { name: 'Defensoria Pública da União (DPU)', role: 'ORIENTAÇÃO JURÍDICA GRATUITA', text: 'Presta assistência jurídica gratuita a quem não pode pagar um advogado, incluindo imigrantes e refugiados.', url: urls.dpu },
      { name: 'ACNUR Brasil', role: 'REFUGIADOS', text: 'Agência da ONU para refugiados, com informações em vários idiomas sobre direitos, documentos e serviços no Brasil.', url: urls.acnur },
      { name: 'Círculos de Hospitalidade', role: 'ACOLHIMENTO', text: 'Organização da sociedade civil na Grande Florianópolis que apoia pessoas migrantes e refugiadas.', url: urls.circulos },
    ],
    scamTitle: 'Atenção a golpes',
    scamText: 'Desconfie de quem promete “garantir” ou acelerar sua regularização, ou cobra para marcar atendimento. Use apenas os sites oficiais, que terminam em gov.br.',
    whoLabel: 'PARA QUEM',
    officialSite: 'Site oficial',
    openStep: 'Abrir site oficial',
  },

  es: {
    eyebrow: 'GUÍA DEL INMIGRANTE · FLORIANÓPOLIS Y SC',
    title: 'Documentos y regularización en Brasil',
    intro:
      'Una hoja de ruta sencilla para quienes llegaron o están llegando a Santa Catarina: qué documentos tramitar, qué caminos existen para regularizarse y dónde pedir ayuda. Todos los botones llevan a sitios oficiales.',
    notice:
      'Información general de carácter educativo. Las reglas, plazos, tasas y requisitos cambian; confirme siempre en el sitio oficial antes de actuar. Esta página no sustituye la orientación jurídica.',
    stepsTitle: 'Primeros pasos',
    stepsIntro: 'El orden puede variar según su caso, pero estos son los documentos y registros más usados en el día a día.',
    steps: [
      {
        title: 'Regularice su situación migratoria',
        text: 'Averigüe cuál es su situación (visa, autorización de residencia, solicitud de refugio) y haga el registro en la Policía Federal, responsable de la Carteira de Registro Nacional Migratório (CRNM).',
        url: urls.register,
      },
      {
        title: 'Tramite el CPF',
        text: 'El CPF es necesario para trabajar, abrir una cuenta bancaria, alquilar un inmueble y usar muchos servicios. La inscripción se hace en la Receita Federal y en instituciones asociadas.',
        url: urls.cpf,
      },
      {
        title: 'Cree su cuenta gov.br',
        text: 'La cuenta gov.br da acceso a servicios públicos digitales. Vea la página oficial con todos los servicios para inmigrantes.',
        url: urls.immigrantServices.es,
      },
      {
        title: 'Carteira de Trabalho (libreta de trabajo)',
        text: 'Con la situación migratoria regular, puede obtener la Carteira de Trabalho (digital) y trabajar con contrato formal. Quienes solicitan refugio también pueden pedirla.',
        url: urls.ctps,
      },
      {
        title: 'Salud: Tarjeta SUS',
        text: 'El SUS (sistema público de salud) también atiende a inmigrantes. Acuda al centro de salud de su barrio y pida la Tarjeta SUS. La aplicación Meu SUS Digital reúne su historial.',
        url: urls.meuSus,
      },
    ],
    pathsTitle: 'Caminos para regularizarse',
    pathsIntro: 'Cada camino tiene reglas propias. Lea el resumen y abra el sitio oficial para ver requisitos, tasas y cómo solicitarlo.',
    paths: [
      {
        id: 'residencia',
        tag: 'RESIDENCIA',
        title: 'Autorización de residencia',
        who: 'Quien desea vivir en Brasil por trabajo, reunión familiar, estudios, acogida humanitaria, investigación, inversión y otros motivos. Los nacionales de países del Mercosur y asociados tienen reglas específicas.',
        text: 'Una vez aprobada, la persona recibe la Carteira de Registro Nacional Migratório (CRNM), que funciona como documento de identidad de extranjero.',
        url: urls.residence,
      },
      {
        id: 'refugio',
        tag: 'REFUGIO',
        title: 'Solicitud de refugio',
        who: 'Quien no puede volver a su país por persecución (raza, religión, nacionalidad, opinión política, grupo social) o grave violación de derechos humanos.',
        text: 'La solicitud es gratuita y se presenta ante la Policía Federal. Durante el análisis, la persona recibe un protocolo provisional y puede trabajar.',
        url: urls.refuge,
      },
      {
        id: 'visto',
        tag: 'VISAS',
        title: 'Visas y prórroga de estadía',
        who: 'Quien entra como visitante (turismo, negocios) o necesita visa para ingresar. La visa de visita no da derecho a residir ni a trabajar con vínculo laboral.',
        text: 'Consulte al Ministerio de Relaciones Exteriores sobre el tipo de visa y, si ya está en el país, vea cómo pedir la prórroga del plazo de estadía.',
        url: urls.visas,
      },
      {
        id: 'naturalizacao',
        tag: 'NATURALIZACIÓN',
        title: 'Naturalización brasileña',
        who: 'Quien desea hacerse brasileño. En general se exige residencia por un tiempo mínimo, comunicarse en portugués y no tener condena penal. Hay plazos reducidos en algunos casos.',
        text: 'La solicitud se hace por los canales oficiales del Ministerio de Justicia y de la Policía Federal.',
        url: urls.naturalization,
      },
      {
        id: 'diploma',
        tag: 'ESTUDIOS',
        title: 'Reconocer un título extranjero',
        who: 'Quien tiene estudios superiores hechos fuera de Brasil y quiere ejercer su profesión o continuar estudiando.',
        text: 'La revalidación de títulos la realizan universidades públicas, a través de la Plataforma Carolina Bori, del Ministerio de Educación.',
        url: urls.diploma,
      },
    ],
    docsTitle: 'Documentos que suelen pedirse',
    docsIntro: 'La lista cambia según el tipo de solicitud. Estos son los más comunes.',
    docs: [
      'Pasaporte u otro documento de viaje válido',
      'Acta de nacimiento y, si corresponde, de matrimonio o de unión estable',
      'Traducción jurada y apostilla (o legalización) de los documentos extranjeros, cuando se exijan',
      'Certificado de antecedentes penales del país de origen',
      'Comprobante de domicilio en Brasil',
      'Fotografía, según el estándar indicado en la solicitud',
      'Comprobante de pago de las tasas (GRU), cuando existan',
      'Documentos del motivo de la solicitud: contrato de trabajo, matrícula, comprobante de parentesco, entre otros',
    ],
    docsNote: 'Guarde copias digitales de todos los documentos y protocolos. Facilitan cualquier nueva solicitud.',
    localTitle: 'Dónde buscar ayuda en Florianópolis y SC',
    localIntro: 'Organismos públicos y organizaciones que atienden a inmigrantes en la región.',
    local: [
      { name: 'Policía Federal · Florianópolis', role: 'REGISTRO Y CRNM', text: 'Responsable del registro migratorio y de la cédula de extranjero. La atención es con cita previa; consulte el sitio para ver el paso a paso.', url: urls.pf.es },
      { name: 'Prefeitura de Florianópolis (Alcaldía)', role: 'SALUD, ESCUELA Y ASISTENCIA', text: 'Centros de salud, matrícula escolar y asistencia social (CRAS) atienden a los residentes de la ciudad, incluidos los inmigrantes.', url: urls.prefeitura },
      { name: 'Defensoría Pública de la Unión (DPU)', role: 'ORIENTACIÓN JURÍDICA GRATUITA', text: 'Presta asistencia jurídica gratuita a quienes no pueden pagar un abogado, incluidos inmigrantes y refugiados.', url: urls.dpu },
      { name: 'ACNUR Brasil', role: 'REFUGIADOS', text: 'Agencia de la ONU para los refugiados, con información en varios idiomas sobre derechos, documentos y servicios en Brasil.', url: urls.acnur },
      { name: 'Círculos de Hospitalidade', role: 'ACOGIDA', text: 'Organización de la sociedad civil en la Gran Florianópolis que apoya a personas migrantes y refugiadas.', url: urls.circulos },
    ],
    scamTitle: 'Cuidado con las estafas',
    scamText: 'Desconfíe de quien promete “garantizar” o acelerar su regularización, o cobra por conseguir una cita. Use solo los sitios oficiales, que terminan en gov.br.',
    whoLabel: 'PARA QUIÉN',
    officialSite: 'Sitio oficial',
    openStep: 'Abrir sitio oficial',
  },

  en: {
    eyebrow: 'IMMIGRANT GUIDE · FLORIANÓPOLIS & SC',
    title: 'Documents and legal status in Brazil',
    intro:
      'A simple roadmap for those who have arrived, or are arriving, in Santa Catarina: which documents to get, which paths exist to regularize your status, and where to ask for help. Every button leads to an official website.',
    notice:
      'General, educational information. Rules, deadlines, fees and requirements change; always confirm on the official website before acting. This page is not a substitute for legal advice.',
    stepsTitle: 'First steps',
    stepsIntro: 'The order may vary depending on your case, but these are the documents and registrations used most in daily life.',
    steps: [
      {
        title: 'Regularize your migration status',
        text: 'Find out your situation (visa, residence authorization, refugee claim) and register with the Federal Police, which issues the National Migration Registry Card (CRNM).',
        url: urls.register,
      },
      {
        title: 'Get your CPF',
        text: 'The CPF (taxpayer number) is needed to work, open a bank account, rent a home and use many services. You can register at the Federal Revenue Service and partner institutions.',
        url: urls.cpf,
      },
      {
        title: 'Create your gov.br account',
        text: 'A gov.br account gives you access to digital public services. See the official page listing all services for immigrants.',
        url: urls.immigrantServices.en,
      },
      {
        title: 'Work permit card (Carteira de Trabalho)',
        text: 'With a regular migration status, you can get the (digital) Carteira de Trabalho and work formally. Refugee claimants can also request it.',
        url: urls.ctps,
      },
      {
        title: 'Health: SUS card',
        text: 'Brazil’s public health system (SUS) also serves immigrants. Go to your neighborhood health center and ask for the SUS card. The Meu SUS Digital app keeps your health records.',
        url: urls.meuSus,
      },
    ],
    pathsTitle: 'Paths to legal status',
    pathsIntro: 'Each path has its own rules. Read the summary and open the official website for requirements, fees and how to apply.',
    paths: [
      {
        id: 'residencia',
        tag: 'RESIDENCE',
        title: 'Residence authorization',
        who: 'People who want to live in Brazil for work, family reunification, study, humanitarian reception, research, investment and other reasons. Nationals of Mercosur and associated countries have specific rules.',
        text: 'Once approved, you receive the National Migration Registry Card (CRNM), which works as a foreigner’s ID.',
        url: urls.residence,
      },
      {
        id: 'refugio',
        tag: 'REFUGE',
        title: 'Refugee claim',
        who: 'People who cannot return to their country because of persecution (race, religion, nationality, political opinion, social group) or serious human rights violations.',
        text: 'The claim is free and is filed with the Federal Police. While it is reviewed, you receive a provisional protocol and may work.',
        url: urls.refuge,
      },
      {
        id: 'visto',
        tag: 'VISAS',
        title: 'Visas and extension of stay',
        who: 'People who enter as visitors (tourism, business) or need a visa to enter. A visitor visa does not allow you to settle or hold an employment relationship.',
        text: 'Check with the Ministry of Foreign Affairs about the type of visa and, if you are already in the country, how to request an extension of stay.',
        url: urls.visas,
      },
      {
        id: 'naturalizacao',
        tag: 'CITIZENSHIP',
        title: 'Brazilian naturalization',
        who: 'People who want to become Brazilian. Generally, you need a minimum period of residence, to communicate in Portuguese and to have no criminal conviction. Shorter periods apply in some cases.',
        text: 'The application is made through the official channels of the Ministry of Justice and the Federal Police.',
        url: urls.naturalization,
      },
      {
        id: 'diploma',
        tag: 'EDUCATION',
        title: 'Recognizing a foreign degree',
        who: 'People with a university degree earned abroad who want to practice their profession or continue studying.',
        text: 'Degree revalidation is carried out by public universities through the Carolina Bori Platform of the Ministry of Education.',
        url: urls.diploma,
      },
    ],
    docsTitle: 'Documents usually required',
    docsIntro: 'The list changes depending on the type of application. These are the most common ones.',
    docs: [
      'Valid passport or other travel document',
      'Birth certificate and, if applicable, marriage or civil union certificate',
      'Sworn translation and apostille (or legalization) of foreign documents, when required',
      'Criminal record certificate from your country of origin',
      'Proof of address in Brazil',
      'Photograph, following the standard given in the application',
      'Proof of payment of fees (GRU), when applicable',
      'Documents supporting your request: employment contract, school enrollment, proof of kinship, among others',
    ],
    docsNote: 'Keep digital copies of all documents and protocol numbers. They make any new application easier.',
    localTitle: 'Where to get help in Florianópolis and SC',
    localIntro: 'Public agencies and organizations that assist immigrants in the region.',
    local: [
      { name: 'Federal Police · Florianópolis', role: 'REGISTRATION & CRNM', text: 'Responsible for migration registration and the foreigner’s ID card. Service is by appointment; check the website for step-by-step instructions.', url: urls.pf.en },
      { name: 'Florianópolis City Hall (Prefeitura)', role: 'HEALTH, SCHOOL & SOCIAL SERVICES', text: 'Health centers, school enrollment and social assistance (CRAS) serve city residents, including immigrants.', url: urls.prefeitura },
      { name: 'Federal Public Defender’s Office (DPU)', role: 'FREE LEGAL ADVICE', text: 'Provides free legal assistance to people who cannot afford a lawyer, including immigrants and refugees.', url: urls.dpu },
      { name: 'UNHCR Brazil', role: 'REFUGEES', text: 'The UN Refugee Agency, with information in several languages about rights, documents and services in Brazil.', url: urls.acnur },
      { name: 'Círculos de Hospitalidade', role: 'WELCOME & SUPPORT', text: 'A civil society organization in Greater Florianópolis that supports migrants and refugees.', url: urls.circulos },
    ],
    scamTitle: 'Beware of scams',
    scamText: 'Be wary of anyone who promises to “guarantee” or speed up your legal status, or charges for booking an appointment. Use only official websites, which end in gov.br.',
    whoLabel: 'WHO IT IS FOR',
    officialSite: 'Official website',
    openStep: 'Open official website',
  },
};

export function getImmigrationGuide(language: LanguageCode): ImmigrationGuide {
  return guides[language];
}
