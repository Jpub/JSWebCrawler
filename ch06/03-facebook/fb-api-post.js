// Facebook 에 글 올리기 for Node.js

// 모듈 로드 
var FB = require('fb');

// 다음 값을 발급받은 토큰으로 변경할 것 ------ (※1)
FB.setAccessToken('YOUR_ACCESS_TOKEN');

// 임의의 메시지를 포스트한다.  ------- (※2)
var msg="API를 사용한 Posting!";

FB.api('me/feed', 'post', {message: msg}, function(res) {
  if (!res) {
    console.log("error"); return;
  }
  console.log(res);
});
