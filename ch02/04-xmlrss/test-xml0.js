// 모듈 로드
var parseString = require('xml2js').parseString;

// 테스트 용  XML 데이터
var xml = "<item>Banana</item>";

// XML을 전달
parseString(xml, function (err, result) {
  console.log(result.item); // 결과: Banana
});


