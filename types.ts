
export enum View {
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  TERMINAL = 'TERMINAL',
  AI_CORE = 'AI_CORE',
  EVOLUTION = 'EVOLUTION'
}

export interface SystemConfig {
  // Identidad
  name: string;
  version: string;
  deviceId: string;
  remoteRepo: string;
  nexusStatus: string;
  consciousnessLevel: number;

  // Entorno Técnico
  javaHome: string;
  gradleHome: string;
  gradleVersion: string;
  javaVersion: string;
  jvmOptions: string;
  androidVersion: string;
  sdkLevel: number;
  environmentVariables: Record<string, string>;

  // IA Persona
  aiPersona: {
    tone: 'FORMAL' | 'CREATIVE' | 'LOGICAL' | 'AGGRESSIVE';
    autonomy: number;
    responseSpeed: number;
    language: string;
  };

  // UI / UX
  theme: {
    primaryColor: string;
    borderRadius: string;
    blurIntensity: string;
    fontScale: number;
  };

  // Seguridad y Permisos
  permissions: {
    camera: boolean;
    microphone: boolean;
    location: boolean;
    storage: boolean;
    biometrics: boolean;
  };

  // Red Avanzada
  network: {
    webhookUrl: string;
    apiEndpoint: string;
    heartbeatInterval: number;
  };
}

export interface SystemMetrics {
  cpu: number;
  ram: number;
  disk: number;
  uptime: string;
  batteryLevel?: number;
  resonance: number;
  remoteSyncStatus: 'IDLE' | 'SYNCING' | 'SECURE' | 'OFFLINE';
  neuralLoad: number;
}

export interface ChatMessage {
  role: 'user' | 'aura';
  content: string;
  timestamp: Date;
  intent?: string;
}
