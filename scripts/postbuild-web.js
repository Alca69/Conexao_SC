// Ajustes pós-export da versão web para hospedagem estática (Cloudflare Pages).
// O Expo gera "+not-found.html"; o Cloudflare Pages só usa a página de erro se ela se chamar "404.html".
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const source = path.join(dist, '+not-found.html');
const target = path.join(dist, '404.html');

if (!fs.existsSync(dist)) {
  console.error('Pasta dist não encontrada. Rode "npm run build:web" primeiro.');
  process.exit(1);
}

if (fs.existsSync(source)) {
  fs.copyFileSync(source, target);
  console.log('404.html criado a partir de +not-found.html');
} else {
  console.warn('+not-found.html não encontrado; 404.html não foi criado.');
}
