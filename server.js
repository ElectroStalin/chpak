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
app.set(    'view engine', 'jade');
app.use(    express.static('file')  );
app.use(    '/file/css',            express.static('css')       );
app.use(    '/file/js',             express.static('js')        );

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

app.route(Routes("logout").path)
    .get(Routes("logout").Handler);

app.route(Routes("routes").path)
    .get(Routes("routes").Handler.Get);

app.route(Routes("routes").path)
    .post(Routes("routes").Handler.Post);

app.route(Routes("routes").path)
    .put(Routes("routes").Handler.Put);

app.route(Routes('people').path)
    .get(Routes('people').Handler.Get);

app.route(Routes('add').path)
    .get(Routes('add').Handler);

app.listen(9000);
console.log('server start!');


