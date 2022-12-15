// 분해합 - 타입에 유의하여 풀기!
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim();

// 어떤 수의 생성자 = 어떤 수 자기 자신 + 각 자릿수
// 반대로 생성자가 주어지면 가장 작은 원래 수(M)를 리턴하는 문제

// 1부터 싹 돌기
// 필요한 변수? sum을 i로 지정해두고 그 i에다가 나머지 자릿수를 더해나가기

let n = Number(input);
let ans = [];

for (let i = 1; i <= n; i++) {
  let sum = i;
  for (let j = 0; j < String(i).length; j++) {
    sum += Number(String(i)[j]);
  }
  if (sum === n) {
    ans.push(i);
    break;
  }
}

// 생성자가 없는 경우 처리
ans.length === 0 ? console.log(0) : console.log(ans[0]);
