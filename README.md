# Angular material crud

Permite crear un cotrol CRUD simple o personalizado sobre un RESTful Api utilizando $http.

## Demo
[Aplicación Demo](https://cdn.rawgit.com/ClassHP/md-crud/e8ef789a/demo/index.html)

## Dependecias
```javascript
{
    "angular": "~1.5.*",
    "angular-animate": "~1.5.*",
    "angular-aria": "~1.5.*",
    "angular-messages": "~1.5.*",
    "angular-sanitize": "~1.5.*",
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
```
### Posibles valores para Fields
| Params | Type | Details |
| ------ | ---- | ------- |
| name | String | Nombre del campo. |
| label | String | Texto a mostrar como cabecera en la columna de la tabla y como etiqueta en el formulario. |
| type | String, Function | Tipo de campo. Posibles valores: ['text', 'textarea', 'email', 'integer', 'decimal', 'boolean', 'select', 'date']. |
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
| data | Array, Function | Función que devuelve los datos a usar en el tipo 'select'. |
| value | String | Valor a usar en el tipo 'select'. |
| text | String | Texto a usar en el tipo 'select'. |
| required | Boolean | Indica si el campo es requerido. |
| flex | String | Personaliza el tamaño y posición del campo en el formulario. |
| messagePattern | String | Personaliza el mensaje a mostrar cuando no se cumpla la expresion regular. |
| rows | Integer | Cantidad de filas iniciales en el formulatio del tipo 'textarea'. |

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
