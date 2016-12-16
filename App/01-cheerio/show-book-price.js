// 모듈 로드
var cheerio = require('cheerio');
var fs = require('fs');

// 샘플 XML을 cheerio 로 읽어들임 
var xml = fs.readFileSync("test.xml", "utf-8");
$ = cheerio.load(xml);

// 책의 ID와 가격을 표시
$("book").each(function(i, e) {
  // ID 속성 취득 --- (※1)
  var id = $(e).attr("id");
  // <price> 태그의 value 속성 취득 --- (※2)
  var price = $(e).children("price").attr("value");
  console.log(id + ":" + price);
});
