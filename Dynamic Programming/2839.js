// 설탕 배달
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim();

let N = Number(input);

// 3킬로그램 봉지와 5킬로그램 봉지
// 최소한의 봉지를 가져가고 싶음
let cnt = 0;

while (N >= 0) {
  // 5로 나누어떨어지는 경우
  if (N % 5 === 0) {
    cnt += N / 5;
    console.log(cnt);
    break;
  }
  // 아니라면 3키로 짜리를 하나 든다
  N -= 3;
  cnt += 1;
}

// N이 음수이다 => while 반복문이 아무것도 리턴하지 않은 채로 종료되었다
// N킬로그램을 만들 수 없다는 뜻이므로 -1 출력
if (N < 0) {
  console.log(-1);
}

// 5로 나누어떨어지는 경우
// - cnt에 N을 5로 나눈 몫을 더한다 (어차피 그만큼 돌아야되니까 그냥 더해버리기)
// 아니면 3을 빼고 cnt에 1 더함
// 0과 같아질 때까지 3을 뺐는데도 5로 나누어떨어지지 않는다면
// 불가능한 수이므로 else로 분기해서 -1을 리턴한다.
