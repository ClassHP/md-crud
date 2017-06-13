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
    })
    .directive("mdCrudInputValidator", function () {
        return {
            require: "ngModel",
            scope: {
                validator: "=mdCrudInputValidator",
                item: "=item"
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.mdCrudInputValidator = function (modelValue) {
                    if(angular.isFunction(scope.validator))
                        return !angular.isDefined(scope.validator(modelValue, scope.item))
                    return !angular.isDefined(scope.validator);
                };
            }
        };
    });    
})();