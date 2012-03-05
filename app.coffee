express = require 'express'
stylus = require 'stylus'
sys = require 'sys'

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
  response.render 'index', { pageTitle: 'Habbo News'}

app.get '/test', (request, response) ->
  #Habbo
  habbo = require __dirname + '/lib/habbo'
  news = new habbo.HabboNews('es')
  heyYou = '';
  news.getLastArticle (titulo, descripcion, enlace) ->
    response.render 'test', {
      layout:'test_layout',
      pageTitle: 'Habbo News',
      noticia:{
        titulo:titulo,
        descripcion:descripcion,
        enlace:enlace}
      }
 
app.listen 3000

console.log "Express server listening on port %d", app.address().port