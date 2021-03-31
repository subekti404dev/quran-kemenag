import quranJSON from "./quran.json";

interface SurahPagination {
  limit: number;
  offset: number;
}

interface Surah {
  surah_id: number;
  surah_name: string;
  surah_name_arabic: string;
  surah_name_bahasa: string;
  surah_verse_count: number;
  verses?: Verse[];
  pagination?: SurahPagination;
}

interface Verse {
  verse_id: number;
  verse_number: number;
  verse_arabic: string;
  verse_bahasa: string;
  verse_audio: string;
  surah_id: number;
  juz_id: number;
  page_number: number;
  tafsir: Tafsir
}

interface Tafsir {
  short: string;
  long: string;
}

class QuranKemenag {
  constructor() {}

  public async getListSurah(): Promise<Surah[]> {
    return (quranJSON as any[]).map((surah) => {
      delete surah.verses;
      return surah;
    });
  }

  public async getSurah(
    surah_id: number,
    options: {
      include_verse?: boolean;
      verses_limit?: number | null;
      verses_offset?: number | null;
    } = {
      include_verse: true,
      verses_limit: null,
      verses_offset: null,
    }
  ): Promise<Surah> {
    const surah = (quranJSON as any).find(
      (surah) => surah.surah_id === surah_id
    );
    if (options.include_verse === false) {
      delete surah.verses;
    } else {
      let pagination: any = {};
      if (options.verses_limit) pagination.limit = options.verses_limit;
      if (options.verses_offset) pagination.offset = options.verses_offset;
      const verses = surah.verses.slice(
        pagination.offset || 0,
        (pagination.offset || 0) + (pagination.limit || 300)
      );
      surah.verses = verses;
      if (pagination.limit || pagination.offset) {
        surah.pagination = pagination;
      }
    }
    return surah;
  }
}

export = QuranKemenag;