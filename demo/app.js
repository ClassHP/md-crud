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
                template: '<div>Prueba de <strong>template</strong></div>',
                columnHiden: true
            },
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
                onOpen: function () {
                    
                },
                onChange: function(item) {
                    //mdCrudToolsService.showAlert('Test', 'Test');
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
                columnTemplate: '<strong>{{row.PublishDate | date:"short"}}</strong>',
                flex: 'none'
            },
            {
                label: 'Test',
                type: 'button',
                class: 'md-raised',
                flex: '25',
                onClick: function(item) {
                    mdCrudToolsService.showAlert('Test', 'Test');
                }
            },
            {
                name: 'Description',
                label: 'Description',
                type: 'textarea',
                required: true,
                columnTemplate: '{{row.Description.substring(0,50) + "..."}}',
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
            }
        ],
        form: {
            onEdit: function (data) {
                data.PublishDate = new Date(data.PublishDate);
            }
        },
        http: {
            rootApi: 'https://fakerestapi.azurewebsites.net/api',
            methodPatch: 'PUT',
            urlGetById: '{{rootApi}}/{{entity}}/{{id}}?entity={{getEntity()}}',
            getEntity: function () { return $scope.crudOptions.entity; }
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
                columnTemplate: '<image src="{{row.thumbnail.path + "/standard_medium." + row.thumbnail.extension}}" style="max-height:90px"></image>'
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
        id: 'url',
        noEdit: true,
        noDelete: true,
        noCreate: true,
        fields: [
            {
                name: 'name',
                label: 'Name',
                flex: 'none'
            },
            {
                name: 'height',
                label: 'Height',
                flex: 'none'
            },
            {
                name: 'mass',
                label: 'Mass',
                flex: 'none'
            },
            {
                name: 'hair_color',
                label: 'Hair color',
                flex: 'none'
            },
            {
                name: 'skin_color',
                label: 'Skin color',
                flex: 'none'
            },
            {
                name: 'eye_color',
                label: 'Eye color',
                flex: 'none'
            },
            {
                name: 'birth_year',
                label: 'Birth year',
                flex: 'none'
            },
            {
                name: 'gender',
                label: 'Gender',
                flex: 'none'
            },
            {
                //templateUrl: 'templatePlanet.html',
                template: `
                    <strong>Homeworld</strong>
                    <md-crud-form-base flex layout="row" layout-wrap ng-if="item.homeworldData"
                        options="field.homelandOptions" ng-model="item.homeworldData" form-type="detail" 
                        editable="false" form-crud="formCrud" is-loading="false">
                    </md-crud-form-base>
                `,
                flex: 100,
                columnHidden: true,
                homelandOptions: {
                    fields: [
                        { name: 'name', label: 'Name', flex: 'none' },
                        { name: 'diameter', label: 'Diameter', flex: 'none' },
                        { name: 'rotation_period', label: 'Rotation period', flex: 'none' },
                        { name: 'orbital_period', label: 'Orbital period', flex: 'none' },
                        { name: 'gravity', label: 'Gravity', flex: 'none' },
                        { name: 'population', label: 'Population', flex: 'none' },
                        { name: 'climate', label: 'Climate', flex: 'none' },
                        { name: 'terrain', label: 'Terrain', flex: 'none' },
                        { name: 'surface_water', label: 'Surface water', flex: 'none' }
                    ]
                }
            },            
        ],
        form: {
            onDetail: function(item) {
                item.homeworldData = {};
                mdCrudService.get({ url: item.homeworld }).then(function(response) {
                    angular.extend(item.homeworldData, response.data);
                });
            }
        },
        serverSide: {
            pageParam: 'page',
            searchParam: 'search',
            dataResponse: 'results',
            totalResponse: 'count'
        },
        http: {
            rootApi: 'https://swapi.co/api',
            urlGetById: '{{id}}',
            params: { format: 'json' }
        }
    };  
}]);