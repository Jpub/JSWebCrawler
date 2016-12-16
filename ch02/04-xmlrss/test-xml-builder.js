// 모듈 로드
var xml2js = require('xml2js');

// 자바스크립트 객체
var obj = {
  item: {name:"Banana", price:150}
};
// XML로 변환
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
console.log(xml);
