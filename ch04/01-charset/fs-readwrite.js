// 파일 읽고 쓰기 for Node.js
var fs = require('fs');

// UTF-8의 파일을 읽기 
var txt = fs.readFileSync("sample-utf8.txt", "utf-8");
console.log(txt);

// UTF-8으로 파일 쓰기 
fs.writeFileSync("test.txt", txt);


