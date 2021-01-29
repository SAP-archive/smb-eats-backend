module.exports = {
    GetItems: function (context) {
        //Starts a new WF instance
        return (GetItems());
    }
}

let GetItems = function (context) {
    //Starts the Workflow Instance. The beggining of the process
    return new Promise(function (resolve, reject) {    
        const items = require("./data/items.json")
        resolve(items)
    })
}