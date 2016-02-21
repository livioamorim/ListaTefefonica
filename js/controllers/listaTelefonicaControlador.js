angular.module("listaTelefonica").controller("listaTelefonicaControlador", function ($scope, $http,$filter){

  $scope.app = "Lista Telefonica";

  $scope.contatos = [
    // {nome: $filter('uppercase')("Pedro"), telefone: "9999-8888", data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
    // {nome: "Ana", telefone: "9999-7777", data: new Date(), operadora: {nome: "TIM", codigo: 41, categoria: "Celular"}},
    // {nome: "Maria", telefone: "9999-6666", data: new Date(), operadora: {nome: "Claro", codigo: 21, categoria: "Celular"}},
    // {nome: "Lívio", telefone: "9999-5555", data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
  ];

  $scope.operadoras = [
    // {nome: "Oi", codigo: 14, categoria: "Celular", preco:4},
    // {nome: "TIM", codigo: 41, categoria: "Celular", preco:3},
    // {nome: "Claro", codigo: 21, categoria: "Celular", preco:2},
    // {nome: "Vivo", codigo: 15, categoria: "Celular", preco:3},
    // {nome: "Convergia", codigo: 32, categoria: "Fixo", preco:3},
    // {nome: "Intelig", codigo: 23, categoria: "Fixo", preco:1},
    // {nome: "CTBC", codigo: 12, categoria: "Fixo", preco:3},
    // {nome: "Sercomtel", codigo: 43, categoria: "Fixo", preco:5},
    // {nome: "Aerotech", codigo: 17, categoria: "Celular", preco:3},
    // {nome: "GVT", codigo: 25, categoria: "Fixo", preco:1},
  ];

  var carregarContatos = function () {
    $http.get("http://localhost:3412/contatos").success(function(data){
        $scope.contatos = data;
    }).error(function(data,status){
      $scope.message = "Aconteceu um problema: " + data;
    });
  };

  var carregarOperadoras = function () {
    $http.get("http://localhost:3412/operadoras").success(function(data){
        $scope.operadoras = data;
    });
  };

  $scope.adicionarContato = function (contato) {
    // $scope.contatos.push(angular.copy(contato));
    contato.data = new Date();
    $http.post("http://localhost:3412/contatos",contato).success(function(data){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();/*VER COMO USAR RETORNO*/
    });
  };

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

  carregarContatos();
  carregarOperadoras();

});
