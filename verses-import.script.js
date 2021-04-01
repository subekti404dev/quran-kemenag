const fs = require("fs");

let result = [];
result.push("export const getVerses = (surah_id: number) => {");
result.push("    switch (surah_id) {");

for (let i = 1; i <= 114; i++) {
  result.push(`        case ${i}:`);
  result.push(`            return require('../data/verses/${i}.json')`);
}

result.push("        default:");
result.push("            return null;");
result.push("    }");
result.push("}");

fs.writeFileSync("src/get-verses.ts", result.join("\n"));
