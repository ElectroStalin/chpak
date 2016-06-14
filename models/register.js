var DB = require("./db_query");
var ResSend = require("../ResSend");

module.exports = {
    Get:function(req,res){
        'token' in req.cookies ?  ResSend(res,{status:200,redirect:'/'})
            : ResSend(res,{status:200,render:'register'});
    },
    Post:function(req,res){
        if('token' in req.cookies){
            ResSend(res,{status:200,redirect:'/'})
        }else {
            DB.config.Name = 'register';
            DB.config.Set = req.body;
            DB.Get(function (status, result) {
                status ? ResSend(res, {status: 200, redirect: '/auth'})
                    : ResSend(res, {error: 403});
            });
        }
    }
};
