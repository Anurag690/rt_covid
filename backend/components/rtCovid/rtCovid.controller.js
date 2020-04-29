var getRTCovidData =  require('./rtCovid.service');

async function Ctrl_RTCovidData(req, res) {
    try {
            const result = await getRTCovidData();
            res.send(result);
            // ctx.status = 200;
            // ctx.body = { error: null, status: 1, data: result };
    }
    catch (e) {
        res.send("Something went wrong!")
        // ctx.status = 500;
        // ctx.body = { error: { show_alert: true, message: 'Something went wrong!' }, status: 0, data: null };
    }
}
module.exports = Ctrl_RTCovidData;