var express = require('express');
var controller = require('./file.controller');

var router = express.Router();

router.post('/upload', controller.upload);
router.get('/getImageList', controller.getImageList);


module.exports = router;
