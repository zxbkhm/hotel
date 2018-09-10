var express = require("express");
var app = express();

var router = require("./router/router.js");
var admin = require("./router/admin.js");

var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lvdian');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.static("views"));

//显示首页
app.get("/",router.showIndex);
//显示提交订单页
app.get("/ding",router.showDing);
//查询页面
app.post("/tijiao",router.tijiao);
//获取全部
app.get("/findding",router.findding);
//查看详情
app.get("/chaxun",router.chaxun);
//登录页面
app.get("/login",router.login);
//登录提交
app.post("/checklogin",router.checklogin);
//显示注册
// app.get("/reg",router.reg);
//验证用户名是否存在
// app.get("/checkuserexist",router.checkuserexist);
//注册提交
// app.post("/doreg",router.doreg);
//登陆之后显示
app.get("/xianshi",router.xianshi);
//退出登录
app.get("/tuichu",router.tuichu);

//后台
//大堂订单
app.get('/lobby',admin.lobby);
//大堂客人添加
app.post('/doaddlobby', admin.doaddlobby);
app.get('/leibie',admin.leibie);
app.get('/houses',admin.houses);
//酒店房间类别管理页面
app.get('/type',admin.type);
//获取所有
app.get('/doaddtype',admin.getAlltype);
//添加
app.post('/home',admin.home);
//删除
app.delete('/doaddtype/:id', admin.deletetype);
//更新
app.post('/type',admin.updatetype);
//显示更新
app.get('/type/:id',admin.showUpdatetype);
//提交更新
app.post('/houseKeep',admin.houseKeep);
//退房
app.get("/nohouse",admin.nohouse);
//查询编辑删除房间
app.get("/guanli",admin.guanli);
//订单入住
app.get("/zhu",admin.zhu);
//确认入住
app.post("/zhufangA/:sid",admin.zhufangA);
//查询房间
app.get("/find",admin.find);
//得到全部
app.get("/findall",admin.findall)
//删除
app.get('/doaddhouse/:id', admin.doaddhouse);
//显示更新
app.get('/house/:id',admin.showUpdatehouse);
//更新
app.post('/house/:id',admin.updatehouse);
app.post("/panduan/:id",admin.panduan);
app.post("/yituifang/:sid",admin.yituifang);

//记录查询
app.get("/jilu",admin.jilu);
app.get("/jiluall",admin.jiluall);

//退房提交
app.get('/tuifang',admin.tuifang);

//图表显示
app.get("/tubiao",admin.tubiao);
//图表请求数据
app.get("/shuju",admin.tubiaos);
//修改房间状态  数量--
// app.post ('/shufanghaotype/:sid',admin.showupdateFangshu);
// app.post ('/shufanghaos/:sid',admin.shufanghaos);


//更新
app.post('/jieguo/:id',admin.updatejieguo);
//显示更新
app.get('/jieguo/:id',admin.showUpdatejieguo);
//删除
app.delete('/doaddjieguo/:id', admin.doaddjieguo);


//显示修改密码页面
app.get("/xiugai",router.xiugai);
// //修改密码
app.post("/changepw",router.changepw);
app.get("/name", router.showadmin);


app.listen(3001);