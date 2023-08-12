// 톱니바퀴
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 4개의 톱니바퀴
// 시계방향과 반시계방향 회전 (함수 만들기)
// 회전시킬 톱니바퀴와 회전시킬 방향 결정 필요
// input[0] ~ input[3] -> 톱니바퀴 상태
let wheels = input.slice(0, 4).map((el) => el.split("").map(Number));
const K = Number(input[4]);
const rotateInfo = input.slice(5, 6 + K).map((el) => el.split(" ").map(Number));

// 서로에게 맞닿는 인덱스
// 1번 톱니바퀴: 2
// 2번 톱니바퀴: 2, 6
// 3번 톱니바퀴: 2, 6
// 4번 톱니바퀴: 6

// 어떤 톱니바퀴를 회전할 때 맞닿은 인덱스가 같으면 회전하지 않는다
// 다르다면 반대방향으로 회전한다

function change(direction, wheels, idx, status, check) {
  check[idx] = true;
  status[idx] = direction;

  if (idx - 1 >= 1) {
    if (!check[idx - 1] && wheels[idx - 1][2] !== wheels[idx][6]) {
      change(-direction, wheels, idx - 1, status, check);
    }
  }

  if (idx + 1 <= 4) {
    if (!check[idx + 1] && wheels[idx][2] !== wheels[idx + 1][6]) {
      change(-direction, wheels, idx + 1, status, check);
    }
  }
}

function rotate(wheels, wheelIdx, direction) {
  const check = new Array(5).fill(false);
  const status = new Array(5).fill(0);
  change(direction, wheels, wheelIdx, status, check);

  for (let i = 1; i <= 4; i++) {
    if (status[i] === 0) continue;
    if (status[i] === 1) {
      const popped = wheels[i].pop();
      wheels[i].unshift(popped);
    } else {
      const shifted = wheels[i].shift();
      wheels[i].push(shifted);
    }
  }
}

function calc(wheels) {
  let score = 0;
  for (let i = 1; i <= 4; i++) {
    // 1, 2, 4, 8 -> 2의 제곱
    score += wheels[i][0] === 1 ? 2 ** (i - 1) : 0;
  }
  return score;
}

// 0-indexed
wheels.unshift(null);

for (let i = 0; i < K; i++) {
  const [wheelIdx, direction] = rotateInfo[i];
  rotate(wheels, wheelIdx, direction);
}

console.log(calc(wheels));
