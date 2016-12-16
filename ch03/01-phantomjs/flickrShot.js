// Flickr 검색 결과를 캡쳐 for CasperJS

//CasperJS 객체 생성
var casper = require('casper').create();

// CasperJS처리 개시 ---- (¦1)
casper.start();

// 화면 사이트 설정 ---- (¦2)
casper.viewport(1400, 800);

// UserAgent 설정
casper.userAgent('User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36');

// Flickr에서 고양이로 검색 ---- (¦3)
var text = encodeURIComponent("고양이");
casper.open('https://www.flickr.com/search/?text=' + text);

// 화면 캡쳐---- (¦4)
casper.then(function(){
  this.capture('flickr-cat.png',{
    top:0, left:0, width: 1400, height: 800
  });
});

// 실행개시
casper.run();