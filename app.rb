require 'sinatra/base'

class Thermostat < Sinatra::Base



set :public_folder, 'public'
  get '/' do
    redirect '/index.html'
  end

  post '/temperature' do
    puts "I received something"
    p params[:temp]
  end

  get '/temperature' do
    # receiv
  end


  # start the server if ruby file executed directly
  run! if app_file == $0
end
