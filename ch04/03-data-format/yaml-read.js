// YAML 데이터 읽기 for Node.js
var yaml = require('js-yaml');
var fs = require('fs');

// YAML 데이터 읽기 
var txt = fs.readFileSync('test.yml', 'utf-8');

// JavaScript 객체로 변환
var obj = yaml.safeLoad(txt);

// 과일 가격 표시
for (var i in obj.items) {
  var it = obj.items[i];
  console.log(it.name, it.price);
}