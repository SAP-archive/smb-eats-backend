const axios = require("axios")
var TOKEN;

module.exports = {
    GetPlace: function (address) {
        //PATCH a task to complete and continue the workflow
        return (GetPlace(address));
    }
}

let GetPlace = function (address) {
    // Uses the Google Maps Places API to retrive a location
    // Based on a query
    // https://developers.google.com/maps/documentation/javascript/examples/place-search
    return new Promise(function (resolve, reject) {    
        console.log("Fetching place Info from Google Maps for - "+address)
        axios.request({
            url: "/maps/api/place/textsearch/json",
            method: "GET",
            baseURL: "https://maps.googleapis.com",
            params: {
                "query": address,
                "key": process.env.GMAPS_API_KEY
            }
        }).then((res) => {
            console.log("Maps Info retrived for")
            //API return several suggestion (in case +1 address is found)
            //Her we just need the 1st one
            resolve(res.data.results[0])
        }).catch((err) => {
            console.error(err)
            reject(err)
        });
    })
}