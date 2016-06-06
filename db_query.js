var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'alpico'
});


module.exports = function(req,callback){
    if(['name'] in req.body){
        console.log(req.body);
        async.parallel({
            info:function(res){
                var config = {};
                if('nameOn'.indexOf(req.body.filter) != -1){
                    config = {
                        sql: "Select * from clients where name = ?",
                        values:[req.body.name]
                    };
                }else if('surnameOn'.indexOf(req.body.filter) != -1){
                    config = {
                        sql: "Select * from clients where surname = ?",
                        values:[req.body.surname]
                    };
                }else if('All'.indexOf(req.body.filter) != -1){
                    config = {
                        sql: "Select * from clients where name = ? and surname = ?",
                        values:[req.body.name,req.body.surname]
                    };
                }
                pool.getConnection(function (err, connection) {
                    connection.query(config, function (err, result) {
                        !err ?
                            res(null,result)
                        : res(null,null);
                    });
                    connection.release();
                });
            },
            clients:function(res){
                pool.getConnection(function (err, connection) {
                    connection.query({
                        sql: "Select name,surname from clients",
                    }, function (err, result) {
                        !err ?
                            res(null,result)
                        : res(null,null);
                    });
                });
            }
        },function(err,results){
            callback({status: 200, json: results, render: 'index'});
        });
    }else {
        pool.getConnection(function (err, connection) {
            connection.query({
                sql: "Select name,surname from clients",
            }, function (err, result) {
                callback({status: 200, json: {clients: result}, render: 'index'});
            });
        });
    }
};


