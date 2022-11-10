// 통계학
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

let nums = input.slice(1).sort((a, b) => a - b);
let result = [];

// 산술평균
result.push(Math.round(nums.reduce((acc, cur) => acc + cur, 0) / input[0]));

// 중앙값
// 길이는 무조건 홀수로 들어온다고 명시되어 있음
result.push(nums[Math.floor(input[0] / 2)]);

// 최빈값
let counter = {};

for (let i = 0; i < nums.length; i++) {
  if (counter[nums[i]] === undefined) {
    counter[nums[i]] = 0;
    counter[nums[i]] += 1;
  } else {
    counter[nums[i]] += 1;
  }
}

let values = Object.values(counter);
let keys = Object.keys(counter);

let uniqueMaxNum = Math.max(...values);
let maxNums = [];
keys.forEach((key) => {
  if (counter[key] === uniqueMaxNum) {
    maxNums.push(key);
  }
});

if (maxNums.length > 1) {
  // 최빈값 중 두 번째로 작은 값 출력
  maxNums.sort((a, b) => a - b);
  result.push(maxNums[1]);
} else {
  // 그냥 최빈값
  result.push(maxNums[0]);
}

// 범위
result.push(nums[nums.length - 1] - nums[0]);

// 결과 출력
console.log(result.join("\n"));

// 최빈값이 까다로웠음. key에서 forEach로 비교하는 걸 생각 못했다.
