// 연산자 끼워넣기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const operArr = input[2].split(" ").map(Number);

const calcObj = {
  0: (num1, num2) => num1 + num2,
  1: (num1, num2) => num1 - num2,
  2: (num1, num2) => num1 * num2,
  3: (num1, num2) => {
    if (num1 < 0) {
      return -Math.floor(-num1 / num2);
    }
    return Math.floor(num1 / num2);
  },
};

let max = Number.MIN_SAFE_INTEGER;
let min = Infinity;
const temp = [];

function dfs(v) {
  if (v === N - 1) {
    // 계산 수행
    let num1 = nums[0];
    for (let i = 0; i < temp.length; i++) {
      let num2 = nums[i + 1];
      let idx = temp[i];
      num1 = calcObj[idx](num1, num2);
    }
    if (num1 > max) max = num1;
    if (num1 < min) min = num1;
  }

  for (let i = 0; i < 4; i++) {
    if (!operArr[i]) continue;
    operArr[i] -= 1;
    temp.push(i);
    dfs(v + 1);
    operArr[i] += 1;
    temp.pop();
  }
}

dfs(0);
console.log(`${max}\n${min}`);
