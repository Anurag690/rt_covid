export async function getCovidData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8080/api/rtcovid/data')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            resolve(data)
        })
        .catch(err=>{reject(err)})
    })
}