var connection = require( "../connection");
function King() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query("select distinct attacker_king from battles where attacker_king <> '' union distinct select distinct defender_king from battles where defender_king <> '' ",
       function(err, result) {
        con.release();
        res.json({'kings':result});
      });
    });
  };
}
module.exports = new King();
