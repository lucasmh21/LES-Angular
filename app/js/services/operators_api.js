angular.module("PhoneList").factory("operatorsAPI", function($http){
  let _getOperators = function(){
    return $http.get("http://localhost:4000/api/v1/operators");
  };

  return { getOperators: _getOperators };
});
