(function() {
  var app, express, stylus, sys;

  express = require('express');

  stylus = require('stylus');

  sys = require('sys');

  app = express.createServer();

  app.use(express.static(__dirname + '/public'));

  console.log("" + __dirname);

  app.use(stylus.middleware({
    src: __dirname + '\views',
    dest: __dirname + '\public\css',
    compile: function(str, path, fn) {
      return stylus(str).set('filename', path).set('compress', true);
    }
  }));

  app.set('view engine', 'jade');

  app.get('/', function(request, response) {
    return response.render('index', {
      pageTitle: 'Habbo News'
    });
  });

  app.get('/test', function(request, response) {
    var habbo, heyYou, news;
    habbo = require(__dirname + '/lib/habbo');
    news = new habbo.HabboNews('es');
    heyYou = '';
    return news.getLastArticle(function(titulo, descripcion, enlace) {
      return response.render('test', {
        layout: 'test_layout',
        pageTitle: 'Habbo News',
        noticia: {
          titulo: titulo,
          descripcion: descripcion,
          enlace: enlace
        }
      });
    });
  });

  app.listen(3000);

  console.log("Express server listening on port %d", app.address().port);

}).call(this);
