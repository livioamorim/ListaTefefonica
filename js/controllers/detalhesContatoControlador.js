angular.module("listaTelefonica").controller("detalhesContatoControlador", function ($scope, $routeParams, contatosAPI){
console.log($routeParams.serial);
contatosAPI.getContato($routeParams.serial);
});
