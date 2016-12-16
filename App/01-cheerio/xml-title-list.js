// 모듈을 로드함
var cheerio = require('cheerio');

// 샘플 XML 데이터
var xml = "<books>" +
  "<book><title>사과의 산</title><author>송중기</author></book>" +
  "<book><title>귤의 노래</title><author>김수현</author></book>" +
  "<book><title>바나나의 언덕</title><author>배용준</author></book>" +
  "</books>";

// cheerio를 통해 XML데이터를 읽음 ---- (※1)
$ = cheerio.load(xml);

// 책의 제목일람을 표시 --- (※2)
$("title").each(function(i, e) {
  var title = $(e).text();
  console.log(title);
});
