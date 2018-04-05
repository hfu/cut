require 'dotenv'
require 'sequel'
Dotenv.load

DB = Sequel.connect("postgres://#{ENV['PGUSER']}:#{ENV['PGPASSWORD']}" + 
  "@#{ENV['PGHOST']}:#{ENV['PGPORT']}/#{ENV['PGDATABASE']}")

r = DB.tables.map{|t| {:name => t, :count => DB[t].count, 
  :schema => DB.schema(t).map{|v| [v[0], v[1][:db_type]]}}}

r.each{|v|
  print "## #{v[:name]} (#{v[:count]})\n"
  v[:schema].each {|w| print "  #{w.join("\t")}\n"}
}

