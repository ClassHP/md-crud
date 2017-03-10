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
### Posibles valores para Fields
| Params | Type | Details |
| ------ | ---- | ------- |
| name | String | Nombre del campo. |
| label | String | Texto a mostrar como cabecera en la columna de la tabla y como etiqueta en el formulario. |
| type | String | Tipo de campo. Posibles valores: ['text', 'email', 'integer', 'decimal', 'boolean', 'select', 'date']. |
| multiple | Boolean | Indica si el tipo 'select' sera se selección multiple. |
| columnHiden | Boolean | Oculta el campo en la tabla. |
| createHiden | Boolean | Oculta el formulario al crear. |
| editHiden | Boolean | Oculta el campo en el formulario al editar. |
| detailHiden | Boolean | Oculta el formulario al ver el detalle. |
| templateUrl | String | Url de la plantilla a utilizar para personalizar el formulario. Es necesario que no se tenga valor en el campo "name".|
| columnTemplate | String | Plantilla a utilizar para mostrar el campo en la tabla. |
| readonly | Boolean | Coloca el campo en solo lectura o deshabilitado. |
| minlength | Integer | Define la cantidad mínima de caracteres para los campos de texto. |
| maxlength | Integer | Define la cantidad máxima de caracteres para los campos de texto. |
| pattern | String | Formato en expreción regular para los campos de texto. |
| min | Integer | Define el valor mínimo para los campos numericos. |
| max | Integer | Define el valor máximo para los campos numericos. |
| step | Integer | Define el valor de salto para campos numericos. |
| minDate | Date | Define la fecha menor a ingresar en el campo 'date'. |
| maxDate | Date | Define la fecha mayor a ingresar en el campo 'date'. |

> Valores por defecto
```javascript
{
    columnHiden: false,
    createHiden: false,
    editHiden: false,
    detailHiden: false
}
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
