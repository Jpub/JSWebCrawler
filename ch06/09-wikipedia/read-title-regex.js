// Wikipedia 타이틀 검색 for Node.js

// 모듈 로드
var levelup = require('level');

// 데이터 베이스 지정
var db = levelup('./wikidata');

// 정규표현식으로 항목을 검색 ----- (※1)
var search_re = /.{4,}사랑$/;

//모든 항목에 대해 검색
var cnt = 0, result = [];
db.createReadStream()
  .on('data', function (data) {
    // 검색 경과 표시
    if (cnt % 50000 == 49999) {
      console.log(cnt+"건 검색:" + data.key);
    }
    // 정규표현식 검사 ---- (※2)
    if (search_re.test(data.key)) {
      result.push(data.key);
      console.log("발견:" + data.key);
    }
    cnt++;
  })
  // 최종 결과 표시
  .on('end', function () {
    console.log("발견:\n" + result.join("\n"));
    console.log('ok.');
  });