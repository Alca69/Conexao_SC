import type { ImageSource } from 'expo-image';
import type { LanguageCode } from '@/constants/i18n';

export type NewsArticle = {
  id: string;
  category: string;
  primaryTag: string;
  secondaryTags: string[];
  city: string;
  title: string;
  summary: string;
  body: string;
  image: ImageSource;
  readingTime: string;
  /** Autoria fictícia, apenas para demonstração */
  author: string;
  /** Data/hora de publicação em ISO 8601 */
  publishedAt: string;
};

type RawArticle = Omit<NewsArticle, 'author' | 'publishedAt'>;

const photos = {
  comunidade: require('../../images/pmf-6.jpeg'),
  trabalho: require('@/assets/images/news/trabalho.jpg'),
  moradia: require('@/assets/images/news/moradia.jpg'),
  educacao: require('@/assets/images/news/educacao.jpg'),
  cultura: require('@/assets/images/news/cultura.jpg'),
  mapa: require('@/assets/images/news/cidade.jpg'),
};

// Histórias e iniciativas inventadas exclusivamente para demonstrar o MVP.
const rawNews: RawArticle[] = [
  { id: 'acolhimento', category: 'Comunidade', primaryTag: 'Notícias', secondaryTags: ['Comunidade', 'Integração'], city: 'Florianópolis', title: 'Um novo começo: encontro conecta imigrantes à comunidade local', summary: 'Troca de experiências, novos vínculos e espaço para quem está chegando a Santa Catarina.', body: 'Nesta história fictícia, famílias de diferentes países se reúnem em um centro comunitário de Florianópolis para compartilhar experiências sobre a chegada ao estado. O encontro imaginário inclui rodas de conversa, atividades culturais e uma mesa coletiva com receitas trazidas pelos participantes.\n\nA programação de exemplo aproxima quem acaba de chegar de quem já construiu sua rotina na cidade. Entre relatos de adaptação e novas amizades, a comunidade encontra um espaço para se conhecer e trocar histórias.', image: photos.comunidade, readingTime: '3 min' },
  { id: 'portugues', category: 'Educação', primaryTag: 'Notícias', secondaryTags: ['Educação', 'Português'], city: 'Joinville', title: 'Português no dia a dia: aulas imaginárias aproximam culturas', summary: 'Conversas sobre transporte, compras e trabalho fazem parte da proposta de aprendizagem.', body: 'No cenário fictício desta notícia, uma turma de português em Joinville aprende com situações do cotidiano. As atividades incluem conversas em pequenos grupos e leitura de placas e anúncios.\n\nA iniciativa inventada para o MVP valoriza os diferentes idiomas dos participantes. Cada encontro termina com uma troca de expressões e histórias dos países de origem.', image: photos.educacao, readingTime: '2 min' },
  { id: 'trabalho', category: 'Trabalho', primaryTag: 'Notícias', secondaryTags: ['Trabalho', 'Empregabilidade'], city: 'Chapecó', title: 'Feira de talentos celebra experiências profissionais de quem chegou de fora', summary: 'Um evento fictício abre espaço para apresentar habilidades e compartilhar trajetórias.', body: 'Nesta demonstração, profissionais imigrantes participam de uma feira imaginária em Chapecó. Oficinas de apresentação pessoal e conversas sobre trajetórias de trabalho compõem a programação.\n\nO evento de exemplo mostra a diversidade de talentos da comunidade, da gastronomia à tecnologia. Não representa vagas ou inscrições reais.', image: photos.trabalho, readingTime: '3 min' },
  { id: 'moradia', category: 'Moradia', primaryTag: 'Finanças & Moradia', secondaryTags: ['Moradia', 'Convivência'], city: 'Blumenau', title: 'Vizinhos organizam roda de conversa sobre a vida nos bairros', summary: 'Moradores compartilham histórias sobre adaptação, convivência e pertencimento.', body: 'A história fictícia acompanha um encontro de vizinhos em Blumenau. Pessoas que chegaram recentemente à cidade conversam com moradores antigos sobre os espaços de convivência dos bairros.\n\nO encontro imaginário termina com um passeio pela região e uma troca de relatos sobre o que faz uma casa se tornar um lar. Não há oferta real de imóveis nesta publicação.', image: photos.moradia, readingTime: '2 min' },
  { id: 'cultura', category: 'Cultura', primaryTag: 'Vivência', secondaryTags: ['Cultura', 'Gastronomia'], city: 'São José', title: 'Festival de sabores leva receitas de diferentes países à mesma mesa', summary: 'Comida e música criam pontes entre a comunidade catarinense e novas culturas.', body: 'Neste festival inventado, famílias de São José apresentam pratos inspirados em suas origens. Cada receita vem acompanhada de uma história sobre celebrações, memórias e encontros.\n\nA programação fictícia inclui música e oficinas culinárias. O texto serve apenas para demonstrar uma notícia cultural no aplicativo.', image: photos.cultura, readingTime: '3 min' },
  { id: 'documentos', category: 'Documentação', primaryTag: 'Vida pública', secondaryTags: ['Documentação', 'Serviços públicos'], city: 'Criciúma', title: 'Biblioteca recebe encontro fictício sobre organização de documentos', summary: 'A proposta imaginária reúne perguntas e experiências de quem está construindo uma nova rotina.', body: 'Nesta notícia de demonstração, uma biblioteca de Criciúma recebe uma roda de conversa sobre organização pessoal. Os participantes compartilham maneiras de guardar papéis e anotar compromissos.\n\nO encontro é fictício e não oferece atendimento, prazos ou instruções sobre processos migratórios. A história ilustra os assuntos que poderão aparecer nesta seção.', image: photos.mapa, readingTime: '2 min' },
  { id: 'financas', category: 'Finanças', primaryTag: 'Finanças & Moradia', secondaryTags: ['Finanças', 'Planejamento'], city: 'Itajaí', title: 'Histórias sobre o primeiro mês em SC inspiram conversa sobre a rotina', summary: 'Um encontro de exemplo aborda escolhas do cotidiano e adaptação a uma nova cidade.', body: 'No cenário imaginário desta publicação, moradores de Itajaí compartilham histórias sobre suas primeiras semanas em Santa Catarina. Transporte, alimentação e hábitos de compra aparecem nas conversas.\n\nA proposta fictícia dá espaço às experiências de cada família, sem apresentar recomendações financeiras ou serviços reais.', image: photos.trabalho, readingTime: '2 min' },
  { id: 'familias', category: 'Comunidade', primaryTag: 'Vivência', secondaryTags: ['Comunidade', 'Família'], city: 'Lages', title: 'Piquenique multicultural aproxima famílias na Serra Catarinense', summary: 'Brincadeiras e histórias fazem parte de uma tarde imaginária de integração.', body: 'Nesta história fictícia, famílias se encontram em um parque de Lages para um piquenique multicultural. Crianças compartilham brincadeiras e os adultos contam histórias de suas cidades de origem.\n\nO encontro inventado termina com uma fotografia coletiva e a vontade de repetir a experiência. Não existe programação real vinculada ao texto.', image: photos.comunidade, readingTime: '2 min' },
  { id: 'leitura', category: 'Educação', primaryTag: 'Notícias', secondaryTags: ['Educação', 'Leitura'], city: 'Florianópolis', title: 'Clube de leitura dá espaço a histórias em vários idiomas', summary: 'Livros e relatos pessoais se encontram em uma iniciativa fictícia na capital.', body: 'O clube imaginário reúne leitores em Florianópolis para compartilhar pequenos trechos em português e em seus idiomas de origem. A atividade de exemplo valoriza a escuta e as diferentes formas de contar histórias.\n\nCada participante apresenta uma palavra que considera especial. A notícia foi criada exclusivamente para preencher o MVP.', image: photos.educacao, readingTime: '2 min' },
  { id: 'empreender', category: 'Trabalho', primaryTag: 'Finanças & Moradia', secondaryTags: ['Empreendedorismo', 'Trabalho'], city: 'Balneário Camboriú', title: 'Mostra criativa apresenta projetos de imigrantes e moradores locais', summary: 'Artesanato, design e gastronomia aparecem lado a lado nesta exposição de exemplo.', body: 'Nesta mostra fictícia, criadores apresentam pequenos projetos e contam o que os inspirou a começar. O encontro imaginário reúne pessoas de diferentes origens em Balneário Camboriú.\n\nA proposta demonstra uma notícia sobre talentos e iniciativas locais. Não se trata de uma feira real nem de uma oferta comercial.', image: photos.cultura, readingTime: '3 min' },
  { id: 'bairro', category: 'Moradia', primaryTag: 'Finanças & Moradia', secondaryTags: ['Moradia', 'Horta', 'Bairro'], city: 'Joinville', title: 'Horta compartilhada transforma quintal em espaço de convivência', summary: 'Uma história fictícia sobre cuidar, aprender e criar vínculos no bairro.', body: 'No cenário desta demonstração, vizinhos de Joinville criam uma pequena horta compartilhada. Cada família contribui com conhecimentos e histórias sobre o cultivo em seu país ou região.\n\nO projeto imaginário aproxima moradores novos e antigos. A publicação foi escrita para exemplificar conteúdos sobre convivência e moradia.', image: photos.moradia, readingTime: '2 min' },
  { id: 'musica', category: 'Cultura', primaryTag: 'Vivência', secondaryTags: ['Cultura', 'Música'], city: 'Chapecó', title: 'Encontro musical mistura ritmos e celebra diferentes origens', summary: 'Uma programação imaginária mostra como a música pode aproximar pessoas.', body: 'Nesta notícia fictícia, um espaço comunitário de Chapecó recebe músicos amadores de diferentes países. O repertório imaginário alterna canções conhecidas e composições próprias.\n\nEntre uma apresentação e outra, os participantes contam a história de seus instrumentos. Não há evento ou ingressos reais associados a esta publicação.', image: photos.cultura, readingTime: '2 min' },
];

