const reader = require('readline').createInterface({ input: process.stdin })
let stat = {}
let count = 0
reader.on('line', line => {
  const json = JSON.parse(line)
  const layer = json.tippecanoe.layer
  const type = json.geometry.type
  count += 1
  if(stat[layer]) {
    if(stat[layer][type]) {
      stat[layer][type] += 1
    } else {
      stat[layer][type] = 1
    }
  } else {
    stat[layer] = {}
    stat[layer][type] = 1
  }
  if (count % 1000 === 0) console.log(stat)
})
process.stdin.on('end', () => {
  console.log(stat)
})
