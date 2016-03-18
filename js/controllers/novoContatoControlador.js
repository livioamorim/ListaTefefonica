angular.module("listaTelefonica").controller("novoContatoControlador", function ($location, $scope, contatosAPI, operadoras, serialGenerator){

$scope.operadoras = operadoras.data;

  $scope.adicionarContato = function (contato) {
    contato.serial = serialGenerator.generate();
    contatosAPI.setContatos(contato).success(function(data){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      $location.path("/contatos");
    });
  };
});
