
/**
 * Module dependencies.
 */

var express = require('express'),
    requirejs = require('requirejs'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    stylus = require('stylus'),
    app = express();

// pass Node's require function to requirejs before setting other dependencies
requirejs.config({ 
  nodeRequire : require,
  "paths" : {
    "jquery" : "http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min"
  }
});

// requirejs(["./public/javascripts/main"]);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/exercise', routes.exercise);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
