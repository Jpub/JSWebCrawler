//CSV를 바탕으로 SVM학습 데이터(SVM)을 생성
var fs = require('fs');

//두 종류의 데이터를 처리
csv2svm('train-mini.csv');
csv2svm('train.csv');
csv2svm('t10k-mini.csv');
csv2svm('t10k.csv');
console.log("ok");

//CSV파일을 SVM파일로 변환 
function csv2svm(file_csv) {
  //아웃풋 파일 이름 결정
  var file_svm = file_csv.replace(/\.csv$/, "") + ".svm";
  console.log("[I N] " + file_csv);
  console.log("[OUT] " + file_svm);
  console.log(file_svm);

  //저장용 파일 열기
  var f_svm = fs.openSync(file_svm, "w");

  // 읽기
  var csv = fs.readFileSync(file_csv, "utf-8");
  var lines = csv.split("\n");

  //데이터를 작성
  for (var i in lines) {
    //경과 보고
    if (i % 1000 == 0) console.log(i + "/" + lines.length);

    //한 줄씩 처리
    var line = lines[i];
    var cells = line.split(",");
    var no = cells.shift();
    var vals = [];
    for (var j = 0; j < cells.length; j++) {
      var index = j + 1;
      var v = cells[j];
      if (v == 0) continue;    //0은 생략 가능
      var value = v / 255;     //데이터 스케일링
      vals.push(index + ":" + value);
    }
    if (vals.length == 0) continue;
    var v_str = no + " " + vals.join(" ");
    var dat = v_str + "\n";
    // 파일에 쓰기
    fs.writeSync(f_svm, dat, null, "utf-8");
  }
  console.log("saved = " + file_svm);
}