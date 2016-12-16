var casper = require('casper').create({verbose: true, logLevel: "debug"});

// URL 및 로그인 정보 변수 --- (※1)
var url = "http://본인 Tistory 블로그 주소/admin/center/";
var id = "";
var password = "";

casper.start();

casper.open(url);

casper.then(function() {
   casper.fill( "#authForm", 
    { 
      loginId: id, 
      password:password
    }, true);
});

casper.then(function(){
            var path = "#blogInfo > ul > li:nth-child(2) > span.txt > a";
            if (casper.exists(path)) {
                casper.mouseEvent('click', path);
            }

            casper.wait(3000);
});

casper.then(function(){
  casper.capture('capture.png', {
    top:0, left:0, width:1024, height:768
  });
});

casper.run();
