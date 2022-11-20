const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 여기서는 그냥 배열로 써도 됨
// 비슷한 문제 18258번에서는 연결리스트로 구현해야 한다.

// input에 들어온 명령별로 분기
let commands = input.slice(1);
commands = commands.map((el) => el.split(" "));
let q = [];

// 함수로 만들기
function useQueue(commands) {
  if (commands.length === 1) {
    // front, back, size, pop, empty 중 하나
    const command = commands[0];
    if (command === "size") {
      return q.length;
    }
    if (command === "empty") {
      return q.length === 0 ? 1 : 0;
    }
    if (command === "pop") {
      return q.length === 0 ? -1 : q.shift();
    }
    if (command === "front") {
      if (q.length === 0) {
        return -1;
      } else {
        return q[0];
      }
    }
    if (command === "back") {
      if (q.length === 0) {
        return -1;
      } else {
        return q[q.length - 1];
      }
    }
  } else {
    // push 연산 수행
    let value = Number(commands[1]);
    q.push(value);
  }
}

let answer = [];
for (let i = 0; i < commands.length; i++) {
  answer.push(useQueue(commands[i]));
}

// undefined 지우기
answer = answer.filter((el) => el !== undefined);
console.log(answer.join("\n"));
