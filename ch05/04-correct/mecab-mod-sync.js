// MeCab사용 모듈
module.exports = function () {
  // 외부 모듈 도입
  var execSync = require('child_process').execSync;
  var fs = require('fs');

  // 형태소 분석 실행함수
  this.parse = function (text, callback) {
    text += "\n";

    // 원문을 임시 파일에 저장
    fs.writeFileSync('TMP_INPUT_FILE', text, "UTF-8");

    // 명령어 구성
    var cmd = [
      'mecab',
      'TMP_INPUT_FILE',
      '--output=TMP_OUTPUT_FILE'
    ].join(" ");

    //  명령어 실행 -------- (※4)
    var opt = { encoding: 'UTF-8' };
    var res = [];
    try {
      execSync(cmd, opt);
      res = fs.readFileSync('TMP_OUTPUT_FILE', 'UTF-8');
    }
    catch(e) { console.log(e); }

    res = res.replace(/\r/g, "");
    res = res.replace(/\s+$/, "");
    var lines = res.split("\n");

    var res = lines.map(function(line) {
        return line.replace('\t', ',').split(',');
    });

    return(res);
  };
};