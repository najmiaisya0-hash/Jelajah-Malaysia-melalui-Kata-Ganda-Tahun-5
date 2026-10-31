export type PageId =
  | 'home'
  | 'induksi'
  | 'langkah1'
  | 'langkah2'
  | 'langkah3'
  | 'refleksi'
  | 'manual';

export interface MapLocation {
  id: string;
  name: string;
  state: string;
  xPercent: number; // For placing pin on the map
  yPercent: number;
  landmark: string;
  image?: string;
  stimulusText: string;
  kataGanda: string[];
  kataGandaType: string;
  description: string;
}

export interface KataGandaWord {
  id: string;
  word: string;
  type: 'penuh' | 'separa' | 'berentak';
  rootWord: string;
  meaning: string;
  sampleSentence: string;
}

export type EmotionType = 'gembira' | 'biasa' | 'sedih' | 'marah';
