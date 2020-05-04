var instance = null;
var express = require('express');
var router = express.Router();
var {
    Ctrl_RTCovidCountryData, 
    Ctrl_RTCovidStatesData, 
    Ctrl_RTCovidDataFile, 
    Ctrl_RTCovidDataUpdationDate
} = require('./rtCovid.controller');

class RTCovidRoutes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('/states', Ctrl_RTCovidStatesData);
        router.get('/country', Ctrl_RTCovidCountryData);
        router.post('/rt_data', Ctrl_RTCovidDataFile);
        router.get('/updationDate', Ctrl_RTCovidDataUpdationDate);
        return router;
    }
}
module.exports = new RTCovidRoutes();