var fs = require('fs'),
	path = require('path');

function readCSVFile() {
	fp = path.join(__dirname, '../data/dji_04052012.csv')
	fs.readFile(fp, function(err, data) {
		var lineArray = data.toString().split('\n');
		console.log(lineArray.length);
	});
}

exports.readCSVFile = readCSVFile;