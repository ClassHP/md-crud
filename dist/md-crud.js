/**
 * md-crud - Angular material directive to create customizable CRUD forms.
 * @version v0.1.7
 * @link https://github.com/ClassHP/md-crud
 * @license MIT
 */
angular.module('mdCrudTemplates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/views/crud.html','<div layout-margin layout-padding><div><div class="md-default" layout="row" layout-align="start center"><md-button class="md-raised md-primary" ng-click="table.create($event)" ng-if="!options.noCreate" ng-disabled="isLoading">{{translate(text.createOption)}}</md-button><div ng-if="options.templateTools" ng-include="options.templateTools" flex layout="row"></div><div flex></div><div layout="row" ng-if="!options.noSearch" style="margin-bottom:5px"><md-button class="md-icon-button md-primary" ng-disabled="true"><md-icon>&#xE8B6;</md-icon></md-button><md-autocomplete md-search-text="searchText" type="search" placeholder="" md-items="item in []" md-search-text-change="onSearchTextChange(searchText)" md-delay="searchDelay"></md-autocomplete></div></div><div ng-if="formType == \'inline\' && rowCreate"><md-card flex layout-fill style="background-color: white"><md-crud-form options="options" ng-model="rowCreate" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="true"></md-crud-form></md-card><br></div><md-table-container md-whiteframe="1"><table data-md-table md-progress="table.promise"><thead md-head data-md-order="table.order" md-on-reorder="table.refresh" style="background-color: white"><tr md-row><th md-column ng-repeat="field in fields" ng-if="field.columnHiden != true">{{translate(field.label)}}</th><th md-column style="min-width:132px;width:132px" ng-if="!options.noDelete && !options.noEdit"></th><th md-column style="min-width:60px;width:60px" ng-if="(options.noEdit && !options.noDelete) || (!options.noEdit && options.noDelete)"></th></tr></thead><tbody md-body><tr md-row md-select="row" ng-repeat-start="row in (options.serverSide ? table.rows : (table.rows | filter:searchText | limitTo: table.limit: (table.page - 1) * table.limit))" ng-mouseover="row.mouserover=true" ng-mouseleave="row.mouserover=false" ng-class="{ \'md-selected\': row.mouserover || rowSelected == row }" ng-click="table.detail(row, $event)" style="cursor:pointer"><td md-cell ng-repeat="field in fields" ng-if="field.columnHiden != true" md-crud-template="getTemplateColumn(field, row)"></td><td md-cell ng-if="!options.noDelete || !options.noEdit"><md-button class="md-icon-button md-accent" ng-show="row.mouserover || rowSelected == row " ng-click="table.edit(row, $event)" ng-if="!options.noEdit"><md-icon>&#xE3C9;</md-icon></md-button><md-button class="md-icon-button md-accent" ng-show="row.mouserover || rowSelected == row " ng-click="table.delete(row[options.id], $event)" ng-if="!options.noDelete"><md-icon>&#xE92B;</md-icon></md-button></td></tr><tr ng-repeat-end ng-if="rowSelected == row"><td colspan="{{fields.length + 1}}"><md-card layout-fill style="background-color: white"><md-crud-form ng-if="formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="formEditable"></md-crud-form><md-crud-form ng-if="!formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="formEditable"></md-crud-form></md-card></td></tr></tbody></table><md-table-pagination md-limit="table.limit" md-limit-options="table.limitOptions" md-page="table.page" md-total="{{options.serverSide ? table.total : (table.rows | filter:searchText).length}}" md-page-select md-label="{{table.labels()}}" style="background-color: white" md-on-paginate="table.onPaginate"></md-table-pagination></md-table-container></div></div>');
$templateCache.put('/views/crudForm.html','<div layout-padding><form name="formCrud" ng-submit="formCrud.$valid && save()" layout="row" layout-wrap novalidate><div ng-repeat="field in fields" flex="{{field.flex || \'grow\'}}" ng-if="(formType==\'create\' && !field.createHiden) || (formType==\'edit\' && !field.editHiden) || (formType==\'detail\' && !field.detailHiden)"><div ng-switch="ef(field.type, item)" ng-if="!field.templateUrl"><md-input-container class="md-block" flex ng-switch-default><label>{{translate(field.label)}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-pattern="field.pattern"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="textarea"><label>{{translate(field.label)}}</label><textarea ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" rows="{{ field.rows || 3 }}" md-select-on-focus></textarea><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="email"><label>{{translate(field.label)}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" type="email" ng-disabled="field.readonly || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-pattern="field.pattern"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flexemail flex ng-switch-when="integer"><label>{{translate(field.label)}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly || isLoading" ng-min="field.min" ng-max="field.max" step="{{field.step || 1}}"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="decimal"><label>{{translate(field.label)}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="field.readonly || readonly || isLoading" ng-min="field.min" ng-max="field.max" step="{{field.step || \'any\'}}"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><div class="md-block" flex ng-switch-when="image"><lf-ng-md-file-input name="{{field.name}}" lf-files="files[field.name]" lf-mimetype="image/*" lf-placeholder="{{field.label}}" lf-browse-label="Abrir" lf-remove-label="Eliminar"></lf-ng-md-file-input><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div><br></div><div class="md-block" flex ng-switch-when="map"><ng-map zoom="{{field.zoom || 11}}" center="{{item[field.lat]}},{{item[field.lng]}}"><marker position="{{item[field.lat]}},{{item[field.lng]}}" title="drag me" draggable="true" on-dragend="onMarkerDrag()" data="{{field}}"></marker></ng-map></div><md-input-container class="md-block" flex ng-switch-when="boolean"><md-switch ng-model="item[field.name]" ng-disabled="field.readonly || readonly || isLoading" aria-label="field.label">{{translate(field.label)}}</md-switch></md-input-container><md-input-container class="md-block" flex ng-switch-when="select"><label>{{translate(field.label)}}</label><md-select ng-model="item[field.name]" ng-if="field.multiple" multiple="multiple" ng-disabled="field.readonly || readonly || isLoading" ng-required="field.required"><md-option ng-value="option[field.value || \'value\']" ng-repeat="option in ef(field.data, item)" md-crud-template="templateSelect(field)"></md-option></md-select><md-select ng-model="item[field.name]" ng-if="!field.multiple" ng-disabled="field.readonly || readonly || isLoading" ng-required="field.required"><md-option ng-if="!field.required"></md-option><md-option ng-value="option[field.value || \'value\']" ng-repeat="option in ef(field.data, item)" md-crud-template="templateSelect(field)"></md-option></md-select><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="date"><label>{{translate(field.label)}}</label><md-datepicker ng-model="item[field.name]" name="{{field.name}}" md-min-date="field.minDate" md-max-date="field.maxDate" ng-disabled="field.readonly || readonly || isLoading" ng-required="field.required"></md-datepicker><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" ng-switch-when="time" flex><label style="margin-left: 50px">{{translate(field.label)}}</label><div class="" layout="row" layout-align="start start"><md-button layout-nowrap ng-click="showTimePicker($event, item, field.name)" class="md-datepicker-button md-icon-button md-button md-ink-ripple" ng-disabled="field.readonly || readonly || isLoading"><md-icon>access_time</md-icon></md-button><div flex><input class="md-datepicker-input md-input" type="time" name="{{field.name}}" ng-model="item[field.name]" ng-required="field.required" flex ng-min="field.min" ng-max="field.max" ng-disabled="field.readonly || readonly || isLoading"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></div></div></md-input-container><div class="md-block" ng-switch-when="datetime" flex layout="row" layout-align="start start"><md-input-container flex="none"><label>{{translate(field.label)}}</label><md-datepicker layout-nowrap ng-model="item[field.name]" name="{{field.name}}" md-min-date="field.minDate" md-max-date="field.maxDate" ng-disabled="field.readonly || readonly || isLoading" ng-required="field.required"></md-datepicker><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container><div class="" layout="row" layout-align="start start"><md-button layout-nowrap ng-click="showTimePicker($event, item, field.name)" class="md-datepicker-button md-icon-button md-button md-ink-ripple" ng-disabled="field.readonly || readonly || isLoading"><md-icon>access_time</md-icon></md-button><div flex><input class="md-datepicker-input md-input" type="time" name="{{field.name}}" ng-model="item[field.name]" ng-required="field.required" flex ng-min="field.min" ng-max="field.max" ng-disabled="field.readonly || readonly || isLoading"><div ng-messages="formCrud[field.name].$error"><div ng-messages-include="/views/crudFormMessages.html"></div></div></div></div></md-input-container></div></div><div ng-if="field.templateUrl" ng-include="field.templateUrl"></div></div><div ng-repeat="message in errors" md-colors="{color:\'warn\'}" flex="grow">{{translate(message)}}</div><div layout="row" layout-align="center center" flex="grow"><md-button class="md-raised" ng-click="cancel()" ng-disabled="isLoading">{{translate(option.formCancelText || text.formCancel)}}</md-button><div flex="5"></div><md-button class="md-raised md-primary" type="submit" ng-disabled="readonly || isLoading">{{translate(option.formSubmit || text.formSubmit)}}</md-button></div></form></div>');
$templateCache.put('/views/crudFormDialog.html','<md-dialog aria-label="Editar" flex="50"><md-toolbar><div class="md-toolbar-tools"><h2>{{formTitle | translate}}</h2><span flex></span><md-button class="md-icon-button" ng-click="cancelDialog()"><md-icon aria-label="Cerrar">close</md-icon></md-button></div></md-toolbar><md-dialog-content><md-crud-form options="options" ng-model="item" on-open="onOpen" on-edit="onEdit" on-cancel="onCancelDialog" on-sussces="onSusscesDialog" template-url="templateUrl" editable="formEditable"></md-crud-form></md-dialog-content></md-dialog>');
$templateCache.put('/views/crudFormMessages.html','<div ng-message="required">{{translate(field.messageRequired || text.messageRequired)}}</div><div ng-message="minlength">{{translate(field.messageMinlength || text.messageMinlength)}} ({{field.minlength}}).</div><div ng-message="maxlength">{{translate(field.messageMaxlength || text.messageMaxlength)}} ({{field.maxlength}}).</div><div ng-message="pattern">{{translate(field.messagePattern || text.messagePattern)}}</div><div ng-message="min">{{translate(field.messageMin || text.messageMin)}} ({{field.min}}).</div><div ng-message="max">{{translate(field.messageMax || text.messageMax)}} ({{field.max}}).</div><div ng-message="mimetype">{{translate(field.messageMimetype || text.messageMimetype)}}</div><div ng-message="valid">{{translate(field.messageValid || text.messageValid)}}</div><div ng-message="mindate">{{translate(field.messageMindate || text.messageMindate)}} {{field.minDate | date:\'shortDate\'}}.</div><div ng-message="maxdate">{{translate(field.messageMaxdate || text.messageMaxdate)}} {{field.maxDate | date:\'shortDate\'}}.</div>');}]);
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

    crudDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$mdDialog', '$interpolate', '$sce'];

    function crudDirective(crudService, tools, $mdDialog, $interpolate, $sce) {
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
            var text = crudService.text;
            $scope.text = text;

            var translate = crudService.options.translate;
            $scope.translate = translate;

            var options = $scope.options;
            options.id = options.id || 'id';
            
            $scope.formType = tools.evalDefined([attrs.formType, options.formType, crudService.options.formType]);
            var deleteConfirm = tools.evalDefined([attrs.deleteConfirm, options.deleteConfirm, crudService.options.deleteConfirm]);
            var autoRefresh = tools.evalDefined([attrs.autoRefresh, options.autoRefresh, crudService.options.autoRefresh]);
            var getParams = tools.evalDefined([attrs.getParams, options.getParams, {}]);
            $scope.searchText = attrs.searchText || options.searchText || "";
            $scope.searchDelay = attrs.searchDelay || options.searchDelay || (options.serverSide ? 500 : 0);

            $scope.fields = options.fields;
            $scope.rowSelected = null;
            $scope.rowCreate = null;

            $scope.ef = tools.evalFunction;

            $scope.stringToHtml = function(str, data) {
                return $sce.trustAsHtml($interpolate(str)(data));
            }

            $scope.isLoading = true;

            $scope.getTemplateColumn = function(field, row) {
                var template = field.templateColumn || field.columnTemplate || crudService.templateColumns[field.type || 'default'] || crudService.templateColumns['default'];
                return template.replace("row[field.name]", "row." + field.name);
            }

            $scope.getTemplateSelect = function(field) {
                var html = field.templateSelect || "{{translate(option." + (field.text || 'text') + ")}}"
                return html;
            }

            $scope.getOptionSelect = function(field, row) {
                var data = tools.evalFunction(field.data, row);
                for(var i in data) {
                    if(data[i][field.value] == row[field.name])
                        return data[i];
                }
                return row;
            }

            $scope.onSearchTextChange = function(text) {
                $scope.searchText = text;
                if(options.serverSide && options.serverSide.searchParam) {
                    $scope.table.page = 1;
                    options.refresh();
                }
            }

            $scope.table = {
                rows: [],
                refresh: function (params) {
                    $scope.isLoading = true;
                    angular.extend(getParams, params);
                    var optionsGet = angular.copy(options.http || {});
                    optionsGet.entity = options.entity;
                    optionsGet.params = angular.copy(optionsGet.params || {});
                    angular.extend(optionsGet.params, getParams);
                    if(options.serverSide) {
                        if(options.serverSide.pageParam)
                            optionsGet.params[options.serverSide.pageParam || 'page'] = $scope.table.page;
                        if(options.serverSide.offsetParam)
                            optionsGet.params[options.serverSide.offsetParam || 'offset'] = ($scope.table.page - 1) * $scope.table.limit;
                        if(options.serverSide.limitParam)
                            optionsGet.params[options.serverSide.limitParam || 'limit'] = $scope.table.limit;
                        if(options.serverSide.searchParam)
                            optionsGet.params[options.serverSide.searchParam || 'search'] = ($scope.searchText != "") ? $scope.searchText : undefined;
                    }
                    $scope.table.promise = crudService.get(optionsGet).then(function (response) {
                        $scope.isLoading = false;
                        $scope.table.rows = response.data;
                        if(options.serverSide) {
                            $scope.table.total = response.total;
                        }
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
                    if(row[options.id]) {
                        if ($scope.formType == "inline") {
                            $scope.selectRow(row, true);
                        }
                        if ($scope.formType == "window") {
                            showForm(row, true, ev).then(function (item) {
                                //$scope.table.refresh();
                            });
                        }
                    }
                },
                detail: function (row, ev) {
                    ev.stopPropagation()
                    if ($scope.formType == "inline") {
                        
                        if ($scope.rowSelected == row)
                            $scope.rowSelected = null; 
                        else if (!options.noDetail)
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
                    var optionsHttp = angular.copy(options.http || {});
                    optionsHttp.entity = options.entity;
                    optionsHttp.id = rowId;
                    var deleteFunct = function () {
                        crudService.delete(optionsHttp).then(function (data) {
                            t.rows.splice(index, 1);
                        }, function (error) {
                            if (!error)
                                error = text.deleteError;
                            tools.showAlert(translate(text.deleteErrorTitle), translate(error), translate(text.btnAlertOk));
                        });
                    };
                    if(deleteConfirm) {
                        tools.showConfirm(translate(text.deleteConfirmTitle), translate(text.deleteConfirmMessage), translate(text.deleteConfirmOk), 
                        translate(text.btnConfirmCancel), translate(text.btnConfirmCancel)).then(function () {
                            deleteFunct();
                        });
                    }
                    else {
                        deleteFunct();
                    }
                },
                promise: null,
                order: '',
                limit: tools.evalDefined([attrs.tableLimit, options.tableLimit, crudService.options.tableLimit]),
                limitOptions: tools.evalDefined([attrs.limitOptions, options.limitOptions, crudService.options.limitOptions]),
                page: 1,
                rowSelection: false,
                selected: [],
                labels: function () { 
                    return {
                        page: translate(text.tablePaginationPage),
                        rowsPerPage: translate(text.tablePaginationRowsPerPage),
                        of: translate(text.tablePaginationOf)
                    } 
                },
                onPaginate: function() {
                    if(options.serverSide)
                        $scope.table.refresh();
                }
            }

            options.refresh = function (params) {
                $scope.table.refresh(params);
            }
            if (autoRefresh) {
                options.refresh();
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

            $scope.templateUrl = (options.form || {}).templateUrl;

            $scope.onOpen = function (item) {
                if ((options.form || {}).onOpen)
                    options.form.onOpen(item);
            };

            $scope.onEdit = function (item) {
                if ((options.form || {}).onEdit)
                    options.form.onEdit(item);
            };

            $scope.onCancel = function (error) {
                if ((options.form || {}).onCancel)
                    options.form.onCancel(error);
                $scope.rowSelected = null;
                $scope.rowCreate = null;
                if(error)
                    tools.showAlert(translate(text.generalErrorTitle), translate(error), translate(text.btnAlertOk));
            };

            $scope.onSussces = function (item, type) {
                if ((options.form || {}).onSussces)
                    options.form.onSussces(item, type);
                if (type == "create")
                    $scope.table.rows.unshift(item);
                $scope.rowSelected = null;
                $scope.rowCreate = null;
            };

            $scope.onSubmit = function (item, type) {
                if ((options.form || {}).onSubmit)
                    options.form.onSubmit(item, type);
            };

            $scope.selectRow = function (item, editable) {
                $scope.rowSelected = item;
                $scope.formEditable = editable;
            };

            var formController = function ($scope, $mdDialog, crudService, item, options) {
                $scope.formTitle = translate(item[options.id] ? (($scope.formEditable) ? text.editTitle : text.detailTitle) : text.createTitle);
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

    crudFormDirective.$inject = ['mdCrudService', 'mdCrudToolsService', '$injector', '$interpolate', '$sce', '$compile'];

    function crudFormDirective(crudService, toolsService, $injector, $interpolate, $sce, $compile) {
        
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
                onCancel: "=",
                onSussces: "=",
                onSubmit: "=",
                templateUrl: "<?",
                editable: "<?"
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

            var options = $scope.options;
            $scope.fields = options.fields;
            $scope.readonly = $scope.editable == false;
            
            $scope.ef = toolsService.evalFunction;

            $scope.isLoading = false;

            var idValue = $scope.ngModel[options.id];
            $scope.formTitle = idValue ? (($scope.editable) ? text.editTitle : text.detailTitle) : text.createTitle;
            $scope.formType = idValue ? (($scope.editable) ? "edit" : "detail") : "create";
            $scope.fields = options.fields;
            $scope.item = angular.copy($scope.ngModel || {});
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
                $scope.onOpen($scope.item);

            if (idValue) {                
                $scope.isLoading = true;
                var optionsHttp = angular.copy(options.http || {});
                optionsHttp.entity = options.entity;
                optionsHttp.id = idValue;
                crudService.getById(optionsHttp).then(function (response) {
                    $scope.item = response.data;                    
                    if ($scope.onEdit)
                        $scope.onEdit($scope.item);
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
                var promise;
                var optionsHttp = angular.copy(options.http || {});
                optionsHttp.entity = options.entity;
                optionsHttp.data = $scope.item;
                if (idValue) {                    
                    optionsHttp.id = $scope.item[options.id];
                    promise = crudService.patch(optionsHttp);
                }
                else {
                    promise = crudService.post(optionsHttp);
                }
                $scope.isLoading = true;
                promise.then(function (response) {
                    angular.copy(response.data, $scope.ngModel);
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
            $scope.cancel = function (data) {
                if ($scope.onCancel)
                    $scope.onCancel(data);
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

    angular
        .module('mdCrudModule')
        .directive('mdCrudTemplate', crudTemplateDirective);

    crudTemplateDirective.$inject = ['$compile'];

    function crudTemplateDirective($compile) {
      // directive factory creates a link function
      return function(scope, element, attrs) {
        scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.mdCrudTemplate);
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
        );
      };
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
            functionHttp: function(options, method) {
                if(options.functionHttp)
                    return options.functionHttp(options);
                return $q(function (resolve, reject) {
                    $http({
                        url: $interpolate(options.url)(options),
                        method: options.method,
                        params: options.params,
                        data: options.data
                    }).then(function (response) {
                        (options.functionData || defaultOptions.functionData)(response, resolve, reject, method);
                    }, function (response) {
                        reject(response.data);
                    });
                })
            },
            functionData: function(response, resolve, reject, method) { 
                resolve(response);
            },
            formType: 'inline',
            deleteConfirm: true,
            tableLimit: 10,
            limitOptions: [10, 20, 30],
            translate: function(text) {
                return text;
            },
            autoRefresh: true,
        };     

        var defaultText = {
            editTitle: 'Edit',
            detailTitle: 'Detail',
            createTitle: 'Create',
            deleteError: 'Error while trying to delete row',
            deleteErrorTitle: 'Error deleting',
            deleteConfirmTitle: 'Delete',
            deleteConfirmMessage: 'Are you sure you want to delete the row?',
            tablePaginationPage: 'Page',
            tablePaginationRowsPerPage: 'Rows per page:',
            tablePaginationOf: 'of',
            createOption: 'Create',
            btnConfirmOk: 'Yes',
            btnConfirmCancel: 'No',
            btnAlertOk: 'Ok',
            generalErrorTitle: 'Error',
            messageRequired: 'Required',
            messageMinlength: 'Min length',
            messageMaxlength: 'Max length',
            messagePattern: 'Invalid input format.',
            messageMin: 'Min value',
            messageMax: 'Max value',
            messageMimetype: 'Invalid file type.',
            messageValid: 'Invalid input format.',
            messageMindate: 'Min date',
            messageMaxdate: 'Max date',
            formCancel: 'Cancel',
            formSubmit: 'Save',
        };

        var templateColumns = {
            boolean: '<span><md-switch ng-model="row[field.name]" ng-disabled="true" aria-label="{{translate(field.label)}}"></md-switch></span>',
            image: '<image ng-src="{{row[field.name]}}" style="max-height:90px"></image>',
            date: '<span>{{ row[field.name] | date:"shortDate" }}</span>',
            time: '<span>{{ row[field.name] | date:"shortTime" }}</span>',
            datetime: '<span>{{ row[field.name] | date:"short" }}</span>',
            select: '<span md-crud-template="getTemplateSelect(field, row)" ng-init="option = getOptionSelect(field, row)"></span>',
            text: '<span>{{translate(row[field.name])}}</span>',
            default: '<span>{{translate(row[field.name])}}</span>'
        };

        return {
            templateColumns: templateColumns,
            options: defaultOptions,
            setDefaultTemplateColumns: function(templates) {
                angular.extend(templateColumns, tools.removeNull(templates));
            },
            setDefaultOptions: function(options) {
                angular.extend(defaultOptions, tools.removeNull(options));
            },
            text: defaultText,
            setDefaultText: function(text) {
                angular.extend(defaultText, tools.removeNull(text));
            },
            get: function (options) {
                var httpOptions = {
                    url: options.urlGet || defaultOptions.urlGet,
                    method: options.methodGet || defaultOptions.methodGet,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions, 'get');
            },
            getById: function (options) {
                var httpOptions = {
                    url: options.urlGetById || defaultOptions.urlGetById,
                    method: options.methodGet || defaultOptions.methodGet,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions, 'getById');
            },
            post: function (options) {
                var httpOptions = {
                    url: options.urlPost || defaultOptions.urlPost,
                    method: options.methodPost || defaultOptions.methodPost,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions, 'post');
            },
            patch: function (options) {
                var httpOptions = {
                    url: options.urlPatch || defaultOptions.urlPatch,
                    method: options.methodPatch || defaultOptions.methodPatch,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions, 'patch');
            },
            delete: function (options) {
                var httpOptions = {
                    url: options.urlDelete || defaultOptions.urlDelete,
                    method: options.methodDelete || defaultOptions.methodDelete,
                    rootApi: defaultOptions.rootApi
                };
                angular.extend(httpOptions, tools.removeNull(options));
                return defaultOptions.functionHttp(httpOptions, 'delete');
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
                okText = okText || "Yes";
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
            showAlert: function (title, message, okText) {
                okText = okText || "Ok";
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(title)
                    .ariaLabel(title)
                    .textContent(message)
                    .ok(okText)
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
            },
            evalDefined: function (optArray) {
                for(var i in optArray){
                    if(angular.isDefined(optArray[i]))
                        return optArray[i];
                }
                return undefined;
            }
        };
    }
})();
