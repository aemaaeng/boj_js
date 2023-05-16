// 피자 굽기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [D, N] = input[0].split(" ").map(Number);
const oven = input[1].split(" ").map(Number);
const pizza = input[2].split(" ").map(Number);
let limit = D;

// 반복문 처리를 먼저
// 이전 깊이의 지름이 자기 자신보다 작다면, 그 작은 곳에게 맞춘다 -> 어차피 막혀서 못 들어가기 때문
// 5 6 4 3 6 2 3 -> 5 5 4 3 3 2 2
for (let i = 1; i < D; i++) {
  if (oven[i - 1] < oven[i]) oven[i] = oven[i - 1];
}

for (let i = 0; i < N; i++) {
  let left = 0;
  let right = limit - 1;

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (oven[mid] >= pizza[i]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  limit = right;
}

console.log(limit >= 0 ? limit + 1 : 0);

// 참고: https://github.com/flip1945/TIL/blob/1f49203c4a4bc45100d3af576dbb7a86641d12d5/Algorithm/Binary%20Search/BOJ_%ED%94%BC%EC%9E%90%20%EA%B5%BD%EA%B8%B0.md?plain=1#L1
