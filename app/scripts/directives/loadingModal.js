'use strict';
angular.module('MainDirective').directive('loadingModal', loadingModal);

function loadingModal (){
  return {
    restrict: 'EA',
    templateUrl: 'views/partials/loading.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    bindToController: true
  };
}
