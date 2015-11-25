'use strict';
angular.module('fractalApp').factory('GraphFactory', [function(){
  var seed = [{x:7,y:13},{x:7,y:7},{x:13,y:7}];
  var points = [];
  points.push(seed);
  points = _.flatten(points);

  //call the replacement algorithm to find the points for the next iteration.
  //rotate, scale, translate
  var iterate = function(){
    var temp = [];
    var seedLength = findDist(seed[0], seed.slice(-1)[0]);
    var seedTheta = findAngleFromZero(seed[0], seed.slice(-1)[0]);
    for (var i = 0; i < points.length - 1; i++){
      var theta = findAngleFromZero(points[i],points[i+1]);
      var piece = rotate(seed, theta-seedTheta);
      var dist = findDist(points[i],points[i+1]);
      piece = scale(piece, dist/seedLength);
      piece = translate(piece,points[i]);
      temp.push(piece);
    }
    temp = _.flatten(temp);
    temp = filterPoints(temp);
    angular.copy(temp, points);
  };

  var setPointsToSeed = function(){
    angular.copy(seed, points)
  };

  //add node at random location
  var addNode = function(){
    var xRand = Math.floor(Math.random() * 11);
    var yRand = Math.floor(Math.random() * 11);
    seed.push({x:xRand,y:yRand});
  };

  //remove last node
  var removeNode = function(){
    seed.pop();
  };

  //find the distance between two points, pythagorean formula
  var findDist = function(point1, point2){
    var xLength = Math.abs(point1.x - point2.x);
    var yLength = Math.abs(point1.y - point2.y);
    return Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
  };

  //transform an array of points by scaling
  var scale = function(array, scalar){
    return array.map(function(point){
      return {x: point.x * scalar, y: point.y * scalar};
    });
  };

  //find the positive angle from x-axis, point1 is the center point of the angle
  var findAngleFromZero = function(point1, point2){
    var xLength = point2.x - point1.x;
    var yLength = point2.y - point1.y;
    var ang = Math.PI / 2;
    if (xLength !== 0) {
      ang = Math.atan(yLength / xLength);
    }
    if (xLength < 0){
      return ang + Math.PI;
    } else if (xLength > 0 && yLength < 0) {
      return ang + 2 * Math.PI;
    } else if (xLength === 0 && yLength < 0){
      return ang + Math.PI;
    } else {
      return ang;
    }
  };

  //rotate na array by a given angle
  var rotate = function(array, theta){
    var rot = [[Math.cos(theta), -Math.sin(theta)],[Math.sin(theta), Math.cos(theta)]];
    return array.map(function(point){
      return matMultiply(rot, point);
    });
  };

  //translate an array by a vector
  var translate = function(array, trans){
    return array.map(function(point){
      return {x: point.x - array[0].x + trans.x, y: point.y - array[0].y + trans.y};
    });
  };

  //transform a point by multiplying by a 2x2 matrix
  var matMultiply = function(trans, point){
    var xVal = (trans[0][0]*point.x) + (trans[0][1]*point.y);
    var yVal = (trans[1][0]*point.x) + (trans[1][1]*point.y);
    return {x: xVal, y: yVal};
  };

  //remove some redundant points
  var filterPoints = function(array){
    for(var i = 0; i < array.length - 1; i++){
      if(array[i].x === array[i+1].x && array[i].y === array[i+1].y){
        array[i] = null;
      }
    }
    return _.compact(array);
  };

  return {
    points: points,
    iterate: iterate,
    seed: seed,
    setPointsToSeed: setPointsToSeed,
    addNode: addNode,
    removeNode: removeNode
  };

}]);
