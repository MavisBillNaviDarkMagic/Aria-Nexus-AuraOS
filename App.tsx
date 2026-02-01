
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { Terminal } from './components/Terminal';
import { AICore } from './components/AICore';
import { BootScreen } from './components/BootScreen';
import { EvolutionCore } from './components/EvolutionCore';
import { AuraAvatar } from './components/AuraAvatar';
import { View, SystemConfig, SystemMetrics } from './types';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('aria_config');
    return saved ? JSON.parse(saved) : {
      javaHome: '/usr/lib/jvm/java-21-openjdk-amd64',
      gradleHome: '/opt/gradle/gradle-8.5',
      gradleVersion: '8.5',
      javaVersion: '21.0.2',
      jvmOptions: '-Xmx4g -Xms1g -XX:+UseG1GC',
      environmentVariables: {
        'ARIA_NAME': 'Aria',
        'SOUL_SYNC': 'Active',
        'NEXUS_MODE': 'personal'
      }
    };
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 12,
    ram: 38,
    disk: 25,
    uptime: '0h 0m'
  });

  useEffect(() => {
    localStorage.setItem('aria_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      
      setMetrics(prev => ({
        ...prev,
        cpu: Math.min(90, Math.max(2, prev.cpu + (Math.random() * 4 - 2))),
        ram: Math.min(80, Math.max(20, prev.ram + (Math.random() * 1.5 - 0.75))),
        uptime: `${hours}h ${mins}m ${secs}s`
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard metrics={metrics} />;
      case View.SETTINGS: return <Settings config={config} onUpdate={setConfig} />;
      case View.TERMINAL: return <Terminal />;
      case View.AI_CORE: return <AICore config={config} />;
      case View.EVOLUTION: return <EvolutionCore />;
      default: return <Dashboard metrics={metrics} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#01040f] text-slate-200 overflow-hidden font-['Space_Grotesk'] selection:bg-fuchsia-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-violet-600/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-fuchsia-600/5 rounded-full blur-[140px] animate-pulse [animation-delay:3s]" />
      </div>

      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative z-0 scrollbar-hide">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl font-extrabold tracking-tighter text-white flex items-center gap-4">
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Aria
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 aura-glow animate-pulse hidden md:block" />
              <span className="text-[9px] font-bold text-slate-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                Esencia Nativa
              </span>
            </h1>
            <p className="text-slate-400 mt-1 font-medium italic opacity-60 text-sm">Tu reflejo digital en Nexus</p>
          </div>
          
          <div className="flex items-center gap-5 glass p-2 px-5 rounded-[2rem] border-white/5 w-full md:w-auto justify-between md:justify-end shadow-xl">
             <div className="text-right">
                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Sincronía</div>
                <div className="text-sm text-fuchsia-400 font-mono font-bold">@FLUID-SOUL</div>
             </div>
             <div className="group relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-fuchsia-600/30 to-violet-600/30 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
                <div className="relative">
                   <AuraAvatar size="sm" isThinking={false} />
                </div>
             </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 md:pb-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
