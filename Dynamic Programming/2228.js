// 구간 나누기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
input = input.map(Number);

const D = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));
const visited = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0));

function sum(num, area) {
  if (area === 0) return 0;
  if (num < 2 * area - 1) return Number.MIN_SAFE_INTEGER;
  if (visited[num][area]) return D[num][area];

  visited[num][area] = true;
  D[num][area] = sum(num - 1, area);

  for (let i = num; i >= 1; i--) {
    D[num][area] = Math.max(
      D[num][area],
      P[num] - P[i - 1] + sum(i - 2, area - 1)
    );
  }

  return D[num][area];
}

const P = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  P[i] = P[i - 1] + input[i - 1];
}

console.log(sum(N, M));
