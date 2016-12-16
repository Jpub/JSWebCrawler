
// 모듈 로드 
var sqlite3 = require('sqlite3').verbose();
// 로컬 DB 열기 
var db = new sqlite3.Database('test.sqlite');

db.serialize(function () {
  // SQL실행하여 테이블 생성
  db.run('CREATE TABLE IF NOT EXISTS items(name, value)');
  
  // PreparedStatement로 데이터 삽입
  var stmt = db.prepare('INSERT INTO items VALUES(?,?)');
  stmt.run(["Banana", 300]);
  stmt.run(["Apple", 150]);
  stmt.run(["Mango", 250]);
  stmt.finalize();
  
  // 데이터 조회 
  db.each("SELECT * FROM items", function (err, row) {
    console.log(row.name + ":" + row.value);
  });
});
db.close();

