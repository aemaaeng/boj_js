// 멀티탭 스케줄링
// 참고: https://jaimemin.tistory.com/759
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// N = 플러그의 수, K = 전자기기의 사용 횟수
let [N, K] = input.shift().split(" ").map(Number);
input = input[0].split(" ").map(Number);

const powerBar = new Array(N).fill(false);
let result = 0;

// 해당 기기가 플러그에 꽂혀있는가
// 플러그에 빈 곳이 있는가
// 플러그에 빈 곳이 없는 경우 -> 하나를 뽑아야 한다(여기서 그리디)
for (let i = 0; i < K; i++) {
  let pluggedIn = false;

  // 해당 기기가 플러그에 꽂혀있는 경우
  for (let j = 0; j < N; j++) {
    if (powerBar[j] === input[i]) {
      pluggedIn = true;
      break;
    }
  }
  if (pluggedIn) continue;

  // 플러그에 빈 곳이 있는 경우
  for (let j = 0; j < N; j++) {
    if (!powerBar[j]) {
      powerBar[j] = input[i];
      pluggedIn = true;
      break;
    }
  }
  if (pluggedIn) continue;

  // 플러그에 빈 곳이 없는 경우 (그리디)
  // 플러그에서 가장 나중에 사용되거나 앞으로 사용되지 않을 기기를 찾아 그걸 뽑아낸다
  let idx = -1;
  let deviceIdx = -1;
  for (let j = 0; j < N; j++) {
    let lastIdx = 0;
    for (let k = i + 1; k < K; k++) {
      if (powerBar[j] === input[k]) break;
      lastIdx++;
    }
    if (lastIdx > deviceIdx) {
      idx = j;
      deviceIdx = lastIdx;
    }
  }
  result += 1;
  powerBar[idx] = input[i];
}

console.log(result);
