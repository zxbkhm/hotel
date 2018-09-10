var mongoose = require('mongoose');

var tuifangSchema = new mongoose.Schema({
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


tuifangSchema.statics.addvisitor = function(json,callback){
    tuifang.checkSid(json.people,function(torf){
        if(torf){
            var s = new tuifang(json);
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


tuifangSchema.statics.checkSid = function(people,callback){
    this.find({"people" : people} , function(err,results){
        callback(results.length == 0);
    });
}


var tuifang = mongoose.model("tuifang",tuifangSchema);
module.exports = tuifang;