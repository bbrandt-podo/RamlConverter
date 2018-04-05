var ramlJSON;
var ramlXSD;



function getData(e) {

  var dropDown = document.getElementById('select').value;
  if (dropDown == 'JSON') {
    var dataJSON = document.getElementById('textarea').value;
    try {
      dataJSON = JSON.parse(dataJSON);
      dataJSON = JSON.stringify(dataJSON);
      alert("SUCCESS");
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        ramlJSON = xhr.response;
        sendRAML(ramlJSON);
      };
      xhr.open('POST', 'http://localhost:8080/convertJSON', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(dataJSON);
      e.preventDefault();
    } catch (ee) {
      alert("Invalid JSON due to the following error: \n" + ee);
      e.preventDefault();
    }
  } else if (dropDown == 'XSD') {
    var dataXSD = document.getElementById('textarea').value;
    try {
      if (window.DOMParser) {
         var parser = new DOMParser();
         dataXSD = parser.parseFromString(dataXSD, "application/xml");
        alert("SUCCESS");
        var xhr2 = new XMLHttpRequest();
        xhr2.onload = function() {
          ramlXSD = xhr2.response;
          sendRAML(ramlXSD);
        };
        xhr2.open('POST', 'http://localhost:8080/convertXSD', true);
        xhr2.setRequestHeader('Content-type', 'application/xml');
        xhr2.send(dataXSD);
        e.preventDefault();
      }
    } catch (ee) {
      alert("Invalid XSD due to the following error: \n" + ee);
      e.preventDefault();
    }

  } else {
    alert("Other conversion options currently being built. Try again later.");
  }

}

function sendRAML(raml) {

  document.getElementById('ramlarea').value = raml;

}
