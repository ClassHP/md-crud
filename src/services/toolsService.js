(function () {
    'use strict';

    angular.module('mdCrudModule').service('mdCrudToolsService', ['$mdDialog', fnService]);

    function fnService($mdDialog) {
        return {
            showConfirm: function (title, message, okText, cancelText) {
                okText = okText || "Si";
                cancelText = cancelText || "No";
                var confirm = $mdDialog.confirm()
                      .title(title)
                      .ariaLabel(title)
                      .textContent(message)
                      //.targetEvent(ev)
                      .ok(okText)
                      .cancel(cancelText);

                return $mdDialog.show(confirm);
            },
            showAlert: function (title, message) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(title)
                    .ariaLabel(title)
                    .textContent(message)
                    .ok('Continuar')
                );
            },
            getBase64: function (file) {
                return $q(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                        resolve(reader.result);
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                })
            },
            removeNullRecursive: function (obj)
            {
                var removeNullIn = function(prop, obj)
                {
                    var pr = obj[prop];
                    if(pr === null || pr === undefined) delete obj[prop]; 
                    else if(typeof pr === 'object') for (var i in pr) removeNullIn(i, pr);
                }
                for (var i in obj) {
                    removeNullIn(i, obj);
                }
                return obj;
            },
            removeNull: function (obj)
            {
                for (var prop in obj) {
                    var pr = obj[prop];
                    if(pr === null || pr === undefined) delete obj[prop]; 
                }
                return obj;
            },
            evalFunction: function(opt, model) {
                if(angular.isFunction(opt))
                    return opt(model);
                return opt;
            }
        };
    }
})();
