var _route = {
    index:      '/',
    register:   '/register',
    auth:       '/auth',
    logout:     '/logout',
    routes:     '/routes',
    people:     '/people',
    add:        '/people/:id'
};

module.exports = function(value){
    return {
      path:_route[value] || null,
      get Handler(){
          return require("./models/"+value);
      }
    };
};