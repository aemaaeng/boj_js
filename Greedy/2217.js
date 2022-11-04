// 로프
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

// 1, 2, 3, 4, 5
// 1, 1, 1, 1, 1
//    2, 2, 2, 2
//       3, 3, 3 -> 9
//          4, 4
//             5

// 10, 15
// 10, 10 -> 20
//     15

const ropes = input.slice(1);
// 오름차순 정렬
ropes.sort((a, b) => a - b);

let values = [];

for (let i = 0; i < ropes.length; i++) {
  values.push(ropes[i] * (ropes.length - i));
}

console.log(Math.max(...values));