// Autoria e horários fictícios, gerados em relação ao momento atual para a edição parecer sempre atualizada.
const authors = ['Redação Conexão SC', 'Marina Duarte', 'Redação Conexão SC', 'Lucas Brandão', 'Helena Voss', 'Redação Conexão SC'];
const hoursAgo = [2, 5, 9, 20, 30, 46, 52, 75, 98, 120, 150, 190];

export const news: NewsArticle[] = rawNews.map((article, index) => ({
  ...article,
  author: authors[index % authors.length],
  publishedAt: new Date(Date.now() - (hoursAgo[index] ?? 200) * 3_600_000).toISOString(),
}));

const publishedCopy: Record<LanguageCode, { hours: (n: number) => string; yesterday: string; locale: string }> = {
  pt: { hours: (n) => `há ${n} h`, yesterday: 'Ontem', locale: 'pt-BR' },
  es: { hours: (n) => `hace ${n} h`, yesterday: 'Ayer', locale: 'es-ES' },
  en: { hours: (n) => `${n}h ago`, yesterday: 'Yesterday', locale: 'en-GB' },
};

/** "há 3 h", "Ontem" ou "18 nov." conforme a idade da matéria. */
export function formatPublished(iso: string, language: LanguageCode): string {
  const copy = publishedCopy[language];
  const hours = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000));
  if (hours < 24) return copy.hours(hours);
  if (hours < 48) return copy.yesterday;
  return new Date(iso).toLocaleDateString(copy.locale, { day: 'numeric', month: 'short' });
}

