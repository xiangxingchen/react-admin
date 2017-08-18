var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

/**
 *后台管理
 */

//添加文章
router.post('/addArticle',auth.hasRole('user'),controller.addArticle);

//获取文章列表
router.get('/getArticleList',controller.getArticleList);

//更新文章
router.put('/updateArticle/:id', auth.hasRole('user'), controller.updateArticle);

//删除文章
router.delete('/deleteArticle/:id', auth.hasRole('user'), controller.destroy);
// destroyAllSelect
router.post('/destroyAllSelect', auth.hasRole('user'), controller.destroyAllSelect);

//获取单个文章
router.get('/getArticle/:id', auth.hasRole('user'), controller.getArticle);

//设置文章是否可评论
router.post('/changeComment/:id', auth.hasRole('user'), controller.changeComment);

//根据条件查询文章
router.post('/searchArticle', auth.hasRole('user'), controller.searchArticle);
//根据用户id查询
router.get('/getArticleByUserId/:id', controller.getArticleByUserId);

//发布文章，定时发布
//我的文章，已发布，草稿，回收站，分类，标签

/**
 *前台获取
 */
router.get('/getImageList',controller.getImageList);
router.get('/getFrontArticleList',controller.getFrontArticleList);
router.get('/getArchivesArticle',controller.getArchivesArticle);
router.get('/getFrontArticleCount',controller.getFrontArticleCount);
router.get('/getFrontArticle/:id',controller.getFrontArticle);
//获取首页图片
router.get('/getIndexImage',controller.getIndexImage);
//用户喜欢文章
router.put('/toggleLike/:id',auth.isAuthenticated(),controller.toggleLike);
//获取上一篇和下一篇
router.get('/getPrenext/:id',controller.getPrenext);
module.exports = router;
