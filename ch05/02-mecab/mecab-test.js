// mecab-kor를 Node.js에서 사용

// 모듈 로드
var fs = require('fs');
var execSync = require('child_process').execSync;

// 형태소 분석할 텍스트
var srcText = "찾아라. 그러면 발견할 것이다.\n";

parse(srcText, function(result) {
  for (var i in result) {
    var word = result[i][0];
    var pos = result[i][1];
    if (word == "EOS") continue;
    console.log(word+":"+pos);
  }
});

// 형태소 분석 실행 함수  ----- (※1)
function parse(text, callback) {
  // 형태소 분석할 문장을 임시 파일에 저장 ----- (※2)
  fs.writeFileSync('TMP_INPUT_FILE', text, "UTF-8");

  // 명령어 구성
  var cmd = [
    'mecab',
    'TMP_INPUT_FILE',
    '--output=TMP_OUTPUT_FILE'
  ].join(" ");

  // 명령어 실행 -------- (※3)
  var opt = { encoding: 'UTF-8' };
  var res = [];
  try {
    execSync(cmd, opt);
    res = fs.readFileSync("TMP_OUTPUT_FILE", 'UTF-8');
  }
  catch(e) { console.log(e); }

  res = res.replace(/\r/g, "");
  res = res.replace(/\s+$/, "");
  var lines = res.split("\n");

  var res = lines.map(function(line) {
        return line.replace('\t', ',').split(',');
  });

  callback(res);
}
