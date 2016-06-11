var DB = require("./db_query");
var ResSend = require("../ResSend");

module.exports = {
    Get:function(req,res){
        res.sendStatus(200);
    },
    Post:function(req,res){
        DB.config.Name = 'register';
        DB.config.Set = [req.body.name,req.body.surname,"",req.body.password];
        DB.Get(function(status,result){
            status ? ResSend(res,{status:200})
                : ResSend(res,{error:403})
        });
    }
};
