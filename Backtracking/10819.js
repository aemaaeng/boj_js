// 차이를 최대로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);

// 합 연산 수행 함수
function sum(arr) {
  let answer = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    answer += Math.abs(arr[i] - arr[i + 1]);
  }
  return answer;
}

const visited = new Array(N + 1).fill(false);
// 임시 배열을 하나 만들어서 거기에 백트래킹의 결과 배열을 담는다!
let tmp = [];
let max = 0;

function dfs(cnt) {
  if (N === cnt) {
    // base case
    if (max < sum(tmp)) max = sum(tmp);
  } else {
    // 백트래킹 -> 방문처리 후 dfs를 수행하고 방문처리 해제
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      tmp.push(arr[i]);
      dfs(cnt + 1);
      tmp.pop();
      visited[i] = false;
    }
  }
}

dfs(0);
console.log(max);
