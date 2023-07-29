// 플로이드
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const M = Number(input.shift());

input = input.map((el) => el.split(" ").map(Number));

const dist = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => Infinity)
);

input.forEach(
  (bus) => (dist[bus[0]][bus[1]] = Math.min(bus[2], dist[bus[0]][bus[1]]))
);

for (let k = 1; k < N + 1; k++) {
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (dist[i][k] + dist[k][j] < dist[i][j] && i !== j) {
        dist[i][j] = dist[i][k] + dist[k][j];
      }
    }
  }
}

for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < N + 1; j++) {
    if (dist[i][j] === Infinity) dist[i][j] = 0;
  }
}

dist.slice(1).map((t) => {
  console.log(t.slice(1).join(" "));
});
