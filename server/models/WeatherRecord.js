const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true }, 
  startDate: { type: Date, required: true },   
  endDate: { type: Date, required: true },    
  temperature: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now },  
});

const WeatherRecord = mongoose.model('WeatherRecord', weatherSchema);

module.exports = WeatherRecord;
