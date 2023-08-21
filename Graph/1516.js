// 게임 개발
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));
input.unshift([]);

function topologicalSort(graph) {
  const result = time.slice();
  const queue = [];

  for (let i = 1; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift();

    for (const neighbor of graph[cur]) {
      result[neighbor] = Math.max(
        result[neighbor],
        result[cur] + time[neighbor]
      );
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

const graph = Array.from(new Array(N + 1), () => new Array());
const inDegree = new Array(graph.length).fill(0);
const time = new Array(N + 1).fill(0);

for (let i = 1; i < input.length; i++) {
  time[i] = input[i][0];
  for (let j = 1; j < input[i].length - 1; j++) {
    inDegree[i] += 1;
    graph[input[i][j]].push(i);
  }
}

let order = topologicalSort(graph);
order.shift();
console.log(order.join("\n"));
