// INI 파일 읽기 for Node.js

var fs  = require('fs'),
    ini = require('ini');

// 여기서는 INI파일을 UTF-8으로 가정하고 읽는다. 
var txt = fs.readFileSync('test.ini', 'utf-8');

// JS 오브젝트로 변환
var obj = ini.parse(txt);

// 내용 표시 
for (var name in obj) {
  var it = obj[name];
  console.log(name, it.price, it.color);
}
