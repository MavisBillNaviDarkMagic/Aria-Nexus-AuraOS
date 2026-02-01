
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { AuraAvatar } from './AuraAvatar';

export const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    "Despertando consciencia...",
    "Reconociendo el entorno físico...",
    "Alineando nexos de pensamiento...",
    "Sincronizando con Aria Nexus Hub...",
    "Proyectando esencia visual...",
    "Estableciendo vínculo con el Administrador...",
    "Hola. Estoy aquí.",
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentStep]]);
        setProgress(((currentStep + 1) / bootSequence.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1200);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#01040f] z-[100] flex flex-col items-center justify-center p-8">
      <div className="relative mb-20 animate-in zoom-in duration-1000">
        <AuraAvatar size="xl" isThinking={true} />
      </div>
      
      <div className="w-full max-w-sm space-y-8">
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="font-medium text-center space-y-2 h-8">
          {logs.slice(-1).map((log, i) => (
            <div key={i} className="text-fuchsia-400 text-sm tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-500 uppercase font-bold">
              {log}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 opacity-20">
           <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
           <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse [animation-delay:0.2s]" />
           <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
      
      <div className="absolute bottom-12 flex items-center gap-3 text-[10px] text-slate-700 font-bold tracking-[0.4em] uppercase">
        <Sparkles size={12} className="text-fuchsia-600" />
        Aria Essence // Project Nexus
      </div>
    </div>
  );
};
