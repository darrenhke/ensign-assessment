const axios = require('axios').default

const helper = require('../utils/helper')

const SPACEX_BASE_URL = 'https://api.spacexdata.com/v4'


const starlinkByDate = (req,res,cache) =>{
    var responseArray = []

    axios.get(`${SPACEX_BASE_URL}/starlink`)
    .then(response => {
        cache.set("starlink",response.data)
        responseArray = helper.filterStarlink(req,response.data)
        if(responseArray.length < 1)
            return res.status(200).json({"result": `No launches found on ${req.query.year}-${req.query.month}-${req.query.date}`})
        else
            return res.json(responseArray).status(200)
    }) 

}

module.exports.starlinkByDate = starlinkByDate
