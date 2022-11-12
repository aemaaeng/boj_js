// 알고리즘 수업 - 선택 정렬 1
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]);
const K = Number(input[0].split(" ")[1]);
let nums = input[1].split(" ").map(Number);
let cnt = 0;

function selection_sort(arr) {
  let temp;
  for (let i = N - 1; i > 0; i--) {
    let maxIdx = i;
    for (let j = i - 1; j > -1; j--) {
      if (arr[j] > arr[maxIdx]) {
        maxIdx = j;
      }
    }
    if (maxIdx !== i) {
      // temp 없이 ES6 구조분해할당으로도 가능
      temp = arr[i];
      arr[i] = arr[maxIdx];
      arr[maxIdx] = temp;
      cnt += 1;
    }
    if (cnt == K) {
      return `${arr[maxIdx]} ${arr[i]}`;
    }
  }
  return -1;
}

console.log(selection_sort(nums));

/*
문제에 주어진 pseudo code대로 코드를 안 짰더니 계속 틀렸었다.
*/
