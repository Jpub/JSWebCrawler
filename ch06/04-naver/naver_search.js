// 네이버 검색 for Node.js

// 모듈 로드
var https = require('https');
var parseString = require('xml2js').parseString;

var keyword = '쭈구미'; // 검색어 지정                                                                                                                                                       

 var client_id = '발급받은 ID';
 var client_secret = '발급받은 Secret';
 var host = 'openapi.naver.com';
 var port = 443;
 var uri = '/v1/search/blog.xml?query=' + encodeURIComponent(keyword);

var options = {
    host: host,
    port: port,
    path: uri,
    method: 'GET',
    headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
};

var result = "";

var req = https.request(options, function(res) {
    res.setEncoding('utf8');

    res.on('data', function (chunk) {
            result = result + chunk;
    });

    res.on('end', function () {
        parseString(result, function(err, pStr) {                                                                                                                                
            var items = pStr.rss.channel[0].item;                                                                                                                                
            for (var i in items) {
                console.log("USER: " + items[i].bloggername[0]);
                console.log("TITLE: " + items[i].title[0]);
                console.log("DESC: " + items[i].description[0]);
                console.log("------------------------");
            }
       });
    });
 });

 req.end();