var {getRTCovidStatesData, getRTCovidCountryData, getNewCasesData} =  require('./rtCovid.service');
var storage = require('node-persist');

async function Ctrl_RTCovidStatesData(req, res) {
    try {
            const result = await getRTCovidStatesData();
            res.send(result);
    }
    catch (e) {
        res.send("Something went wrong!")
    }
}

async function Ctrl_RTCovidCountryData(req, res) {
    try {
        const result = await getRTCovidCountryData();
        res.send(result);
    }
    catch (e) {
        res.send("Something went wrong!")
    }
}

async function Ctrl_RTCovidDataFile(req, res) {
    try {
        await storage.init();
        var date = req.query.date;
        var myDate;
        if(date) {
            myDate = new Date(date);
        } else {
            myDate = new Date();
        }
        await storage.setItem('updationDate', myDate);
        res.send("Upload Success");
    }
    catch (e) {
        console.log(e);
        res.send("Something went wrong!")
    }
}

async function Ctrl_RTCovidDataUpdationDate(req, res) {
    try {
        await storage.init();
        let updationDate = await storage.getItem('updationDate');
        updationDate = updationDate.split("T")[0]
        res.send({
            updationDate
        });
    }
    catch (e) {
        console.log(e);
        res.send("Something went wrong!")
    }
}

async function Ctrl_NewCasesData(req, res) {
    try {
        const result = await getNewCasesData();
        res.send(result);
    }catch(e) {
        console.log(e);
        res.send("Something went wrong!")
    }
}

module.exports = {
    Ctrl_RTCovidCountryData, Ctrl_RTCovidStatesData,
    Ctrl_RTCovidDataFile, Ctrl_RTCovidDataUpdationDate,
    Ctrl_NewCasesData
};