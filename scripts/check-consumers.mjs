import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
import postcss from 'postcss';
import { registryItemSchema } from 'shadcn/schema';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const version = name => lock.packages[`node_modules/${name}`].version;
const cli = resolve(root, 'node_modules/shadcn/dist/index.js');
const fixture = resolve(root, 'scripts/fixtures/consumer');
const scenarios = ['foundation', 'stone-foundation', 'theme', 'stone-theme'].flatMap(item => ['bare', 'existing'].map(start => ({ item, start })));
const selected = process.argv.slice(2);
function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', timeout: 180000, env: { ...process.env, CI: 'true', npm_config_audit: 'false', npm_config_fund: 'false', npm_config_prefer_offline: 'true' } });
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')}\n${result.stdout}\n${result.stderr}\n${result.error ?? ''}`);
}
function values(css, selector) {
  const output = {};
  postcss.parse(css).walkRules(selector, rule => rule.walkDecls(decl => { output[decl.prop] = decl.value; }));
  return output;
}
for (const {item,start} of scenarios) {
  const name = `${item}-${start}`;
  if (selected.length && !selected.includes(name)) continue;
  console.log(`Consumer check: ${name}`);
  const target = resolve(root, 'work/consumer-checks', name);
  // Each case begins without any Editorial CSS or components. Keep only npm's cache.
  rmSync(target, { recursive: true, force: true });
  mkdirSync(resolve(target, 'src'), { recursive: true });
  const write = (p, value) => writeFileSync(resolve(target, p), value);
  const json = (p,value) => write(p, JSON.stringify(value,null,2)+'\n');
  const baseDeps = ['react','react-dom'];
  const buildDeps = ['vite','typescript','@tailwindcss/vite','tailwindcss','@types/react','@types/react-dom','@types/node'];
  json('package.json', {name:`consumer-${name}`,version:'0.0.0',private:true,type:'module',scripts:{build:'tsc --noEmit && vite build',dev:'vite --host 127.0.0.1'},dependencies:Object.fromEntries(baseDeps.map(n=>[n,version(n)])),devDependencies:Object.fromEntries(buildDeps.map(n=>[n,version(n)]))});
  json('components.json', {style:'new-york',rsc:false,tsx:true,tailwind:{config:'',css:'src/index.css',baseColor:'neutral',cssVariables:true},aliases:{components:'@/components',utils:'@/lib/utils',ui:'@/components/ui',lib:'@/lib',hooks:'@/hooks'}});
  cpSync(resolve(fixture,'vite.config.ts'),resolve(target,'vite.config.ts'));
  cpSync(resolve(root,'tsconfig.json'),resolve(target,'tsconfig.json'));
  write('index.html','<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Registry consumer check</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>');
  const baseline = start === 'existing' ? read('scripts/fixtures/consumer/existing.css') : '@import "tailwindcss";\n';
  const unrelated = ':root { --project-brand: #123456; }\n.project-only { padding: 13px; }\n';
  write('src/index.css', baseline + unrelated);
  write('src/main.tsx', '');
  run('npm',['install','--ignore-scripts','--no-audit','--no-fund'],target);
  const itemPath = resolve(root,`public/r/${item}.json`);
  const payload = registryItemSchema.parse(JSON.parse(readFileSync(itemPath,'utf8')));
  assert.equal(payload.meta?.version, pkg.version, 'Registry version must survive shadcn build');
  run(process.execPath,[cli,'add',itemPath,'--yes','--overwrite','--cwd',target],target);
  const css = readFileSync(resolve(target,'src/index.css'),'utf8');
  const expected = JSON.parse(read(`src/styles/${item.startsWith('stone')?'stone.tokens':'tokens'}.json`));
  for (const [mode,selector] of [['light',':root'],['dark','.dark']]) {
    const actual = values(css,selector);
    for (const [key,value] of Object.entries(expected[mode])) assert.equal(actual[`--${key}`],value,`${name}: ${mode} ${key}`);
  }
  assert.equal(values(css,':root')['--project-brand'],'#123456','Preserve unrelated project token');
  assert.equal(values(css,'.project-only').padding,'13px','Preserve unrelated project CSS');
  assert.match(css, /@import ["']tw-animate-css["']/);
  assert.match(css, /@layer base/);
  assert.match(css, /@apply border-border/);
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /@custom-variant dark/);
  assert.equal(values(css,'body').background,'var(--background)');
  for (const radius of ['xs','sm','md','lg','xl']) assert.match(css,new RegExp(`--radius-${radius}:\\s*var\\(--radius\\)`));
  if (item.endsWith('foundation')) {
    for (const file of payload.files) if (file.type === 'registry:ui' || file.type === 'registry:component') assert.ok(existsSync(resolve(target,file.path)),`Missing installed ${file.path}`);
    cpSync(resolve(fixture,'InvoicesApp.tsx'),resolve(target,'src/InvoicesApp.tsx'));
    cpSync(resolve(fixture,'Harness.tsx'),resolve(target,'src/Harness.tsx'));
    write('src/main.tsx', 'import { createRoot } from "react-dom/client";\nimport { Harness } from "./Harness";\nimport "./index.css";\ncreateRoot(document.getElementById("root")!).render(<Harness/>);\n');
  } else {
    assert.ok(!existsSync(resolve(target,'src/components')), 'Theme-only install must not add React controls');
    write('src/main.tsx','import { createRoot } from "react-dom/client";\nimport "./index.css";\ncreateRoot(document.getElementById("root")!).render(<main className="ef-system ef-page"><h1 className="ef-heading ef-heading-page">Theme-only consumer</h1><p className="ef-prose">Palette, fonts and base styles installed without components.</p><button className="bg-primary text-primary-foreground rounded-md p-3" onClick={()=>document.documentElement.classList.toggle("dark")}>Toggle dark mode</button></main>);');
  }
  run('npm',['run','build'],target);
  const builtCss = readdirSync(resolve(target,'dist/assets')).filter(f=>f.endsWith('.css')).map(f=>readFileSync(resolve(target,'dist/assets',f),'utf8')).join('\n');
  assert.match(builtCss, /font-face/, 'Bundled font must reach the production build');
  if (item.endsWith('foundation')) assert.match(builtCss, /@keyframes (enter|exit)/, 'Dialog animations must compile');
  console.log(`PASS ${name}: palette, preserved custom CSS, base layer, metadata, installed files and production build`);
}
