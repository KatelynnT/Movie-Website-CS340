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

