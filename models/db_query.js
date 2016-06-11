var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'alpico'
});

var config = {
    name:'',
    register:{
        sql:"INSERT INTO `clients`(`Name`, `Surname`, `Qualification`, `Password`) VALUES  (?,?,?,?)",
        values:[]
    },
    get Get(){
        return this[this.name];
    },
    set Name(arg){
      this.name = arg;
    },
    set Set(arg){
        this[this.name].values = arg;
    }

};

module.exports = {
    config:config,
    get Get(){
          return function(callback){
              var _setting = this.config.Get;
              pool.getConnection(function (err, connection) {
                  connection.query(_setting, function (err, result) {
                      !err ? callback(true,result)
                          : callback(false,err);
                  });
                  connection.release();
              });
          }
      }
};