/** Data de hoje por extenso, para o cabeçalho de jornal. */
export function formatToday(language: LanguageCode): string {
  const text = new Date().toLocaleDateString(publishedCopy[language].locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return text.charAt(0).toUpperCase() + text.slice(1);
}


export const primaryCategories = ['Todas', 'Notícias', 'Finanças & Moradia', 'Vivência', 'Vida pública'] as const;
export const secondaryCategories = [
  'Comunidade',
  'Educação',
  'Trabalho',
  'Moradia',
  'Finanças',
  'Cultura',
  'Documentação',
  'Serviços públicos',
  'Empreendedorismo',
  'Português',
  'Família',
  'Leitura',
  'Música',
  'Gastronomia',
  'Planejamento',
];

type ArticleCopy = Pick<NewsArticle, 'category' | 'primaryTag' | 'secondaryTags' | 'title' | 'summary' | 'body'>;

const categoryCopies: Record<LanguageCode, { all: string; primary: string[]; secondary: string[] }> = {
  pt: { all: 'Todas', primary: ['Notícias', 'Finanças & Moradia', 'Vivência', 'Vida pública'], secondary: secondaryCategories },
  es: {
    all: 'Todas',
    primary: ['Noticias', 'Finanzas y vivienda', 'Vida cotidiana', 'Vida pública'],
    secondary: ['Comunidad', 'Educación', 'Trabajo', 'Vivienda', 'Finanzas', 'Cultura', 'Documentación', 'Servicios públicos', 'Emprendimiento', 'Portugués', 'Familia', 'Lectura', 'Música', 'Gastronomía', 'Planificación'],
  },
  en: {
    all: 'All',
    primary: ['News', 'Finance & Housing', 'Everyday life', 'Public life'],
    secondary: ['Community', 'Education', 'Work', 'Housing', 'Finance', 'Culture', 'Documentation', 'Public services', 'Entrepreneurship', 'Portuguese', 'Family', 'Reading', 'Music', 'Gastronomy', 'Planning'],
  },
};

const articleCopies: Record<Exclude<LanguageCode, 'pt'>, Record<string, ArticleCopy>> = {
  es: {
    acolhimento: { category: 'Comunidad', primaryTag: 'Noticias', secondaryTags: ['Comunidad', 'Integración'], title: 'Un nuevo comienzo: un encuentro conecta a inmigrantes con la comunidad local', summary: 'Intercambio de experiencias, nuevos vínculos y un espacio para quienes llegan a Santa Catarina.', body: 'En esta historia ficticia, familias de distintos países se reúnen en un centro comunitario de Florianópolis para compartir experiencias sobre su llegada al estado. El encuentro imaginario incluye conversaciones, actividades culturales y una mesa colectiva con recetas de los participantes.\n\nLa propuesta acerca a quienes acaban de llegar a quienes ya construyeron su rutina en la ciudad. Entre relatos de adaptación y nuevas amistades, la comunidad encuentra un espacio para conocerse y compartir historias.' },
    portugues: { category: 'Educación', primaryTag: 'Noticias', secondaryTags: ['Educación', 'Portugués'], title: 'Portugués cotidiano: clases imaginarias acercan culturas', summary: 'Conversaciones sobre transporte, compras y trabajo forman parte de la propuesta de aprendizaje.', body: 'En el escenario ficticio de esta noticia, una clase de portugués en Joinville aprende con situaciones cotidianas. Las actividades incluyen conversaciones en grupos pequeños y la lectura de carteles y anuncios.\n\nLa iniciativa inventada para el MVP valora los distintos idiomas de los participantes. Cada encuentro termina con un intercambio de expresiones e historias de los países de origen.' },
    trabalho: { category: 'Trabajo', primaryTag: 'Noticias', secondaryTags: ['Trabajo', 'Empleabilidad'], title: 'Feria de talentos celebra las experiencias profesionales de quienes llegaron de fuera', summary: 'Un evento ficticio abre espacio para presentar habilidades y compartir trayectorias.', body: 'En esta demostración, profesionales inmigrantes participan en una feria imaginaria en Chapecó. Talleres de presentación personal y conversaciones sobre trayectorias de trabajo forman parte del programa.\n\nEl evento de ejemplo muestra la diversidad de talentos de la comunidad, desde la gastronomía hasta la tecnología. No representa vacantes ni inscripciones reales.' },
    moradia: { category: 'Vivienda', primaryTag: 'Finanzas y vivienda', secondaryTags: ['Vivienda', 'Convivencia'], title: 'Vecinos organizan una conversación sobre la vida en los barrios', summary: 'Residentes comparten historias de adaptación, convivencia y pertenencia.', body: 'La historia ficticia acompaña un encuentro de vecinos en Blumenau. Personas que llegaron recientemente conversan con residentes antiguos sobre los espacios de convivencia de los barrios.\n\nEl encuentro imaginario termina con un paseo por la región y relatos sobre lo que convierte una casa en un hogar. No hay ofertas reales de inmuebles en esta publicación.' },
    cultura: { category: 'Cultura', primaryTag: 'Vida cotidiana', secondaryTags: ['Cultura', 'Gastronomía'], title: 'Festival de sabores reúne recetas de distintos países en una misma mesa', summary: 'La comida y la música crean puentes entre la comunidad catarinense y nuevas culturas.', body: 'En este festival inventado, familias de São José presentan platos inspirados en sus orígenes. Cada receta viene acompañada de una historia sobre celebraciones, recuerdos y encuentros.\n\nEl programa ficticio incluye música y talleres de cocina. El texto solo sirve para demostrar una noticia cultural en la aplicación.' },
    documentos: { category: 'Documentación', primaryTag: 'Vida pública', secondaryTags: ['Documentación', 'Servicios públicos'], title: 'Biblioteca recibe un encuentro sobre la organización de documentos', summary: 'La propuesta imaginaria reúne preguntas y experiencias de quienes construyen una nueva rutina.', body: 'En esta noticia de demostración, una biblioteca de Criciúma recibe una conversación sobre organización personal. Los participantes comparten formas de guardar documentos y anotar compromisos.\n\nEl encuentro es ficticio y no ofrece atención ni instrucciones sobre procesos migratorios. La historia ilustra los temas que podrán aparecer en esta sección.' },
    financas: { category: 'Finanzas', primaryTag: 'Finanzas y vivienda', secondaryTags: ['Finanzas', 'Planificación'], title: 'Historias del primer mes en SC inspiran una conversación sobre la rutina', summary: 'Un encuentro de ejemplo aborda decisiones cotidianas y adaptación a una nueva ciudad.', body: 'En el escenario imaginario de esta publicación, residentes de Itajaí comparten historias sobre sus primeras semanas en Santa Catarina. Transporte, alimentación y hábitos de compra aparecen en las conversaciones.\n\nLa propuesta ficticia da espacio a las experiencias de cada familia, sin ofrecer recomendaciones financieras ni servicios reales.' },
    familias: { category: 'Comunidad', primaryTag: 'Vida cotidiana', secondaryTags: ['Comunidad', 'Familia'], title: 'Picnic multicultural acerca a familias en la Serra Catarinense', summary: 'Juegos e historias forman parte de una tarde imaginaria de integración.', body: 'En esta historia ficticia, familias se encuentran en un parque de Lages para un picnic multicultural. Los niños comparten juegos y los adultos cuentan historias de sus ciudades de origen.\n\nEl encuentro inventado termina con una fotografía colectiva y el deseo de repetir la experiencia. No existe un programa real vinculado al texto.' },
    leitura: { category: 'Educación', primaryTag: 'Noticias', secondaryTags: ['Educación', 'Lectura'], title: 'Club de lectura da espacio a historias en varios idiomas', summary: 'Libros y relatos personales se encuentran en una iniciativa ficticia en la capital.', body: 'El club imaginario reúne lectores en Florianópolis para compartir pequeños fragmentos en portugués y en sus idiomas de origen. La actividad de ejemplo valora la escucha y las distintas formas de contar historias.\n\nCada participante presenta una palabra que considera especial. La noticia fue creada exclusivamente para completar el MVP.' },
    empreender: { category: 'Trabajo', primaryTag: 'Finanzas y vivienda', secondaryTags: ['Emprendimiento', 'Trabajo'], title: 'Muestra creativa presenta proyectos de inmigrantes y residentes locales', summary: 'Artesanía, diseño y gastronomía aparecen juntos en esta exposición de ejemplo.', body: 'En esta muestra ficticia, creadores presentan pequeños proyectos y cuentan qué los inspiró a comenzar. El encuentro imaginario reúne personas de distintos orígenes en Balneário Camboriú.\n\nLa propuesta demuestra una noticia sobre talentos e iniciativas locales. No es una feria real ni una oferta comercial.' },
    bairro: { category: 'Vivienda', primaryTag: 'Finanzas y vivienda', secondaryTags: ['Vivienda', 'Huerta', 'Barrio'], title: 'Huerta compartida transforma un patio en un espacio de convivencia', summary: 'Una historia ficticia sobre cuidar, aprender y crear vínculos en el barrio.', body: 'En el escenario de esta demostración, vecinos de Joinville crean una pequeña huerta compartida. Cada familia contribuye con conocimientos e historias sobre el cultivo en su país o región.\n\nEl proyecto imaginario acerca a residentes nuevos y antiguos. La publicación fue escrita para ejemplificar contenidos sobre convivencia y vivienda.' },
    musica: { category: 'Cultura', primaryTag: 'Vida cotidiana', secondaryTags: ['Cultura', 'Música'], title: 'Encuentro musical mezcla ritmos y celebra distintos orígenes', summary: 'Un programa imaginario muestra cómo la música puede acercar a las personas.', body: 'En esta noticia ficticia, un espacio comunitario de Chapecó recibe músicos aficionados de distintos países. El repertorio imaginario alterna canciones conocidas y composiciones propias.\n\nEntre una presentación y otra, los participantes cuentan la historia de sus instrumentos. No hay evento ni entradas reales asociados a esta publicación.' },
  },
  en: {
    acolhimento: { category: 'Community', primaryTag: 'News', secondaryTags: ['Community', 'Integration'], title: 'A new beginning: a gathering connects immigrants with the local community', summary: 'An exchange of experiences, new bonds and space for people arriving in Santa Catarina.', body: 'In this fictional story, families from different countries meet at a community center in Florianópolis to share experiences about arriving in the state. The imagined gathering includes conversations, cultural activities and a shared table with recipes brought by participants.\n\nThe example brings newcomers closer to people who have already built their routine in the city. Through adaptation stories and new friendships, the community finds space to meet and share stories.' },
    portugues: { category: 'Education', primaryTag: 'News', secondaryTags: ['Education', 'Portuguese'], title: 'Portuguese in everyday life: imaginary classes bring cultures closer', summary: 'Conversations about transport, shopping and work are part of the learning proposal.', body: 'In this fictional news scenario, a Portuguese class in Joinville learns through everyday situations. Activities include small-group conversations and reading signs and advertisements.\n\nThe initiative invented for the MVP values the participants’ different languages. Each meeting ends with an exchange of expressions and stories from their countries of origin.' },
    trabalho: { category: 'Work', primaryTag: 'News', secondaryTags: ['Work', 'Employability'], title: 'Talent fair celebrates the professional experiences of newcomers', summary: 'A fictional event creates space to present skills and share career journeys.', body: 'In this demonstration, immigrant professionals take part in an imaginary fair in Chapecó. Personal presentation workshops and conversations about work journeys make up the program.\n\nThe example event shows the community’s diverse talents, from gastronomy to technology. It does not represent real vacancies or registrations.' },
    moradia: { category: 'Housing', primaryTag: 'Finance & Housing', secondaryTags: ['Housing', 'Community life'], title: 'Neighbors organize a conversation about life in the neighborhoods', summary: 'Residents share stories about adaptation, community life and belonging.', body: 'The fictional story follows a neighborhood gathering in Blumenau. New residents talk with longtime neighbors about community spaces.\n\nThe imaginary gathering ends with a walk through the area and stories about what turns a house into a home. This publication contains no real property offer.' },
    cultura: { category: 'Culture', primaryTag: 'Everyday life', secondaryTags: ['Culture', 'Gastronomy'], title: 'Food festival brings recipes from different countries to one table', summary: 'Food and music build bridges between the Santa Catarina community and new cultures.', body: 'In this invented festival, families in São José present dishes inspired by their origins. Each recipe comes with a story about celebrations, memories and encounters.\n\nThe fictional program includes music and cooking workshops. The text is only meant to demonstrate cultural news in the app.' },
    documentos: { category: 'Documentation', primaryTag: 'Public life', secondaryTags: ['Documentation', 'Public services'], title: 'Library hosts a fictional meeting about organizing documents', summary: 'The imaginary proposal brings together questions and experiences from people building a new routine.', body: 'In this demonstration news story, a library in Criciúma hosts a conversation about personal organization. Participants share ways to store papers and note commitments.\n\nThe meeting is fictional and does not provide assistance, deadlines or guidance on migration processes. The story illustrates topics that may appear in this section.' },
    financas: { category: 'Finance', primaryTag: 'Finance & Housing', secondaryTags: ['Finance', 'Planning'], title: 'Stories from the first month in SC inspire a conversation about routine', summary: 'An example gathering discusses everyday choices and adapting to a new city.', body: 'In this imaginary publication, residents of Itajaí share stories about their first weeks in Santa Catarina. Transport, food and shopping habits appear in the conversations.\n\nThe fictional proposal makes room for each family’s experience without offering financial advice or real services.' },
    familias: { category: 'Community', primaryTag: 'Everyday life', secondaryTags: ['Community', 'Family'], title: 'Multicultural picnic brings families together in the mountain region', summary: 'Games and stories are part of an imaginary afternoon of integration.', body: 'In this fictional story, families meet in a park in Lages for a multicultural picnic. Children share games while adults tell stories about their home cities.\n\nThe invented gathering ends with a group photo and a wish to repeat the experience. No real program is connected to this text.' },
    leitura: { category: 'Education', primaryTag: 'News', secondaryTags: ['Education', 'Reading'], title: 'Book club makes room for stories in many languages', summary: 'Books and personal accounts meet in a fictional initiative in the capital.', body: 'The imaginary club brings readers together in Florianópolis to share short excerpts in Portuguese and their languages of origin. The example values listening and different ways of telling stories.\n\nEach participant presents a word they find special. The news was created exclusively to fill the MVP.' },
    empreender: { category: 'Work', primaryTag: 'Finance & Housing', secondaryTags: ['Entrepreneurship', 'Work'], title: 'Creative showcase presents projects by immigrants and local residents', summary: 'Crafts, design and gastronomy appear side by side in this example exhibition.', body: 'In this fictional showcase, creators present small projects and explain what inspired them to start. The imaginary gathering brings people from different backgrounds together in Balneário Camboriú.\n\nThe proposal demonstrates news about local talents and initiatives. It is not a real fair or commercial offer.' },
    bairro: { category: 'Housing', primaryTag: 'Finance & Housing', secondaryTags: ['Housing', 'Garden', 'Neighborhood'], title: 'Shared garden turns a backyard into a community space', summary: 'A fictional story about caring, learning and building neighborhood connections.', body: 'In this demonstration scenario, neighbors in Joinville create a small shared garden. Each family contributes knowledge and stories about growing plants in their country or region.\n\nThe imaginary project brings new and longtime residents together. The publication was written to illustrate content about community life and housing.' },
    musica: { category: 'Culture', primaryTag: 'Everyday life', secondaryTags: ['Culture', 'Music'], title: 'Musical gathering blends rhythms and celebrates different origins', summary: 'An imaginary program shows how music can bring people closer.', body: 'In this fictional news story, a community space in Chapecó hosts amateur musicians from different countries. The imaginary setlist alternates familiar songs and original compositions.\n\nBetween performances, participants tell the stories of their instruments. No real event or tickets are associated with this publication.' },
  },
};

export function getLocalizedCategories(language: LanguageCode) {
  return categoryCopies[language];
}

export function getLocalizedNews(language: LanguageCode): NewsArticle[] {
  if (language === 'pt') return news;
  return news.map((article) => ({ ...article, ...articleCopies[language][article.id] }));
}
