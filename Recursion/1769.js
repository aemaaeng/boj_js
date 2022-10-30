// 3의 배수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

// 내가 아는 3의 배수는 3, 6, 9 뿐이라고 가정
// x의 각 자리수의 합인 y가 한 자리수가 될 때까지 실행
// reduce로 써보자

const X = input[0].split("").map(Number);

function solution(X) {
  if (X.length === 1) {
    return [0, X[0] % 3 === 0 ? "YES" : "NO"];
  }
  // 합을 구하고
  // 그 합이 한 자리수가 아니면 또 합을 구한다
  function recur(X, cnt) {
    let Y = X.reduce((acc, cur) => acc + cur, 0);
    if (Y < 10) {
      return `${cnt} ${Y}`;
    }
    let arr = String(Y).split("").map(Number);
    return recur(arr, cnt + 1);
  }

  return [
    recur(X, 1).split(" ")[0],
    recur(X, 1).split(" ")[1] % 3 === 0 ? "YES" : "NO",
  ];
}

console.log(solution(X).join("\n"));
