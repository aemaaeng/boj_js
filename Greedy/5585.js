// 거스름돈
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim();

let rest = 1000 - Number(input);
const coins = [500, 100, 50, 10, 5, 1];
let cnt = 0;

// input: 380, rest: 620
// 500, 100, 10, 10

// input: 1, rest: 999
// 500, 100, 100, 100, 100, 50, 10, 10, 10, 10, 5, 1, 1, 1, 1

for (coin of coins) {
  cnt += Math.floor(rest / coin);
  rest = rest % coin;
}

console.log(cnt);
