var DB = require("./db_query");
var ResSend = require("../ResSend");
var cryptos =require("../cryptos");
var async = require("async");

module.exports = {
    Get:function(req,res){
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
                    callback(null,[]);
                }
            },function(err,results){
                ResSend(res, {status: 200, render: 'routes',body:results});
            });
        }else{
            ResSend(res,{status:200,redirect:'/auth'});
        }
    },
    Post:function(req,res){
        if('token' in req.cookies){
            var _data = req.body;
            _data['creator'] = cryptos.decrypt(req.cookies.token).split("@@")[1];
            DB.config.Name = 'routes';
            DB.config.Set = _data;
            DB.Get(function(status,result){
                status ? ResSend(res,{status:200,redirect:'/'})
                    : ResSend(res,{status:403,redirect:'/'});
            });
        }else{
            ResSend(res,{status:200,redirect:'/auth'});
        }
    },
    Put:function(req,res){

    }
};
