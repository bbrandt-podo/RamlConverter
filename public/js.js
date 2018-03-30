var raml;


function getData(e) {

  var dropDown = document.getElementById('select').value;
  if (dropDown == 'JSON') {
    var dataJSON = document.getElementById('textarea').value;
    try {
      dataJSON = JSON.parse(dataJSON);
      dataJSON = JSON.stringify(dataJSON);
      document.getElementById('textarea').value = dataJSON;
      alert("SUCCESS");
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        console.log('response ' + xhr.response);
        raml = xhr.response;
        sendRAML(raml);
      };

      xhr.open('POST', 'http://localhost:8080/convert', true);
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
        dataXSD = parser.parseFromString(dataXSD, "text/xml");
        console.log(dataXSD);

        var count = dataXSD.documentElement.childNodes;
        console.log(count);
        // var count = dataXSD.getElementsByTagName("id").length;
        // for (i = 0; i < count; i++) {
        //   console.log(dataXSD.getElementsByTagName("id")[i].childNodes[0].nodeValue);
        // }



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
