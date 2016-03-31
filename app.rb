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
    p params[:temp]
    Thermo.create(temperature: params[:temp], timestamp: Time.now, powerSave: params[:powerSave], location: params[:location])
  end

  get '/temperature' do
  	content_type :json
  	if params[:location].empty?
  		Thermo.last.to_json
  	else
    	Thermo.last(location: params[:location]).to_json
    end
  end


  # start the server if ruby file executed directly
  run! if app_file == $0
end
