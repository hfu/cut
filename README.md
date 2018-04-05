# cut
Cut NDJSON out from PostGIS database

# usage
```sh
$ git clone git@github.com:hfu/cut.git
$ cd cut
$ npm install
$ vi .env
$ node cut.js > some.ndjson
$ vi tippecanoe.sh
$ ./tippecanoe.sh # you need tippecanoe installed.
```

## .env
```.env
PGUSER=dbuser
PGHOST=database.example.com
PGPASSWORD=secretpassword
PGDATABASE=mydb
PGPORT=5432
Z=5
X=18
Y=15
TABLES=osm_planet_buildings_general osm_planet_places...
DELETES=objectid type...
```
TABLES is a space-delimited list of PostGIS table names.
DELETES is a list of property names to be deleted.

## Peripheral tools
### stat.js
make statistics on a ndjson file.
### schema.rb
create schema document from PostGIS.
### tables.rb
create a list of table names at PostGIS.
