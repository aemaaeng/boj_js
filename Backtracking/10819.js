// 차이를 최대로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const M = input[1].split(" ").map(Number);

let max = 0;
let tmp = [];
let visited = new Array(N + 1).fill(0);

function dfs(cnt) {
  if (cnt === N) {
    if (max < sum(tmp)) max = sum(tmp);
  } else {
    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        visited[i] = 1;
        tmp.push(M[i]);
        dfs(cnt + 1);
        tmp.pop();
        visited[i] = 0;
      }
    }
  }
}

function sum(arr) {
  let sum = 0;
  for (let i = 0; i < N - 1; i++) {
    sum += Math.abs(arr[i] - arr[i + 1]);
  }
  return sum;
}

dfs(0);
console.log(max);
