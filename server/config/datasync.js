var histdataModel = require('../models/HistoricalData');

module.exports = function() {
  histdataModel.readCSVFile();
  histdataModel.writeHistoricalData();
};
