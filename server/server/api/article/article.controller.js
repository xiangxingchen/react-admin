var _ = require('lodash');
var mongoose = require('mongoose');
var schedule = require("node-schedule");
var Article = mongoose.model('Article');
var User = mongoose.model('User');
var Logs = mongoose.model('Logs');
var Comment = mongoose.model('Comment');
var qiniuHelper = require('../../util/qiniu');
var path = require('path');
var config = require('../../config/env');
var Promise = require("bluebird");
var tools = require('../../util/tools');
var redis = require('../../util/redis');
const cookies=[];

//添加博客
exports.addArticle = function (req, res, next) {
    const user = req.user;
    console.log(req.body);
    var content = req.body.content;
    var title = req.body.title;
    var status = req.body.status;
    var publish_time = req.body.publish_time;

    var error_msg;
    if (!title) {
        error_msg = '标题不能为空.';
    } else if (!content) {
        error_msg = '内容不能为空.';
    } else if (!user) {
        error_msg = '验证有问题.';
    }
    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }
    //将图片提取存入images,缩略图调用
    req.body.images = tools.extractImage(content);
    req.body.author_id = new mongoose.Types.ObjectId(user._id);
    req.body.author = user.nickname;

    return Article.createAsync(req.body).then(function (result) {
        Logs.createAsync({
            uid:user._id,
            name:user.nickname,
            content:user.nickname+'添加了文章'+title,
            type:'article'
        });
        if(Number(status)===2){
            timeRelease(result._id,publish_time);
        }
        return res.status(200).json({success: true, article_id: result._id});
    }).catch(function (err) {
        return next(err);
    });
}
//后台获取博客列表
exports.getArticleList = function (req, res, next) {
    var currentPage = (parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 1;
    var itemsPerPage = (parseInt(req.query.limit) > 0) ? parseInt(req.query.limit) : 10;
    var startRow = (currentPage - 1) * itemsPerPage;

    var sortName = String(req.query.sortName) || "publish_time";
    var sortOrder = req.query.sortOrder;
    if (sortOrder === 'false') {
        sortName = "-" + sortName;
    }

    Article.find()
        .skip(startRow)
        .limit(itemsPerPage)
        .sort({updated: -1})
        .exec().then(function (ArticleList) {
        return Article.countAsync().then(function (count) {
            return res.status(200).json({data: ArticleList, count: count, currentPage: currentPage});
        });
    }).then(null, function (err) {
        return next(err);
    });
};
//获取轮播文章
exports.getImageList = function (req, res, next) {
    Article.find({status: {$gt: 0},'images.0': {$exists: true}})
        .sort({comment_count: -1})
        .exec().then(function (ArticleList) {
        return res.status(200).json({data: ArticleList.slice(0,3)});
    }).then(null, function (err) {
        return next(err);
    });
}

//删除博客(连同这篇文章的评论一起删除.)
exports.destroy = function (req, res, next) {
    const user = req.user;
    var id = req.params.id;
    Article.findByIdAndRemoveAsync(id).then(function (article) {
        Logs.createAsync({
            uid:user._id,
            name:user.nickname,
            content:user.nickname+'删除了文章'+article.title,
            type:'article'
        });
        return Comment.removeAsync({aid: id}).then(function () {
            return res.status(200).send({success: true});
        });
    }).catch(function (err) {
        return next(err);
    });
}
//更新博客
exports.updateArticle = function (req, res, next) {
    const user = req.user;
    var id = req.params.id;
    if (req.body._id) {
        delete req.body._id;
    }
    var content = req.body.content;
    var title = req.body.title;
    var error_msg;
    if (!title) {
        error_msg = '标题不能为空.';
    } else if (!content) {
        error_msg = '内容不能为空.';
    }
    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }
    //将图片提取存入images,缩略图调用
    req.body.images = tools.extractImage(content);
    req.body.updated = new Date();
    if (req.body.isRePub) {
        req.body.publish_time = new Date();
    }

    Article.findByIdAndUpdateAsync(id, req.body, {new: true}).then(function (article) {
        Logs.createAsync({
            uid:user._id,
            name:user.nickname,
            content:user.nickname+'修改了文章'+article.title,
            type:'article'
        });
        return res.status(200).json({success: true, id: article._id});
    }).catch(function (err) {
        return next(err);
    });
}
//获取单篇博客
exports.getArticle = function (req, res) {
    var id = req.params.id;
    var cookie = req.cookies;
    console.log(req.cookies, req.session);
    Article.findOne({_id: id}).populate({
        path: 'author_id',
        select: 'nickname avatar'
    }).exec().then(function (article) {
        // if(cookie && !_.some(cookies,function(id){ return id === cookie})){
        //     cookie = new Date().getTime();
        //     cookies.push(cookie);
        //     Article.findByIdAndUpdateAsync(id,{visit_count:(article.visit_count+1)})
        //         .populate({
        //             path: 'author_id',
        //             select: 'nickname avatar'
        //         }).exec().then(function (a) {
        //         console.log('访问量加一',cookies, cookie);
        //         res.cookie('id', cookie, { maxAge: 900000, httpOnly: true }).status(200).json({data: a});
        //     }).catch(function (err) {
        //         return next(err);
        //     });
        // } else{
            return res.status(200).json({data: article});
        // }
    }).then(null, function (err) {
        console.log(err)
        return res.status(500).send();
    });
}

