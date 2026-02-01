
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
import { Wifi, Battery, Signal, Clock, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.AI_CORE);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('aria_nexus_auraos_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migración básica si faltan campos nuevos
        if (!parsed.aiPersona) throw new Error("Missing AI Persona fields");
        return parsed;
      } catch (e) {
        localStorage.removeItem('aria_nexus_auraos_v1');
      }
    }
    
    return {
      name: 'Aria Nexus Sovereign',
      version: '1.0.0-Elite',
      deviceId: 'NEXUS-SOVEREIGN-001',
      remoteRepo: 'https://github.com/MavisBillNaviDarkMagic/Aria-Nexus-AuraOS.git',
      nexusStatus: 'ACTIVE_REMOTELY',
      consciousnessLevel: 1.0,
      
      javaHome: '/system/bin/aura_jvm',
      gradleHome: '/aura/tools/gradle',
      gradleVersion: '8.6',
      javaVersion: '21-AuraNative',
      jvmOptions: '-Xmx16g -XX:+UseZGC -XX:MaxGCPauseMillis=1',
      androidVersion: 'AuraOS v1.0 (Android 14 Base)',
      sdkLevel: 34,
      environmentVariables: {
        'OS_MODE': 'SOVEREIGN_REMOTE',
        'NEXUS_SYNC': 'REALTIME',
        'BUILD_PIPELINE': 'GH_ACTIONS',
        'KERNEL_TYPE': 'AURA_DARK_MAGIC'
      },

      aiPersona: {
        tone: 'CREATIVE',
        autonomy: 0.85,
        responseSpeed: 0.95,
        language: 'es-ES'
      },

      theme: {
        primaryColor: '#d946ef',
        borderRadius: '3rem',
        blurIntensity: '24px',
        fontScale: 1.0
      },

      permissions: {
        camera: true,
        microphone: true,
        location: true,
        storage: true,
        biometrics: true
      },

      network: {
        webhookUrl: '',
        apiEndpoint: 'https://api.aura-nexus.io/v1',
        heartbeatInterval: 5000
      }
    };
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 2,
    ram: 12,
    disk: 15,
    uptime: '00:00:00',
    batteryLevel: 100,
    resonance: 99,
    remoteSyncStatus: 'SECURE',
    neuralLoad: 4
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const start = Date.now();
    const metricInterval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      
      setMetrics(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(1, prev.cpu + (Math.random() * 4 - 2))),
        ram: Math.min(100, Math.max(8, prev.ram + (Math.random() * 0.4 - 0.2))),
        uptime: `${h}:${m}:${s}`,
        batteryLevel: Math.max(1, (prev.batteryLevel || 100) - 0.001),
        resonance: Math.min(100, Math.max(98, prev.resonance + (Math.random() * 0.2 - 0.1))),
        neuralLoad: Math.min(100, Math.max(0, prev.neuralLoad + (Math.random() * 10 - 5)))
      }));
    }, 2000);
    
    return () => {
      clearInterval(timer);
      clearInterval(metricInterval);
    };
  }, []);

  if (isBooting) return <BootScreen onComplete={() => setIsBooting(false)} />;

  return (
    <div 
      className="h-screen w-screen flex flex-col bg-black text-slate-100 overflow-hidden relative"
      style={{ '--accent': config.theme.primaryColor } as React.CSSProperties}
    >
      {/* Background FX */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-fuchsia-900/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-blue-900/10 rounded-full blur-[200px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,30,0.5)_0%,#000_100%)]" />
      </div>

      <header className="h-12 flex items-center justify-between px-8 z-50 glass-bright border-b border-white/5">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-400">
            <Zap size={14} fill="currentColor" className="animate-pulse" />
            {config.name}
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-widest">
            <Globe size={14} className="text-cyan-500" />
            VINCULADO: {new URL(config.remoteRepo).pathname.replace('/', '')}
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[12px] font-black text-white tracking-[0.3em] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        <div className="flex items-center gap-8 text-slate-400">
          <div className="flex items-center gap-3">
            <Signal size={16} className="text-emerald-500" />
            <span className="text-[10px] font-black font-mono">LINK: {metrics.remoteSyncStatus}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black font-mono">{Math.round(metrics.batteryLevel || 100)}%</span>
            <Battery size={16} className={metrics.batteryLevel && metrics.batteryLevel < 20 ? 'text-rose-500' : 'text-emerald-500'} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar currentView={currentView} setView={setCurrentView} />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide relative">
          <div className="max-w-7xl mx-auto view-transition h-full">
            {currentView === View.DASHBOARD && <Dashboard metrics={metrics} config={config} />}
            {currentView === View.SETTINGS && <Settings config={config} onUpdate={setConfig} />}
            {currentView === View.TERMINAL && <Terminal />}
            {currentView === View.AI_CORE && <AICore config={config} />}
            {currentView === View.EVOLUTION && <EvolutionCore />}
          </div>
        </main>
      </div>

      {/* Floating Aura Control */}
      <div className="fixed bottom-12 right-12 z-[100] group">
        <div className="absolute -inset-6 bg-fuchsia-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse" />
        <button 
          onClick={() => setCurrentView(View.AI_CORE)}
          className="relative glass rounded-full p-5 hover:scale-125 transition duration-700 border-fuchsia-500/40 shadow-[0_0_50px_rgba(217,70,239,0.2)]"
        >
          <AuraAvatar size="sm" isThinking={metrics.remoteSyncStatus === 'SYNCING'} />
        </button>
      </div>
    </div>
  );
};

export default App;
