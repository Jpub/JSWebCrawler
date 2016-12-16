// 환율 정보 취득 for Node.js
// 모듈 로드
var client = require('cheerio-httpcli');
// 기본 통화 지정
var baseCode = "KRW";
var codeList = [
    "JPY", "USD", "EUR", "AUD", "GBP",
    "NZD", "CAD", "ZAR", "CNH"
];
var url = "http://finance.yahoo.com/q";
// 여러 통화와의 환율 정보 획득
for (var i in codeList) {
    var peer = codeList[i];
    if (peer == baseCode) continue; // 동일한 통화에 대해서는 skip
    var code = peer + baseCode + "=X";
    getFX(code);
}

function getFX(code) {
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
}