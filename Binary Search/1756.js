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
  let right = D - 1;
  limit = limit - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    // console.log(mid);
    if (oven[mid] >= pizza[i]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
    limit = right;
  }
}

console.log(limit >= 0 ? limit + 1 : 0);
