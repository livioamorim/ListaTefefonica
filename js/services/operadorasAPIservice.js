angular.module("listaTelefonica").service("operadorasAPI", function($http, config){
  this.getOperadoras = function(){
      return $http.get(config.baseURL + "/operadoras");
  };

  // this.setOperadoras = function(operadora){
  //     return $http.post("http://localhost:3412/operadoras", operadora);
  // };

});
