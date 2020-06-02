module.exports = function(){
    var express = require('express');
    var router = express.Router();

function getReview(res, mysql, context, complete){
        mysql.pool.query("SELECT review_id as id, review_movie_tv, review_title, review_body FROM review", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile = results;
            complete();
        });
    }


    function getSingleReview(res, mysql, context, id, complete){
        var sql = "SELECT review_id as id, review_movie_tv, review_title, review_body FROM review WHERE review_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile = results[0];
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReview(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('userProfile', context);
            }

        }
    });

router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = [ "updatereview.js"];
        var mysql = req.app.get('mysql');
        getSingleReview(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-review', context);
            }

        }
    });

router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE review SET review_movie_tv=?, review_title=?, review_body=? WHERE review_id=?";
        var inserts = [req.body.review_movie_tv, req.body.review_title, req.body.review_body, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

function getReviewFromTitle(req, res, mysql, context, complete) {
var query = "SELECT review_id as id, review_movie_tv, review_title, review_body FROM review  WHERE review.review_movie_tv LIKE " + mysql.pool.escape(req.params.s);
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userProfile = results;
            complete();
     });
 }

router.get('/media_review/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getReviewFromTitle(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('userProfile', context);
            }
        }
    });

router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM review WHERE review_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();

