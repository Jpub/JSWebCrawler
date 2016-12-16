// CSON 데이터 읽기 for Node.js

var CSON = require('cson');
var fs = require('fs');

// CSON 파일 읽기
var cson = fs.readFileSync('test.cson', 'utf-8');

// CSON을JS객체로 파싱 
var obj = CSON.parse(cson);

// 내용을 출력 
for (var i in obj.items) {
  var it = obj.items[i];
  console.log(it.name, it.price);
}

// JS객체를 CSON으로 변환
var cson_out = CSON.stringify(obj);
console.log(cson_out);


