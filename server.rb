# frozen_string_literal: true

require 'sinatra/json'

Dotenv.load

# Server class for routing and request handeling.
class Server < Sinatra::Base
  register Sinatra::Reloader

  def initialize
    super
  end

  configure do
    enable :cross_origin
  end

  options '*' do
    response.headers['Allow'] = 'GET, PUT, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token'
    response.headers['Access-Control-Allow-Origin'] = '*'
    200
  end

  set :protection, false

  APIKEY = ENV['APIKEY']
  APIKEYDEP = ENV['APIKEYDEP']

  before do
    content_type :json
    headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => %w[OPTIONS GET POST]
  end

  get '/' do
    content_type :html
    File.read('index.html')
  end

  get '/stations?' do
    temp = params
    response = HTTParty.get "https://api.resrobot.se/v2/location.name.json?key=#{APIKEY}&input=#{temp['input']}"
    [200, {}, response.body]
  end

  get '/departures/:id' do
    response = HTTParty.get "https://api.resrobot.se/v2/departureBoard.json?key=#{APIKEYDEP}&id=#{params['id']}"
    [200, {}, response.body]
  end
end
