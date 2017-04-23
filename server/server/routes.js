var express = require('express');
var path = require('path');

module.exports = function (app) {

    app.use('/api/auth', require('./auth'));
    app.use('/api/users', require('./api/user'));
    app.use('/api/file', require('./api/file'));
    app.use('/api/tags',require('./api/tags'));
    app.use('/api/article', require('./api/article'));
    app.use('/api/comment', require('./api/comment'));
    app.use('/api/logs',require('./api/logs'));
    app.use('/*', function (req, res, next) {
        return res.json({status: 'success', data: '请求错误'});
    })
};
