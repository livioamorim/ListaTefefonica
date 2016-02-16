var get = function (url,callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4){
      callback(xhr.responseText, xhr.status);
    }
  };
  xhr.open('GET',url);
  xhr.send(null);
};

get("http://localhost:3412/contatos", function(data){console.log(data);});

get("http://localhost:3412/contatos", function(data){
  document.getElementById("ajax").innerHTML = data;
});
