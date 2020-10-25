const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/3000')

mongoose.connection.once('open', () => {
    console.log('connection to db has been made');
}).on('err', () => {
    console.log('failed to connect to db -- error: ', error)
})