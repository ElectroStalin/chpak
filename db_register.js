var mysql = require('mysql');
//var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'alpico'
});


module.exports=function(req,callback) {
    pool.getConnection(function (err, connection) {
        connection.query({
            sql: "INSERT INTO `clients`(`Name`, `Surname`, `Qualification`, `Password`) " +
            "VALUES  (?,?,?,?,)",
            values: [req.body.name, req.body.surname, req.body.qual, req.body.password]

        }, function (err, result) {
            !err ?
                res(null, result)
                : res(null, null);
        });
    });
    pool.getConnection(function (err, connection) {
        connection.query({
            sql: "INSERT INTO `clientcontacts`( `Email`, `PhoneNumber`)" +
            " VALUES (?,?)",
            values: [req.body.email, req.body.phone]
        }, function (err, result) {
            !err ?
                res(null, result)
                : res(null, null);
        });
    });
    callback({status: 200, render: 'index'});
};

