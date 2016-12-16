// levelDB 사용 예제 for Node.js

var levelup = require('level');
// 데이터 베이스 열기 (데이터는 JSON) --- (※1)
var opt = { valueEncoding:'json' };
var db = levelup('./testdb2', opt);

// 일괄로 값 저장--- (※2)
db.batch()
  .put('fruits!apple', {
    name: 'Apple',
    price: 300,
    color: 'red'})
  .put('fruits!orange', {
    name: 'Orange',
    price: 180,
    color: 'orange'})
  .put('fruits!banana', {
    name: 'Banana',
    price: 200,
    color: 'yellow'})
  .put('fruits!kiwi', {
    name: 'Kiwi',
    price: 220,
    color: 'green'})
  .put('snack!poteto', {
    name: 'Poteto-Snack',
    price: 340,
    color: 'brown'
  })
  .put('snack!choco', {
    name: 'Choco-Snack',
    price: 220,
    color: 'black'
  })
  .write(testKeys);

// 키 목록 획득  ---- (※3)
function testKeys() {
  console.log("keys:")
  db.createKeyStream()
    .on('data', function (key) {
      console.log(" - " + key);
    })
    .on('end', testKeyValues);
}

// 키 값 쌍을 획득---- (※4)
function testKeyValues() {
  console.log("\nkey-value-list:");
  db.createReadStream()
    .on('data', function (data) {
      var key = data.key;
      var o = data.value;
      console.log("+ key=" + data.key);
      console.log("| color=" + o.color);
      console.log("| price=" + o.price);
    })
    .on('end', testSearch);
}

// 검색 수행 ---- (※5)
function testSearch() {
  console.log('\nrange-search:');
  var opt = {
    start : "fruits!",
    end   : "fruits!\xFF"
  };
  db.createReadStream(opt)
    .on('data', function (data) {
      console.log("+ key=" + data.key);
    })
    .on('end', function () {
      console.log('ok')
    });
}
