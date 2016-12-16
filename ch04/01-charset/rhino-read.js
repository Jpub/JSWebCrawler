//라이노로 텍스트 파일 읽기for Rhino
// UTF-8
var txt;
txt = readFile("sample-utf8.txt", "utf-8");
print(txt);

// EUC-KR
txt = readFile("sample-unknown.txt", "euc-kr");
print(txt);
