var csvToJson = require('csvtojson');
var path = require('path');
var async = require('async');
var storage = require('node-persist');

const FILE_NAME = "data_rt.csv"

function getRTCovidStatesData() {
    return new Promise(async (resolve, reject)=>{
        const csvFilePath = path.resolve('./'+FILE_NAME)
        const jsonArray = await csvToJson().fromFile(csvFilePath);
        var stateObject = {};
        async.forEachOfSeries(jsonArray, (item, key, callback)=>{
            var {state, date, ML, Low_90, High_90, Low_50, High_50, state_ab} = item;
            if(state_ab!="HP" && state_ab!="TR" && state_ab!="AS" && state_ab!="CT" && state_ab!="UT" && state_ab!="PY") {
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
            } else{
                callback();
            }
        }, (error)=>{
            var newStateObject = {}
            async.forEachOfSeries(Object.keys(stateObject), (item, key, callback)=>{
                var colorBreakPoint = 1;
                
                var { min, max } = stateObject[item].reduce((result, dataPoint) => ({
                        min: (dataPoint.Low_90 < result.min || result.min === 0) ? dataPoint.Low_90 : result.min,
                        max: (dataPoint.High_90 > result.max || result.max === 0) ? dataPoint.High_90 : result.max,
                    }), { min: 0, max: 0 }
                );
                var colorBreakPointPercentage90 = (max-min)?`${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`:min<1?0:100;

                var { min, max } = stateObject[item].reduce((result, dataPoint) => ({
                        min: (dataPoint.RT < result.min || result.min === 0) ? dataPoint.RT : result.min,
                        max: (dataPoint.RT > result.max || result.max === 0) ? dataPoint.RT : result.max,
                    }), { min: 0, max: 0 }
                );
                var colorBreakPointPercentageML = (max-min)?`${(1 - ((colorBreakPoint - min) / (max - min))) * 100}%`:min<1?0:100;
                
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
            if(state_ab!="HP" && state_ab!="TR" && state_ab!="AS" && state_ab!="CT" && state_ab!="UT" && state_ab!="PY"){
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
            }else{
                callback();
            }
            
        }, err=>{
            let resultArray = Object.values(stateObject);
            resultArray = resultArray.sort(function(a,b){return a.RT - b.RT})
            resolve(resultArray);
        })
    })
}
function getNewCasesData() {
    return new Promise(async(resolve, reject)=>{
        try{
            await storage.init();
            let updationDate = await storage.getItem('updationDate');
            updationDate = updationDate.split("T")[0].substr(5,10).replace(/-/g,"")
            const csvFilePath = path.resolve('./newcases/new_cases_'+updationDate+".csv")
            const jsonArray = await csvToJson().fromFile(csvFilePath);
            var stateObject = {};
            async.forEachOfSeries(jsonArray, (item, key, callback)=>{
                let {date, new_cases, smoothed_9d} = item;
                if(stateObject[item.state]) {
                    stateObject[item.state].push({
                        date,
                        new_cases: (+new_cases),
                        smoothed_9d: (+smoothed_9d)
                    });
                } else {
                    stateObject[item.state] = [];
                }
                callback();
            }, (err)=>{
                resolve(stateObject)
            })
        }catch(err) {
            reject(err);
        }
    })
}
module.exports = {
    getRTCovidCountryData,
    getRTCovidStatesData,
    getNewCasesData
};