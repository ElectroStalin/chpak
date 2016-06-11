var     express         =       require(    'express'       ),
        app             =       express(),
        logger          =       require(    'morgan'        ),
        bodyParser      =       require(    'body-parser'   ),
        cookieParser    =       require(    'cookie-parser' ),
        jade            =       require(    'jade'),
        ResSend         =       require("./ResSend");


app.use(    logger('dev')      );
app.use(bodyParser.urlencoded({limit: '500mb', extended: true }));
app.use(    cookieParser()          );
app.set('trust proxy');
app.set(    'view engine', 'jade'
);
app.use(    express.static('file')  );


var Routes = require("./routes");


app.route(Routes("index").path)
    .get(Routes("index").Handler);

app.route(Routes("register").path)
    .get(Routes("register").Handler.Get);

app.route(Routes("register").path)
    .post(Routes("register").Handler.Post);

app.route(Routes("auth").path)
    .get(Routes("auth").Handler.Get);

app.route(Routes("auth").path)
    .post(Routes("auth").Handler.Post);

/*
 путь к главной странице, тут проверяем наличие ключа в куках
 если ключа нет, то редиректим на авторизацию, из которой можно прийти в регистрацию
 */
//app.route("/")
//    .get(function(req,res){
//       if(['key_alpico'] in req.cookies){
//           require("./db_query")(req,function(result) {
//               ['render'] in result ? res.render(result.render, result.json)
//                   : ['json'] in result ? res.json(result.json)
//                   : res.sendStatus(result.status);
//           });
//       } else{
//           res.redirect("/login");
//       }
//    });

app.route("/login")
    .get(function(req,res){
        ['key_alpico'] in req.cookies ? res.redirect("/404")
            : res.render("login");
    })
    .post(function(req,res){
        ['key_alpico'] in req.cookies ? res.redirect("/404")
            : require("./db_login")(req,function(result){
            ResSend(res,result);
        });
    });
/*
 рендеринг страницы регистрации, тоже проверка на наличие ключа, чтобы уже авторизованный пользователь
 не смог зарегистрироваться

 для удобства (моего :) ) имеется файл ResSend.js, который будет обрабатывать наш результирующий объект
 в нормальый вид, ибо мы перешли к модели, в которую не грузим response, а только request
*/
app.route("/register")
    .get(function(req,res){
        ['key_alpico'] in req.cookies ? res.redirect("/404")
            : res.render("register");
    })
    .post(function(req,res){
        ['key_alpico'] in req.cookies ? res.redirect("/404")
            : require("./db_register")(req,function(result){
            ResSend(res,result);
        });
    });

app.route("/404")
    .all(function(req,res){
        res.sendStatus(404);
    });

app.listen(9000);
console.log('server start!');