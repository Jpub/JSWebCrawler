// 마르코프 체인으로 문장을 요약
var SENTENCE_COUNT = 3; // 3개의 문장을 생성
var Mecab = require('./mecab-mod.js');
var mecab = new Mecab();
var fs = require('fs');

// 샘플 텍스트 읽기
var text = fs.readFileSync("sample.txt", "utf-8");

// 형태소 분석하여 문장 생성 ---- (※1)
mecab.parse(text, function(items) {
  var dic = makeDic(items);
  //console.log(dic);
  makeSentence(dic);
});

// 마르코프 연쇄를 위한 사전 작성 ----- (※2)
function makeDic(items) {
  var words = ["@"];
  var dic = {};
  for (var i in items) {
    var item = items[i];
    var word = item[0];//하나의 형태소
    var pos = item[1];
    //console.log(word +  " " + pos);
    if (word == "" || word == "EOS") continue;

    words.push(word);

    //3개를 모으기
    if (words.length < 3)
        continue;
    if (words.length > 3) {
        words.splice(0, 1);//배열의 0번째에서 1개의 아이템 삭제
    }
    setWord3(dic, words);//3개의 단어 등록

    if (word == ".") {
      words = ["@"];//문장의 시작은 [@, 단어1, 단어2] 형태로 등록
      continue;
    }
  }

  return dic;
}

function setWord3(dic, words3) {
  var word1 = words3[0], word2 = words3[1], word3 = words3[2];
  if (dic[word1] == undefined) dic[word1] = {};
  if (dic[word1][word2] == undefined) dic[word1][word2] = {};
  if (dic[word1][word2][word3] == undefined) dic[word1][word2][word3] = 0;
  dic[word1][word2][word3]++;
}

// 사전을 기반으로 문장 생성 ---- (※3)
function makeSentence(dic) {
  for (var i = 0; i < SENTENCE_COUNT; i++) {
    var ret = [];

    //문장을 시작하는 단어 리스트
    var startWordList = dic["@"];
    if (!startWordList) continue;

    //첫단어 선택
    var word1 = choiceWord(startWordList);

    //두번째 단어 선택
    var word2 = choiceWord(startWordList[word1]);

    ret.push(word1);
    ret.push(word2);

    for (;;) {
      //마침표를 만날 때까지 2개의 선택한 단어를 기반으로 세번째 단어를 선택.
      var word3 = choiceWord(dic[word1][word2]);
      ret.push(word3);
      if (word3 == ".") break;

      //2개의 단어 갱신
      word1 = word2, word2 = word3;
    }
    console.log(ret.join(""));
  }
}

// 키 목록 생성
function objKeys(obj) {
  var r = [];
  for (var i in obj) {
    r.push(i);
  }
  return r;
}

//키의 목록에서 랜덤하게 선택
function choiceWord(wordList) {
  var keys = objKeys(wordList);
  var rndIndex = rnd(keys.length);
  return keys[rndIndex];
}

function rnd(num) {
  return Math.floor(Math.random() * num);
}
