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

            $scope.getTextSelect = function(field, row) {
                if(field.getTextSelect)
                    return field.getTextSelect(field, row);
                var data = tools.evalFunction(field.data, row);
                for(var i in data) {
                    if(data[i][field.value] == row[field.name])
                        return data[i][field.text];
                }
                return row[field.name];
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
                    var optionsGet = angular.copy(options.http);
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
                    var optionsHttp = angular.copy(options.http);
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