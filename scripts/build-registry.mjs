import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import { styles } from './build-theme.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const versionOf = name => lock.packages[`node_modules/${name}`]?.version ?? pkg.dependencies[name];
const tokens = styles.editorial.tokens;
const origin = JSON.parse(read('system.config.json'));
function cssObject(container) {
  const result = {};
  for (const node of container.nodes ?? []) {
    if (node.type === 'decl') result[node.prop] = node.value + (node.important ? ' !important' : '');
    else if (node.type === 'rule') result[node.selector] = cssObject(node);
    else if (node.type === 'atrule') result[`@${node.name}${node.params ? ` ${node.params}` : ''}`] = cssObject(node);
  }
  return result;
}
const baseCss = cssObject(postcss.parse(read('src/styles/base.css')));
const layoutCss = cssObject(postcss.parse(read('src/styles/foundation.css')));
const vars = structuredClone(tokens);
vars.theme['color-destructive-foreground'] = 'var(--destructive-foreground)';
const themeCss = { '@import "tw-animate-css"': {}, ...baseCss, '@import "@fontsource-variable/dm-sans"': {}, ...layoutCss };
const common = { cssVars: vars, css: themeCss };
const uiFiles = readdirSync(resolve(root, 'src/components/ui')).filter(f=>f.endsWith('.tsx')).sort().map(f=>({path:`src/components/ui/${f}`,type:'registry:ui',target:`@ui/${f}`}));
const foundationFiles = readdirSync(resolve(root, 'src/components/foundation')).filter(f=>f.endsWith('.tsx')).sort().map(f=>({path:`src/components/foundation/${f}`,type:'registry:component',target:`@components/foundation/${f}`}));
const runtimeDependencies = Object.keys(pkg.dependencies).filter(name=>!['react','react-dom'].includes(name) && !name.startsWith('@fontsource')).map(name=>`${name}@${versionOf(name)}`);
const items = [
  {
    name:'theme', type:'registry:theme', title:'Editorial theme', description:'Editorial light/dark palette, bundled font and shared spacing/layout styles.',
    dependencies:[`tw-animate-css@${versionOf('tw-animate-css')}`, `@fontsource-variable/dm-sans@${versionOf('@fontsource-variable/dm-sans')}`], ...common,
    docs:'Use CSS variables with Tailwind v4. The foundation styles use ef- class names. The theme does not replace existing components or change business logic.'
  },
  {
    name:'foundation',type:'registry:theme',title:'Editorial Foundation',description:'The full personal foundation: styled shadcn controls, layout primitives, fields, theme and design rules.',
    dependencies:[...runtimeDependencies, ...styles.editorial.fonts.map(name=>`${name}@${versionOf(name)}`)], ...common,
    files:[...uiFiles,...foundationFiles,{path:'src/lib/utils.ts',type:'registry:lib',target:'@lib/utils.ts'},{path:'DESIGN.md',type:'registry:file',target:'~/docs/editorial-foundation/DESIGN.md'},{path:'SYSTEM.md',type:'registry:file',target:'~/docs/editorial-foundation/SYSTEM.md'},{path:'THIRD_PARTY_NOTICES.md',type:'registry:file',target:'~/docs/editorial-foundation/THIRD_PARTY_NOTICES.md'}],
    docs:'Read docs/editorial-foundation/DESIGN.md. Add a pointer to it in your project AGENTS.md. Wrap the app in className="ef-system". Existing components with the same names need a diff review before replacement. This installs source copies, not automatic updates.'
  }
];
const stoneVars = structuredClone(styles.stone.tokens);
stoneVars.theme['color-destructive-foreground'] = 'var(--destructive-foreground)';
const stoneCommon = {
  cssVars: stoneVars,
  css: { '@import "tw-animate-css"': {}, ...baseCss, ...Object.fromEntries(styles.stone.fonts.map(font=>[`@import "${font}"`, {}])), ...layoutCss }
};
const stoneFonts = styles.stone.fonts.map(name=>`${name}@${versionOf(name)}`);
items.push({
  name:'stone-theme', type:'registry:theme', title:'Stone theme',
  description:'Warm stone, charcoal and yellow with Geist, Geist Mono and Source Serif 4.',
  dependencies:[`tw-animate-css@${versionOf('tw-animate-css')}`, ...stoneFonts], ...stoneCommon,
  docs:'A separate theme in the Editorial Foundation family. Use CSS variables with Tailwind v4. This changes shared tokens, fonts and layout CSS. Review local styles before installing.'
}, {
  ...items[1], name:'stone-foundation', title:'Stone Foundation',
  description:'The full foundation in Stone: shared shadcn controls and spacing, with warm neutrals, yellow accents, Geist and Source Serif 4.',
  dependencies:[...runtimeDependencies,...stoneFonts], ...stoneCommon,
  files:[...items[1].files, {path:'STONE.md',type:'registry:file',target:'~/docs/editorial-foundation/STONE.md'}],
  docs:'Read docs/editorial-foundation/STONE.md and DESIGN.md. Stone overrides the original colour and typography direction. Point your AGENTS.md to both files and wrap the app in className="ef-system". Source copies do not update automatically.'
});
for (const item of items) {
  item.meta = { version: pkg.version };
  Object.assign(item.cssVars.theme, Object.fromEntries(['xs','sm','md','lg','xl'].map(size => [`radius-${size}`, 'var(--radius)'])));
}
const schema='https://ui.shadcn.com/schema/registry-item.json';
const registry={$schema:'https://ui.shadcn.com/schema/registry.json',name:origin.name,homepage:origin.repository,items};
writeFileSync(resolve(root,'registry.json'),JSON.stringify(registry,null,2)+'\n');
mkdirSync(resolve(root,'public/r'),{recursive:true});
for(const item of items){const output={$schema:schema,...item,meta:{version:pkg.version},files:item.files?.map(f=>({...f,content:read(f.path)}))};writeFileSync(resolve(root,`public/r/${item.name}.json`),JSON.stringify(output,null,2)+'\n');}
console.log(`Built ${items.length} registry items from the source used by the reference app.`);
