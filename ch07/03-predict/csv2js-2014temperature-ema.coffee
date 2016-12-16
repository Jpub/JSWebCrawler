# Node.js로 CSV를 Google Charts용 JS로 변환
# 지수평활법도 계산

FILE_CSV = './SURFACE_ASOS_108_DAY_2014_2014_2015.csv';
FILE_JS  = './SURFACE_ASOS_108_DAY_2014_2014_2015_EMA.js';

EMA_RANGE = 10
EMA_ALPHA = 2 / (EMA_RANGE + 1)

fs = require 'fs'

# 지수평활법 계산 함수 ---- (※1)
calcExpMovingAverage = (i, list, alpha) ->
  # 이번 회 값
  value = list[i][1]
  # 이전 회 값
  if i == 0
    last_value = value
  else
    last_value = list[i - 1][2]
  # 예측값 계산
  new_value = last_value + alpha * (value - last_value)
  # 예측값 추가
  list[i][2] = new_value
  return new_value

# CSV 파일 읽기
loadCSV = (filename) ->
  txt = fs.readFileSync filename, "utf-8"
  lines = txt.split "\r\n"
  # CSV텍스트를 이차원배열로 변환
  list = []
  for v in lines
    cells = v.split ','
    if cells[0] != undefined && cells[1] != undefined
        date_s = cells[0].split("-").slice(1,3).join("-");
        temp   = parseFloat cells[1]
        list.push([date_s, temp])
  return list

# 메인 처리
main = ->
  # CSV읽기
  list = loadCSV(FILE_CSV)
  # 각 행별로 EMA 구하기 --- (※2)
  for v, index in list
    av = calcExpMovingAverage(index, list, EMA_ALPHA)
    console.log list[index][0], list[index][1], av
  # JavaScript 파일 출력
  js = "var temperature_data = " + JSON.stringify(list)
  fs.writeFileSync FILE_JS, js, "utf-8"

main()
console.log "ok"