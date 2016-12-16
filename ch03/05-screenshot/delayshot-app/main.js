//촬영 전 대기시간 
var DELAY_TIME = 1000 * 1; // 1초

// 구글에서 이미지 검색 
var WORD = "고양이";
var TARGET_URL = "https://www.google.co.kr/search" +
      "?source=lnms&tbm=isch&q=" + 
      encodeURIComponent(WORD);

// 모듈 로드
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var fs = require('fs');

// 메인 윈도우 기동
var win = null;
app.on('ready', function(){
  win = new BrowserWindow({width:1024, height:800});
  win.loadURL(TARGET_URL);
  // 페이지 로드가 완료되면 캡쳐 함수를 호출 
  win.webContents.on('did-finish-load', captureFunc);
});

// 캡쳐 처리 --- (※1)
function captureFunc() {
  // 딜레이를 준다 
  setTimeout(function () {
    // 적절한 이름으로 저장한다. 
    var fname = "cat-" + (new Date()).getTime() + ".png";
    win.capturePage(function(img) {
      fs.writeFileSync(fname, img.toPng());
      app.quit(); // 앱 자동 종료 
    });
  }, DELAY_TIME);
}
