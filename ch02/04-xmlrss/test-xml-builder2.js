// 모듈 로드 
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;

// 테스트 용 XML 데이터 
var xml = "<fruits shop='AAA'>" +
  "<item price='140'>Banana</item>" +
  "<item price='200'>Apple</item>" +
  "</fruits>";

// XML 전달 
parseString(xml, function (err, r) {
  // 변환된 자바 스크립트 객체 출력
  console.log(JSON.stringify(r));
  
  // 변환된 자바스크립트 객체를 다시 XML로 변환 
  var xml = new Builder().buildObject(r);
  console.log(xml);
});
