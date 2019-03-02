require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

const token = process.env.token;
const key = process.env.key;

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

new Promise((resolve, reject) => {
  request({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(argv.a)}.json?access_token=${token}`,
    json: true
  }, (error, {body, statusCode}) => {
    // if there is an error, or no connection reject the promise.
    if(error) {
      reject();
  
    // in case the status code is 404, (in case someone submits an empty query) or if there are no results for the query.
    } else if(statusCode === 404 || body.features.length === 0) {
      console.log('Could not find location in database');
    
    // otherwise move on and do the rest
    } else {
      console.log(`Longitude: ${body.features[0].geometry.coordinates[0]}`);
      console.log(`Latitude: ${body.features[0].geometry.coordinates[1]}`);
      
      const longitude = body.features[0].geometry.coordinates[0];
      const latitude = body.features[0].geometry.coordinates[1];

      // resolve the promise and pass the data.
      resolve({"longitude": longitude, "latitude": latitude});  
    }
  })
}).then(({longitude, latitude}) => {
  // once the promise resolves, make request to the weather API.
  request({
    url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
    json: true
  }, (error, {body}) => {
    // if there is an error, or no connection.
    if(error) {
      console.log('Unable to connect to weather service');
    // if there are no results for the location.
    } else if(body.code === 400) {
      console.log(body.error);
    } else {
      console.log(`The temperature is currently ${body.currently.temperature}, chances of rain are ${body.currently.precipProbability}%.`);
    }
  })
}).catch(() => {
  console.log('Unable to connect to the API. Please check your connection.');
});