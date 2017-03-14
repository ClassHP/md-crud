angular.module('mdCrudTemplates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/views/crud.html','<div layout-margin layout-padding><div><div class="md-default" layout="row" layout-align="start center"><md-button class="md-raised md-primary" ng-click="table.create($event)" ng-if="!options.noCreate"><translate>Nuevo</translate></md-button><div ng-if="options.templateTools" ng-include="options.templateTools" flex layout="row"></div><div flex></div><div layout="row"><md-button class="md-icon-button md-primary" ng-disabled="true"><md-icon>&#xE8B6;</md-icon></md-button><md-autocomplete md-search-text="searchText" type="search" placeholder="" md-items="item in []"></md-autocomplete></div></div><div ng-if="formType == \'inline\' && rowCreate"><md-card flex layout-fill style="background-color: white"><md-crud-form options="options" ng-model="rowCreate" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" template-url="templateUrl" editable="true"></md-crud-form></md-card><br></div><md-table-container md-whiteframe="1"><table data-md-table md-progress="table.promise"><thead md-head data-md-order="table.order" md-on-reorder="table.refresh" style="background-color: white"><tr md-row><th md-column ng-repeat="field in fields" ng-if="field.columnHiden != true">{{field.label | translate}}</th><th md-column style="min-width:132px;width:132px" ng-if="!options.noDelete"></th><th md-column style="min-width:60px;width:60px" ng-if="options.noDelete"></th></tr></thead><tbody md-body><tr md-row md-select="row" ng-repeat-start="row in table.rows | filter:searchText | limitTo: table.limit: (table.page - 1) * table.limit" ng-mouseover="row.mouserover=true" ng-mouseleave="row.mouserover=false" ng-class="{ \'md-selected\': row.mouserover || rowSelected == row }" ng-click="table.detail(row, $event)"><td md-cell ng-repeat="field in fields" ng-if="field.columnHiden != true"><div ng-switch="ef(field.type, row)" ng-if="!field.columnTemplate"><span ng-switch-when="boolean"><md-switch ng-model="row[field.name]" ng-disabled="true" aria-label="{{field.label | translate}}"></md-switch></span><image ng-switch-when="image" ng-src="{{row[field.name]}}" style="max-height:90px"></image><span ng-switch-when="date">{{ row[field.name] | date:\'shortDate\' }}</span> <span ng-switch-default>{{row[field.name] | translate}}</span></div><span ng-if="field.columnTemplate" ng-bind-html="stringToHtml(field.columnTemplate, row)"></span></td><td md-cell><md-button class="md-icon-button md-accent" ng-show="row.mouserover || rowSelected == row " ng-click="table.edit(row, $event)"><md-icon>&#xE3C9;</md-icon></md-button><md-button class="md-icon-button md-accent" ng-show="row.mouserover || rowSelected == row " ng-click="table.delete(row[options.id], $event)" ng-if="!options.noDelete"><md-icon>&#xE92B;</md-icon></md-button></td></tr><tr ng-repeat-end ng-if="rowSelected == row"><td colspan="{{fields.length + 1}}"><md-card layout-fill style="background-color: white"><md-crud-form ng-if="formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" template-url="templateUrl" editable="formEditable"></md-crud-form><md-crud-form ng-if="!formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" template-url="templateUrl" editable="formEditable"></md-crud-form></md-card></td></tr></tbody></table><md-table-pagination md-limit="table.limit" md-limit-options="[10, 20, 30]" md-page="table.page" md-total="{{(table.rows | filter:searchText).length}}" md-page-select md-label="{{table.labels}}" style="background-color: white"></md-table-pagination></md-table-container></div></div>');
$templateCache.put('/views/crudForm.html','<div layout-padding><form name="formCrud" ng-submit="formCrud.$valid && save()" layout="row" layout-wrap><div ng-repeat="field in fields" flex="{{field.flex || \'grow\'}}" ng-if="(formType==\'create\' && !field.createHiden) || (formType==\'edit\' && !field.editHiden) || (formType==\'detail\' && !field.detailHiden)"><div ng-if="field.templateUrl" ng-include="field.templateUrl"></div><md-input-container class="md-block" flex ng-if="(ef(field.type, item) == \'text\' || !ef(field.type, item)) && field.name"><label>{{field.label | translate}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-pattern="field.pattern"><div ng-messages="formCrud[field.name].$error"><div ng-message="required"><translate>Este campo es requerido.</translate></div><div ng-message="minlength"><translate>M\xEDnimo de caracteres</translate>({{field.minlength}}).</div><div ng-message="maxlength"><translate>M\xE1ximo de caracteres</translate>({{field.maxlength}}).</div><div ng-message="pattern">{{field.messagePattern || (\'El valor ingresado no tiene el formato correcto\' | translate)}}</div></div></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'textarea\'"><label>{{field.label | translate}}</label><textarea ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly" ng-minlength="field.minlength" ng-maxlength="field.maxlength" rows="{{ field.rows || 3 }}" md-select-on-focus></textarea><div ng-messages="formCrud[field.name].$error"><div ng-message="required"><translate>Este campo es requerido.</translate></div><div ng-message="minlength"><translate>M\xEDnimo de caracteres</translate>({{field.minlength}}).</div><div ng-message="maxlength"><translate>M\xE1ximo de caracteres</translate>({{field.maxlength}}).</div><div ng-message="pattern">{{field.messagePattern || (\'El valor ingresado no tiene el formato correcto\' | translate)}}</div></div></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'email\'"><label>{{field.label | translate}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" type="email" ng-disabled="field.readonly || readonly" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-pattern="field.pattern"><div ng-messages="formCrud[field.name].$error"><div ng-message="required"><translate>Este campo es requerido.</translate></div><div ng-message="minlength"><translate>M\xEDnimo de caracteres</translate>({{field.minlength}}).</div><div ng-message="maxlength"><translate>M\xE1ximo de caracteres</translate>({{field.maxlength}}).</div><div ng-message="pattern">{{field.messagePattern || (\'El valor ingresado no tiene el formato correcto\' | translate)}}</div></div></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'integer\'"><label>{{field.label | translate}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly" ng-min="field.min" ng-max="field.max" step="{{field.step || 1}}"><div ng-messages="formCrud[field.name].$error"><div ng-message="required"><translate>Este campo es requerido.</translate></div><div ng-message="min"><translate>Valor m\xEDnimo</translate>({{field.min}}).</div><div ng-message="max"><translate>Valor m\xE1ximo</translate>({{field.max}}).</div></div></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'decimal\'"><label>{{field.label | translate}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly" ng-min="field.min" ng-max="field.max" step="{{field.step || \'any\'}}"><div ng-messages="formCrud[field.name].$error"><div ng-message="required"><translate>Este campo es requerido.</translate></div><div ng-message="min"><translate>Valor m\xEDnimo</translate>({{field.min}}).</div><div ng-message="max"><translate>Valor m\xE1ximo</translate>({{field.max}}).</div></div></md-input-container><div class="md-block" flex ng-if="ef(field.type, item) == \'image\'"><lf-ng-md-file-input name="{{field.name | translate}}" lf-files="files[field.name]" lf-mimetype="image/*" lf-placeholder="{{field.label}}" lf-browse-label="Abrir" lf-remove-label="Eliminar"></lf-ng-md-file-input><div ng-messages="formCrud[field.name].$error" md-colors="{color: \'warn\'}"><div ng-message="mimetype"><translate>El archivo no tiene el formato correcto.</translate></div></div><br></div><div class="md-block" flex ng-if="ef(field.type, item) == \'map\'"><ng-map zoom="{{field.zoom || 11}}" center="{{item[field.lat]}},{{item[field.lng]}}"><marker position="{{item[field.lat]}},{{item[field.lng]}}" title="drag me" draggable="true" on-dragend="onMarkerDrag()" data="{{field}}"></marker></ng-map></div><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'boolean\'"><md-switch ng-model="item[field.name]" ng-disabled="field.readonly || readonly" aria-label="field.label">{{field.label | translate}}</md-switch></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'select\'"><label>{{field.label | translate}}</label><md-select ng-model="item[field.name]" ng-if="field.multiple" multiple="multiple" ng-disabled="field.readonly || readonly" ng-required="field.required"><md-option ng-value="mdSelectItem[field.value || \'value\']" ng-repeat="mdSelectItem in ef(field.data, item)">{{mdSelectItem[field.text || \'text\']}}</md-option></md-select><md-select ng-model="item[field.name]" ng-if="!field.multiple" ng-disabled="field.readonly || readonly" ng-required="field.required"><md-option ng-if="!field.required"></md-option><md-option ng-value="mdSelectItem[field.value || \'value\']" ng-repeat="mdSelectItem in ef(field.data, item)">{{mdSelectItem[field.text || \'text\']}}</md-option></md-select></md-input-container><md-input-container class="md-block" flex ng-if="ef(field.type, item) == \'date\'"><label>{{field.label | translate}}</label><md-datepicker ng-model="item[field.name]" md-min-date="field.minDate" md-max-date="field.maxDate" ng-disabled="field.readonly || readonly" ng-required="field.required"></md-datepicker><div ng-messages="formCrud[field.name].$error"><div ng-message="valid">The entered value is not a date!</div><div ng-message="required">This date is required!</div><div ng-message="mindate">Date is too early!</div><div ng-message="maxdate">Date is too late!</div></div></md-input-container></div><div ng-repeat="message in errors" md-colors="{color:\'warn\'}" flex="grow">{{message}}</div><div layout="row" layout-align="center center" flex="grow"><md-button class="md-raised" ng-click="cancel()"><translate>Cancel</translate></md-button><div flex="5"></div><md-button class="md-raised md-primary" type="submit" ng-disabled="readonly"><translate>Save</translate></md-button></div></form></div>');
$templateCache.put('/views/crudFormDialog.html','<md-dialog aria-label="Editar" flex="50"><md-toolbar><div class="md-toolbar-tools"><h2>{{formTitle | translate}}</h2><span flex></span><md-button class="md-icon-button" ng-click="cancelDialog()"><md-icon aria-label="Cerrar">close</md-icon></md-button></div></md-toolbar><md-dialog-content><md-crud-form options="options" ng-model="item" on-open="onOpen" on-edit="onEdit" on-cancel="onCancelDialog" on-sussces="onSusscesDialog" template-url="templateUrl" editable="formEditable"></md-crud-form></md-dialog-content></md-dialog>');}]);
(function () {
    'use strict';
    /**
     * @description
     *
     */
    angular.module('mdCrudModule', ['mdCrudTemplates']);
})();

