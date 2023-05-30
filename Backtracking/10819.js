// 차이를 최대로
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input[1].split(" ").map(Number);

function add(arr) {
  let sum = 0;
  for (let i = 2; i <= arr.length; i++) {
    sum += Math.abs(arr[i - 2] - arr[i - 1]);
  }
  return sum;
}

let max = 0;
let temp = []; // 백트래킹의 결과를 담는 배열

const visited = new Array(N + 1).fill(false);

// N만큼 재귀를 돌았을 때 합 연산 결과가 max값보다 크면 update
function backtracking(cnt) {
  if (cnt === N) {
    if (max < add(temp)) max = add(temp);
  } else {
    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      temp.push(arr[i]);
      backtracking(cnt + 1);
      temp.pop(arr[i]);
      visited[i] = false;
    }
  }
}

backtracking(0);
console.log(max);
