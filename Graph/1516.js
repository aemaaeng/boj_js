// 게임 개발 - 위상정렬
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));
input.unshift([]);

const inDegree = new Array(N + 1).fill(0);
const time = new Array(N + 1).fill(0);
const graph = Array.from(new Array(N + 1), () => new Array());

for (let i = 1; i < input.length; i++) {
  time[i] = input[i][0];
  for (let j = 1; j < input[i].length - 1; j++) {
    inDegree[i] += 1;
    graph[input[i][j]].push(i);
  }
}

const result = [...time];

function topological_sort() {
  const queue = [];
  for (let i = 1; i < inDegree.length; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  while (queue.length) {
    const cur = queue.shift();
    for (const neighbor of graph[cur]) {
      result[neighbor] = Math.max(
        result[neighbor],
        result[cur] + time[neighbor]
      );
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  for (let i = 1; i < result.length; i++) {
    console.log(result[i]);
  }
}

topological_sort();
