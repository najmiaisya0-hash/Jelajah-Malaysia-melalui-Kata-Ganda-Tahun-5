import React, { useState } from 'react';
import { PageId } from '../types';
import { playClickSound, playPomPomSound } from '../utils/audio';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  Eye,
} from 'lucide-react';
import { MascotLangkah3 } from './CartoonHeaderMascots';

interface Langkah3Props {
  onNavigate: (page: PageId) => void;
}

export const Langkah3Page: React.FC<Langkah3Props> = ({ onNavigate }) => {
  const [copiedPin, setCopiedPin] = useState(false);
  const [showNearpodEmbed, setShowNearpodEmbed] = useState(false);

  // Mystery Box State
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [drawnWord, setDrawnWord] = useState<string | null>(null);

  const mysteryCards = [
    { word: 'Gotong-royong', type: 'Berentak' },
    { word: 'Warna-warni', type: 'Berentak' },
    { word: 'Kanak-kanak', type: 'Penuh' },
    { word: 'Gunung-ganang', type: 'Berentak' },
    { word: 'Rakyat-jelata', type: 'Berentak' },
    { word: 'Pepohon', type: 'Separa' },
    { word: 'Kuih-muih', type: 'Berentak' },
    { word: 'Pulau-pulau', type: 'Penuh' },
  ];

  const handleOpenMysteryBox = () => {
    setIsBoxOpen(true);
    const randomCard = mysteryCards[Math.floor(Math.random() * mysteryCards.length)];
    setDrawnWord(randomCard.word);
    // Play celebratory sound effect "pom pom!" without spoken voice
    playPomPomSound();
  };

  const handleCopyPin = () => {
    playClickSound();
    navigator.clipboard.writeText('LGBAK');
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Cute Mystery Box Mascot on the LEFT */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 text-white rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Mascot on the LEFT */}
          <div className="shrink-0 pt-1">
            <MascotLangkah3 />
          </div>

          {/* Header Content on the RIGHT */}
          <div className="space-y-3 flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-purple-100 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>HALAMAN 4: LANGKAH 3</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-tight text-white drop-shadow-sm">
              Misi Karya Anak Malaysia
            </h1>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 text-left">
              <p className="text-xs sm:text-sm font-bold text-yellow-200">
                Arahan / Nota:
              </p>
              <p className="text-xs sm:text-sm text-purple-50 leading-relaxed italic">
                "Ambil kad kata ganda daripada Kotak Misteri fizikal anda. Imbas kod QR pada buku jelajah malaysia untuk mengakses lembaran kerja digital dan bina 3 ayat yang gramatis."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section: Kotak Misteri & Kod QR Lembaran Kerja */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kotak Misteri (Physical & Virtual Interactive) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                🎁
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Kotak Misteri Kata Ganda
                </h3>
                <p className="text-xs text-slate-500">
                  Ambil kad dari kotak fizikal atau cuba cabutan digital di bawah:
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50 to-indigo-50 border border-purple-100 text-center space-y-3">
              <div className="text-4xl animate-bounce">
                {isBoxOpen ? '✨' : '📦'}
              </div>

              {drawnWord ? (
                <div className="p-3 rounded-xl bg-white border-2 border-purple-300 shadow-sm">
                  <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                    Kad Misteri Anda
                  </div>
                  <div className="text-2xl font-black text-purple-900 font-display my-1">
                    {drawnWord}
                  </div>
                  <p className="text-xs text-slate-600">
                    Bina ayat patriotisme menggunakan perkataan ini pada buku aktiviti fizikal / lembaran kerja Nearpod anda!
                  </p>
                </div>
              ) : (
                <p className="text-xs text-purple-800 font-medium">
                  Klik butang di bawah untuk membuka Kotak Misteri Digital:
                </p>
              )}

              <button
                onClick={handleOpenMysteryBox}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                <span>🎉</span>
                <span>{isBoxOpen ? 'Cabut Kad Misteri Lain (Pom Pom!)' : 'Buka Kotak Misteri Digital'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Peringatan Guru:</strong> Pastikan murid merujuk buku fizikal Jelajah Malaysia untuk memasukkan kad fizikal ke slot tugasan masing-masing.
          </div>
        </div>

        {/* Nearpod & QR Code Digital Worksheet */}
        <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-bold">
                N
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Lembaran Kerja Digital (Nearpod)
                </h3>
                <p className="text-xs text-slate-500">
                  Imbas QR atau sertai melalui PIN kuiz:
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex flex-col sm:flex-row items-center gap-4">
              {/* Simulated QR Code matching physical book */}
              <div className="w-28 h-28 bg-white p-2 rounded-2xl shadow-sm border border-indigo-200 flex flex-col items-center justify-center shrink-0">
                <QrCode className="w-20 h-20 text-indigo-900" />
                <span className="text-[9px] font-bold text-slate-600 -mt-1">Imbas Kod QR</span>
              </div>

              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="text-xs font-bold text-slate-600">PIN Sesi Pembelajaran:</div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border-2 border-indigo-300 shadow-2xs">
                  <span className="font-mono text-xl font-black text-indigo-950 tracking-wider">
                    LGBAK
                  </span>
                  <button
                    onClick={handleCopyPin}
                    className="p-1 rounded-md text-indigo-600 hover:bg-indigo-50 cursor-pointer"
                    title="Salin PIN"
                  >
                    {copiedPin ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500">
                  Gunakan kod ini di aplikasi Nearpod murid untuk membina ayat.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://app.nearpod.com/?pin=LGBAK"
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Buka Nearpod (PIN: LGBAK)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  playClickSound();
                  setShowNearpodEmbed(!showNearpodEmbed);
                }}
                className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>{showNearpodEmbed ? 'Tutup' : 'Paparkan Sini'}</span>
              </button>
            </div>
          </div>

          {showNearpodEmbed && (
            <div className="rounded-2xl overflow-hidden border-2 border-indigo-200 shadow-md h-72 bg-slate-900 mt-2">
              <iframe
                src="https://app.nearpod.com/?pin=LGBAK"
                title="Nearpod Lembaran Kerja"
                className="w-full h-full border-0"
              />
            </div>
          )}
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
            onNavigate('refleksi');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform hover:scale-105 cursor-pointer"
        >
          <span>Langkah Seterusnya: Refleksi Digital</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
