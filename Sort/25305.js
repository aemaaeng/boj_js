// 커트라인
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const K = Number(input[0].split(" ")[1]);
let score = input[1].split(" ").map(Number);

// 내림차순 정렬
score.sort((a, b) => b - a);
// k - 1번째 학생까지가 커트라인
console.log(score[K - 1]);
