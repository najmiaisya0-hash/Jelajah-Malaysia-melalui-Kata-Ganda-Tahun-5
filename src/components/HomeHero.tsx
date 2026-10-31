import React from 'react';
import { PageId } from '../types';
import { playClickSound, playVoiceClip, stopVoiceClip, AUDIO_FILES } from '../utils/audio';
import { MalaysiaCulturalStickers } from './MalaysiaDecorations';
import {
  Compass,
  BookOpen,
  Feather,
  Sparkles,
  Heart,
  Video,
  ArrowRight,
  CheckCircle2,
  Volume2,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomeHeroProps {
  onNavigate: (page: PageId) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const learningSteps: {
    id: PageId;
    stepNumber: string;
    title: string;
    pageTitle: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
    border: string;
    badgeBg: string;
    textColor: string;
    subtextColor: string;
    accentBg: string;
    arrowBg: string;
  }[] = [
    {
      id: 'induksi',
      stepNumber: '1',
      title: 'Set Induksi',
      pageTitle: 'Peta Digital Jelajah Malaysia',
      desc: 'Terokai lokasi menarik di Malaysia dan kenal pasti kata ganda dalam petikan.',
      icon: <Compass className="w-6 h-6 text-sky-700" />,
      color: 'bg-sky-100 hover:bg-sky-200/90',
      border: 'border-sky-400 hover:border-sky-600',
      badgeBg: 'bg-sky-600 text-white',
      textColor: 'text-sky-950',
      subtextColor: 'text-sky-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-sky-600 text-white group-hover:bg-sky-700',
    },
    {
      id: 'langkah1',
      stepNumber: '2',
      title: 'Langkah 1',
      pageTitle: 'Kenali Jenis Kata Ganda',
      desc: 'Teliti 3 jenis kata ganda (Penuh, Separa, Berentak) bersama buku aktiviti fizikal.',
      icon: <BookOpen className="w-6 h-6 text-amber-800" />,
      color: 'bg-amber-100 hover:bg-amber-200/90',
      border: 'border-amber-400 hover:border-amber-600',
      badgeBg: 'bg-amber-600 text-white',
      textColor: 'text-amber-950',
      subtextColor: 'text-amber-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-amber-600 text-white group-hover:bg-amber-700',
    },
    {
      id: 'langkah2',
      stepNumber: '3',
      title: 'Langkah 2',
      pageTitle: 'Cabaran Pantun Sayangi Malaysia',
      desc: 'Lengkapkan tempat kosong pantun patriotik dengan kata ganda melalui aktiviti drag & drop.',
      icon: <Feather className="w-6 h-6 text-rose-700" />,
      color: 'bg-rose-100 hover:bg-rose-200/90',
      border: 'border-rose-400 hover:border-rose-600',
      badgeBg: 'bg-rose-600 text-white',
      textColor: 'text-rose-950',
      subtextColor: 'text-rose-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-rose-600 text-white group-hover:bg-rose-700',
    },
    {
      id: 'langkah3',
      stepNumber: '4',
      title: 'Langkah 3',
      pageTitle: 'Misi Karya Anak Malaysia',
      desc: 'Buka Kotak Misteri fizikal, imbas kod QR dan bina 3 ayat patriotisme gramatis.',
      icon: <Sparkles className="w-6 h-6 text-purple-700" />,
      color: 'bg-purple-100 hover:bg-purple-200/90',
      border: 'border-purple-400 hover:border-purple-600',
      badgeBg: 'bg-purple-600 text-white',
      textColor: 'text-purple-950',
      subtextColor: 'text-purple-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-purple-600 text-white group-hover:bg-purple-700',
    },
    {
      id: 'refleksi',
      stepNumber: '5',
      title: 'Refleksi Digital',
      pageTitle: 'Penutup: Refleksi & Imbas Kembali',
      desc: 'Kongsi perasaan anda dan luahkan rasa bangga sebagai anak Malaysia.',
      icon: <Heart className="w-6 h-6 text-emerald-700" />,
      color: 'bg-emerald-100 hover:bg-emerald-200/90',
      border: 'border-emerald-400 hover:border-emerald-600',
      badgeBg: 'bg-emerald-600 text-white',
      textColor: 'text-emerald-950',
      subtextColor: 'text-emerald-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-emerald-600 text-white group-hover:bg-emerald-700',
    },
    {
      id: 'manual',
      stepNumber: '6',
      title: 'Manual Pengguna',
      pageTitle: 'Manual Pengguna & Video Demonstrasi',
      desc: 'Panduan lengkap dan video tutorial cara penggunaan modul interaktif ini.',
      icon: <Video className="w-6 h-6 text-indigo-700" />,
      color: 'bg-indigo-100 hover:bg-indigo-200/90',
      border: 'border-indigo-400 hover:border-indigo-600',
      badgeBg: 'bg-indigo-600 text-white',
      textColor: 'text-indigo-950',
      subtextColor: 'text-indigo-900',
      accentBg: 'bg-white',
      arrowBg: 'bg-indigo-600 text-white group-hover:bg-indigo-700',
    },
  ];

  const [isPlayingIntro, setIsPlayingIntro] = React.useState(false);

  const handleReadIntro = () => {
    if (isPlayingIntro) {
      stopVoiceClip();
      setIsPlayingIntro(false);
      return;
    }
    setIsPlayingIntro(true);
    playVoiceClip(AUDIO_FILES.pengenalan, () => {
      setIsPlayingIntro(false);
    });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Visual Section with Banner from user */}
      <section className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-200/90 shadow-2xl p-4 sm:p-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/90 text-red-700 text-xs font-bold tracking-wide border border-red-200">
            <span>🇲🇾</span>
            <span>MODUL DIGITAL BAHASA MELAYU TAHUN 5</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Jelajah Malaysia melalui <span className="text-red-600">Kata Ganda</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-700 font-medium max-w-2xl mx-auto">
            Modul Pembelajaran Digital Interaktif Berasaskan Patriotisme
          </p>

          {/* Quick Voice Assistant Button using Real Teacher Recording */}
          <div className="pt-2">
            <button
              onClick={handleReadIntro}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm border transition-all cursor-pointer ${
                isPlayingIntro
                  ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingIntro ? 'text-slate-950 animate-bounce' : 'text-amber-600'}`} />
              <span>{isPlayingIntro ? 'Sedang Dimainkan... 🔊 (Klik untuk Berhenti)' : 'Dengar Pengenalan Suara Cikgu 🎙️'}</span>
            </button>
          </div>

          {/* Banner Image Showcase with High-Fidelity Local Asset */}
          <div className="pt-4 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 group">
            <img
              src="/assets/aistudio/image_a5854437.png"
              alt="Jelajah Malaysia melalui Kata Ganda - Bahasa Melayu Tahun 5"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[460px] object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Subtle Gradient Scrim at Bottom of Banner */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 sm:p-6 text-left flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-white">
              <div>
                <div className="text-xs uppercase tracking-widest text-yellow-300 font-bold">
                  Mercu Tanda Malaysia & Tradisi
                </div>
                <div className="text-base sm:text-xl font-bold font-display">
                  Menara Berkembar KLCC · A Famosa Melaka · Gunung Kinabalu
                </div>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  onNavigate('induksi');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                <span>Mula Pengembaraan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Stickers Section (Nasi Lemak, Wau Bulan, Bunga Raya, etc.) */}
      <MalaysiaCulturalStickers />

      {/* Maklumat Kurikulum & Objektif Pembelajaran Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maklumat Kurikulum */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
              📘
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Maklumat Kurikulum KSSR</h2>
              <p className="text-xs text-slate-500">Bahasa Melayu Sekolah Rendah (Tahun 5)</p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-extrabold text-blue-800 block mb-1">
                Standard Kandungan (SK) 5.2:
              </span>
              <p className="text-slate-700 leading-relaxed">
                Memahami dan menggunakan bentuk kata mengikut konteks.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="font-extrabold text-amber-900 block mb-1">
                Standard Pembelajaran (SP) 5.2.3:
              </span>
              <p className="text-slate-700 leading-relaxed mb-2">
                Memahami dan menggunakan kata ganda mengikut konteks:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold text-xs">
                  (i) Kata ganda penuh
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold text-xs">
                  (ii) Kata ganda separa
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-900 font-bold text-xs">
                  (iii) Kata ganda berentak
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Objektif Pembelajaran */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              🎯
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Objektif Pembelajaran</h2>
              <p className="text-xs text-slate-500">Hasil pembelajaran di akhir sesi</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              {
                num: '1',
                text: 'Mengenal pasti sekurang-kurangnya 6 kata ganda dalam bahan pembelajaran digital.',
              },
              {
                num: '2',
                text: 'Mengelaskan kata ganda kepada jenis yang betul (Penuh, Separa, atau Berentak).',
              },
              {
                num: '3',
                text: 'Membina sekurang-kurangnya 3 ayat gramatis bertemakan patriotisme.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/70"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {item.num}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center gap-2 text-xs text-slate-500">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Kuasai ketiga-tiga objektif untuk lencana Tokoh Cilik Bahasa!</span>
          </div>
        </div>
      </section>

      {/* 6 Large Interactive Navigation Buttons to Next Pages */}
      <section className="space-y-4 pt-4">
        <div className="bg-slate-950/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-slate-700/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight flex items-center gap-2.5">
              <span className="text-2xl">🧭</span>
              <span>Laluan Pengembaraan Murid</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Pilih dan tekan mana-mana 6 langkah di bawah untuk meneruskan pembelajaran:
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs self-start sm:self-auto shadow-md">
            <span>6 Langkah Lengkap</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {learningSteps.map((step) => (
            <motion.div
              key={step.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative ${step.color} p-6 rounded-3xl border-3 ${step.border} shadow-2xl transition-all flex flex-col justify-between cursor-pointer group`}
              onClick={() => {
                playClickSound();
                onNavigate(step.id);
              }}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-black tracking-wide ${step.badgeBg} shadow-xs`}>
                    Langkah {step.stepNumber}
                  </span>
                  <div className={`p-2.5 rounded-2xl ${step.accentBg} shadow-xs border border-white/60`}>
                    {step.icon}
                  </div>
                </div>

                <div>
                  <div className={`text-[11px] font-black uppercase tracking-wider mb-0.5 ${step.textColor} opacity-80`}>
                    {step.title}
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black font-display leading-snug ${step.textColor}`}>
                    {step.pageTitle}
                  </h3>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed font-semibold ${step.subtextColor}`}>
                  {step.desc}
                </p>
              </div>

              <div className={`pt-5 mt-3 border-t border-black/10 flex items-center justify-between text-xs font-black ${step.textColor}`}>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Tekan untuk Masuk</span>
                </span>
                <div className={`w-8 h-8 rounded-full ${step.arrowBg} shadow-md flex items-center justify-center group-hover:translate-x-1 transition-all`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