(function () {
    'use strict';

    angular
        .module('mdCrudModule')
        .directive('mdCrud', crudDirective);

    crudDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$mdDialog', 'gettextCatalog', '$interpolate'];

    function crudDirective(crudService, toolsService, $mdDialog, gettextCatalog, $interpolate) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                options: "="
            },
            templateUrl: '/views/crud.html'
        };
        return directive;

        function link($scope, element, attrs) {

            var options = $scope.options;
            $scope.formType = $scope.formType || options.formType || crudService.options.formType;

            $scope.fields = options.fields;
            $scope.rowSelected = null;
            var getParams = {};
            $scope.rowCreate = null;

            $scope.ef = toolsService.evalFunction;

            $scope.stringToHtml = function(str, data) {
                return $interpolate(str)(data);
            }

            $scope.table = {
                rows: [],
                refresh: function (params) {
                    if (params)
                        getParams = params;
                    $scope.table.promise = crudService.get({ 
                        entity: options.entity, 
                        params: getParams, 
                        rootApi: options.rootApi
                    }).then(function (data) {
                        $scope.table.rows = data;
                    });
                },
                create: function (ev) {
                    ev.stopPropagation();
                    $scope.rowSelected = null;
                    $scope.rowCreate = {};
                    if ($scope.formType == "window") {
                        showForm({}, true, ev).then(function (item) {
                            //$scope.table.refresh();
                        });
                    }
                },
                edit: function (row, ev) {
                    ev.stopPropagation();
                    if ($scope.formType == "inline") {
                        $scope.selectRow(row, true);
                    }
                    if ($scope.formType == "window") {
                        showForm(row, true, ev).then(function (item) {
                            //$scope.table.refresh();
                        });
                    }
                },
                detail: function (row, ev) {
                    ev.stopPropagation()
                    if ($scope.formType == "inline") {
                        
                        if ($scope.rowSelected == row)
                            $scope.rowSelected = null; 
                        else
                            $scope.selectRow(row, false);
                    }
                    if ($scope.formType == "window") {
                        showForm(row, false, ev).then(function (item) {
                            //$scope.table.refresh();
                        });
                    }
                },
                delete: function (rowId, ev) {
                    $scope.rowSelected = null; 
                    ev.stopPropagation()
                    var t = this;
                    var index = this.rows.findIndex(function (r) {
                        return r[options.id] == rowId;
                    });
                    toolsService.showConfirm(gettextCatalog.getString("Eliminar"), gettextCatalog.getString("¿Está seguro de eliminar el registro?")).then(function () {
                        crudService.delete({
                            entity: options.entity, 
                            id: rowId, 
                            rootApi: options.rootApi
                        }).then(function (data) {
                            t.rows.splice(index, 1);
                        }, function (error) {
                            if (!error)
                                error = gettextCatalog.getString("No se pudo eliminar el registro, contacte con el administrador del sistema.");
                            toolsService.showAlert(gettextCatalog.getString('Error al intentar eliminar el registro.'), error);
                        })
                    });
                },
                promise: null,
                order: '',
                limit: 10,
                page: 1,
                rowSelection: false,
                selected: []
            }

            options.refresh = function (params) {
                $scope.table.refresh(params);
            }

            var showForm = function (item, editable, ev) {
                $scope.formEditable = editable;
                return $mdDialog.show({
                    controller: ['$scope', '$mdDialog', 'mdCrudService', 'item', 'options', formController],
                    templateUrl: '/views/crudFormDialog.html',
                    clickOutsideToClose: true,
                    fullscreen: true,
                    scope: $scope,
                    preserveScope: true,
                    controllerAs: "vm",
                    locals: {
                        item: item,
                        options: options
                    },
                    targetEvent: ev,
                    parent: element
                });
            };

            var onTranslate = function () {
                $scope.table.labels = {
                    page: gettextCatalog.getString('Página:'),
                    rowsPerPage: gettextCatalog.getString('Filas por página:'),
                    of: gettextCatalog.getString('de')
                }
            }
            onTranslate();
            $scope.$on('gettextLanguageChanged', function () {
                onTranslate();
            });

            $scope.templateUrl = (options.form || {}).templateUrl;

            $scope.onOpen = function (item) {
                if ((options.form || {}).onOpen)
                    options.form.onOpen(item);
            };

            $scope.onEdit = function (item) {
                if ((options.form || {}).onEdit)
                    options.form.onEdit(item);
            };

            $scope.onCancel = function (item) {
                if ((options.form || {}).onCancel)
                    options.form.onCancel(item);
                $scope.rowSelected = null;
                $scope.rowCreate = null;
            };

            $scope.onSussces = function (item, type) {
                if ((options.form || {}).onSussces)
                    options.form.onSussces(item, type);
                if (type == "create")
                    $scope.table.rows.unshift(item);
                $scope.rowSelected = null;
                $scope.rowCreate = null;
            };

            $scope.selectRow = function (item, editable) {
                $scope.rowSelected = item;
                $scope.formEditable = editable;
            };

            var formController = function ($scope, $mdDialog, crudService, item, options) {
                $scope.formTitle = item[options.id] ? (($scope.formEditable) ? "Editar": "Detalle") : "Nuevo";
                //$scope.options = options;
                $scope.item = item;

                $scope.onCancelDialog = function (item) {
                    if ((options.form || {}).onCancel)
                        options.form.onCancel(item);
                    $mdDialog.cancel();
                };

                $scope.onSusscesDialog = function (item, type) {
                    if ((options.form || {}).onSussces)
                        options.form.onSussces(item, type);
                    $mdDialog.hide(item);
                };

                $scope.cancelDialog = function () {
                    $scope.onCancelDialog(item);
                }
            }

        }
    }
})();
(function () {
    'use strict';

    angular
        .module('mdCrudModule')
        .directive('mdCrudForm', crudFormDirective);

    crudFormDirective.$inject = ['mdCrudService', 'mdCrudToolsService'];

    function crudFormDirective(crudService, toolsService) {
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
(function () {
    'use strict';

    angular.module('mdCrudModule').service('mdCrudService', ['$q', '$interpolate', '$http', 'mdCrudToolsService', fnService]);

    function fnService($q, $interpolate, $http, tools) {
        var defaultOptions = {
            rootApi: '/api',
            methodGet: 'GET',
            methodPost: 'POST',
            methodPatch: 'PATCH',
            methodDelete: 'DELETE',
            urlGet: '{{rootApi}}/{{entity}}',
            urlGetById: '{{rootApi}}/{{entity}}/{{id}}',
            urlPost: '{{rootApi}}/{{entity}}',
            urlPatch: '{{rootApi}}/{{entity}}/{{id}}',
            urlDelete: '{{rootApi}}/{{entity}}/{{id}}',
            functionHttp: function(options) {
                return $q(function (resolve, reject) {
                    $http({
                        url: $interpolate(options.url)(options),
                        method: options.method,
                        params: options.params,
                        data: options.data
                    }).then(function (response) {
                        defaultOptions.functionData(response, resolve, reject);
                    }, function (response) {
                        reject(response.data);
                    });
                })
            },
            functionData: function(response, resolve, reject) { 
                resolve(response.data);
            },
            formType: 'inline'
        };        

        return {
            options: defaultOptions,
            setDefaultOptions: function(options) {
                angular.extend(defaultOptions, tools.removeNull(options));
            },
            get: function (options) {
                var httpOptions = {
                    url: defaultOptions.urlGet,
                    method: defaultOptions.methodGet,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions);
            },
            getById: function (options) {
                var httpOptions = {
                    url: defaultOptions.urlGetById,
                    method: defaultOptions.methodGet,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions);
            },
            post: function (options) {
                var httpOptions = {
                    url: defaultOptions.urlPost,
                    method: defaultOptions.methodPost,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions);
            },
            patch: function (options) {
                var httpOptions = {
                    url: defaultOptions.urlPatch,
                    method: defaultOptions.methodPatch,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions);
            },
            delete: function (options) {
                var httpOptions = {
                    url: defaultOptions.urlDelete,
                    method: defaultOptions.methodDelete,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions);
            },        
        };
    }
})();

(function () {
    'use strict';

    angular.module('mdCrudModule').service('mdCrudToolsService', ['$mdDialog', fnService]);

    function fnService($mdDialog) {
        return {
            showConfirm: function (title, message, okText, cancelText) {
                okText = okText || "Si";
                cancelText = cancelText || "No";
                var confirm = $mdDialog.confirm()
                      .title(title)
                      .ariaLabel(title)
                      .textContent(message)
                      //.targetEvent(ev)
                      .ok(okText)
                      .cancel(cancelText);

                return $mdDialog.show(confirm);
            },
            showAlert: function (title, message) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(title)
                    .ariaLabel(title)
                    .textContent(message)
                    .ok('Continuar')
                );
            },
            getBase64: function (file) {
                return $q(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        resolve(reader.result);
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                })
            },
            removeNullRecursive: function (obj)
            {
                var removeNullIn = function(prop, obj)
                {
                    var pr = obj[prop];
                    if(pr === null || pr === undefined) delete obj[prop]; 
                    else if(typeof pr === 'object') for (var i in pr) removeNullIn(i, pr);
                }
                for (var i in obj) {
                    removeNullIn(i, obj);
                }
                return obj;
            },
            removeNull: function (obj)
            {
                for (var prop in obj) {
                    var pr = obj[prop];
                    if(pr === null || pr === undefined) delete obj[prop]; 
                }
                return obj;
            },
            evalFunction: function(opt, model) {
                if(angular.isFunction(opt))
                    return opt(model);
                return opt;
            }
        };
    }
})();
