// 문자 코드를 모르는 경우 for Node.js
var fs = require('fs');
var Iconv = require('iconv').Iconv;
var jschardet = require('jschardet');

// 문자 코드를 모르는 파일 읽기
var buf = fs.readFileSync('sample-unknown.txt');

// 문자 코드 판정 수행
var det = jschardet.detect(buf);
console.log(det);

// Iconv 로 utf-8 로 변환하는 객체 생성
var iconv = new Iconv(det.encoding, "utf-8");
var buf2 = iconv.convert(buf); // UTF-8 로 변환
var txt = buf2.toString('utf-8'); // 버퍼를 문자열로 변환 
console.log(txt);