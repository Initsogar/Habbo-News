express = require 'express'
stylus = require 'stylus'

app = express.createServer()
 
app.use express.static(__dirname + '/public')

console.log "#{__dirname}"

app.use stylus.middleware
	src: __dirname+'\views'
	dest: __dirname+'\public\css'
	compile: (str, path, fn) ->
  	stylus(str).set('filename', path).set('compress', true)

app.set 'view engine', 'jade'
 
app.get '/', (request, response) ->
  response.render 'index', { pageTitle: 'Habbo News' }
 
app.listen 3000
console.log "Express server listening on port %d", app.address().port