var mysql = require('mysql');
var async = require("async");
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_alpico'
});

var ValidateData = {
    register:['login','name','surname','password'],
    auth:['login','password'],
    index_profile:['login'],
    index_routes:['login','creator'],
    routes:['name','descript','max_users','creator'],
    routes_other:["creator","id"],
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
    index_profile:{
      sql:"SELECT id,name,surname,login from users where login = ?",
      values:[]
    },
    index_routes:{
        sql:"SELECT * from routes where id IN (select routeId from routes_users where userId IN (select id from users where login = ?)) OR creator = ?",
        values:[]
    },
    routes:{
        sql:"INSERT INTO routes (name,descript,max_users,creator) VALUES (?,?,?,?)",
        values:[]
    },
    routes_other:{
        sql:"select * from routes as r where r.creator <> ? and ? not in (select * from routes_users where routeId = r.id)",
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
