// 네이버 금융 페이지
var TARGET_URL = "http://finance.naver.com";

// 모듈 로드 
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var fs = require('fs');

// 메인 윈도우 기동 
var win = null;
app.on('ready', function(){
  win = new BrowserWindow({width:800, height:800});
  win.loadURL(TARGET_URL);
  // 페이지 로드가 완료되면 캡쳐
  win.webContents.on('did-finish-load', captureFunc);
});

// 캡쳐 처리 함수 
function captureFunc() {
  // 일자를 파일 이름에 붙여서 파일에 저장 --- (※1)
  var t = new Date();
  var fname = "finance-" + t.getFullYear() +
    "-" + (1 + t.getMonth()) +
    "-" + t.getDate() + ".png";
    
  win.capturePage(function(img) {
    fs.writeFileSync(fname, img.toPng());
    app.quit(); // 애플리케이션 자동 종료
  });
}
