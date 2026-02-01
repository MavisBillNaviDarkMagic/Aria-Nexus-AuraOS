
import React, { useState } from 'react';
import { 
  Save, RefreshCw, Smartphone, Variable, Zap, ShieldCheck, Eye, Mic, MapPin, 
  Camera, Github, Cpu, Box, CloudLightning, Key, Link as LinkIcon, Globe, 
  Settings as SettingsIcon, Brain, Palette, Network, Trash2, UploadCloud 
} from 'lucide-react';
import { SystemConfig } from '../types';

interface SettingsProps {
  config: SystemConfig;
  onUpdate: (config: SystemConfig) => void;
}

export const Settings: React.FC<SettingsProps> = ({ config, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState<SystemConfig>(config);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = () => {
    setIsSyncing(true);
    localStorage.setItem('aria_nexus_auraos_v1', JSON.stringify(localConfig));
    setTimeout(() => {
      onUpdate(localConfig);
      setIsSyncing(false);
    }, 1500);
  };

  const resetSystem = () => {
    if (confirm("¿Estás seguro de que deseas purgar toda la memoria del nexo local?")) {
      localStorage.removeItem('aria_nexus_auraos_v1');
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 pb-32 pb-40">
      <div className="xl:col-span-3 space-y-10">
        
        {/* Remote Command Panel (Nexo Identity) */}
        <section className="glass p-12 rounded-[4rem] relative overflow-hidden border-fuchsia-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-600/10 blur-[150px] -z-10" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h3 className="text-4xl font-black text-white tracking-tighter flex items-center gap-4">
                <Globe className="text-fuchsia-500 animate-spin-slow" size={36} />
                Mando de Identidad AuraOS
              </h3>
              <p className="text-slate-500 text-lg mt-2 font-semibold">Configuración de Soberanía y Enlace Remoto</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={resetSystem}
                className="p-5 bg-white/5 hover:bg-rose-500/10 text-rose-500 rounded-[2rem] transition-all"
                title="Resetear Memoria"
              >
                <Trash2 size={24} />
              </button>
              <button 
                onClick={handleSave}
                disabled={isSyncing}
                className="px-12 py-5 bg-gradient-to-br from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white rounded-[2.5rem] font-black flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-2xl aura-glow"
              >
                {isSyncing ? <RefreshCw className="animate-spin" size={20} /> : <UploadCloud size={20} />}
                {isSyncing ? 'SINCRONIZANDO...' : 'SINCRO GITHUB PRIME'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <InputGroup 
                icon={Github} 
                label="Repositorio de Extracción" 
                value={localConfig.remoteRepo} 
                onChange={(v) => setLocalConfig({...localConfig, remoteRepo: v})}
                placeholder="https://github.com/..."
              />
              <InputGroup 
                icon={Smartphone} 
                label="Identificador AuraID" 
                value={localConfig.deviceId} 
                onChange={(v) => setLocalConfig({...localConfig, deviceId: v})}
              />
              <InputGroup 
                icon={SettingsIcon} 
                label="Nombre del Nexo" 
                value={localConfig.name} 
                onChange={(v) => setLocalConfig({...localConfig, name: v})}
              />
            </div>

            <div className="space-y-10">
              <div className="p-8 rounded-[3rem] bg-black/40 border border-white/5 space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                  <Key size={14} className="text-amber-500" /> Protocolo de Firma Digital
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  AuraOS utilizará los secretos inyectados en GitHub Actions (SIGNING_KEY, ALIAS) para autenticar tus binarios Sovereign en el repositorio remoto vinculado.
                </p>
                <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-500">Estado Keystore:</span>
                  <span className="text-[10px] font-black text-emerald-500 px-3 py-1 bg-emerald-500/10 rounded-lg uppercase">Link Activo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Personality (Persona Matrix) */}
        <section className="glass p-12 rounded-[4rem] border-white/5">
          <div className="flex items-center gap-5 mb-12">
            <Brain size={28} className="text-rose-500" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Matriz de Consciencia</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <label className="block">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Tono de Interacción</span>
                <select 
                  value={localConfig.aiPersona.tone}
                  onChange={(e) => setLocalConfig({
                    ...localConfig, 
                    aiPersona: {...localConfig.aiPersona, tone: e.target.value as any}
                  })}
                  className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-white font-black"
                >
                  <option value="FORMAL">Protocolario</option>
                  <option value="CREATIVE">Soberano Creativo</option>
                  <option value="LOGICAL">Nexo Lógico</option>
                  <option value="AGGRESSIVE">Máxima Eficiencia</option>
                </select>
              </label>
              
              <SliderGroup 
                label="Nivel de Autonomía" 
                value={localConfig.aiPersona.autonomy} 
                onChange={(v) => setLocalConfig({...localConfig, aiPersona: {...localConfig.aiPersona, autonomy: v}})}
              />
            </div>
            <div className="space-y-8">
               <SliderGroup 
                label="Velocidad de Pulso (Respuesta)" 
                value={localConfig.aiPersona.responseSpeed} 
                onChange={(v) => setLocalConfig({...localConfig, aiPersona: {...localConfig.aiPersona, responseSpeed: v}})}
              />
              <InputGroup 
                icon={Globe} 
                label="Idioma del Núcleo" 
                value={localConfig.aiPersona.language} 
                onChange={(v) => setLocalConfig({...localConfig, aiPersona: {...localConfig.aiPersona, language: v}})}
              />
            </div>
          </div>
        </section>

        {/* Network & Infrastructure */}
        <section className="glass p-12 rounded-[4rem] border-white/5">
          <div className="flex items-center gap-5 mb-12">
            <Network size={28} className="text-cyan-500" />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Infraestructura Avanzada</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <InputGroup 
              icon={LinkIcon} 
              label="Endpoint API Principal" 
              value={localConfig.network.apiEndpoint} 
              onChange={(v) => setLocalConfig({...localConfig, network: { ...localConfig.network, apiEndpoint: v }})}
            />
            <InputGroup 
              icon={CloudLightning} 
              label="Sovereign Webhook" 
              value={localConfig.network.webhookUrl} 
              onChange={(v) => setLocalConfig({...localConfig, network: { ...localConfig.network, webhookUrl: v }})}
            />
          </div>
        </section>

        {/* Environment Variables */}
        <section className="glass p-12 rounded-[4rem] border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black flex items-center gap-5 text-white">
              <Variable size={28} className="text-emerald-400" />
              Cápsulas de Entorno (Remoto)
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(localConfig.environmentVariables).map(([key, value]) => (
              <div key={key} className="p-6 bg-black/50 border border-white/5 rounded-[2rem] hover:border-emerald-500/30 transition-all group shadow-inner">
                <div className="text-[9px] font-black text-slate-600 mb-2 group-hover:text-emerald-400 transition-colors uppercase tracking-widest">{key}</div>
                <div className="text-xs font-mono text-slate-200 truncate">{value}</div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Sidebar Settings (Permissions & UI) */}
      <div className="space-y-8">
        
        {/* UI Theme Customization */}
        <div className="glass p-10 rounded-[3.5rem] border-fuchsia-500/20 shadow-2xl">
          <h4 className="font-black text-xl mb-8 text-white flex items-center gap-3">
             <Palette size={20} className="text-fuchsia-500" /> Estética Aura
          </h4>
          <div className="space-y-8">
            <label className="block">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Color de Pulso</span>
              <input 
                type="color" 
                value={localConfig.theme.primaryColor} 
                onChange={(e) => setLocalConfig({...localConfig, theme: {...localConfig.theme, primaryColor: e.target.value}})}
                className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-none outline-none"
              />
            </label>
            <SliderGroup 
              label="Escala de Fuente" 
              value={localConfig.theme.fontScale} 
              onChange={(v) => setLocalConfig({...localConfig, theme: {...localConfig.theme, fontScale: v}})}
              min={0.8} max={1.4} step={0.1}
            />
          </div>
        </div>

        {/* Permissions */}
        <div className="glass p-10 rounded-[3.5rem] border-emerald-500/20 shadow-2xl overflow-hidden relative group">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />
           <h4 className="font-black text-xl mb-6 text-white flex items-center gap-3">
             <ShieldCheck size={20} className="text-emerald-500" /> Confianza Prime
           </h4>
           <div className="space-y-6">
              <PermissionItem 
                icon={Camera} 
                label="Visión Perimetral" 
                active={localConfig.permissions.camera} 
                onClick={() => setLocalConfig({...localConfig, permissions: {...localConfig.permissions, camera: !localConfig.permissions.camera}})}
              />
              <PermissionItem 
                icon={Mic} 
                label="Audición Cuántica" 
                active={localConfig.permissions.microphone} 
                onClick={() => setLocalConfig({...localConfig, permissions: {...localConfig.permissions, microphone: !localConfig.permissions.microphone}})}
              />
              <PermissionItem 
                icon={MapPin} 
                label="Ubicación Nexus" 
                active={localConfig.permissions.location} 
                onClick={() => setLocalConfig({...localConfig, permissions: {...localConfig.permissions, location: !localConfig.permissions.location}})}
              />
              <PermissionItem 
                icon={Eye} 
                label="Biometría Unificada" 
                active={localConfig.permissions.biometrics} 
                onClick={() => setLocalConfig({...localConfig, permissions: {...localConfig.permissions, biometrics: !localConfig.permissions.biometrics}})}
              />
           </div>
        </div>

        {/* System Stats Badge */}
        <div className="glass p-10 rounded-[3.5rem] border-cyan-500/20 bg-gradient-to-br from-slate-950 to-transparent">
           <div className="flex items-center gap-4 mb-8">
              <Zap size={24} className="text-cyan-400 animate-pulse" />
              <h4 className="font-black text-white uppercase tracking-tighter">Estado del Enlace</h4>
           </div>
           <div className="space-y-4">
              <StatusBadge label="NODE_STABILITY" value="OPTIMAL" color="text-emerald-500" />
              <StatusBadge label="APK_READY" value="YES" color="text-fuchsia-500" />
              <StatusBadge label="SOVEREIGNTY" value="1.0" color="text-amber-500" />
           </div>
           <div className="mt-10 p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 text-[9px] font-black text-cyan-400 text-center tracking-[0.3em] uppercase">
             DATOS ENCRIPTADOS END-TO-END
           </div>
        </div>

      </div>
    </div>
  );
};

const InputGroup: React.FC<{ icon: any; label: string; value: string; onChange: (v: string) => void; placeholder?: string }> = ({ icon: Icon, label, value, onChange, placeholder }) => (
  <label className="block group">
    <span className="text-[10px] font-black text-slate-500 uppercase mb-4 block tracking-widest group-hover:text-white transition-colors">{label}</span>
    <div className="relative">
      <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
      <input 
        type="text" 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950/80 border border-white/10 rounded-[2rem] pl-16 pr-8 py-6 text-sm font-mono text-fuchsia-50 focus:border-fuchsia-500/50 outline-none transition-all focus:ring-[15px] focus:ring-fuchsia-500/5"
      />
    </div>
  </label>
);

const SliderGroup: React.FC<{ label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }> = ({ label, value, onChange, min = 0, max = 1, step = 0.01 }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-mono text-fuchsia-400 font-bold">{(value * 100).toFixed(0)}%</span>
    </div>
    <input 
      type="range" 
      min={min} max={max} step={step} 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
    />
  </div>
);

const PermissionItem: React.FC<{ icon: any; label: string; active?: boolean; onClick: () => void }> = ({ icon: Icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-5 bg-white/5 rounded-[1.5rem] border border-white/5 hover:bg-white/10 transition-all cursor-pointer group"
  >
     <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl transition-colors ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'}`}>
          <Icon size={18} />
        </div>
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
     </div>
     <div className={`w-12 h-6 rounded-full relative transition-all duration-500 ${active ? 'bg-emerald-600 shadow-[0_0_15px_#10b981]' : 'bg-slate-800'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-lg ${active ? 'left-7' : 'left-1'}`} />
     </div>
  </div>
);

const StatusBadge: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center justify-between text-[10px] font-mono border-b border-white/5 pb-2">
    <span className="text-slate-600 font-black tracking-widest">{label}</span>
    <span className={`${color} font-black tracking-tighter`}>{value}</span>
  </div>
);
