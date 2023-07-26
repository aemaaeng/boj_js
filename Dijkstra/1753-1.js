// 최단경로 - 자료구조 직접 구현해보기
// minHeap
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(element) {
    this.heap.push(element); // 객체가 들어온다 {value, priority}
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
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) break;
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
        this.heap[leftChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].priority < this.heap[smallest].priority
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

// priorityQueue
class PriorityQueue {
  constructor() {
    this.minHeap = new MinHeap();
  }

  enqueue(value, priority) {
    const element = { value, priority };
    this.minHeap.push(element);
  }

  dequeue() {
    const element = this.minHeap.pop();
    return element ? element : null;
  }

  peek() {
    const element = this.minHeap.isEmpty() ? null : this.minHeap.heap[0];
    return element ? element : null;
  }

  isEmpty() {
    return this.minHeap.isEmpty();
  }
}

// Graph
class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(node) {
    this.nodes.set(node, []);
  }

  addEdge(src, dest, weight) {
    this.nodes.get(src).push({ node: dest, weight });
  }

  dijkstra(startNode) {
    const distances = new Map();
    const priorityQueue = new PriorityQueue();
    const visited = [];

    // initialize distances
    for (const node of this.nodes.keys()) {
      distances.set(node, node === startNode ? 0 : Infinity);
      visited.push(false);
    }

    priorityQueue.enqueue(startNode, 0);

    while (!priorityQueue.isEmpty()) {
      const { value: curNode, priority: curDistance } = priorityQueue.dequeue();

      if (visited[curNode]) continue;
      visited[curNode] = true;

      for (const { node, weight } of this.nodes.get(curNode)) {
        const distanceToNeighbor = curDistance + weight;
        if (distanceToNeighbor < distances.get(node)) {
          distances.set(node, distanceToNeighbor);
          priorityQueue.enqueue(node, distanceToNeighbor);
        }
      }
    }

    return distances;
  }
}

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);

// 방향 그래프임에 유의
const graph = new Graph();
const start = Number(input.shift());
input = input.map((el) => el.split(" ").map(Number));

for (let info of input) {
  const [start, target, weight] = info;
  if (!graph.nodes.get(start)) {
    graph.addNode(start);
  }
  if (!graph.nodes.get(target)) {
    graph.addNode(target);
  }
  graph.addEdge(start, target, weight);
}

const result = graph.dijkstra(start);
const answer = [];

for (let i = 1; i <= V; i++) {
  if (result.get(i) === Infinity || result.get(i) === undefined)
    answer.push("INF");
  else answer.push(result.get(i));
}

console.log(answer.join("\n"));
