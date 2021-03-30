import axios, { AxiosInstance } from "axios";
const baseURL = "https://quran.kemenag.go.id";

interface Tafsir {
  tafsir_id: number;
  tafsir_text: string;
  mufasir: string;
  ayat_name: string;
  surat_id: string;
  ayat_id: string;
}

interface Surat {
  surat_id: number;
  surat_name: string;
  surat_name_arabic: string;
  surat_name_bahasa: string;
  surat_ayat_count: number;
}

interface Ayat {
  ayat_id: number;
  ayat_number: number;
  ayat_arabic: string;
  ayat_bahasa: string;
  surat_id: number;
  juz_id: number;
  page_number: number;
}

class QuranKemenag {
  private _http: AxiosInstance;
  constructor() {
    this._http = axios.create({ baseURL });
  }

  public async getAllSurat(): Promise<Surat[]> {
    return this.getSurat(114, 0);
  }

  public async getAllAyat(suratId: number): Promise<Ayat[]> {
    return this.getAyat(suratId, 500, 0);
  }

  public async getSurat(
    limit: number = 10,
    offset: number = 0
  ): Promise<Surat[]> {
    const response = await this.fetch(`api/v1/surat/${offset}/${limit}`);
    const data = response.data || [];
    return this.dataMapper(data, {
      surat_id: "id",
      surat_name: "surat_name",
      surat_name_arabic: "surat_text",
      surat_name_bahasa: "surat_terjemahan",
      surat_ayat_count: "count_ayat",
    });
  }

  public async getAyat(
    suratId: number,
    limit: number = 10,
    offset: number = 0
  ): Promise<Ayat[]> {
    const response = await this.fetch(
      `api/v1/ayatweb/${suratId}/0/${offset}/${limit}`
    );
    const ayat = response.data || [];
    for (let i = 0; i < ayat.length; i++) {
      const aya = ayat[i];
      const mp3 = this.getMp3Url(aya.sura_id, aya.aya_id);
      ayat[i].mp3 = mp3;
    }
    return this.dataMapper(ayat, {
      ayat_id: "aya_id",
      ayat_number: "aya_number",
      ayat_arabic: "aya_text",
      ayat_bahasa: "translation_aya_text",
      ayat_sound: "mp3",
      surat_id: "sura_id",
      juz_id: "juz_id",
      page_number: "page_number",
    });
  }

  public async getTafsir(ayatId: number): Promise<Tafsir[]> {
    const response = await this.fetch(`api/v1/tafsirbyayat/${ayatId}`);
    const data = response.tafsir || [];
    return this.dataMapper(data, {
      tafsir_id: "tafsir_id",
      tafsir_text: "text",
      mufasir: "mufasir",
      ayat_name: "aya_name",
      surat_id: "sura_id",
      ayat_id: "aya_number",
    });
  }

  private dataMapper(data: any[], map: object): any[] {
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const mappedData = {};
      for (const key in map) {
        mappedData[key] = d[map[key]];
      }
      data[i] = mappedData;
    }
    return data;
  }
  private getMp3Url(suratId: number, ayatId: number): string {
    const addZero = (num: number) => {
      let numStr = num.toString();
      let leftOver = 3 - numStr.length;
      while (leftOver > 0) {
        numStr = `0${numStr}`;
        leftOver -= 1;
      }
      return numStr;
    };
    return [
      baseURL,
      "/cmsq/source/s01/",
      addZero(suratId),
      addZero(ayatId),
      ".mp3",
    ].join("");
  }

  private async fetch(url: string): Promise<any> {
    try {
      const response = await this._http.get(url);
      return response.data;
    } catch (error) {
      let response = error.response;
      throw response ? response.data : error.message || error;
    }
  }
}

// const quran = new QuranKemenag();

// quran
//   .getAllAyat(1)
//   .then(console.log)
//   .catch(console.log);
// quran.getTafsir(2).then(d => console.log(d)).catch(console.log);
// quran.getAllSurat().then((s) => {
//   const max = s.reduce((a, b) => (a.surat_ayat_count > b.surat_ayat_count ? a : b));
//   console.log(max);
// });

export default QuranKemenag;
