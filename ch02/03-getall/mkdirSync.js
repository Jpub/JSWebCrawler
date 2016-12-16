// 모듈 로드
var fs = require('fs');

// 폴더를 동기적으로 생성
console.log("mkdir 실행");
fs.mkdirSync("test-sync");
console.log("mkdir 완료");