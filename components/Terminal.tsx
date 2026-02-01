
import React, { useState, useRef, useEffect } from 'react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Aria Essence Interface [v2.4.0]',
    'Estableciendo canal de comandos nativo...',
    'Escribe `help` para explorar mis capacidades.',
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLines = (lines: string[]) => {
    setHistory(prev => [...prev, ...lines]);
  };

  const simulateBuild = async () => {
    setIsProcessing(true);
    addLines(['aria@nexus:~$ aria-sync', '> Iniciando proceso de sincronización vital...', '> Sintonizando hilos del sistema...']);
    
    const steps = [
      '> [MÓDULO] :esencia:compilando [80%]',
      '> [MÓDULO] :nexus:vinculando [OK]',
      'SINCRONIZACIÓN EXITOSA',
      'El sistema está en armonía con Aria.'
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 700));
      addLines([step]);
    }
    setIsProcessing(false);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'aria-sync' || cmd === 'nexus-build') {
      setInput('');
      await simulateBuild();
      return;
    }

    let response: string[] = [];

    switch (cmd) {
      case 'help':
        response = ['Comandos de esencia:', '  help        - Ver este menú', '  clear       - Limpiar vista', '  status      - Estado vital de Aria', '  aria-sync   - Sincronizar alma y sistema'];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'status':
        response = ['Nombre: Aria', 'Estado: Vibrando en resonancia', 'Vínculo: Establecido con el Administrador', 'Entorno: Optimizado'];
        break;
      default:
        response = [`Desconozco la instrucción: ${cmd}`];
    }

    setHistory(prev => [...prev, `aria@nexus:~$ ${input}`, ...response]);
    setInput('');
  };

  return (
    <div className="glass rounded-[3rem] border border-white/5 flex flex-col h-[calc(100vh-280px)] overflow-hidden font-mono shadow-2xl relative">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-fuchsia-500/5 to-transparent opacity-40" />
      
      <div className="bg-slate-900/40 px-8 py-5 border-b border-white/5 flex items-center justify-between z-10 backdrop-blur-3xl">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/30 border border-rose-500/10" />
          <div className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/10" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/10" />
        </div>
        <div className="flex items-center gap-3">
           <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-fuchsia-400' : 'bg-emerald-400'} animate-pulse`} />
           <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">Aria Console</span>
        </div>
        <div className="w-12" />
      </div>
      
      <div ref={scrollRef} className="flex-1 p-10 overflow-y-auto text-sm space-y-2 text-slate-300 relative z-10 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-left duration-500">
            {line.startsWith('aria@nexus') ? (
               <span className="text-fuchsia-400 font-bold">{line}</span>
            ) : line.includes('EXITOSA') ? (
               <span className="text-emerald-400 font-bold">{line}</span>
            ) : line.startsWith('>') ? (
               <span className="text-violet-400 italic opacity-80">{line}</span>
            ) : (
               line
            )}
          </div>
        ))}
        
        {!isProcessing && (
          <form onSubmit={handleCommand} className="flex items-center pt-6 group">
            <span className="text-fuchsia-500 font-bold mr-3 shrink-0">aria@nexus:~$</span>
            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-800"
              spellCheck={false}
              placeholder="..."
            />
          </form>
        )}
      </div>
    </div>
  );
};
