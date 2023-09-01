// 도시 분할 계획
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
input = input.map((el) => el.split(" ").map(Number));

const graph = [];

for (const [a, b, weight] of input) {
  graph.push({ a, b, weight });
  graph.push({ a: b, b: a, weight });
}

graph.sort((a, b) => a.weight - b.weight);

function find_parent(parent, x) {
  if (parent[x] !== x) parent[x] = find_parent(parent, parent[x]);
  return parent[x];
}

function union_parents(parent, a, b) {
  const rootA = find_parent(parent, a);
  const rootB = find_parent(parent, b);
  if (rootA < rootB) parent[rootB] = rootA;
  else parent[rootA] = rootB;
}

const parent = new Array(N + 1).fill(0);
let answer = 0;

for (let i = 1; i < N + 1; i++) {
  parent[i] = i;
}

let max = 0;
for (const { a, b, weight } of graph) {
  if (find_parent(parent, a) !== find_parent(parent, b)) {
    union_parents(parent, a, b);
    max = Math.max(max, weight);
    answer += weight;
  }
}

answer -= max;
console.log(answer);
