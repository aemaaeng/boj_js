// 최소 힙
class MinHeap {
  constructor() {
    this.heap = [null];
  }
  getMin() {
    return this.heap[1] ? this.heap[1] : null;
  }
  size() {
    return this.heap.length - 1;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;
    let parIdx = Math.floor(curIdx / 2);

    while (curIdx > 1 && this.heap[parIdx].w > this.heap[curIdx].w) {
      this.swap(curIdx, parIdx);
      curIdx = parIdx;
      parIdx = Math.floor(curIdx / 2);
    }
  }
  pop() {
    const min = this.heap[1];
    if (this.heap.length <= 2) {
      this.heap = [null];
    } else {
      this.heap[1] = this.heap.pop();
    }

    let curIdx = 1;
    let leftIdx = curIdx * 2;
    let rightIdx = curIdx * 2 + 1;

    if (!this.heap[leftIdx]) return min;
    if (!this.heap[rightIdx]) {
      if (this.heap[leftIdx].w < this.heap[curIdx].w) {
        this.swap(leftIdx, curIdx);
      }
      return min;
    }

    while (
      leftIdx < this.size() &&
      (this.heap[leftIdx].w < this.heap[curIdx].w ||
        this.heap[rightIdx].w < this.heap[curIdx].w)
    ) {
      const minIdx =
        this.heap[leftIdx].w > this.heap[rightIdx].w ? rightIdx : leftIdx;
      this.swap(minIdx, curIdx);
      curIdx = minIdx;
      leftIdx = curIdx * 2;
      rightIdx = curIdx * 2 + 1;
    }

    return min;
  }
}

function dijkstra(start) {
  dist[start] = 0;
  visited[start] = true;

  const minHeap = new MinHeap();
  minHeap.push({
    vertex: start,
    w: 0,
  });

  while (minHeap.size() > 0) {
    const { vertex, w } = minHeap.pop();
    visited[vertex] = true;

    for (let i = 0; i < graph[vertex].length; i++) {
      const cur = graph[vertex][i];
      const next = cur[0];
      const nextWeight = cur[1];

      if (visited[next]) continue;

      if (dist[next] > dist[vertex] + nextWeight) {
        dist[next] = dist[vertex] + nextWeight;

        minHeap.push({ vertex: next, w: dist[next] });
      }
    }
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const graph = Array.from({ length: V + 1 }, () => []);
let dist = new Array(V + 1).fill(Infinity);
const visited = new Array(V + 1).fill(false);
const startNode = Number(input[1]);

const answer = [];

for (let info of input.slice(2)) {
  const [u, v, w] = info.split(" ").map(Number);
  graph[u].push([v, w]);
}

dijkstra(startNode);

for (let i = 1; i <= V; i++) {
  dist[i] === Infinity ? answer.push("INF") : answer.push(dist[i]);
}

console.log(answer.join("\n"));
