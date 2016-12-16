// YouTube 검색 for Node.js

var Youtube = require('youtube-node');
var youtube = new Youtube();

// API지 지정 (본인 것으로 교체) --- (※1)
youtube.setKey('본인 것으로 교체');

// 검색 수행  
var keyword = 'cat';
var limit = 5;

// 조건 설정 ----- (※2)
youtube.addParam('order', 'rating'); // 평점 순으로 정렬
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈

youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }
  
  // 영상의 URL 표시 -------- (※3)
  var items = result["items"];
  for (var i in items) {
    var it = items[i];
    var title = it["snippet"]["title"];
    var video_id = it["id"]["videoId"];
    var url = "https://www.youtube.com/watch?v=" + video_id;
    console.log("+ " + title);
    console.log("| " + url);
    console.log("----------------");
  }
});




