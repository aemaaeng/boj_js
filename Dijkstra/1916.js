// 최소비용 구하기
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(element) {
    this.heap.push(element);
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

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    // 맨 나중에 들어온 원소를 끌어올려준다
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].weight <= this.heap[index].weight) break;
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
        this.heap[leftChildIndex].weight < this.heap[index].weight
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].weight < this.heap[index].weight
      ) {
        smallest = rightChildIndex;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());
const info = input
  .slice(0, input.length - 1)
  .map((el) => el.split(" ").map(Number));

const [dep, dest] = input[input.length - 1].split(" ");
const graph = Array.from(new Array(N + 1), () => new Array());
const dist = new Array(N + 1).fill(Infinity);

for (const [from, to, cost] of info) {
  graph[from].push([to, cost]);
}

function dijkstra(start, end) {
  dist[start] = 0;

  const minHeap = new MinHeap();
  minHeap.push({
    node: start,
    weight: 0,
  });

  while (minHeap.heap.length > 0) {
    const { node, weight } = minHeap.pop();

    if (node === end) return;
    if (weight > dist[node]) continue;

    for (let i = 0; i < graph[node].length; i++) {
      const [next, nextWeight] = graph[node][i];

      if (dist[next] > dist[node] + nextWeight) {
        dist[next] = dist[node] + nextWeight;

        minHeap.push({ node: next, weight: dist[next] });
      }
    }
  }
}

dijkstra(dep, dest);
console.log(dist[dest]);
