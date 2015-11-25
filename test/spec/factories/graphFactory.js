describe('GraphFactory', function() {

  beforeEach(module('fractalApp'));

  var graphFactory;

  beforeEach(inject(function(_GraphFactory_) {
    graphFactory = _GraphFactory_;
  }));

  describe('starting data', function() {

    it('should have seed data', function() {
      expect(graphFactory.seed).toEqual([{x:2,y:8},{x:2,y:2},{x:8,y:2}]);
    });
  });

  describe('operations', function() {

    it('should add a node', function() {
      graphFactory.addNode();
      expect(graphFactory.seed.length).toBe(4);
    });

    it('should remove a node', function() {
      graphFactory.removeNode();
      expect(graphFactory.seed.length).toBe(2);
    });

    it('should find the distance between two points', function() {
      var dist = graphFactory.findDist({x:5,y:6},{x:8,y:10});
      expect(dist).toBe(5);
      var dist2 = graphFactory.findDist({x:8,y:10},{x:5,y:6});
      expect(dist2).toBe(5);
    });

    it('should scale a line segment to a given length', function() {
      var points = [{x:1,y:1},{x:2,y:2}];
      points = graphFactory.scale(points, 2);
      expect(points).toEqual([{x:2,y:2},{x:4,y:4}]);
    });

    it('should find a positive angle between two points, positive, counter-clockwise from positive horizontal', function() {
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:2,y:2})).toBeCloseTo(0.79,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:0,y:2})).toBeCloseTo(2.36,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:0,y:0})).toBeCloseTo(3.93,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:2,y:0})).toBeCloseTo(5.50,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:2,y:1})).toBeCloseTo(0,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:1,y:2})).toBeCloseTo(1.57,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:0,y:1})).toBeCloseTo(3.14,2);
      expect(graphFactory.findAngleFromZero({x:1,y:1},{x:1,y:0})).toBeCloseTo(4.71,2);
    });

    it('should rotate points in an array by a given angle', function() {
      var points = [{x:3,y:3},{x:0,y:0},{x:-2,y:5}];
      points = graphFactory.rotate(points, Math.PI);
      expect(points[0].x).toBeCloseTo(-3,2);
      expect(points[0].y).toBeCloseTo(-3,2);
      expect(points[1].x).toBeCloseTo(0,2);
      expect(points[1].y).toBeCloseTo(0,2);
      expect(points[2].x).toBeCloseTo(2,2);
      expect(points[2].y).toBeCloseTo(-5,2);
    });

    it('should translate an array so the first element is at the given point', function() {
      var points = [{x:3,y:5},{x:10,y:10},{x:-3,y:-6}];
      points = graphFactory.translate(points, {x:2,y:4});
      expect(points).toEqual([{x:2,y:4},{x:9,y:9},{x:-4,y:-7}]);
    });

    it('should be able to transform a point using the given matrix', function() {
      expect(graphFactory.matMultiply([[1,0],[0,1]],{x:4,y:7})).toEqual({x:4,y:7});
      expect(graphFactory.matMultiply([[1,1],[1,1]],{x:4,y:7})).toEqual({x:11,y:11});
    });

  });
});
