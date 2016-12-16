// 모듈 로드
var cheerio = require('cheerio');
var fs = require('fs');

// 샘플 XML을 cheerio 로 읽어들임
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 책의 정보를 표시
$("book").each(function(i, e) {
  // <book>태그의 자식 요소로부터 값을 취득 ---- (※1)
  var title = $(e).children('title').text();
  var author = $(e).children('author').text();
  console.log(title + " - " + author);
});
