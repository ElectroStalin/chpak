var DB = require("./db_query");
var ResSend = require("../ResSend");
var cryptos =require("../cryptos");
var async = require("async");

module.exports = function(req,res){
    if('token' in req.cookies){
        var login = cryptos.decrypt(req.cookies.token).split("@@")[1];
        async.parallel({
           profile:function(callback){
               DB.config.Name = 'index_profile';
               DB.config.Set = {login:login};
               DB.Get(function(status,result){
                   status ? callback(null,result[0])
                       : callback(null,null);
               });
           },
           routes:function(callback){
               DB.config.Name = 'index_routes';
               DB.config.Set = {login:login,creator:login};
               DB.Get(function(status,result){
                   status ? callback(null,result)
                       : callback(null,null);
               });
           }
        },function(err,results){
            ResSend(res, {status: 200, render: 'index',body:results});
        });
    } else{
        ResSend(res,{status:200,redirect:'/auth'});
    }
};
