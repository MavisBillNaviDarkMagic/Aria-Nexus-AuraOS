
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemMetrics } from '../types';
import { Cpu, Server, HardDrive, Clock, Activity, MessageSquare, Bell } from 'lucide-react';

const data = [
  { time: '00:00', load: 45 }, { time: '04:00', load: 32 },
  { time: '08:00', load: 68 }, { time: '12:00', load: 85 },
  { time: '16:00', load: 54 }, { time: '20:00', load: 38 },
  { time: '23:59', load: 41 },
];

interface DashboardProps {
  metrics: SystemMetrics;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  const [events, setEvents] = useState<{msg: string, time: string, type: string}[]>([]);

  useEffect(() => {
    const eventPool = [
      { msg: "Gradle Daemon: Process heartbeat optimized", type: "info" },
      { msg: "Nexus-Primary-Hub: Cache sync complete", type: "success" },
      { msg: "JVM: Minor GC collection completed", type: "info" },
      { msg: "Aura-Kernel: Security descriptors verified", type: "success" },
      { msg: "API-Link: Latency within nominal bounds", type: "info" }
    ];

    const interval = setInterval(() => {
      const randomEvent = eventPool[Math.floor(Math.random() * eventPool.length)];
      setEvents(prev => [{...randomEvent, time: new Date().toLocaleTimeString()}, ...prev].slice(0, 6));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="CPU" value={`${Math.round(metrics.cpu)}%`} icon={Cpu} color="text-violet-400" />
        <MetricCard label="RAM" value={`${Math.round(metrics.ram)}%`} icon={Server} color="text-cyan-400" />
        <MetricCard label="DISK" value={`${metrics.disk}%`} icon={HardDrive} color="text-amber-400" />
        <MetricCard label="UP" value={metrics.uptime} icon={Clock} color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-6 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg flex items-center gap-3">
              <Activity size={20} className="text-violet-400" />
              Nexus Performance Matrix
            </h3>
            <div className="flex gap-2">
               <div className="px-3 py-1 bg-violet-500/10 rounded-full text-[10px] font-bold text-violet-400 border border-violet-500/20">LIVE</div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="load" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-6 rounded-[2.5rem] border border-white/5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold flex items-center gap-3">
               <Bell size={18} className="text-cyan-400" />
               Kernel Events
             </h3>
             <span className="text-[10px] text-slate-500 font-mono">Real-time</span>
          </div>
          <div className="space-y-4 flex-1">
            {events.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <MessageSquare size={32} className="mb-2" />
                  <p className="text-xs">Waiting for events...</p>
               </div>
            ) : (
              events.map((ev, i) => (
                <div key={i} className="flex gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/5 animate-in slide-in-from-top-4 fade-in">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${ev.type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                  <div className="flex-1">
                    <p className="text-xs text-slate-200 leading-tight">{ev.msg}</p>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 block">{ev.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <div className="glass p-6 rounded-[2rem] border border-white/5">
        <h3 className="font-bold mb-6 flex items-center gap-3">
          <Server size={18} className="text-amber-400" />
          Active Micro-Nodes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <NodeStatus name="Primary-Hub-α" status="online" load={12} />
          <NodeStatus name="Gradle-Daemon" status="online" load={45} />
          <NodeStatus name="Gemini-Core" status="online" load={88} />
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{ label: string; value: string; icon: any; color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="glass p-4 md:p-6 rounded-[2rem] border border-white/5 hover:border-violet-500/20 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-slate-900 group-hover:scale-110 transition-transform ${color}`}>
        <Icon size={20} />
      </div>
    </div>
    <div className="text-xl md:text-2xl font-bold text-white mb-1 font-mono tracking-tight">{value}</div>
    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</div>
  </div>
);

const NodeStatus: React.FC<{ name: string; status: 'online' | 'idle' | 'offline'; load: number }> = ({ name, status, load }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/5">
    <div className="flex items-center gap-4">
      <div className={`w-2.5 h-2.5 rounded-full ${status === 'online' ? 'bg-emerald-400' : status === 'idle' ? 'bg-amber-400' : 'bg-rose-400'} shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse`} />
      <span className="text-sm font-bold text-slate-300">{name}</span>
    </div>
    <div className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-lg">{load}%</div>
  </div>
);
