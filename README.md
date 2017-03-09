# Angular material crud

Permite crear un cotrol CRUD simple o personalizado sobre un RESTful Api utilizando $http.

## Dependecias


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
