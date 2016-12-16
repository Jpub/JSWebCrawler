// LevelDB 사용 예제 for Node.js
// 모듈 로드와 DB 오픈 ※2
var levelup = require('level');
var db = levelup('./testdb');
// 값 저장 ※2
db.put('Apple', 'red', function(err) {
    if (err) {
        console.log('Error', err);
        return;
    }
    testGet();
});
// 값 읽기 ※3
function testGet() {
    db.get('Apple', function(err, value) {
        if (err) {
            console.log('Error', err);
            return;
        }
        console.log('Apple=' + value);
        testBatch();
    });
}
// 일괄 저장 ※4
function testBatch() {
    db.batch()
        .put('Mango', 'yellow')
        .put('Banana', 'yellow')
        .put('Kiwi', 'green')
        .write(function() {
            testGet2();
        });
}
// Banana 값 읽기 
function testGet2() {
    db.get('Banana', function(err, value) {
        if (err) {
            console.log('Error', err);
            return;
        }
        console.log('Banana=' + value);
    });
}