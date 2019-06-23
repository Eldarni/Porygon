
//------------------------------------------------------------------------------

//get the config
global.config = require('./config.json');

//
const moment  = require('moment');
const request = require("request");
const sqlite3 = require('sqlite3');

//
const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
const requestDate    = moment().format(dateTimeFormat);

//
const database = new sqlite3.Database('porygon.db');

//
const weather = require('./weather.js');

//
const weatherRequestStatement  = database.prepare('INSERT INTO weatherRequest (wr_requestDate, wr_location, wr_response) VALUES (?, ?, ?)');
const weatherForecastStatement = database.prepare('INSERT INTO weatherForecast (wf_requestDate, wf_forecastDate, wf_location, wf_weatherType, wf_temperature, wf_rainChance) VALUES (?, ?, ?, ?, ?, ?)');

//------------------------------------------------------------------------------

//
database.each('SELECT wl_location FROM weatherLocation', function(error, result) {

	//
	request.get('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + result['wl_location'] + '?apikey=' + global.config['weather-api-token'] + '&details=true&metric=true', (error, response, body) => {

	    //store the response incase we want to reparse it
	    weatherRequestStatement.run(requestDate, result['wl_location'], body);

	    //
	    let weatherResponse = JSON.parse(body);

	    //
	    for (let i = 0; i < weatherResponse.length; i++) {

	        //
	        let weatherConditions = weatherResponse[i];

	        //
	        let forecastDate         = moment(weatherConditions.DateTime).format(dateTimeFormat);
	        let forecastConditions   = weatherConditions.IconPhrase;
	        let forecastTemperature  = weatherConditions.RealFeelTemperature.Value;
	        let forecastRainChance   = weatherConditions.PrecipitationProbability;
	        let forecastWindSpeed    = weatherConditions.Wind.Speed.Value;
	        let forecastGustSpeed    = weatherConditions.WindGust.Speed.Value;

	        //work out the "conditions" for pokemon go's weather system
	        let forecastWeatherType = weather(forecastConditions, forecastWindSpeed, forecastGustSpeed).dominant;

	        //
	        weatherForecastStatement.run(requestDate, forecastDate, result['wl_location'], forecastWeatherType, forecastTemperature, forecastRainChance);
	    }

	    //
	    weatherRequestStatement.finalize();
	    weatherForecastStatement.finalize();

	});

});

//------------------------------------------------------------------------------
