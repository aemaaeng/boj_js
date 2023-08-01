// 공유기 설치
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, C] = input.shift().split(" ").map(Number);
input = input.map(Number);

input.sort((a, b) => a - b);

let start = 1; // 가장 작은 gap
let end = input[N - 1] - input[0]; // 가장 큰 gap
let result = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let value = input[0];
  let cnt = 1;

  // 공유기 설치
  for (let i = 1; i < N; i++) {
    if (input[i] >= value + mid) {
      value = input[i];
      cnt += 1;
    }
  }

  if (cnt >= C) {
    start = mid + 1;
    result = mid;
  } else {
    end = mid - 1;
  }
}

console.log(result);
