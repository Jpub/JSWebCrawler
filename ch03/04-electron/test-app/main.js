// 필요 모듈 로드
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

// 준비가 된 시점에 호출되는 이벤트 ※1
app.on('ready', function() {
    // 메인 윈도우 생성
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    // 지정 URL 로드
    win.loadURL('file://' + __dirname + '/index.html'); // ※2
    win.on('closed', function() {
        win = null;
    });
});