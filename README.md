[![view on npm](http://img.shields.io/npm/v/quran-kemenag.svg)](https://www.npmjs.org/package/quran-kemenag)
[![npm module downloads per month](http://img.shields.io/npm/dm/quran-kemenag.svg)](https://www.npmjs.org/package/quran-kemenag)
# Quran Kemenag
Al-Quran data from kemenag (https://quran.kemenag.go.id)

## How to Install

```bash
npm install quran-kemenag
# or
yarn add quran-kemenag
```

## How to Use

```javascript
// in common JS
const QuranKemenag = require("quran-kemenag");

// in typescript
import QuranKemenag from "quran-kemenag";

const quran = new QuranKemenag();

// Get List of Surah
quran.getListSurah(
    keyword      // optional, search keyword for surah name
    )
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    });


// Get Surah Data
const options = {
    include_verse: true,
    verses_limit: 2,
    verses_offset: 1
}
quran.getSurah(
    1,          // required, surah id or surah number
    options     // optional
    )
    .then((data) => {
        // data handling here
    });
    .catch((error) => {
        // error handing here
    })

```
