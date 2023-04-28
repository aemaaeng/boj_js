// 연산자 끼워넣기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
// 연산자
const operator = input[2].split(" ").map(Number);

// 계산을 수행해주는 obj
const calcObj = {
  0: (num1, num2) => num1 + num2,
  1: (num1, num2) => num1 - num2,
  2: (num1, num2) => num1 * num2,
  3: (num1, num2) => {
    return num1 < 0 ? -Math.floor(-num1 / num2) : Math.floor(num1 / num2);
  },
};

let min = Infinity;
let max = Number.MIN_SAFE_INTEGER; // 최댓값이 음수일 수도 있음
const temp = []; // 연산자의 인덱스가 들어가는 배열

// 종료 조건: cnt가 N - 1과 같아질 때
function backtracking(cnt) {
  if (cnt === N - 1) {
    // temp 배열에서 반복문을 돌며 계산 수행
    // 결과에 따라 max, min update
    // return
    let num1 = A[0];
    for (let i = 0; i < temp.length; i++) {
      let idx = temp[i];
      num1 = calcObj[idx](num1, A[i + 1]);
    }
    // 값 update는 for loop 바깥에서
    if (num1 < min) min = num1;
    if (max < num1) max = num1;
  }

  for (let i = 0; i < 4; i++) {
    if (!operator[i]) continue;
    operator[i] -= 1;
    temp.push(i);
    backtracking(cnt + 1);
    operator[i] += 1;
    temp.pop();
  }
}

backtracking(0);

console.log(`${max}\n${min}`);

// 아래처럼 하면 1퍼센트에서 바로 오답처리가 된다. 최댓값과 최솟값을 템플릿 문자열을 이용해 한 줄로 출력해야 한다..
// console.log(max);
// console.log(min);
