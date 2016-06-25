var DB = require("./db_query");
var ResSend = require("../ResSend");
var cryptos =require("../cryptos");
var async = require("async");

module.exports = function(req,res){
    if('token' in req.cookies){
        var login = cryptos.decrypt(req.cookies.token).split("@@")[1];
        async.waterfall([
            function(callback){
                DB.config.Name = 'index_profile';
                DB.config.Set = {login:login};
                DB.Get(function(status,result){
                    status ? callback(null,result[0])
                        : callback(null,null);
                });
            },
            function(data,callback){
                 if(data){
                     var _data = {route_id:req.params.id,user_id:data.id};
                     DB.config.Name = 'add';
                     DB.config.Set = _data;
                     DB.Get(function(status,result){
                         status ? callback(null,true)
                             : callback(null,null);
                     })
                 }else{
                     callback(null,null);
                 }
            }
        ],function(err,results){
            results ? ResSend(res,{status:'200',redirect:'/'})
                : ResSend(res,{status:'403',redirect:'/auth'});
        });
    }else{
        ResSend(res,{status:'403',redirect:'/auth'});
    }
};
