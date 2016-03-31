ENV["RACK_ENV"] ||= "development"
require 'sinatra/base'
require './lib/thermostat'
require 'json'

class Thermostat < Sinatra::Base



set :public_folder, 'public'
  get '/' do
    redirect '/index.html'
  end

  post '/temperature' do
    puts "I received something"
    anything = Thermo.create(temperature: params[:temp], timestamp: Time.now)
    p params[:temp]
    p anything
  end

  get '/temperature' do
  	content_type :json
  	{ non: "boo", dud: "hell"}.to_json

  end


  # start the server if ruby file executed directly
  run! if app_file == $0
end
