process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');

mongoose.connect(config.mongo.uri, config.mongo.options);             // 连接数据库.
var modelsPath = path.join(__dirname, 'model');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});
mongoose.Promise = global.Promise;                                    //mongoose promise 风格
if(config.seedDB) { require('./config/seed'); }                       // 初始化数据

var app = express();
app.use('/avatar', express.static(path.join(__dirname, '/avatar')));  //静态资源
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: config.session.secrets,
    resave: false,
    saveUninitialized: false,
    cookie: config.session.cookie
}));
require('./routes')(app);                                       //api路由

if ('development' === config.env) {
    app.use(errorHandler());
}else{
    app.use(function (err, req, res, next) {
        return res.status(500).send();
    });
}

// Start server
app.listen(config.port, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
