(function () {
    'use strict';

    angular
        .module('mdCrudModule')
        .directive('mdCrudForm', crudFormDirective);

    crudFormDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$injector', '$interpolate', '$sce', '$compile', '$document'];

    function crudFormDirective(crudService, toolsService, $injector, $interpolate, $sce, $compile, $document) {
        
        //Optional services
        var mdpTimePicker;
        try {
            mdpTimePicker = $injector.get('$mdpTimePicker');
        } catch(e) {
        }

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                options: "=",
                ngModel: "=",
                onOpen: "=",
                onEdit: "=",
                onDetail: "=",
                onCancel: "=",
                onSussces: "=",
                onSubmit: "=",
                templateUrl: "<?",
                editable: "<?",
                modelCopy: "<?"
            },
            template: '<div ng-include="getContentUrl()"></div>'            
        };
        return directive;

        function link($scope, element, attrs) {
            var text = crudService.text;
            $scope.text = text;

            var translate = crudService.options.translate;
            $scope.translate = translate;

            $scope.stringToHtml = function(str, data) {
                return $sce.trustAsHtml($interpolate(str)(data));
            }

            $scope.templateSelect = function(field) {
                var html = field.templateSelect || "<translate>{{option." + (field.text || 'text') + "}}</translate>"
                return html;
            }

            $scope.getModel = function(item, field) {
                if(field.model)
                    return toolsService.evalFunction(field.model, item);
                return item[field.name];
            }

            var options = $scope.options;
            $scope.fields = options.fields;
            $scope.readonly = $scope.editable == false;
            
            $scope.ef = toolsService.evalFunction;

            $scope.isLoading = false;

            $scope.item = ($scope.modelCopy)? angular.copy($scope.ngModel || {}) : $scope.ngModel;

            var idValue = $scope.item[options.id];
            $scope.formTitle = idValue ? (($scope.editable) ? text.editTitle : text.detailTitle) : text.createTitle;
            $scope.formType = idValue ? (($scope.editable) ? "edit" : "detail") : "create";
            $scope.getContentUrl = function(elem,attrs) {
                return $scope.templateUrl || '/views/crudForm.html'
            }
            $scope.showTimePicker = function(ev, item, fieldName) {
                if(mdpTimePicker) {
                    mdpTimePicker(item[fieldName], {
                        targetEvent: ev
                    }).then(function(selectedDate) {
                        item[fieldName] = selectedDate;
                    });
                }
            } 

            if ($scope.onOpen)
                $scope.onOpen($scope.item, $scope.formType);

            if (idValue && !options.offline) {                
                $scope.isLoading = true;
                var optionsHttp = angular.copy(options.http || {});
                optionsHttp.entity = options.entity;
                optionsHttp.id = idValue;
                crudService.getById(optionsHttp).then(function (response) {
                    //$scope.item = response.data;  
                    angular.extend($scope.item, response.data);                  
                    if ($scope.formType == 'edit' && $scope.onEdit)
                        $scope.onEdit($scope.item);                 
                    if ($scope.formType == 'detail' && $scope.onDetail)
                        $scope.onDetail($scope.item);
                    $scope.isLoading = false;
                }, function(data) {
                    if ($scope.onError)
                        $scope.onError(data);
                    $scope.cancel(data);
                });
            }

            $scope.save = function () {
                if ($scope.onSubmit)
                    $scope.onSubmit($scope.item, $scope.formType);
                if(!options.offline) {
                    var promise;
                    var optionsHttp = angular.copy(options.http || {});
                    optionsHttp.entity = options.entity;
                    optionsHttp.data = $scope.item;
                    if (idValue) {                    
                        optionsHttp.id = $scope.ngModel[options.id];
                        promise = crudService.patch(optionsHttp);
                    }
                    else {
                        promise = crudService.post(optionsHttp);
                    }
                    $scope.isLoading = true;
                    promise.then(function (response) {
                        angular.extend($scope.ngModel, response.data);
                        if ($scope.onSussces)
                            $scope.onSussces(response.data, $scope.formType);
                        $scope.isLoading = false;
                    }, function (data) {
                        if (data.details) {
                            $scope.errors = data.details;
                        }
                        else {
                            $scope.errors = [data.error];
                        }
                        if ($scope.onError)
                            $scope.onError(data);    
                        $scope.isLoading = false;                
                    });
                }
                else {
                    angular.extend($scope.ngModel, $scope.item);
                    if ($scope.onSussces)
                        $scope.onSussces($scope.item, $scope.formType);
                }
            }
            $scope.cancel = function (data) {
                if ($scope.onCancel)
                    $scope.onCancel(data);
            }
            $scope.onMarkerDrag = function (event) {
                $scope.item[this.data.lat] = event.latLng.lat();
                $scope.item[this.data.lng] = event.latLng.lng();
            }        
            $scope.isFormValid = function(formCrud) {
                if(!formCrud.$valid) {
                    //angular.element('input.ng-invalid').first().focus();
                    //angular.element($document[0].querySelector('.ng-invalid')).focus();
                    $document[0].querySelector('form .ng-invalid').focus();
                    return false;
                }
                return true;
            }
        }
    }
})();