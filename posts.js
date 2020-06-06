module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getReviews(res, mysql, context, complete){
        mysql.pool.query("SELECT review.review_id as id, review.review_movie_tv, review.review_title, review.review_body, vid FROM review", function(error, results, fields){
	if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile  = results;
            complete();
        });
    }


function getMovieTitles(res, mysql, context, complete){
        mysql.pool.query("SELECT vm_id, vm_title FROM visual_media", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.title  = results;
            complete();
        });
    }


router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReviews(res, mysql, context, complete);
        getMovieTitles(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('posts', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        	 var sql = "INSERT INTO review (review_title, review_body, vid, review_movie_tv) VALUES (?,?,?,?)";
		 var inserts = [ req.body.review_title, req.body.review_body, req.body.vid, req.body.vid];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/userProfile');
            }
        });
	
    });


return router;
}();
