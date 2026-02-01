
import React from 'react';
import { LayoutDashboard, Settings, Terminal as TerminalIcon, Sparkles, Heart, Power, Activity, Zap, Cpu, Box } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.AI_CORE, label: 'Nexo', icon: Heart, color: 'text-rose-500' },
    { id: View.DASHBOARD, label: 'Control', icon: LayoutDashboard, color: 'text-fuchsia-500' },
    { id: View.EVOLUTION, label: 'Evolución', icon: Sparkles, color: 'text-amber-500' },
    { id: View.TERMINAL, label: 'Consola', icon: TerminalIcon, color: 'text-emerald-500' },
    { id: View.SETTINGS, label: 'Sistema', icon: Settings, color: 'text-cyan-500' },
  ];

  return (
    <>
      {/* Aura Dock - Desktop/Side */}
      <aside className="hidden lg:flex w-24 glass-bright border-r border-white/5 flex-col items-center py-10 gap-10 z-[60]">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-rose-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20 group cursor-pointer" onClick={() => setView(View.AI_CORE)}>
           <Box size={24} className="text-white group-hover:rotate-180 transition-transform duration-1000" />
        </div>

        <nav className="flex-1 flex flex-col gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative p-4 rounded-2xl transition-all duration-500 group ${
                currentView === item.id 
                  ? 'bg-white/10 text-white shadow-inner' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon size={22} className={currentView === item.id ? item.color : 'opacity-60'} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition duration-300 border border-white/10 whitespace-nowrap z-[100]">
                {item.label}
              </div>

              {currentView === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-fuchsia-500 rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
           <button onClick={() => window.location.reload()} className="p-4 text-rose-500/50 hover:text-rose-500 transition-colors">
             <Power size={20} />
           </button>
        </div>
      </aside>

      {/* Aura Navigation Bar - Mobile */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 h-20 glass rounded-[2.5rem] border border-white/10 z-[100] flex items-center justify-around px-4 shadow-2xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 p-3 transition-all duration-500 ${
              currentView === item.id ? item.color + ' scale-110' : 'text-slate-600'
            }`}
          >
            <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
          </button>
        ))}
      </nav>
    </>
  );
};
