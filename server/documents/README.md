# Read me
## DJI historical data source
  http://www.reakkt.com/2012/11/downloading-stooq-market-data-in-bulk.html(http://stooq.com/db/h/)
  http://www.historicaldatadirectory.com/2013/05/dow-jones-djia-historical-data-download.html (http://stooq.com/q/?s=^dji)
  https://www.quandl.com/YAHOO/INDEX_GSPC-S-P-500-Index

6 ways to download free intraday and tick data for the U.S. stock marke(http://www.quantshare.com/sa-426-6-ways-to-download-free-intraday-and-tick-data-for-the-us-stock-market)

## [SVG css coordinate system setup]

http://monospaced.github.io/angular-mousewheel/

TODO
1. move http.get to a resource service - see angular-phonecat tutorial

Horizontal zoom define
Level:   6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6 (defaul 3 or 4)
Bar interval: power(2, level)
Bar width: 1/3 interval

## [Online Markdown(readme.md) Editor]

## Draw Pie chart
  (html) path.chart__pie(ng-repeat='arc in arcs' ng-attr-fill='{{arc.c}}' ng-attr-d='{{arc.d}}')
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
      arcs.push({d:"M200,200  L" + x1 + "," + y1 + "  A180,180 0 0,1 " + x2 + "," + y2 + " z", c: colors[i]});
  }
  $scope.arcs = arcs;     

## [Get Your Hands Dirty Refactoring in AngularJS]

[Online Markdown(readme.md) Editor]:http://dillinger.io/
[SVG css coordinate system setup]:http://css-tricks.com/svg-animation-on-css-transforms/
[Get Your Hands Dirty Refactoring in AngularJS]:https://blog.safaribooksonline.com/2014/04/08/refactoring-angularjs-get-hands-filthy/
