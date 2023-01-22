// DFS와 BFS
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, V] = input[0].split(" ").map(Number);

// 그래프 만들기
let graph = new Array(N + 1);
for (let i = 0; i < graph.length; i++) {
  graph[i] = [];
}
for (let i = 0; i < M; i++) {
  let [start, end] = input[i + 1].split(" ").map(Number);
  graph[start].push(end);
  graph[end].push(start);
}
// 정점 번호가 작은 것을 먼저 방문 (문제 조건)
graph.forEach((el) => {
  el.sort((a, b) => a - b);
});
// console.log(graph);

// 방문 상태
let visited = new Array(N + 1).fill(0);
let answer_dfs = [];
// 깊이 우선 탐색
function dfs(v) {
  if (visited[v]) return;
  visited[v] = true;
  answer_dfs.push(v);
  for (let i = 0; i < graph[v].length; i++) {
    let next = graph[v][i];
    if (visited[next] === 0) dfs(next);
  }
}

dfs(V);
console.log(answer_dfs.join(" "));

let answer_bfs = [];
visited.fill(false);
// 너비 우선 탐색
function bfs(v) {
  let queue = [v];
  while (queue.length) {
    let x = queue.shift();
    if (visited[x]) continue;
    visited[x] = true;
    answer_bfs.push(x);
    for (let i = 0; i < graph[x].length; i++) {
      let next = graph[x][i];
      if (!visited[next]) queue.push(next);
    }
  }
}

bfs(V);
console.log(answer_bfs.join(" "));
