// 입력 받기
const fs = require("fs");
// const input = fs.readFileSync("test.txt").toString().trim().split("\n");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// input = ['3', '0', '1', '3']; 첫 번째는 테스트케이스
// fib(0)과 fib(1)의 출현 횟수도 피보나치 수열의 규칙을 가짐.
const test = input.slice(1);
let fibzero = [1, 0];
let fibone = [0, 1];

for (let i = 0; i < test.length; i++) {
  let num = Number(test[i]);

  if (num === 0) console.log("1 0");
  else if (num === 1) console.log("0 1");
  else {
    for (let j = 2; j < num + 1; j++) {
      fibzero.push(fibzero[j - 1] + fibzero[j - 2]);
      fibone.push(fibone[j - 1] + fibone[j - 2]);
    }
    console.log(`${fibzero.pop()} ${fibone.pop()}`);
    fibzero = [1, 0];
    fibone = [0, 1];
  }
}
