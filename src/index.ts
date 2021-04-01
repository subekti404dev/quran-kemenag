import { getVerses } from "./get-verses";
import { Surah } from "./intefaces";
const surahJSON = require("../data/surah.json");

class QuranKemenag {
  constructor() {}

  public async getListSurah(keyword: string = ""): Promise<Surah[]> {
    return (surahJSON as any[]).filter((surah) => {
      return (
        surah.surah_name.toLowerCase().includes(keyword.toLowerCase()) ||
        surah.surah_name_bahasa.toLowerCase().includes(keyword.toLowerCase())
      );
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
    const surah = (surahJSON as any)[surah_id - 1];
    const verses: any[] = getVerses(surah_id)
    if (!surah) {
      throw new Error("invalid surah_id, must be between 1-114");
    }
    if (options.include_verse === false) {
      delete surah.verses;
      return surah;
    } else {
      let pagination: any = {};
      if (options.verses_limit !== null)
        pagination.limit = options.verses_limit;
      if (options.verses_offset !== null)
        pagination.offset = options.verses_offset;

      surah.verses = verses.slice(
        pagination.offset || 0,
        (pagination.offset || 0) + (pagination.limit || 300)
      );
      if (pagination.limit || pagination.offset) {
        surah.pagination = pagination;
      }
      return surah;
    }
  }
}

export = QuranKemenag;

// const quran = new QuranKemenag();
// quran.getSurah(1).then(console.log);
