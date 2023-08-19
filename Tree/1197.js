// 최소 스패닝 트리
// 크루스칼 알고리즘 - https://chanhuiseok.github.io/posts/algo-33/
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
    // x와 y 집합을 합친다
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

const [V, E] = input.shift().split(" ").map(Number);
const graph = [];
input = input.map((el) => el.split(" ").map(Number));

for (const [from, to, weight] of input) {
  graph.push({ from, to, weight });
  graph.push({ from: to, to: from, weight });
}

// 그래프 간선을 가중치 오름차순 정렬
graph.sort((a, b) => a.weight - b.weight);

// 크루스칼 알고리즘
function kruskal(graph) {
  const numNodes = V;
  const mst = [];
  const unionFind = new UnionFind(numNodes + 1);

  for (const edge of graph) {
    if (unionFind.union(edge.from, edge.to)) {
      mst.push(edge);
      if (mst.length === numNodes - 1) break;
    }
  }

  return mst;
}

const mst = kruskal(graph);

let answer = 0;
mst.forEach((edge) => (answer += edge.weight));
console.log(answer);
