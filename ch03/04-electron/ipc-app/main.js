// 모듈 로드 
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var ipc = electron.ipcMain;

// 메인 윈도우 기동 
var mainWindow = null;
app.on('ready', function(){
  mainWindow = new BrowserWindow({width:800, height:600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

// 동기적 메시지 수신 
ipc.on('mul-sync', function(event, arg) {
  console.log(arg); // 콘솔 출력 
  event.returnValue = arg.a * arg.b;
});

// 비동기적 메시지 수신
ipc.on('mul-async', function(event, arg) {
  console.log(arg);// 콘솔 출력 
  
  // 렌더링 프로세스에 반환 
  var result = arg.a * arg.b;
  event.sender.send('mul-async-reply', result);
});

