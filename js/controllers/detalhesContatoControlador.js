angular.module("listaTelefonica").controller("detalhesContatoControlador", function ($scope, $routeParams, contato){

  $scope.contato = contato.data;

});


// SEM RESOLVE na rota '/detalhesContato'
// angular.module("listaTelefonica").controller("detalhesContatoControlador", function ($scope, $routeParams,contatosAPI){
//
// console.log($routeParams.serial);
//
// contatosAPI.getContato($routeParams.serial).success(function (contato) {
//   $scope.contato = contato;
// });
//
//
// });