//禁止评论
exports.changeComment = function (req, res, next) {
    const user = req.user;
    var id = req.params.id;
    var checked = req.body.checked;
    Article.findByIdAndUpdateAsync(id, {allow_comment: checked}, {new: true}).then(function (article) {
        Logs.createAsync({
            uid:user._id,
            name:user.nickname,
            content:user.nickname+'修改了文章评论设置'+article.title,
            type:'article'
        });
        Comment.find({aid:id}).then((comments) => {
            comments.map(comment=>{
                Comment.update({_id:comment._id},{allow_comment:checked}).then(c=>{
                    console.log(c);
                });
            });
        });
        return res.status(200).json({success: true, id: article._id});
    }).catch(function (err) {
        return next(err);
    });
}
//条件查询
exports.searchArticle = function (req, res, next) {
    const search = req.body.search; //从URL中传来的 keyword参数
    const reg = new RegExp(search, 'i') //不区分大小写
    Article.find({
        $or: [ //多条件，数组
            {title: {$regex: reg}},
            {author: {$regex: reg}},
            {author_id: {$regex: reg}}
        ]
    }).sort('updated').then(function (article) {
        return res.status(200).json({success: true, data: article});
    }).catch(function (err) {
        return next(err);
    });
}
//根据用户id查询
exports.getArticleByUserId = function (req, res, next) {
    const id = req.params.id; //从URL中传来的 keyword参数
    Article.find({author_id:id}).sort('updated').then(function (article) {
        return res.status(200).json({success: true, data: article});
    }).catch(function (err) {
        return next(err);
    });
}

