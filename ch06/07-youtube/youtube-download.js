// YouTube 검색 for Node.js
// 모듈 로드 
var exec = require('child_process').exec;
var Youtube = require('youtube-node');
var youtube = new Youtube();

// API 지정 (본인 것으로 교체) --- (※1)
youtube.setKey('본인 것으로 교체');

// 검색 수행  
var keyword = 'cat';
var limit = 2;

// 조건 설정 ----- (※2)
youtube.addParam('order', 'viewCount'); // 평점 순으로 정렬
youtube.addParam('type', 'video');
youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈
youtube.addParam('videoDuration', 'short'); // 짧은 동영상 검색 

youtube.search(keyword, limit, function(err, result) {
  if (err) { console.log(err); return; }
  
  // 영상의 URL 표시 -------- (※3)
  var items = result["items"];
  for (var i in items) {
    var it = items[i];
    var title = it["snippet"]["title"];
    var video_id = it["id"]["videoId"];   
    console.log(title, video_id);
    // 다운로드 수행 
    downloadVideo(video_id);
  }
});

// youtube-dl 사용하여 다운로드 ------ (※3)
function downloadVideo(video_id) {
  var url = "https://www.youtube.com/watch?v=" + video_id;
  exec('youtube-dl ' + url, function(err, stdout, stderr) {
    if (err) { console.log(err); return; }
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
}