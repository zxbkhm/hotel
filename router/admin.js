var type=require('../model/hometype');
var house=require('../model/house');
var visitor = require("../model/visitor")
var url = require("url");
var formidable = require("formidable");
var sd = require('silly-datetime');

exports.lobby=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("lobbyorder.ejs");
}
exports.doaddlobby = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var time=sd.format(new Date(), 'YYYY-MM-DD');
        // console.log(time);
        fields.date=time;
        fields.zhu="";
        visitor.addvisitor(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.leibie=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
    type.find({},function(err,results){
        res.json({
            'results':results
        })
    })
}
exports.houses=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
    house.find({},function(err,results){
        res.json({
            'results':results
        })
    })
}
exports.type=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    type.getAll(function(data){
        for(let i=0;i<data.length;i++){
            let name=data[i];
            console.log(name);
            house.count({"type":name.homename},function(err,count){
                house.count({"zhu":"未入住","type":name.homename},function(err,count_b){
                    console.log(count_b);
                    name.shuliang=count;
                    name.yushuliang=count_b;
                    name.save(function(err){
                    })
                })
            })
        }
        res.render("hometype");
        return;
    })

}
exports.home = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        type.addtype(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.getAlltype=function (req, res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
    type.find({},function(err,results){
        res.json({
            "results" : results
        });
    })
    // var page = url.parse(req.url,true).query.page - 1 || 0;
    // var pagesize = 10;
    // type.count({},function(err,count){
    //     type.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
    //         res.json({
    //             "pageAmount" : Math.ceil(count / pagesize),
    //             "results" : results
    //         });
    //     });
    // });
}
exports.deletetype=function(req,res){
    var id= req.params.id;
    type.find({'id':id},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}
exports.updatetype = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        console.log(fields)
        type.update({"homename":fields.homename},{$set:{"breakfast":fields.breakfast,"net":fields.net,"tv":fields.tv,"price":fields.price}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });

}
exports.showUpdatetype = function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
    var id = req.params.id;
    type.find({"id" : id},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
exports.houseKeep = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        console.log(fields)
        house.update({"fangjian":fields.fangjian},{$set:{"txt":fields.txt}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.nohouse=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("nohouse.ejs");
}
exports.guanli=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
    res.render("guanli.ejs");
}
exports.zhu=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
     }
     res.render("zhu.ejs");
}
exports.zhufangA = function(req,res){
    var sid = req.params.sid;
    // console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        visitor.update({"people":sid},{$set:{"fangjian":fields.fangjian,"shenfen":fields.shenfen,"hao":fields.hao,"sex":fields.sex,"price":fields.price}},function (err) {
            console.log(fields.sex);
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.find=function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    res.render("find.ejs");
}
exports.findall = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    house.find({},function(err,results){
        res.json({
            "results" : results
        });
    });
    // var page = url.parse(req.url,true).query.page - 1 || 0;
    // var pagesize = 5;
    // house.count({},function(err,count){
    //     house.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
    //         res.json({
    //             "pageAmount" : Math.ceil(count / pagesize),
    //             "results" : results
    //         });
    //     });
    // });
}
exports.doaddhouse=function(req,res){
    var id= req.params.id;

    var arr = id.split(",")

    for (var i = 0; i < arr.length; i++) {
        house.removes(arr[i],function (err, data) {
            if (err) {
                res.send("出错")
            }else{
                res.json({"result":1})
            }
        })

        // results[0].remove(function (err) {
        //     if (err){
        //         res.json({'result':-1});
        //         return;
        //     }
        //     res.json({'result':1})
        // })
    }
}
exports.showUpdatehouse = function(req,res){
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    var id = req.params.id;
    house.find({"fangjian" : id},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
exports.updatehouse = function(req,res){
    var id = req.params.id;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        house.update({"fangjian":id},{$set:{"hao":fields.haos,"fangjian":fields.fangjians,"type":fields.types,"dizhi":fields.dizhis,"txt":fields.txts,"zhu":fields.zhus}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.tuifang = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    visitor.find({}).exec(function(err,results){
        res.json({
            "results" : results
        });
    });
}
exports.panduan= function (req,res){
    var sid = req.params.id;
    console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        house.update({"fangjian":sid},{$set:{"zhu":fields.zhuangtai}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.yituifang= function (req,res){
    var sid = req.params.sid;
    // console.log(sid);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        visitor.update({"fangjian":sid},{$set:{"zhu":fields.zhuangtai}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });

}
exports.jilu = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    res.render("jilu.ejs");
}
exports.jiluall = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    visitor.find({},function(err,results){
        res.json({
            // "pageAmount" : Math.ceil(count / pagesize),
            "results" : results
        });
    })
    // var page = url.parse(req.url,true).query.page - 1 || 0;
    // var pagesize = 5;
    // visitor.count({},function(err,count){
    //     visitor.find({}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
    //         res.json({
    //             "pageAmount" : Math.ceil(count / pagesize),
    //             "results" : results
    //         });
    //     });
    // });
}
exports.tubiao = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    res.render("tubiao.ejs");
}

exports.tubiaos = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    house.count({},function(err,count){
        house.find({}).exec(function(err,results){
            res.json({
                "results" : results
            });
        });
    });
}


exports.updatejieguo = function(req,res){
    var id = req.params.id;
    // console.log(id);
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        visitor.update({"people":id},{$set:{"date":fields.date,"dates":fields.dates,"select":fields.select,"num":fields.num,"people":fields.people,"peoples":fields.peoples,"phone":fields.phone,"txt":fields.txt,}},function (err) {
            if(err){
                res.json({"result" : -1});
            }else{
                res.json({"result" : 1});
            }
        })
    });
}
exports.showUpdatejieguo = function (req,res) {
    if((req.session.login && req.session.type == "admin")){
        res.send("本页面需要登录，请<a href=/login>登录</a>");
        return;
    }
    var id = req.params.id;
    visitor.find({"people" : id},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }else{
            res.json({"result" : results[0]});
        }
    });
}
exports.doaddjieguo=function(req,res){
    var id= req.params.id;
    visitor.find({'people':id},function (err, results) {
        if (err||results.length==0){
            res.json({"result":-1});
            return;
        }
        results[0].remove(function (err) {
            if (err){
                res.json({'result':-1});
                return;
            }
            res.json({'result':1})
        })
    })
}

// exports.showupdateFangshu = function(req,res){
//     var sid = req.params.sid;
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         type.update({"homename":sid},{$set:{"yushuliang":fields.yushuliang-1}},function (err) {
//             if(err){
//                 res.json({"result" : -1});
//             }else{
//                 res.json({"result" : 1});
//             }
//         })
//     });
// }
// exports.shufanghaos = function(req,res){
//     var sid = req.params.sid;
//     console.log(sid);
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         type.update({"select":sid},{$set:{"yushuliang":fields.yushuliang+1}},function (err) {
//             if(err){
//                 res.json({"result" : -1});
//             }else{
//                 res.json({"result" : 1});
//             }
//         })
//     });
// }