// 개똥벌레
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, H] = input.shift().split(" ").map(Number);
const bottom = new Array(H + 1).fill(0);
const top = new Array(H + 1).fill(0);

input.forEach((el, idx) => {
  idx % 2 === 0 ? (bottom[Number(el)] += 1) : (top[H - Number(el) + 1] += 1);
});

for (let i = 1; i <= H; i++) {
  top[i] += top[i - 1];
  bottom[H - i] += bottom[H - i + 1];
}

let cnt = 0;
let min = Infinity;

for (let i = 1; i <= H; i++) {
  if (top[i] + bottom[i] < min) {
    min = top[i] + bottom[i];
    cnt = 1;
  } else if (top[i] + bottom[i] === min) {
    cnt += 1;
  }
}

console.log(min, cnt);

// 참고: https://koguri.tistory.com/111 , https://hyeo-noo.tistory.com/310
// 각 높이가 등장한 횟수를 top, bottom 배열에 저장한다
// top, bottom 배열에서 누적합을 구한다
// 두 누적합 배열의 값을 각각 합하게 되면 개똥벌레가 해당 높이에서 직선으로 날았을 때 만나는 장애물의 수가 구해진다.
// (인덱스 1부터) 두 배열의 각 인덱스끼리 합한 값을 비교해보고 최솟값이 갱신될 때마다 cnt를 초기화하는 방식으로 답을 구할 수 있다.
