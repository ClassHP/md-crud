(function () {
    'use strict';

    angular.module('mdCrudModule').service('mdCrudToolsService', ['$mdDialog', fnService]);

    function fnService($mdDialog) {
        return {
            showConfirm: function (title, message, okText, cancelText) {
                okText = okText || "Yes";
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
            showAlert: function (title, message, okText) {
                okText = okText || "Ok";
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(title)
                    .ariaLabel(title)
                    .textContent(message)
                    .ok(okText)
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
            evalFunction: function(opt, p1, p2, p3, p4, p5) {
                if(angular.isFunction(opt))
                    return opt(p1, p2, p3, p4, p5);
                return opt;
            },
            evalDefined: function (optArray) {
                for(var i in optArray){
                    if(angular.isDefined(optArray[i]))
                        return optArray[i];
                }
                return undefined;
            }
        };
    }
})();
