var ResSend = require("../ResSend");

module.exports = function(req,res){
    'token' in req.cookies ?  ResSend(res,{status:200,cookie:{remove:['token']},redirect:'/'})
        : ResSend(res,{status:200,redirect:'/'});
};