var express = require('express');
var app = express();
var fs = require("fs");
const https = require('https');



app.get('/listUsers', function (req, res) {
    

  var http = require('http');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'https://services.guitarguitar.co.uk',
  path: '/WebService/api/hackathon/guitars'
   };
   

callback = function(response) {
  var str = '';

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback).end();






    })


var server = app.listen(8081, function () {
   var host = "localhost"
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})



















// const https = require('https');

// https.get('https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars', (resp) => {
//   let data = '';

//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   resp.on('end', () => {
//     console.log(data);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });
