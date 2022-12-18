// 숫자 야구
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const game = input.slice(1).map((el) => el.split(" "));

// 수가 들어왔을 때 게임의 턴과 비교하여 조건에 해당하는지 판별하는 함수
function check(num) {
  for (let i = 0; i < N; i++) {
    let strCnt = 0;
    let ballCnt = 0;
    let turn = game[i];
    let guess = turn[0];

    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (j === k && guess[j] === num[k]) strCnt += 1;
        if (j !== k && guess[j] === num[k]) ballCnt += 1;
      }
    }

    if (strCnt !== Number(turn[1]) || ballCnt !== Number(turn[2])) return false;
  }
  return true;
}

let possible = 0;
for (let i = 123; i <= 987; i++) {
  let num = String(i);

  // 각 자리는 0을 제외한 서로 다른 숫자로 구성됨.
  if (
    num[1] === "0" ||
    num[2] === "0" ||
    num[0] === num[1] ||
    num[0] === num[2] ||
    num[1] === num[2]
  )
    continue;

  if (check(num)) possible += 1;
}

console.log(possible);
