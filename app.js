require('dotenv').config();
const request = require('request');

const key = process.env.key;

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=9744%20Westminster%20Ave&key=${key}`,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(response, undefined, 2));
})