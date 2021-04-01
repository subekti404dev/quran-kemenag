export interface SurahPagination {
  limit: number;
  offset: number;
}

export interface Surah {
  surah_id: number;
  surah_name: string;
  surah_name_arabic: string;
  surah_name_bahasa: string;
  surah_verse_count: number;
  verses?: Verse[];
  pagination?: SurahPagination;
}

export interface Verse {
  verse_id: number;
  verse_number: number;
  verse_arabic: string;
  verse_bahasa: string;
  verse_audio: string;
  surah_id: number;
  juz_id: number;
  page_number: number;
  tafsir: Tafsir;
}

export interface Tafsir {
  short: string;
  long: string;
}
