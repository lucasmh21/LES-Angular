angular.module("PhoneList").directive("uiAlert", function(){
  return {
    templateUrl: 'view/alerts/alert.html',
    replace: true,
    restrict: 'AE',
    scope: {
      title: '@title',
      error: '=message'
    }
  };
});
