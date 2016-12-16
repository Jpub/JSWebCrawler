// Excel 파일 생성 테스트  for Node.js

// 모듈 로드
var fs = require('fs');
var officegen = require('officegen');
var xlsx = officegen('xlsx');

// 신규 쉬트 생성 
var sheet = xlsx.makeNewSheet();
sheet.name = "test";

// 직접 데이터 쓰기 
sheet.data[0] = ["상품명", "가격", "특징"];
sheet.data[1] = ["사과", 340];
sheet.data[2] = ["귤", 980];
sheet.data[3] = ["바나나", 280];

// 셀 명을 지정하여 쓰기
sheet.setCell('C2', '신선');
sheet.setCell('C3', '제주도산');

// 파일에 쓰기 
var strm = fs.createWriteStream('test.xlsx');
xlsx.generate(strm);

