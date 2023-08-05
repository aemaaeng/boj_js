// 퇴사
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));

const D = new Array(N + 1).fill(0);
let max = 0;

// 뒤쪽 날짜부터 접근해서 해결
for (let i = N - 1; i > -1; i--) {
  let [time, cost] = input[i];
  time = time + i;
  if (time <= N) {
    D[i] = Math.max(cost + D[time], max);
    max = D[i];
  } else {
    D[i] = max;
  }
}

console.log(max);
