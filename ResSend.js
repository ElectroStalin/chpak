var cryptos =require("./cryptos");

module.exports = function(res,results){
    if(results.error){
        res.status(results.error).end();//render('error',results.error);
    }else{
        if(results.cookie){
            if(results.cookie.remove){
                for(var i in results.cookie.remove){
                    res.clearCookie(results.cookie.remove[i]);
                }
            }
            if(results.cookie.add){
                for(var i in results.cookie.add){
                    res.cookie(results.cookie.add[i][0],cryptos(results.cookie.add[i][1]),{expires: new Date(Date.now() + 900000000), httpOnly: true });
                }
            }
        }
        if(results.redirect){
            res.redirect(results.redirect);
            return;
        }
        if(results.render){
            res.status(results.status).render(results.render,{});
        }else if(results.body){
            res.status(results.status).json(results.body).end();
        }else{
            res.status(results.status).end();
        }
    }
    return;
};
