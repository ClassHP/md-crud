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
