// 채팅봇을 위한 키워드 사전 작성 
//------------------------------------
// 사전 텍스트 파일 지정 
var FILE_DIC = 'bot-dic.dat';
// MongoDB 접속 정보 --- (※1)
var MONGO_DSN = "mongodb://localhost:27017/simple-bot";
var mongo_db; // 접속 객체 

// 모듈 로드
var mongo_client = require('mongodb').MongoClient;
var fs = require('fs');

// MongoDB 연결 --- (※2)
mongo_client.connect(MONGO_DSN, function (err, db) {
  // 에러 체크
  if (err) { console.log("DB error", err); return; }
  // MongoDB 연결 객체 저장 
  mongo_db = db;
  
  // 컬렉션 취득 --- (※3)
  var collection = db.collection('keywords');

  // 기존 데이터 있으면 초기화 ---- (※4)
  collection.drop(function(err, reply) {
    // 초기화 후 데이터 삽입 
    insertKeywords(collection);
  });
});

// MongoDB에 사전 데이터 삽입 --- (※5)
function insertKeywords(collection) {
  var cnt = 0, dataCount = 0;
  // 텍스트 데이터 읽기
  var txt = fs.readFileSync(FILE_DIC, "utf-8");
  // 라인 별 처리
  var lines = txt.split("\n");
  for (var i in lines) {
    var line = trim(lines[i]);
    if (line == "") continue; // 빈 라인 
    if (line.substr(0,1) == ";") continue; // 주석
    var cells = line.split(",");
    var key = trim(cells[0]);
    //var rank = parseInt(trim(cells[1]));
    var pat = trim(cells[2]);
    var msg = trim(cells[3]);
    // 삽입 ---- (※6)
    collection.insert({
      "key": key, //"rank": rank, 
      "pattern": pat, "msg": msg
    }, function(err, result) {
      console.log(cnt+":inserted:", result.ops);
      if (++cnt == dataCount) {
        console.log("done");
        mongo_db.close();
      }
    });
    dataCount++;
  }
}

// 전후 공백 없애기
function trim(s) {
  s = "" + s;
  return s.replace(/(^\s+|\s+$)/g, "");
}



