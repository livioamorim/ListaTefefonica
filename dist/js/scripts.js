angular.module("listaTelefonica", ["ngMessages", "serialGenerator", "ui","ngRoute"]);

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

angular.module("listaTelefonica").config(function (serialGeneratorProvider) {
  serialGeneratorProvider.setLength(5);
  serialGeneratorProvider.setCharArray('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
});

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

angular.module("listaTelefonica").controller("novoContatoControlador", function ($location, $scope, contatosAPI, operadoras, serialGenerator){

  $scope.operadoras = operadoras.data;

  $scope.adicionarContato = function (contato) {
    // contato.serial = "44854";
    contato.serial = serialGenerator.generate();

    contatosAPI.setContatos(contato).success(function(data){
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      $location.path("/contatos");
    });
  };

});

angular.module("listaTelefonica").directive("uiAccordions", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      var accordions = [];

      this.registerAccordion = function (accordion) {
        accordions.push(accordion);
      };

      this.closeAll = function () {
        accordions.forEach(function (accordion) {
          accordion.isOpened = false;
        });
      };
    }
  };
});

angular.module("listaTelefonica").directive("uiAccordion", function () {
  return {
    templateUrl: "view/accordion.html",
    transclude: true,
    scope: {
      title: "@"
    },
    require: "^uiAccordions",
    link: function (scope, element, attrs, ctrl) {
      ctrl.registerAccordion(scope);
      scope.open = function () {
        ctrl.closeAll();
        scope.isOpened=true;
      };
    },
  };
});

angular.module("listaTelefonica").directive("uiAlert",function () {
  return{
    templateUrl: "view/alert.html",
    replace: true,
    restrict: "AE",
    scope: {
      title: "@",
    },
    transclude: true,
  };
});

angular.module("listaTelefonica").directive("uiDate",function ($filter) {
  return{
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      var _formatDate = function (date) {
        date = date.replace(/[^0-9]+/g,"");
        if(date.length > 2){
            date = date.substring(0,2) + "/" + date.substring(2);
        }
        if(date.length > 5){
            date = date.substring(0,5) + "/" + date.substring(5,9);
        }
        return date;
      };

      element.bind("keyup", function () {
        ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
        ctrl.$render();
      });

      ctrl.$parsers.push(function (value) {
        if(value.length===10){
          var dateArray = value.split("/");
          // console.log(dateArray);
          return new Date(dateArray[2],dateArray[1]-1,dateArray[0]);
        }
      });

      ctrl.$formatters.push(function (value) {
        return $filter("date")(value,"dd/MM/yyyy");
      });

    }
  };
});

angular.module("listaTelefonica").filter("ellipsis", function () {
  return function (input, size) {
    if (input.length<=size) return input;
    var output = input.substring(0,(size || 5)) + "...";
    return output;
  };
});

angular.module("listaTelefonica").filter("name",function () {
  return function (input) {
     var listaDeNomes = input.split(" ");
     var listaDeNomesFormatada = listaDeNomes.map(function (nome) {
       if (/(da|de|do|dos)/.test(nome)) return nome;
       return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
     });
     return listaDeNomesFormatada.join(" ");
  };
});

angular.module("listaTelefonica").factory("contatosAPI", function($http, config){
  var _getContatos = function(){
      return $http.get(config.baseURL + "/contatos");
  };

  var _getContato = function(serial){
      return $http.get(config.baseURL + "/contatos/" + serial);
  };

  var _setContatos = function(contato){
      return $http.post(config.baseURL + "/contatos", contato);
  };

  return {
    getContatos: _getContatos,
    getContato: _getContato,
    setContatos: _setContatos,
  };
});

angular.module("listaTelefonica").service("operadorasAPI", function($http, config){
  this.getOperadoras = function(){
      return $http.get(config.baseURL + "/operadoras");
  };

  this.getOperadora = function(nome){
      return $http.get(config.baseURL + "/operadoras/" + nome );
  };
});

angular.module("listaTelefonica").constant("config",{
  baseURL: "http://localhost:3412"
});

angular.module("serialGenerator", []);
angular.module("serialGenerator").provider("serialGenerator", function(){

  var _length;
  var _charArray;

  this.getLength = function () {
    return _length;
  };
  this.getCharArray = function () {
    return _charArray;
  };

  this.setLength = function (length) {
    _length = length;
  };
  this.setCharArray = function (charArray) {
    _charArray = charArray;
  };

  this.$get = function () {
    return {
      generate: function () {
        var serial = "";
        while (serial.length < _length){
          serial += _charArray.charAt(Math.floor(Math.random() * _charArray.length));

        }
        return serial;
      }
    };
  };

});

angular.module("ui",[]);

angular.module("ui").run(function ($templateCache) {
  $templateCache.put("view/accordion.html", '<div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>');
});

angular.module("ui").directive("uiAccordions", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      var accordions = [];

      this.registerAccordion = function (accordion) {
        accordions.push(accordion);
      };

      this.closeAll = function () {
        accordions.forEach(function (accordion) {
          accordion.isOpened = false;
        });
      }
    }
  };
});

angular.module("ui").directive("uiAccordion", function () {
  return {
    templateUrl: "view/accordion.html",
    transclude: true,
    scope: {
      title: "@"
    },
    require: "^uiAccordions",
    link: function (scope, element, attrs, ctrl) {
      ctrl.registerAccordion(scope);
      scope.open = function () {
        ctrl.closeAll();
        scope.isOpened=true;
      };
    },
  };
});
