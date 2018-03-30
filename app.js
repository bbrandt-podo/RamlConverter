var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var raml2json = require('ramldt2jsonschema');
var port = 8080;
var app = express();

var jsonInput;


var server = app.listen(port, listening);

function listening(req, res) {
  console.log("Server is listening. . .");
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('*', mainGet);
app.post('*', mainPost);



function mainGet(req, res) {
  res.end();
}


function mainPost(req, res) {

  if (req.url == '/convert') {
    jsonInput = req.body;
    jsonInput = convertToRAML(jsonInput);
  } else {
    data = null;
  }

  res.send(jsonInput);
  res.end();

}

function convertToRAML(jsonInput) {

jsonInput = JSON.stringify(jsonInput);
var ramlData;
raml2json.js2dt(jsonInput, 'Person', function(err, raml){
  if (err){
    console.log(err);
    return;
  }
  ramlData = raml;
});

  return ramlData;
}
