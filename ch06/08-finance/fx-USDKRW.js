// 환율 정보 취득 for Node.js
// 모듈 로드
var client = require('cheerio-httpcli');
// HTML 다운로드
var code = 'USDKRW=X'; // 통화 지정
var url = "http://finance.yahoo.com/q";

// 페이지 취득
client.fetch(url, {
    "s": code
}, function(err, $, res) {
    if (err) {
        console.log(err);
        return;
    }

    // 값 취득
    var str = $('#quote-header-info > div > div > div > span:nth-child(1)').text();

    // 쉼표(,) 제거
    str = str.replace(/,/g, "");

    // '숫자.숫자'만 추출하기 
    var arr = str.match(/\d*\.\d*/);

    console.log(code);
    console.log(arr[0]);
});