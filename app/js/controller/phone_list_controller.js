angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $http){
    $scope.titulo = "Lista telefônica";

    let carregarContatos = function(){
        $http.get("http://localhost:4000/api/v1/contacts").success(function(data){
          $scope.contatos = data;
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao carregar os contatos" + data;
        });
    };

    let carregarOperadoras = function(){
        $http.get("http://localhost:4000/api/v1/operators").success(function(data){
          $scope.operadoras = data;
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao carregar as operadoras" + data;
        });
    }

    $scope.adicionarContato = function(contato){
      $http.post("http://localhost:4000/api/v1/contact", contato).success(function(data){
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
        carregarContatos();
      }).error(function(data, status){
        $scope.message = "Aconteceu um problema ao salvar o contato" + data;
      });
    };

    $scope.isSelecionado = function(contatos){
      let contatoSelecionado = contatos.filter(function(contato){
          return contato.selecionado;
      });
      return contatoSelecionado;
    };

    $scope.removerContato = function(contatos){
      let contatos_selecionados = $scope.isSelecionado(contatos);

      contatos_selecionados.forEach(function(contato){
        $http.delete("http://localhost:4000/api/v1/contact/" + contato.id).success(function(data){
          delete $scope.contato;
          $scope.contatoForm.$setPristine();
          carregarContatos();
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao excluir o contato" + data;
        });
      });
    };

    $scope.ordenarPor = function(campo){
      $scope.criterioOrdenacao = campo;
      $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();
});
