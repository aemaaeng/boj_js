// 좋은수열
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString().trim());

// 숫자를 하나씩 넣어보고
// 그 수가 좋은 수열의 조건에 해당하면 재귀함수를 실행한다
// 문제에서 요구하는 것은 가장 **작은** 좋은수열
// 따라서 가장 처음에 나타나는 좋은수열에서 함수를 바로 종료한다 (isDone 변수 이용)
// for문에서 1부터 3까지 순차적으로 돌면서 넣어보기 때문

function isGood(str) {
  // return boolean
  const L = str.length;
  const mid = Math.floor(L / 2);
  for (let i = 1; i <= mid; i++) {
    const A = L;
    const B = L - i;
    const C = L - i * 2;
    if (C >= 0 && str.substring(C, B) === str.substring(B, A)) return false;
  }
  return true;
}

let isDone = false;

function backtracking(str) {
  if (isDone) return;

  if (str.length === N) {
    console.log(str);
    isDone = true;
    return;
  }
  for (let i = 1; i <= 3; i++) {
    let temp = str + `${i}`;
    if (isGood(temp) && temp.length <= N) backtracking(temp);
  }
}

backtracking("1");
