require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

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

const key = process.env.key;

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.a)}&key=${key}`,
  json: true
}, (error, response, body) => {
  console.log(JSON.stringify(response, undefined, 2));
})