angular.module('app').controller('mvChartListCtrl', function($scope, $http) {
  $scope.xInterval = 10;
  $scope.minY = Number.MAX_VALUE;
  $scope.maxY = 0;
  $scope.viewLen = 0;
  $scope.defaultXOffset = 30;
  $scope.startXIndex = 0;

  $http.get('app/data/dji_d_2014-1896.json').success(function(data) {
    $scope.ohcls = data;
    $scope.containerHeight = angular.element('.ohclbars').height();
    $scope.ohclsWidth = angular.element('.chart-container').width() - $scope.defaultXOffset;
    var preVLen = $scope.ohclsWidth/$scope.xInterval;
    $scope.viewLen = Math.ceil(preVLen)
    if (preVLen === parseInt(preVLen, 10)) {
      $scope.viewLen++;
    }
    for (var i = 0; i < $scope.viewLen; i++) {
      if ($scope.ohcls[i][2] > $scope.maxY) {
        $scope.maxY = $scope.ohcls[i][2];
      }
      if ($scope.ohcls[i][3] < $scope.minY) {
        $scope.minY = $scope.ohcls[i][3];
      }
    }

    var x = $scope.defaultXOffset;
    for (var i = 0; i < $scope.viewLen; i++) {
      var y1 = getY($scope.ohcls[i][2]),
          y2 = getY($scope.ohcls[i][3]);
      $scope.ohcls[i].d = "M" + x + ',' + y1 + " L" + x + ',' + y2;
      x += $scope.xInterval;
    }
  });

  function getY(value) {
    return $scope.containerHeight * (value - $scope.minY)/($scope.maxY - $scope.minY);
  }

  $scope.$watch('startXIndex', function() {
    $scope.minY = Number.MAX_VALUE;
    $scope.maxY = 0;
    for (var i = 0; i < $scope.viewLen; i++) {
      if ($scope.ohcls[i + $scope.startXIndex][2] > $scope.maxY) {
        $scope.maxY = $scope.ohcls[i + $scope.startXIndex][2];
      }
      if ($scope.ohcls[i + $scope.startXIndex][3] < $scope.minY) {
        $scope.minY = $scope.ohcls[i + $scope.startXIndex][3];
      }
    }

    var x = $scope.defaultXOffset + $scope.startXIndex * $scope.xInterval;
    for (var i = 0; i < $scope.viewLen; i++) {
      var y1 = getY($scope.ohcls[i + $scope.startXIndex][2]),
          y2 = getY($scope.ohcls[i + $scope.startXIndex][3]);
      $scope.ohcls[i + $scope.startXIndex].d = "M" + x + ',' + y1 + " L" + x + ',' + y2;
      x += $scope.xInterval;
    }
  });

        var pieData = [113,100,50,28,27];
        var sectorAngleArr = [];
        var arcs = [];
        var total = 0;
        var startAngle = 0;
        var endAngle = 0;
        var x1,x2,y1,y2 = 0;
        var colors = ["#468966","#FFF0A5","#FFB03B","#B64926","#8E2800"];

        for(var k=0; k < pieData.length; k++){
            total += pieData[k];
        }
        for(var i=0; i < pieData.length; i++){
            var angle = Math.ceil(360 * pieData[i]/total);
            sectorAngleArr.push(angle);
        }
        for(var i=0; i <sectorAngleArr.length; i++){
            startAngle = endAngle;
            endAngle = startAngle + sectorAngleArr[i];

            x1 = parseInt(200 + 180*Math.cos(Math.PI*startAngle/180));
            y1 = parseInt(200 + 180*Math.sin(Math.PI*startAngle/180));

            x2 = parseInt(200 + 180*Math.cos(Math.PI*endAngle/180));
            y2 = parseInt(200 + 180*Math.sin(Math.PI*endAngle/180));                

            arcs.push({d:"M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z",
                       c: colors[i]}); //1 means clockwise
        }
        $scope.arcs = arcs;     
});

angular.module('app').directive("xscroll", function () {
    return function(scope, element, attrs) {
        angular.element('.chart-container').bind("scroll", function() {
          var index =  Math.ceil((angular.element('.ohclbars').width() - angular.element('.chart-container').width() - 30 - this.scrollLeft)/10);
          if (index > 0) {
            var scope = angular.element(this).scope();
            scope.$apply(function() {
              scope.startXIndex = index;
            });
          }
        });
    };
});

angular.module('app').filter('viewfilter', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, start + end);
  };
});
