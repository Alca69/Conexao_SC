# Conexão SC

> Informação clara e acessível para quem chegou a Santa Catarina.

**Conexão SC** é um aplicativo de celular que reúne, em um só lugar, notícias e orientações úteis para imigrantes que vivem em Santa Catarina.

Este é um **MVP** (Produto Mínimo Viável), ou seja, a primeira versão do projeto, feita para validar a ideia. Foi desenvolvido como trabalho da faculdade [nome do curso / instituição].

---

## O problema que queremos resolver

Quem chega a um novo estado enfrenta muitas dúvidas: como regularizar documentos, onde encontrar moradia, como organizar as finanças. Muitas vezes, essas informações estão espalhadas, em linguagem difícil ou simplesmente não chegam a quem precisa.

O Conexão SC nasce para **reunir essas informações em um lugar simples, de fácil acesso e pensado para o dia a dia do imigrante**.

## O que o aplicativo faz hoje

- **Notícias:** tela inicial no estilo de jornal, com manchete, destaques, "Mais lidas", filtros por assunto e busca. Ao tocar em um cartão, a pessoa lê a matéria completa.
- **Regularize-se:** guia fixo com os primeiros passos, os caminhos para se legalizar no Brasil (residência, refúgio, vistos, naturalização, diploma), documentos comuns e onde buscar ajuda em Florianópolis e Santa Catarina. Todos os botões levam a sites oficiais.
- **Finanças & Moradia, Vivência e Vida pública:** conteúdos ilustrativos e informativos, com mapas e links para fontes oficiais.
- **Três idiomas:** português, espanhol e inglês, trocados a qualquer momento.
- **Modo claro e escuro:** começa no claro; a escolha da pessoa é lembrada.
- **Telefones úteis** no rodapé (190, 192, 193 e 180), com toque para ligar.

## Importante saber

- **Todas as notícias são fictícias**, criadas apenas para demonstração. Elas não representam eventos, vagas de emprego ou serviços reais.
- As **fotos são ilustrativas** e não retratam necessariamente Santa Catarina ou os fatos descritos. Elas vêm do banco de imagens gratuito [Unsplash](https://unsplash.com).
- Nesta versão o app é **somente para leitura**: não há login nem cadastro.
- Ainda **não existe conexão com uma fonte real de notícias**. Isso faz parte dos próximos passos.

## Próximos passos

- Substituir as notícias de demonstração por conteúdo real
- Preencher as seções de Finanças, Moradia e Documentação
- Oferecer o conteúdo em outros idiomas
- Criar uma forma de atualizar as notícias sem mexer no código

## Equipe

- Roberto da Silva Martinelli da Nova

---

## Para quem quer testar ou avaliar o código

> Esta parte é técnica. Quem só quer conhecer o projeto não precisa dela.

**Tecnologias:** Expo SDK 58, Expo Router, React Native e TypeScript.

### Antes de começar

- **Node.js 22.13 ou superior** (recomendado: a versão LTS 22). O Node 20 **não** funciona. Para conferir: `node --version`. Quem usa `nvm` pode rodar `nvm use` na pasta do projeto.
- **Git** e **npm** (já vem com o Node).
- Não é preciso criar conta nem configurar chaves: o projeto não usa dados sigilosos.

### Instalar e rodar

```bash
git clone https://github.com/brunogsr/Conexao-SC.git
cd Conexao-SC
npm install
npm start
```

Funciona igual no Windows, macOS e Linux. O `npm start` abre o servidor do Expo e mostra um **QR Code** no terminal.

### Como ver o aplicativo

| Opção | Como |
|---|---|
| **No navegador** | Com o servidor rodando, aperte `w` no terminal (ou rode `npm run web`). |
| **No celular (Expo Go)** | Instale o **Expo Go versão 58** (Android ou iPhone) e leia o QR Code. Celular e computador devem estar na **mesma rede Wi-Fi**. Se não conectar, rode `npx expo start --go --tunnel`. |
| **Emulador Android** | Com o Android Studio e um dispositivo virtual abertos, rode `npm run android`. |

> Se o Expo Go mostrar *"project is incompatible with this version of Expo Go"*, o app instalado no celular não é da versão 58. Atualize o Expo Go ou baixe a versão correta em https://expo.dev/go.

### Estrutura das telas

| Arquivo | Tela |
|---|---|
| `src/app/index.tsx` | Notícias (página inicial) |
| `src/app/imigracao.tsx` | Regularize-se (guia de documentos e regularização) |
| `src/app/financas-moradia.tsx` | Finanças & Moradia |
| `src/app/vivencia.tsx` | Vivência |
| `src/app/documentacao.tsx` | Vida pública |
| `src/app/sobre.tsx` | Sobre e expediente |
| `src/app/+not-found.tsx` | Página para endereços inexistentes |
| `src/app/_layout.tsx` | Navegação e tema do aplicativo |

As notícias ficam em `src/data/news.ts`, o conteúdo do guia em `src/data/immigration.ts` e os textos traduzidos em `src/constants/i18n.ts`. As cores e o espaçamento estão em `src/constants/theme.ts`.

### Verificação de qualidade do código

```bash
npm run lint
npm run typecheck
```

### Publicar (opcional)

Exigem contas próprias (Cloudflare e Expo) e **não** são necessários para rodar o projeto.

| Comando | O que faz |
|---|---|
| `npm run build:web` | Gera o site estático na pasta `dist`. |
| `npm run deploy:web` | Gera e publica o site no Cloudflare (precisa de `npx wrangler login`). |
| `npm run build:apk` | Gera um APK Android na nuvem da Expo (precisa de `npx eas-cli login`). |

### Créditos das fotos

Unsplash, IDs: `1516738901171-8eb4fc13bd20`, `1511632765486-a01980e01a18`, `1521737711867-e3b97375f902`, `1484154218962-a197022b5858`, `1503676260728-1c00da094a0b` e `1511795409834-ef04bbd61622`.
