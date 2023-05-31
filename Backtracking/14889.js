// 스타트와 링크
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((el) => el.split(" ").map(Number));

let min = Infinity;
const visited = new Array(N).fill(false);

function diff(arr1, arr2) {
  // 능력치 차이를 리턴하는 함수
  let startSum = 0;
  let linkSum = 0;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = i + 1; j < arr1.length; j++) {
      startSum += arr[arr1[i]][arr1[j]] + arr[arr1[j]][arr1[i]];
      linkSum += arr[arr2[i]][arr2[j]] + arr[arr2[j]][arr2[i]];
    }
  }
  return Math.abs(startSum - linkSum);
}

function backtracking(cnt, v) {
  if (cnt === N / 2) {
    // 각 배열에 넣고 비교 수행
    const start = [];
    const link = [];
    for (let i = 0; i < N; i++) {
      visited[i] ? start.push(i) : link.push(i);
    }
    if (diff(start, link) < min) min = diff(start, link);
    cnt = 0;
    return;
  }

  for (let i = v; i < N; i++) {
    // 방문처리
    visited[i] = true;
    backtracking(cnt + 1, i + 1);
    visited[i] = false;
  }
}

backtracking(0, 0);
console.log(min);
