var casper = require('casper').create({verbose: true, logLevel: "debug"});

// URL 및 로그인 정보 변수 --- (※1)
var url = "http://본인 Tistory 블로그 주소/admin/center/";
var id = "";
var password = "";

casper.start();

casper.open(url);

// Form Submit --- (※2)
casper.then(function() {
   casper.fill( "#authForm", 
    { 
      loginId: id, 
      password:password
    }, true);
});

casper.then(function(){
    var getComment = function(){
      return document.querySelector("#blogInfo > ul > li:nth-child(3) > span.day").innerText;
    };

    // Evaluate --- (※3)
    console.log("새 댓글 수 : " + this.evaluate(getComment));
});

casper.then(function(){        
    var getGuestBook = function(){                
      return document.querySelector("#blogInfo > ul > li:nth-child(4) > span.day").innerText;
    };
    console.log("새 방명록 수 : " + this.evaluate(getGuestBook));
});

casper.run();
