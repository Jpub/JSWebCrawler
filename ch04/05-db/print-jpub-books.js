//
// JPUB 출판 도서 출력 for Node.js
//

// 변수 선언 
var BASE_URL = "http://jpub.tistory.com/category/" + encodeURIComponent("제이펍의 도서");
var PAGE_NUM = 6; //page 최대값 ---- ( ※ 1)

// 모듈 로드
var client = require('cheerio-httpcli');
var fs = require('fs');
var URL = require('url');

// 출판 책 목록 저장 변수
var booklist = [];

scrape(1); //---- ( ※ 2)

function scrape(page) {
  if (page > PAGE_NUM) { //---- ( ※ 3)
    print();
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
    scrape(page+1); // ---- ( ※ 4)

  });

}

function print() {//---- ( ※5)
  for (var i in booklist) {
    console.log(booklist[i]);
  }
}
