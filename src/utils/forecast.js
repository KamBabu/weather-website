const request = require('request')

const forecast = (lat, long, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=17defdc33772a726de1d9a78a7d36193&query=' + lat + ',' + long + '&units=f'   
    
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            cb('unable to connect to wether service', undefined)
        } else if (body.error) {
            cb('Unable to find location', undefined)
        } else {
            cb(undefined, body.current.weather_descriptions[0] + ' it is currently ' + body.current.temperature + ' degrees out and it feels like ' + body.current.feelslike )
        }
    })
}

module.exports = forecast