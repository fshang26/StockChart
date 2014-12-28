var fs = require('fs'),
	path = require('path');

function readCSVFile() {
	var fp = path.join(__dirname, '../data/dji_04052012.csv')
	fs.readFile(fp, function(err, data) {
		var lineArray = data.toString().split('\n');
		console.log(lineArray.length);
	});
}

function writeHistoricalData() {
	var fp = path.join(__dirname, '../data/dji.json')
	var data = [];
	data.push([1, 2, 3, 4, 5]);
	data.push([6, 7, 8, 9, 10]);
	console.log('data: ' + data);

	var str = '[[1,2,3,4,5],[6,7,8,9,10]]';
	var obj = JSON.parse(str);
	console.log('obj: ' + obj.length);
	//fs.writeFile(fp, JSON.stringify({ [a:1, b:2, c:3] }, null, 4), function (err,data) {
  var output = JSON.stringify(data).replace(/\],\[/g, '\],\n\u0020\u0020\[')
	fs.writeFile(fp, output, function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	});	
}

exports.readCSVFile = readCSVFile;
exports.writeHistoricalData = writeHistoricalData;