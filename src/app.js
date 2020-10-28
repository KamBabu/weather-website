const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// to Run nodemon src/app.js -e js,hbs

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()
app.set('view engine', 'hbs')


app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Babu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Babu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Babu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You much provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Babu',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Babu',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})