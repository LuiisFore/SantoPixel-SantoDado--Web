require 'sinatra'
require 'json'

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  erb :index
end

get '/SantoDado' do
  erb :SantoDado
end
