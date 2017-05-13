var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

/**
 *后台管理
 */

//添加文章
router.post('/addArticle',auth.hasRole('admin'),controller.addArticle);

//获取文章列表
router.get('/getArticleList',auth.hasRole('admin'),controller.getArticleList);

//更新文章
router.put('/updateArticle/:id', auth.hasRole('admin'), controller.updateArticle);

//删除文章
router.delete('/deleteArticle/:id', auth.hasRole('admin'), controller.destroy);

//获取单个文章
router.get('/getArticle/:id', auth.hasRole('admin'), controller.getArticle);

//设置文章是否可评论
router.post('/changeComment/:id', auth.hasRole('admin'), controller.changeComment);

//根据条件查询文章
router.post('/searchArticle', auth.hasRole('admin'), controller.searchArticle);
//根据用户id查询
router.get('/getArticleByUserId/:id', controller.getArticleByUserId);

//发布文章，定时发布
//我的文章，已发布，草稿，回收站，分类，标签

/**
 *前台获取
 */
router.get('/getImageList',controller.getImageList);
router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/getFrontArticleCount',controller.getFrontArticleCount);
//获取首页图片
router.get('/getIndexImage',controller.getIndexImage);
//用户喜欢文章
router.put('/:id/toggleLike',auth.isAuthenticated(),controller.toggleLike);
//获取上一篇和下一篇
router.get('/getPrenext/:id',controller.getPrenext);
module.exports = router;
