import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  playClickSound,
  playVoiceClip,
  stopVoiceClip,
  playPomPomSound,
  playWowSound,
  AUDIO_FILES,
} from '../utils/audio';

interface MascotProps {
  className?: string;
}

/**
 * 1. SET INDUKSI MASCOT (Left Header Position):
 * Kapten Pengembara Cilik Malaysia -> Plays user's real voice recording!
 */
export const MascotInduksi: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    setBounced(true);
    setIsSpeaking(true);
    playVoiceClip(AUDIO_FILES.kaptenCilik, () => {
      setIsSpeaking(false);
    });
    setTimeout(() => setBounced(false), 900);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik saya untuk mendengar suara Kapten Cilik!"
    >
      {/* Prominent Pulsing "Klik Saya!" Badge */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      {/* Compact SVG Mascot Graphic */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        {/* Floating Clouds Background */}
        <motion.div
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 -left-1 opacity-80"
        >
          <svg width="40" height="20" viewBox="0 0 60 30" fill="white">
            <path d="M10,25 Q5,25 0,20 Q0,10 10,10 Q15,0 25,5 Q35,0 45,8 Q55,5 60,15 Q60,25 50,25 Z" opacity="0.85" />
          </svg>
        </motion.div>

        {/* Airplane & Pilot SVG */}
        <motion.svg
          animate={bounced ? { y: [-10, 0], rotate: [-8, 4, 0] } : { y: [-3, 3, -3], rotate: [-1, 2, -1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 160 150"
          className="drop-shadow-xl"
        >
          {/* Compass Ring Behind */}
          <circle cx="80" cy="85" r="48" fill="#0284C7" stroke="#38BDF8" strokeWidth="4" opacity="0.3" />
          <polygon points="80,45 86,85 74,85" fill="#EF4444" />
          <polygon points="80,125 86,85 74,85" fill="#F8FAFC" />
          <circle cx="80" cy="85" r="5" fill="#FBBF24" />

          {/* Plane Body */}
          <path d="M30 80 Q20 80 15 70 Q25 65 50 65 L110 65 Q145 65 140 85 Q135 100 95 100 L45 100 Z" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
          <path d="M110 65 Q145 65 140 85 Q135 100 115 100 Z" fill="#EF4444" />
          <path d="M30 82 L130 82" stroke="#FACC15" strokeWidth="4" />

          {/* Wings */}
          <polygon points="65,85 40,115 60,115 85,85" fill="#0284C7" />
          <polygon points="70,65 50,38 68,38 90,65" fill="#0369A1" />

          {/* Propeller Spinner */}
          <motion.ellipse
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '142px 82px' }}
            cx="142"
            cy="82"
            rx="4"
            ry="22"
            fill="#94A3B8"
            opacity="0.85"
          />
          <circle cx="142" cy="82" r="5" fill="#1E293B" />

          {/* Cockpit Window */}
          <ellipse cx="90" cy="62" rx="18" ry="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />

          {/* Cute Pilot Kid */}
          <circle cx="90" cy="56" r="13" fill="#FED7AA" />
          <path d="M77 52 Q90 40 103 52 Z" fill="#78350F" />
          <ellipse cx="85" cy="50" rx="4" ry="3.5" fill="#E0F2FE" stroke="#451A03" strokeWidth="1.5" />
          <ellipse cx="95" cy="50" rx="4" ry="3.5" fill="#E0F2FE" stroke="#451A03" strokeWidth="1.5" />
          <line x1="89" y1="50" x2="91" y2="50" stroke="#451A03" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="86" cy="57" r="1.5" fill="#1E293B" />
          <circle cx="94" cy="57" r="1.5" fill="#1E293B" />
          <path d={isSpeaking ? "M87 61 Q90 66 93 61" : "M88 61 Q90 64 92 61"} stroke="#1E293B" strokeWidth="1.5" fill={isSpeaking ? "#EF4444" : "none"} />
          <circle cx="83" cy="60" r="2" fill="#FDA4AF" />
          <circle cx="97" cy="60" r="2" fill="#FDA4AF" />

          {/* Mini Flag */}
          <polygon points="20,65 10,40 28,40 38,65" fill="#EF4444" />
          <rect x="12" y="40" width="16" height="10" fill="#1E3A8A" />
          <polygon points="18,45 23,43 20,48" fill="#FACC15" />
        </motion.svg>
      </div>

      <span className="bg-white/95 text-sky-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-sky-300 mt-1 whitespace-nowrap">
        Kapten Cilik ✈️
      </span>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-sky-900 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-sky-400 whitespace-nowrap"
          >
            🔊 "Mari kita terbang..."
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * 2. LANGKAH 1 MASCOT:
 * Sang Kancil Bijak -> Plays user's real voice recording!
 */
export const MascotLangkah1: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    setBounced(true);
    setIsSpeaking(true);
    playVoiceClip(AUDIO_FILES.sangKancil, () => {
      setIsSpeaking(false);
    });
    setTimeout(() => setBounced(false), 900);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik saya untuk mendengar penerangan Sang Kancil!"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        <motion.svg
          animate={bounced ? { scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] } : { y: [-3, 3, -3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 150 140"
          className="drop-shadow-xl"
        >
          <circle cx="75" cy="70" r="46" fill="#F59E0B" opacity="0.25" />
          <rect x="52" y="80" width="46" height="40" rx="14" fill="#059669" />
          <line x1="52" y1="92" x2="98" y2="92" stroke="#FBBF24" strokeWidth="2.5" />

          <ellipse cx="75" cy="55" rx="22" ry="20" fill="#B45309" />
          <ellipse cx="75" cy="62" rx="14" ry="11" fill="#FEF3C7" />

          <path d="M62 38 Q58 24 50 20 Q54 28 64 34" fill="#78350F" />
          <path d="M88 38 Q92 24 100 20 Q96 28 86 34" fill="#78350F" />

          <polygon points="63,38 87,38 84,26 66,26" fill="#18181B" />
          <line x1="66" y1="36" x2="84" y2="36" stroke="#FBBF24" strokeWidth="1" />

          <circle cx="67" cy="54" r="7" fill="white" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="83" cy="54" r="7" fill="white" stroke="#78350F" strokeWidth="1.5" />
          <line x1="74" y1="54" x2="76" y2="54" stroke="#78350F" strokeWidth="2" />
          <circle cx="68" cy="54" r="3" fill="#1E293B" />
          <circle cx="67" cy="52.5" r="1" fill="white" />
          <circle cx="82" cy="54" r="3" fill="#1E293B" />
          <circle cx="81" cy="52.5" r="1" fill="white" />

          <ellipse cx="75" cy="62" rx="3" ry="2" fill="#18181B" />
          <path d={isSpeaking ? "M71 65 Q75 70 79 65" : "M72 65 Q75 68 78 65"} stroke="#18181B" strokeWidth="1.5" fill={isSpeaking ? "#EF4444" : "none"} />

          <path d="M38 100 Q75 110 75 125 Q38 115 38 100 Z" fill="#F8FAFC" stroke="#B45309" strokeWidth="1.5" />
          <path d="M112 100 Q75 110 75 125 Q112 115 112 100 Z" fill="#F1F5F9" stroke="#B45309" strokeWidth="1.5" />
          <line x1="75" y1="105" x2="75" y2="125" stroke="#D97706" strokeWidth="3" />
        </motion.svg>
      </div>

      <span className="bg-white/95 text-amber-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-amber-300 mt-1 whitespace-nowrap">
        Sang Kancil 🦌
      </span>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-amber-950 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-amber-400 whitespace-nowrap"
          >
            🔊 "3 Jenis Kata Ganda!"
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * 3. LANGKAH 2 MASCOT:
 * Penyair Cilik -> Plays user's real pantun voice recording!
 */
export const MascotLangkah2: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    setBounced(true);
    setIsSpeaking(true);
    playVoiceClip(AUDIO_FILES.pantunMutiara, () => {
      setIsSpeaking(false);
    });
    setTimeout(() => setBounced(false), 900);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik saya untuk mendengar pantun indah!"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        <motion.span
          animate={{ y: [-4, 4, -4], rotate: [-8, 8, -8] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute top-1 left-1 text-sm drop-shadow"
        >
          🎵
        </motion.span>
        <motion.span
          animate={{ y: [4, -4, 4], rotate: [8, -8, 8] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute top-2 right-1 text-sm drop-shadow"
        >
          🎶
        </motion.span>

        <motion.svg
          animate={bounced ? { scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] } : { y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 150 140"
          className="drop-shadow-xl"
        >
          <circle cx="75" cy="72" r="46" fill="#F43F5E" opacity="0.25" />
          <rect x="52" y="80" width="46" height="42" rx="14" fill="#E11D48" />
          <rect x="52" y="98" width="46" height="18" rx="6" fill="#F59E0B" />
          <line x1="52" y1="104" x2="98" y2="104" stroke="#78350F" strokeWidth="1" strokeDasharray="3,2" />

          <circle cx="75" cy="55" r="20" fill="#FED7AA" />
          <path d="M54 48 Q75 22 96 48 Z" fill="#BE123C" />
          <polygon points="75,22 84,36 66,36" fill="#9F1239" />
          <circle cx="75" cy="22" r="3" fill="#FBBF24" />
          <path d="M52 48 Q75 52 98 48" stroke="#FBBF24" strokeWidth="2.5" fill="none" />

          <path d="M65 54 Q69 50 73 54" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M77 54 Q81 50 85 54" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          <ellipse cx="75" cy="62" rx={isSpeaking ? 5 : 4} ry={isSpeaking ? 5 : 3} fill="#991B1B" />
          <path d="M72 61 Q75 65 78 61" fill="#FDA4AF" />

          <circle cx="63" cy="59" r="2.5" fill="#FB7185" />
          <circle cx="87" cy="59" r="2.5" fill="#FB7185" />

          <motion.g
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ transformOrigin: '100px 90px' }}
          >
            <path d="M102 75 Q115 55 125 45 Q115 65 105 85 Z" fill="#F8FAFC" stroke="#E11D48" strokeWidth="1.5" />
            <ellipse cx="100" cy="88" rx="5" ry="4" fill="#FED7AA" />
          </motion.g>
          <rect x="42" y="86" width="16" height="24" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="52" cy="88" rx="4" ry="4" fill="#FED7AA" />
        </motion.svg>
      </div>

      <span className="bg-white/95 text-rose-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-rose-300 mt-1 whitespace-nowrap">
        Penyair Cilik 📜
      </span>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-rose-950 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-rose-400 whitespace-nowrap"
          >
            🔊 "Indah bahasa cermin budaya..."
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * 4. LANGKAH 3 MASCOT:
 * Kotak Ajaib -> NO voice, purely celebratory sound effects ("Pom Pom!" & "Wow!") as requested!
 */
export const MascotLangkah3: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const handleClick = () => {
    setBounced(true);
    setShowSparkle(true);
    // Play sound effect "pom pom!" / "wow!" without voice
    playPomPomSound();
    setTimeout(() => playWowSound(), 180);
    setTimeout(() => {
      setBounced(false);
      setShowSparkle(false);
    }, 1200);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik Kotak Ajaib untuk bunyi kejutan!"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        <motion.span
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-1 left-2 text-sm"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ scale: [1.2, 0.8, 1.2], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute top-2 right-2 text-sm"
        >
          ⭐
        </motion.span>

        <motion.svg
          animate={bounced ? { y: [-10, 0], scale: [1, 1.15, 1] } : { y: [-3, 3, -3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 150 140"
          className="drop-shadow-xl"
        >
          <circle cx="75" cy="75" r="46" fill="#9333EA" opacity="0.25" />
          <rect x="35" y="65" width="80" height="55" rx="10" fill="#7E22CE" stroke="#FBBF24" strokeWidth="3" />
          <line x1="75" y1="65" x2="75" y2="120" stroke="#FBBF24" strokeWidth="8" />
          <line x1="35" y1="92" x2="115" y2="92" stroke="#FBBF24" strokeWidth="4" />

          <motion.g
            animate={{ rotate: [-5, 2, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '35px 65px' }}
          >
            <rect x="30" y="48" width="90" height="18" rx="6" fill="#A855F7" stroke="#FBBF24" strokeWidth="3" />
            <line x1="75" y1="48" x2="75" y2="66" stroke="#FBBF24" strokeWidth="8" />
            <circle cx="75" cy="46" r="6" fill="#EF4444" />
            <ellipse cx="66" cy="42" rx="7" ry="5" fill="#EF4444" />
            <ellipse cx="84" cy="42" rx="7" ry="5" fill="#EF4444" />
          </motion.g>

          <circle cx="56" cy="80" r="5" fill="white" />
          <circle cx="57" cy="80" r="2.5" fill="#1E293B" />
          <circle cx="94" cy="80" r="5" fill="white" />
          <circle cx="93" cy="80" r="2.5" fill="#1E293B" />

          <circle cx="75" cy="92" r="5" fill="#FDE047" />
          <polygon points="73,94 77,94 76,102 74,102" fill="#78350F" />
        </motion.svg>
      </div>

      <span className="bg-white/95 text-purple-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-purple-300 mt-1 whitespace-nowrap">
        Kotak Ajaib 🎁
      </span>

      <AnimatePresence>
        {showSparkle && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-purple-950 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-purple-400 whitespace-nowrap"
          >
            🎉 Pom Pom! Wow!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * 5. REFLEKSI MASCOT:
 * Si Manja Orang Utan Borneo -> Plays user's real voice recording!
 */
export const MascotRefleksi: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = () => {
    setBounced(true);
    setIsSpeaking(true);
    playVoiceClip(AUDIO_FILES.borneo, () => {
      setIsSpeaking(false);
    });
    setTimeout(() => setBounced(false), 900);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik saya untuk mendengar kata-kata semangat!"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        <motion.span
          animate={{ scale: [1, 1.25, 1], y: [-4, 4, -4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute top-1 left-1 text-base"
        >
          💖
        </motion.span>
        <motion.span
          animate={{ scale: [1.2, 0.9, 1.2], y: [4, -4, 4] }}
          transition={{ duration: 2.1, repeat: Infinity }}
          className="absolute top-2 right-1 text-sm"
        >
          ✨
        </motion.span>

        <motion.svg
          animate={bounced ? { scale: [1, 1.12, 1], rotate: [-5, 5, 0] } : { y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 150 140"
          className="drop-shadow-xl"
        >
          <circle cx="75" cy="70" r="46" fill="#10B981" opacity="0.25" />
          <ellipse cx="75" cy="90" rx="34" ry="30" fill="#C2410C" />

          <circle cx="48" cy="52" r="10" fill="#EA580C" />
          <circle cx="48" cy="52" r="6" fill="#FDBA74" />
          <circle cx="102" cy="52" r="10" fill="#EA580C" />
          <circle cx="102" cy="52" r="6" fill="#FDBA74" />

          <circle cx="75" cy="55" r="26" fill="#EA580C" />
          <ellipse cx="75" cy="60" rx="19" ry="16" fill="#FED7AA" />

          <ellipse cx="67" cy="54" rx="4.5" ry="5.5" fill="#1E293B" />
          <circle cx="65.5" cy="52" r="1.8" fill="white" />
          <ellipse cx="83" cy="54" rx="4.5" ry="5.5" fill="#1E293B" />
          <circle cx="81.5" cy="52" r="1.8" fill="white" />

          <ellipse cx="73" cy="63" rx="1.5" ry="1.2" fill="#7C2D12" />
          <ellipse cx="77" cy="63" rx="1.5" ry="1.2" fill="#7C2D12" />
          <path d={isSpeaking ? "M69 66 Q75 74 81 66" : "M70 66 Q75 71 80 66"} stroke="#7C2D12" strokeWidth="2" fill={isSpeaking ? "#DC2626" : "none"} strokeLinecap="round" />

          <motion.g
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '75px 95px' }}
          >
            <path
              d="M75 110 C50 90, 50 78, 62 74 C70 70, 75 78, 75 80 C75 78, 80 70, 88 74 C100 78, 100 90, 75 110 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            <circle cx="75" cy="88" r="4" fill="#FACC15" />
          </motion.g>

          <ellipse cx="50" cy="90" rx="9" ry="7" fill="#C2410C" />
          <ellipse cx="100" cy="90" rx="9" ry="7" fill="#C2410C" />
        </motion.svg>
      </div>

      <span className="bg-white/95 text-emerald-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-emerald-300 mt-1 whitespace-nowrap">
        Si Manja Borneo 🦧
      </span>

      <AnimatePresence>
        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-emerald-950 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-emerald-400 whitespace-nowrap"
          >
            🔊 "Bangga jadi anak Malaysia!"
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/**
 * 6. MANUAL PENGGUNA MASCOT:
 * Pengarah Cilik -> NO voice, purely click sound effect & clapperboard action!
 */
export const MascotManual: React.FC<MascotProps> = ({ className = '' }) => {
  const [bounced, setBounced] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const handleClick = () => {
    playClickSound();
    setBounced(true);
    setShowAction(true);
    setTimeout(() => {
      setBounced(false);
      setShowAction(false);
    }, 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative cursor-pointer select-none flex flex-col items-center shrink-0 ${className}`}
      title="Klik Pengarah Cilik!"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], y: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-3 z-30 whitespace-nowrap bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-1 ring-2 ring-yellow-400/50"
      >
        <span>👉 Klik Saya!</span>
        <span className="text-yellow-700">✨</span>
      </motion.div>

      <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex items-center justify-center pt-2">
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1 left-1 text-sm"
        >
          🎬
        </motion.span>
        <motion.span
          animate={{ scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute top-2 right-1 text-sm"
        >
          ⭐
        </motion.span>

        <motion.svg
          animate={bounced ? { scale: [1, 1.12, 1], rotate: [0, -6, 6, 0] } : { y: [-3, 3, -3] }}
          transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
          width="115"
          height="110"
          viewBox="0 0 150 140"
          className="drop-shadow-xl"
        >
          <circle cx="75" cy="70" r="46" fill="#4F46E5" opacity="0.25" />
          <rect x="52" y="80" width="46" height="42" rx="14" fill="#312E81" />
          <rect x="62" y="80" width="26" height="42" fill="#4338CA" />

          <circle cx="75" cy="55" r="20" fill="#FED7AA" />
          <ellipse cx="75" cy="40" rx="22" ry="10" fill="#1E1B4B" />
          <circle cx="75" cy="32" r="3" fill="#EF4444" />

          <path d="M52 50 Q75 30 98 50" stroke="#FBBF24" strokeWidth="4" fill="none" />
          <rect x="49" y="47" width="8" height="15" rx="4" fill="#EF4444" />
          <rect x="93" y="47" width="8" height="15" rx="4" fill="#EF4444" />

          <ellipse cx="68" cy="55" rx="3.5" ry="4.5" fill="#1E293B" />
          <ellipse cx="82" cy="55" rx="3.5" ry="4.5" fill="#1E293B" />
          <path d="M70 63 Q75 68 80 63" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />

          <motion.g
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '75px 105px' }}
          >
            <rect x="45" y="88" width="60" height="38" rx="5" fill="#18181B" stroke="#4F46E5" strokeWidth="1.5" />
            <rect x="43" y="78" width="64" height="12" rx="3" fill="#18181B" />
            <polygon points="46,78 52,78 48,90 42,90" fill="white" />
            <polygon points="58,78 64,78 60,90 54,90" fill="white" />
            <polygon points="70,78 76,78 72,90 66,90" fill="white" />
            <polygon points="82,78 88,78 84,90 78,90" fill="white" />
            <polygon points="94,78 100,78 96,90 90,90" fill="white" />
            <polygon points="72,100 82,106 72,112" fill="#FACC15" />
          </motion.g>
        </motion.svg>
      </div>

      <span className="bg-white/95 text-indigo-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full shadow-md border border-indigo-300 mt-1 whitespace-nowrap">
        Pengarah Cilik 🎬
      </span>

      <AnimatePresence>
        {showAction && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 bg-white text-indigo-950 font-extrabold text-[9px] sm:text-[10px] px-2.5 py-1 rounded-xl shadow-xl border-2 border-indigo-400 whitespace-nowrap"
          >
            🎬 Aksi!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
