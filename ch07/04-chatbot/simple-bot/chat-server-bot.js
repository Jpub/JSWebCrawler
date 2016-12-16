// 채팅봇의 대답을 생성하는 모듈
//---------------------------------

// MongoDB 설정정보
var MONGO_DSN = "mongodb://localhost:27017/simple-bot";

// 모듈 로드
var Mecab = require('./mecab-mod.js'),
    mecab = new Mecab(),
    mongo_client = require('mongodb').MongoClient;

// MongoDB 접속 정보를 저장하는 변수
var mongo_db = null, keywords_co;

// 외부에 getResponse() 메서드 공개 --- (※1)
module.exports = {
  "getResponse": getResponse
};

// 채팅봇의 대답을 반환하는 함수 --- (※2)
function getResponse(msg, callback) {
  checkDB(function(){
    var bot = new Bot(msg, callback);
    bot.talk();
  });
}

// MongoDB에 접속 --- (※3)
function checkDB(next_func) {
  // 이미 접속되어 있으면 아무것도 안함
  if (mongo_db) {
    next_func(); return;
  }

  // MongoDB에 접속
  mongo_client.connect(MONGO_DSN, function (err, db) {
    // 에러 체크
    if (err) { console.log("DB error", err); return; }
    // 접속정보를 저장
    mongo_db = db;
    // 컬렉션 취득
    keywords_co = db.collection('keywords');
    // 다음 처리 실행
    next_func();
  });
}

// Bot 클래스 정의 ---- (※4)
function Bot(msg, callback) {
  this.callback = callback;
  this.msg = msg;
  this.results = [];
  this.words = [];
  this.index = 0;
}

// 채팅봇으로부터의 대답을 획득하는 메서드 ---- (※5)
Bot.prototype.talk = function () {
  var self = this;
  // 형태소 분석 --- (※6)
  mecab.parse(this.msg, function (words) {
    // 형태소를 하나씩 확인 ---- (※7)
    self.index = 0;
    self.words = words;
    self.nextWord();
  });
};

// 각 형태소를 하나씩 조사하는 메서드  ---- (※8)
Bot.prototype.nextWord = function() {
  // 끝까지 체크했는지 확인
  if (this.index >= this.words.length) {
    this.response();
    return;
  }

  // 데이터 베이스 검색
  var w = this.words[this.index++];
  console.log(w);
  var org = w[0];
  var self = this;
  keywords_co
  .find({key:org})
  .toArray(function(err, rows) {
    // 데이터베이스에 일치하는 게 있는가?
    if (rows.length == 0) {
      self.nextWord(); return;
    }

    // 패턴에 맞는 것만을 필터링 --- (※9)
    var keys = rows.filter(function(el, index, ary) {
      if (el.pattern == "*") return true;
      if (self.msg.indexOf(el.pattern) >= 0) return true;
      return false;
    });

    if (keys.length > 0) {
      var r = Math.floor(Math.random() * keys.length);
      var key = keys[r];
      self.results.push(key.msg);
    }
    self.response();
  });
};

// 결과 반환
Bot.prototype.response = function () {
  var res = "좀 더 쉽게 말씀해주세요.";
  if (this.results.length > 0) {
    res = this.results.join(".");
  }
  this.callback(res);
};