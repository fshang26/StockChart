var fs = require('fs'),
    path = require('path'),
    YQL = require('yqlp');

function writeHistoricalData() {
  var dataOut = [], 
      fpSrc = path.join(__dirname, '../data/dji_d_2014-1896.csv'),
      fpDes = path.join(__dirname, '../data/dji.json');

  fs.readFile(fpSrc, function(err, data) {
    var lineArray = data.toString().split('\n');
    lineArray.shift();

    // Date,Open,High,Low,Close,Volume
    for(var i = lineArray.length - 1; i >= 0; i--) {
      var array = [],
          element = lineArray[i].split(',');
      if (element[0].search('-') !== -1) {
        element[0] = parseFloat(element[0].substr(5, 2)) + '/' + parseFloat(element[0].substr(8, 2)) + '/' + element[0].substr(0, 4);
      }
      array.push(element[0]);
      array.push(parseFloat(element[1])); 
      array.push(parseFloat(element[2])); 
      array.push(parseFloat(element[3])); 
      array.push(parseFloat(element[4])); 
      array.push(parseFloat(element[5])); 
      dataOut.push(array);
    }
    var output = JSON.stringify(dataOut).replace(/\],\[/g, '\u0020\],[\n')
                                        .replace(/\[\[/g, '\[\[\n')
                                        .replace(/\]\]/g, '\n\]\]');
    fs.writeFile(fpDes, output, function (err,data) {
      if (err) {
        return console.log(err);
      }
    }); 
  });
}

function readHistoricalData() {
  var fp = path.join(__dirname, '../data/dji.json')
  fs.readFile(fp, function(err, data) {
    var object = JSON.parse(data.toString());
  });
}

function getLatestQuotesFromYahoo() {
  var dataOut = [],
      fpDes = path.join(__dirname, '../data/djinew.json');

  YQL.exec("select * from xml where url='http://chartapi.finance.yahoo.com/instrument/1.0/%5Edji/chartdata;type=quote;range=2y'", function(err, d) {
    var data = d.query.results['data-series'].series.p;
    
    for (var i = data.length - 1; i >= 0; i--) {
      var array = [],
          date;

      // Date,Open,High,Low,Close,Volume
      date = parseFloat(data[i].ref.substr(4, 2)) + '/' + parseFloat(data[i].ref.substr(6, 2)) + '/' + data[i].ref.substr(0, 4);
      array.push(date);
      array.push(Math.round(parseFloat(data[i].v[3])*100)/100);
      array.push(Math.round(parseFloat(data[i].v[1])*100)/100);
      array.push(Math.round(parseFloat(data[i].v[2])*100)/100);
      array.push(Math.round(parseFloat(data[i].v[0])*100)/100);
      array.push(parseFloat(data[i].v[4])); 
      dataOut.push(array);
    }
    
    var output = JSON.stringify(dataOut).replace(/\],\[/g, '\u0020\],[\n')
                                        .replace(/\[\[/g, '\[\[\n')
                                        .replace(/\]\]/g, '\n\]\]');
    fs.writeFile(fpDes, output, function (err,data) {
      if (err) {
        return console.log(err);
      }
    }); 
  });
  /*
  $.getJSON(yql, function (data) {
      $.each(data.query.results, function (i, d) {
          $.each(d.series.p, function (i, field) {
              var array = [], 
                  date = field.ref.substr(4, 2) + parseFloat(field.ref.substr(6, 2)) + parseFloat(field.ref.substr(0, 4));

              // Date,Open,High,Low,Close,Volume
              array.push(date);
              array.push(parseFloat(field.v[3]).toFixed(2)); 
              array.push(parseFloat(field.v[1]).toFixed(2)); 
              array.push(parseFloat(field.v[2]).toFixed(2)); 
              array.push(parseFloat(field.v[0]).toFixed(2)); 
              array.push(parseFloat(field.v[4])); 
              dataOut.push(array);
          });
      });

      var output = JSON.stringify(dataOut).replace(/\],\[/g, '\u0020\],[\n')
                                       .replace(/\[\[/g, '\[\[\n')
                                       .replace(/\]\]/g, '\n\]\]');
      fs.writeFile(fpDes, output, function (err,data) {
        if (err) {
          return console.log(err);
        }
      }); 
  });
  */
}


exports.writeHistoricalData = writeHistoricalData;
