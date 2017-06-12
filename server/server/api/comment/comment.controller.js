var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Blog = mongoose.model('Article');

//添加新的评论.
exports.addNewComment = function (req, res, next) {
    const user = req.user;
    var aid = req.body.aid;
    var content = req.body.content;
    var error_msg;
    if (!aid) {
        error_msg = '缺少必须参数';
    } else if (!content || content == '') {
        error_msg = "评论内容不能为空";
    }
    if (error_msg) {
        return res.status(422).send({error_msg: error_msg});
    }
    Blog.findOne({_id:aid}).then(function(article){
        Comment.createAsync({
            aid: aid,
            content: content,
            user_id: user._id,
            nickname:user.nickname,
            title:article.title,
            allow_comment:article.allow_comment,
        }).then(function (result) {
            var comment = result.toObject();
            comment.user_id = {
                _id: req.user._id,
                nickname: req.user.nickname,
                avatar: req.user.avatar
            }
            Blog.findByIdAndUpdateAsync(aid, {$inc: {comment_count: 1}});
            return res.status(200).json({success: true, data: comment});
        }).catch(function (err) {
            return next(err);
        });
    })

}

//获取评论列表.
exports.getCommentList = function (req, res, next) {
    var aid = req.params.id;
    Comment.find({aid: aid, status: {$eq: 1}})
        .populate({
            path: 'user_id',
            select: 'nickname avatar _id'
        })
        .sort('created')
        .populate({
            path: 'user_id',
            select: 'nickname avatar'
        })
        .exec().then(function (commentList) {
        return res.status(200).json({data: commentList});
    }).then(null, function (err) {
        return next(err);
    });
};
//条件查询
exports.searchComment = function (req, res, next) {
    const search = req.body.search; //从URL中传来的 keyword参数
    const reg = new RegExp(search, 'i') //不区分大小写
    Comment.find({
        $or: [ //多条件，数组
            {title: {$regex: reg}},
            {content: {$regex: reg}},
            {nickname: {$regex: reg}},
        ]
    }).populate({
        path: 'user_id',
        select: 'nickname avatar _id'
    }).sort('updated').then(function (article) {
        return res.status(200).json({success: true, data: article});
    }).catch(function (err) {
        return next(err);
    });
}
exports.destroyAllCommentSelect = function (req, res, next) {
    const user = req.user;
    var id = req.body.id;
    Comment.remove({"_id":{ $in: id}}).then(function (article) {
        // Logs.createAsync({
        //     uid:user._id,
        //     name:user.nickname,
        //     content:user.nickname+'删除了文章'+article.title,
        //     type:'article'
        // });
        return res.status(200).send({success: true});
    }).catch(function (err) {
        return next(err);
    });
};
//添加回复
exports.addNewReply = function (req, res, next) {
    var cid = req.params.id;
    if (!req.body.content || req.body.content == '') {
        return res.status(422).send({error_msg: "回复内容不能为空"});
    }
    var reply = req.body;
    reply.user_info = {
        id: req.user._id,
        nickname: req.user.nickname
    }
    reply.created = new Date();
    Comment.findByIdAndUpdateAsync(cid, {"$push": {"replys": reply}}, {new: true}).then(function (result) {
        return res.status(200).json({success: true, data: result.replys});
    }).catch(function (err) {
        return next(err);
    });
}
//删除评论.
exports.delComment = function (req, res, next) {
    var cid = req.params.id;
    Comment.findByIdAndRemoveAsync(cid).then(function (result) {
        //评论数-1
        Blog.findByIdAndUpdateAsync(result.aid, {$inc: {comment_count: -1}});
        return res.status(200).json({success: true});
    }).catch(function (err) {
        return next(err);
    })
}
//删除回复
exports.delReply = function (req, res, next) {
    var cid = req.params.id;
    var rid = req.body.rid;
    if (!rid) {
        return res.status(422).send({error_msg: "缺少回复ID."});
    }
    Comment.findByIdAndUpdateAsync(cid, {$pull: {replys: {_id: mongoose.Types.ObjectId(rid)}}}, {new: true}).then(function (result) {
        return res.status(200).json({success: true, data: result});
    }).catch(function (err) {
        return next(err);
    });
}

//获取所有评论.
exports.getAllCommentList = function (req, res, next) {
    var currentPage = (parseInt(req.query.page) > 0)?parseInt(req.query.page):1;
    var itemsPerPage = (parseInt(req.query.limit) > 0)?parseInt(req.query.limit):10;
    var startRow = (currentPage - 1) * itemsPerPage;

    var sortName = String(req.query.sortName) || "created";
    var sortOrder = req.query.sortOrder;
    if(sortOrder === 'false'){
        sortName = "-" + sortName;
    }
    Comment.find({})
        .skip(startRow)
        .limit(itemsPerPage)
        .sort({updated: -1})
        .exec().then(function(commentList){
        Comment.countAsync().then(function (count) {
            return res.status(200).send({ data: commentList,count:count, currentPage:currentPage});
        });
    }).then(null,function (err) {
        return next(err);
    });
};