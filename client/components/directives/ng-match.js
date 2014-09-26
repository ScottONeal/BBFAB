angular.module('bbfabApp').directive('ngMatch', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      'ngMatch': '='
    },
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {
        return (ctrl.$pristine && angular.isUndefined(ctrl.$viewValue)) || scope.ngMatch.$viewValue === ctrl.$viewValue;
      }, function(currentValue){
        ctrl.$setValidity('match', currentValue);
      });
    }
  };
});
