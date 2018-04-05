require('dotenv').config()
const { Pool, Query } = require('pg')
const tilebelt = require('@mapbox/tilebelt')
const z = parseInt(process.env.Z)
const x = parseInt(process.env.X)
const y = parseInt(process.env.Y)
const tables = process.env.TABLES.split(' ')
const geom = process.env.GEOM
const pool = new Pool({max: 50})
const bbox = tilebelt.tileToBBOX([x, y, z])

const cut = async function (layer) {
  const client = await pool.connect()
  let q = `SELECT ST_AsGeoJSON(${geom})::json AS g, * FROM ${layer}`
  q += ` WHERE ${geom} && ST_MakeBox2D(` +
    `ST_MakePoint(${bbox[0]}, ${bbox[1]}), ` +
    `ST_MakePoint(${bbox[2]}, ${bbox[3]}))`
  await client.query(new Query(q))
    .on('row', row => {
      let f = {
        type: 'Feature',
        geometry: row.g,
        tippecanoe: {layer: layer}
      }
      delete row.g
      delete row[geom]
      f.properties = row
      console.log(JSON.stringify(f))
    })
    .on('end', () => {
      client.end()
    })
}

for (const layer of tables) {
  cut(layer)
}
