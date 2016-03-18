angular.module("listaTelefonica").config(function ($routeProvider) {
  $routeProvider.when("/contatos",{
    templateUrl: "view/contatos.html",
    controller: "listaTelefonicaControlador",
    resolve: {
      contatos: function (contatosAPI) {
        return contatosAPI.getContatos();
      },
      operadoras: function (operadorasAPI) {
        return operadorasAPI.getOperadoras();
      }
    }
  });

  $routeProvider.when("/novoContato",{
    templateUrl: "view/novoContato.html",
    controller: "novoContatoControlador",
    resolve: {
      operadoras: function (operadorasAPI) {
        return operadorasAPI.getOperadoras();
      }
    }
  });

  $routeProvider.when("/detalhesContato/:serial",{
    templateUrl: "view/detalhesContato.html",
    controller: "detalhesContatoControlador",
    resolve: {
      contatos: function (contatosAPI) {
        return contatosAPI.getContatos();
      }
    }
  });

  $routeProvider.otherwise({redirectTo: "/contatos"});
 });
