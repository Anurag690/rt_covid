var instance = null;
var express = require('express');
var router = express.Router();

var rtCovidRoutes = require('../components/rtCovid/rtCovid.routes');

class Routes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('*', function(req, res, next) {
            if(req.headers.authorization != process.env.AUTH_TOKEN) {
                res.send({
                    error: "Unauthorized Access!"
                });
            } else {
                switch(req.path) {
                    case '/':
                        break;
                }
                next();
            }
        });
        router.use('/rtcovid', rtCovidRoutes);
        return router;
    }
}
module.exports = new Routes();