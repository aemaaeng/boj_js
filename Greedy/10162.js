// 전자레인지
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = Number(fs.readFileSync(filePath).toString().trim());

function microwave(time) {
  // 단위를 전부 초(sec)로 변환
  let buttons = [300, 60, 10];
  let cnt = [0, 0, 0];

  for (let i = 0; i < buttons.length; i++) {
    cnt[i] += Math.floor(time / buttons[i]);
    time = time % buttons[i];
  }

  if (time === 0) {
    return cnt.join(" ");
  } else {
    return -1;
  }
}

console.log(microwave(input));

// 처음에는 counter 객체를 만들어서 Object.values를 리턴하려고 했는데 디버깅해보니 객체는 자동으로 오름차순 정렬됨.. 새로운 사실을 알았다.
// 답안 출력 방식을 잘 보자. 배열 자체를 리턴하는 것이 아님!
