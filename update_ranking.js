var mysql = require('mysql');

function Update_ranking() {
  this.get_new_ranking = function(win){
      var that=this;
      var R1=Math.pow(10,(that.attacker_ranking/400))
      var R2=Math.pow(10,(that.defender_ranking/400))
      var E1=R1/(R1+R2)
      var E2=R2/(R1+R2)
      var r1=that.attacker_ranking+that.factor*(win-E1)
      if (win==1)win=-1
      var r2=that.defender_ranking+that.factor*(win+1-E2)
      return [r1,r2]
  };
  this.init = function() {
    var that=this;
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'rajat',
      password: 'new life',
      database: 'kings'
    });

    connection.connect();

    connection.query('SELECT attacker_king,defender_king,attacker_outcome FROM battles where attacker_king <> "" and defender_king <> "" ', function(err, result, fields) {
        if (err) throw err;
        connection.query('SELECT 1 FROM kings LIMIT 1',function(err, exists){
          if (err){
            connection.query('CREATE TABLE king (name VARCHAR(20), battles int,number_of_wins int,number_of_lost int, ranking int);')
          };
        })
        that.factor=32;
        for (battle in result){
          that.attacker=result[battle].attacker_king;
          that.defender=result[battle].defender_king;
          that.win=result[battle].attacker_outcome;
          that.attacker_battles=0;
          that.attacker_losts=0;
          that.attacker_wins=0;
          that.attacker_ranking=400;
          that.defender_battles=0;
          that.defender_losts=0;
          that.defender_wins=0;
          that.defender_ranking=400;
          connection.query(
            'SELECT * FROM kings WHERE name=' + that.attacker +''
            ,function(err,exists) {
              console.log(exists)
              if (!exists){
                connection.query('insert into kings (name,battles,number_of_wins,number_of_lost,ranking) values (' +that.attacker+ ',0,0,0,400)')
              } else{
                that.attacker_battles=exists[0].battles
                that.attacker_wins=exists[0].number_of_wins
                that.attacker_losts=exists[0].number_of_lost
                that.attacker_ranking=exists[0].ranking
              }
            })
          connection.query(
            'SELECT * FROM kings WHERE name=' + that.defender + ''
            ,function(err,exists) {
              console.log(exists)
              if (!exists){
                connection.query('insert into kings (name,battles,number_of_wins,number_of_lost,ranking) values (' +that.defender +',0,0,0,400)')
              }else{
                that.defender_battles=exists[0].battles
                that.defender_wins=exists[0].number_of_wins
                that.defender_losts=exists[0].number_of_lost
                that.defender_ranking=exists[0].ranking
              }
            })
          if(that.win=='win'){
              var new_rank=that.get_new_ranking(1)
              connection.query('update kings set battles='+
                String(that.attacker_battles+1)+ ' number_of_wins='+
                String(that.attacker_wins+1)+' ranking='+String(new_rank[0])+
                ' where name='+that.attacker)
              connection.query('update kings set battles='+
                String(that.defender_battles+1)+ ' number_of_lost='+
                String(that.defender_losts+1)+' ranking='+String(new_rank[1])+
                ' where name='+that.defender)

          }else{
              var new_rank=that.get_new_ranking(0)
              connection.query('update kings set battles='+
                String(that.attacker_battles+1)+ ' number_of_lost='+
                String(that.attacker_losts+1)+' ranking='+String(new_rank[0])+
                ' where name='+that.attacker)
              connection.query('update kings set battles='+
                String(that.defender_battles+1)+ ' number_of_wins='+
                String(that.defender_wins+1)+' ranking='+String(new_rank[1])+
                ' where name='+that.defender)
          }
        };
      });

    connection.end();
  };
}

module.exports = new Update_ranking();
