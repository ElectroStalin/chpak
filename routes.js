var _route = {
    index:      '/',
    register:   '/register',
    auth:       '/auth'
};

module.exports = function(value){
    return {
      path:_route[value] || null,
      get Handler(){
          return require("./models/"+value);
      }
    };
};