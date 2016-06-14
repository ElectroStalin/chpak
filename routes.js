var _route = {
    index:      '/',
    register:   '/register',
    auth:       '/auth',
    logout:     '/logout',
    routes:     '/routes'
};

module.exports = function(value){
    return {
      path:_route[value] || null,
      get Handler(){
          return require("./models/"+value);
      }
    };
};