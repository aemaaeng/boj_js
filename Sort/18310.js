// 안테나
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// N = 집의 개수
const N = Number(input.shift());
const houses = input[0].split(" ").map(Number);

houses.sort((a, b) => a - b);

if (N % 2 === 0) {
  console.log(houses[N / 2 - 1]);
} else {
  console.log(houses[Math.floor(N / 2)]);
}
