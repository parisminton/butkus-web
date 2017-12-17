var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    stylus = require('stylus'),
    // fav = require('serve-favicon'),
    morgan = require('morgan'),
    bodyparser = require('body-parser'),
    mo = require('method-override'),
    errorhandler = require('errorhandler'),
    app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.use(fav());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(mo());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

app.get('/', routes.index.read);

app.get('/log', routes.log.read);
app.post('/log', routes.log.update);

app.get('/exercises', routes.exercises.read);
app.post('/exercises', routes.exercises.update);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
