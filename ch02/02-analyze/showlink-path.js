// 모듈 로드
var client = require('cheerio-httpcli');
var urlType = require('url');

// URL과 파라미터 
var url = "http://jpub.tistory.com";
var param = {};

// 다운로드
client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }

  // 링크 추출하여 출력
  $("a").each(function(idx) {
    var text = $(this).text();
    var href = $(this).attr('href');
    if (!href) return;

    // 상대경로를 절대경로로 변환--- (※1)
    var href2 = urlType.resolve(url, href);
    
    // 결과를 표시
    console.log(text + " : " + href);
    console.log("  => " + href2 + "\n");
  });
});

