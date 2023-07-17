// 뱀
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
// 사과를 먹으면 뱀의 길이가 늘어난다.
// 뱀의 처음 길이는 1
// 처음으로 향하는 방향은 오른쪽
// 뱀이 벽이나 자기 자신의 몸과 부딪치게 되면 게임이 끝난다.

// 1. 몸 길이를 늘려 머리를 다음 칸에 위치시킨다.
// 2. 이동한 칸에 사과가 있다면 사과가 없어지고 꼬리는 움직이지 않는다.
// 3. 이동한 칸에 사과가 없다면 몸길이를 줄여서 꼬리가 위치한 칸을 비워준다 (몸 길이는 변하지 않는다)

// 사과의 위치와 뱀의 이동 경로가 주어질 때 게임이 몇 초에 끝나는지 계산하기

const N = +input[0];
const K = +input[1];
const appleCoords = input
  .slice(2, 2 + K)
  .map((el) => el.split(" ").map(Number));

const L = +input[2 + K];
const directions = input.slice(3 + K).map((el) => {
  el = el.split(" ");
  el[0] = +el[0];
  return el;
});

// D이면 오른쪽으로 90도 회전을 의미
// L이면 왼쪽으로 90도 회전을 의미
// [3, 'D'] => 뱀이 3초에 오른쪽으로 90도를 회전한다.

const board = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

appleCoords.forEach((el) => {
  const [x, y] = el;
  board[x][y] = 1;
});

// 방향 정보의 좌표를 담아두기
// 동 남 서 북
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function turn(direction, info) {
  // directions 배열의 정보가 주어졌을 때
  // dx, dy에서 취해야 할 인덱스를 리턴하는 함수
  if (info === "L") {
    // 왼쪽 회전
    // info로 0이 들어오면 나눠지는 수가 음수가 되기 때문에 4를 더해 양수로 유지한다
    direction = (direction - 1 + 4) % 4;
  } else {
    // 오른쪽 회전
    direction = (direction + 1) % 4;
  }

  return direction;
}

function move() {
  let [x, y] = [1, 1]; // 뱀의 현재 위치
  board[x][y] = 2;
  let direction = 0;
  let sec = 0;
  let idx = 0; // 다음 회전 정보??

  const snake = [[x, y]]; // 뱀이 차지하고 있는 좌표
  while (true) {
    let nx = x + dx[direction];
    let ny = y + dy[direction];

    if (nx >= 1 && ny >= 1 && nx <= N && ny <= N && board[nx][ny] !== 2) {
      if (board[nx][ny] === 0) {
        // 사과가 없는 경우
        board[nx][ny] = 2;
        snake.push([nx, ny]);
        const [a, b] = snake.shift();
        board[a][b] = 0;
      }
      if (board[nx][ny] === 1) {
        // 사과가 있는 경우
        // 뱀의 길이 증가
        board[nx][ny] = 2;
        snake.push([nx, ny]);
      }
    } else {
      // 범위를 벗어나거나 몸통과 부딪치는 경우
      sec += 1;
      break;
    }
    x = nx;
    y = ny;
    sec += 1;
    if (idx < L && sec === directions[idx][0]) {
      // 함수 실행
      direction = turn(direction, directions[idx][1]);
      idx += 1;
    }
  }

  return sec;
}

console.log(move());
