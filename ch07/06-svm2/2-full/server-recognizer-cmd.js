// 숫자 인식 서버 
// 설정 
var SERVER_PORT = 1337; // 웹 서버 포트 
var FILE_CLIENT = __dirname + "/client-recognizer.html";
var FILE_MODEL = __dirname + "/train.model";
var SVM_PREDICT = "~/libsvm/svm-predict"; // svm-predict 경로 지정
var DIR_TEMP = __dirname;

// 모듈 로드 
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  exec = require('child_process').exec;


// 서버 기동 
var svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("서버 실행했습니다");
  console.log("http://localhost:" + SERVER_PORT);
});

//요청에 대한 처리
function checkRequest(req, res) {
  var uri = URL.parse(req.url, true);
  var pathname = uri.pathname;
  
  //경로명으로 처리를 분기
  if (pathname == "/predict") {
    api_predict(req, res, uri);
  }
  else if (pathname == "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, "utf-8"));
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

// 예측 수행
function api_predict(req, res, uri) {
  var p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var value = JSON.parse("[" + p + "]");
  var list = [];
  for (var i in value) {
    var v = value[i] / 255;
    if (v == 0) continue;
    list.push( (parseInt(i) + 1) + ":" + v );
  }
  
  // 테스트 용 데이터 작성  ---- (※1)
  var testdata = "0 " + list.join(" ") + "\n";
  console.log(testdata);

  // 임시 파일에 저장
  var r = Math.random();
  var t = (new Date()).getTime();
  var tmp_test = DIR_TEMP + "/test-" + t + "-" + r;
  var tmp_res  = DIR_TEMP + "/res-" + t + "-" + r;
  fs.writeFileSync(tmp_test, testdata, "utf-8");

  // 명령어 생성 ---- (※2)
  var cmd_a = [
    SVM_PREDICT,
    '"' + tmp_test + '"',
    '"' + FILE_MODEL  + '"',
    '"' + tmp_res + '"'
  ];
  var cmd = cmd_a.join(" ");
  console.log("*** cmd ***",cmd, "***");

  // 명령어 실행 --- (※3)
  exec(cmd, function (err, stdin, stdout) {
    if (err) {
      res.end("ERROR: exec commnad");
      return;
    }
    // 결과 파일 읽기
    var a = fs.readFileSync(tmp_res, "utf-8");
    console.log("predict>" + a);
    console.log(stdout);
    res.end("" + a);
    // 임시 파일 삭제
    fs.unlink(tmp_test);
    fs.unlink(tmp_res);
  });
}



