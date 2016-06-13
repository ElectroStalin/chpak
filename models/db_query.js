var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'poltava1100',
    database : 'db_alpico'
});

var ValidateData = {
    register:['login','name','surname','password'],
    auth:['login','password'],
    data:function(value){
        var _data = [];
        for(var i in this[config.name]){
            if(this[config.name][i] in value){
                _data.push(value[this[config.name][i]]);
            }
        }
        return _data;
    }
};

var config = {
    name:'',
    register:{
        sql:"INSERT INTO users (login,name,surname,password) VALUES  (?,?,?,?)",
        values:[]
    },
    auth:{
      sql:"SELECT id,name,surname from users where login = ? and password = ?",
      values:[]
    },
    get Get(){
        return this[this.name];
    },
    set Name(arg){
      this.name = arg;
    },
    set Set(arg){
        this[this.name].values = ValidateData.data(arg);
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
