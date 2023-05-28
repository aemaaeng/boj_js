// 소형기관차
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const passengers = input[1].split(" ").map(Number);
const limit = Number(input[2]);

const P = [0];

// prefix sum
for (let i = 1; i <= N; i++) {
  P[i] = P[i - 1] + passengers[i - 1];
}

const D = Array.from(new Array(4), () => new Array(N + 1).fill(0));

// 소형기관차는 무조건 3대만 있다
for (let i = 1; i <= 3; i++) {
  // 기관차 첫 번째 객차부터 살펴보면서 테이블을 채워나간다
  for (let j = i * limit; j <= N; j++) {
    // prefix sum 이용하기
    D[i][j] = Math.max(D[i][j - 1], D[i - 1][j - limit] + P[j] - P[j - limit]);
  }
}

console.log(D[3][N]);
