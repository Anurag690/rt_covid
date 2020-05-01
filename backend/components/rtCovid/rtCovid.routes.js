var instance = null;
var express = require('express');
var router = express.Router();
var {Ctrl_RTCovidCountryData, Ctrl_RTCovidStatesData} = require('./rtCovid.controller');

class RTCovidRoutes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('/states', Ctrl_RTCovidStatesData);
        router.get('/country', Ctrl_RTCovidCountryData);
        return router;
    }
}
module.exports = new RTCovidRoutes();