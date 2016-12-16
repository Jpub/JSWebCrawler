// 단어의 출현 빈도 조사
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 실행 인자 확인
var args = process.argv;
args.shift(); // 'node'제거
args.shift(); // 스크립트 경로 제거
if (args.length <= 0) {
  console.log('node word-count.js textfile');
  process.exit();
}
var filename = args.shift();

// 파일 읽기
var text = fs.readFileSync(filename, "utf-8");
// 형태소 분석 실행
mecab.parse(text, function(items) {
  checkWordCount(items);
});

// 출현 빈도 조사
function checkWordCount(items) {
  // 형태소를 객체에 넣어서 빈도를 조사
  var words = {};
  for (var i in items) {
    var it = items[i];
    var w = it[0];
    var h = it[1];
    if (w == 'EOS') continue;
    if (words[w+h] == undefined) {
      words[w+h] = 1;
    } else {
      words[w+h]++;
    }
    
  }
  // 형태소 출현 빈도로 정렬하기 위해 배열에 복사
  var list = [];
  for (var key in words) {
    list.push({
      "word":key,
      "nums":words[key]
    });
  }
  // 정렬
  list.sort(function(a, b){
        return b.nums - a.nums;
  });
  // 화면에 출력
  for (var i = 0; i < list.length; i++) {
    var it = list[i];
    console.log((i + 1) + ":" + it.word + "(" + it.nums + ")");
  }
}