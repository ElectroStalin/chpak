var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'alpico'
});



/*
Твоя регистрация! Сначала выполняется первый запрос, если он выполнился без ошибок, то
выполнится запрос номер два, иначе выполнится только один и то вернет страницу ошибки
 */

module.exports = function(req,callback) {
    async.waterfall([
        function(res){
            pool.getConnection(function (err, connection) {
                connection.query({
                    sql: "INSERT INTO `clients`(`Name`, `Surname`, `Qualification`, `Password`) " +
                    "VALUES  (?,?,?,?)",
                    values: [req.body.name, req.body.surname, req.body.qual, req.body.password]

                }, function (err, result) {
                    !err ?
                        res(null, true)
                        : res(null, false);
                });
                connection.release();
            });

        },
        function(arg,res){
            arg ?
                pool.getConnection(function (err, connection) {
                    connection.query({
                        sql: "INSERT INTO `clientcontacts`( `Email`, `PhoneNumber`)" +
                        " VALUES (?,?)",
                        values: [req.body.email, req.body.phone]
                    }, function (err, result) {
                        !err ?
                            res(null, true)
                            : res(null, false);
                    });
                    connection.release();
                })
                : res(null,false);
        }
    ],function(err,results){
        if(results){
            callback({status:200,render:'login'});
            // пошел наш формат, который будет передан в обработчик, который произведет трансляцию сего объекта в response
        }else{
            callback({error:403});
        }
    });
};

