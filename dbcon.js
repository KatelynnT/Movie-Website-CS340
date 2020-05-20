var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gallek',
  password        : 'Spikyfrosting35!',
  database        : 'cs340_gallek'
});
module.exports.pool = pool;
