// CSV 파일 읽기 for Node.js

var fs    = require('fs');
var CSV   = require('comma-separated-values');

// CSV 데이터
var txt = "id,name,price\r\n" +
  		  "1001,Banana,300\r\n" +
  		  "1002,Apple,230\r\n";

// CSV파일 파싱
var csv = new CSV(txt, {header:true});
var records = csv.parse();

// 콘솔 출력 
console.log(records);
