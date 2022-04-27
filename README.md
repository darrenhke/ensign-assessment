# Ensign Take home assignment - Darren Ho

**Installation**

1. Ensure node.js is installed by running `node --version`
2. Clone repository to folder
3. Run command `npm install` in cloned folder
4. Run command `npm run test` to run test suite. Check outcome of test for pass/fail
5. Run command `npm start` to start the server. Server should start on http://localhost:3001 if port is not in use
6. Open Postman and import *Ensign - SpaceX.postman_collection.json* to test manually. First 2 test are local rest are to SpaceX

## File Structure

- postman_collection - endpoint test postman collection lives here
- services -  REST API call services are separated by functions
- utils - helper method to declutter the server entry file and services
- server.js - Standalone application entry point


No controller, route or model folders are required due to size of assignment.

## Functions


### Function 1 
**Function:** Return failed launches in descending order base on launchpad id in parameter

**Endpoint :** `/api/launchpads/:id`

**Method :** GET

id is to be replaced by launchpad id, id sample below

`[
    "id": "5e9e4502f509094188566f88",
    "id": "5e9e4502f509092b78566f87",
    "id": "5e9e4502f5090995de566f86",
    "id": "5e9e4502f5090927f8566f85",
    "id": "5e9e4501f509094ba4566f84",
    "id": "5e9e4501f5090910d4566f83"
]

**Example Usage :** `http://localhost:3001/api/launchpads/5e9e4501f5090910d4566f83`



**Explanations and Assumptions**

Instead of querying each launch by making multiple network calls; filter using mongodb syntax to check if failures value is `not` empty and launchId corresponds to array of launches and sorting the values(descending order), resulting in a more efficent look up. 

Though one reason is returned for all failures per launch pad, map it out if multiple launch failure reasons are added. 

API can be improved to display all launchpads and all failures per launch pad instead of using launch id in `req.params.id`, also this could work against us if many failures occur.


### Function 2 
**Function:** Fetch all starlink statelites that is filtered base on year/month/date

**Endpoint :** `/api/starlink?year=&month=&date=`

**Method :** GET



**Example Usage :** `http://localhost:3001/api/starlink?month=01&year=2021`



**Explainations and Assumptions**

Cache the response body in `node-cache` module so fast look up times are possible. Caching TTL is 20 seconds to illustrate cached info lookup speed vs network REST API calls. Assume that the front-end will consume this API and using user input restricted components i.e. datepicker. Cases where date is greater than current date, incorrect format, missing date inputs,  etc.. are not handled due to previous assumption. Flexibilty to search in the following combinations: 

One query param
`YYYY`
`MM`
`DD`

Two query param
`YYYY-MM`
`YYYY-DD`
`MM-DD`

Three query param
`YYYY-MM--DD`


Improvements can be made be setting the date input as keys to getting the filtered response without the need to filter through whole response body again.


## Test

- Test API return OK(200) and is alive
- Test if all 7 combinations
- Test to check if when no satelite launch date found reply: `{"result", "No launches found on 2021-04-18"}`
