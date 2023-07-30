// 키 순서
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);

input = input.map((el) => el.split(" ").map(Number));

const graph = Array.from(new Array(N + 1), () =>
  new Array(N + 1).fill(Infinity)
);

for (const [a, b] of input) {
  graph[a][b] = 1;
}

for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < N + 1; j++) {
    if (i === j) graph[i][j] = 0;
  }
}

// 알고리즘 수행하기
for (let k = 1; k < N + 1; k++) {
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
    }
  }
}

function isKnowable(num) {
  for (let i = 1; i < N + 1; i++) {
    if (i === num) continue;
    if (graph[i][num] === Infinity && graph[num][i] === Infinity) {
      return false;
    }
  }

  return true;
}

let answer = 0;

for (let i = 1; i < N + 1; i++) {
  if (isKnowable(i)) answer += 1;
}

console.log(answer);
