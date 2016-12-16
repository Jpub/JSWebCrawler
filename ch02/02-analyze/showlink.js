// 모듈 로드
var client = require('cheerio-httpcli');

// 다운로드
var url = "http://jpub.tistory.com";
var param = {};

client.fetch(url, param, function(err, $, res) { //----( ※ 1)
    if (err) { console.log("error"); return; }
    
    // 링크를 추출하여 표시 --- ( ※ 2)
    $("a").each(function(idx) {
        var text = $(this).text();
        var href = $(this).attr('href');
        console.log(text+":"+href);
    });
});