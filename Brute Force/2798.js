// 블랙잭
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => {
    let arr = el.split(" ");
    return arr.map(Number);
  });

const N = input[0][0];
const M = input[0][1];

const nums = input[1];
let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    for (let k = j + 1; k < N; k++) {
      let sum = nums[i] + nums[j] + nums[k];
      if (sum >= answer && sum <= M) answer = sum;
    }
  }
}

console.log(answer);
