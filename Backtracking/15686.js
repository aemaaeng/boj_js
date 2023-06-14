// 치킨 배달
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map((el) => el.split(" ").map(Number));

const houses = [];
const chicken = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (city[i][j] === 1) houses.push([i, j]);
    if (city[i][j] === 2) chicken.push([i, j]);
  }
}

function chickenDistance() {
  let distance = 0;
  // 도시의 치킨 거리 합을 리턴하는 함수
  for (let i = 0; i < houses.length; i++) {
    let min = Infinity;
    for (let j = 0; j < chicken.length; j++) {
      if (!check[j]) continue;
      min = Math.min(
        min,
        Math.abs(houses[i][0] - chicken[j][0]) +
          Math.abs(houses[i][1] - chicken[j][1])
      );
    }
    distance += min;
  }

  return distance;
}

let min = Infinity;
const check = new Array(chicken.length).fill(false);

function backtracking(idx, cnt) {
  if (cnt === M) {
    if (chickenDistance() < min) min = chickenDistance();
  } else {
    for (let i = idx; i < chicken.length; i++) {
      if (check[i]) continue;
      check[i] = true;
      backtracking(i, cnt + 1);
      check[i] = false;
    }
  }
}

backtracking(0, 0);
console.log(min);
