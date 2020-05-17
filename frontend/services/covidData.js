const headers = {"Content-Type": "application/json"};
headers["Authorization"] = AUTH_TOKEN || 'auth';

export async function getCovidStatesData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/states', {headers})
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidCountryData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/country', {headers})
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidUpdationDate() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/updationDate', {headers})
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getNewCasesData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/newcases', {headers})
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidDistrictData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/district', {headers})
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}