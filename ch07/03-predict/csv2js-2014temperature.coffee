# Node.js로CSV를Google Charts용 JS로 변환

FILE_CSV = './SURFACE_ASOS_108_DAY_2014_2014_2015.csv';
FILE_JS  = './SURFACE_ASOS_108_DAY_2014_2014_2015.js';

fs = require 'fs'

txt = fs.readFileSync FILE_CSV, "utf-8"
lines = txt.split "\r\n"

result = [];

for v in lines
  cells = v.split ','

  if cells[0] != undefined && cells[1] != undefined
      date_s = cells[0].split("-").splice(1,2).join("-");
      temp   = parseFloat cells[1]
      result.push([date_s, temp])

json = JSON.stringify result
js = "var temperature_data = " + json;                                                                                                                                                       
fs.writeFileSync FILE_JS, js, "utf-8"
console.log "ok"