const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString().trim());

let isDone = false;

function isGoodSequence(str) {
  const L = str.length;
  const half = Math.floor(L / 2);
  for (let i = 1; i <= half; i++) {
    const A = L;
    const B = L - i;
    const C = L - i * 2;
    if (C >= 0 && str.substring(C, B) === str.substring(B, A)) return false;
  }
  return true;
}

// 가장 작은 좋은 수열은 맨 처음에 발견된 좋은 수열이다.
// 반복문에서 1, 2, 3이 순차적으로 들어가고 있기 때문이다.
// 따라서 처음에 좋은 수열이 발견되었을 때 isDone을 true로 바꾸고 함수를 종료한다.
function backtracking(str) {
  if (isDone) return;

  if (str.length === N) {
    console.log(str);
    isDone = true;
    return;
  }

  for (let i = 1; i <= 3; i++) {
    let temp = str + `${i}`;
    if (temp.length <= N && isGoodSequence(temp)) backtracking(temp);
  }
}

backtracking("1");

// 123321은 중간에 3이 두 번 나오니까 좋은 수열이 아닐 거라고 생각했는데 true가 뜬다. 왜지
// console.log(isGoodSequence("123321")); -> true
