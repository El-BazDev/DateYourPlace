const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

router.get('/geocode', async (req, res, next) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/reverse', {
      params: {
        lat: lat,
        lon: lon,
        apiKey: GEOAPIFY_API_KEY
      }
    });

    const feature = response.data.features[0];
    const properties = feature.properties;

    const locationInfo = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      country: properties.country,
      state: properties.state,
      county: properties.county,
      city: properties.city,
      postcode: properties.postcode,
      suburb: properties.suburb,
      formatted: properties.formatted,
      timezone: properties.timezone ? properties.timezone.name : null
    };

    res.json(locationInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;