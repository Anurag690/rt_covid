var {getRTCovidStatesData, getRTCovidCountryData} =  require('./rtCovid.service');

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

module.exports = {
    Ctrl_RTCovidCountryData, Ctrl_RTCovidStatesData
};