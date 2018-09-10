var mongoose=require('mongoose');

var hometype=new mongoose.Schema({
    id:String,
	homename:String,
	mianji:String,
	bednum:String,
	breakfast:String,
	net:String,
	tv:String,
	price:String,
	shuliang:String,
    yushuliang:String
})


hometype.statics.addtype = function(json,callback){
	this.typeid(json.id,function(torf){
		if(torf){
			var s = new type(json);
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


hometype.statics.typeid = function(id,callback){
	this.find({"id" : id} , function(err,results){
		console.log(results)
		callback(results.length == 0);
	});
}

hometype.statics.getAll = function (callback) {
    this.find({}).exec(function (err, results) {
        callback(results);
    });
};

var type = mongoose.model("type",hometype);
module.exports = type;