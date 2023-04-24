// 블랙잭 - 백트래킹 풀이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let tmp = 0;
let answer = 0;
const visited = new Array(N).fill(false);

function backtracking(cnt) {
  if (cnt === 3) {
    if (answer < tmp && tmp <= M) {
      answer = tmp;
    }
    cnt = 0;
  } else {
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      tmp += arr[i];
      backtracking(cnt + 1);
      tmp -= arr[i];
      visited[i] = false;
    }
  }
}

backtracking(0);
console.log(answer);
