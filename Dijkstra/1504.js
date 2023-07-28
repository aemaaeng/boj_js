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
        this.heap[leftChildIndex].weight < this.heap[smallest].weight
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex].weight < this.heap[smallest].weight
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

// 특정한 최단 경로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, E] = input.shift().split(" ").map(Number);
const [u, v] = input.pop().split(" ").map(Number);
input = input.map((el) => el.split(" ").map(Number));

let res = Infinity;

// 그래프 만들기
const graph = Array.from(new Array(N + 1), () => new Array());

for (const [a, b, w] of input) {
  graph[a].push([b, w]);
  graph[b].push([a, w]);
}

function dijkstra(start) {
  const dist = new Array(N + 1).fill(Infinity);
  dist[start] = 0;
  // 중복 방문이 가능하므로 방문 체크는 따로 필요X

  // minHeap에 넣기
  const minHeap = new MinHeap();
  minHeap.push({
    node: start,
    weight: 0,
  });

  while (!minHeap.isEmpty()) {
    const { node, weight } = minHeap.pop();

    for (let i = 0; i < graph[node].length; i++) {
      const curNode = graph[node][i];
      const [nextNode, nextWeight] = curNode;

      if (dist[nextNode] > dist[node] + nextWeight) {
        dist[nextNode] = dist[node] + nextWeight;
        minHeap.push({ node: nextNode, weight: dist[nextNode] });
      }
    }
  }

  return dist;
}

const fromStart = dijkstra(1);
const toV1 = fromStart[u];
const toV2 = fromStart[v];

const fromV1 = dijkstra(u);
const v1ToV2 = fromV1[v];
const v1ToN = fromV1[N];

const fromV2 = dijkstra(v);
const V2ToN = fromV2[N];

// 두 개의 가능성이 있음
// start -> v1 -> v2 -> N
// start -> v2 -> v1 -> N
res = Math.min(res, toV1 + v1ToV2 + V2ToN);
res = Math.min(res, toV2 + v1ToV2 + v1ToN);

if (v1ToV2 === Infinity || res === Infinity) console.log(-1);
else console.log(res);
