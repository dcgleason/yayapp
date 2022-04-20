var pg = require('pg');
let dotenv = require('dotenv');

// if .env file is located in root directory
dotenv.config()
//or native libpq bindings
//var pg = require('pg').native

var conString = process.env.POSTGRESQL_URL
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(`SELECT * FROM bundles`, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});