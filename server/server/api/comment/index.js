'use strict';

var express = require('express');
var controller = require('./comment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();
//后台管理
router.delete('/delComment/:id',auth.hasRole('admin'),controller.delComment);
router.put('/:id/delReply', auth.hasRole('admin'), controller.delReply);
router.get('/getAllCommentList',auth.hasRole('admin'),controller.getAllCommentList);

//前台获取
router.post('/addNewComment',auth.isAuthenticated(),controller.addNewComment);
router.get('/getCommentList/:id',controller.getCommentList);
router.post('/addNewReply/:id',auth.isAuthenticated(),controller.addNewReply);
module.exports = router;