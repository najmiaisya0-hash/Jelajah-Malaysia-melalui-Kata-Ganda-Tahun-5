import React, { useState } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { SetInduksiPage } from './components/SetInduksiPage';
import { Langkah1Page } from './components/Langkah1Page';
import { Langkah2Page } from './components/Langkah2Page';
import { Langkah3Page } from './components/Langkah3Page';
import { RefleksiPage } from './components/RefleksiPage';
import { ManualPage } from './components/ManualPage';
import { MalaysiaDecorations } from './components/MalaysiaDecorations';
import { BackgroundMalaysiaArt } from './components/BackgroundMalaysiaArt';
import { AIStudioToolbar } from './components/AIStudioToolbar';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isStudioMode, setIsStudioMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Themes and Animation configuration
  const [activeTheme, setActiveTheme] = useState<'jalur-gemilang' | 'rimba-tropika' | 'warisan-batik'>('jalur-gemilang');
  const [animationStyle, setAnimationStyle] = useState<'energetic' | 'gentle' | 'minimal'>('energetic');
  const [showPlane, setShowPlane] = useState(true);
  const [showMascot, setShowMascot] = useState(true);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme wrapper styling with translucent backing for KLCC background image
  const themeStyles = {
    'jalur-gemilang': 'bg-slate-950/25',
    'rimba-tropika': 'bg-emerald-950/30',
    'warisan-batik': 'bg-purple-950/30',
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative ${themeStyles[activeTheme]}`}>
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isStudioMode={isStudioMode}
        onToggleStudioMode={() => setIsStudioMode(!isStudioMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* AI Studio Builder & Animation Toolbar */}
      <AIStudioToolbar
        isOpen={isStudioMode}
        onClose={() => setIsStudioMode(false)}
        activeTheme={activeTheme}
        onChangeTheme={setActiveTheme}
        animationStyle={animationStyle}
        onChangeAnimationStyle={setAnimationStyle}
        showPlane={showPlane}
        onTogglePlane={() => setShowPlane(!showPlane)}
        showMascot={showMascot}
        onToggleMascot={() => setShowMascot(!showMascot)}
      />

      {/* Night KLCC Starry Sky Background Wallpaper */}
      <BackgroundMalaysiaArt />

      {/* Floating Animated Malaysian Elements */}
      <MalaysiaDecorations
        showPlane={showPlane && animationStyle !== 'minimal'}
        showMascot={showMascot}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'home' && <HomeHero onNavigate={handleNavigate} />}
        {currentPage === 'induksi' && <SetInduksiPage onNavigate={handleNavigate} />}
        {currentPage === 'langkah1' && <Langkah1Page onNavigate={handleNavigate} />}
        {currentPage === 'langkah2' && <Langkah2Page onNavigate={handleNavigate} />}
        {currentPage === 'langkah3' && <Langkah3Page onNavigate={handleNavigate} />}
        {currentPage === 'refleksi' && <RefleksiPage onNavigate={handleNavigate} />}
        {currentPage === 'manual' && <ManualPage onNavigate={handleNavigate} />}
      </main>

      {/* Clean Footer with Cultural Attribution & Quick Nav */}
      <footer className="mt-auto relative z-10 bg-slate-950/85 backdrop-blur-md border-t border-slate-800 py-8 px-4 text-center space-y-3 text-slate-300">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
          <button
            onClick={() => handleNavigate('home')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Laman Utama
          </button>
          <button
            onClick={() => handleNavigate('induksi')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Set Induksi (Peta)
          </button>
          <button
            onClick={() => handleNavigate('langkah1')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Langkah 1 (Jenis Kata Ganda)
          </button>
          <button
            onClick={() => handleNavigate('langkah2')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Langkah 2 (Cabaran Pantun)
          </button>
          <button
            onClick={() => handleNavigate('langkah3')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Langkah 3 (Misi Karya)
          </button>
          <button
            onClick={() => handleNavigate('refleksi')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Refleksi Digital
          </button>
          <button
            onClick={() => handleNavigate('manual')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Manual & Video
          </button>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Jelajah Malaysia melalui Kata Ganda · Modul Pembelajaran Digital Interaktif Berasaskan Patriotisme (Bahasa Melayu Tahun 5 KSSR).
        </p>
        <p className="text-[11px] text-slate-500">
          Menjana generasi celik bahasa, berjiwa patriotik dan berbudaya tinggi.
        </p>
      </footer>
    </div>
  );
}
