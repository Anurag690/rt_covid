var instance = null;
var express = require('express');
var router = express.Router();
var path = require('path');

class Routes{
    constructor() {
        if(instance) {
            return router;
        }
        router.get('*', function(req, res, next) {
            switch(req.path) {
                case '/':
                case '/rtcovid':
                    //call middleware
                    break;
            }
            next();
        });
        router.get('/', function(req, res) {
            res.redirect("/rtcovid");
        })
        router.get('/rtcovid', function(req, res) {
            res.render('index');
        });
        return router;
    }
}
module.exports = new Routes(); 