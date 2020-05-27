var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_thornka',
  password        : '2783',
  database        : 'cs340_thornka'
});
module.exports.pool = pool;
