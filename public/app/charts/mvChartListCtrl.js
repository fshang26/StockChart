angular.module('app').controller('mvChartListCtrl', function($scope, $http, $timeout) {
  $scope.minY = Number.MAX_VALUE;
  $scope.maxY = 0;
  $scope.viewLen = 0;
  $scope.defaultXOffset = 30;
  $scope.startXIndex = 0;
  $scope.ohcls = [];
  $scope.xruler = [];

  var isZooming = false;
  var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(
            'select * from xml where url="http://chartapi.finance.yahoo.com/instrument/1.0/%5Edji/chartdata;type=quote;range=1m"') +
            '&format=json';

  $http.get(yql).success(function(yahooData) {
    var yd = [];
    angular.forEach(yahooData.query.results['data-series'].series.p, function(d) {
      if (d.ref.substr(0, 4) === '2015') {
        var array = [],
            date;
        date = parseFloat(d.ref.substr(4, 2)) + '/' + parseFloat(d.ref.substr(6, 2)) + '/' + d.ref.substr(0, 4);
        array.push(date);
        array.push(Math.round(parseFloat(d.v[3])*100)/100);
        array.push(Math.round(parseFloat(d.v[1])*100)/100);
        array.push(Math.round(parseFloat(d.v[2])*100)/100);
        array.push(Math.round(parseFloat(d.v[0])*100)/100);
        array.push(parseFloat(d.v[4])); 
        yd.push(array);
      }
    });

    $http.get('app/data/dji_d_2014-1896.json').success(function(data) {
      angular.forEach(yd, function(d) {
        data.unshift(d);
      });
      $scope.ohcls = data;
      $scope.containerHeight = angular.element('.chart-container').height();
      $scope.ohclsWidth = angular.element('.chart-container').width() - $scope.defaultXOffset;
      $scope.setXZoom(3);
      $scope.drawOHLCBars();
    });
  });
    
  function getY(value) {
    return $scope.containerHeight * (value - $scope.minY)/($scope.maxY - $scope.minY);
  }

  $scope.$watch('startXIndex', function() {
    $scope.drawOHLCBars();
  });

  $scope.drawOHLCBars = function() {
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
    var barWid = $scope.xInterval/3;
    var x = $scope.defaultXOffset + $scope.startXIndex * $scope.xInterval;
    for (var i = 0; i < $scope.viewLen; i++) {
        var h = getY($scope.ohcls[i + $scope.startXIndex][2]),
            l = getY($scope.ohcls[i + $scope.startXIndex][3]),
            o = getY($scope.ohcls[i + $scope.startXIndex][1]),
            c = getY($scope.ohcls[i + $scope.startXIndex][4]);
        $scope.ohcls[i + $scope.startXIndex].d = 'M' + x + ',' + h + ' L' + x + ',' + l + 
                                                 ' M' + x + ',' + o + ' L' + (x + barWid) + ',' + o +
                                                 ' M' + (x - barWid) + ',' + c + ' L' + x + ',' + c;
        x += $scope.xInterval;
    }
  }

  // Y-axis
  $scope.$watch('maxY', function() {
    updateYRuler();
  });
  $scope.$watch('minY', function() {
    updateYRuler();
  });
  function updateYRuler() {
    $scope.xruler = [];
    var interval = ($scope.maxY - $scope.minY) / 10;
    for (var i = 0; i < 10; i++) {
        $scope.xruler.push(($scope.maxY - i * interval).toFixed(2));
    }
  }

  // zoom
  $scope.setXZoom = function(level) {
    $scope.xZoom = level;
    $scope.xInterval = Math.pow(2, level);

    var preVLen = $scope.ohclsWidth/$scope.xInterval;
    $scope.viewLen = Math.ceil(preVLen)
    if (preVLen === parseInt(preVLen, 10)) {
      $scope.viewLen++;
    }

    // TODO double check border cases
    if ($scope.viewLen > $scope.ohcls.length) {
      $scope.viewLen = $scope.ohcls.length;
      $scope.xInterval = $scope.ohclsWidth/($scope.viewLen - 1);
    }
    angular.element('.chart-content').width($scope.xInterval * ($scope.ohcls.length - 1) + $scope.defaultXOffset);
  }

  $scope.xZooming = function(event, delta, deltaX, deltaY){
    if (deltaY !== 0 && deltaX === 0) {
      if (deltaY < 0 && $scope.xZoom >= 6) {
        return;
      }
      if (deltaY > 0 && $scope.viewLen === $scope.ohcls.length) {
        return;
      }
      if (!isZooming) {
        isZooming = true;
        $scope.setXZoom(deltaY > 0 ? $scope.xZoom - 1 : $scope.xZoom + 1);
        $scope.drawOHLCBars();
        $timeout(function() {
          isZooming = false;
        }, 1500); // TODO variable?
      }
    }
  };

  $scope.drawCrosshair = function(event) {
    var y = event.target.clientHeight + event.target.offsetTop - event.clientY; 
    $scope.crosshair = 'M' + 0 + ',' + y + ' L' + ($scope.ohclsWidth + $scope.defaultXOffset) + ',' + y;
  }

});

angular.module('app').directive("xscroll", function () {
    return function(scope, element, attrs) {
        angular.element('.chart-container').bind("scroll", function() {
          var scope = angular.element(this).scope(),
              index =  Math.ceil((angular.element('.chart-content').width() - angular.element('.chart-container').width() - this.scrollLeft)/scope.xInterval);
          scope.$apply(function() {
            scope.startXIndex = index < 0 ? 0: index;
          });
        });
    };
});

angular.module('app').directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return { 'h': w.height(), 'w': w.width() };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.ohclsWidth = angular.element('.chart-container').width() - scope.defaultXOffset;
            scope.containerHeight = angular.element('.chart-container').height();
            scope.setXZoom(scope.xZoom);
            scope.drawOHLCBars();
        }, true);
        w.bind('resize', function () {
            scope.$apply();
        });
    }
})

angular.module('app').filter('viewfilter', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, start + end);
  };
});
