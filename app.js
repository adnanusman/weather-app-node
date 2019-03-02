require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

const token = process.env.token;

const argv = yargs
.options({
  a: {
    demand: true,
    description: '',
    alias: 'address',
    string: true  
  }
})
.help()
.alias('help', 'h')
.argv


request({
  url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(argv.a)}.json?access_token=${token}`,
  json: true
}, (error, response) => {
  console.log(`Longitude: ${response.body.features[0].geometry.coordinates[0]}`);
  console.log(`Latitude: ${response.body.features[0].geometry.coordinates[1]}`)  
})