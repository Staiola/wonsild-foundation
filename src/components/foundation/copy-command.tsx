"use client";

import { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Displays copyable code. Never executes it; failure leaves the text selectable. */
export function CopyCommand({ value, label = 'Copy command' }: { value: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const operation = useRef(0);
  const statusId = useId();
  useEffect(() => {
    operation.current += 1;
    setState('idle');
    return () => { operation.current += 1; };
  }, [value]);
  async function copy() {
    if (state === 'copying') return;
    const request = ++operation.current;
    setState('copying');
    try {
      await navigator.clipboard.writeText(value);
      if (request === operation.current) setState('copied');
    } catch {
      if (request === operation.current) setState('failed');
    }
  }
  return <div className="ef-copy-command">
    <div className="ef-copy-command-row">
      <code>{value}</code>
      <Button type="button" variant="outline" onClick={copy} aria-disabled={state === 'copying'} aria-busy={state === 'copying'}>
        {state === 'copied' ? <Check/> : <Copy/>}{state === 'copying' ? 'Copying…' : label}
      </Button>
    </div>
    <p id={statusId} role="status" className="ef-copy-command-status">{state === 'copied' ? 'Command copied.' : state === 'failed' ? 'Clipboard unavailable. Select and copy the command above.' : '\u00a0'}</p>
  </div>;
}
