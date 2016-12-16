// 모듈 로드
var fs = require('fs');

// 폴더 생성
console.log("mkdir 실행 ");

fs.mkdir("test", function () {
    console.log("폴더 생성 완료");
});

console.log("mkdir 실행완료. 결과대기");
