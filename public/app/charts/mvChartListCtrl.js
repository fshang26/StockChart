angular.module('app').controller('mvChartListCtrl', function($scope, $http, $timeout) {
  $scope.minY = Number.MAX_VALUE;
  $scope.maxY = 0;
  $scope.viewLen = 0;
  $scope.defaultXOffset = 30;
  $scope.startXIndex = 0;
  $scope.ohcls = [];
  $scope.xruler = [];

  setXZoom(3);
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
      $scope.containerHeight = angular.element('.ohclbars').height();
      $scope.ohclsWidth = angular.element('.chart-container').width() - $scope.defaultXOffset;
      setViewLen();

      drawOHLCBars();
    });
  });
    
  function getY(value) {
    return $scope.containerHeight * (value - $scope.minY)/($scope.maxY - $scope.minY);
  }

  $scope.$watch('startXIndex', function() {
    $scope.minY = Number.MAX_VALUE;
    $scope.maxY = 0;
    drawOHLCBars();
  });

  function drawOHLCBars() {
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
        if(h === l) {
          $scope.ohcls[i + $scope.startXIndex].d = 'M' + x + ',' + (h + 0.003) + ' L' + x + ',' + (h - 0.03) + 
                                                   ' M' + (x - 0.003) + ',' + h + ' L' + (x + 0.003) + ',' + h;

        } else {
          $scope.ohcls[i + $scope.startXIndex].d = 'M' + x + ',' + h + ' L' + x + ',' + l + 
                                                   ' M' + x + ',' + o + ' L' + (x + barWid) + ',' + o +
                                                   ' M' + (x - barWid) + ',' + c + ' L' + x + ',' + c;
        }
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
  function setXZoom(level) {
    $scope.xZoom = level;
    $scope.xInterval = Math.pow(2, level);
  }

  function setViewLen() {
      var preVLen = $scope.ohclsWidth/$scope.xInterval;
      $scope.viewLen = Math.ceil(preVLen)
      if (preVLen === parseInt(preVLen, 10)) {
        $scope.viewLen++;
      }

      // TODO double check border cases
      if ($scope.viewLen > $scope.ohcls.length) {
        $scope.viewLen = $scope.ohcls.length;
      }
  }
  $scope.xZooming = function(event, delta, deltaX, deltaY){
    if (deltaY > 0) {
      if (!isZooming) {
        isZooming = true;
        setXZoom($scope.xZoom - 1);
        setViewLen();
        drawOHLCBars();
        $timeout(function() {
          isZooming = false;
        }, 1500);
      }
    }
  };

});

angular.module('app').directive("xscroll", function () {
    return function(scope, element, attrs) {
        angular.element('.chart-container').bind("scroll", function() {
          var index =  Math.ceil((angular.element('.ohclbars').width() - angular.element('.chart-container').width() - 30 - this.scrollLeft)/10),
              scope = angular.element(this).scope();
          scope.$apply(function() {
            scope.startXIndex = index < 0 ? 0: index;
          });
        });
    };
});

angular.module('app').filter('viewfilter', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, start + end);
  };
});
