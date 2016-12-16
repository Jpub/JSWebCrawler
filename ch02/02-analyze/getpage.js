//모듈 로드
var client = require('cheerio-httpcli');

// 다운로드 ---- ( ※ 2)
var url = "http://jpub.tistory.com";
var param = {};

client.fetch(url, param, function (err, $, res) {
    // 에러 체크
    if (err) { console.log("Error:", err); return; }
    
    // 다운로드한 결과를 화면에 출력  ---- ( ※ 3)
    var body = $.html();
    console.log(body);
});
