const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, H] = input.shift().split(" ").map(Number);

let ladder = Array.from(new Array(H), () => new Array(N - 1).fill(false));

if (input.length > 0) {
  input
    .map((el) => el.split(" ").map(Number))
    .forEach((v) => {
      const [x, y] = v;
      ladder[x - 1][y - 1] = true;
    });
}

function checkLadder() {
  let success = true;
  for (let i = 0; i < N; i++) {
    let now = i;
    let cnt = 0;
    while (cnt < H) {
      if (now < N - 1 && ladder[cnt][now]) {
        now = now + 1;
      } else if (now > 0 && ladder[cnt][now - 1]) {
        now = now - 1;
      }
      cnt = cnt + 1;
    }
    if (now !== i) {
      success = false;
      break;
    }
  }
  if (success) return true;
  return false;
}

// 사다리를 그릴 수 있는지 판별하는 함수
function canDraw(x, y) {
  if (ladder[x][y]) return false;
  if (y > 0 && ladder[x][y - 1]) return false;
  if (y < N - 2 && ladder[x][y + 1]) return false;
  return true;
}

// 가로줄을 그리는 백트래킹
function drawLine(cnt, end, last) {
  if (cnt === end) {
    if (checkLadder()) {
      return process.exit(console.log(end));
    }
  } else {
    for (let i = last; i < H * N; i++) {
      const x = Math.floor(i / N);
      const y = i % N;
      if (canDraw(x, y)) {
        ladder[x][y] = true;
        drawLine(cnt + 1, end, i + 2);
        ladder[x][y] = false;
      }
    }
  }
}

function main() {
  for (let i = 0; i <= 3; i++) {
    drawLine(0, i, 0);
  }
  return console.log(-1);
}

main();
