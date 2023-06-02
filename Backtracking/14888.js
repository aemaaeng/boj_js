// 연산자 끼워넣기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
// 연산자
const operator = input[2].split(" ").map(Number);

// 최댓값과 최솟값
let min = Infinity;
let max = Number.MIN_SAFE_INTEGER;

const temp = [];

// +, -, x, /
const calc = {
  0: (num1, num2) => num1 + num2,
  1: (num1, num2) => num1 - num2,
  2: (num1, num2) => num1 * num2,
  3: (num1, num2) => {
    return num1 < 0 ? -Math.floor(-num1 / num2) : Math.floor(num1 / num2);
  },
};

function backtracking(cnt) {
  // cnt가 N - 1이 될 때 계산 수행 후 최댓값, 최솟값과 비교
  if (cnt === N - 1) {
    let num1 = A[0];
    for (let i = 0; i < temp.length; i++) {
      let idx = temp[i];
      num1 = calc[idx](num1, A[i + 1]);
    }
    if (max < num1) max = num1;
    if (num1 < min) min = num1;
  }

  for (let i = 0; i < 4; i++) {
    if (!operator[i]) continue;
    operator[i] -= 1;
    temp.push(i);
    backtracking(cnt + 1);
    operator[i] += 1;
    temp.pop();
  }
}

backtracking(0);
console.log(`${max}\n${min}`);
