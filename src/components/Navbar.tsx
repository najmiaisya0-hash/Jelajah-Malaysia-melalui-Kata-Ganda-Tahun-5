import React, { useState } from 'react';
import { PageId } from '../types';
import { playClickSound, stopSpeaking } from '../utils/audio';
import {
  Compass,
  BookOpen,
  Feather,
  Sparkles,
  Heart,
  Video,
  Home,
  Sliders,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isStudioMode: boolean;
  onToggleStudioMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  isStudioMode,
  onToggleStudioMode,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Laman Utama', icon: <Home className="w-4 h-4" /> },
    { id: 'induksi', label: 'Set Induksi', icon: <Compass className="w-4 h-4" /> },
    { id: 'langkah1', label: 'Langkah 1', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'langkah2', label: 'Langkah 2', icon: <Feather className="w-4 h-4" /> },
    { id: 'langkah3', label: 'Langkah 3', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'refleksi', label: 'Refleksi', icon: <Heart className="w-4 h-4" /> },
    { id: 'manual', label: 'Manual & Video', icon: <Video className="w-4 h-4" /> },
  ];

  const handleSelect = (page: PageId) => {
    stopSpeaking();
    playClickSound();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleSelect('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-amber-500 to-blue-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-lg">🇲🇾</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-base sm:text-lg text-slate-900 tracking-tight block">
                Jelajah Malaysia
              </span>
              <span className="text-[10px] text-amber-700 font-bold block -mt-1 tracking-wider uppercase">
                Kata Ganda Tahun 5
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span className={isActive ? 'text-amber-700' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Audio & Studio Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Matikan Bunyi' : 'Hidupkan Bunyi'}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              onClick={onToggleStudioMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                isStudioMode
                  ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isStudioMode ? 'Mod Studio (Aktif)' : 'Mod Studio AI'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-amber-700' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
