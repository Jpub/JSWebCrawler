// 커맨드 라인에서 인수로 웹 사이트 스크린 샷 촬영 for CasperJS

var casper = require('casper').create();
var utils = require('utils');

// 인수 얻기
var args = casper.cli.args;
if (args.length < 1) {
  // 사용법 표시 
  casper.echo("USES:");
  casper.echo("shot-tool URL [savepath]");
  casper.exit();
}
var savepath = "screenshot.png";
var url = args[0];
if (args.length >= 2) {
  savepath = args[1];
}

// CasperJS 처리 개시
casper.start();
casper.viewport(1024, 768);
casper.open(url);
casper.then(function(){
  this.capture(savepath, {
    top:0, left:0, width:1024, height:768
  });
});
casper.run();
