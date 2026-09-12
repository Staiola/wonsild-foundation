import { useEffect, useState } from 'react';
import InvoicesApp from './InvoicesApp';
import { CopyCommand } from '@/components/foundation/copy-command';
import { Slider } from '@/components/ui/slider';

type Mode = 'native' | 'slow' | 'failure';
export function Harness() {
  const [large, setLarge] = useState(false);
  const [mode, setMode] = useState<Mode>('native');
  const [focusResult, setFocusResult] = useState('Not run');
  const [results, setResults] = useState<string[]>([]);
  const [command, setCommand] = useState('example --first');
  useEffect(() => { document.documentElement.style.fontSize = large ? '200%' : ''; }, [large]);
  useEffect(() => {
    const clipboard = navigator.clipboard;
    const descriptor = Object.getOwnPropertyDescriptor(clipboard, 'writeText');
    if (mode === 'native') return;
    Object.defineProperty(clipboard, 'writeText', { configurable: true, value: () => new Promise<void>((resolve,reject) => {
      setFocusResult('Waiting for clipboard');
      setTimeout(() => {
        const before = document.activeElement;
        const kept = before?.getAttribute('aria-busy') === 'true';
        if (mode === 'failure') reject(new Error('Test clipboard unavailable')); else resolve();
        setTimeout(() => setFocusResult(kept && before === document.activeElement ? 'PASS: focus retained during and after clipboard operation' : 'Focus moved during the operation'), 30);
      }, 1200);
    }) });
    return () => { if (descriptor) Object.defineProperty(clipboard,'writeText',descriptor); else delete (clipboard as Partial<Clipboard>).writeText; };
  }, [mode]);
  function inspect() {
    const output: string[] = [];
    const check = (name: string, pass: boolean, detail: string) => output.push(`${pass?'PASS':'FAIL'} ${name}: ${detail}`);
    const root = document.documentElement;
    const label = document.querySelector('[data-slot=label]')!;
    check('Page fits viewport', root.scrollWidth <= innerWidth, `${root.scrollWidth}/${innerWidth}px`);
    check('Label line height', Math.abs(parseFloat(getComputedStyle(label).lineHeight) - parseFloat(getComputedStyle(root).fontSize)*1.25)<.1, getComputedStyle(label).lineHeight);
    const button = document.querySelector('[data-test=lone-button]')!;
    check('Action is intrinsic', button.getBoundingClientRect().width < button.parentElement!.getBoundingClientRect().width, `${button.getBoundingClientRect().width}px`);
    const trigger = document.querySelector('[data-test=trigger]')!;
    check('Composed button keeps styling', trigger.getAttribute('data-slot') === 'button' && getComputedStyle(trigger).cursor === 'pointer', `${trigger.getAttribute('data-slot')}/${getComputedStyle(trigger).cursor}`);
    check('Radius matches token', Math.abs(parseFloat(getComputedStyle(trigger).borderRadius) - parseFloat(getComputedStyle(root).getPropertyValue('--radius')) * parseFloat(getComputedStyle(root).fontSize))<.1, getComputedStyle(trigger).borderRadius);
    const clientCell = document.querySelector('tbody tr:nth-child(3) td:nth-child(2)');
    if (clientCell) check('Long client wraps', getComputedStyle(clientCell).whiteSpace !== 'nowrap', getComputedStyle(clientCell).whiteSpace);
    setResults(output);
  }
  return <>
    <aside className="ef-page ef-stack" aria-label="Consumer test controls">
      <h2 className="ef-heading ef-heading-group">Installed consumer checks</h2>
      <div className="ef-cluster">
        <button onClick={()=>setLarge(!large)} className="border border-input p-3">{large?'100% text':'200% text'}</button>
        <button onClick={inspect} className="border border-input p-3">Inspect installed layout</button>
        <label>Clipboard mode <select value={mode} onChange={e=>setMode(e.target.value as Mode)} className="border border-input p-3"><option value="native">Native</option><option value="slow">Slow success</option><option value="failure">Slow failure</option></select></label>
        <button className="border border-input p-3" onClick={()=>setCommand(command==='example --first'?'example --second':'example --first')}>Change copy value</button>
      </div>
      <div>{results.map(r=><p key={r}>{r}</p>)}</div>
      <CopyCommand value={command} label="Copy test command"/>
      <p role="status">{focusResult}</p>
      <Slider aria-label="Track visibility check" defaultValue={[35]}/>
    </aside>
    <InvoicesApp/>
  </>;
}
