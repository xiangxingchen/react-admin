'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/getUserInfo/:id', auth.hasRole('user'),controller.getUserInfo);
router.get('/getUserList', auth.hasRole('admin'),controller.getUserList);
router.post('/addUser',controller.addUser);
router.delete('/:id',controller.destroy);
router.put('/updateUser/:id', controller.updateUser);
router.put('/updateAvatar/:id', controller.updateAvatar);
router.post('/destroyAllUserSelect', auth.hasRole('user'), controller.destroyAllUserSelect);
router.post('/searchUser', auth.hasRole('user'), controller.searchUser);
//前台用户更新信息
router.put('/mdUser', auth.isAuthenticated(), controller.mdUser);
router.get('/getUserProvider',auth.isAuthenticated(), controller.getUserProvider);
router.get('/user', auth.isAuthenticated(), controller.getMe);
router.get('/snsLogins',controller.getSnsLogins)
module.exports = router;
