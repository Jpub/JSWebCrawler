// 모듈로드
var cheerio = require('cheerio');
var fs = require('fs');

// 샘플 XML을 cheerio 로 읽어들임
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 책의 제목과 색을 표시
$("book").each(function(i, e) {
  // 제목 표시
  var title = $(e).children("title").text();
  // 색 표시 ---- (※1)
  var color = $(e).find("color").text();
  console.log(title + " - " + color);
});
