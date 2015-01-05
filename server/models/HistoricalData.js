var fs = require('fs'),
  path = require('path');

function writeHistoricalData() {
  var dataOut = [], 
    fpSrc = path.join(__dirname, '../data/dji_04052012.csv'),
  fpDes = path.join(__dirname, '../data/dji.json');

  fs.readFile(fpSrc, function(err, data) {
    var lineArray = data.toString().split('\r\n');
    lineArray.shift();

    // Date,Open,High,Low,Close,Volume
    for(var i = 0; i < lineArray.length; i++) {
      var array = [],
          element = lineArray[i].split(',');
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

//exports.writeHistoricalData = writeHistoricalData;
