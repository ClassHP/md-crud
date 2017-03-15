(function () {
    'use strict';

    angular
        .module('mdCrudModule')
        .directive('mdCrudForm', crudFormDirective);

    crudFormDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$injector'];

    function crudFormDirective(crudService, toolsService, $injector) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                options: "=",
                ngModel: "=",
                onOpen: "=",
                onEdit: "=",
                onCancel: "=",
                onSussces: "=",
                templateUrl: "<?",
                editable: "<?"
            },
            template: '<div ng-include="getContentUrl()"></div>'            
        };
        return directive;

        function link($scope, element, attrs) {
            var options = $scope.options;
            $scope.fields = options.fields;
            $scope.readonly = $scope.editable == false;
            
            $scope.ef = toolsService.evalFunction;

            var idValue = $scope.ngModel[options.id];
            $scope.formTitle = idValue ? (($scope.editable) ? "Editar" : "Detalle") : "Nuevo";
            $scope.formType = idValue ? (($scope.editable) ? "edit" : "detail") : "create";
            $scope.fields = options.fields;
            $scope.item = {};
            $scope.getContentUrl = function(elem,attrs) {
                return $scope.templateUrl || '/views/crudForm.html'
            }
            var mdpTimePicker = null;
            try{
                mdpTimePicker = $injector.get('$mdpTimePicker');
            }catch(e){
            }
            $scope.showTimePicker = function(ev, item, fieldName) {
                if(mdpTimePicker != null) {
                    mdpTimePicker(item[fieldName], {
                        targetEvent: ev
                    }).then(function(selectedDate) {
                        item[fieldName] = selectedDate;
                    });
                }
            } 

            if ($scope.onOpen)
                $scope.onOpen($scope.item);

            if (idValue) {
                crudService.getById({
                    entity: options.entity, 
                    id: idValue, 
                    rootApi: options.rootApi
                }).then(function (data) {
                    $scope.item = data;
                    if ($scope.onEdit)
                        $scope.onEdit($scope.item);
                }, function(data) {
                    if ($scope.onError)
                        $scope.onError(data);
                });
            }

            $scope.save = function () {
                var promise;
                if (idValue) {
                    promise = crudService.patch({
                        entity: options.entity, 
                        id: $scope.item[options.id], 
                        data: $scope.item, 
                        rootApi: options.rootApi
                    });
                }
                else {
                    promise = crudService.post({
                        entity: options.entity, 
                        data: $scope.item, 
                        rootApi: options.rootApi
                    });
                }
                promise.then(function (data) {
                    angular.copy(data, $scope.ngModel);
                    if ($scope.onSussces)
                        $scope.onSussces(data, $scope.formType);
                }, function (data) {
                    if (data.details) {
                        $scope.errors = data.details;
                    }
                    else {
                        $scope.errors = [data.error];
                    }
                    if ($scope.onError)
                        $scope.onError(data);                    
                });

            }
            $scope.cancel = function () {
                if ($scope.onCancel)
                    $scope.onCancel($scope.item);
            }
            $scope.onMarkerDrag = function (event) {
                $scope.item[this.data.lat] = event.latLng.lat();
                $scope.item[this.data.lng] = event.latLng.lng();
            }           
        }
    }
})();