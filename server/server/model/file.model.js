/**
 * 图片表
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    name:String,
    type:String,
    time: {
        type: Date,
        default: Date.now
    },
    resolution: String,
    tag: String,
    size: String,
    url: String,
    fromWho: String,
    toWhere: String,
});

FileSchema
    .virtual('info')
    .get(function() {
        return {
            'name': this.name,
            'type': this.type,
            'time': this.time,
            'tag': this.tag,
            'resolution': this.resolution,
            'size': this.size,
            'url': this.url,
            'fromWho':this.fromWho,
            'toWhere':this.toWhere,
        };
    });

var File = mongoose.model('File',FileSchema);

var Promise = require('bluebird');
Promise.promisifyAll(File);
Promise.promisifyAll(File.prototype);

module.exports = File;