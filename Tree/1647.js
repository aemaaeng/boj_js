// 도시 분할 계획
class UnionFind {
  constructor(size) {
    this.parent = new Array(size).fill(null).map((_, idx) => idx);
    this.rank = new Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

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

function kruskal(graph) {
  const numNodes = N;
  const mst = [];
  const unionFind = new UnionFind(numNodes + 1);

  for (const edge of graph) {
    if (unionFind.union(edge.a, edge.b)) {
      mst.push(edge);
      if (mst.length === numNodes - 1) break;
    }
  }

  return mst;
}

const mst = kruskal(graph);
mst.sort((a, b) => a.weight - b.weight);
mst.pop();
let sum = 0;
mst.forEach((el) => (sum += el.weight));
console.log(sum);
