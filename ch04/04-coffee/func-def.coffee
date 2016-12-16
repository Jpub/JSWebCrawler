# 문자열을 delimiter로 나눠서 반환
splitStr = (str, delimiter = ",") ->
  str.split(delimiter)

# delimiter를 생략
s1 = "1,2,3"
console.log splitStr(s1)

# 명시적으로 delimiter지정
s2 = "a:b:c"
console.log splitStr(s2, ":")


