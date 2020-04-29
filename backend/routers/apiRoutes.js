var instance = null;
var express = require('express');
var router = express.Router();
var path = require('path');

var rtCovidRoutes = require('../components/rtCovid/rtCovid.routes');

class Routes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('*', function(req, res, next) {
            switch(req.path) {
                case '/':
                    break;
            }
            next();
        });
        router.use('/rtcovid', rtCovidRoutes);
        return router;
    }
}
module.exports = new Routes(); 