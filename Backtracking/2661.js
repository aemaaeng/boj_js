// 좋은 수열
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString());

let isDone = false;

function backtracking(str) {
  if (isDone) return;

  if (str.length === N) {
    console.log(str);
    isDone = true;
    return;
  }

  for (let i = 1; i < 4; i++) {
    const temp = str + `${i}`;
    if (temp.length <= N && isGood(temp)) backtracking(temp);
  }
}

function isGood(str) {
  const M = str.length;
  const half = Math.floor(M / 2);
  for (let i = 1; i <= half; i++) {
    const A = M;
    const B = M - i;
    const C = M - i * 2;
    if (C >= 0 && str.substring(B, A) === str.substring(C, B)) return false;
  }
  return true;
}

backtracking("1");
