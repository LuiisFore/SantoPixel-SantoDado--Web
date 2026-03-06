# 1. Carga las gemas 
require 'bundler'
Bundler.require

# 2. Carga tu archivo principal
require './app' 

# 3. Arranca la aplicación
run Sinatra::Application