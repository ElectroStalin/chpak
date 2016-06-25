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
    index_profile:['login'],
    index_routes:['login','creator'],
    routes:['name','descript','max_users','creator'],
    mountain:['mountain_name','mountain_height','mountain_country'],
    routes_other:["creator","id"],
    r_m:["r_id","m_id"],
    people_list:["login"],
    add:["route_id","user_id"],
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
        sql:"SELECT * from routes as r inner join mountains as m where (select count(*) from routes_mountain as rm where rm.routeId = r.id and rm.mountainId = m.id) > 0 and (r.id IN (select routeId from routes_users where userId IN (select id from users where login = ?)) OR r.creator = ?)",
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
    mountain:{
        sql:"insert into mountains (name,height,country) VALUES (?,?,?)",
        values:[]
    },
    r_m:{
        sql:"insert into routes_mountain (routeId, mountainId) VALUES (?,?)",
        values:[]
    },
    people_list:{
        sql:"select r.id as 'id',u.name as 'user_name', u.surname as 'user_surname',r.name as 'route_name',m.name as 'mountain_name', m.height as 'mountain_height',m.country as 'mountain_country' " +
        "from users as u left join routes as r on r.creator = u.login left join mountains as m on (select count(*) from routes_mountain as rm where rm.routeId = r.id and rm.mountainId = m.id) > 0  where u.login <> ?",
        values:[]
    },
    add:{
        sql:'insert into routes_users (routeId,userId) VALUES (?,?)',
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
