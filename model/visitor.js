var mongoose = require('mongoose');

var visitorSchema = new mongoose.Schema({
    sid:Number,
    date:String,
    dates:String,
    select:String,
    num:Number,
    people:String,
    peoples:String,
    phone:String,
    txt:String,
    fangjian:String,
    shenfen:String,
    hao:String,
    sex:String,
    price:String,
    zhu:String,
});


visitorSchema.statics.addvisitor = function(json,callback){
    visitor.checkSid(json._id,function(torf){
        if(torf){
            var s = new visitor(json);
            s.save(function(err){
                if(err){
                    callback(-2);
                    return;
                }
                callback(1);
            });
        }else{
            callback(-1);
        }
    });
}


visitorSchema.statics.checkSid = function(_id,callback){
    this.find({"_id" : _id} , function(err,results){
        callback(results.length == 0);
    });
}


var visitor = mongoose.model("visitor",visitorSchema);
module.exports = visitor;