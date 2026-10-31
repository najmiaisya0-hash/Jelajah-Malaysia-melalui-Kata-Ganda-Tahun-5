import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Video,
  ArrowLeft,
  Play,
  Settings,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Heart,
  BookOpen,
} from 'lucide-react';
import { motion } from 'motion/react';
import { MascotManual } from './CartoonHeaderMascots';

interface ManualProps {
  onNavigate: (page: PageId) => void;
}

export const ManualPage: React.FC<ManualProps> = ({ onNavigate }) => {
  // Video link state with localStorage persistence and default fallback to your YouTube link
  const [videoUrl, setVideoUrl] = useState(() => {
    return localStorage.getItem('jelajah_youtube_link') || 'https://youtu.be/alJ6jvgArGw';
  });
  const [inputUrl, setInputUrl] = useState(videoUrl);
  const [showUrlEditor, setShowUrlEditor] = useState(false);

  // Parse YouTube video ID from various formats
  const extractYouTubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const currentVideoId = extractYouTubeId(videoUrl);

  const handleSaveVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setVideoUrl(inputUrl);
    localStorage.setItem('jelajah_youtube_link', inputUrl);
    setShowUrlEditor(false);
  };

  const triggerConfetti = () => {
    playClickSound();
    playSuccessSound();
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.65 },
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.65 },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Cute Kid Director Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotManual />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-indigo-100 border border-white/20">
              <Video className="w-4 h-4 text-yellow-300" />
              <span>HALAMAN 6: MANUAL & VIDEO</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Manual Pengguna & Video Demonstrasi
            </h1>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left">
              <p className="text-xs sm:text-sm text-indigo-50 leading-relaxed font-semibold">
                Arahan: "Klik pada video untuk manual penggunaan."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated YouTube Video Frame Area */}
      <section className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Play className="w-5 h-5 text-red-600 fill-red-600" />
              <span>Ruang Tayangan Video Panduan Penggunaan</span>
            </h2>
            <p className="text-xs text-slate-500">
              Video tutorial langkah demi langkah mengendalikan aktiviti di dalam kelas.
            </p>
          </div>

          <button
            onClick={() => setShowUrlEditor(!showUrlEditor)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showUrlEditor ? 'Tutup Tetapan Pautan' : 'Tukar / Masukkan Pautan Video YouTube'}</span>
          </button>
        </div>

        {/* URL Input Form for Teacher */}
        {showUrlEditor && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleSaveVideoUrl}
            className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3"
          >
            <div className="text-xs font-bold text-indigo-950">
              Masukkan Pautan Video YouTube Anda:
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ atau https://youtu.be/..."
                className="flex-1 p-2.5 bg-white rounded-xl border border-indigo-300 text-xs text-slate-800 focus:outline-hidden focus:border-indigo-600"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Simpan Video
              </button>
            </div>
            <p className="text-[11px] text-indigo-700">
              *Anda boleh memasukkan pautan video YouTube rasmi anda pada bila-bila masa di sini.*
            </p>
          </motion.form>
        )}

        {/* Video Player Box */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md flex items-center justify-center">
          {currentVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
              title="Manual Penggunaan & Video Demonstrasi"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-8 space-y-3 max-w-md text-white">
              <div className="w-16 h-16 rounded-full bg-red-600/90 text-white mx-auto flex items-center justify-center shadow-lg animate-pulse-soft">
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </div>
              <h3 className="text-base font-bold font-display">
                Ruang Video YouTube Anda
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ruang ini telah disediakan khas untuk menayangkan video YouTube anda. Anda boleh klik butang <strong>"Tukar / Masukkan Pautan Video YouTube"</strong> di atas apabila anda telah bersedia!
              </p>
              <button
                onClick={() => setShowUrlEditor(true)}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold border border-white/30 transition-colors cursor-pointer"
              >
                Masukkan Pautan Sekarang
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Visual Step-by-Step Manual Guide */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            Panduan Lengkap Aliran Pengajaran & Pembelajaran (PdP)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-blue-800">1. Set Induksi:</div>
            <p className="text-slate-600">
              Murid menerokai peta digital Malaysia, memilih sekurang-kurangnya 2 lokasi, membaca teks rangsangan dan mengenal pasti kata ganda.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-amber-800">2. Langkah 1:</div>
            <p className="text-slate-600">
              Murid meneliti 3 jenis kata ganda (Penuh, Separa, Berentak) lalu menggunakan Buku Fizikal Jelajah Malaysia untuk aktiviti pengelasan.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-rose-800">3. Langkah 2:</div>
            <p className="text-slate-600">
              Murid melengkapkan kuiz pembuka pantun melalui kaedah drag & drop, seterusnya menyertai kuiz cabaran penuh di Wordwall.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-purple-800">4. Langkah 3:</div>
            <p className="text-slate-600">
              Murid mengambil kad misteri, mengimbas kod QR lembaran kerja Nearpod (PIN: LGBAK) dan membina 3 ayat patriotisme gramatis.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-emerald-800">5. Refleksi Digital:</div>
            <p className="text-slate-600">
              Murid memilih emoji perasaan (Gembira, Biasa, Sedih, Marah) dan melengkapkan borang refleksi Nearpod (PIN: IYNH5).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-extrabold text-indigo-800">6. Manual & Pengukuhan:</div>
            <p className="text-slate-600">
              Guru dan murid boleh menonton semula video demonstrasi pada bila-bila masa bagi tujuan ulangkaji dan pengukuhan.
            </p>
          </div>
        </div>
      </section>

      {/* Grand Celebration Section: Animated TERIMA KASIH! with Confetti */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={triggerConfetti}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-blue-700 text-white p-8 sm:p-12 text-center shadow-2xl cursor-pointer group"
        title="Klik untuk meletupkan bunga api confetti kejayaan!"
      >
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto select-none">
          <motion.div
            animate={{ y: [-6, 6, -6], rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl inline-block"
          >
            🇲🇾
          </motion.div>

          <motion.h2
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-4xl sm:text-6xl font-black font-display tracking-tight text-yellow-300 filter drop-shadow-xl flex items-center justify-center gap-3"
          >
            <span>✨</span>
            <span className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              TERIMA KASIH!
            </span>
            <span>✨</span>
          </motion.h2>

          <p className="text-base sm:text-xl font-bold text-white/95 leading-relaxed font-display">
            Tahniah kepada semua anak watan yang gigih menjelajah dan memartabatkan Bahasa Melayu!
          </p>

          <div className="pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerConfetti();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-yellow-200 font-extrabold text-xs sm:text-sm border-2 border-yellow-300/60 shadow-lg hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span>Letupkan Confetti Kejayaan! 🎊</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs font-semibold text-yellow-100">
            <span>🌺 Bunga Raya Megah Berkembang</span>
            <span>·</span>
            <span>🦜 Burung Kenyalang Lambang Keberanian</span>
            <span>·</span>
            <span>⛰️ Kinabalu Puncak Kejayaan</span>
          </div>
        </div>

        {/* Ambient Decorative Shapes */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-yellow-400/20 blur-xl pointer-events-none" />
      </motion.section>

      {/* Bottom Navigation Button: Kembali ke Laman Utama */}
      <div className="pt-4 flex items-center justify-center border-t border-slate-200">
        <button
          onClick={() => {
            playClickSound();
            onNavigate('home');
          }}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Laman Utama</span>
        </button>
      </div>
    </div>
  );
};