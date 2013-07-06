require 'sinatra'
require 'mongoid'
require 'oj'#parses JSON
require "sinatra/reloader" if development? #sinatra is web framework

Mongoid.load!("mongoid.yml")

#would like and explanation of this module
module Mongoid
  module Serialization
    def serializable_hash_with_id(options = nil)
      json = serializable_hash_without_id options
      json['id'] = json['_id'] if json.has_key? '_id'
      json
    end
    alias_method_chain :serializable_hash, :id
  end
end
##copied above from app_old.rb but need explanation
class Doc
	include Mongoid::Document

	field :name_first,   type: String
	field :name_last,    type: String
	field :linked_in,    type: String
  	field :website,    type: String
  	field :twitter,    type: String
	
	embeds_one 	:address 
	embeds_many :schools
	embeds_many :experiences
	embeds_many :accomplishments
end

class Address
   include Mongoid::Document
  
   field :street,   type: String
   field :city,		type: String
   field :state, 	type: String
   field :zip_code, type: String

   embedded_in :doc
end

class School
  include Mongoid::Document
  
  field :name,              type: String
  field :degree,            type: String
  field :major,             type: String
  field :start_month_year,  type: String
  field :end_month_year,    type: String
  
  embedded_in :doc
end

class Experience
  include Mongoid::Document
  
  field :organization,      type: String
  field :project,           type: String
  field :role,              type: String
  field :start_month_year,  type: String
  field :end_month_year,    type: String
  field :location,          type: String
  field :responsibilities,  type: Array
  
  embedded_in :doc
end

class Skill
  include Mongoid::Document
  
  field :title,      type: String
  field :category,   type: String
  field :experience, type: Integer
  
  embedded_in :doc
end

class Accomplishment
  include Mongoid::Document
  
  field :title,       type: String
  field :month_year,  type: String
  field :description, type: String
  
  embedded_in :doc
end

get '/' do
	content_type :json
	docs = Doc.all

	docs.to_json
end

get '/:id' do
	content_type :json
	doc = Doc.find params[:id] 

	doc.to_json
end

#Post
post '/:id' do
	content_type :json
	data = JSON.parse(request.body.read)["resume"]#requst.body.read gives the string your need to parse
	doc = Doc.create!(data)#this creates this doc in the database
	doc.to_json
end

# Put
put '/:id' do
	data = JSON.parse(request.body.read)["resume"]
	doc = Doc.find params[:id]
	doc.update_attributes!(data)
end

# #Delete
delete '/:id' do
	doc = Doc.find(params[:id]).destroy
end


#implement POST, PUT, and DELETE

#javascript###############################
#var data = {"resume":{"hame_first":"Bob"}}
#
#ajax({
#	method: 'POST',
#	url:'/',
#	data: JSON.stringify(data)
#	});
##########################################
#create
   # data = JSON.parse(request.body.read)["resume"]
   # id = Doc.create!(data)._id

#update
	# data = JSON.parse(request.body.read)["resume"]
   #doc = Doc.find params[:id]
   #doc.update_attributes!(data)

#destroy
#data = JSON.parse(request.body.read)["resume"]
#doc.destroy

