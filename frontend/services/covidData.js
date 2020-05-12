export async function getCovidStatesData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/states')
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidCountryData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/country')
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidUpdationDate() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/updationDate')
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getNewCasesData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/newcases')
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}

export async function getCovidDistrictData() {
    return new Promise((resolve, reject) => {
        fetch('/api/rtcovid/district')
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}