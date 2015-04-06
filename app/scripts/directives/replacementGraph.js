angular.module('MainDirective').directive('replacementGraph', ['d3Service', replacementGraph]);

graphCtrl.$inject = ['GraphFactory', '$scope'];

function graphCtrl(GraphFactory, $scope){
  var vm = this;
  // vm.points = GraphFactory.points;
  vm.points = 'bad'
  console.log($scope);
  $scope.points = 'something';

  vm.doStuff = function(){
    return 'some text'
  };
}

function replacementGraph (d3Service){
  return {
    restrict: 'EA',
    scope: {
      points: '@'
    },
    controller: graphCtrl,
    bindToController: true,
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        console.log(scope.points);
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 300 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

        var x = d3.scale.linear().range([0, width]);

        var y = d3.scale.linear().range([height, 0]);

        var yAxis = d3.svg.axis().scale(y).orient('left');

        var line = d3.svg.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

        var svg = d3.select(element[0]).append('svg')
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)
         .append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Hard coded data
        scope.data = [
          {x: 0, y: 0},
          {x: 10, y: 0},
          {x: 20, y: 10},
          {x:30, y:0},
          {x:40, y: 0}
        ];

        scope.data.forEach(function(d) {
          d.x = d.x;
          d.y = +d.y;
        });

        x.domain(d3.extent(scope.data, function(d) { return d.x; }));
        y.domain(d3.extent(scope.data, function(d) { return d.y; }));

        svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text(scope.points);

        svg.append('path')
          .datum(scope.data)
          .attr('class', 'line')
          .attr('d', line);









      });
    }
  };
}
