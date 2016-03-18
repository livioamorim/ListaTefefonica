angular.module("listaTelefonica").config(function ($routeProvider) {
  $routeProvider.when("/contatos",{
    templateUrl: "view/contatos.html",
    controller: "listaTelefonicaControlador"
  });

  $routeProvider.when("/novoContato",{
    templateUrl: "view/novoContato.html",
    controller: "listaTelefonicaControlador"
  });
 });
