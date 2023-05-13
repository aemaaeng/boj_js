// LCS Longest Common Subsequence
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [str1, str2] = input;
const N = str1.length;
const M = str2.length;

// 가장 긴 부분수열의 길이
const D = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      D[i][j] = D[i - 1][j - 1] + 1;
    } else {
      D[i][j] = Math.max(D[i][j - 1], D[i - 1][j]);
    }
  }
}

// console.log(D);
// [
//   [0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 1, 1, 1, 1, 1],
//   [0, 1, 1, 1, 2, 2, 2],
//   [0, 1, 2, 2, 2, 3, 3],
//   [0, 1, 2, 2, 2, 3, 3],
//   [0, 1, 2, 2, 2, 3, 4],
//   [0, 1, 2, 3, 3, 3, 4],
// ];
console.log(D[N][M]);
