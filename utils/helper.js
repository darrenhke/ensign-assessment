 

const filterStarlink =  (req,data)=>{

    const year = req.query.year 
    const month = req.query.month
    const date = req.query.date
    var filteredByYearArray = [] 


    return filteredByYearArray = data
        .filter(satelite => {
            let dateArray =  satelite.spaceTrack.LAUNCH_DATE 
                if (dateArray && month && year && date){
                    return dateArray.split("-")[0] === year && dateArray.split("-")[1] === month  && dateArray.split("-")[2] === date
                }
                else if(dateArray && year && month){
                    return dateArray.split("-")[0] === year && dateArray.split("-")[1] === month
                }
                else if(dateArray && year && date){
                    return dateArray.split("-")[0] === year && dateArray.split("-")[2] === date
                }
                else if(dateArray && month && date){
                    return dateArray.split("-")[1] === month && dateArray.split("-")[2] === date
                }
                else if(dateArray && date){
                    return dateArray.split("-")[2] === date
                }
                else if(dateArray && month){    
                    return dateArray.split("-")[1] === month
                }
                else if(dateArray && year){
                    return dateArray.split("-")[0] === year
                }
                else
                    return ""
              
        })

}

module.exports.filterStarlink = filterStarlink