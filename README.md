# Quran Kemenag
Fetch Al-Quran data from kemenag (https://quran.kemenag.go.id)

## How to Install
```bash
npm install quran-kemenag
# or
yarn add quran-kemenag
```

## How to Use
```javascript
const QuranKemenag = require("quran-kemenag");
const quran = new QuranKemenag();

// Get List of Surah
quran.getListSurah()
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
    1, // surah id or surah number 
    options
    )
    .then((data) => {
        // data handling here
    });
    .catch((error) => {
        // error handing here
    })

```