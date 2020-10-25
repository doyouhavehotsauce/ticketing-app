const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
//const mongo = require('mongodb')

const users=[]





app.set('view-engine', 'ejs')


//tells application we want to access the forms inside our methods
app.use(express.urlencoded({extended: false}))
//links style sheet to index
app.use(express.static(__dirname + '/'));


app.get('/', (req, res) => {
    res.render('index.ejs')
})





app.post('/login', async (req, res) => {
    const user = users.find(user => user.email = req.body.email)
    if(user === null){
        return res.status(400).send('Can not find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('success')
        } else{
            res.send('not allowed')
        }
    }catch{
        res.status(500).send()
    }
})





app.get('/register', (req, res) => {
    res.render('register.ejs')
})


//registers a new user
app.post('/_register', async (req, res) => {
    try{
        const hashedPW = await bcrypt.hash(req.body.password, 10)
        users.push({
            //id would be auto generated in db
            id: Date.now().toString(),
            first: req.body.first,
            last: req.body.last,
            email: req.body.email,
            password: hashedPW
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})



//route for main dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})




app.listen(3000)
