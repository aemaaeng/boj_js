// 치킨 배달
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map((el) => el.split(" ").map(Number));
const house = [];
const chicken = [];

// 집과 치킨집의 좌표 저장
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (city[i][j] === 1) house.push([i, j]);
    if (city[i][j] === 2) chicken.push([i, j]);
  }
}

let answer = Infinity;
const check = new Array(chicken.length).fill(false);

// 도시의 치킨 거리를 세는 함수
function minDistance() {
  let sum = 0;
  // 집별로 각 치킨집과의 거리를 세서 그 최솟값을 sum에 더한다
  house.forEach(([hx, hy]) => {
    let min = Infinity;
    chicken.forEach((_, idx) => {
      if (check[idx] === true) {
        const [cx, cy] = chicken[idx];
        min = Math.min(min, Math.abs(hx - cx) + Math.abs(hy - cy));
      }
    });
    sum += min;
  });
  return sum;
}

// 백트래킹을 수행하는 함수
function backtracking(idx, cnt) {
  // 치킨집을 M개 폐업했을 때 = backtracking의 base case
  if (cnt === M) {
    // 각 집에서의 치킨 거리를 세보고
    // 가장 작으면 그걸 최솟값으로 update
    if (minDistance() < answer) answer = minDistance();
    return;
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
console.log(answer);
