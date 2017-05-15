(function () {
    'use strict';

    angular.module('mdCrudModule')
    .directive('mdCrudInputNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
              ngModel.$parsers.push(function(value) {
                  return (typeof value != 'number') ? parseFloat(value) : value;
              });
              ngModel.$formatters.push(function(value) {
                  return (typeof value != 'number') ? parseFloat(value) : value;
              });
            }
        };
    })
    .directive('mdCrudInputBoolean', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
              ngModel.$parsers.push(function(value) {
                  return (typeof value != 'boolean') ? value == 'true' : value;
              });
              ngModel.$formatters.push(function(value) {
                  return (typeof value != 'boolean') ? value == 'true' : value;
              });
            }
        };
    });    
})();