const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const costs = input.map((el) => el.split(" ").map(Number));

const R = [0];
const G = [0];
const B = [0];

costs.forEach((el) => {
  R.push(el[0]);
  G.push(el[1]);
  B.push(el[2]);
});

// 테이블
const D = Array.from(new Array(N + 1), () => new Array(4).fill(0));

// 초기값
D[1][0] = R[1];
D[1][1] = G[1];
D[1][2] = B[1];

// 테이블 채우기
for (let i = 2; i < N + 1; i++) {
  D[i][0] = Math.min(D[i - 1][1], D[i - 1][2]) + R[i];
  D[i][1] = Math.min(D[i - 1][0], D[i - 1][2]) + G[i];
  D[i][2] = Math.min(D[i - 1][0], D[i - 1][1]) + B[i];
}

console.log(Math.min(D[N][0], D[N][1], D[N][2]));
