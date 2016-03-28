angular.module("listaTelefonica").service("operadorasAPI", function($http, config){
  this.getOperadoras = function(){
      return $http.get(config.baseURL + "/operadoras");
  };

  this.getOperadora = function(nome){
      return $http.get(config.baseURL + "/operadoras/" + nome );
  };
});
