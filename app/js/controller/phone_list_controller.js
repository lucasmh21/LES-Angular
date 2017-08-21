angular.module("PhoneList").controller("PhoneListController", function($scope, $http){
    $scope.title = "Lista telefônica";

    let upload_contacts = function(){
        $http.get("http://localhost:4000/api/v1/contacts").success(function(data){
          $scope.contacts = data;
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao carregar os contacts" + data;
        });
    };

    let upload_operators = function(){
        $http.get("http://localhost:4000/api/v1/operators").success(function(data){
          $scope.operadoras = data;
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao carregar as operadoras" + data;
        });
    }

    $scope.add_contact = function(contact){
      $http.post("http://localhost:4000/api/v1/contact", contact).success(function(data){
        delete $scope.contact;
        $scope.contactForm.$setPristine();
        upload_contacts();
      }).error(function(data, status){
        $scope.message = "Aconteceu um problema ao salvar o contact" + data;
      });
    };

    $scope.is_selected = function(contacts){
      let selected_contacts = contacts.filter(function(contact){
          return contact.selected;
      });
      return selected_contacts;
    };

    $scope.delete_contact = function(contacts){
      let selected_contacts = $scope.is_selected(contacts);

      selected_contacts.forEach(function(contact){
        $http.delete("http://localhost:4000/api/v1/contact/" + contact.id).success(function(data){
          delete $scope.contact;
          $scope.contactForm.$setPristine();
          upload_contacts();
        }).error(function(data, status){
          $scope.message = "Aconteceu um problema ao excluir o contact" + data;
        });
      });
    };

    $scope.order_by = function(field){
      $scope.sorting_criteria = field;
      $scope.direction_order = !$scope.direction_order;
    };

    upload_contacts();
    upload_operators();
});
