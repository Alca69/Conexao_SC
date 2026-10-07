# Conexão SC

Aplicativo mobile informativo para imigrantes em Santa Catarina, desenvolvido com Expo SDK 57 e Expo Router.

## Executar no Expo Go

Na pasta do projeto, execute:

```powershell
npx.cmd expo start --go --clear
```

Leia o QR Code com o Expo Go (Android) ou com a câmera (iOS). O computador e o celular devem estar na mesma rede. A rota `/` abre diretamente a página de notícias do Conexão SC.

Em outros terminais, use `npx expo start --go --clear`.

## Rotas

- `src/app/index.tsx`: página principal de notícias (`/`).
- `src/app/financas.tsx`: seção provisória de Finanças (`/financas`).
- `src/app/moradia.tsx`: seção provisória de Moradia (`/moradia`).
- `src/app/documentacao.tsx`: seção provisória de Documentação (`/documentacao`).
- `src/app/+not-found.tsx`: página para endereços inexistentes, com retorno à página principal.
- `src/app/_layout.tsx`: navegação e tema do aplicativo.

A navegação acontece pelo menu hambúrguer no cabeçalho. Notícias é a página inicial. As outras três seções têm conteúdo provisório para testar as rotas.

## Conteúdo

A página inicial apresenta 12 notícias fictícias voltadas ao cotidiano de imigrantes em Santa Catarina. Há um destaque, filtros por assunto e cartões que abrem a leitura completa. O conteúdo está em `src/data/news.ts`.

Todas as histórias são identificadas como demonstração; não representam eventos, vagas ou serviços reais. As fotos são ilustrativas, armazenadas localmente em `assets/images/news/`, e não retratam necessariamente Santa Catarina ou os acontecimentos descritos. Origem das fotos: Unsplash (IDs `1516738901171-8eb4fc13bd20`, `1511632765486-a01980e01a18`, `1521737711867-e3b97375f902`, `1484154218962-a197022b5858`, `1503676260728-1c00da094a0b` e `1511795409834-ef04bbd61622`).

O MVP é dedicado apenas à leitura: não possui contas, cadastro, administração ou controles de configurações. Ainda não existe API, feed ou CMS integrado. O menu de desenvolvimento do Expo Go pertence ao ambiente de desenvolvimento e não à interface do aplicativo.

## Verificação

```powershell
npx.cmd expo lint
npx.cmd tsc --noEmit
```
