angular.module("PhoneList").factory("contactsAPI", function($http){
  let _getContacts = function(){
    return $http.get("http://localhost:4000/api/v1/contacts");
  };

  let _saveContacts = function(contact){
    return $http.post("http://localhost:4000/api/v1/contact", contact);
  };

  let _deleteContacts = function(contact) {
    return $http.delete("http://localhost:4000/api/v1/contact/" + contact.id);
  };

  return {
    getContacts: _getContacts,
    saveContacts: _saveContacts,
    deleteContacts: _deleteContacts
  };
});
