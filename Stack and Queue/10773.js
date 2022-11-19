// 제로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const nums = input.slice(1).map(Number);
let stack = [];

for (let i = 0; i < nums.length; i++) {
  if (nums[i] !== 0) {
    stack.push(nums[i]);
  } else {
    stack.pop();
  }
}

if (stack.length === 0) {
  console.log(0);
} else {
  let sum = stack.reduce((acc, cur) => acc + cur, 0);
  console.log(sum);
}
