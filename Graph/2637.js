// 장난감 조립 - 위상정렬
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());

input = input.map((el) => el.split(" ").map(Number));

const graph = Array.from(new Array(N + 1), () => new Array());

for ([X, Y, K] of input) {
  graph[Y].push([X, K]);
}

const inDegree = new Array(N + 1).fill(0);

for (let i = 1; i <= N; i++) {
  for (let j = 0; j < graph[i].length; j++) {
    const [to, cnt] = graph[i][j];
    inDegree[to] += 1;
  }
}

const basics = [];

for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) basics.push(i);
}

function countElement(arr, target) {
  let cnt = 0;
  for (const el of arr) {
    if (el === target) cnt += 1;
  }
  return cnt;
}

function topologicalSort(graph) {
  const result = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));
  const queue = [];

  for (let i = 1; i < graph.length; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  while (queue.length > 0) {
    const cur = queue.shift();

    for (const neighbor of graph[cur]) {
      const [next, cnt] = neighbor;
      if (countElement(result[cur], 0) === N + 1) {
        result[next][cur] += cnt;
      } else {
        for (let i = 1; i < N + 1; i++) {
          result[next][i] += result[cur][i] * cnt;
        }
      }
      inDegree[next] -= 1;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result;
}

const result = topologicalSort(graph);

for (let comp of basics) {
  console.log(comp, result[N][comp]);
}
