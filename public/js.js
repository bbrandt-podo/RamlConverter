var raml;


function getData(e) {

  var dropDown = document.getElementById('select').value;
  if (dropDown == 'JSON'){
    var data = document.getElementById('textarea').value;
    try {
      data = JSON.parse(data);
      data = JSON.stringify(data);
      document.getElementById('textarea').value = data;
      alert("SUCCESS");
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        console.log('response ' + xhr.response);
        raml = xhr.response;
        sendRAML(raml);
      };

      xhr.open('POST', 'http://localhost:8080/convert', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(data);
      e.preventDefault();
    } catch (ee) {
      alert("Invalid JSON due to the following error: \n" + ee);
      e.preventDefault();
    }
  }else if (dropDown == 'XSD'){
    alert("XSD Function currently being built. Try again later.");
  }else{
    alert("Other conversion options currently being built. Try again later.");
  }

}

function sendRAML(raml) {

  document.getElementById('ramlarea').value = raml;

}
