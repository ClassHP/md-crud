# Angular material crud

Permite crear un cotrol CRUD simple o personalizado sobre un RESTful Api utilizando $http.

## Demo
[Aplicación Demo](https://classhp.github.io/md-crud/demo/)

## Dependecias
```javascript
{
    "angular": "~1.5.*",
    "angular-animate": "~1.5.*",
    "angular-aria": "~1.5.*",
    "angular-messages": "~1.5.*",
    "angular-sanitize": "~1.5.*",
    "angular-material": "^1.1.3",
    "angular-material-data-table": "^0.10.10",
    "mdPickers": "^0.7.5", //Opcional (para los tipos 'time' y 'datetaime')
    "moment": "^2.17.1" //Requerido por mdPickers
}
```
## CDN
[https://cdn.rawgit.com/ClassHP/md-crud/0.1.4/dist/md-crud.min.js](https://cdn.rawgit.com/ClassHP/md-crud/0.1.4/dist/md-crud.min.js)

## npm
```sh
$ npm install md-crud --save
```

## bower
```sh
$ bower install md-crud --save
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
            type: 'datetime',
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
### Server side
```javascript
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
                    data: response.data.data.results,
                    total: response.data.data.total
                });
            }
        }
    }
};
```

### Options
| Params | Type | Details |
| ------ | ---- | ------- |
| entity | string | Nombre de la entidad o tabla a consultar en el RESTfull Api. |
| id | string | Id de la entidad o tabla. |
| noEdit | Boolean | Desabilita la edición. Valor por defecto: false. |
| noDelete | Boolean | Desabilita la eliminación. Valor por defecto: false. |
| noCreate | Boolean | Desabilita la creación. Valor por defecto: false. |
| noDetail | Boolean | Desabilita la visualización de detalles. Valor por defecto: false. |
| noSearch | Boolean | Desabilita la busqueda. Valor por defecto: false. |
| fields | Array | Arreglo de campos a usar en el CRUD. |
| serverSide | Boolean, Object | Habilita el paginado y busqueda del lado del servidor. Valor por defecto: false. |
| http | Object | Configuración de las consultas al RESTfull Api. |
| formType | String | Tipo de formulario. Posibles valores: ['inline', 'wondow']. Valor por defecto: 'inline'. |
| deleteConfirm | Boolean | Indica si se solicitará conformación al intentar eliminar un registro. Valor por defecto: true. |
| searchText | String | Texto a buscar por defecto. |
| searchDelay | Integer | Tiempo en miliseguntos de retraso en escribir en el campo de busqueda. |
| tableLimit | Integer | Cantidad de filas por paginas a mostrar en la tabla. |
| limitOptions | Array(Integer) | Opciones para elegir la cantidad de filas a mostrar por pagina. Valor por defecto: [10, 20, 30]. |

### Options -> Fields
| Params | Type | Details |
| ------ | ---- | ------- |
| name | String | Nombre del campo. |
| label | String | Texto a mostrar como cabecera en la columna de la tabla y como etiqueta en el formulario. |
| type | String, Function | Tipo de campo. Posibles valores: ['text', 'textarea', 'email', 'integer', 'decimal', 'boolean', 'select', 'date', 'time', 'datetime']. |
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
