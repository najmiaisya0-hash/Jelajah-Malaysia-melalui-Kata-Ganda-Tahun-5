import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playClickSound, speakMalay } from '../utils/audio';

interface DecorationsProps {
  showPlane?: boolean;
  showMascot?: boolean;
}

export const MalaysiaDecorations: React.FC<DecorationsProps> = ({
  showPlane = true,
  showMascot = true,
}) => {
  const [mascotBubble, setMascotBubble] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tips = [
    'Tahukah anda? Kata ganda penuh tidak mengubah kata dasar!',
    'Jom terokai keindahan Malaysia sambil belajar Bahasa Melayu!',
    'Syabas anak-anak Malaysia yang rajin menuntut ilmu!',
    'Gunung Kinabalu di Sabah adalah puncak tertinggi di Malaysia!',
    'Wau Bulan dan Bunga Raya adalah lambang kebanggaan negara kita!',
  ];

  const handleMascotClick = () => {
    playClickSound();
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setMascotBubble(randomTip);
    setHasInteracted(true);

    setTimeout(() => {
      setMascotBubble(null);
    }, 6000);
  };

  return (
    <>
      {/* Flying Malaysian Aeroplane Across Sky */}
      {showPlane && (
        <div className="pointer-events-none fixed top-16 left-0 right-0 z-20 overflow-hidden h-24">
          <div className="animate-fly-plane flex items-center gap-2">
            <div className="relative group pointer-events-auto cursor-pointer" onClick={() => {
              playClickSound();
            }}>
              <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-sky-200 flex items-center gap-2">
                <span className="text-xl">✈️</span>
                <span className="text-xs font-bold text-sky-800 tracking-wide">
                  Jelajah Malaysia Airlines
                </span>
                <span className="text-xs bg-red-600 text-white font-semibold px-2 py-0.5 rounded-full">
                  Tahun 5
                </span>
              </div>
              {/* Contrail trail behind plane */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-l from-white/70 to-transparent rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Floating Animated Mascot: Burung Kenyalang / Hornbill in Bottom Corner */}
      {showMascot && (
        <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
          <AnimatePresence>
            {mascotBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="mb-2 max-w-xs bg-white text-slate-800 p-3 rounded-2xl shadow-xl border-2 border-amber-300 relative text-xs font-medium leading-relaxed"
              >
                <div className="font-bold text-amber-700 mb-1 flex items-center justify-between">
                  <span>Si Kenyalang Berkata:</span>
                  <button
                    onClick={() => setMascotBubble(null)}
                    className="text-slate-400 hover:text-slate-700 text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
                {mascotBubble}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-amber-300 transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleMascotClick}
            aria-label="Tanya Maskot Kenyalang"
            className="group relative flex items-center gap-2 bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 text-white p-3 rounded-full shadow-2xl border-3 border-white hover:shadow-amber-500/50 transition-all cursor-pointer"
          >
            {/* Hornbill Mascot Icon & Glow */}
            <div className="relative">
              <span className="text-3xl filter drop-shadow">🦜</span>
              {!hasInteracted && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-left pr-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
                Pemandu Pelancong
              </span>
              <span className="text-xs font-extrabold">Si Kenyalang</span>
            </div>
          </motion.button>
        </div>
      )}
    </>
  );
};

/** Floating Malaysian Cultural Badges & Stickers */
export const MalaysiaCulturalStickers: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {/* Bahasa Kebangsaan Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl relative">
          <span>🇲🇾</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800">Bahasa Melayu</div>
          <div className="text-[11px] text-slate-700">Bahasa kebangsaan</div>
        </div>
      </motion.div>

      {/* Wau Bulan Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-blue-100 shadow-sm flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl animate-sway">
          <span>🪁</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800">Wau Bulan</div>
          <div className="text-[11px] text-slate-700">Warisan tradisi</div>
        </div>
      </motion.div>

      {/* Bunga Raya Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-2xl animate-pulse-soft">
          <span>🌺</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800">Bunga Raya</div>
          <div className="text-[11px] text-slate-700">Bunga kebangsaan</div>
        </div>
      </motion.div>

      {/* Pulau Tropika Card */}
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-amber-100 shadow-sm flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-2xl">
          <span>🏝️</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800">Pulau-pulau</div>
          <div className="text-[11px] text-slate-700">Indah & jernih</div>
        </div>
      </motion.div>
    </div>
  );
};
