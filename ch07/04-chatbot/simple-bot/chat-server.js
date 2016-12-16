// 채팅봇 서버 
//-----------------------------
// 설정
var SERVER_PORT = 1337; // 웹 서버 포트
var FILE_CLIENT = "chat-client.html";

// 모듈 로드 
var
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  bot  = require('./chat-server-bot.js');

// 서버 기동 --- (※1)
var svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("서버 기동 완료");
  console.log("http://localhost:" + SERVER_PORT);
});

// 서버에 요청이 왔을 때의 처리 --- (※2)
function checkRequest(req, res) {
  var uri = URL.parse(req.url, true);
  var pathname = uri.pathname;
  console.log(pathname);
  // 요청 경로명으로 처리를 분기
  if (pathname == "/api") {
    apiRequest(req, res, uri);
  } else if (pathname == "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, "utf-8"));
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

// API 요청 처리 --- (※3)
function apiRequest(req, res, uri) {
  msg = uri.query["msg"];
  bot.getResponse(msg, function(bot_msg) {
    body = JSON.stringify({"msg":bot_msg});
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(body);
  });
};