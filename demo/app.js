angular.module('app', ['ngAnimate', 'ngMessages', 'ngSanitize', 'ngMaterial', 'md.data.table', 'mdCrudModule', 'mdPickers'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo', { 'default': '800' })
    .accentPalette('blue-grey', { 'default': '500' })
    .warnPalette('orange');
}])
.controller('mainController', ['$scope', '$timeout', 'mdCrudService', 'mdCrudToolsService', 
function($scope, $timeout, mdCrudService, mdCrudToolsService){

    $scope.btnSpanish = function() {
        mdCrudService.setDefaultText({
            editTitle: 'Editar',
            detailTitle: 'Detalle',
            createTitle: 'Crear',
            deleteError: 'Error al intentar eliminar la fila',
            deleteErrorTitle: 'Error al eliminar',
            deleteConfirmTitle: 'Eliminar',
            deleteConfirmMessage: '¿Esta usted seguro de eliminar la fila?',
            tablePaginationPage: 'Pagina:',
            tablePaginationRowsPerPage: 'Filas por página:',
            tablePaginationOf: 'de',
            createOption: 'Crear'
        });
    }

    $scope.btnEnglish = function() {
        mdCrudService.setDefaultText({
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
            createOption: 'Create'
        });
    }

    var types = [
        { value: 'text', text: 'Text' },
        { value: 'integer', text: 'Integer' },
        { value: 'decimal', text: 'Decimal' }
    ];

    $scope.crudOptions = {
        entity: 'Books',
        id: 'ID',
        noEdit: false,
        noDelete: false,
        noCreate: false,
        noDetail: false,
        noSearch: false,
        fields: [
            {
                name: 'Title',
                label: 'Title',
                type: 'text',
                required: true
            },
            {
                name: 'type',
                label: 'Type',
                type: 'select',
                columnHiden: true,
                detailHiden: true,
                data: function () {
                    return types;
                },
                onChange: function(item) {
                    mdCrudToolsService.showAlert('Test', 'Test');
                },
                flex: '25'
            },
            {
                name: 'PageCount',
                label: 'Page count',
                type: function(item) { return item.type || 'text'; },
                required: true,
                flex: '10'
            },
            {
                name: 'PublishDate',
                label: 'Publish date',
                type: 'datetime',
                required: true,
                columnTemplate: '<strong>{{PublishDate | date:"short"}}</strong>',
                flex: '50'
            },
            {
                name: 'Description',
                label: 'Description',
                type: 'textarea',
                required: true,
                errorMessage: function(value, item) {
                    if(item.Title != value)
                        return "El titulo y la descripcion deben ser iguales.";
                }
            },
            {
                name: 'Excerpt',
                label: 'Excerpt',
                type: 'textarea',
                required: true,
                columnHiden: true,
            },
            {
                label: 'Test',
                type: 'button',
                class: 'md-raised',
                onClick: function(item) {
                    mdCrudToolsService.showAlert('Test', 'Test');
                }
            }
        ],
        form: {
            onEdit: function (data) {
                data.PublishDate = new Date(data.PublishDate);
            }
        },
        http: {
            rootApi: 'https://fakerestapi.azurewebsites.net/api',
            methodPatch: 'PUT'
        }
    };    
    
    $scope.crudOptions2 = {
        entity: 'characters',
        id: 'id',
        noEdit: true,
        noDelete: true,
        noCreate: true,
        noDetail: false,
        noSearch: false,
        fields: [
            {
                name: 'thumbnail',
                label: 'Image',
                type: 'template',
                columnTemplate: '<image src="{{thumbnail.path + "/standard_medium." + thumbnail.extension}}" style="max-height:90px"></image>'
            },
            {
                name: 'name',
                label: 'Name',
                type: 'text'
            },
            {
                name: 'description',
                label: 'Description',
                type: 'text'
            },
        ],
        serverSide: {
            searchParam: 'nameStartsWith',
            offsetParam: 'offset',
            limitParam: 'limit',
            dataResponse: 'results',
            totalResponse: 'total'
        },
        http: {
            rootApi: 'https://gateway.marvel.com:443/v1/public',
            params: {
                apikey: 'c3c80a056a45ea887f1c77c2525e66a5'
            },
            functionData: function (response, resolve, reject, method) {
                if(method == 'getById') {
                    resolve({ 
                        data: response.data.data.results[0]
                    });
                }
                else {
                    resolve({
                        data: response.data.data
                    });
                }
            }
        }
    };  

    $scope.crudOptions3 = {
        entity: 'people',
        id: 'id',
        serverSide: true,
        noEdit: true,
        noDelete: true,
        noCreate: true,
        noDetail: true,
        noSearch: false,
        fields: [
            {
                name: 'first_name',
                label: 'Firs name',
                type: 'text',
                required: true
            },
            {
                name: 'last_name',
                label: 'Last name',
                type: 'text',
                required: true
            },
            {
                name: 'avatar',
                label: 'Avatar',
                type: 'image',
                readonly: true
            }
        ],
        http: {
            rootApi: 'https://swapi.co/api',
            functionData: function (response, resolve, reject) {
                resolve(response.data.results || response.data);
            }
        }
    };  
}]);