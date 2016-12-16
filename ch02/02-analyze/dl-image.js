// 모듈 로드 
var client = require('cheerio-httpcli');
var request = require('request');
var fs = require('fs');
var URL = require('url');

// 저장할 디렉토리가 없으면 생성 
var savedir = __dirname + "/img"; // --- (※1)
if (!fs.existsSync(savedir)) {    // --- (※2)
  fs.mkdirSync(savedir);          // --- (※3)
}

// URL 지정 
var url = "https://ko.wikipedia.org/wiki/" + encodeURIComponent("강아지");
var param = {};
// HTML 파일 획득 --- (※4)
client.fetch(url, param, function(err, $, res) {
  if (err) { console.log("error"); return; }

  // img 링크 추출하여 각 링크에 대해 함수 수행 --- (※5)
  $("img").each(function(idx) {
    var src = $(this).attr('src');

    // 상대경로를 절대경로로 변환 --- (※6)
    src = URL.resolve(url, src);

    // 저장 파일 이름 결정 --- (※7)
    var fname = URL.parse(src).pathname;
    fname = savedir + "/" + fname.replace(/[^a-zA-Z0-9\.]+/g, '_');
    
    // 다운로드 --- (※8)
    request(src).pipe(fs.createWriteStream(fname));
  });
});

