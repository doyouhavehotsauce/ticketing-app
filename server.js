


const express = require('express')
const app = express()

const indexRouter = require('./routes/index-routes.js')




app.set('view-engine', 'ejs')
app.set('views', __dirname + '/views')


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/ticketing-app", { useNewUrlParser: true })
//const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('connected to db'))


//tells application we want to access the forms inside our methods
app.use(express.urlencoded({extended: false}))
//links style sheet to index
app.use(express.static(__dirname + '/'));
app.use('/', indexRouter)





app.listen(process.env.PORT || 3000)
