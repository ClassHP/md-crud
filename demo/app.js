angular.module('app', ['ngMaterial', 'md.data.table', 'gettext', 'mdCrudModule'])
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
                name: 'Description',
                label: 'Description',
                type: 'text',
                required: true
            },
            {
                name: 'PageCount',
                label: 'Page count',
                type: 'integer',
                required: true
            },
            {
                name: 'PublishDate',
                label: 'Publish date',
                type: 'date',
                required: true
            },
            {
                name: 'Excerpt',
                label: 'Excerpt',
                type: 'text',
                required: true,
                columnHiden: true,
            }
        ]
    };    
    
    $timeout(function () {
        $scope.crudOptions.refresh();
    });
}]);