/**
 * md-crud - Angular material directive to create customizable CRUD forms.
 * @version v1.0.0
 * @link https://github.com/ClassHP/md-crud
 * @license MIT
 */
angular.module('mdCrudTemplates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/views/crud.html','<div class="md-default" layout="row" layout-align="start center"><md-button class="md-raised md-primary" ng-click="table.create($event)" ng-if="!options.noCreate" ng-disabled="isLoading">{{translate(text.createOption)}}</md-button><div ng-if="options.templateTools" ng-include="options.templateTools" flex layout="row"></div><div flex></div><div layout="row" ng-if="!options.noSearch" style="margin-bottom:5px"><md-button class="md-icon-button md-primary" ng-disabled="true"><md-icon>&#xE8B6;</md-icon></md-button><md-autocomplete md-search-text="searchText" type="search" placeholder="" md-items="item in []" md-search-text-change="onSearchTextChange(searchText)" md-delay="searchDelay"></md-autocomplete></div></div><div ng-if="formType == \'inline\' && rowCreate"><md-card flex layout-fill style="background-color: white"><md-crud-form options="options" ng-model="rowCreate" on-open="onOpen" on-edit="onEdit" on-detail="onDetail" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="true"></md-crud-form></md-card><br></div><md-table-container md-whiteframe="1"><table data-md-table md-progress="table.promise"><thead md-head data-md-order="table.order" md-on-reorder="table.refresh" style="background-color: white"><tr md-row><th md-column ng-repeat="field in fields" ng-if="!field.columnHiden && !field.columnHidden">{{translate(field.columnHeader || field.label)}}</th><th md-column style="min-width:132px;width:132px" ng-if="!options.noDelete && !options.noEdit"></th><th md-column style="min-width:60px;width:60px" ng-if="(options.noEdit && !options.noDelete) || (!options.noEdit && options.noDelete)"></th></tr></thead><tbody md-body><tr md-row md-select="row" ng-repeat-start="row in (options.serverSide ? table.rows : (table.rows | filter:searchText | limitTo: table.limit: (table.page - 1) * table.limit))" ng-mouseover="row.mouserover=true" ng-mouseleave="row.mouserover=false" ng-class="{ \'md-selected\': row.mouserover || rowSelected == row }" ng-click="table.detail(row, $event)" style="cursor:pointer"><td md-cell ng-repeat="field in fields" ng-if="!field.columnHiden && !field.columnHidden" ng-style="field.styleCell" md-crud-template="getTemplateColumn(field, row)"></td><td md-cell ng-if="!options.noDelete || !options.noEdit"><md-button class="md-icon-button md-accent" ng-show="row.mouserover || rowSelected == row " ng-click="table.edit(row, $event)" ng-if="!options.noEdit"><md-icon>&#xE3C9;</md-icon></md-button><md-button class="md-icon-button md-warn" ng-show="row.mouserover || rowSelected == row " ng-click="table.delete(row[options.id], $event)" ng-if="!options.noDelete"><md-icon>&#xE92B;</md-icon></md-button></td></tr><tr ng-repeat-end ng-if="rowSelected == row"><td colspan="{{countFieldsColums()}}" style="max-width: 0"><md-card layout-fill style="background-color: white"><md-crud-form ng-if="formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-detail="onDetail" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="formEditable" model-copy="true"></md-crud-form><md-crud-form ng-if="!formEditable" options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-detail="onDetail" on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" template-url="templateUrl" editable="formEditable" model-copy="true"></md-crud-form></md-card></td></tr></tbody></table><md-table-pagination ng-if="!options.noPaginate" md-limit="table.limit" md-limit-options="table.limitOptions" md-page="table.page" md-total="{{options.serverSide ? table.total : (table.rows | filter:searchText).length}}" md-page-select md-label="{{table.labels()}}" style="background-color: white" md-on-paginate="table.onPaginate"></md-table-pagination></md-table-container>');
$templateCache.put('/views/crudForm.html','<div layout-padding><form name="formCrud" ng-submit="isFormValid(formCrud) && save()" novalidate><md-crud-form-base flex layout="row" layout-wrap options="options" ng-model="item" form-type="formType" editable="editable" form-crud="formCrud" is-loading="isLoading"></md-crud-form-base><div ng-repeat="message in errors" md-colors="{ color: \'default-warn\' }" flex="grow">{{translate(message)}}</div><div layout="row" layout-align="center center" flex="grow" ng-if="!(formType==\'detail\' && options.noDetailButtons) && !options.noButtons"><md-button class="md-raised" ng-click="cancel()" ng-disabled="isLoading">{{translate(options.formCancelText || text.formCancel)}}</md-button><div flex="5"></div><md-button class="md-raised md-primary" type="submit" ng-disabled="ef(options.readonly, item) || readonly || isLoading">{{translate(options.formSubmitText || text.formSubmit)}}</md-button></div></form></div>');
$templateCache.put('/views/crudFormBase.html','<div ng-repeat="field in fields" flex="{{field.flex || \'grow\'}}" flex-xs="100" ng-style="field.style" ng-if="(formType==\'create\' && !ef(field.createHiden || field.createHidden, item)) || (formType==\'edit\' && !ef(field.editHiden || field.editHidden, item)) || (formType==\'detail\' && !ef(field.detailHiden || field.detailHidden, item))"><div ng-switch="ef(field.type, item)" ng-if="!field.templateUrl && !field.template"><md-input-container class="md-block" flex ng-switch-default ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-blur="field.onChange && field.onChange(item, formType)" ng-pattern="field.pattern" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="textarea" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><textarea ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" rows="{{ field.rows || 3 }}" md-select-on-focus ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"></textarea><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="email" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><input ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" type="email" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-minlength="field.minlength" ng-maxlength="field.maxlength" ng-pattern="field.pattern" ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flexemail flex ng-switch-when="integer" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" md-crud-input-number ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-min="field.min" ng-max="field.max" step="{{field.step || 1}}" ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="decimal" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><input type="number" ng-model="item[field.name]" name="{{field.name}}" ng-required="field.required" md-crud-input-number ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-min="field.min" ng-max="field.max" step="{{field.step || \'any\'}}" ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><div class="md-block" flex ng-switch-when="image"><lf-ng-md-file-input name="{{field.name}}" lf-files="files[field.name]" lf-mimetype="image/*" lf-placeholder="{{field.label}}" lf-browse-label="Abrir" lf-remove-label="Eliminar"></lf-ng-md-file-input><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div><br></div><div class="md-block" flex ng-switch-when="map"><ng-map zoom="{{field.zoom || 11}}" center="{{item[field.lat]}},{{item[field.lng]}}"><marker position="{{item[field.lat]}},{{item[field.lng]}}" title="drag me" draggable="true" on-dragend="onMarkerDrag()" data="{{field}}"></marker></ng-map></div><div class="md-block" flex ng-switch-when="boolean"><md-switch ng-model="item[field.name]" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" aria-label="field.label" ng-true-value="{{\'\\\'\'+ field.trueValue + \'\\\'\'}}" ng-if="field.trueValue" ng-change="field.onChange && field.onChange(item, formType)">{{translate(((item[field.name] == field.trueValue) ? field.trueLabel : field.falseLabel) || field.label)}}</md-switch><md-switch ng-model="item[field.name]" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" aria-label="field.label" ng-if="!field.trueValue" ng-change="field.onChange && field.onChange(item, formType)">{{translate((item[field.name] ? field.trueLabel : field.falseLabel) || field.label)}}</md-switch></div><md-input-container class="md-block" flex ng-switch-when="select" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><md-select ng-model="item[field.name]" ng-if="field.multiple" name="{{field.name}}" multiple="multiple" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-required="field.required" ng-change="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item" md-on-open="field.onOpen(item)"><md-option ng-value="option[field.value || \'value\']" ng-repeat="option in ef(field.data, item)"><md-text md-crud-template="templateSelect(field)"></md-text></md-option></md-select><md-select ng-model="item[field.name]" ng-if="!field.multiple" name="{{field.name}}" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-required="field.required" ng-change="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item" md-on-open="field.onOpen(item)"><md-option ng-if="!field.required"></md-option><md-option ng-value="option[field.value || \'value\']" ng-repeat="option in ef(field.data, item)" md-crud-template="templateSelect(field)"></md-option></md-select><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" flex ng-switch-when="date" ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label>{{translate(field.label)}}</label><md-datepicker ng-model="item[field.name]" name="{{field.name}}" md-min-date="ef(field.minDate, item)" md-max-date="ef(field.maxDate, item)" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-required="field.required" md-crud-input-date aria-label="{{translate(field.label)}}" ng-change="field.onChange && field.onChange(item, formType)"></md-datepicker><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container class="md-block" ng-switch-when="time" flex ng-class="{ \'hide-error-msg\': field.hideErrorMsg }"><label style="margin-left: 50px">{{translate(field.label)}}</label><div class="" layout="row" layout-align="start start"><md-button layout-nowrap ng-click="showTimePicker($event, item, field.name)" class="md-datepicker-button md-icon-button md-button md-ink-ripple" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading"><md-icon>access_time</md-icon></md-button><div flex><input class="md-datepicker-input md-input" type="time" name="{{field.name}}" ng-model="item[field.name]" md-crud-input-date aria-label="{{translate(field.label)}}" ng-required="field.required" flex ng-min="ef(field.min, item)" ng-max="ef(field.max, item)" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></div></div></md-input-container><div class="md-block" ng-switch-when="datetime" flex layout="row" layout-align="start start"><md-input-container flex="none"><label style="overflow: visible;\r\n                        -webkit-transform: translate3d(0, 6px, 0) scale(0.75);\r\n                        transform: translate3d(0, 6px, 0) scale(0.75);\r\n                        -webkit-transition: width cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s, -webkit-transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s;\r\n                        transition: width cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s, -webkit-transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s;\r\n                        transition: transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s, width cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s;\r\n                        transition: transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s, width cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s, -webkit-transform cubic-bezier(0.25, 0.8, 0.25, 1) 0.4s">{{translate(field.label)}}</label><md-datepicker layout-nowrap ng-model="item[field.name]" name="{{field.name}}" md-min-date="ef(field.minDate, item)" md-max-date="ef(field.maxDate, item)" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-required="field.required" md-crud-input-date aria-label="{{translate(field.label)}}" ng-change="field.onChange && field.onChange(item, formType)"></md-datepicker><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></md-input-container><md-input-container><div class="" layout="row" layout-align="start start"><md-button layout-nowrap ng-click="showTimePicker($event, item, field.name)" class="md-datepicker-button md-icon-button md-button md-ink-ripple" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading"><md-icon>access_time</md-icon></md-button><div flex><input class="md-datepicker-input md-input" type="time" name="{{field.name}}" ng-model="item[field.name]" md-crud-input-date aria-label="{{translate(field.label)}}" ng-required="field.required" flex ng-min="field.min" ng-max="field.max" ng-disabled="ef(field.readonly, item) || ef(options.readonly, item) || readonly || isLoading" ng-blur="field.onChange && field.onChange(item, formType)" md-crud-input-validator="field.errorMessage" item="item"><div ng-messages="formCrud[field.name].$error" ng-messages-multiple><div ng-messages-include="/views/crudFormMessages.html"></div></div></div></div></md-input-container></div><div class="md-block" ng-switch-when="button" flex layout-align="{{field.align}}"><md-button ng-class="field.class" ng-click="field.onClick(item)"><md-icon ng-if="field.icon">{{field.icon}}</md-icon><md-tooltip md-autohide ng-if="field.tooltip">{{translate(field.tooltip)}}</md-tooltip>{{translate(field.label)}}</md-button></div><div class="md-block" flex ng-switch-when="label"><span>{{translate(field.label)}}</span></div></div><div ng-if="field.templateUrl" ng-include="field.templateUrl"></div><div ng-if="field.template" md-crud-template="ef(field.template, item)"></div></div>');
$templateCache.put('/views/crudFormDialog.html','<md-dialog aria-label="Editar" flex="{{options.windowFlex}}"><md-toolbar><div class="md-toolbar-tools"><h2>{{ formTitle }}</h2><span flex></span><md-button class="md-icon-button" ng-click="cancelDialog()"><md-icon aria-label="Cerrar">close</md-icon></md-button></div></md-toolbar><md-dialog-content><md-crud-form options="options" ng-model="item" on-open="onOpen" on-edit="onEdit" on-detail="onDetail" on-cancel="onCancelDialog" on-sussces="onSusscesDialog" template-url="templateUrl" editable="formEditable" model-copy="true"></md-crud-form></md-dialog-content></md-dialog>');
$templateCache.put('/views/crudFormMessages.html','<div ng-message="required">{{translate(field.messageRequired || text.messageRequired)}}</div><div ng-message="minlength">{{translate(field.messageMinlength || text.messageMinlength)}} ({{field.minlength}}).</div><div ng-message="maxlength">{{translate(field.messageMaxlength || text.messageMaxlength)}} ({{field.maxlength}}).</div><div ng-message="pattern">{{translate(field.messagePattern || text.messagePattern)}}</div><div ng-message="min">{{translate(field.messageMin || text.messageMin)}} ({{field.min}}).</div><div ng-message="max">{{translate(field.messageMax || text.messageMax)}} ({{field.max}}).</div><div ng-message="mimetype">{{translate(field.messageMimetype || text.messageMimetype)}}</div><div ng-message="valid">{{translate(field.messageValid || text.messageValid)}}</div><div ng-message="mindate">{{translate(field.messageMindate || text.messageMindate)}} {{field.minDate | date:\'shortDate\'}}.</div><div ng-message="maxdate">{{translate(field.messageMaxdate || text.messageMaxdate)}} {{field.maxDate | date:\'shortDate\'}}.</div><div ng-message="mdCrudInputValidator">{{translate(ef(field.errorMessage, item[field.name], item))}}</div>');}]);
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
                options: "=",
                onLoad: "=",
                rows: "="
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

            var ef = $scope.ef = tools.evalFunction;

            $scope.stringToHtml = function(str, data) {
                return $sce.trustAsHtml($interpolate(str)(data));
            }

            if(!options.offline)
                $scope.isLoading = true;

            $scope.getTemplateColumn = function(field, row) {
                var template = field.templateColumn || field.columnTemplate || crudService.templateColumns[ef(field.type, row) || 'default'] || crudService.templateColumns['default'];
                return template.replace("row[field.name]", "row." + field.name);
            }

            $scope.getTemplateSelect = function(field) {
                if(field.templateSelect)
                    return field.templateSelect.replace('option', 'getOptionSelect(field, row)');
                return "{{translate(getOptionSelect(field, row)." + (field.text || 'text') + ")}}";
            }

            $scope.getOptionSelect = function(field, row) {
                var data = tools.evalFunction(field.data, row);
                for(var i in data) {
                    if(data[i][field.value || 'value'] == row[field.name])
                        return data[i];
                }
                return row;
            }

            $scope.onSearchTextChange = function(text) {
                $scope.searchText = text;
                if(options.serverSide && serverSide.searchParam) {
                    $scope.table.page = 1;
                    options.refresh();
                }
            }
            
            var serverSide = angular.copy(crudService.options.serverSide || {});
            if(options.serverSide && !(typeof options.serverSide === 'boolean')) {
                angular.extend(serverSide, options.serverSide);
            }

            $scope.countFieldsColums = function() {
                var count = 0;
                for(var i in options.fields) {
                    var field = options.fields[i];
                    if(!field.columnHiden && !field.columnHidden) {
                        count++;
                    }
                }
                return count + 2;
            }

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

            $scope.table = {
                rows: $scope.rows || [],
                refresh: function (params) {
                    $scope.isLoading = true;
                    angular.extend(getParams, params);
                    var optionsGet = angular.copy(options.http || {});
                    optionsGet.entity = options.entity;
                    optionsGet.params = angular.copy(optionsGet.params || {});
                    angular.extend(optionsGet.params, getParams);
                    if(options.serverSide) {
                        optionsGet.params[serverSide.pageParam] = $scope.table.page;
                        optionsGet.params[serverSide.offsetParam] = ($scope.table.page - 1) * $scope.table.limit;
                        optionsGet.params[serverSide.limitParam] = $scope.table.limit;
                        optionsGet.params[serverSide.searchParam] = ($scope.searchText != "") ? $scope.searchText : undefined;
                    }
                    $scope.table.promise = crudService.get(optionsGet).then(function (response) {
                        $scope.isLoading = false;
                        if(options.serverSide) {
                            $scope.table.rows = response.data[serverSide.dataResponse];
                            $scope.table.total = response.data[serverSide.totalResponse];
                        }
                        else
                            $scope.table.rows = response.data;
                    });
                },
                create: function (ev) {
                    if(ev)
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
                            $scope.rowCreate = null;
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
                    if(options.editOnSelect) {
                        $scope.table.edit(row, ev);
                        return;
                    }
                    ev.stopPropagation();
                    if ($scope.formType == "inline") {
                        $scope.rowCreate = null;
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
                    ev.stopPropagation();
                    var t = this;
                    var index = this.rows.findIndex(function (r) {
                        return r[options.id] == rowId;
                    });
                    var deleteFunct;
                    if(!options.offline) {
                        var optionsHttp = angular.copy(options.http || {});
                        optionsHttp.entity = options.entity;
                        optionsHttp.id = rowId;
                        deleteFunct = function () {
                            crudService.delete(optionsHttp).then(function (data) {
                                t.rows.splice(index, 1);
                            }, function (data) {
                                var error = text.deleteError;
                                if (data && data.error)
                                    error = data.error;
                                tools.showAlert(translate(text.deleteErrorTitle), translate(error), translate(text.btnAlertOk));
                            });
                        };
                    }
                    else {
                        deleteFunct = function () {
                            t.rows.splice(index, 1);
                        }
                    }
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

            options.create = function () {
                $scope.table.create();
            }

            options.cancel = function () {
                $scope.rowSelected = null;
                $scope.rowCreate = null;
                $mdDialog.cancel();
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

            $scope.onOpen = function (item, formType) {
                if ((options.form || {}).onOpen)
                    options.form.onOpen(item, formType);
            };

            $scope.onEdit = function (item) {
                if ((options.form || {}).onEdit)
                    options.form.onEdit(item);
            };

            $scope.onDetail = function (item) {
                if ((options.form || {}).onDetail)
                    options.form.onDetail(item);
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
                if (type == "create" && !options.noCreateAdd)
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

                $scope.onCancelDialog = function (error) {
                    $scope.onCancel(error);
                    $mdDialog.cancel();
                };

                $scope.onSusscesDialog = function (item, type) {
                    $scope.onSussces(item, type);
                    $mdDialog.hide(item);
                };

                $scope.cancelDialog = function () {
                    $scope.onCancelDialog();
                }
            }

            if($scope.onLoad)
                $scope.onLoad();
        }
    }
})();
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
    .directive('mdCrudInputDate', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
              ngModel.$parsers.push(function(value) {
                  return (value instanceof Date) ? value : new Date(value);
              });
              ngModel.$formatters.push(function(value) {
                  return (value instanceof Date) ? value : new Date(value);
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
                });
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
            serverSide: {
                pageParam: 'page',
                offsetParam: 'offset',
                limitParam: 'limit',
                searchParam: 'search',
                dataResponse: 'data',
                totalResponse: 'total'
            }
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
            formSubmit: 'Save'
        };

        var templateColumns = {
            boolean: '<span><md-switch ng-model="row[field.name]" ng-disabled="true" aria-label="{{translate(field.label)}}" ng-true-value="{{\'\\\'\'+ field.trueValue + \'\\\'\'}}" ng-if="field.trueValue">{{translate(((row[field.name] == field.trueValue)? field.trueLabel : field.falseLabel) || "")}}</md-switch></span>'
                + '<span><md-switch ng-model="row[field.name]" ng-disabled="true" aria-label="{{translate(field.label)}}" ng-if="!field.trueValue">{{translate((row[field.name] ? field.trueLabel : field.falseLabel) || "")}}</md-switch></span>',
            image: '<image ng-src="{{row[field.name]}}" style="max-height:90px"></image>',
            date: '<span>{{ row[field.name] | date:"shortDate" }}</span>',
            time: '<span>{{ row[field.name] | date:"shortTime" }}</span>',
            datetime: '<span>{{ row[field.name] | date:"short" }}</span>',
            select: '<span md-crud-template="getTemplateSelect(field, row)"></span>',
            text: '<span>{{translate(row[field.name])}}</span>',
            button: '<md-button ng-class="field.class" ng-click="field.onClick(row, $event) || $event.stopPropagation()"><md-icon ng-if="field.icon">{{field.icon}}</md-icon><md-tooltip md-autohide ng-if="field.tooltip">{{translate(field.tooltip)}}</md-tooltip>{{translate(field.label)}}</md-button>',
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
            }      
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
            evalFunction: function(opt, p1, p2, p3, p4, p5) {
                if(angular.isFunction(opt))
                    return opt(p1, p2, p3, p4, p5);
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
