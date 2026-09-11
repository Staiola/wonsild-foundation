import { readFileSync } from 'node:fs';
const variants=['tokens.json','stone.tokens.json'];
function luminance(hex){
  if(!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error(`Contrast checker expects opaque six-digit hex colours: ${hex}`);
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return rgb.reduce((n,v,i)=>n+v*[0.2126,0.7152,0.0722][i],0);
}
const textPairs=[['foreground','background'],['muted-foreground','background'],['muted-foreground','card'],['primary-foreground','primary'],['accent-foreground','accent'],['destructive','background'],['destructive-foreground','destructive']];
let count=0;
for(const file of variants){
const tokens=JSON.parse(readFileSync(new URL(`../src/styles/${file}`,import.meta.url),'utf8'));
for(const mode of ['light','dark']){
  for(const [fg,bg] of [...textPairs,['input','background'],['ring','background']]){
    const [low,high]=[luminance(tokens[mode][fg]),luminance(tokens[mode][bg])].sort((a,b)=>a-b);
    const ratio=(high+0.05)/(low+0.05),minimum=fg==='input'||fg==='ring'?3:4.5;
    if(ratio<minimum) throw new Error(`${mode}: ${fg}/${bg} is ${ratio.toFixed(2)}:1, below ${minimum}:1`);
    count++;
  }
}
}
console.log(`Checked ${count} opaque token contrast pairs. Whole-screen accessibility still requires UI review.`);
