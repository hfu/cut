require 'dotenv'
require 'sequel'
Dotenv.load

DB = Sequel.connect("postgres://#{ENV['PGUSER']}:#{ENV['PGPASSWORD']}" + 
  "@#{ENV['PGHOST']}:#{ENV['PGPORT']}/#{ENV['PGDATABASE']}")

print DB.tables.map{|t| (t == :spatial_ref_sys) ? '' : t.to_s}.join(' '), "\n"

