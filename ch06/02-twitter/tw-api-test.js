//Twitter 데이터 수집 테스트 for Node.js
var Twit=require('twit');

//본인이 발급받은 키를 입력 ★-----(※1)
var T = new Twit({
	consumer_key:'YOUR_CUNSUMER_KEY',
	consumer_secret:'YOUR_CUNSUMER_SECRET',
	access_token:'YOUR_ACCESS_TOKEN',
	access_token_secret:'YOUR_ACCESS_TOKEN_SECRET'
});

//JavaScript에 관한 글을 검색 --- (※2)
var stream = T.stream('statuses/filter',{track:'JavaScript'});

//글이 검색될 때 호출되는 함수 지정---(※3)
stream.on('tweet', function(tw){
	var text=tw.text;
	var user_name=tw.user.name;
	console.log(user_name+">"+text);
})