const express = require("express");
const axios = require("axios");
const Location = require("./models/Location");

const router = express.Router();

const API_KEY = process.env.API_KEY;

router.get("/weather", async (req, res) => {
  const { location } = req.query;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: { q: location, appid: API_KEY, units: "metric" },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.post("/locations", async (req, res) => {
  const { location, dateRange } = req.body;

  try {
    const newLocation = new Location({ location, dateRange });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ error: "Failed to save location" });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

router.put("/locations/:id", async (req, res) => {
  const { id } = req.params;
  const { location, dateRange } = req.body;

  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { location, dateRange },
      { new: true }
    );
    res.json(updatedLocation);
  } catch (err) {
    res.status(500).json({ error: "Failed to update location" });
  }
});

router.delete("/locations/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Location.findByIdAndDelete(id);
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete location" });
  }
});

module.exports = router;
