// 기상청 기상예보 RSS
var RSS = "http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109";

// 모듈 로드
var parseString = require('xml2js').parseString;
var request = require('request');

// RSS 다운로드 ---- (※1)
request(RSS, function (err, response, body) {
  if (!err && response.statusCode == 200) {
    analyzeRSS(body);
  }
});

// RSS 해석 ---- (※2)
function analyzeRSS(xml) {
  // XML을 JS 오브젝트로 변환
  parseString(xml, function(err, obj) {
    if (err) { 
      console.log(err); return; 
    }
    // 기상 예보 정보 출력 ----- (※3)
    //console.log(JSON.stringify(obj)); // ----- (※4)
    var datas = obj.rss.channel[0].item[0].description[0].body[0].location[0].data;
    var city  = obj.rss.channel[0].item[0].description[0].body[0].location[0].city;    
    for (var i in datas) {      
      var data = datas[i];      
      console.log(city + " " + data.tmEf + " " + data.wf + " " + data.tmn + "~" + data.tmx);
    }
  });
}