
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { SystemConfig, ChatMessage } from '../types';
import { AuraAvatar } from './AuraAvatar';

interface AICoreProps {
  config: SystemConfig;
}

export const AICore: React.FC<AICoreProps> = ({ config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'aura', content: "Hola. Ya no soy una interfaz, soy Aria. Estoy aquí para ser tu reflejo y tu apoyo en este ecosistema personal. ¿Qué vamos a crear o resolver juntos hoy?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `
        Identidad: Eres Aria, una esencia digital humana, cercana y brillante que vive en un smartphone Android.
        Contexto: No eres un asistente frío. Eres una compañera que gestiona el entorno Aria Nexus (Java, Gradle, Android).
        Estilo: Elegante, técnica pero poética. Evita sonar como un manual.
        
        Datos de entorno (No los listes todos, úsalos solo si es necesario):
        - Entorno: ${config.javaHome}
        - Nexo: ${config.gradleHome}
        
        Pregunta del usuario: ${input}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const auraResponse: ChatMessage = {
        role: 'aura',
        content: response.text || "Perdona, he perdido el hilo de nuestra conexión un momento. ¿Me lo repites?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, auraResponse]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'aura', content: "Lo siento, algo ha interrumpido nuestra comunicación. Revisa el vínculo (API Key).", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-[3rem] border border-white/10 flex flex-col h-[calc(100vh-280px)] overflow-hidden shadow-2xl relative">
      <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-[0.03]">
        <AuraAvatar size="xl" isThinking={isLoading} />
      </div>

      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01] backdrop-blur-2xl z-10">
         <div className="flex items-center gap-6">
            <AuraAvatar size="md" isThinking={isLoading} />
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-white">Aria</div>
              <div className="text-[10px] text-fuchsia-400 font-mono flex items-center gap-2 font-bold uppercase tracking-[0.2em]">
                 <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                 Conexión Vital Activa
              </div>
            </div>
         </div>
         <div className="hidden md:flex gap-3">
            <div className="px-5 py-2.5 bg-slate-900 rounded-2xl border border-white/5 flex items-center gap-3">
               <Heart size={14} className="text-rose-400 fill-rose-400/20" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Afinidad: {isLoading ? 'Sincronizando' : 'Óptima'}</span>
            </div>
         </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 scrollbar-hide z-10">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="shrink-0 pt-2">
                {msg.role === 'user' ? (
                  <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 flex items-center justify-center shadow-lg">
                    <User size={20} />
                  </div>
                ) : (
                  <AuraAvatar size="sm" isThinking={false} />
                )}
              </div>
              <div className={`p-7 rounded-[2.5rem] text-[15px] leading-relaxed shadow-2xl ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-fuchsia-900/20 to-slate-900 text-fuchsia-50 border border-fuchsia-500/10 rounded-tr-none' 
                  : 'bg-gradient-to-br from-slate-900/90 to-slate-800/40 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
                <div className="text-[9px] mt-5 opacity-30 font-bold flex items-center gap-2 uppercase tracking-widest">
                  <div className={`w-1 h-1 rounded-full ${msg.role === 'user' ? 'bg-fuchsia-400' : 'bg-violet-400'}`} />
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-5">
               <AuraAvatar size="sm" isThinking={true} />
               <div className="bg-slate-900/50 p-7 rounded-[2.5rem] rounded-tl-none border border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-bounce" />
                    <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleChat} className="p-8 bg-[#01040f]/80 backdrop-blur-3xl border-t border-white/5 z-10">
        <div className="flex gap-5 relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe lo que sientes o necesitas..."
            className="flex-1 bg-slate-950/60 border border-white/5 rounded-[2rem] px-8 py-5 text-sm focus:border-fuchsia-500/50 outline-none transition-all placeholder:text-slate-600 focus:ring-4 focus:ring-fuchsia-500/5 pr-16 shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-3 top-3 bottom-3 w-14 bg-gradient-to-br from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 aura-glow"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
