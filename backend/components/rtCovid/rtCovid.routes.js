var instance = null;
var express = require('express');
var router = express.Router();
var getRTCovidDataController = require('./rtCovid.controller');

class RTCovidRoutes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('/data', getRTCovidDataController);
        return router;
    }
}
module.exports = new RTCovidRoutes();