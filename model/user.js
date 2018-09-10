var mongoose = require("mongoose");
var crypto = require("crypto");

var userSchema = mongoose.Schema({
    "yonghuming": String,
    "mima": String
});


// exports.findUserByName = function(yonghuming , callback){
//     user.findOne({"yonghuming" : yonghuming} , function(err,doc){
//         callback(err,doc);
//     });
// }
userSchema.statics.findUserByName = function (yonghuming, callback) {
    this.findOne({ "yonghuming": yonghuming }, function (err, results) {
        callback(err, results);
    });
};

// exports.adduser = function(yonghuming,mima,callback){
//     user.create({"yonghuming" : yonghuming , "mima" : mima},function(err,doc){
//         callback(err,doc)
//     });
// }
// userSchema.statics.adduser = function (yonghuming, mima,callback) {
//     this.create({"yonghuming" : yonghuming , "mima" : mima}, function (err, results) {
//         callback(err, results);
//     });
// };
// exports.getK = function (yonghuming,callback) {
//     user.findOne({"yonghuming":yonghuming},function (err,doc) {
//         callback(err,doc);
//     })
// }
// userSchema.statics.getK = function (yonghuming, callback) {
//     this.findOne({"yonghuming": yonghuming}).exec(function (err, results) {
//         callback(results);
//     });
// };
// exports.changepw = function (yonghuming, mima, callback) {
//     user.update({"yonghuming":yonghuming},{$set:{"mima":mima}},function (err,doc) {
//         callback(err,doc);
//     })
// }
userSchema.statics.changepw = function (yonghuming, mima, callback) {
    this.find({"yonghuming": yonghuming}, function (err, results) {
        console.log(yonghuming, mima);
        if (err) {
            callback("服务器错误！请检查输入的内容！");
            return;
        }
        if (results.length == 0) {
            callback("没有找到这个学号");
        } else {
            thestudent = results[0];
            var sha256 = crypto.createHash("sha256");
            thestudent.mima = sha256.update(mima).digest("hex");
            thestudent.save();
            callback("成功修改！");
        }
    });
};
userSchema.statics.getAll = function (callback) {
    this.find({}).exec(function (err, results) {
        callback(results);
    });
};

var user = mongoose.model("user", userSchema);
module.exports = user;
