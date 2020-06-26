const express = require('express')
const Url = require('./db/models/shortUrl')
require('./db/mongoose')

const app = express()

const port = process.env.PORT

app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const Urls = await Url.find()
    res.render('index', {Urls})
})

app.post('/shortUrls', async (req, res) => {
    try{
        await Url.create({fullUrl: req.body.fullUrl})
        res.redirect('/')
    }catch(e){
        console.log(e)
    }
})

app.get('/:shortUrl', async (req, res) => {
    try{
        const shortUrl = await Url.findOne({shortUrl: req.params.shortUrl})
        if(!shortUrl){
            return res.sendStatus(404)
        }
        shortUrl.clicks++
        await shortUrl.save()
        res.redirect(shortUrl.fullUrl)
    }catch(e){
        console.log(e)
        res.render('/')
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})