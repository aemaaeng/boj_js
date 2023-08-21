// 부분 문자열
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [S, P] = input;

// S.indexOf(P) !== -1 ? console.log(1) : console.log(0); -> 시간초과
// KMP 알고리즘 -> https://chanhuiseok.github.io/posts/algo-14/

function calculateLPSArray(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  const lps = calculateLPSArray(pattern);
  console.log(lps);

  let i = 0; // Index for text[]
  let j = 0; // Index for pattern[]

  while (i < n) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }
    if (j === m) {
      j = lps[j - 1];
      return true;
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return false;
}

kmpSearch(S, P) ? console.log(1) : console.log(0);
