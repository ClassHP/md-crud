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
            formType: 'inline',
            deleteConfirm: true,
            tableLimit: 10,
            limitOptions: [10, 20, 30],
            translate: function(text) {
                return text;
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
            formSubmit: 'Save',
        };

        return {
            options: defaultOptions,
            setDefaultOptions: function(options) {
                angular.extend(defaultOptions, tools.removeNull(options));
            },
            text: defaultText,
            setDefaultText: function(text) {
                angular.extend(defaultText, tools.removeNull(text));
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
