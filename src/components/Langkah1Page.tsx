import React, { useState } from 'react';
import { PageId } from '../types';
import { playClickSound, speakMalay } from '../utils/audio';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  Volume2,
  ZoomIn,
  Sparkles,
  Layers,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotLangkah1 } from './CartoonHeaderMascots';

interface Langkah1Props {
  onNavigate: (page: PageId) => void;
}

export const Langkah1Page: React.FC<Langkah1Props> = ({ onNavigate }) => {
  const [activeImageZoom, setActiveImageZoom] = useState<string | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const kataGandaTypes = [
    {
      id: 'penuh',
      title: '1. Kata Ganda Penuh',
      definition: 'Penggandaan seluruh kata dasar tanpa sebarang perubahan bentuk kata.',
      examples: ['kanak-kanak', 'buku-buku', 'pulau-pulau', 'rumah-rumah', 'murid-murid', 'bunga-bunga'],
      color: 'from-amber-500/10 to-amber-500/5',
      border: 'border-amber-300',
      badgeBg: 'bg-amber-500 text-white',
      accentText: 'text-amber-900',
      icon: '🟡',
    },
    {
      id: 'separa',
      title: '2. Kata Ganda Separa',
      definition: 'Penggandaan sebahagian daripada kata dasar (biasanya melibatkan suku kata pertama yang mengalami pelemahan vokal menjadi e-pepet).',
      examples: ['bebenang', 'rerumput', 'kekunci', 'dedaun', 'pepohon', 'jejari', 'tetamu', 'lelaki'],
      color: 'from-emerald-500/10 to-emerald-500/5',
      border: 'border-emerald-300',
      badgeBg: 'bg-emerald-600 text-white',
      accentText: 'text-emerald-900',
      icon: '🟢',
    },
    {
      id: 'berentak',
      title: '3. Kata Ganda Berentak',
      definition: 'Kata dasar yang digandingkan mengikut penyesuaian bunyi vokal, konsonan atau bebas tertentu.',
      examples: ['kuih-muih', 'kusut-masai', 'gunung-ganang', 'lauk-pauk', 'warna-warni', 'gotong-royong'],
      color: 'from-rose-500/10 to-rose-500/5',
      border: 'border-rose-300',
      badgeBg: 'bg-rose-500 text-white',
      accentText: 'text-rose-900',
      icon: '🔴',
    },
  ];

  const bookWords = [
    { word: 'Bunga-bunga', type: 'Kata Ganda Penuh' },
    { word: 'Murid-murid', type: 'Kata Ganda Penuh' },
    { word: 'Rumah-rumah', type: 'Kata Ganda Penuh' },
    { word: 'Kanak-kanak', type: 'Kata Ganda Penuh' },
    { word: 'Pulau-pulau', type: 'Kata Ganda Penuh' },
    { word: 'Lelaki', type: 'Kata Ganda Separa' },
    { word: 'Pepohon', type: 'Kata Ganda Separa' },
    { word: 'Tetamu', type: 'Kata Ganda Separa' },
    { word: 'Jejari', type: 'Kata Ganda Separa' },
    { word: 'Dedaun', type: 'Kata Ganda Separa' },
    { word: 'Kuih-muih', type: 'Kata Ganda Berentak' },
    { word: 'Warna-warni', type: 'Kata Ganda Berentak' },
    { word: 'Lauk-pauk', type: 'Kata Ganda Berentak' },
    { word: 'Gotong-royong', type: 'Kata Ganda Berentak' },
    { word: 'Gunung-ganang', type: 'Kata Ganda Berentak' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Cute Sang Kancil Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotLangkah1 />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-100 border border-white/20">
              <BookOpen className="w-4 h-4 text-yellow-200" />
              <span>HALAMAN 2: LANGKAH 1</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Kenali Jenis Kata Ganda
            </h1>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 text-left">
              <p className="text-xs sm:text-sm font-bold text-yellow-200">
                Arahan / Nota:
              </p>
              <p className="text-xs sm:text-sm text-amber-50 leading-relaxed italic">
                "Mari kita teliti tiga jenis kata ganda dalam Bahasa Melayu. Rujuk nota di bawah dan selesaikan aktiviti pengelasan secara berkumpulan."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Jenis Kata Ganda Infographic Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {kataGandaTypes.map((type) => (
          <div
            key={type.id}
            className={`bg-gradient-to-b ${type.color} bg-white rounded-3xl p-5 sm:p-6 border-2 ${type.border} shadow-sm space-y-4 flex flex-col justify-between`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${type.badgeBg}`}>
                  {type.title}
                </span>
                <span className="text-xl">{type.icon}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {type.definition}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 space-y-2">
              <div className="text-xs font-bold text-slate-600">
                <span>Contoh Kata:</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {type.examples.map((ex, i) => (
                  <span
                    key={i}
                    onClick={() => playClickSound()}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:bg-amber-100 hover:border-amber-300 transition-colors cursor-pointer select-none"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Physical Book Activity Section with Authentic Photos */}
      <section className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-6">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
              📖
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950">
                Aktiviti Buku Fizikal: Buku Jelajah Malaysia
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Murid-murid perlu membuka <strong>Buku Fizikal Jelajah Malaysia</strong> untuk mengelaskan kad perkataan yang diberikan mengikut 3 jenis (Penuh, Separa, Berentak).
              </p>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                *Aktiviti dilakukan secara fizikal menggunakan velcro dan kad perkataan pada buku.*
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setShowAnswerKey(!showAnswerKey);
            }}
            className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 shadow-2xs transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            {showAnswerKey ? 'Sembunyikan Semakan Jawapan' : 'Papar Semakan Jawapan Guru'}
          </button>
        </div>

        {/* Display The User Provided Book Images */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Paparan Halaman Buku Jelajah Malaysia (Rujukan Guru & Murid):</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image 1: Board for Steps */}
            <div
              onClick={() => setActiveImageZoom('/assets/aistudio/image_a8a184a2.png')}
              className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md cursor-pointer hover:border-amber-400 transition-colors"
            >
              <img
                src="/assets/aistudio/image_a8a184a2.png"
                alt="Papan Pengelasan Jenis Kata Ganda"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">Langkah 1: Templat Pengelasan</div>
                  <div className="text-[10px] text-slate-300">Penuh · Separa · Berentak</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Image 2: Word Cards */}
            <div
              onClick={() => setActiveImageZoom('/assets/aistudio/image_f1c94df4.png')}
              className="group relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md cursor-pointer hover:border-amber-400 transition-colors"
            >
              <img
                src="/assets/aistudio/image_f1c94df4.png"
                alt="Kad Perkataan Kata Ganda Buku Fizikal"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-3 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">Koleksi Kad Kata Ganda Fizikal</div>
                  <div className="text-[10px] text-slate-300">12+ Kad Perkataan Bertemakan Malaysia</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Key / Teacher Verification Accordion */}
        {showAnswerKey && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
          >
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Skema Semakan Pengelasan Buku Fizikal:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Penuh */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xs font-extrabold text-amber-900 mb-2">
                  Kata Ganda Penuh
                </div>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li>• Bunga-bunga</li>
                  <li>• Murid-murid</li>
                  <li>• Rumah-rumah</li>
                  <li>• Kanak-kanak</li>
                  <li>• Pulau-pulau</li>
                </ul>
              </div>

              {/* Separa */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-extrabold text-emerald-900 mb-2">
                  Kata Ganda Separa
                </div>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li>• Lelaki (daripada 'laki')</li>
                  <li>• Pepohon (daripada 'pohon')</li>
                  <li>• Tetamu (daripada 'tamu')</li>
                  <li>• Jejari (daripada 'jari')</li>
                  <li>• Dedaun (daripada 'daun')</li>
                </ul>
              </div>

              {/* Berentak */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                <div className="text-xs font-extrabold text-rose-900 mb-2">
                  Kata Ganda Berentak
                </div>
                <ul className="text-xs space-y-1 text-slate-700">
                  <li>• Kuih-muih</li>
                  <li>• Warna-warni</li>
                  <li>• Lauk-pauk</li>
                  <li>• Gotong-royong</li>
                  <li>• Gunung-ganang</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Fullscreen Image Zoom Modal */}
      <AnimatePresence>
        {activeImageZoom && (
          <div
            onClick={() => setActiveImageZoom(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden p-2">
              <img
                src={activeImageZoom}
                alt="Paparan Penuh Buku Jelajah Malaysia"
                referrerPolicy="no-referrer"
                className="max-h-[82vh] w-auto object-contain mx-auto rounded-2xl"
              />
              <div className="text-center py-2 text-xs text-slate-500 font-semibold">
                Klik di mana-mana untuk menutup paparan besar
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
        <button
          onClick={() => {
            playClickSound();
            onNavigate('home');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Laman Utama</span>
        </button>

        <button
          onClick={() => {
            playClickSound();
            onNavigate('langkah2');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Langkah Seterusnya: Cabaran Pantun Sayangi Malaysia</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
