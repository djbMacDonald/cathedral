'use strict';
angular.module('MainDirective').directive('replacementGraph', ['d3Service', replacementGraph]);



function replacementGraph (d3Service){
  return {
    restrict: 'EA',
    templateUrl: 'views/partials/replacement.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    bindToController: true
  };
}
