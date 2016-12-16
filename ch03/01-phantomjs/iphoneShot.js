// iPhone인척하고 웹 사이트 캡쳐  for CasperJS

var TARGET_URL = "http://jpub.tistory.com";

// Casper 생성 
var casper = require('casper').create();
casper.start();

// iPhone 인척 하기  --- (※1)
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

// 화면 사이즈 지정 --- (※2)
casper.viewport(750, 1334);

casper.open(TARGET_URL);

// 화면 캡쳐 
casper.then(function(){
  this.capture('screenshot.png');
});
// 실행
casper.run();
