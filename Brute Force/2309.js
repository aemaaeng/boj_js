// 일곱 난쟁이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

input.sort((a, b) => a - b);
let dwarfs = [];
let sum = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    if (sum === 100) break;

    dwarfs = input.filter((el, idx) => {
      return idx !== i && idx !== j;
    });

    sum = dwarfs.reduce((acc, cur) => acc + cur);
  }
}

console.log(dwarfs.sort((a, b) => a - b).join("\n"));
