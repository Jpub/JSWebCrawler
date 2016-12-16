// Excel 파일 작성 for Rhino + Apache POI

// 엑셀에 기재할 데이터 
var list = [
  ["상품명", "가격"],
  ["바나나", 210],
  ["귤", 980],
  ["고구마", 80]
];

// Java 클래스 선언
var XSSFWorkbook = org.apache.poi.xssf.usermodel.XSSFWorkbook;
var XSSFCellStyle = org.apache.poi.xssf.usermodel.XSSFCellStyle;
var FileOutputStream = java.io.FileOutputStream;

// 워크북 생성 
var wb = new XSSFWorkbook();

// 워크쉬트 작성
var sheet = wb.createSheet("sheet-test");

// 셀 스타일 작성
var style_u = wb.createCellStyle();
style_u.setBorderBottom(XSSFCellStyle.BORDER_THIN);
var style_head = wb.createCellStyle();
style_head.setBorderBottom(XSSFCellStyle.BORDER_DOUBLE);

// 셀에 값 설정
for (var i = 0; i < list.length; i++) {
  var row = sheet.createRow(i);
  var c1 = row.createCell(0);
  var c2 = row.createCell(1);

  c1.setCellValue(list[i][0]);
  c2.setCellValue(list[i][1]);

  var style = (i == 0) ? style_head : style_u;

  c1.setCellStyle(style);
  c2.setCellStyle(style);
}

// 파일 쓰기
var out = new FileOutputStream("test.xlsx");
wb.write(out);


