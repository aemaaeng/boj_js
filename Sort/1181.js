// 단어 정렬
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 중복 제거
let unique = new Set(input.slice(1));

// 1. 길이가 짧은 것부터
// 2. 길이가 같으면 사전 순으로
// 참고: https://stackoverflow.com/questions/6567941/how-does-sort-function-work-in-javascript-along-with-compare-function

let words = Array.from(unique);

words.sort((firstWord, secondWord) => {
  if (firstWord.length - secondWord.length === 0) {
    // 길이가 같으면....
    // for?
    for (let i = 0; i < firstWord.length; i++) {
      if (firstWord.charCodeAt(i) !== secondWord.charCodeAt(i)) {
        return firstWord.charCodeAt(i) - secondWord.charCodeAt(i);
      }
    }
  }
  return firstWord.length - secondWord.length;
});

console.log(words.join("\n"));
