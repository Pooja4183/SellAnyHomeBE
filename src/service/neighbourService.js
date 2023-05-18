const propertyRouter = require('express').Router(),
  propertyDB = require('../model/property');
  const axios = require('axios');
  const haversine = require('haversine');
  


/**
 * Returns list of propertys
 */
propertyRouter.get('/', async (req, res, next) => {
    
  console.log("Fetching...", req.query)
  const { latitude, longitude } = req.query;

  // Use a geocoding API to get the user's city and country
  const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=<YOUR_API_KEY>`;
  const { data } = await axios.get(geocodingApiUrl);
  const { city, country } = data.results[0].address_components;

  // Use a database of cities to find nearby cities
  const cities = await City.find({
    country: country.long_name,
    name: { $ne: city.long_name }
  });

  // Calculate the distance between each city and the user's current location
  const nearbyCities = cities.filter(city => {
    const cityCoordinates = {
      latitude: city.latitude,
      longitude: city.longitude
    };
    const userCoordinates = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };
    const distance = haversine(cityCoordinates, userCoordinates);
    return distance <= 100; // 100km radius
  });

  res.json(nearbyCities);
});

module.exports = propertyRouter;
