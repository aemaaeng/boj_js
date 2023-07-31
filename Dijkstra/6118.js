class MinHeap {
  constructor() {
    this.heap = [];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.isEmpty()) return null;

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = lastNode;
      this.heapifyDown();
    }

    return root;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].dist <= this.heap[index].dist) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex].dist < this.heap[smallest].dist
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].dist < this.heap[smallest].dist
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];

      index = smallest;
    }
  }
}

// 숨바꼭질
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
input = input.map((el) => el.split(" ").map(Number));

const graph = Array.from(new Array(N + 1), () => new Array());

for (const [a, b] of input) {
  graph[a].push([b, 1]);
  graph[b].push([a, 1]);
}

function dijkstra(start) {
  const minHeap = new MinHeap();
  const distance = new Array(N + 1).fill(Infinity);

  distance[start] = 0;
  minHeap.push({ node: start, dist: 0 });

  while (!minHeap.isEmpty()) {
    const { node, dist } = minHeap.pop();

    if (distance[node] < dist) continue;

    for (const [nextNode, nextDist] of graph[node]) {
      let cost = dist + nextDist;
      if (cost < distance[nextNode]) {
        distance[nextNode] = cost;
        minHeap.push({ node: nextNode, dist: cost });
      }
    }
  }

  return distance;
}

const distance = dijkstra(1);

let maxIdx = 0;
let maxDistance = 0;
let cnt = 0;

for (let i = 1; i < N + 1; i++) {
  if (maxDistance < distance[i]) {
    maxDistance = distance[i];
    maxIdx = i;
    cnt = 0;
  }
  if (maxDistance === distance[i]) cnt += 1;
}

console.log(maxIdx, maxDistance, cnt);
