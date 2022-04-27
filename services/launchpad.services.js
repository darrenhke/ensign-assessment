const axios = require('axios').default

const SPACEX_BASE_URL = 'https://api.spacexdata.com/v4'
const config = {'Content-Type':'application/json'}

const queryOptions = (launchpadLaunches) => {
    return {
        "query":{
            "$and":[
                {"failures": 
                    {
                        "$not": {"$size":0}
                    }
                },
                {"_id":
                    launchpadLaunches
                }
            ]
        },
        
        "options":{
            "sort":{
                "_id": "desc"
            }
        }
    }
}

const getLaunchesPerLaunchpad = (launchpad,res) => {
    var  launchpadName = ""
    var launchpadLaunches = []
    var allFailures = []

    axios.get(`${SPACEX_BASE_URL}/launchpads/${launchpad}`)
    .then(res1 => {
        launchpadName = res1.data.name
        launchpadLaunches = res1.data.launches

        return axios.post(`${SPACEX_BASE_URL}/launches/query`,queryOptions(launchpadLaunches),config)
    })
    .then(response => {
        allFailures = response.data.docs.map((item) => {
          return {
              "name" : item.name,
              //Write map in case there are multiple reasons for failure
              "failures" : item.failures.map((failure) => {
                  return failure.reason
              })
            }
        })
        console.log(allFailures)
        return res.json(
            {
                "launchpad": launchpadName,
                "all_failures":allFailures
            }
    ).status(200)})
    
}

module.exports.getLaunchesPerLaunchpad = getLaunchesPerLaunchpad