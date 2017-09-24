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
[https://cdn.rawgit.com/ClassHP/md-crud/1.0.0/dist/md-crud.min.js](https://cdn.rawgit.com/ClassHP/md-crud/1.0.0/dist/md-crud.min.js)

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
            columnHidden: true,
            detailHidden: true,
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
            columnTemplate: '<strong>{{row.PublishDate | date:"short"}}</strong>',
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
            columnHidden: true,
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
    },
    form: {
        onEdit: function (item) {
            item.aditionalValue = 1;
        }
    }
};
```
### Properties
| Params | Type | Details |
| ------ | ---- | ------- |
| options | Object | Objeto de configuración. |
| onLoad | Function | Evento que se ejecuta al terminar de cargar la directiva. |
| rows | Array | Arreglo de filas a mostar en CRUDs offlines. |

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
| formType | String | Tipo de formulario. Posibles valores: ['inline', 'window']. Valor por defecto: 'inline'. |
| deleteConfirm | Boolean | Indica si se solicitará conformación al intentar eliminar un registro. Valor por defecto: true. |
| searchText | String | Texto a buscar por defecto. |
| searchDelay | Integer | Tiempo en miliseguntos de retraso en escribir en el campo de busqueda. |
| tableLimit | Integer | Cantidad de filas por paginas a mostrar en la tabla. |
| limitOptions | Array(Integer) | Opciones para elegir la cantidad de filas a mostrar por pagina. Valor por defecto: [10, 20, 30]. |
| editOnSelect | Boolean | Desactiva la funcionalidad de detalle y al presionar la fila abre el formulario de editar. |
| noDetailButtons | Boolean | Oculta los botones de Aceptar y Cancelar del formulario de detalle. |
| noButtons | Boolean | Oculta los botones de Aceptar y Cancelar del formulario de detalle y editar. |
| offline | Boolean | Desabilita todas las funcionalidades de carga y actualización a travez de $http, utiliza como modelo de datos la propiedad 'rows' en la directiva. |
| noPaginate | Boolean | Desabilita la paginación. |
| windowFlex | String | Aplica la propiedad flex para aujustar el tamaño de las ventanas de edición y detalle. |

### Options -> fields
| Params | Type | Details |
| ------ | ---- | ------- |
| name | String | Nombre del campo. |
| label | String | Texto a mostrar como cabecera en la columna de la tabla y como etiqueta en el formulario. |
| type | String, Function | Tipo de campo. Posibles valores: ['text', 'textarea', 'email', 'integer', 'decimal', 'boolean', 'select', 'date', 'time', 'datetime', 'label', 'button']. |
| multiple | Boolean | Indica si el tipo 'select' sera se selección multiple. |
| columnHidden | Boolean | Oculta el campo en la tabla. |
| createHidden | Boolean | Oculta el formulario al crear. |
| editHidden | Boolean | Oculta el campo en el formulario al editar. |
| detailHidden | Boolean | Oculta el formulario al ver el detalle. |
| templateUrl | String | Url de la plantilla a utilizar para personalizar el formulario. |
| template | String | Template HTML con el formato a utilizar en el formulario. |
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
| columnHeader | String | Texto de la cabecera de la columna en la tabla. Por defecto es igual al campo "label". |
| styleCell | Object | Estilo CSS de la celda en la tabla. |
| hideErrorMsg | Boolean | Oculta el espacio reservado para los mensajes de error. |

### Options -> form
| Params | Type | Details |
| ------ | ---- | ------- |
| onOpen | Function | Se ejecuta cuando se abre el formulario. |
| onEdit | Function | Se ejecuta cuando se abre el formulario para editar luego de obtener el registro actualizado. |
| onCancel | Function | Se ejecuta al cancelar el formulario. |
| onSubmit | Function | Se ejecuta antes de enviar los datos del formulario. |
| onSussces | Function | Se ejecuta cuando la respuesta del formulario es correcta. |

### Options -> http
| Params | Type | Default value | Details |
| ---- | ---- | ---- | ---- |
| rootApi | String | '/api' | Configura la ruta inicial del REST Api a consultar. |
| methodGet | String | 'GET' | Metodo HTTP a utilizar para la consultas. |
| methodPost | String | 'POST' | Metodo HTTP a utilizar en la creación. |
| methodPatch | String | 'PATCH' | Metodo HTTP a utilizar en la edición. |
| methodDelete | String | 'DELETE' | Metodo HTTP a utilizar en la eliminación. |
| urlGet | String (template) | '{{rootApi}}/{{entity}}' | Url para obtener los datos de la tabla. |
| urlGetById | String (template) | '{{rootApi}}/{{entity}}/{{id}}' | Url para obtener los datos de edición o detalle. |
| urlPost | String (template) | '{{rootApi}}/{{entity}}' | Url de la creación. |
| urlPatch | String (template) | '{{rootApi}}/{{entity}}/{{id}}' | Url de la edición. |
| urlDelete | String (template) | '{{rootApi}}/{{entity}}/{{id}}' | Url de la eliminación. |
| functionHttp | Function | function(options, method) { ... } | Función usada para obtener datos desde el REST Api. |
| functionData | Function | function(response, resolve, reject, method) { resolve(response) } | Función para tratar los datos devueltos por el REST Api. |

## Directivas
```html
<md-crud options="options" onLoad="onLoad" rows="rows"></md-crud>

