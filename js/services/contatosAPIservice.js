angular.module("listaTelefonica").factory("contatosAPI", function($http, config){
  var _getContatos = function(){
      return $http.get(config.baseURL + "/contatos");
  };

  var _setContatos = function(contato){
      return $http.post(config.baseURL + "/contatos", contato);
  };
  return {
    getContatos: _getContatos,
    setContatos: _setContatos
  }
});
