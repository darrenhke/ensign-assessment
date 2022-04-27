const express = require('express')
const app = express()
const cors = require('cors')
const NodeCache = require('node-cache')
const cache = new NodeCache({stdTTL:20})
const e = require('express')
//Services
const LaunchService = require('./services/launchpad.services')
const StarLinkService = require('./services/starlink.service')
const helper = require('./utils/helper')
//TTL set for testing illustration purposes

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('Body:  ', request.query)
    console.log('---')
    next()
  }
app.use(express.json())
app.use(requestLogger)
app.use(cors())

//Starlink Cache: verify cache middleware 
const checkCache = (req,res,next) =>{
    var responseArray = []

    try{
        if(cache.has("starlink")){
            responseArray = helper.filterStarlink(req,cache.get("starlink"))
                if(responseArray < 1)
                    return res.json({"result": `No launches found on ${req.query.year}-${req.query.month}-${req.query.date}`}).status(200)
                else
                    return res.json(responseArray).status(200)
        }
        return next()
    }  
    catch(err){
        throw new Error(err)
    }
}

//Function1: (id String) ccepts an `id` of a `launchpad` as an argument, and returns information about failed `launches`
app.get('/api/launchpads/:id', (req, res) => {
    LaunchService.getLaunchesPerLaunchpad(req.params.id,res)
}) 

//Function 2 starlink Assume API is consumed by front end which limits user input through date picker
app.get('/api/starlink',checkCache,(req,res) => {
    StarLinkService.starlinkByDate(req,res,cache)
})



const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

module.exports = app;

