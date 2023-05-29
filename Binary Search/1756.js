// 피자 굽기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [D, N] = input[0].split(" ").map(Number);
const oven = input[1].split(" ").map(Number);
const pizza = input[2].split(" ").map(Number);
let limit = D;

// 5 6 4 3 6 2 3 -> 5 5 4 3 3 2 2
for (let i = 1; i < D; i++) {
  if (oven[i - 1] < oven[i]) oven[i] = oven[i - 1];
}

for (let i = 0; i < N; i++) {
  let left = 0;
  let right = limit - 1;

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);

    // oven 배열이 내림차순으로 정렬되어 있으므로 일반 이분탐색과 반대로 생각해야 함
    if (oven[mid] >= pizza[i]) {
      left = mid + 1;
    } else if (oven[mid] < pizza[i]) {
      right = mid - 1;
    }
  }
  limit = right;
}

console.log(limit >= 0 ? limit + 1 : 0);
