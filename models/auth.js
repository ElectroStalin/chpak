var DB = require("./db_query");
var ResSend = require("../ResSend");

module.exports = {
    Get:function(req,res){
        'token' in req.cookies ?  ResSend(res,{status:200,redirect:'/'})
            : ResSend(res,{status:200,render:'login'});
    },
    Post:function(req,res){
        if('token' in req.cookies){
            ResSend(res,{status:200,redirect:'/'})
        }else{
            DB.config.Name = 'auth';
            DB.config.Set = req.body;
            console.log(req.body);
            DB.Get(function(status,result){
                status && result ? ResSend(res,{status:200,cookie:{add:[["token",Date.parse(Date())+"@@"+req.body.login]]},redirect:'/'})
                    : ResSend(res,{error:403});
            });
        }
    }
};
