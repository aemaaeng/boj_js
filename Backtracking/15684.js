// 사다리 조작
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, H] = input.shift().split(" ").map(Number);
const ladder = Array.from(new Array(H), () => new Array(N - 1).fill(false));

if (input.length > 0) {
  input
    .map((el) => el.split(" ").map(Number))
    .forEach((v) => {
      const [x, y] = v;
      ladder[x - 1][y - 1] = true;
    });
}

function canDraw(x, y) {
  if (ladder[x][y]) return false;
  // 선이 연속되면 안 됨
  if (y > 0 && ladder[x][y - 1]) return false;
  if (y < N - 2 && ladder[x][y + 1]) return false;
  return true;
}

function checkLadder() {
  // 사다리를 탔을 때 자기 자신에게 돌아오는지 확인하는 함수
  let success = true;
  for (let i = 0; i < N; i++) {
    let cur = i;
    let cnt = 0;
    while (cnt < H) {
      if (cur < N - 1 && ladder[cnt][cur]) {
        cur += 1;
      } else if (cur > 0 && ladder[cnt][cur - 1]) {
        cur -= 1;
      }
      cnt += 1;
    }
    if (cur !== i) {
      success = false;
      break;
    }
  }
  return success;
}

function backtracking(cnt, end, last) {
  if (cnt === end) {
    if (checkLadder()) return process.exit(console.log(end));
  } else {
    for (let i = last; i < H * N; i++) {
      const x = Math.floor(i / N);
      const y = i % N;
      if (canDraw(x, y)) {
        ladder[x][y] = true;
        backtracking(cnt + 1, end, i + 2);
        ladder[x][y] = false;
      }
    }
  }
}

// 3번까지만 돌고 backtracking 함수에서 종료되지 않으면 불가능하다는 뜻
// -1을 출력한다
function main() {
  for (let i = 0; i <= 3; i++) {
    backtracking(0, i, 0);
  }
  return console.log(-1);
}

main();
