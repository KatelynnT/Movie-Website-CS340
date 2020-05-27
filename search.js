module.exports = function(){
    var express = require('express');
    var router = express.Router();


function getMediaFromSearch(req, res, mysql, context, complete) {
var query = "SELECT vm_title, seasons, episodes, summary, img_url FROM visual_media WHERE visual_media.vm_title LIKE " + mysql.pool.escape(req.params.s);
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.media = results;
            complete();
     });
 }

function getUser(res, mysql, context, complete){
        mysql.pool.query("SELECT user_id as id, username FROM users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.userSearch  = results;
            complete();
        });
    }

router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["searchMedia.js"];
        var mysql = req.app.get('mysql');
        getUser(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('search', context);
            }

        }
    });

router.get('/media/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
	context.jsscripts = ["searchMedia.js"];
        var mysql = req.app.get('mysql');
        getMediaFromSearch(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('media', context);
            }
        }
    });

return router;
}();
