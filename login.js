module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getLogin(res, mysql, context, complete){
        mysql.pool.query("SELECT user_id as id, username, password FROM users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user  = results;
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getLogin(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('login', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

	var query = "SELECT user_id as id FROM users WHERE users.username LIKE " + mysql.pool.escape(req.body.username);
	console.log(query)

        sql = mysql.pool.query(query, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else if(results == 0){
		console.log("No user exists")
		res.redirect('/login_error')
	    }else{
		console.log("Made it here :)")
		query = "SELECT user_id as id FROM users WHERE users.password LIKE " + mysql.pool.escape(req.body.password);
        console.log(query)

        sql = mysql.pool.query(query, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
 	    }else if(results == 0){
                console.log("No user exists")
                res.redirect('/login_error')
	    }else{
		console.log("LOGIN SUCCESSFUL!")
		console.log(results)
                res.redirect('/media');
            }
	});
	}
        });
    });


return router;
}();
