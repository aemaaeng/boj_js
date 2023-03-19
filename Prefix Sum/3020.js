const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, H] = input.shift().split(" ").map(Number);
const bottom = new Array(H + 1).fill(0);
const top = new Array(H + 1).fill(0);

input.forEach((el, idx) => {
  idx % 2 === 0 ? bottom[Number(el)]++ : top[H - Number(el) + 1]++;
});

for (let i = 1; i <= H; i++) {
  top[i] += top[i - 1];
  bottom[H - i] += bottom[H - i + 1];
}

let min = Infinity;
let cnt = 0;
for (let i = 1; i <= H; i++) {
  if (top[i] + bottom[i] < min) {
    cnt = 1;
    min = top[i] + bottom[i];
  } else if (top[i] + bottom[i] === min) {
    cnt++;
  }
}

console.log(min, cnt);
