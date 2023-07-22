// 감시 피하기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 도시의 개수 N, 도로의 개수 M, 거리 정보 K, 출발 도시의 번호 X
const N = Number(input.shift());
const hallway = input.map((el) => el.split(" "));

// cnt를 3으로 하는 백트래킹 함수를 만든다
// 장애물을 세워본다
// 가려지는지 판단한다

// 가려지는지 판단하는 함수는?
// 선생님의 좌표를 저장한다
// 선생님의 수평/수직에 맞게 장애물이 설치가 되면 보이지 않게 된다
// 선생님은 움직이지 않는다
const teachers = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (hallway[i][j] === "T") teachers.push([i, j]);
  }
}

function isHidingWell(arr) {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const queue = teachers.slice();
  while (queue.length) {
    const coords = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = coords[0] + dx[i];
      let ny = coords[1] + dy[i];

      while (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        if (hallway[nx][ny] === "O") break;
        if (hallway[nx][ny] === "S") return false;
        nx += dx[i];
        ny += dy[i];
      }
    }
  }

  return true;
}

let isTrue = false;

function backtracking(cnt) {
  if (isTrue) return;
  if (cnt === 3) {
    if (isHidingWell(hallway)) {
      isTrue = true;
    }
    return;
  }
  // 백트래킹 수행
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (hallway[i][j] === "X") {
        hallway[i][j] = "O";
        backtracking(cnt + 1);
        hallway[i][j] = "X";
      }
    }
  }
}

backtracking(0);
console.log(isTrue ? "YES" : "NO");
