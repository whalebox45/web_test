var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();

var mysql = require("./mysql_config");
var db = mysql.db;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/ohlc/:stockid', function(req,res){
    security_code = req.params.stockid;
    db.query('select date, security_code, name'+
    'open_price, highest_price, lowest_price, closing_price '+
    'from stock_2018 where security_code=? ;',[security_code],
    function(err,row,fields){
        if(err) throw err;
        console.log(JSON.stringify(row));
    })
    res.end(req.params.stockid);
    
})

app.get('/listUser/:uuid', function (req, res) {
   // First read existing users.
   fs.readFile( "./" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.uuid] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Web app listening at http://%s:%s", host, port)

})

