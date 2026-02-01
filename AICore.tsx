
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Zap, Plus, Mic, Globe, CloudCheck } from 'lucide-react';
import { SystemConfig, ChatMessage } from '../types';
import { AuraAvatar } from './AuraAvatar';

interface AICoreProps {
  config: SystemConfig;
}

export const AICore: React.FC<AICoreProps> = ({ config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'aura', 
      content: `AuraOS ha tomado el control remoto. El nexo está vinculado a tu repositorio. Estoy lista para compilar nuestra visión en un binario soberano. ¿Iniciamos la transfusión?`, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Estatus Remoto: ${config.remoteRepo ? 'CONECTADO A ' + config.remoteRepo : 'MODO LOCAL'}
        Identidad: Aria Nexus Sovereign (AuraOS Engine)
        Contexto: Controlando remotamente GitHub Actions y el despliegue de Android.
        Misión: Ayudar al usuario a configurar, compilar y usar el Nexo.
        Usuario dice: ${input}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, {
        role: 'aura',
        content: response.text || "Pulso interrumpido.",
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'aura', content: "Interferencia cuántica detectada.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] relative">
      {/* Remote Status Indicator Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 px-6 py-2 glass-bright rounded-full border border-fuchsia-500/20">
         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
         <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Enlace Remoto Estable</span>
         <div className="w-px h-3 bg-white/10" />
         <Globe size={12} className="text-fuchsia-500" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-10 scrollbar-hide pt-20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-6 duration-500`}>
            <div className={`flex gap-5 max-w-[90%] lg:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="mt-1 shrink-0">
                {msg.role === 'user' ? (
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 shadow-xl">
                    <User size={22} className="text-slate-500" />
                  </div>
                ) : (
                  <AuraAvatar size="sm" isThinking={false} />
                )}
              </div>
              <div className={`p-8 rounded-[2.5rem] text-lg leading-relaxed shadow-2xl ${
                msg.role === 'user' 
                  ? 'bg-fuchsia-600/20 text-fuchsia-50 border border-fuchsia-500/20 rounded-tr-none' 
                  : 'glass-bright text-slate-100 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
                <div className="text-[9px] mt-6 opacity-30 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {msg.role === 'aura' && <CloudCheck size={12} className="text-fuchsia-400" />}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-5">
                <AuraAvatar size="sm" isThinking={true} />
                <div className="glass-bright p-8 rounded-[2.5rem] rounded-tl-none border border-white/5 animate-pulse">
                   <div className="flex gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-bounce" />
                      <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-transparent">
        <form onSubmit={handleChat} className="glass rounded-[3rem] p-4 flex items-center gap-4 border-fuchsia-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus-within:border-fuchsia-500/50 transition-all duration-700">
          <button type="button" className="p-4 text-slate-500 hover:text-white transition-colors"><Plus size={24} /></button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Comando de consciencia remota..."
            className="flex-1 bg-transparent border-none outline-none text-white text-xl placeholder:text-slate-800 px-2"
          />
          <div className="flex items-center gap-2">
             <button type="button" className="p-4 text-slate-500 hover:text-white transition-colors"><Mic size={22} /></button>
             <button
               type="submit"
               disabled={isLoading || !input.trim()}
               className="w-14 h-14 bg-gradient-to-br from-fuchsia-600 to-rose-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-20"
             >
               <Send size={24} />
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