<md-crud-form options="options" ng-model="row" on-open="onOpen" on-edit="onEdit" on-detail="onDetail" 
    on-cancel="onCancel" on-sussces="onSussces" on-submit="onSubmit" editable="true" model-copy="true">
</md-crud-form>

<md-crud-form-base flex layout="row" layout-wrap options="options" ng-model="item" form-type="edit" 
    editable="true" form-crud="formCrud" is-loading="false">
</md-crud-form-base>
```

## Configuración global
```javascript
angular.module('app').run(['mdCrudService', function (mdCrudService) {    
    mdCrudService.setDefaultOptions({
        rootApi: '/api',
        methodGet: 'GET',
        methodPost: 'POST',
        methodPatch: 'PATCH',
        methodDelete: 'DELETE',
        urlGet: '{{rootApi}}/{{entity}}',
        urlGetById: '{{rootApi}}/{{entity}}/{{id}}',
        urlPost: '{{rootApi}}/{{entity}}',
        urlPatch: '{{rootApi}}/{{entity}}/{{id}}',
        urlDelete: '{{rootApi}}/{{entity}}/{{id}}',
        functionHttp: function(options, method) { return $q(...) },
        functionData: function(response, resolve, reject, method) { resolve(response) },
        formType: 'inline',
        deleteConfirm: true,
        tableLimit: 10,
        limitOptions: [10, 20, 30],
        translate: function(text) { return text; },
        autoRefresh: true,
        serverSide: {
            pageParam: 'page',
            offsetParam: 'offset',
            limitParam: 'limit',
            searchParam: 'search',
            dataResponse: 'data',
            totalResponse: 'total'
        }
    });
    mdCrudService.setDefaultOptions({
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
        createOption: 'Create',
        btnConfirmOk: 'Yes',
        btnConfirmCancel: 'No',
        btnAlertOk: 'Ok',
        generalErrorTitle: 'Error',
        messageRequired: 'Required',
        messageMinlength: 'Min length',
        messageMaxlength: 'Max length',
        messagePattern: 'Invalid input format.',
        messageMin: 'Min value',
        messageMax: 'Max value',
        messageMimetype: 'Invalid file type.',
        messageValid: 'Invalid input format.',
        messageMindate: 'Min date',
        messageMaxdate: 'Max date',
        formCancel: 'Cancel',
        formSubmit: 'Save'
    });
}]);
```
