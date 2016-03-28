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
      contato: function (contatosAPI, $route) {
        return contatosAPI.getContato($route.current.params.serial);
      }
    }
  });

  $routeProvider.when("/detalhesOperadora/:nome",{
    templateUrl: "view/detalhesOperadora.html",
    controller: "detalhesOperadoraControlador",
    resolve: {
      operadora: function (operadorasAPI, $route) {
        return operadorasAPI.getOperadora($route.current.params.nome);
      }
    }
  });

  $routeProvider.otherwise({redirectTo: "/contatos"});
 });
