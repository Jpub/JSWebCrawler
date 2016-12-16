// 모듈 로드
var client = require('cheerio-httpcli');
var URL = require('url');

// 다운로드
var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent("강아지");
var param = {};

client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }
  
  // 링크를 추출하여 표시
  $("img").each(function(idx) {
    var src = $(this).attr('src');
    src = URL.resolve(url, src);
    console.log(src);
  });
});

