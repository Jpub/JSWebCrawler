//문자 인식 서버
//설정
var SERVER_PORT=1337;//서버 포트
var FILE_CLIENT=__dirname+"/client-recognizer.html";
var FILE_MODEL=__dirname+"/train-mini.model";

//모듈 로드
var http=require('http'),
    URL=require('url'),
    path=require('path'),
    fs=require('fs'),
    svm=require('node-svm');

//학습 모델 읽기---(※1)
var model_json=fs.readFileSync(FILE_MODEL,"utf-8");
var model_obj=JSON.parse(model_json, model_obj);
var clf=new svm.SVM({}, model_obj);

//서버 기동---(※2)
var svr=http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("서버 실행했습니다");
  console.log("http://localhost:"+SERVER_PORT);
});

//서버 요청에 대한 처리---(※3)
function checkRequest(req, res){
  var uri=URL.parse(req.url, true);
  var pathname=uri.pathname;

  //경로명으로 처리 분기
  if(pathname=="/predict"){
    api_predict(req, res, uri);
  }
  else if(pathname=="/"){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT,"utf-8"));
  }else{
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

//API 요청 처리---(※4)
function api_predict(req, res, uri){
  var p=uri.query.p;
  res.writeHead(200,{'Content-Type':'text/plain'});
  var value=JSON.parse("["+p+"]");
  for(var i in value){
    value[i]=value[i]/255;
  }
  console.log("value.length="+value.length+"/"+28*28);
  clf.predict(value). then(function(predicted){
    console.log(predicted);
    res.end(""+predicted);//-----(※5)
  });
} 
