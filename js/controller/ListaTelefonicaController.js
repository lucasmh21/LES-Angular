angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $http){
    $scope.titulo = "Lista telefônica";

    $scope.contatos = [{nome: 'Lucas', telefone: '4721-1669'},
                       {nome: 'Marcia', telefone: '97360-2898'},
                       {nome:'Oscar', telefone:'9740-0799'}];

    $scope.operadoras = [{nome:'Vivo', codigo:'015', categoria:'Celular'},
                        {nome:'Oi', codigo:'031', categoria:'Celular'},
                        {nome:'Claro', codigo:'021', categoria:'Celular'},
                        {nome:'Tim', codigo:'041', categoria:'Celular'},
                        {nome:'GVT', codigo:'001', categoria:'Residencial'},
                        {nome:'Embratel', codigo:'002', categoria:'Residencial'}];

    /* */
  /*  var carregarContatos = function()
    {
        $http.get("").success(function(data){
            $scope.contatos = data;
        }).error(function(data, status){
            $scope.message = "Aconteceu um problema ao carregar os contatos" + data;
        });
    };
    var carregarOperadoras = function()
    {
        $http.get("").success(function(data){ 
            $scope.operadoras = data;
        }).error(function(data, status){
            $scope.message = "Aconteceu um problema ao carregar as operadoras" + data;
        });
    }*/
    /*
    $scope.adicionarContato = function(contato)
    {
        $scope.contatos.push(angular.copy(contato));
        delete $scope.contato;
        $scope.contatoForm.$setPristine();
    };*/

    $scope.adicionarContato = function(contato)
    {
        $http.post("", contato).success(function(data){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };

    $scope.removerContato = function(contatos)
    {
        $scope.contatos = contatos.filter(function(contato){
            if(!contato.selecionado)
                return contato;
        });
    };

    $scope.isSelecionado = function(contatos)
    {
        var contatoSelecionado = contatos.some(function(contato){
            return contato.selecionado;
        });
        return contatoSelecionado;
    };

    $scope.ordenarPor = function(campo)
    {
        $scope.criterioOrdenacao = campo;
        $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
    };
    /*carregarContatos();
    carregarOperadoras();*/
});