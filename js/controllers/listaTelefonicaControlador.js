angular.module("listaTelefonica").controller("listaTelefonicaControlador", function ($scope, $filter, contatos, operadoras, serialGenerator){

  $scope.app = "Lista Telefonica";
  $scope.contatos = contatos.data;
  $scope.operadoras = operadoras.data;

  //
  // var carregarContatos = function () {
  //   contatosAPI.getContatos().success(function(data){
  //       $scope.contatos = data;
  //   }).error(function(data,status){
  //     $scope.error = "Não foi possível carregar os contatos!";
  //   });
  // };

  // var carregarOperadoras = function () {
  //   operadorasAPI.getOperadoras().success(function(data){
  //     $scope.operadoras = data;
  //   });
  // };
  //
  // $scope.adicionarContato = function (contato) {
  //   contato.serial = serialGenerator.generate();
  //   // contato.data = new Date();
  //   contatosAPI.setContatos(contato).success(function(data){
  //     delete $scope.contato;
  //     $scope.contatoForm.$setPristine();
  //     carregarContatos();/*VER COMO USAR RETORNO*/
  //   });
  // };

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

  // carregarContatos();
  // carregarOperadoras();

});
