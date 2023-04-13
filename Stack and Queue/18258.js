// 큐 2
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const result = [];

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

// 연결리스트로 구현한 큐
class Queue {
  head = null;
  tail = null;
  length = 0;

  // storage 형태로 관리하는 게 아니라 node로 관리해야 메모리 초과가 안 나는 것 같음..!
  push(value) {
    const node = new Node(value);

    // edge case
    if (this.length++ === 0) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  pop() {
    if (this.length === 0) {
      result.push(-1);
      return;
    }

    const popped = this.head;
    this.head = popped.next;
    result.push(popped.data);
    if (--this.length === 0) this.tail = null;
  }

  size() {
    result.push(this.length);
  }

  empty() {
    result.push(this.length === 0 ? 1 : 0);
  }

  front() {
    result.push(this.head ? this.head.data : -1);
  }

  back() {
    result.push(this.tail ? this.tail.data : -1);
  }
}

const commands = input.slice(1).map((el) => el.split(" "));
const q = new Queue();

for (let command of commands) {
  const [key, val] = command;
  val ? q[key](val) : q[key]();
}

console.log(result.join("\n"));
