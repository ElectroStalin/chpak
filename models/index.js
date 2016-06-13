var DB = require("./db_query");
var ResSend = require("../ResSend");

module.exports = function(req,res){
    if('token' in req.cookies){
        ResSend(res,{status:200});
    } else{
        ResSend(res,{status:200,redirect:'/auth'});
    }
};
