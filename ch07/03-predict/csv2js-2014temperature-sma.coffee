# Node.js로 CSV를 Google Charts용 JS로 변환
# 이동평균도 계산

FILE_CSV = './SURFACE_ASOS_108_DAY_2014_2014_2015.csv';
FILE_JS  = './SURFACE_ASOS_108_DAY_2014_2014_2015_SMA.js';

MA_RANGE = 7

fs = require 'fs'

# CSV파일 읽기
loadCSV = (filename) ->
  txt = fs.readFileSync filename, "utf-8"
  lines = txt.split "\r\n"
  # CSV 텍스트를 이차원배열로 변환
  list = []
  for v in lines
    cells = v.split ','
    if cells[0] != undefined && cells[1] != undefined
        date_s = cells[0].split("/").slice(1,3).join("/")
        temp   = parseFloat cells[1]
        list.push([date_s, temp])
  return list

# 이동 평균 계산 ------ (※1)
calcMovingAverage = (i, list, range) ->
  # 기간 결정
  m_from = i - range
  m_to   = m_from + range - 1
  # 기간이 불완전하면 0을 반환
  if m_from < 0 then return 0
  # 합계 계산
  sum = 0
  for j in [m_from .. m_to]
    sum += list[j][1]
  # 평슌 계산
  return sum / range

# 메인 처리
main = ->
  # CSV 읽기
  list = loadCSV(FILE_CSV)
  # 각행별로 이동평균을 구해 리스트에 추가  --- (※2)
  for val, index in list
    av = calcMovingAverage(index, list, MA_RANGE)
    list[index].push(av)
  # JavaScript 출력
  js = "var temperature_data = " + JSON.stringify(list)
  fs.writeFileSync FILE_JS, js, "utf-8"

main()
console.log "ok"