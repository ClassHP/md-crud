angular.module('app', ['ngAnimate', 'ngMessages', 'ngSanitize', 'ngMaterial', 'md.data.table', 'gettext', 'mdCrudModule'])
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
.controller('mainController', ['$scope', '$timeout', function($scope, $timeout){
    $scope.crudOptions = {
        entity: 'Books',
        id: 'ID',
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
                flex: '33'
            },
            {
                name: 'PageCount',
                label: 'Page count',
                type: function(item) { return item.type || 'text'; },
                required: true,
                flex: '33'
            },
            {
                name: 'PublishDate',
                label: 'Publish date',
                type: 'date',
                required: true,
                columnTemplate: '<strong>{{PublishDate | date:"short"}}</strong>',
                flex: '33'
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
        ]
    };    
    
    $timeout(function () {
        $scope.crudOptions.refresh();
    });
}]);