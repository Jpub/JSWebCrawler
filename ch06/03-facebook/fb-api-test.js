//Facebook for Node.js
//모듈 로드
var FB=require('fb');

//본인이 획득한 Access Token 정보 입력------(※1)
FB.setAccessToken('YOUR_ACCESS_TOKEN');

//나의 포스트를 취득하여 표시-----(※2)
FB.api('me/feed','get',{}, function(feed){
	if(!feed){
		console.log("error");return;
	}
	var data=feed.data;
	for(var i in data){
		var row=data[i];
		console.log(row);
		console.log("----------------------");
	}
});
