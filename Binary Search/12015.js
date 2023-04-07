// 가장 긴 증가하는 부분수열 2: 수의 범위가 더 커짐
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map((el) => Number(el));

const D = [A[0]];

function binary_search(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = parseInt((left + right) / 2);

    if (arr[middle] < target) {
      left = middle + 1;
    } else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      return middle;
    }
  }

  return left;
}

for (let item of A) {
  if (D[D.length - 1] < item) {
    D.push(item);
  } else {
    let idx = binary_search(D, item);
    D[idx] = item;
  }
}

console.log(D.length);
