// 줄 세우기 - 위상정렬
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
input = input.map((el) => el.split(" ").map(Number));

function topologicalSort(graph) {
  const inDegree = new Array(graph.length).fill(0);
  const result = [];
  const queue = [];

  for (const edges of graph) {
    for (const neighbor of edges) {
      inDegree[neighbor] += 1;
    }
  }

  for (let i = 1; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift();
    result.push(cur);

    for (const neighbor of graph[cur]) {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

const graph = Array.from(new Array(N + 1), () => new Array());

for (const [from, to] of input) {
  graph[from].push(to);
}

console.log(topologicalSort(graph).join(" "));
