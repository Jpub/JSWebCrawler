// Wikipedia 제목 DB를 생성 for Node.js

//모듈 로드
var request = require('request');
var fs = require('fs');
var zlib = require('zlib');
var levelup = require('level');

// Wikipedia의 최신 제목 데이터 --- (※1)
var titleName = "kowiki-latest-all-titles-in-ns0";
var titleUrl = "http://dumps.wikimedia.org/kowiki/latest/" +
      titleName + ".gz";
var local_gz  = __dirname + "/" + titleName + ".gz";
var local_txt = __dirname + "/" + titleName;

// 데이터 베이스 지정 ---- (※2)
var db = levelup('./wikidata');

// 데이터 다운로드----- (※3)
request
  .get(titleUrl)
  .on('end', goGunzip)
  .pipe(fs.createWriteStream(local_gz));
console.log("다운로드 시작");

// 파일 압축 해제 ----- (※4)
function goGunzip() {
  console.log('압축 해제');
  // 파일 읽기
  var gz_data = fs.readFileSync(local_gz);
  // 압축 해제
  zlib.gunzip(gz_data, function (err, bin) {
    if (err) { console.log(err); return; }
    // 결과를 파일에 쓰기 (만일을 대비)
    fs.writeFileSync(local_txt, bin);
    var txt = bin.toString('utf-8'); // --- (※5)
    insertDB(txt);
  });
}

// LevelDB에 결과 삽입 ----- (※6)
function insertDB(txt) {
  console.log("데이터 베이스에 입력");
  var lines = txt.split("\n");
  lines.shift(); // 첫 행은 버림
  var t = db.batch();
  for (var i in lines) {
    var it = lines[i];
    if (it == "") continue;
    t.put(it, 1);
    if (i % 1000 == 0) console.log(i + "행째:" + it); // --- (※7)
  }
  t.write(function() {
    console.log("입력 완료:" + lines.length);
  });
}

