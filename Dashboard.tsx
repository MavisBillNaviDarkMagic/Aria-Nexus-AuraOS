
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { SystemMetrics, SystemConfig } from '../types';
// Added missing Github and Brain imports
import { Cpu, Server, HardDrive, Clock, Activity, Battery, Zap, Smartphone, Shield, Box, Globe, ShieldAlert, Github, Brain } from 'lucide-react';

const flowData = [
  { time: '00:00', load: 15, neural: 5 }, { time: '04:00', load: 10, neural: 2 },
  { time: '08:00', load: 40, neural: 20 }, { time: '12:00', load: 60, neural: 55 },
  { time: '16:00', load: 80, neural: 85 }, { time: '20:00', load: 45, neural: 30 },
  { time: '23:59', load: 20, neural: 10 },
];

interface DashboardProps {
  metrics: SystemMetrics;
  config: SystemConfig;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, config }) => {
  return (
    <div className="space-y-8 lg:space-y-12 pb-20 lg:pb-0">
      
      {/* Prime Status Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
        <StatusCard label="CPU" value={`${Math.round(metrics.cpu)}%`} icon={Cpu} color="text-rose-500" />
        <StatusCard label="RAM" value={`${Math.round(metrics.ram)}%`} icon={Server} color="text-fuchsia-500" />
        <StatusCard label="LINK" value={`${metrics.resonance}%`} icon={Zap} color="text-amber-500" />
        <StatusCard label="CARGA NEURAL" value={`${Math.round(metrics.neuralLoad)}%`} icon={Activity} color="text-cyan-500" />
        <StatusCard label="UPTIME" value={metrics.uptime} icon={Clock} color="text-slate-400" />
        <div className="hidden lg:block">
           <StatusCard label="PROTOCOLO" value="SOVEREIGN" icon={Shield} color="text-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Neural Chart */}
        <div className="lg:col-span-2 glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fuchsia-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex items-center justify-between mb-10 relative">
            <div>
               <h3 className="text-3xl font-black text-white tracking-tighter">FLUJO DE CONSCIENCIA</h3>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">AuraOS Real-time Neural Resonance</p>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-fuchsia-400 uppercase">Remote Sync Active</div>
            </div>
          </div>
          <div className="h-[350px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.theme.primaryColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={config.theme.primaryColor} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNeural" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="load" stroke={config.theme.primaryColor} strokeWidth={4} fill="url(#colorFlow)" />
                <Area type="monotone" dataKey="neural" stroke="#06b6d4" strokeWidth={2} fill="url(#colorNeural)" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hardware & Identity Hub */}
        <div className="glass rounded-[3rem] p-10 flex flex-col gap-8 bg-gradient-to-br from-slate-950 to-black">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-white tracking-tighter uppercase">Nexus Identity</h3>
              <Globe size={18} className="text-slate-700" />
           </div>
           <div className="space-y-8 flex-1">
              <HardwareLine label="Soberanía OS" value={config.androidVersion} icon={Smartphone} />
              <HardwareLine label="Vínculo Repositorio" value={new URL(config.remoteRepo).pathname.split('/').pop() || ''} icon={Github} />
              <HardwareLine label="Nivel de Autonomía" value={`${(config.aiPersona.autonomy * 100).toFixed(0)}%`} icon={Brain} />
              <HardwareLine label="ZGC Engine" value="Ultra Low Latency" icon={Zap} />
              <HardwareLine label="Módulo Biométrico" value={config.permissions.biometrics ? 'Activado' : 'Standby'} icon={ShieldAlert} />
           </div>
           
           <div className="mt-8 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] text-center aura-glow">
              SISTEMA SOBERANO EN LÍNEA
           </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{ label: string; value: string; icon: any; color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="glass rounded-[2rem] p-6 hover:border-white/20 transition-all duration-700 group border-white/5 shadow-2xl hover:-translate-y-2">
    <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition duration-700 ${color}`}>
      <Icon size={20} />
    </div>
    <div className="text-3xl font-black text-white font-mono tracking-tighter drop-shadow-lg">{value}</div>
    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{label}</div>
  </div>
);

const HardwareLine: React.FC<{ label: string; value: string; icon: any }> = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-5 group">
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-fuchsia-400 transition-colors border border-white/5 group-hover:border-fuchsia-500/20">
      <Icon size={20} />
    </div>
    <div>
      <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 group-hover:text-slate-400 transition-colors">{label}</div>
      <div className="text-sm font-black text-slate-200 tracking-tight">{value}</div>
    </div>
  </div>
);
