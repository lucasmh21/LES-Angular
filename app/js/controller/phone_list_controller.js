angular.module("PhoneList").controller("PhoneListController", function($scope, $http, contactsAPI, operatorsAPI){
  $scope.title = "Lista telefônica";

  let upload_contacts = function(){
    contactsAPI.getContacts().success(function(data){
      $scope.contacts = data;
    }).error(function(data, status){
      $scope.error = "Aconteceu um problema ao carregar os contatos - " + data;
    });
  };

  let upload_operators = function(){
    operatorsAPI.getOperators().success(function(data){
      $scope.operators = data;
    }).error(function(data, status){
      $scope.error = "Aconteceu um problema ao carregar as operadoras - " + data;
    });
  };

  $scope.add_contact = function(contact){
    contactsAPI.saveContacts(contact).success(function(data){
      delete $scope.contact;
      $scope.contactForm.$setPristine();
      upload_contacts();
    }).error(function(data, status){
      $scope.error = "Aconteceu um problema ao salvar o contact" + data;
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
      contactsAPI.deleteContacts(contact).success(function(data){
        delete $scope.contact;
        $scope.contactForm.$setPristine();
        upload_contacts();
      }).error(function(data, status){
        $scope.error = "Aconteceu um problema ao excluir o contact" + data;
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
