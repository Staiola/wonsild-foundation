import { useEffect, useRef, useState } from 'react';
import { EditorialPage, EditorialStack, EditorialCluster } from '@/components/foundation/layout';
import { PageHeader } from '@/components/foundation/page-header';
import { TextField } from '@/components/foundation/text-field';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';

type Style = 'editorial' | 'stone';
type Check = {name:string;pass:boolean;detail:string};

// Converts computed sRGB colours, including alpha, for the rendered-state check.
function rgb(value:string):number[] {
  const values=value.match(/[\d.]+/g)?.map(Number);
  if(!value.startsWith('rgb') || !values || values.length<3) throw new Error(`Unsupported computed colour: ${value}`);
  return [...values.slice(0,3),values[3]??1];
}
function contrast(fg:number[],bg:number[]) {
  const composite=fg.slice(0,3).map((v,i)=>v*fg[3]+bg[i]*(1-fg[3]));
  const lum=(v:number[])=>v.slice(0,3).map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);
  const [lo,hi]=[lum(composite),lum(bg)].sort((a,b)=>a-b);return (hi+.05)/(lo+.05);
}

export function Checks({initialStyle='editorial',allowStyleSwitch=true}:{initialStyle?:Style;allowStyleSwitch?:boolean}) {
  const [style,setStyle]=useState<Style>(initialStyle),[dark,setDark]=useState(false),[large,setLarge]=useState(false),[checked,setChecked]=useState(false),[saved,setSaved]=useState(false),[results,setResults]=useState<Check[]>([]);
  const fixture=useRef<HTMLDivElement>(null);
  useEffect(()=>{document.documentElement.dataset.style=style;document.documentElement.classList.toggle('dark',dark);document.documentElement.style.fontSize=large?'200%':'';setResults([])},[style,dark,large]);
  async function runChecks(){
    await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
    const root=fixture.current!;const output:Check[]=[];
    const check=(name:string,pass:boolean,detail:string)=>output.push({name,pass,detail});
    const header=root.querySelector('.ef-page-header')!;const next=header.nextElementSibling!;
    const expected=parseFloat(getComputedStyle(root).rowGap),actual=next.getBoundingClientRect().top-header.getBoundingClientRect().bottom;
    check('One region gap after the header',Math.abs(expected-actual)<1,`${actual.toFixed(1)}px / expected ${expected.toFixed(1)}px`);
    check('No horizontal page overflow',document.documentElement.scrollWidth<=innerWidth,`${document.documentElement.scrollWidth}px content / ${innerWidth}px viewport`);
    const button=root.querySelector('[data-check="long-button"]') as HTMLElement;
    check('Long action fits its container',button.getBoundingClientRect().width<=button.parentElement!.clientWidth+1 && button.scrollWidth<=button.clientWidth+1,`${button.getBoundingClientRect().width.toFixed(1)}px wide`);
    const title=root.querySelector('[data-slot="alert-title"]') as HTMLElement;
    check('Full alert title remains visible',title.scrollHeight<=title.clientHeight+1,`${title.clientHeight}px visible / ${title.scrollHeight}px content`);
    const sw=root.querySelector('[data-slot="switch"]')!;const bounds=sw.getBoundingClientRect();
    check('Switch target is at least 44 × 44px',bounds.width>=44&&bounds.height>=44,`${bounds.width.toFixed(1)} × ${bounds.height.toFixed(1)}px`);
    const select=root.querySelector('[data-slot="select-trigger"]') as HTMLElement;
    check('Selected option fits without clipping',select.scrollWidth<=select.clientWidth+1&&select.scrollHeight<=select.clientHeight+1,`${select.clientWidth} × ${select.clientHeight}px`);
    const tabs=root.querySelectorAll<HTMLElement>('[data-slot="tabs-trigger"][data-state="inactive"]');
    for(const tab of tabs){
      try{let parent:HTMLElement|null=tab;let background=[0,0,0,0];while(parent&&background[3]===0){background=rgb(getComputedStyle(parent).backgroundColor);parent=parent.parentElement}
        const ratio=contrast(rgb(getComputedStyle(tab).color),background);check(`Unselected tab contrast (${tab.textContent})`,ratio>=4.5,`${ratio.toFixed(2)}:1 / minimum 4.5:1`);
      }catch(error){check('Computed tab contrast',false,String(error))}
    }
    setResults(output);
  }
  return <main className="ef-system"><EditorialPage><EditorialStack gap="region">
    <section aria-label="Check settings"><EditorialStack gap="related"><h1 className="text-xl font-medium">Component stress checks</h1><p>Unmodified controls and layout rules. No reference-page CSS.</p><EditorialCluster>
      {allowStyleSwitch&&<><Button variant={style==='editorial'?'default':'outline'} aria-pressed={style==='editorial'} onClick={()=>setStyle('editorial')}>Editorial</Button><Button variant={style==='stone'?'default':'outline'} aria-pressed={style==='stone'} onClick={()=>setStyle('stone')}>Stone</Button></>}
      <Button variant="outline" aria-pressed={dark} onClick={()=>setDark(!dark)}>Dark mode</Button><Button variant="outline" aria-pressed={large} onClick={()=>setLarge(!large)}>200% text</Button><Button onClick={runChecks}>Run layout checks</Button><a className="underline" href="./reference.html">Reference home</a>
    </EditorialCluster><div role="status" aria-live="polite">{results.length>0&&<><p>{results.every(r=>r.pass)?'All checks passed': 'Checks need attention'} · {style} · {dark?'dark':'light'} · {large?'200%':'100%'}</p><ul>{results.map((r,i)=><li key={i}>{r.pass?'PASS':'FAIL'} — {r.name}: {r.detail}</li>)}</ul></>}</div></EditorialStack></section>
    <div ref={fixture} className="ef-stack ef-gap-region" data-check="fixture">
      <PageHeader title="Household heating assumptions" description="A long-content example with the same components installed by the registry."/>
      <EditorialStack>
        <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Household heating assumptions</TabsTrigger><TabsTrigger value="history">Consumption history and comparisons</TabsTrigger></TabsList><TabsContent value="overview">Current estimate</TabsContent><TabsContent value="history">Previous estimates</TabsContent></Tabs>
        <Tabs defaultValue="first"><TabsList variant="default"><TabsTrigger value="first">Overview</TabsTrigger><TabsTrigger value="second">History</TabsTrigger></TabsList><TabsContent value="first">Filled tab style</TabsContent><TabsContent value="second">History selected</TabsContent></Tabs>
        <TextField label="Heated floor area, including extensions and all regularly heated rooms (m²)" type="number" defaultValue="140" hint="A labelled field with supporting text."/>
        <TextField label="Email address" defaultValue="incomplete" error="Enter a complete email address so we can send your estimate."/>
        <TextField label="Reference number" defaultValue="Assigned after creation" disabled/>
        <div className="ef-field"><Label htmlFor="check-period">Result period</Label><Select defaultValue="annual"><SelectTrigger id="check-period"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="annual">Annual consumption for the complete household, including extensions</SelectItem><SelectItem value="monthly">Monthly average</SelectItem></SelectContent></Select></div>
        <EditorialCluster><Button data-check="long-button" onClick={()=>setSaved(true)}>Recalculate the estimate using these household assumptions</Button><Button variant="outline" onClick={()=>setSaved(false)}>Reset</Button></EditorialCluster><p aria-live="polite">{saved?'Estimate updated.':'No changes submitted.'}</p>
        <Alert><AlertTitle>We couldn’t calculate your estimate because some required information is missing</AlertTitle><AlertDescription>Review the highlighted fields and try again.</AlertDescription></Alert>
        <EditorialCluster><Label htmlFor="check-switch">Include hot water</Label><Switch id="check-switch" checked={checked} onCheckedChange={setChecked}/><span>{checked?'Included':'Excluded'}</span></EditorialCluster>
        <Dialog><DialogTrigger asChild><Button variant="outline">Open keyboard test dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Review your assumptions</DialogTitle><DialogDescription>Tab stays inside this dialog. Escape returns to its trigger.</DialogDescription></DialogHeader><TextField label="Scenario name" defaultValue="Home energy"/></DialogContent></Dialog>
      </EditorialStack>
    </div>
  </EditorialStack></EditorialPage></main>
}
