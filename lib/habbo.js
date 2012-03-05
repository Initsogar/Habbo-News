var HabboNews = function(hotel){
	console.log('HabboNews class loaded...');

	//El hotel por defecto es ES
	if(!hotel)
		hotel = 'es';
	HabboNews.prototype.hotel = hotel;
	HabboNews.prototype.instance = this;
}

HabboNews.prototype = {
	request: require('request'),
	id: '123',
	temp: '',
	factory: function(){
		return this.instance;
	},
	connect: function(path, callback){
		var response = '';
		if(!path) path = '/articles';
		var req = this.request('http://www.habbo.'+this.hotel+path, function(error, response, body){
			if(!error && response.statusCode == 200){
				callback(response);
			}
		});
	},

	getID: function(){
		return this.id;
	},

	getHotel: function(){
		return this.hotel;
	},

	getLastArticle: function(callback){
		var hola;
		this.connect('/articles', function(data){
			var titulo, descripcion, enlace;

			//Titulo
			s = data.body.split('<meta property="og:title" content="');
			s = s[1].split('" />');
			titulo = s[0];

			//Descripcion
			s = data.body.split('<meta property="og:description" content="');
			s = s[1].split('" />');
			descripcion = s[0];

			//Enlace
			s = data.body.split('<meta property="og:url" content="');
			s = s[1].split('" />');
			enlace = s[0];

			callback(titulo, descripcion, enlace);
		});
	},

};

var Habbo = function(){console.log('Habbo class loaded');}

module.exports = Habbo;
module.exports.HabboNews = HabboNews;