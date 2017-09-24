(function () {
    'use strict';

    angular
        .module('mdCrudModule')
        .directive('mdCrudFormBase', crudFormBaseDirective);

    crudFormBaseDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$injector', '$interpolate', '$sce', '$compile', '$document'];

    function crudFormBaseDirective(crudService, toolsService, $injector, $interpolate, $sce, $compile, $document) {
        
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
                formType: "=",
                formCrud: "=",
                editable: "<?",
                isLoading: "="
            },
            templateUrl: '/views/crudFormBase.html'        
        };
        return directive;

        function link($scope, element, attrs) {
            var text = crudService.text;
            $scope.text = text;
            $scope.formType = $scope.formType || 'detail';

            var translate = crudService.options.translate;
            $scope.translate = translate;

            $scope.stringToHtml = function(str, data) {
                return $sce.trustAsHtml($interpolate(str)(data));
            }

            $scope.templateSelect = function(field) {
                var html = field.templateSelect || "<translate>{{option." + (field.text || 'text') + "}}</translate>"
                return html;
            }

            var options = $scope.options;
            $scope.fields = options.fields;
            $scope.readonly = $scope.editable == false;
            
            //Cargar datos de tipos select
            var loadDataSelect = function(field) {
                if(!field.data) {
                    crudService.get({ entity: field.entity }).then(function (response) {
                        field.data = response.data;
                    });
                }
            }            
            for(var i in options.fields) {
                var field = options.fields[i];
                if(field.entity) {
                    loadDataSelect(field);
                }
            }
            
            $scope.ef = toolsService.evalFunction;
            var idValue = $scope.ngModel[options.id];
            $scope.item = $scope.ngModel;
            $scope.showTimePicker = function(ev, item, fieldName) {
                if(mdpTimePicker) {
                    mdpTimePicker(item[fieldName], {
                        targetEvent: ev
                    }).then(function(selectedDate) {
                        item[fieldName] = selectedDate;
                    });
                }
            } 
            $scope.onMarkerDrag = function (event) {
                $scope.item[this.data.lat] = event.latLng.lat();
                $scope.item[this.data.lng] = event.latLng.lng();
            }        
        }
    }
})();