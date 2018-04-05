require('dotenv').config()
const { Pool, Query } = require('pg')
const tilebelt = require('@mapbox/tilebelt')
const z = parseInt(process.env.Z)
const x = parseInt(process.env.X)
const y = parseInt(process.env.Y)
const tables = process.env.TABLES.split(' ')

const main = async function() {
  const pool = new Pool()
  const bbox = tilebelt.tileToBBOX([x, y, z])
  for(const layer of tables) {
    const client = await pool.connect()
    let q = `SELECT ST_AsGeoJSON(geomtype)::json AS g, * FROM ${layer}`
    q += ` WHERE geomtype && ST_MakeBox2D(` + 
      `ST_MakePoint(${bbox[0]}, ${bbox[1]}), ` + 
      `ST_MakePoint(${bbox[2]}, ${bbox[3]}))`
    client.query(new Query(q))
      .on('row', row => {
        let f = {
          type: 'Feature',
          geometry: row.g,
          tippecanoe: {layer: layer}
        }
        delete row.g
        delete row.geomtype
        f.properties = row
        console.log(JSON.stringify(f))
      })
      .on('end', () => {
        client.end()
      })
  }
}
main()
