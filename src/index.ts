import { Surah } from "./intefaces";
import quranJSON from "./quran.json";

class QuranKemenag {
  constructor() {}

  public async getListSurah(keyword: string = ""): Promise<Surah[]> {
    return (quranJSON as any[])
      .filter((surah) => {
        return (
          surah.surah_name.toLowerCase().includes(keyword.toLowerCase()) ||
          surah.surah_name_bahasa.toLowerCase().includes(keyword.toLowerCase())
        );
      })
      .map((surah) => {
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
      const verses = (surah.verses || []).slice(
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
