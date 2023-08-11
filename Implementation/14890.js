// 경사로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, L] = input.shift().split(" ").map(Number);
const map = input.map((el) => el.split(" ").map(Number));

let used = new Array(N).fill(false);
let result = 0;

function check(now) {
  for (let i = 1; i < N; i++) {
    if (Math.abs(now[i] - now[i - 1]) > 1) return false;
    if (now[i] < now[i - 1]) {
      for (let j = 0; j < L; j++) {
        if (i + j >= N || used[i + j] || now[i] !== now[i + j]) return false;
        if (now[i] === now[i + j]) used[i + j] = true;
      }
    } else if (now[i] > now[i - 1]) {
      for (let j = 0; j < L; j++) {
        if (i - j - 1 < 0 || used[i - j - 1] || now[i - 1] !== now[i - j - 1])
          return false;
        if (now[i - 1] === now[i - j - 1]) used[i - j - 1] = true;
      }
    }
  }

  return true;
}

for (let i = 0; i < N; i++) {
  used = new Array(N).fill(false);
  if (check(map[i]) === true) result += 1;
}

for (let i = 0; i < N; i++) {
  used = new Array(N).fill(false);
  const col = [];
  for (let j = 0; j < N; j++) {
    col.push(map[j][i]);
  }
  if (check(col) === true) result += 1;
}

console.log(result);
