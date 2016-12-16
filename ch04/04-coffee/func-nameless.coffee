counter = 5 
setInterval ->
  console.log counter
  counter--
  if counter is 0
    process.exit()
,1000

