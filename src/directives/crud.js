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