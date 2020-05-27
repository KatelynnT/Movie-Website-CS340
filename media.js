module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMedia(res, mysql, context, complete){
        mysql.pool.query("SELECT vm_title, summary, img_url  FROM visual_media", function(error, results, fields){
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
                res.render('media', context);
            }

        }
    });

return router;
}();
