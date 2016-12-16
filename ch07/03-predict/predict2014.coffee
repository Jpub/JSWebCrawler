# EMA 와 SMA 를 사용해서 다음 날의 평균 기온을 예측 

# 데이터 
FILE_CSV = './SURFACE_ASOS_108_DAY_2014_2014_2015.csv';
# 정수 
SMA_RANGE = 3
EMA_ALPHA = 2 / (SMA_RANGE + 1)

# 모듈 로드 
fs = require 'fs'

# 지수 평균 이동법을 계산하는 함수
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
  # 예측값 기재 
  list[i][2] = new_value
  return new_value

# 이동 평균을 계산하는 함수 
calcSimpleMovingAverage = (i, list, range) ->
  # 기간 선택 
  m_from = i - range + 1
  m_to   = i
  cnt = 0
  sum = 0
  for j in [m_from .. m_to]
    if j >= 0
      sum += list[j][1]
      cnt++
  value = sum / cnt
  # 예측값 기재 
  list[i][3] = value
  return value

# CSV 파일 읽기 
loadCSV = (filename) ->
  txt = fs.readFileSync filename, "utf-8"
  lines = txt.split "\r\n"
  # CSV텍스트를 이차원 배열로 변환
  list = []
  for v in lines
    cells = v.split ','
    if cells[0] != undefined && cells[1] != undefined
        date_s = cells[0].split("/").slice(1,3).join("/");
        temp   = parseFloat cells[1]
        list.push([date_s, temp])
  return list

# 소수점 이하를 정돈하여 출력 
fmt = (v) ->
  v = "" + (Math.round(v * 100) / 100)
  if v.indexOf(".") < 0 then v += ".00"
  v = v.replace /\.?(\d+)$/, (ma, n) ->
    n += "00"
    n = n.substr(0, 2)
    return "." + n

# 메인 처리 
main = ->
  # CSV읽기 
  list = loadCSV(FILE_CSV)
  # 각 행별로 예측값 구하기
  sum_ema = sum_sma = cnt = 0
  for v, index in list
    if index + 1 >= list.length then continue
    date_s = list[index + 1][0]
    real_v = list[index + 1][1]
    ema = calcExpMovingAverage(index, list, EMA_ALPHA)
    ema_err = ema - real_v
    sum_ema += Math.abs(ema_err)
    sma = calcSimpleMovingAverage(index, list, SMA_RANGE)
    sma_err = sma - real_v
    sum_sma += Math.abs(sma_err)
    cnt++
    console.log "+ #{date_s} 실제값 #{real_v}"
    console.log "| - ema = #{fmt(ema)} : 오차#{fmt(ema_err)}"
    console.log "| - sma = #{fmt(sma)} : 오차#{fmt(sma_err)}"
  # 오차 표시 
  console.log "---"
  ave_ema = sum_ema / cnt
  ave_sma = sum_sma / cnt
  console.log "오차EMA=#{fmt(sum_ema)} 평균=#{fmt(ave_ema)}"
  console.log "오차SMA=#{fmt(sum_sma)} 평균=#{fmt(ave_sma)}"

main()


