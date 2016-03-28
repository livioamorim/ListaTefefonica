angular.module("listaTelefonica").controller("listaTelefonicaControlador", function ($scope, $filter, contatos, operadoras){

  $scope.app = "Lista Telefonica";
  $scope.contatos = contatos.data;
  $scope.operadoras = operadoras.data;

  $scope.apagarContato = function (contatos) {
    $scope.contatos = contatos.filter(function (contato){
      if (!contato.selecionado) return contato;
    });
  };

  $scope.isContatoSelecionado = function (contatos) {
    return contatos.some(function (contato) {
      return contato.selecionado;
    }
    );
  };
  
  $scope.ordenarPor = function (campo){
    $scope.criterioOrdenacao = campo;
    $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
  };
});
