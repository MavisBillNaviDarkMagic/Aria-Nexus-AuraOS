
import React from 'react';

interface AuraAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isThinking?: boolean;
}

export const AuraAvatar: React.FC<AuraAvatarProps> = ({ size = 'md', isThinking = false }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`relative flex items-center justify-center ${dimensions[size]} group`}>
      {/* Glow effect layers */}
      <div className={`absolute inset-0 bg-violet-500/30 rounded-full blur-xl animate-pulse ${isThinking ? 'scale-125' : 'scale-100'}`} />
      <div className={`absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse delay-700 ${isThinking ? 'scale-150' : 'scale-110'}`} />
      
      <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        {/* Orbital Rings */}
        <circle 
          cx="50" cy="50" r="45" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          className={`text-violet-500/40 ${isThinking ? 'animate-[spin_3s_linear_infinite]' : 'animate-[spin_8s_linear_infinite]'}`} 
          strokeDasharray="10 20"
        />
        <circle 
          cx="50" cy="50" r="38" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1" 
          className={`text-cyan-400/30 ${isThinking ? 'animate-[spin_2s_linear_infinite_reverse]' : 'animate-[spin_12s_linear_infinite_reverse]'}`} 
          strokeDasharray="30 10"
        />
        
        {/* Main Body */}
        <defs>
          <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
        </defs>

        <g filter="url(#goo)">
          {/* Pulsing Core */}
          <circle 
            cx="50" cy="50" 
            r={isThinking ? "22" : "18"} 
            fill="url(#auraGradient)" 
            className="animate-pulse shadow-inner"
          />
          {/* Floating Satellites (Consciousness sparks) */}
          <circle cx="50" cy="30" r="4" fill="#f8fafc" className={`animate-bounce ${isThinking ? 'duration-300' : 'duration-1000'}`} />
          <circle cx="70" cy="55" r="3" fill="#06b6d4" className={`animate-ping ${isThinking ? 'duration-500' : 'duration-2000'}`} />
        </g>
        
        {/* Central Eye / Singularity */}
        <circle cx="50" cy="50" r="6" fill="#020617" className="opacity-80" />
        <circle cx="50" cy="50" r="2" fill="#fff" className="animate-pulse" />
      </svg>

      {/* Connection particles for "isThinking" state */}
      {isThinking && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1000}ms`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
