# Animal 클래스 정의
class Animal
  # 프로퍼티 정의
  atype: "Animal"

  #생성자 정의
  constructor: (@name) ->
    # name프로퍼티는 자동으로 생성

  #메서드 정의
  print: ->
    console.log "이름은 #{@name}, 종류는 #{@atype}입니다."

# 인스턴스 생성
taro = new Animal "Taro"
taro.print()

