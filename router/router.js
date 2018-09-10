var user = require("../model/user.js");
var formidable = require("formidable");
var visitor = require("../model/visitor.js");
var crypto = require("crypto");


exports.showIndex = function(req,res){
    res.render("index.ejs");
}
exports.showDing = function(req,res){
    res.render("ding.ejs");
}
exports.tijiao = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        fields.shenfen="";
        fields.hao="";
        fields.sex="";
        fields.price="";
        visitor.addvisitor(fields,function (result) {
            res.json({"result" : result});
        })
    });
}
exports.findding = function(req,res){
    visitor.count({},function(err,count){
        visitor.find({}).exec(function(err,results){
            res.jsonp({"result":results});
        });
    });
}
exports.chaxun = function(req,res){
    res.render("chaxun.ejs");
}
exports.login = function (req,res) {
    res.render("login.ejs")
}
//登录提交
exports.checklogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        if (err) {
            res.json({"result": -1});
            return;
        }
        if (!yonghuming || !mima) {
            res.json({"result": -4});
            return;
        }
        user.findUserByName(yonghuming, function (err, results) {
            var theadmin = results;
            var sha256 = crypto.createHash("sha256");
            mima = sha256.update(mima).digest("hex").toString();
            if (theadmin.mima == mima) {
                req.session.yonghuming = yonghuming;
                req.session.type = "0926";
                req.session.login = true;
                res.json({"result": 1, "type": "admin"});
            } else {
                res.json({"result": -3});
            }
        })
    })
}

//注册页面
// exports.reg = function(req,res){
//     res.render("reg");
// }
//验证用户名是否存在
// exports.checkuserexist = function(req,res,next){
//     var queryobj = url.parse(req.url,true).query;
//     if(!queryobj.yonghuming){
//         res.send("请提供yonghuming参数！");
//         return;
//     }
//     user.findUserByName(queryobj.yonghuming,function(err,doc){
//         if(doc){
//             res.json({"result" : -1});
//         }else{
//             res.json({"result" : 0});
//         }
//     });
// }
//注册提交
// exports.doreg = function(req,res,next){
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         var yonghuming = fields.yonghuming;
//         var mima = fields.mima;
//         user.findUserByName(yonghuming,function(err,doc){
//             if(doc){
//                 res.json({"result" : -1});
//                 return;
//             }
//             user.adduser(yonghuming,mima,function(err,doc){
//                 if(err){
//                     res.json({"result" : -2})
//                     return;
//                 }
//                 req.session.login = 1;
//                 req.session.yonghuming = yonghuming;
//                 res.json({"result" : 1})
//             });
//         });
//     });
// }
exports.xianshi = function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("xianshi.ejs");
}
exports.tuichu = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("index.ejs");
}
exports.xiugai = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("xiu.ejs");
}
exports.changepw = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields)
        user.changepw(fields.yonghuming, fields.mima, function (info) {
            res.end(info);
        });
    });
};
exports.showadmin = function (req, res) {
    user.getAll(function (results) {
        res.json({"results": results});
    })
};