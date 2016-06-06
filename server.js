var     express         =       require(    'express'       ),
    app             =       express(),
    logger          =       require(    'morgan'        ),
    bodyParser      =       require(    'body-parser'   ),
    cookieParser    =       require(    'cookie-parser' ),
    jade            =       require(    'jade'          );


app.use(    logger('dev')      );
app.use(bodyParser.urlencoded({limit: '500mb', extended: true }));
app.use(    cookieParser()          );
app.set('trust proxy');
app.set(    'view engine', 'jade'
);
app.use(    express.static('file')  );


app.route("/")
    .all(function(req,res){
        require("./db_query")(req,function(result){
            ['render'] in result ? res.render(result.render,result.json)
                : ['json'] in result ? res.json(result.json)
                    : res.sendStatus(result.status);
        });
    })

app.route('/register')

    .all(function(req,res){
       require("./db_register")(req,function(result){
           res.render('register')
       });

})

app.listen(9000);
console.log('server start!');