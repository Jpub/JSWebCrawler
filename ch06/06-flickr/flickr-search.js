//Flickr에서 사진 검색 for Node.js
//모듈 로드
var client = require('cheerio-httpcli');

// URL 및 파라미터 설정 ---- ( ※ 1)
var url = "https://api.flickr.com/services/rest/";

var param = {
    method:'flickr.photos.search',
    api_key:'API_KEY' ,// 발급받은 API 기재 ---- ( ※ 2)
    text:'cat',
    format:'rest'
};

client.fetch(url, param, function (err, $, res) {
    
    // 에러 체크
    if (err) { console.log("Error:", err); return; }
    
    // 다운로드한 결과를 화면에 출력  ---- ( ※ 3)
     console.log($("photos")[0].attribs);
    $("photo").each(function(i,el) {
        console.log(i);
        console.log(el.attribs);

        var farm = element.attribs.farm;        
        var server = element.attribs.server;        
        var id = element.attribs.id;        
        var secret = element.attribs.secret;        
        
        // 이미지의 실제 URL 구성   ---- ( ※ 4)
        var url = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
        console.log(url);

    });
});