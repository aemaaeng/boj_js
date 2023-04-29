// 사다리 조작
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, H] = input.shift().split(" ").map(Number);
const ladderInfo = Array.from(new Array(H), () => new Array(N - 1).fill(false));

// 선 연결 정보가 있을 때에만 input 정제
if (input.length > 0) {
  input
    .map((el) => el.split(" ").map(Number))
    .forEach((v) => {
      const [x, y] = v;
      ladderInfo[x - 1][y - 1] = true;
    });
}

// 사다리를 타면서 모든 사다리가 자기 자신에게 향하는지 확인하는 함수
function checkLadder() {
  let success = true;
  for (let i = 0; i < N; i++) {
    // 현재 위치
    let cur = i;
    let cnt = 0; // 세로선의 개수만큼 탐색
    while (cnt < H) {
      if (cur < N - 1 && ladderInfo[cnt][cur]) {
        cur += 1;
      } else if (cur > 0 && ladderInfo[cnt][cur - 1]) {
        cur -= 1;
      }
      cnt += 1;
    }
    if (cur !== i) {
      success = false;
      break;
    }
  }
  return success ? true : false;
}

// 가로선을 그을 수 있는지 판별하는 함수 (두 가로선이 연속하면 안 된다)
function canDraw(x, y) {
  // 인접한 곳에 이미 가로선이 그어져있다면 X
  // ladderInfo 배열을 확인해야 함
  if (ladderInfo[x][y]) return false;
  if (y > 0 && ladderInfo[x][y - 1]) return false;
  if (y < N - 2 && ladderInfo[x][y + 1]) return false;
  return true;
}

// 가로선을 그려보는 백트래킹
function backtracking(cnt, end, last) {
  if (cnt === end) {
    // 사다리를 확인하고 자기 자신에게 향하면 함수를 완전히 종료한다.
    // 최솟값을 출력해야 하므로 더 볼 이유가 없음.
    if (checkLadder()) {
      return process.exit(console.log(end));
    }
  } else {
    // for문을 돌며 마지막 지점에서 백트래킹
    for (let i = last; i < H * N; i++) {
      const x = Math.floor(i / N);
      const y = i % N;
      // 가로선을 그릴 수 있는 위치인지 확인하고
      // 그려보고 나서 백트래킹하고
      // 선을 다시 지운다
      if (canDraw(x, y)) {
        ladderInfo[x][y] = true;
        backtracking(cnt + 1, end, i + 2);
        ladderInfo[x][y] = false;
      }
    }
  }
}

// 추가해야 하는 가로선의 최솟값을 출력해야 한다.
// 정답이 3보다 크거나 불가능한 경우에는 -1을 출력한다.
function main() {
  for (let i = 0; i <= 3; i++) {
    backtracking(0, i, 0);
  }
  return console.log(-1);
}

main();
