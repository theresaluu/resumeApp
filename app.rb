require 'sinatra'
require 'mongoid'
require 'oj'#parses JSON
require "sinatra/reloader" if development? #sinatra is web framework

Mongoid.load!("mongoid.yml")

class Doc
	include Mongoid::Document

	field :name_first, type: String
	field :name_last, type: String
	#embeds_one :street_address
end

# class StreetAddress
#   include Mongoid::Document
  
#   field :street,   type: String
  
#   embedded_in :doc
# end

# get '/' do
# 	content_type :json
# 	docs = Doc.all

# 	docs.to_json
# end

# get '/:id' do
# 	content_type :json
# 	doc = Doc.find params[:id] 

# 	doc.to_json
# end

#Post
post '/' do
	content_type :json
	data = JSON.parse(request.body.read)["resume"]#requst.body.read gives the string your need to parse
	doc = Doc.create!(data)#this creates this doc in the database
	doc.to_json
end

# Put
put '/:' do
	content_type :json
	data = JSON.parse(request.body.read)["resume"]
	doc = Doc.find params[:id]
	doc.update_attributes!(data)
	doc.to_json
end

# #Delete
# delete '/:id' do
# 	data = JSON.parse(request.body.read)[:resume]
# 	doc = Doc.find(params[:id])
# 	doc.destroy
# end


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

