// 이친수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = parseInt(fs.readFileSync(filePath).toString().trim());

const memo = new Array(N + 1).fill(0);
memo[1] = 1;
memo[2] = 1;

for (let i = 3; i < memo.length; i++) {
  // 수의 범위를 초과하는 경우가 있기 때문에 BigInt 자료형을 써야 함.
  memo[i] = BigInt(memo[i - 1]) + BigInt(memo[i - 2]);
}

console.log(String(memo[N]));
