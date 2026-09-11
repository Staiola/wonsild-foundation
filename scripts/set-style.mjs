import { readFileSync, writeFileSync } from 'node:fs';
const name = process.argv[2];
if (!['editorial','stone'].includes(name)) throw new Error('Usage: npm run style:set -- editorial|stone');
const url = new URL('../system.config.json', import.meta.url);
const config = JSON.parse(readFileSync(url, 'utf8'));
config.defaultStyle = name;
writeFileSync(url, JSON.stringify(config,null,2)+'\n');
await import('./build-theme.mjs');
console.log(`Default style is ${name}. This also applies after replacing the reference app.`);
