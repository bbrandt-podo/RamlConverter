var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var raml2json = require('ramldt2jsonschema');
var port = 8080;
var app = express();
var yaml = require('js-yaml');
require('body-parser-xml')(bodyParser);

//Create server object with Express app variable
var server = app.listen(port, listening);

//Callback function for when the server is running. Simply output to console
//an indicator that the server is running
function listening(req, res) {
  console.log("Server is listening. . .");
}

//Give the server access to the local directory "public" that contains files
//relevant to the client side
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use the
app.use(bodyParser.json());
app.use(bodyParser.xml());

//ANY POST or GET requests will be re-routed to the respective "mainPost" and
//"mainGet" functions
app.get('*', mainGet);
app.post('*', mainPost);

/**
 * mainGet function handles all GET requests. Not currently necessary.
 *
 * @param req : Request object.
 * @param res : Response object.
 *
 */
function mainGet(req, res) {
  res.end();
}

/**
 * mainPost function handles all post requests by checking the req.url parameter
 * and handling accordingly
 *
 * @param req : Request object.
 * @param res : Response object.
 *
 */
function mainPost(req, res) {

  //Handle POST request to /convertJSON
  if (req.params[0] == '/convertJSON') {
    var jsonInput = req.body;
    var radioChoice = req.query;
    jsonInput = convertJSONtoRAML(jsonInput, radioChoice);
    res.send(jsonInput);

    //Handle POST request to /convertXSD
  } else if (req.url == '/convertXSD') {
    var xsdInput = req.body;
    xsdInput = convertXSDtoRAML(xsdInput);
    res.send(xsdInput);
  } else {
    res.send(null);
  }
  res.end();
}

/**
 * convertJSONtoRAML function is the "all-encompassing" function call to convert
 * the originally provided JSON data by the user, to RAML
 *
 * @param jsonInput : The JSON plain text given by the user that needs to be converted,
 * looped through, and parsed in order to be translated into RAML.
 *
 * @return raml : Formatted raml data.
 */
function convertJSONtoRAML(jsonInput, radioChoice) {



  //Parse JSON input to create JSON object that we can work with
  jsonInput = JSON.stringify(jsonInput);
  jsonInput = JSON.parse(jsonInput);
  var nullChoice = radioChoice.radioChoice;
  var nullChangeTo = radioChoice.nullChangeTo;

  //Call the Nesting function on the JSON input that handles all nesting
  Nesting(jsonInput);

  /**
   * Nesting function loops through the initial JSON object (utilizing recursion)
   * in order to handle all possible nesting cases (including Objects,
   * objects within objects, arrays within objects, and other complex JSON objects)
   *
   * @param object : The JSON object given by the user that needs to be looped
   * through and parsed
   *
   */
  function Nesting(object) {
    for (var i in object) {
      if (typeof object[i] == "object") {
        if (object[i] == null) {
            if (nullChoice == "remove"){
                delete object[i];
            }else if (nullChoice == "keep"){

            }else if (nullChoice == "replace"){
                object[i] = nullChangeTo;
            }

        } else {
          console.log(i + ": " + "\n");
        }
        Nesting(object[i]);
      } else if (Array.isArray(object)) {
        for (var j = 0; j < object.length; j++) {
          console.log(object[j]);
        }
        break;
      } else {
        console.log(i + ": " + object[i]);
      }
    }
  }

  var ramldata = yaml.safeDump(jsonInput, {
      'indent': 2        // sort object keys
  });
  return ramldata;
}


/**
 * convertXSDtoRAML function is the "all-encompassing" function call to convert
 * the originally provided XSD data by the user, to RAML.
 *
 * @param xsdInput : The XSD plain text given by the user that needs to be converted,
 * looped through, and parsed in order to be translated into RAML.
 *
 */
function convertXSDtoRAML(xsdInput) {


  xsdInput = JSON.stringify(xsdInput);
  xsdInput = JSON.parse(xsdInput);
  var ramldata = yaml.safeDump(xsdInput);
  return ramldata;


}




/**
 * Commented out section for now. It handles JSON -> RAML conversion via
 * someone elses npm package. It works, but not exactly how we would like it to.
 * The plan is to use the code provided on github as a reference point.
 *
 */

// var ramlData;
// raml2json.js2dt(jsonInput, 'Person', function(err, raml){
//   if (err){
//     console.log(err);
//     return;
//   }
//   ramlData = raml;
// });
//
//   return ramlData;
