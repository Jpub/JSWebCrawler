// 다운로드
download(
  "http://jpub.tistory.com/539",
  "spring.html");

download(
  "http://jpub.tistory.com/537",
  "angular.html");

print("ok");

// url 의 파일을 savepath 에 다운로드하는 함수 
function download(url, savepath) {
  var aUrl = new java.net.URL(url);
  try {
    var conn = aUrl.openConnection();
    var ins = conn.getInputStream();
    var file = new java.io.File(savepath);
    var out = new java.io.FileOutputStream(file);
    var b;
    while ((b = ins.read()) != -1) {
      out.write(b);
    }
    out.close(); // 출력 스트림을 닫는다.
    ins.close(); // 입력 스트림을 닫는다.
  } catch (e) {
    throw new Error(e);
  }
}
