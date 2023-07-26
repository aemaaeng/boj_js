// 카드 정렬하기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);
let N = input.shift();

input.sort((a, b) => a - b);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLength() {
    return this.heap.length;
  }

  push(node) {
    this.heap.push(node);
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
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx] <= this.heap[idx]) break;
      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  heapifyDown() {
    let idx = 0;
    const length = this.heap.length;

    while (true) {
      let smallest = idx;
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;

      if (
        leftChildIdx < length &&
        this.heap[leftChildIdx] < this.heap[smallest]
      ) {
        smallest = leftChildIdx;
      }

      if (
        rightChildIdx < length &&
        this.heap[rightChildIdx] < this.heap[smallest]
      ) {
        smallest = rightChildIdx;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];

      idx = smallest;
    }
  }
}

function solution(arr, n) {
  const heap = new MinHeap();

  for (let i = 0; i < N; i++) {
    heap.push(arr[i]);
  }

  let result = 0;

  while (heap.heap.length > 1) {
    const one = heap.pop();
    const two = heap.pop();

    const sumValue = one + two;
    result += sumValue;
    heap.push(sumValue);
  }

  return result;
}

console.log(solution(input, N));
