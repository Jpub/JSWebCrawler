// JPUB 출판 도서 목록을 DB에 넣고 조회하기 for Node.js

// 경로 지정 
var DB_PATH = __dirname + "/jpub.sqlite";

// 모듈 로드
var sqlite3 = require('sqlite3').verbose();

// 데이터 베이스 연결 --- (※2)
var db = new sqlite3.Database(DB_PATH);

// 변수 선언 
var BASE_URL = "http://jpub.tistory.com/category/" + encodeURIComponent("제이펍의 도서");
var PAGE_NUM = 6; //page 최대값 

// 모듈 로드
var client = require('cheerio-httpcli');
var fs = require('fs');
var URL = require('url');

// 출판 책 목록 저장 변수
var booklist = [];

scrape(1);

function scrape(page) {
  if (page > PAGE_NUM) {
    dbinsert();
    return;
  }

  var VISIT_URL = BASE_URL + "?page=" + page;

  // 사이트 방문 
  client.fetch(VISIT_URL, function (err, $, res) {
    if (err) { console.log("DL error"); return; }
    // 책 리스트 추출  
    var tr = $("#searchList > ol > li > span.list > a");
    if (!tr) {
      console.log("페이지 형식 에러"); return;
    }

    // 책 리스트 순회
    for (var i = 0; i < tr.length; i++) {
      var book = tr.eq(i).text();
      booklist.push(book);
    }
    scrape(page+1);
  });
}

function dbinsert() {  // ---- ( ※ 1)
  // db에 데이터 넣기 
  db.serialize(function(){
    // SQL 실행하여 table 생성 
    db.run("CREATE TABLE IF NOT EXISTS book(" +
      "id INTEGER PRIMARY KEY, " +
      "token TEXT)");
    
    var ins_stmt = db.prepare(
      'INSERT INTO book (token)' +
      'VALUES(?)');
    
    booklist.forEach(function(value, index, array) {
      var words = value.split(" ");// 단어별로 분할--- (※2)
      
      for (var i in words) {
        ins_stmt.run(words[i]);//분할된 단어를 DB에 삽입
      }

    });
    ins_stmt.finalize();

    // 제목에 사용된 단어 통계 --- (※3)
    console.log("집계 결과");
    db.each("SELECT token, COUNT(token) as cnt "
      + "FROM book GROUP BY token having cnt > 3 "
      + "ORDER BY cnt DESC",
      function (err, row){
        console.log(row.cnt + "회:" + row.token);
      }
    );
  });
};
