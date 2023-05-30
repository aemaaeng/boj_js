// 블랙잭 - 백트래킹 풀이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

let max = 0;
const visited = new Array(N + 1).fill(false);
const picked = [];

function add(arr) {
  return arr.reduce((acc, cur) => acc + cur);
}

function backtracking(cnt) {
  if (cnt === 3) {
    if (max < add(picked) && add(picked) <= M) max = add(picked);
  } else {
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      picked.push(cards[i]);
      backtracking(cnt + 1);
      picked.pop(cards[i]);
      visited[i] = false;
    }
  }
}

backtracking(0);
console.log(max);
