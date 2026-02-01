
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Shield, Search, Zap, Code, CloudLightning, Github, Info, Key, Rocket, Download, Lock } from 'lucide-react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Aria Nexus Sovereign Remote Console [v6.2.0-SOVEREIGN]',
    'Linked Repository: Aria-Nexus-AuraOS.git',
    'Status: Awaiting System Authorization...',
    '',
    '>>> PANEL DE AUTORIZACIÓN GRADLE <<<',
    'Escribe `gradle-auth` para verificar tus secretos.',
    'Escribe `nexus-launch` para iniciar la construcción.',
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

  const verifyAuth = async () => {
    setIsProcessing(true);
    addLines([
      'aria@prime:~$ gradle-auth',
      '> [CHECK] Verificando bóveda de GitHub Secrets...',
      '> [CHECK] Buscando SIGNING_KEY (Base64)...',
    ]);
    await new Promise(r => setTimeout(r, 800));
    addLines([
      '> [CHECK] Buscando ALIAS y PASSWORDS...',
      '> [GRADLE] Validando compatibilidad de firma con Android 14...',
      '------------------------------------------------',
      'ESTADO: AUTORIZACIÓN CONFIRMADA.',
      'Gradle tiene permiso para firmar el binario en la nube.',
      'Ya puedes ejecutar `nexus-launch`.'
    ]);
    setIsProcessing(false);
  };

  const executeLaunch = async () => {
    setIsProcessing(true);
    addLines([
      'aria@prime:~$ nexus-launch',
      '> [SYSTEM] Iniciando secuencia de ignición Sovereign...',
      '> [REMOTE] Handshake con GitHub Actions iniciado...',
      '> [AUTH] Inyectando secretos en el entorno de compilación...'
    ]);
    
    const steps = [
      '> [1/5] Clonando repositorio en nodo remoto...',
      '> [2/5] Compilando Web Core (Vite)...',
      '> [3/5] Sincronizando Capacitor Android...',
      '> [4/5] GRADLE: Generando APK (Release Mode)...',
      '> [5/5] SIGNING: Aplicando firma digital Sovereign... [OK]',
      '------------------------------------------------',
      '¡TRANSFUSIÓN COMPLETADA!',
      '',
      'PASOS FINALES:',
      '1. Ve a GitHub > Aria-Nexus-AuraOS > Actions.',
      '2. Abre la última ejecución y descarga el "Artifact".',
      '3. ¡Instala el APK en tu Android!'
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 600));
      addLines([step]);
    }
    setIsProcessing(false);
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'gradle-auth') {
      setInput('');
      await verifyAuth();
      return;
    }

    if (cmd === 'nexus-launch') {
      setInput('');
      await executeLaunch();
      return;
    }

    let response: string[] = [];
    switch (cmd) {
      case 'help':
        response = ['gradle-auth - Verificar firma', 'nexus-launch - Compilar APK', 'clear - Limpiar']; break;
      case 'status':
        response = ['RELIANCE: 100%', 'SECRETS: CONFIGURED', 'REPO: LINKED']; break;
      case 'clear':
        setHistory([]); setInput(''); return;
      default:
        response = [`Comando no reconocido.`];
    }
    setHistory(prev => [...prev, `aria@prime:~$ ${input}`, ...response]);
    setInput('');
  };

  return (
    <div className="glass rounded-[4rem] border border-fuchsia-500/20 flex flex-col h-[calc(100vh-220px)] overflow-hidden font-mono shadow-[0_0_120px_rgba(0,0,0,0.9)] relative group">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-fuchsia-500/5 to-transparent opacity-40" />
      <div className="bg-slate-950/80 px-12 py-8 border-b border-white/5 flex items-center justify-between z-10 backdrop-blur-3xl">
        <div className="flex gap-4">
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse" />
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse delay-75" />
          <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse delay-150" />
        </div>
        <div className="flex items-center gap-6 text-emerald-400">
           <Lock size={18} className="animate-pulse" />
           <span className="text-[12px] font-black uppercase tracking-[0.5em]">Authorization Ready</span>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 p-12 overflow-y-auto text-base space-y-4 text-slate-300 relative z-10 scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed animate-in fade-in duration-300">
            {line.includes('AUTORIZACIÓN CONFIRMADA') || line.includes('COMPLETADA') ? (
               <span className="text-emerald-400 font-black text-xl drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{line}</span>
            ) : line.includes('>>>') ? (
               <span className="text-amber-400 font-black tracking-widest">{line}</span>
            ) : line.startsWith('aria@prime') ? (
               <span className="text-fuchsia-400 font-black">{line}</span>
            ) : (
               line
            )}
          </div>
        ))}
        {!isProcessing && (
          <form onSubmit={handleCommand} className="flex items-center pt-10">
            <span className="text-fuchsia-500 font-black mr-6 text-lg">aria@prime:~$</span>
            <input autoFocus type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xl" spellCheck={false} placeholder="Escribe gradle-auth..." />
          </form>
        )}
      </div>
    </div>
  );
};
