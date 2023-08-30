// 행성 터널
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));

function find_parent(parent, x) {
  if (parent[x] !== x) parent[x] = find_parent(parent, parent[x]);
  return parent[x];
}

function union_parent(parent, a, b) {
  const rootA = find_parent(parent, a);
  const rootB = find_parent(parent, b);
  if (rootA < rootB) parent[rootB] = rootA;
  else parent[rootA] = rootB;
}

const parent = new Array(N + 1).fill(0);
const edges = [];
let answer = 0;

for (let i = 1; i < N + 1; i++) {
  parent[i] = i;
}

const x = [];
const y = [];
const z = [];

for (let i = 0; i < N; i++) {
  x.push([input[i][0], i + 1]);
  y.push([input[i][1], i + 1]);
  z.push([input[i][2], i + 1]);
}

x.sort((a, b) => a[0] - b[0]);
y.sort((a, b) => a[0] - b[0]);
z.sort((a, b) => a[0] - b[0]);

for (let i = 0; i < N - 1; i++) {
  edges.push([x[i + 1][0] - x[i][0], x[i][1], x[i + 1][1]]);
  edges.push([y[i + 1][0] - y[i][0], y[i][1], y[i + 1][1]]);
  edges.push([z[i + 1][0] - z[i][0], z[i][1], z[i + 1][1]]);
}

edges.sort((a, b) => a[0] - b[0]);

for (const edge of edges) {
  const [cost, a, b] = edge;
  if (find_parent(parent, a) !== find_parent(parent, b)) {
    union_parent(parent, a, b);
    answer += cost;
  }
}

console.log(answer);
