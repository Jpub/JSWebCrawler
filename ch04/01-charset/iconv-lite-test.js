// iconv-lite 예제 for Node.js
var iconv = require('iconv-lite');
var fs = require('fs');

// 텍스트를 EUC-KR로 작성
var str = " 안녕한다";
var fname = "iconv-lite-test-sjis.txt";

// EUC-KR로 변환
var buf = iconv.encode(str, "euc-kr");

// 저장
fs.writeFileSync(fname, buf, "binary");

// EUC-KR의 텍스트를 읽어서 표시 
var bin = fs.readFileSync(fname, "binary");

// EUC-KR의 바이너리를 UTF-8로 변환
var txt = iconv.decode(bin, "euc-kr");
console.log(txt);
