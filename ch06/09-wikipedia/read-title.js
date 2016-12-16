// Wikipedia 제목을 조사 for Node.js

// 모듈 로드
var levelup = require('level');

// 데이터 베이스 지정
var db = levelup('./wikidata');

// 검색 키를 지정 ----- (※1)
var opt = {
  start : "고양이",
  end   : "고양이\uFFFF"
};

//검색 ------ (※2)
db.createReadStream(opt)
  .on('data', function (data) {
    console.log(data.key);
  })
  .on('end', function () {
    console.log('ok.');
  }
);