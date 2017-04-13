var mongoose = require('mongoose');
var File = mongoose.model('File');
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");

/**
 *上传图片
 * @param req
 * @param res
 * @returns {data:{success,name}}
 */

exports.upload = function (req,res) {
   var form = new formidable.IncomingForm();
   form.uploadDir = path.normalize(__dirname + "/../../avatar");
   form.parse(req, function(err, fields, files) {
      console.log(files)
      var oldpath = files.file.path;
      var newpath = path.normalize(__dirname + "/../../avatar") + "/" + files.file.name;
      fs.rename(oldpath, newpath, function(err) {
         if (err) {
            console.log("失败");
            return;
         }
         var newFile = new File({
            name:files.file.name,
            size:files.file.size,
            type:files.file.type,
            time:files.file.lastModifiedDate,
         });
         newFile.saveAsync().then(function(file) {
            return res.status(200).json({success:true,info:file.info});
         }).catch(function (err) {
            if(err){
               return res.status(500).send(err);
            }
         });
      });
   });
}

/**
 *上传图片
 * @param req
 * @param res
 * @returns {data:{success,name}}
 */
exports.getImageList = function (req,res) {
   //fs.stat(__dirname + "/../../avatar", (err, files) => {
   //   if (err) throw err;
   //   console.log(files);
   //   res.status(200).json({data:files})
   //});
   getAllAlbums((err,files) => {
      console.log(files);
   })
}

getAllAlbums = (callback) =>{
   fs.readdir(__dirname + "/../../avatar",function(err,files){
      if(err){
         callback("没有找到uploads文件",null);
      }
      var allAlbums = [];
      (function iterator(i){
         if(i == files.length){
            //遍历结束
            console.log(allAlbums);
            callback(null,allAlbums);
            return;
         }
         fs.stat(__dirname + "/../../avatar/" + files[i],function(err,stats){
            if(err){
               callback("找不到文件" + files[i] , null);
            }
            if(stats.isDirectory()){
               allAlbums.push(files[i]);
            }
            iterator(i + 1);
         });
      })(0);
   });
}


//通过文件名，得到所有图片
exports.getAllImagesByAlbumName = function(albumName,callback){
   fs.readdir(__dirname + "/../../avatar/" + albumName,function(err,files){
      if(err){
         callback("没有找到uploads文件",null);
         return;
      }
      var allImages = [];
      (function iterator(i){
         if(i == files.length){
            //遍历结束
            console.log(allImages);
            callback(null,allImages);
            return;
         }
         fs.stat(__dirname + "/../../avatar/" + albumName + "/" + files[i],function(err,stats){
            if(err){
               callback("找不到文件" + files[i] , null);
               return;
            }
            if(stats.isFile()){
               allImages.push(files[i]);
            }
            iterator(i + 1);
         });
      })(0);
   });
}
