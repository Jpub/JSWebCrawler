// 모듈 로드
var parseString = require('xml2js').parseString;

// 테스트 용 XML 데이터
var xml = "<fruits shop='AAA'>" +
"<item price='140'>Banana</item>" +
"<item price='200'>Apple</item>" +
"</fruits>";

// XML 을 전달 
parseString(xml, function (err, result) {
  // console.log(JSON.stringify(result)); // --- ( ※ 1)
  // fruits를 제공하는 가게 이름 
  var shop = result.fruits.$.shop;
  console.log("shop=" + shop);
  
  // furits의 이름과 가격을 표시
  var items = result.fruits.item;
  for (var i in items) {
    var item = items[i];
    console.log("-- name=" + item._);
    console.log(" price=" + item.$.price);
  }
});
