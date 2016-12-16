// PDFKit 사용 테스트 for Node.js

// 모듈 로드 
var PDFDocument = require('pdfkit');
var fs = require('fs');

// 도큐먼트 생성 --- (※1)
var doc = new PDFDocument();

// 출력 파일 설정  --- (※2)
doc.pipe(fs.createWriteStream('output.pdf'));

// 폰트 지정 --- (※3)
doc.font('H2GTRE.TTF');

// 문자 표시 --- (※4)
doc.fontSize(30)
   .text('Hello~!!' , 90, 100);
doc.fontSize(20)
   .text("안녕하세요 \n",
         100,180);

// 도형 그리기  --- (※5)
doc.save()
   .moveTo(80, 80)
   .lineTo(250, 80)
   .lineTo(250, 150)
   .lineTo(80, 150)
   .lineTo(80, 80)
   .stroke('#0000FF');

// 페이지 추가 --- (※6)
doc.addPage();

// 도형 그리기 
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill('#FF0000');

// 종료 --- (※7)
doc.end();
