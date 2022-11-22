// 행렬 곱셈: 행렬의 거듭제곱 전에 먼저 풀어야 한다
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 행렬 A - n * m
// 행렬 B - m * k

// 첫째 줄: 행렬 A의 크기 N과 M
// 둘째 줄 ~ N개의 줄: 행렬 A의 원소 M개가 주어진다.
// N + 1번쨰 줄: 행렬 B의 크기 M과 K

// 그 다음부터는 행렬 B의 원소들이 주어짐

// A = [[1, 2], [3, 4], [5, 6]]
// B = [[-1, -2, 0], [0, 0, 3]]

const N = Number(input[0].split(" ")[0]);
const M = Number(input[N + 1].split(" ")[0]);
const K = Number(input[N + 1].split(" ")[1]);

// 행렬 A와 행렬 B 만들기
const A = input.slice(1, N + 1).map((el) => {
  let splitted = el.split(" ");
  return splitted.map(Number);
});
const B = input.slice(N + 2, input.length).map((el) => {
  let splitted = el.split(" ");
  return splitted.map(Number);
});

// [[-1, -2, 6], [-3, -6, 12], [-5, -10, 18]]

// 0으로 채운 배열 만들기? N * K
const arr = Array.from(Array(N), () => new Array(K).fill(0));

// 삼중 반복문?
for (let i = 0; i < N; i++) {
  for (let j = 0; j < K; j++) {
    for (let k = 0; k < M; k++) {
      arr[i][j] += A[i][k] * B[k][j];
    }
  }
}

// 답안 정제하기
let answer = arr.map((el) => el.join(" ")).join("\n");
console.log(answer);
