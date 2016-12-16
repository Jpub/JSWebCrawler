// 변수 선언
var TARGET_URL = "https://atom.io"; // 대상 웹 사이트

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
	// 페이지 로드가 완료되면 캡쳐 수행
	win.webContents.on('did-finish-load',captureFunc);
});

// 캡쳐 처리
function captureFunc() {
	win.capturePage(function(img) {
		fs.writeFileSync('screenshot.png', img.toPng());
	});
}
