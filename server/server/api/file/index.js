var express = require('express');
var controller = require('./file.controller');

var router = express.Router();

router.post('/upload', controller.upload);
router.get('/getImageList', controller.getImageList);
router.delete('/delImg/:file', controller.delImg);


module.exports = router;
