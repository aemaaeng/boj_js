// 빗물
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [H, W] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);

let answer = 0;

for (let i = 0; i < W - 1; i++) {
  const leftMax = Math.max(...arr.slice(0, i));
  const rightMax = Math.max(...arr.slice(i + 1, W));

  const min = Math.min(leftMax, rightMax);

  if (arr[i] < min) answer += min - arr[i];
}

console.log(answer);
