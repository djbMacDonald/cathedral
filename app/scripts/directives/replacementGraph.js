'use strict';
angular.module('MainDirective').directive('replacementGraph', replacementGraph);



function replacementGraph (){
  return {
    restrict: 'EA',
    templateUrl: 'views/partials/replacement.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    bindToController: true
  };
}
