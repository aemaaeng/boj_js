// 종이의 개수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = Number(input[0]);
const paper = input.slice(1).map((el) => el.split(" ").map(Number));

const answer = new Map();
answer.set(-1, 0);
answer.set(0, 0);
answer.set(1, 0);

// 9개로 나누는 함수 만들기
// 그 면적이 전부 같은 수인지 판단하고, 같으면 카운트 세고 아니라면 재귀함수 실행
function checkSame(arr, length) {
  const num = arr[0][0];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (num !== arr[i][j]) return false;
    }
  }

  return true;
}

// 재귀함수
function solution(arr) {
  // base case
  if (arr.length === 1) {
    answer.set(arr[0], answer.get(arr[0]) + 1);
  }

  // 3등분
  const splitCnt = Math.floor(arr.length / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const splitted = [];

      const y1 = splitCnt * i;
      const y2 = splitCnt * (i + 1);
      const x1 = splitCnt * j;
      const x2 = splitCnt * (j + 1);

      let col = 0;

      for (let y = y1; y < y2; y++) {
        splitted[col] = [];
        for (let x = x1; x < x2; x++) {
          splitted[col].push(arr[y][x]);
        }
        col += 1;
      }

      // 해당 면적의 수가 전부 같은지 확인
      if (checkSame(splitted, splitCnt)) {
        const val = splitted[0][0];
        answer.set(val, answer.get(val) + 1);
      } else {
        solution(splitted);
      }
    }
  }
}

// 처음에 주어진 종이가 전부 같은 수로 이뤄졌는지 확인
if (checkSame(paper, N)) {
  const val = paper[0][0];
  answer.set(val, answer.get(val) + 1);
} else {
  solution(paper);
}

// 정답 출력
for (let [key, value] of answer) {
  console.log(value);
}
