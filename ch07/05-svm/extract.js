//작업 디렉터리의 GZ파일을 한꺼번에 압축 해제 for Node.js

var fs = require('fs');
var exec = require('child_process').exec;

//파일 목록을 얻는다
fs.readdir('.', function(err,files) {
  files.forEach(function(file) {
    // .gz이외는 무시
    if (!/\.gz$/.test(file)) return;
    // 압축 해제  명령어 구성 
    console.log("file=" + file);
    var fn = file.replace(/\.gz$/,"");
    var cmd = [
      "gzip", "-dc",
      '"' + file + '"',
      '>"' + fn + '"'
    ].join(" ");
    // 실행
    exec(cmd,
    function(err, stdout, stderr) {
      if (err) throw err;
      console.log(stdout, stderr);
    });
  });
});