//前台获取博客数量
exports.getFrontArticleCount = function (req, res, next) {
    var condition = {status: {$gt: 0}};
    if (req.query.tagId) {
        //tagId = new mongoose.Types.ObjectId(tagId);
        var tagId = String(req.query.tagId);
        condition = _.defaults(condition, {tags: {$elemMatch: {$eq: tagId}}});
    }
    Article.countAsync(condition).then(function (count) {
        return res.status(200).json({success: true, count: count});
    }).catch(function (err) {
        return next(err);
    })
}
//前台获取博客列表
exports.getFrontArticleList = function (req, res, next) {
    var currentPage = (parseInt(req.query.currentPage) > 0) ? parseInt(req.query.currentPage) : 1;
    var itemsPerPage = (parseInt(req.query.itemsPerPage) > 0) ? parseInt(req.query.itemsPerPage) : 10;
    var startRow = (currentPage - 1) * itemsPerPage;
    var sort = String(req.query.sortName) || "publish_time";
    sort = "-" + sort;
    var condition = {status: {$gt: 0}};
    if (req.query.tagId) {
        //tagId = new mongoose.Types.ObjectId(tagId);
        var tagId = String(req.query.tagId);
        condition = _.defaults(condition, {tags: {$elemMatch: {$eq: tagId}}});
    }
    Article.find(condition)
        .select('title images visit_count comment_count like_count publish_time')
        .skip(startRow)
        .limit(itemsPerPage)
        .sort(sort)
        .exec().then(function (list) {
        return res.status(200).json({data: list});
    }).then(null, function (err) {
        return next(err);
    });
}
//前台获取上一篇和下一篇
exports.getPrenext = function (req, res, next) {
    var id = req.params.id;
    var sort = String(req.query.sortName) || "publish_time";
    var preCondition, nextCondition;
    preCondition = {status: {$gt: 0}};
    nextCondition = {status: {$gt: 0}};
    if (req.query.tagId) {
        //tagId = new mongoose.Types.ObjectId(tagId);
        var tagId = String(req.query.tagId);
        preCondition = _.defaults(preCondition, {tags: {$elemMatch: {$eq: tagId}}});
        nextCondition = _.defaults(nextCondition, {tags: {$elemMatch: {$eq: tagId}}});
    }
    Article.findByIdAsync(id).then(function (article) {
        //先获取文章,
        if (sort === 'visit_count') {
            preCondition = _.defaults(preCondition, {'_id': {$ne: id}, 'visit_count': {'$lte': article.visit_count}});
            nextCondition = _.defaults(nextCondition, {'_id': {$ne: id}, 'visit_count': {'$gte': article.visit_count}});
        } else {
            preCondition = _.defaults(preCondition, {'_id': {$ne: id}, 'publish_time': {'$lte': article.publish_time}});
            nextCondition = _.defaults(nextCondition, {
                '_id': {$ne: id},
                'publish_time': {'$gte': article.publish_time}
            });
        }
        var prePromise = Article.find(preCondition)
            .select('title')
            .limit(1)
            .sort('-' + sort)
            .exec();

        var nextPromise = Article.find(nextCondition)
            .select('title')
            .limit(1)
            .sort(sort)
            .exec();
        prePromise.then(function (preResult) {
            var prev = preResult[0] || {};
            return nextPromise.then(function (nextResult) {
                var next = nextResult[0] || {};
                return {'next': next, 'prev': prev};
            })
        }).then(function (result) {
            return res.status(200).json({data: result});
        })
    }).catch(function (err) {
        return next(err);
    })
}

//获取首页图片
exports.getIndexImage = function (req, res, next) {
    //使用redis缓存图片列表.
    redis.llen('indexImages').then(function (imagesCount) {
        if (imagesCount < 1) {
            res.status(200).json({success: true, img: config.defaultIndexImage});
            if (config.qiniu.app_key !== '' && config.qiniu.app_secret !== '') {
                return qiniuHelper.list('blog/index', '', 30).then(function (result) {
                    return Promise.map(result.items, function (item) {
                        return redis.lpush('indexImages', config.qiniu.domain + item.key + '-600x1500q80');
                    });
                });
            }
            return;
        } else {
            return redis.lrange('indexImages', 0, 30).then(function (images) {
                var index = _.random(images.length - 1);
                return res.status(200).json({success: true, img: images[index]});
            });
        }
    }).catch(function (err) {
        redis.del('indexImages');
        return next(err);
    });
}

//用户喜欢
exports.toggleLike = function (req, res, next) {
    var aid = new mongoose.Types.ObjectId(req.params.id);
    var userId = req.user._id;
    //如果已经喜欢过了,则从喜欢列表里,去掉文章ID,并减少文章喜欢数.否则添加到喜欢列表,并增加文章喜欢数.
    //var isLink = _.indexOf(req.user.likeList.toString(), req.params.id);
    var isLike = _.findIndex(req.user.likeList, function (item) {
        return item.toString() == req.params.id;
    });
    var conditionOne, conditionTwo, liked;
    if (isLike !== -1) {
        conditionOne = {'$pull': {'likeList': aid}};
        conditionTwo = {'$inc': {'like_count': -1}};
        liked = false;
    } else {
        conditionOne = {'$addToSet': {'likeList': aid}};
        conditionTwo = {'$inc': {'like_count': 1}};
        liked = true;
    }

    User.findByIdAndUpdateAsync(userId, conditionOne).then(function (user) {
        return Article.findByIdAndUpdateAsync(aid, conditionTwo, {new: true}).then(function (article) {
            return res.status(200).json({success: true, 'count': article.like_count, 'isLike': liked});
        });
    }).catch(function (err) {
        return next(err);
    });
}

function timeRelease(id, date) {
    var date = new Date(date);
    console.log('定时发布====================');

    var j = schedule.scheduleJob(date, function () {
        console.log('发布成功====================');
        Article.findByIdAndUpdateAsync(id, {status:1}, {new: true}).then(function (article) {
            //return res.status(200).json({success: true, id: article._id});
            console.log(article)
        }).catch(function (err) {
            return next(err);
        });
    });
}


