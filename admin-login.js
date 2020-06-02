module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getAdminLogin(res, mysql, context, complete){
        mysql.pool.query("SELECT admin_id as id, admin_username, admin_password FROM admin", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.admin  = results;
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAdminLogin(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('admin-login', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');

        var query = "SELECT admin_id as id FROM admin WHERE admin.admin_username LIKE " + mysql.pool.escape(req.body.admin_username);
        console.log(query)

        sql = mysql.pool.query(query, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else if(results == 0){
                console.log("No user exists")
                res.redirect('/admin_login_error')
            }else{
                query = "SELECT admin_id as id FROM admin WHERE admin.admin_password LIKE " + mysql.pool.escape(req.body.admin_password);
        console.log(query)

        sql = mysql.pool.query(query, function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else if(results == 0){
                console.log("No user exists")
                res.redirect('/admin_login_error')
            }else{
                console.log("LOGIN SUCCESSFUL!")
                console.log(results)
                res.redirect('/admin');
            }
        });
        }
        });
    });


return router;
}();

