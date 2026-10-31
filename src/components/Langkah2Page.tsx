import React, { useState } from 'react';
import { PageId } from '../types';
import {
  playClickSound,
  playSuccessSound,
  playVoiceClip,
  stopVoiceClip,
  AUDIO_FILES,
} from '../utils/audio';
import {
  Feather,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Volume2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Eye,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MascotLangkah2 } from './CartoonHeaderMascots';

interface Langkah2Props {
  onNavigate: (page: PageId) => void;
}

export const Langkah2Page: React.FC<Langkah2Props> = ({ onNavigate }) => {
  // Blanks state for the starter pantun quiz
  const [slot1, setSlot1] = useState<string | null>(null);
  const [slot2, setSlot2] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWordwallEmbed, setShowWordwallEmbed] = useState(false);
  const [draggedWord, setDraggedWord] = useState<string | null>(null);

  const wordChoices = [
    { id: '1', word: 'Rakan-rakan' },
    { id: '2', word: 'malu-malu' },
    { id: '3', word: 'Kanak-kanak' },
    { id: '4', word: 'kuih-muih' },
    { id: '5', word: 'gunung-ganang' },
  ];

  // Helper to place word
  const placeWord = (word: string, targetSlot?: 1 | 2) => {
    playClickSound();
    setIsAnswerChecked(false);

    if (targetSlot === 1) {
      setSlot1(word);
    } else if (targetSlot === 2) {
      setSlot2(word);
    } else {
      // Auto-fill next empty slot
      if (!slot1) setSlot1(word);
      else if (!slot2) setSlot2(word);
      else setSlot1(word); // replace slot 1
    }
  };

  const checkAnswer = () => {
    setIsAnswerChecked(true);
    const correct = slot1 === 'Rakan-rakan' && slot2 === 'malu-malu';
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      playClickSound();
    }
  };

  const handleReset = () => {
    playClickSound();
    setSlot1(null);
    setSlot2(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const [isPlayingPantun, setIsPlayingPantun] = useState(false);

  const reciteUserPantun = () => {
    if (isPlayingPantun) {
      stopVoiceClip();
      setIsPlayingPantun(false);
      return;
    }
    setIsPlayingPantun(true);
    playVoiceClip(AUDIO_FILES.pantunMutiara, () => {
      setIsPlayingPantun(false);
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Cute Poet Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-rose-500 via-pink-600 to-red-600 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotLangkah2 />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-rose-100 border border-white/20">
              <Feather className="w-4 h-4 text-yellow-200" />
              <span>HALAMAN 3: LANGKAH 2</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Cabaran Pantun Sayangi Malaysia
            </h1>

            {/* Featured Requested Pantun Couplet */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-300/40 flex items-center justify-between gap-3 text-left">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-extrabold text-amber-200">
                  📜 Pantun Mutiara Kata Pilihan:
                </div>
                <p className="text-sm sm:text-base font-extrabold text-white italic drop-shadow-xs">
                  "Indah bahasa cermin budaya, Tanda bangsa berjiwa mulia."
                </p>
              </div>
              <button
                onClick={reciteUserPantun}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border ${
                  isPlayingPantun
                    ? 'bg-yellow-300 text-rose-950 border-yellow-400 animate-pulse'
                    : 'bg-white/20 hover:bg-white/30 text-white border-white/20'
                }`}
                title="Dengar bacaan pantun mutiara kata"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingPantun ? 'animate-bounce text-rose-950' : 'text-yellow-300'}`} />
                <span className="hidden sm:inline">{isPlayingPantun ? 'Sedang Dimainkan...' : 'Dengar Pantun (Cikgu) 🎙️'}</span>
              </button>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 text-left">
              <p className="text-xs sm:text-sm font-bold text-yellow-200">
                Arahan / Nota:
              </p>
              <p className="text-xs sm:text-sm text-rose-50 leading-relaxed italic">
                "Baca pantun patriotisme di bawah dengan sebutan dan intonasi yang betul. Lengkapkan tempat kosong dengan kata ganda yang paling sesuai."
              </p>
            </div>

            {/* Arahan Penggunaan */}
            <div className="text-xs text-rose-100 space-y-1 text-left">
              <p className="font-bold text-white flex items-center gap-1.5">
                <span>📌</span> Arahan Penggunaan:
              </p>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-rose-100/90">
                <li>Lengkapkan pantun dengan kata ganda yang sesuai (tarik atau klik kad perkataan ke tempat kosong).</li>
                <li>Baca semula pantun dengan jelas dan semak jawapan bersama guru.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Starter Interactive Pantun Quiz (Drag and Drop / Tap to Slot) */}
      <section className="bg-white rounded-3xl p-6 border-2 border-rose-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 uppercase tracking-wide">
              <span>Kuiz Pembuka Pantun</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              Lengkapkan Pantun Empat Kerat dengan Kata Ganda Tepat
            </h2>
          </div>

          <button
            onClick={reciteUserPantun}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>Dengar Pantun Mutiara</span>
          </button>
        </div>

        {/* Pantun Parchment Paper Container */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-amber-50/70 border-3 border-amber-300 shadow-inner relative space-y-4">
          <div className="text-center pb-2">
            <span className="text-xs font-extrabold text-amber-800 tracking-widest uppercase">
              📜 PANTUN PATRIOTISME MALAYSIA
            </span>
          </div>

          {/* Line 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-bold font-display text-slate-800">
            {/* Slot 1 */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedWord) placeWord(draggedWord, 1);
              }}
              onClick={() => {
                if (slot1) setSlot1(null);
              }}
              className={`min-w-[140px] px-4 py-2 rounded-2xl border-2 border-dashed transition-all flex items-center justify-center text-center cursor-pointer ${
                slot1
                  ? 'bg-rose-500 text-white font-extrabold border-rose-600 shadow-md scale-105'
                  : 'bg-white/80 border-rose-300 text-rose-400 hover:bg-rose-50'
              }`}
            >
              {slot1 ? (
                <span>{slot1}</span>
              ) : (
                <span className="text-xs font-semibold">Tarik / Klik Sini (1)</span>
              )}
            </div>
            <span>berkumpul bersama,</span>
          </div>

          {/* Line 2 */}
          <div className="text-center text-base sm:text-xl font-bold font-display text-slate-700">
            Mulakan kuiz dengan ceria;
          </div>

          {/* Line 3 */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-bold font-display text-slate-800">
            <span>Jangan</span>
            {/* Slot 2 */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedWord) placeWord(draggedWord, 2);
              }}
              onClick={() => {
                if (slot2) setSlot2(null);
              }}
              className={`min-w-[140px] px-4 py-2 rounded-2xl border-2 border-dashed transition-all flex items-center justify-center text-center cursor-pointer ${
                slot2
                  ? 'bg-rose-500 text-white font-extrabold border-rose-600 shadow-md scale-105'
                  : 'bg-white/80 border-rose-300 text-rose-400 hover:bg-rose-50'
              }`}
            >
              {slot2 ? (
                <span>{slot2}</span>
              ) : (
                <span className="text-xs font-semibold">Tarik / Klik Sini (2)</span>
              )}
            </div>
            <span>mencuba,</span>
          </div>

          {/* Line 4 */}
          <div className="text-center text-base sm:text-xl font-bold font-display text-slate-700">
            Tunjukkan bakat dan bijak seia.
          </div>
        </div>

        {/* Word Bank Choices for Drag & Drop */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Pilihan Kad Kata Ganda (Tarik atau Klik untuk memasukkan):</span>
            <span className="text-slate-400">Klik slot untuk padam semula</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {wordChoices.map((item) => {
              const isUsed = slot1 === item.word || slot2 === item.word;
              return (
                <div
                  key={item.id}
                  draggable={!isUsed}
                  onDragStart={() => setDraggedWord(item.word)}
                  onClick={() => !isUsed && placeWord(item.word)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 select-none ${
                    isUsed
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-50'
                      : 'bg-white hover:bg-rose-50 border-2 border-rose-200 text-slate-800 hover:border-rose-400 hover:scale-105 cursor-grab active:cursor-grabbing shadow-sm'
                  }`}
                >
                  <span>🏷️</span>
                  <span>{item.word}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Semak & Reset */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={checkAnswer}
            disabled={!slot1 || !slot2}
            className={`px-8 py-3 rounded-2xl text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center gap-2 cursor-pointer ${
              slot1 && slot2
                ? 'bg-rose-600 hover:bg-rose-500 text-white hover:scale-105'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Semak Jawapan Pantun</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Set Semula</span>
          </button>
        </div>

        {/* Feedback Message */}
        {isAnswerChecked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-2xl border-2 text-center space-y-2 max-w-xl mx-auto ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            {isCorrect ? (
              <>
                <div className="text-3xl">🎉</div>
                <h4 className="font-extrabold text-base text-emerald-800">
                  Tahniah! Jawapan Anda Tepat Sekali!
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-900">
                  <strong>"Rakan-rakan"</strong> dan <strong>"malu-malu"</strong> merupakan <em>Kata Ganda Penuh</em> yang melengkapkan rima dan maksud pantun patriotisme ini dengan amat indah!
                </p>
                <div className="pt-2">
                  <button
                    onClick={reciteUserPantun}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengar Bacaan Pantun Mutiara</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl">💡</div>
                <h4 className="font-extrabold text-base text-amber-900">
                  Cuba Sekali Lagi!
                </h4>
                <p className="text-xs sm:text-sm text-amber-800">
                  Petunjuk: Baris pertama memerlukan perkataan yang bermaksud sahabat yang ramai, manakala baris ketiga memerlukan perkataan berkaitan rasa segan.
                </p>
              </>
            )}
          </motion.div>
        )}
      </section>

      {/* Wordwall Main Quiz Section with Logo and Link */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white text-2xl font-black shadow-md">
              W
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wide">
                <span>Pautan Kuiz Sebenar</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Wordwall: Cabaran Pantun Sayangi Malaysia
              </h3>
              <p className="text-xs text-slate-500">
                Teruskan cabaran penuh dengan permainan interaktif beranimasi di Wordwall.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowWordwallEmbed(!showWordwallEmbed)}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{showWordwallEmbed ? 'Tutup Paparan Permainan' : 'Main Terus Dalam Halaman (Embed)'}</span>
            </button>

            <a
              href="https://wordwall.net/resource/120455236?wwmethod=link"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buka di Wordwall</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Embedded Wordwall iframe preview */}
        {showWordwallEmbed && (
          <div className="rounded-2xl overflow-hidden border-2 border-blue-200 shadow-md h-[540px] bg-slate-900">
            <iframe
              src="https://wordwall.net/embed/120455236?themeId=1&templateId=3&fontStackId=0"
              title="Wordwall Kuiz Kata Ganda"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        )}
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
            onNavigate('langkah3');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Langkah Seterusnya: Misi Karya Anak Malaysia</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
