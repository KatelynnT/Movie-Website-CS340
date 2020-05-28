module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getReviews(res, mysql, context, complete){
        mysql.pool.query("SELECT review_id as id, review_movie_tv, review_title, review_body, review_author FROM review", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile  = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReviews(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('posts', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO review (review_movie_tv, review_title, review_body, review_author) VALUES (?,?,?,?)";
	var inserts = [req.body.review_movie_tv, req.body.review_title, req.body.review_body, req.body.review_author];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/posts');
            }
        });
    });


return router;
}();
