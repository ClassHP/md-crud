angular.module('app', ['ngAnimate', 'ngMessages', 'ngSanitize', 'ngMaterial', 'md.data.table', 'mdCrudModule', 'mdPickers'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
    .primaryPalette('indigo', { 'default': '800' })
    .accentPalette('blue-grey', { 'default': '500' })
    .warnPalette('orange');
}])
.run(['mdCrudService', function (mdCrudService) {    
    mdCrudService.setDefaultOptions({
        rootApi: 'https://fakerestapi.azurewebsites.net/api',
        methodPatch: 'PUT'
    });
}])
.controller('mainController', ['$scope', '$timeout', 'mdCrudService', function($scope, $timeout, mdCrudService){

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

    $scope.crudOptions = {
        entity: 'Books',
        id: 'ID',
        noEdit: false,
        noDelete: false,
        noCreate: false,
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
                data: [
                    { value: 'text', text: 'Text' },
                    { value: 'integer', text: 'Integer' },
                    { value: 'decimal', text: 'Decimal' }
                ],
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
                required: true
            },
            {
                name: 'Excerpt',
                label: 'Excerpt',
                type: 'textarea',
                required: true,
                columnHiden: true,
            }
        ],
        form: {
            onEdit: function (data) {
                data.PublishDate = new Date(data.PublishDate);
            }
        }
    };    
    
    $timeout(function () {
        $scope.crudOptions.refresh();
    });
}]);