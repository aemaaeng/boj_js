// 바이러스 - dfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [count, edges] = input.map(Number);

// 그래프 만들자
let graph = new Array(count + 1);
for (let i = 0; i < graph.length; i++) {
  graph[i] = [];
}
for (let i = 0; i < edges; i++) {
  let [start, end] = input[i + 2].split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
}

// 탐색
let visited = new Array(count + 1).fill(false);
let answer = [];
function dfs(v) {
  if (visited[v]) return;
  visited[v] = true;
  answer.push(v);
  for (let i = 0; i < graph[v].length; i++) {
    let next = graph[v][i];
    if (!visited[next]) dfs(next);
  }
}
dfs(1);

// 1번 컴퓨터는 제외
console.log(answer.length - 1);
