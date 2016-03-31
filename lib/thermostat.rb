require 'data_mapper'
require 'dm-postgres-adapter'

class Thermo

	include DataMapper::Resource

	property :id, Serial
  property :temperature, String
  property :timestamp, DateTime

end
DataMapper.setup(:default, ENV['DATABASE_URL'] || "postgres://localhost/thermostat_#{ENV['RACK_ENV']}")
DataMapper.finalize
DataMapper.auto_upgrade!