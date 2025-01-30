require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios'); 
const WeatherRecord = require('./models/WeatherRecord'); 
const app = express();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use(express.json());

app.post('/api/weather', async (req, res) => {
  const { location, startDate, endDate, temperature } = req.body;

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Start date must be earlier than end date' });
  }

  try {
    const newRecord = new WeatherRecord({
      location,
      startDate,
      endDate,
      temperature
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save weather data' });
  }
});

app.get('/api/weather', async (req, res) => {
  try {
    const records = await WeatherRecord.find(); 
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/weather/location/:location', async (req, res) => {
  const { location } = req.params;
  
  try {
    const records = await WeatherRecord.find({ location: new RegExp(location, 'i') }); 
    if (records.length === 0) {
      return res.status(404).json({ error: 'No records found for this location' });
    }
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data for the location' });
  }
});

app.put('/api/weather/:id', async (req, res) => {
  const { id } = req.params;
  const { location, startDate, endDate, temperature } = req.body;

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'Start date must be earlier than end date' });
  }

  try {
    const updatedRecord = await WeatherRecord.findByIdAndUpdate(
      id,
      { location, startDate, endDate, temperature },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: 'Weather record not found' });
    }

    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update weather data' });
  }
});

app.delete('/api/weather/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await WeatherRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: 'Weather record not found' });
    }

    res.status(200).json({ message: 'Weather record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete weather data' });
  }
});

app.get('/api/weather/forecast/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
      params: {
        key: process.env.WEATHER_API_KEY, 
        q: location,
        days: 5
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch 5-day weather forecast' });
  }
});

app.get('/', (req, res) => {
  res.send('Weather App is Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

