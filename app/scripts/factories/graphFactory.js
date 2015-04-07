'use strict';
angular.module('fractalApp').factory('GraphFactory', [function(){
  var seed = [{x:0,y:0},{x:1,y:0},{x:2,y:1},{x:3,y:0},{x:4,y:0}];
  var points = [];
  points.push(seed);
  points = _.flatten(points);

  var iterate = function(){
    var temp = [];
    for (var i = 0; i < points.length - 1; i++){
      var theta = findAngleFromZero(points[i],points[i+1]);
      console.log(theta);
      var piece = rotate(seed, theta);
      temp.push(piece);
    }
    temp = _.flatten(temp);
    angular.copy(temp, points);





    // var temp = [];
    // var seedLength = findDist(seed[0], seed.slice(-1)[0]);
    // for (var i = 0; i < points.length - 1; i++){
    //   var dist = findDist(points[i], points[i+1]);
    //   var piece = scale(seed, dist);
    //   var theta = findAngleFromZero(points[i], points[i+1]);
    //   piece = rotate(piece, theta);
    //   piece = translate(piece, points[i]);
    //   piece = translate(piece,{x:0,y:i});
    //   temp.push(piece);
    // }
    // temp = _.flatten(temp);
    // angular.copy(temp, points)
  };

  var findDist = function(point1, point2){
    var xLength = Math.abs(point1.x - point2.x);
    var yLength = Math.abs(point1.y - point2.y);
    return Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
  };

  var scale = function(array, scalar){
    return array.map(function(point){
      return {x: point.x * scalar, y: point.y * scalar};
    });
  };

  var findAngleFromZero = function(point1, point2){
    var xLength = point2.x - point1.x;
    var yLength = point2.y - point1.y;
    return Math.atan(yLength / xLength);
  };

  var rotate = function(array, theta){
    var rot = [[Math.cos(theta), -Math.sin(theta)],[Math.sin(theta), Math.cos(theta)]];
    return array.map(function(point){
      return matMultiply(rot, point);
    });
  };

  var translate = function(array, trans){
    return array.map(function(point){
      return {x: point.x + trans.x, y: point.y + trans.y};
    });
  };

  var matMultiply = function(trans, point){
    var xVal = (trans[0][0]*point.x) + (trans[0][1]*point.y);
    var yVal = (trans[1][0]*point.x) + (trans[1][1]*point.y);
    return {x: xVal, y: yVal};
  };

  return {
    points: points,
    iterate: iterate
  };

}]);
