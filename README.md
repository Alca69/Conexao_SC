# Conexão SC

> Informação clara e acessível para quem chegou a Santa Catarina.

**Conexão SC** é um aplicativo de celular que reúne, em um só lugar, notícias e orientações úteis para imigrantes que vivem em Santa Catarina.

Este é um **MVP** (Produto Mínimo Viável), ou seja, a primeira versão do projeto, feita para validar a ideia. Foi desenvolvido como trabalho da faculdade [nome do curso / instituição].

---

## O problema que queremos resolver

Quem chega a um novo estado enfrenta muitas dúvidas: como regularizar documentos, onde encontrar moradia, como organizar as finanças. Muitas vezes, essas informações estão espalhadas, em linguagem difícil ou simplesmente não chegam a quem precisa.

O Conexão SC nasce para **reunir essas informações em um lugar simples, de fácil acesso e pensado para o dia a dia do imigrante**.

## O que o aplicativo faz hoje

- **Notícias:** tela inicial com 12 notícias, um destaque no topo e filtros por assunto. Ao tocar em um cartão, a pessoa lê a matéria completa.
- **Finanças, Moradia e Documentação:** três seções que já aparecem no menu, mas ainda com conteúdo provisório. Elas mostram como o app será organizado nas próximas versões.
- **Menu de navegação:** um botão no canto superior (o "menu hambúrguer") leva a todas as seções.

## Importante saber

- **Todas as notícias são fictícias**, criadas apenas para demonstração. Elas não representam eventos, vagas de emprego ou serviços reais.
- As **fotos são ilustrativas** e não retratam necessariamente Santa Catarina ou os fatos descritos. Elas vêm do banco de imagens gratuito [Unsplash](https://unsplash.com).
- Nesta versão o app é **somente para leitura**: não há login, cadastro ou configurações.
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

**Tecnologias:** Expo SDK 57 e Expo Router (React Native com TypeScript).

### Como rodar no celular

1. Instale o aplicativo **Expo Go** no celular (Android ou iPhone).
2. No computador, abra o terminal na pasta do projeto e execute:

```powershell
   npx.cmd expo start --go --clear
```

   Em outros terminais, use `npx expo start --go --clear`.

3. Leia o **QR Code** que aparecer: com o Expo Go no Android, ou com a câmera no iPhone.

O computador e o celular precisam estar **na mesma rede Wi-Fi**.

### Estrutura das telas

| Arquivo | Tela |
|---|---|
| `src/app/index.tsx` | Notícias (página inicial) |
| `src/app/financas.tsx` | Finanças (provisória) |
| `src/app/moradia.tsx` | Moradia (provisória) |
| `src/app/documentacao.tsx` | Documentação (provisória) |
| `src/app/+not-found.tsx` | Página para endereços inexistentes |
| `src/app/_layout.tsx` | Navegação e tema do aplicativo |

As notícias ficam em `src/data/news.ts` e as imagens em `assets/images/news/`.

### Verificação de qualidade do código

```powershell
npx.cmd expo lint
npx.cmd tsc --noEmit
```

### Créditos das fotos

Unsplash, IDs: `1516738901171-8eb4fc13bd20`, `1511632765486-a01980e01a18`, `1521737711867-e3b97375f902`, `1484154218962-a197022b5858`, `1503676260728-1c00da094a0b` e `1511795409834-ef04bbd61622`.
