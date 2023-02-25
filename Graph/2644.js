// 촌수계산
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift()); // 전체 사람 수
const graph = Array.from(new Array(N + 1), () => new Array());
const visited = new Array(N + 1).fill(false);
const [person1, person2] = input.shift().split(" ").map(Number);
const M = Number(input.shift());

// 그래프 만들기
for (let i = 0; i < M; i++) {
  let [x, y] = input.shift().split(" ").map(Number);
  graph[x].push(y);
  graph[y].push(x);
}

function bfs(x, y) {
  let queue = [x];
  let cnt = 0;
  while (queue.length !== 0) {
    cnt += 1;
    let len = queue.length; // queue의 length는 계속 변화하기 때문에 변수에 저장해둬야 함

    for (let i = 0; i < len; i++) {
      let temp = queue.shift();
      visited[temp] = true;

      for (let j of graph[temp]) {
        if (visited[j] === false) {
          if (j === y) {
            return cnt;
          }
          queue.push(j);
        }
      }
    }
  }

  return -1;
}

console.log(bfs(person1, person2));
