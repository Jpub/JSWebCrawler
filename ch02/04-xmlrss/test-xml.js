// 모듈 로드
var parseString = require('xml2js').parseString;

// 테스트 용 XML 데이터 
var xml = "<fruits shop='AAA'>" +
  "<item price='140'>Banana</item>" +
  "<item price='200'>Apple</item>" +
  "</fruits>";

// XML 전달 
parseString(xml, function (err, result) {
  // 파싱된 결과에 대한 처리를 여기에 작성 
  console.log(JSON.stringify(result));
});