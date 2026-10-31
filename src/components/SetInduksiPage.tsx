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
  Compass,
  MapPin,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Volume2,
  CheckCircle,
  X,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { MascotInduksi } from './CartoonHeaderMascots';

interface SetInduksiProps {
  onNavigate: (page: PageId) => void;
}

interface StateStimulus {
  id: string;
  name: string;
  landmark: string;
  image?: string;
  useUserAsset?: string;
  stimulusText: string;
  kataGanda: string;
  jenisKataGanda: string;
  penjelasan: string;
  x: string; // pin position percentage
  y: string;
}

export const SetInduksiPage: React.FC<SetInduksiProps> = ({ onNavigate }) => {
  const [selectedState, setSelectedState] = useState<StateStimulus | null>(null);
  const [visitedStates, setVisitedStates] = useState<string[]>([]);
  const [highlightKataGanda, setHighlightKataGanda] = useState(false);
  const [showGeniallyModal, setShowGeniallyModal] = useState(false);

  const statesData: StateStimulus[] = [
    {
      id: 'sabah',
      name: 'Sabah (Contoh Lokasi)',
      landmark: 'Gunung Kinabalu & Banjaran Crocker',
      useUserAsset: '/assets/aistudio/image_1a4f07da.png',
      stimulusText:
        'Keindahan keindahan gunung-ganang di Sabah, terutamanya Gunung Kinabalu, sentiasa memikat hati para pendaki dari dalam dan luar negara.',
      kataGanda: 'gunung-ganang',
      jenisKataGanda: 'Kata Ganda Berentak',
      penjelasan: 'Perkataan "gunung-ganang" ialah kata ganda berentak pengulangan vokal dan konsonan yang menggambarkan banyak gunung yang megah.',
      x: '85%',
      y: '18%',
    },
  ];

  const handleOpenState = (state: StateStimulus) => {
    playClickSound();
    setSelectedState(state);
    setHighlightKataGanda(false);

    if (!visitedStates.includes(state.id)) {
      setVisitedStates([state.id]);
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const [isPlayingStimulus, setIsPlayingStimulus] = useState(false);

  const handleSpeakText = () => {
    if (isPlayingStimulus) {
      stopVoiceClip();
      setIsPlayingStimulus(false);
      return;
    }
    setIsPlayingStimulus(true);
    playVoiceClip(AUDIO_FILES.setInduksiSabah, () => {
      setIsPlayingStimulus(false);
    });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header Card with Cute Cartoon Pilot Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Cute Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotInduksi />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-sky-100 border border-white/20">
                <Compass className="w-4 h-4 text-amber-300" />
                <span>HALAMAN 1: SET INDUKSI</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                <CheckCircle className={`w-3.5 h-3.5 ${visitedStates.length >= 2 ? 'text-amber-300' : 'text-white/60'}`} />
                <span>Lokasi Diterokai: {visitedStates.length} / 2</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Peta Digital Jelajah Malaysia
            </h1>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 text-left">
              <p className="text-xs sm:text-sm font-bold text-yellow-200">
                Arahan / Nota:
              </p>
              <p className="text-xs sm:text-sm text-sky-50 leading-relaxed italic">
                "Selamat datang, murid-murid! Mari mulakan pengembaraan kita dengan menerokai peta digital Malaysia. Pilih dua lokasi pilihan anda di bawah dan baca petikan yang disediakan."
              </p>
            </div>

            {/* Arahan Penggunaan */}
            <div className="text-xs text-sky-100 space-y-1 text-left">
              <p className="font-bold text-white flex items-center gap-1.5">
                <span>📌</span> Arahan Penggunaan:
              </p>
              <ul className="list-disc list-inside space-y-0.5 pl-1 text-sky-100/90">
                <li>Pilih lokasi atau negeri yang ingin dikunjungi dengan klik butang lokasi yang disediakan bagi menerokai maklumat serta petikan teks berkaitan.</li>
                <li>Teliti petikan teks yang dipaparkan dan kenal pasti kata ganda yang terkandung di dalamnya.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Visual Area */}
      <section className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Peta Digital Malaysia (Contoh: Sabah)</span>
            </h2>
            <p className="text-xs text-slate-600">
              Lokasi <strong>Sabah</strong> disediakan sebagai <strong>contoh</strong> petikan rangsangan. Untuk menerokai semua negeri lain di Malaysia, sila layari pautan <strong>Genially</strong> di bawah!
            </p>
          </div>

          {/* Quick Buttons for States - Only Sabah */}
          <div className="flex flex-wrap gap-1.5">
            {statesData.map((st) => {
              const isVisited = visitedStates.includes(st.id);
              return (
                <button
                  key={st.id}
                  onClick={() => handleOpenState(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                    isVisited
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                      : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-amber-300 ring-2 ring-amber-400/40'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  <span>📍 {st.name}</span>
                  {isVisited && <span className="text-xs text-emerald-700">✓ Diterokai</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Canvas Container */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-sky-100 shadow-inner group">
          <img
            src="/assets/aistudio/image_5bae0901.png"
            alt="Peta Digital Malaysia melalui Kata Ganda"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover select-none"
          />

          {/* Interactive clickable overlay pins */}
          {statesData.map((st) => (
            <button
              key={st.id}
              onClick={() => handleOpenState(st)}
              style={{ left: st.x, top: st.y }}
              aria-label={`Lokasi ${st.name}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 shadow-lg border-2 border-red-500 hover:scale-125 hover:bg-yellow-300 transition-all cursor-pointer group/pin"
            >
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-red-600 animate-pulse flex items-center justify-center text-[10px] text-white font-extrabold">
                📍
              </div>
              <span className="hidden sm:block absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none group-hover/pin:scale-110 transition-transform">
                {st.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Selected State Popup Modal (e.g. Sabah Gunung Kinabalu matching user's image_1a4f07da.png) */}
      <AnimatePresence>
        {selectedState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border-4 border-amber-300 relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-amber-500 p-4 sm:p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇲🇾</span>
                  <div>
                    <h3 className="text-lg font-black font-display">
                      Eksplorasi Lokasi: {selectedState.name}
                    </h3>
                    <p className="text-xs text-amber-100 font-medium">
                      Mercu Tanda: {selectedState.landmark}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedState(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 overflow-y-auto">
                {/* Specific Kinabalu visual for Sabah or styled photographic frame */}
                {selectedState.useUserAsset ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                    <img
                      src={selectedState.useUserAsset}
                      alt={selectedState.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-cover max-h-72"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-3xl">
                      🏔️
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{selectedState.landmark}</h4>
                      <p className="text-xs text-slate-500">
                        Salah satu destinasi kebanggaan rakyat Malaysia yang penuh dengan keindahan alam semula jadi.
                      </p>
                    </div>
                  </div>
                )}

                {/* Petikan Teks Rangsangan Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                      <span>📖</span> Petikan Teks Rangsangan:
                    </span>

                    <button
                      onClick={handleSpeakText}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border shadow-2xs ${
                        isPlayingStimulus
                          ? 'bg-amber-400 text-slate-950 border-amber-500 animate-pulse'
                          : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-100'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlayingStimulus ? 'animate-bounce' : 'text-amber-700'}`} />
                      <span>{isPlayingStimulus ? 'Sedang Dimainkan...' : 'Dengar Bacaan Teks (Cikgu) 🎙️'}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {highlightKataGanda ? (
                      selectedState.stimulusText.split(new RegExp(`(${selectedState.kataGanda})`, 'gi')).map((part, i) =>
                        part.toLowerCase() === selectedState.kataGanda.toLowerCase() ? (
                          <span
                            key={i}
                            className="bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded-md shadow-xs animate-pulse inline-block mx-0.5"
                          >
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )
                    ) : (
                      selectedState.stimulusText
                    )}
                  </p>
                </div>

                {/* Interactive Highlight Kata Ganda Helper */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      playClickSound();
                      setHighlightKataGanda(!highlightKataGanda);
                    }}
                    className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      highlightKataGanda
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {highlightKataGanda
                        ? 'Sembunyikan Serlahan Kata Ganda'
                        : 'Kenal Pasti & Serlahkan Kata Ganda dalam Petikan!'}
                    </span>
                  </button>

                  {highlightKataGanda && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5 text-xs text-slate-700"
                    >
                      <div className="font-bold text-emerald-800 flex items-center gap-1.5 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Kata Ganda Dikesan: {selectedState.kataGanda}</span>
                      </div>
                      <p>
                        <span className="font-semibold text-slate-900">Jenis:</span>{' '}
                        <span className="bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-md">
                          {selectedState.jenisKataGanda}
                        </span>
                      </p>
                      <p className="text-slate-600 pt-1 leading-relaxed">
                        {selectedState.penjelasan}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedState(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Tutup & Pilih Lokasi Lain
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Genially Digital Link & Interactive Modal */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
              G
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wide">
                <span>Pautan Interaktif Digital</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Aplikasi Genially: Peta Digital Jelajah Malaysia
              </h3>
              <p className="text-xs text-slate-500">
                Akses paparan multimedia digital penuh melalui portal Genially rasmi.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGeniallyModal(!showGeniallyModal)}
              className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>{showGeniallyModal ? 'Sembunyikan Paparan Dalaman' : 'Buka Paparan Dalaman (Embed)'}</span>
            </button>

            <a
              href="https://view.genially.com/6ac0ac5f50a76fea00293cda"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Buka di Genially</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Embedded Genially iframe preview if user toggles */}
        {showGeniallyModal && (
          <div className="rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-md h-[480px] bg-slate-900">
            <iframe
              src="https://view.genially.com/6ac0ac5f50a76fea00293cda"
              title="Genially Peta Jelajah Malaysia"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        )}
      </section>

      {/* Bottom Navigation Buttons: Kembali ke Laman Utama & Langkah Seterusnya */}
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
            onNavigate('langkah1');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Langkah Seterusnya: Kenali Jenis Kata Ganda</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
