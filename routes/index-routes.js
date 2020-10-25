const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')



router.get('/', (req, res) => {
    res.render('index.ejs')
})





router.post('/login', async (req, res) => {
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





router.get('/register', (req, res) => {
    res.render('register.ejs')
})


//registers a new user
router.post('/_register', async (req, res) => {
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
router.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
})



module.exports = router