var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'alpico'
});

/*
Авторизация
 */

module.exports = function(req,callback){
    pool.getConnection(function (err, connection) {
        connection.query({
            sql:'SELECT name,surname FROM clients where name = ? and password = ?',
            values:[req.body.login,req.body.password]
        },function(err,result){
            if(!err && result){
                callback({status:200,cookie:{add:["key_alpico",result[0].name+"@@"+result[0].surname]},render:'index'});
            }else{
                callback({error:403});
            }
        });
    });
};
