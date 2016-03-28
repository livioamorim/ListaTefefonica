angular.module("listaTelefonica").controller("detalhesOperadoraControlador", function ($scope, $routeParams, operadora){

  $scope.operadora = operadora.data;

});

// SEM RESOLVE na rota '/detalhesContato'
// angular.module("listaTelefonica").controller("detalhesOperadoraControlador", function ($scope, $routeParams,operadorasAPI){
//
//   console.log($routeParams.nome);
//
//   operadorasAPI.getOperadora($routeParams.nome).success(function (operadora) {
//     $scope.operadora = operadora;
//   });
//
// });
