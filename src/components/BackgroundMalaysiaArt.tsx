import React from 'react';

export const BackgroundMalaysiaArt: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Cinematic Background Image - Menara Berkembar KLCC Pada Waktu Malam */}
      <img
        src="/assets/aistudio/image_9acbffaa.png"
        alt="Latar Belakang Menara Berkembar KLCC"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
      />

      {/* 2. Measured Contrast Scrim & Ambient Overlay for Crystal Clear Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/35 to-slate-950/70" />

      {/* 3. Subtle Ambient Malaysian Gold Shimmer Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
    </div>
  );
};
