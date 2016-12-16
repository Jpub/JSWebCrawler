// JSON 데이터 읽기 for Node.js
var fs = require('fs');

// JSON 파일 읽기
var json = fs.readFileSync("test.json", "utf-8");

// JS객체로 변환
var obj = JSON.parse(json);

// 아이템 일람을 출력
var items = obj.items;
for (var i in items) {
	var item = items[i];
	var name = item.name;
	var price = item.price;
	console.log(name, price);
}
