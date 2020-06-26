const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

const Url = mongoose.model('Url', shortUrlSchema)

module.exports = Url