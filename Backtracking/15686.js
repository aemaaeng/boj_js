// 치킨 배달
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map((el) => el.split(" ").map(Number));

// 집의 위치와 치킨집의 위치 저장
const houses = [];
const chicken = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (city[i][j] === 1) houses.push([i, j]);
    if (city[i][j] === 2) chicken.push([i, j]);
  }
}

let min = Infinity;
const check = new Array(chicken.length).fill(false);

// 도시의 치킨 거리를 구하는 함수
function chickenDistance() {
  let distance = 0;
  // 집에서 각 치킨집까지의 거리를 전부 구함
  for (let i = 0; i < houses.length; i++) {
    let min = Infinity;
    for (let j = 0; j < chicken.length; j++) {
      // 한 집 당 치킨집까지의 거리
      // 그 치킨집은 check에서 true여야 한다
      if (check[j]) {
        min = Math.min(
          min,
          Math.abs(houses[i][0] - chicken[j][0]) +
            Math.abs(houses[i][1] - chicken[j][1])
        );
      }
    }
    distance += min;
  }
  // 도시의 치킨 거리 리턴
  return distance;
}

// 백트래킹을 수행하는 함수
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
// 최종 답안 출력
console.log(min);
