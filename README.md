# Angular material crud

Permite crear un cotrol CRUD simple o personalizado sobre un RESTful Api utilizando $http.

## Demo
[Aplicación Demo](https://cdn.rawgit.com/ClassHP/md-crud/46b2f849/demo/index.html)

## Dependecias
```javascript
{
    "angular": "~1.5.*",
    "angular-animate": "~1.5.*",
    "angular-aria": "~1.5.*",
    "angular-gettext": "^2.3.8",
    "angular-material": "^1.1.1",
    "angular-material-data-table": "^0.10.10"
}
```

## Configuración del CRUD
```javascript
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
```
## Directiva
```html
<md-crud options="crudOptions"></md-crud>
```


## Configuración global
```javascript
angular.module('app').run(['mdCrudService', function (mdCrudService) {    
    mdCrudService.setDefaultOptions({
        rootApi: 'http://fakerestapi.azurewebsites.net/api',
        methodPatch: 'PUT'
    });
}]);
```
