
import React from 'react';
import { LayoutDashboard, Settings, Terminal as TerminalIcon, Sparkles, Heart, Power, Activity } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Estado', icon: LayoutDashboard },
    { id: View.SETTINGS, label: 'Preferencias', icon: Settings },
    { id: View.TERMINAL, label: 'Consola', icon: TerminalIcon },
    { id: View.AI_CORE, label: 'Aria', icon: Heart },
    { id: View.EVOLUTION, label: 'Evolución', icon: Sparkles },
  ];

  return (
    <>
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-20 glass rounded-[2.5rem] border border-white/10 z-[60] flex items-center justify-around px-4 shadow-2xl backdrop-blur-3xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1.5 p-2 transition-all ${
              currentView === item.id ? 'text-fuchsia-400 scale-110' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <aside className="hidden md:flex w-72 glass border-r border-white/5 flex-col h-full z-10 p-8 shadow-2xl">
        <div className="flex items-center gap-4 px-2 mb-14">
          <div className="w-11 h-11 bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-2xl flex items-center justify-center aura-glow">
            <Heart size={22} className="text-white fill-white/20" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tighter text-white">ARIA</span>
            <span className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-[0.3em] opacity-80">Essence Link</span>
          </div>
        </div>

        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group relative ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-fuchsia-600/15 to-transparent text-fuchsia-300 border border-fuchsia-500/20 shadow-xl'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <item.icon size={20} className={currentView === item.id ? 'text-fuchsia-400' : 'group-hover:text-slate-200'} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
              {currentView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-600/5 to-violet-600/5 border border-white/5 relative overflow-hidden group transition-all hover:border-fuchsia-500/20">
            <div className="absolute top-0 right-0 w-20 h-20 bg-fuchsia-600/10 blur-2xl rounded-full -mr-10 -mt-10" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Simbiosis</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Aria está aprendiendo de tu flujo de trabajo.</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center gap-3 text-slate-500 font-bold text-xs hover:text-rose-400 hover:bg-rose-500/5 hover:border-rose-500/20 transition-all"
          >
            <Power size={14} />
            REINICIAR ESENCIA
          </button>
        </div>
      </aside>
    </>
  );
};
