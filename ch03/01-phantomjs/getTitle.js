// 웹 사이트로의 타이틀을 표시
var TARGET_URL = "http://jpub.tistory.com";

// CaperJS의 객체 생성 ---- (※1)
var casper = require('casper').create();

// 지정한 웹 사이트 열기  ---- (※2)
casper.start(TARGET_URL, function() {
  // 타이틀 출력  ---- (※3)
  this.echo(casper.getTitle());
});

// 처리 수행 --- (※4)
casper.run();


