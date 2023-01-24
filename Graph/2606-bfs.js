// 바이러스 - bfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [count, edges] = input.map(Number);

let graph = new Array(count + 1);
for (let i = 0; i < graph.length; i++) {
  graph[i] = [];
}
for (let i = 0; i < edges; i++) {
  let [start, end] = input[i + 2].split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
}

let visited = new Array(count + 1).fill(false);
let answer = [];
// 너비 우선 탐색
function bfs(v) {
  let queue = [v];
  while (queue.length) {
    let x = queue.shift();
    if (visited[x]) continue;
    visited[x] = true;
    answer.push(x);
    for (let i = 0; i < graph[x].length; i++) {
      let next = graph[x][i];
      if (!visited[next]) queue.push(next);
    }
  }
}

bfs(1);
console.log(answer.length - 1);
