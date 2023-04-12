// 큐 2
// 반례까지 맞았지만 백준 채점 플랫폼에서 메모리 초과가 뜨고 있다 -> 원인 찾기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 연산 당 시간 복잡도가 O(1)이어야 함. -> 배열 이용 X
// 연결리스트로 구현한 큐
class Queue {
  // 생성자 함수
  constructor() {
    // 필요한 것: 저장소, 앞 포인터, 뒤 포인터
    (this.storage = {}), (this.front = 0), (this.back = 0);
  }

  // 메소드: push, pop, size, empty
  size() {
    return Object.keys(this.storage).length;
  }

  push(value) {
    this.storage[this.back] = value;
    this.back += 1;
  }

  pop() {
    // 사이즈가 0일 때에는 pop 수행하지 않도록
    if (this.size() === 0) {
      return -1;
    }

    let result = this.storage[this.front];
    delete this.storage[this.front];
    this.front += 1;
    return result;
  }

  empty() {
    return this.size() === 0 ? 1 : 0;
  }
}

// input에 들어온 명령별로 분기
const N = Number(input[0]);
const commands = input.slice(1).map((el) => el.split(" "));
let q = new Queue();

function useQueue(command) {
  // front, back, size, pop, empty 중 하나
  switch (command) {
    case "size":
      return q.size();
    case "empty":
      return q.empty();
    case "pop":
      return q.pop();
    case "front":
      return q.size() === 0 ? -1 : q.storage[q.front];
    case "back":
      return q.size() === 0 ? -1 : q.storage[q.back - 1];
    default:
      break;
  }
}

for (let command of commands) {
  command.length === 1
    ? console.log(useQueue(command[0]))
    : q.push(Number(command[1]));
}
