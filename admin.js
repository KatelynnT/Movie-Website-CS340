module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMedia(res, mysql, context, complete){
        mysql.pool.query("SELECT vm_id as id, vm_title, seasons, episodes, summary FROM visual_media", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.media  = results;
            complete();
        });
    }

  function getSingleMedia(res, mysql, context, id, complete){
        var sql = "SELECT vm_id as id, vm_title, summary, episodes, seasons, img_url FROM visual_media WHERE vm_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.media = results[0];
            complete();
        });
    }

router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = [ "updatemedia.js"];
        var mysql = req.app.get('mysql');
        getSingleMedia(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-admin', context);
            }

        }
    });

router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE visual_media SET vm_title=?, summary=?, episodes=?, seasons=?, img_url=? WHERE vm_id=?";
	var inserts = [req.body.vm_title, req.body.summary, req.body.episodes, req.body.seasons, req.body.img_url, req.params.id];
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
router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMedia(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('admin', context);
            }

        }
    });


router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO visual_media (vm_title, seasons, episodes, summary, img_url) VALUES (?,?,?,?,?)";
        var inserts = [req.body.vm_title, req.body.seasons, req.body.episodes, req.body.summary, req.body.img_url];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/admin');
            }
        });
    });


return router;
}();

