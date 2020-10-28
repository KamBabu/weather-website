const request = require('request')

const geocode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FtOTliIiwiYSI6ImNrZ3B1M2JqejBhZ2cyemxxYnRtdmpycHIifQ.RcwHAAze5iiWrHHV0lwRiw&limit=1'
   
    request({url:url, json : true}, (error, response) =>{
         if (error) {
             cb('unable to connect to location service', undefined)
         } else if (response.body.features.length === 0) {
             cb('unable to find location. Try another search', undefined)
         } else {
            cb(undefined, {
                latitude: response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
         }
    })

}

module.exports = geocode