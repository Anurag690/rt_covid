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
            console.log(process.env.AUTH_TOKEN)
            if(req.headers.authorization != "Bearer 12tFt61L33aZ0qPEWU3lMRYKuUJye69T27wISkjWfB97I8JfUU1ritRipl0Jtvi3XB1SA7LKGUNpf61tnsNjug") {
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