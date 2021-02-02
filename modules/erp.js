module.exports = {
    GetItems: function (context) {
        //Starts a new WF instance
        return (GetItems());
    },

    GetItemDetail: function (itemName) {
        return (GetItemDetail(itemName))
    }
}

let GetItems = function (context) {
    //Starts the Workflow Instance. The beggining of the process
    return new Promise(function (resolve, reject) {    
        const items = require("./data/items.json")
        resolve(items)
    })
}

let GetItemDetail = function (itemName) {
    //Starts the Workflow Instance. The beggining of the process
    return new Promise(function (resolve, reject) {    
        const items = require("./data/items.json");
        const result = items.filter(item => item.Description.toLowerCase().includes(itemName.toLowerCase()));
        resolve(result);
    })
}