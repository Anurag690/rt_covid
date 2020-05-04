var csvToJson = require('csvtojson');
var path = require('path');
var async = require('async');

const FILE_NAME = "data_rt.csv"

function getRTCovidStatesData() {
    return new Promise(async (resolve, reject)=>{
        const csvFilePath = path.resolve('./'+FILE_NAME)
        const jsonArray = await csvToJson().fromFile(csvFilePath);
        var stateObject = {};
        async.forEachOfSeries(jsonArray, (item, key, callback)=>{
            var {state, date, ML, Low_90, High_90, Low_50, High_50} = item;
            if(stateObject[state]) {
                stateObject[state].push({
                    date,
                    RT: (+ML),
                    RT_90: [(+Low_90), (+High_90)],
                    RT_50: [(+Low_50), (+High_50)],
                    Low_90: (+Low_90),
                    High_90: (+High_90)
                });
                callback();
            } else {
                stateObject[state] = [];
                stateObject[state].push({
                    date,
                    RT: (+ML),
                    RT_90: [(+Low_90), (+High_90)],
                    RT_50: [(+Low_50), (+High_50)],
                    Low_90: (+Low_90),
                    High_90: (+High_90)
                });
                callback();
            }
        }, (error)=>{
            // console.log(stateObject);
            // resolve(stateObject);
            var newStateObject = {}
            async.forEachOfSeries(Object.keys(stateObject), (item, key, callback)=>{
                var colorBreakPoint = 1;
                
                var { min, max } = stateObject[item].reduce((result, dataPoint) => ({
                        min: (dataPoint.Low_90 < result.min || result.min === 0) ? dataPoint.Low_90 : result.min,
                        max: (dataPoint.High_90 > result.max || result.max === 0) ? dataPoint.High_90 : result.max,
                    }), { min: 0, max: 0 }
                );
                var colorBreakPointPercentage90 = `${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`;

                var { min, max } = stateObject[item].reduce((result, dataPoint) => ({
                        min: (dataPoint.RT < result.min || result.min === 0) ? dataPoint.RT : result.min,
                        max: (dataPoint.RT > result.max || result.max === 0) ? dataPoint.RT : result.max,
                    }), { min: 0, max: 0 }
                );
                var colorBreakPointPercentageML = `${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`;
                
                var newObject = Object.assign({}, {item: stateObject[item], colorBreakPointPercentage90, colorBreakPointPercentageML})
                newStateObject[item] = {}
                newStateObject[item] = newObject
                callback();
            }, err=>{
                resolve(newStateObject);
            })
        })
    })
}
function getRTCovidCountryData() {
    return new Promise(async (resolve, reject)=>{
        const csvFilePath = path.resolve('./'+FILE_NAME);
        const jsonArray = await csvToJson().fromFile(csvFilePath);
        var newArray = [];
        var stateObject = {};
        async.forEachOfSeries(jsonArray, (item, index, callback)=>{
            var {state, date, ML, Low_90, Low_50, High_50, High_90, state_ab} = item;
            if(state!=="India") {
                
                var colorBreakPoint = 1;
                var colorBreakPointPercentage90 = `${(1 - ((colorBreakPoint - Low_90) / (High_90 - Low_90))) * 100}%`;
                var colorBreakPointPercentage50 = `${(1 - ((colorBreakPoint - Low_50) / (High_50 - Low_50))) * 100}%`;

                if(stateObject[state]) {
                    stateObject[state] = {
                        state,
                        date,
                        RT: (+ML),
                        RT_90: [(+Low_90), (+High_90)],
                        RT_50: [(+Low_50), (+High_50)],
                        Low_90: (+Low_90),
                        High_90: (+High_90),
                        colorBreakPointPercentage50,
                        colorBreakPointPercentage90,
                        state_ab
                    };
                    callback();
                } else {
                    stateObject[state] = [];

                    stateObject[state] = {
                        state,
                        date,
                        RT: (+ML),
                        RT_90: [(+Low_90), (+High_90)],
                        RT_50: [(+Low_50), (+High_50)],
                        Low_90: (+Low_90),
                        High_90: (+High_90),
                        colorBreakPointPercentage50,
                        colorBreakPointPercentage90,
                        state_ab
                    };
                    callback();
                }
            } else {
                callback();
            }
        }, err=>{
            let resultArray = Object.values(stateObject);
            resultArray = resultArray.sort(function(a,b){return a.RT - b.RT})
            resolve(resultArray);
        })
    })
}
module.exports = {
    getRTCovidCountryData,
    getRTCovidStatesData
};