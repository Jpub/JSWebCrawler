// url 에 있는 파일을 savepath 에 다운로드한다
// 다운로드할 URL을 지정
var url = "http://jpub.tistory.com/";

// 저장할 위치를 지정
var savepath = "test.html";

// 사용 모듈 정의 ---- ( ※ 1)
var http = require('http'); // HTTP 모듈
var fs = require('fs'); // 파일처리 관련 모듈

// 출력 지정 --- ( ※ 2)
var outfile = fs.createWriteStream(savepath);

// 비동기로 URL의 파일 다운로드 --- ( ※ 3)
http.get(url, function(res) {
    res.pipe(outfile); // --- ( ※ 4)
    res.on('end', function () { // --- ( ※ 5)
        outfile.close();
        console.log("ok");
    });
});
