import React, { useState } from 'react';
import { PageId, EmotionType } from '../types';
import { playClickSound, playSuccessSound, speakMalay } from '../utils/audio';
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MascotRefleksi } from './CartoonHeaderMascots';

interface RefleksiProps {
  onNavigate: (page: PageId) => void;
}

export const RefleksiPage: React.FC<RefleksiProps> = ({ onNavigate }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [copiedPin, setCopiedPin] = useState(false);
  const [submittedReflection, setSubmittedReflection] = useState(false);

  const emotions: {
    id: EmotionType;
    emoji: string;
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    feedback: string;
  }[] = [
    {
      id: 'gembira',
      emoji: '😊',
      label: 'Gembira',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-900',
      feedback: 'Hebat! Teruskan semangat membara anda meneroka keindahan bahasa ibunda dan tanah air tercinta!',
    },
    {
      id: 'biasa',
      emoji: '😐',
      label: 'Biasa',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-900',
      feedback: 'Bagus! Latihan yang berterusan akan menjadikan anda semakin mahir dan seronok belajar kata ganda.',
    },
    {
      id: 'sedih',
      emoji: '😢',
      label: 'Sedih',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-900',
      feedback: 'Jangan bimbang! Cikgu dan rakan-rakan sentiasa ada untuk membimbing anda. Anda pasti boleh!',
    },
    {
      id: 'marah',
      emoji: '😠',
      label: 'Marah',
      bgColor: 'bg-rose-50 hover:bg-rose-100',
      borderColor: 'border-rose-300',
      textColor: 'text-rose-900',
      feedback: 'Tarik nafas dalam-dalam. Cabaran hari ini adalah permulaan untuk anda menjadi lebih kuat dan pintar!',
    },
  ];

  const handleSelectEmotion = (em: EmotionType) => {
    playClickSound();
    setSelectedEmotion(em);
  };

  const handleCopyPin = () => {
    playClickSound();
    navigator.clipboard.writeText('IYNH5');
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    playSuccessSound();
    setSubmittedReflection(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const currentEmotionData = emotions.find((e) => e.id === selectedEmotion);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Cute Baby Orangutan Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotRefleksi />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100 border border-white/20">
              <Heart className="w-4 h-4 text-amber-300" />
              <span>HALAMAN 5: REFLEKSI DIGITAL</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Penutup: Refleksi & Imbas Kembali
            </h1>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 text-left">
              <p className="text-xs sm:text-sm font-bold text-yellow-200">
                Arahan / Nota:
              </p>
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed italic">
                "Tahniah kerana berjaya menamatkan pengembaraan! Sila klik pautan di bawah untuk melengkapkan refleksi pembelajaran anda hari ini."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Emotion Check Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <span>❤️</span>
            <span>Semakan Emosi Pembelajaran</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display">
            Apakah perasaan anda sekarang?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pilih emoji yang paling menggambarkan perasaan anda selepas mengikuti modul Jelajah Malaysia melalui Kata Ganda:
          </p>
        </div>

        {/* 4 Emojis Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {emotions.map((em) => {
            const isSelected = selectedEmotion === em.id;
            return (
              <motion.button
                key={em.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectEmotion(em.id)}
                className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${em.bgColor} ${em.borderColor} ${
                  isSelected ? 'ring-4 ring-emerald-400 shadow-lg scale-105' : 'shadow-xs'
                }`}
              >
                <span className="text-5xl filter drop-shadow-sm select-none">
                  {em.emoji}
                </span>
                <span className={`text-sm font-black font-display ${em.textColor}`}>
                  {em.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Emotion Response Box */}
        <AnimatePresence>
          {currentEmotionData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-300 max-w-2xl mx-auto text-center space-y-2"
            >
              <div className="text-2xl">{currentEmotionData.emoji}</div>
              <h4 className="font-extrabold text-sm text-emerald-950">
                Respons Pemandu Pelancong:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {currentEmotionData.feedback}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pupil's Reflection Diary Note */}
        <div className="pt-4 max-w-2xl mx-auto space-y-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Catatan Refleksi Ringkas Murid (Pilihan):</span>
          </div>

          <form onSubmit={handleSubmitNote} className="space-y-3">
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              rows={3}
              placeholder="Apakah perkara paling menarik yang anda pelajari hari ini? Contoh: Saya seronok mempelajari kata ganda berentak gunung-ganang di Sabah!"
              className="w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
            />

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simpan Catatan</span>
              </button>

              {submittedReflection && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Catatan anda telah direkodkan!</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Nearpod Link for Extended Reflection */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              N
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                <span>Untuk Refleksi Lebih Lanjut</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Pautan Nearpod: Refleksi Pengembaraan Digital
              </h3>
              <p className="text-xs text-slate-500">
                Lengkapkan borang maklum balas dan undian interaktif bersama guru dan rakan sekelas.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
              <span>PIN:</span>
              <span className="font-mono text-emerald-800 font-extrabold text-sm">IYNH5</span>
              <button
                onClick={handleCopyPin}
                className="p-1 rounded-md hover:bg-slate-200 cursor-pointer"
                title="Salin PIN"
              >
                {copiedPin ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <a
              href="https://app.nearpod.com/?pin=IYNH5"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buka Nearpod Refleksi</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

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
            onNavigate('manual');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Langkah Seterusnya: Manual Pengguna & Video</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
