// 사탕 게임
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const candies = input.slice(1);

// 먹을 수 있는 사탕의 최대 개수를 구하는 함수 만들기 (행, 열)
const getMaxCandiesRow = (arr) => {
  let max = 0;
  let cnt = 1;
  for (let i = 0; i < N; i++) {
    for (let j = 1; j < N; j++) {
      // console.log("가로", arr[i][j - 1], arr[i][j]);
      if (arr[i][j - 1] === arr[i][j]) {
        cnt += 1;
      } else {
        cnt = 1;
      }
      // console.log(`count: ${cnt}`);
      if (cnt > max) max = cnt;
    }
    cnt = 1;
  }
  return max;
};

const getMaxCandiesCol = (arr) => {
  let max = 0;
  let cnt = 1;
  for (let i = 0; i < N; i++) {
    for (let j = 1; j < N; j++) {
      // console.log("세로", arr[j - 1][i], arr[j][i]);
      if (arr[j - 1][i] === arr[j][i]) {
        cnt += 1;
      } else {
        cnt = 1;
      }
      // console.log(`count: ${cnt}`);
      if (cnt > max) max = cnt;
    }
    cnt = 1;
  }
  return max;
};

const eatCandies = [];

// 이중 반복문?
let tempArr = candies.map((el) => el.split(""));

// 가로 탐색
for (let i = 0; i < N; i++) {
  for (let j = 1; j < N; j++) {
    if (tempArr[i][j - 1] !== tempArr[i][j]) {
      // 둘이 바꾸기
      let temp = tempArr[i][j - 1];
      tempArr[i][j - 1] = tempArr[i][j];
      tempArr[i][j] = temp;
      // 개수 세기
      // console.log("tempRow: ", tempArr);
      eatCandies.push(getMaxCandiesRow(tempArr));
      eatCandies.push(getMaxCandiesCol(tempArr));
    }
    tempArr = candies.map((el) => el.split(""));
  }
}

// 세로 탐색
for (let i = 0; i < N; i++) {
  for (let j = 1; j < N; j++) {
    if (tempArr[j - 1][i] !== tempArr[j][i]) {
      // 둘이 바꾸기
      let temp = tempArr[j - 1][i];
      tempArr[j - 1][i] = tempArr[j][i];
      tempArr[j][i] = temp;
      // 개수 세기
      // console.log("tempCol: ", tempArr);
      eatCandies.push(getMaxCandiesRow(tempArr));
      eatCandies.push(getMaxCandiesCol(tempArr));
    }
    tempArr = candies.map((el) => el.split(""));
  }
}
console.log(Math.max(...eatCandies));
