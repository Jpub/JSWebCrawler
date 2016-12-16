// url 에 있는 파일을 savepath 에 다운로드한다
var url = "http://jpub.tistory.com/";
var savepath = "test.html";

// 다운로드
var aUrl = new java.net.URL(url);
var conn = aUrl.openConnection(); // URL 에 접속 --- ( ※ 1)
var ins = conn.getInputStream(); // 입력스트림을 획득
var file = new java.io.File(savepath); 출력스트림을 획득 ---( ※ 2)
var out = new java.io.FileOutputStream(file);

// 입력스트림을 읽으면서 출력 스트림에 쓴다---- ( ※ 3)
var b;
while ((b = ins.read()) != -1) {
    out.write(b);
}
out.close(); // 출력 스트림을 닫는다. --- ( ※ 4)
ins.close(); // 입력 스트림을 닫는다.