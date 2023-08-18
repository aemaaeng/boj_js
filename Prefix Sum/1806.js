// 부분합
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, S] = input.shift().split(" ").map(Number);
input = input[0].split(" ").map(Number);

// N = 수열의 길이, S = 합
const P = [0];
for (let i = 1; i <= N; i++) {
  P[i] = P[i - 1] + input[i - 1];
}

let min = Infinity;
let left = 1;
let right = 1;

while (left <= right && right < P.length) {
  let sum = P[right] - P[left - 1];
  if (sum >= S) {
    min = Math.min(min, right - left + 1);
    left += 1;
  } else {
    right += 1;
  }
}

min === Infinity ? console.log(0) : console.log(min);
