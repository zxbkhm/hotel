var mongoose=require('mongoose');

var houseSchema=new mongoose.Schema({
	hao:String,
    fangjian: String,
    type:String,
    dizhi:String,
    txt:String,
    zhu:String
})

houseSchema.statics.addhouse = function(json,callback){
	this.houseid(json.fangjian,function(torf){
		if(torf){
			var s = new house(json);
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


houseSchema.statics.houseid = function(fangjian,callback){
	this.find({"fangjian" : fangjian} , function(err,results){
		console.log(results)
		callback(results.length == 0);
	});
}
houseSchema.statics.removes = function(fangjian,callback){
    this.remove({"fangjian" : fangjian} , function(err){
        callback(err);
    });
}

var house = mongoose.model("house",houseSchema);
module.exports = house;