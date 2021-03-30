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

// get list surat
quran.getAllSurat()
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    });


// get surat by limit and offset
quran.getSurat(
        10, // limit
        0, // offset
    )
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    })

// get list ayat
quran.getAllAyat(
        1 // surat_id
    )
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    });


// get ayat by limit and offset
quran.getAyat(
        2, // surat_id
        10, // limit
        0, // offset
    )
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    })


// get tafsir by ayat
quran.getTafsir(
        2, // ayat_id
    )
    .then((data) => {
        // data handling here
    })
    .catch((error) => {
        // error handling here
    })

```