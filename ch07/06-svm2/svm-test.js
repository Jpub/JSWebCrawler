//node-svm을 사용하고 인식
//학습 데이터---------(※1)
var train_data = [
  //[[데이터 배열], 클래스]
	[[0, 0], 0],
	[[0, 1], 1],
	[[1, 0], 1],
	[[1, 1], 0]
];

//모듈 로드----(※2)
var svm = require('node-svm');

//객체 생성-----(※3)
var clf = new svm.CSVC();

clf.train(train_data)//데이터 학습
   .done(doTest);//테스트 실행

function doTest(){
	//test1---(※4)
	var v=clf.predictSync([1, 0]);
	console.log("[1, 0]=>"+v);

	//test2---(※5)
	clf.predict([1, 1]).then(
		function(predicted) {
			console.log("[1, 1]=>"+predicted);
		}
	);
}
