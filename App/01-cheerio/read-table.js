// 모듈 로드
var cheerio = require('cheerio');
var fs = require('fs');

// 파일을 cheerio로 읽어들임
var html= fs.readFileSync("table.html", "utf-8");
$ = cheerio.load(html);

// 테이블 취득
var data = readTable("#tbl");
console.log(data);

// 테이블의 전체 셀을 읽음
function readTable(query) {
  var data = [];
  var table = $(query);
  var tr_list = $(table).children("tr");
  for (var i = 0; i < tr_list.length; i++) {
    var cells = tr_list.eq(i).children();
    var cols = [];
    for (var j = 0; j < cells.length; j++) {
      var v = cells.eq(j).text();
      cols.push(v);
    }
    data.push(cols);
  }
  return data;
}
