// CSV 파일 읽기 for Node.js

var fs    = require('fs');
var CSV   = require('comma-separated-values');
var Iconv = require('iconv').Iconv;

// EUC-KR을 UTF-8으로 변환하는 객체 생성 --- (※1)
var iconv = new Iconv('EUC-KR', 'UTF-8');
// 파일 읽기
var buf = fs.readFileSync("test.csv");
var txt = iconv.convert(buf).toString("utf-8");

// CSV파일 파싱 ---- (※2)
var csv = new CSV(txt, {header:false});
var records = csv.parse();

// 첫 행은 헤더이므로 스킵 --- (※3)
records.shift();

// 결과 출력  --- (※4)
for (var i = 0; i < records.length; i++) {
  var fs = records[i];
  var name = fs[0];
  var price = fs[1];
  var memo = fs[2];
  console.log(name, price, memo);
}
