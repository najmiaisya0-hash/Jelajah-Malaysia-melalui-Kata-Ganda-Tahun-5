import React, { useState } from 'react';
import { playClickSound, playSuccessSound, speakMalay } from '../utils/audio';
import {
  Sparkles,
  Palette,
  PlayCircle,
  Printer,
  Share2,
  Wand2,
  Sliders,
  Check,
  X,
  Volume2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AIStudioToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: 'jalur-gemilang' | 'rimba-tropika' | 'warisan-batik';
  onChangeTheme: (theme: 'jalur-gemilang' | 'rimba-tropika' | 'warisan-batik') => void;
  animationStyle: 'energetic' | 'gentle' | 'minimal';
  onChangeAnimationStyle: (style: 'energetic' | 'gentle' | 'minimal') => void;
  showPlane: boolean;
  onTogglePlane: () => void;
  showMascot: boolean;
  onToggleMascot: () => void;
}

export const AIStudioToolbar: React.FC<AIStudioToolbarProps> = ({
  isOpen,
  onClose,
  activeTheme,
  onChangeTheme,
  animationStyle,
  onChangeAnimationStyle,
  showPlane,
  onTogglePlane,
  showMascot,
  onToggleMascot,
}) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedResult, setAiGeneratedResult] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const promptPresets = [
    'Jana 3 ayat patriotisme baharu tentang Menara KLCC',
    'Cadangkan kuiz pantun bertemakan Wau Bulan dan Bunga Raya',
    'Jana senarai 5 kata ganda berentak tentang makanan tradisional',
    'Tulis ucapan motivasi pembakar semangat anak-anak Malaysia',
  ];

  const handleRunAiPrompt = (promptText?: string) => {
    const query = promptText || aiPrompt;
    if (!query.trim()) return;

    playClickSound();
    setIsGenerating(true);
    setAiGeneratedResult(null);

    // Simulate intelligent prompt generation for teachers
    setTimeout(() => {
      setIsGenerating(false);
      let output = '';
      if (query.toLowerCase().includes('pantun')) {
        output = `[Pantun Cadangan AI]:\n"Terbang tinggi si burung kedidi,\nSinggah bertengger di pohon ara;\nMurid-murid berilmu berbudi,\nMenjadi harapan nusa bangsa."\n(Kata Ganda: Murid-murid - Kata Ganda Penuh)`;
      } else if (query.toLowerCase().includes('makanan') || query.toLowerCase().includes('kuih')) {
        output = `[Koleksi Kata Ganda AI]:\n1. Kuih-muih (Berentak) - Contoh: Kuih-muih tradisional Melayu.\n2. Lauk-pauk (Berentak) - Contoh: Lauk-pauk enak nasi lemak.\n3. Ulam-ulaman (Berentak) - Sayuran segar berkhasiat.`;
      } else if (query.toLowerCase().includes('ayat') || query.toLowerCase().includes('klcc')) {
        output = `[Cadangan 3 Ayat Patriotik AI]:\n1. Pelancong-pelancong asing kagum melihat ketinggian Menara Berkembar Petronas.\n2. Bangunan-bangunan moden di Kuala Lumpur mencerminkan kemajuan negara tercinta.\n3. Anak-anak muda perlu bersemangat waja memacu kejayaan Malaysia di persada dunia.`;
      } else {
        output = `[Respons Penjana AI]:\nKandungan berjaya digubah untuk: "${query}".\nCadangan penyesuaian susun atur: Tambah 1 kad interaktif beranimasi dan serlahkan kata ganda pilihan murid!`;
      }

      setAiGeneratedResult(output);
      playSuccessSound();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
      speakMalay('Kandungan AI telah berjaya dijana!');
    }, 1200);
  };

  const handleShare = () => {
    playClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-16 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b-2 border-purple-500 shadow-2xl p-4 sm:p-5">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top Header of Studio Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white font-display">
                  Studio Pembangun AI & Kawalan Reka Bentuk (NovaSite Engine)
                </h3>
                <span className="text-[10px] bg-purple-500/40 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/40 font-mono">
                  Better than Google Sites
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ubah suai tema, kawal animasi interaktif, dan jana kandungan modul secara automatik melalui prompt AI.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Tutup Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* 1. Theme Palette Selector */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-pink-400" />
              <span>Tema Reka Bentuk:</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'jalur-gemilang', label: 'Jalur Gemilang', color: 'from-red-500 to-blue-500' },
                { id: 'rimba-tropika', label: 'Rimba Tropika', color: 'from-emerald-600 to-amber-500' },
                { id: 'warisan-batik', label: 'Batik Diraja', color: 'from-purple-600 to-amber-600' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playClickSound();
                    onChangeTheme(t.id as unknown as 'jalur-gemilang' | 'rimba-tropika' | 'warisan-batik');
                  }}
                  className={`p-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                    activeTheme === t.id
                      ? 'border-white bg-slate-700 text-white shadow-xs'
                      : 'border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className={`h-2 rounded-full bg-gradient-to-r ${t.color} mb-1`} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Animation & Element Toggles */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Kawalan Elemen & Animasi:</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={onTogglePlane}
                className={`px-2.5 py-1 rounded-xl font-bold border transition-colors cursor-pointer ${
                  showPlane
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }`}
              >
                ✈️ Kapal Terbang: {showPlane ? 'Aktif' : 'Mati'}
              </button>

              <button
                onClick={onToggleMascot}
                className={`px-2.5 py-1 rounded-xl font-bold border transition-colors cursor-pointer ${
                  showMascot
                    ? 'bg-amber-600 text-white border-amber-400'
                    : 'bg-slate-700 text-slate-400 border-slate-600'
                }`}
              >
                🦜 Maskot Kenyalang: {showMascot ? 'Aktif' : 'Mati'}
              </button>

              <div className="flex items-center gap-1 pt-1 w-full">
                <span className="text-[10px] text-slate-400">Gaya:</span>
                {(['energetic', 'gentle', 'minimal'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      playClickSound();
                      onChangeAnimationStyle(st);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                      animationStyle === st ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st === 'energetic' ? 'Ceria' : st === 'gentle' ? 'Lembut' : 'Fokus'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Export & Action Tools */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tindakan Penerbitan:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-1.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembaran</span>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedShare ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedShare ? 'Pautan Disalin!' : 'Kongsi Laman'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Prompt-to-Layout Engine Bar */}
        <div className="p-3 bg-purple-950/40 rounded-2xl border border-purple-500/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span className="flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Penjana Kandungan & Susun Atur AI (Taip prompt di sini):</span>
            </span>
            <span className="text-[10px] text-purple-300">Dikuasakan oleh Gemini AI</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAiPrompt()}
              placeholder="Contoh: Jana 3 soalan pantun tambahan kata ganda separa untuk Tahun 5..."
              className="flex-1 px-3 py-2 bg-slate-900/90 rounded-xl border border-purple-400/40 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-pink-400"
            />
            <button
              onClick={() => handleRunAiPrompt()}
              disabled={isGenerating || !aiPrompt.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isGenerating ? 'Menjana...' : 'Jana Layout / Teks'}</span>
            </button>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 self-center">Prompt Pantas:</span>
            {promptPresets.map((pr, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAiPrompt(pr);
                  handleRunAiPrompt(pr);
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-200 text-[10px] font-medium transition-colors cursor-pointer border border-slate-700"
              >
                {pr}
              </button>
            ))}
          </div>

          {/* Result Output Area */}
          <AnimatePresence>
            {aiGeneratedResult && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 rounded-xl bg-slate-900 border border-purple-500/50 text-xs text-slate-200 whitespace-pre-wrap font-mono relative mt-2"
              >
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800 text-[10px] text-pink-400 font-sans font-bold">
                  <span>Hasil Jana AI Gemini:</span>
                  <button
                    onClick={() => setAiGeneratedResult(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    Tutup
                  </button>
                </div>
                {aiGeneratedResult}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
