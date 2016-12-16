sum = (args...) ->
  total = 0
  for arg in args
    total += arg
  total

console.log sum 1,2,3
console.log sum 3,4,5


