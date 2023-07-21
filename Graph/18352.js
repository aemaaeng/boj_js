// 특정 거리의 도시 찾기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 도시의 개수 N, 도로의 개수 M, 거리 정보 K, 출발 도시의 번호 X
const [N, M, K, X] = input.shift().split(" ").map(Number);
const road = input.map((el) => el.split(" ").map(Number));

// N + 1만큼의 배열을 만든다
const graph = Array.from(new Array(N + 1), () => new Array());

road.forEach((el) => {
  const [x, y] = el;
  graph[x].push(y);
});

const distance = new Array(N + 1).fill(-1);
let answer = [];

function bfs(v) {
  const queue = [v];
  distance[v] = 0;

  while (queue.length) {
    const cur = queue.shift();
    if (distance[cur] === K) {
      answer.push(cur);
      continue;
    }
    for (const next of graph[cur]) {
      if (distance[next] === -1) {
        distance[next] = distance[cur] + 1;
        queue.push(next);
      }
    }
  }
}

bfs(X);

if (answer.length === 0) {
  answer = -1;
} else {
  answer = answer.sort((a, b) => a - b).join("\n");
}

console.log(answer);
