import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import './build-theme.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = p => readFileSync(resolve(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const versionOf = name => lock.packages[`node_modules/${name}`]?.version ?? pkg.dependencies[name];
const tokens = JSON.parse(read('src/styles/tokens.json'));
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
const layoutCss = cssObject(postcss.parse(read('src/styles/foundation.css')));
const vars = structuredClone(tokens);
vars.theme['color-destructive-foreground'] = 'var(--destructive-foreground)';
const themeCss = { '@import "@fontsource-variable/dm-sans"': {}, ...layoutCss };
const common = { cssVars: vars, css: themeCss };
const uiFiles = readdirSync(resolve(root, 'src/components/ui')).filter(f=>f.endsWith('.tsx')).sort().map(f=>({path:`src/components/ui/${f}`,type:'registry:ui',target:`@ui/${f}`}));
const foundationFiles = readdirSync(resolve(root, 'src/components/foundation')).filter(f=>f.endsWith('.tsx')).sort().map(f=>({path:`src/components/foundation/${f}`,type:'registry:component',target:`@components/foundation/${f}`}));
const runtimeDependencies = Object.keys(pkg.dependencies).filter(name=>!['react','react-dom'].includes(name)).map(name=>`${name}@${versionOf(name)}`);
const items = [
  {
    name:'theme', type:'registry:theme', title:'Editorial theme', description:'Editorial light/dark palette, bundled font and shared spacing/layout styles.',
    dependencies:[`@fontsource-variable/dm-sans@${versionOf('@fontsource-variable/dm-sans')}`], ...common,
    docs:'Use CSS variables with Tailwind v4. The foundation styles use ef- class names. The theme does not replace existing components or change business logic.'
  },
  {
    name:'foundation',type:'registry:item',title:'Editorial Foundation',description:'The full personal foundation: styled shadcn controls, layout primitives, fields, theme and design rules.',
    dependencies:runtimeDependencies, ...common,
    files:[...uiFiles,...foundationFiles,{path:'src/lib/utils.ts',type:'registry:lib',target:'@lib/utils.ts'},{path:'DESIGN.md',type:'registry:file',target:'~/docs/editorial-foundation/DESIGN.md'},{path:'SYSTEM.md',type:'registry:file',target:'~/docs/editorial-foundation/SYSTEM.md'},{path:'THIRD_PARTY_NOTICES.md',type:'registry:file',target:'~/docs/editorial-foundation/THIRD_PARTY_NOTICES.md'}],
    docs:'Read docs/editorial-foundation/DESIGN.md. Add a pointer to it in your project AGENTS.md. Wrap the app in className="ef-system". Existing components with the same names need a diff review before replacement. This installs source copies, not automatic updates.'
  }
];
const schema='https://ui.shadcn.com/schema/registry-item.json';
const registry={$schema:'https://ui.shadcn.com/schema/registry.json',name:origin.name,homepage:origin.repository,items};
writeFileSync(resolve(root,'registry.json'),JSON.stringify(registry,null,2)+'\n');
mkdirSync(resolve(root,'public/r'),{recursive:true});
for(const item of items){const output={$schema:schema,...item,meta:{version:pkg.version},files:item.files?.map(f=>({...f,content:read(f.path)}))};writeFileSync(resolve(root,`public/r/${item.name}.json`),JSON.stringify(output,null,2)+'\n');}
console.log(`Built ${items.length} registry items from the source used by the reference app.`);
