module.exports = {
    GetTasks: function (user) {
        return (GetTasks(user));
    },
    CompleteTask: function (taskId) {
        return (CompleteTask(taskId));
    }
}

let GetTasks = function (user) {
    // Returns Invoices from ByD
    return new Promise(function (resolve, reject) {
        if(!convertUserToTask(user)){
            reject("Invalid User - "+user)
        }

        
        console.log("Retrieving Tasks from Workflow for User " + user)
        resolve("Here are tasks for user "+ user)

    })
}


function convertUserToTask(user) {
    switch (user) {
        case "kitchen":
            return process.env.TASK_KITCHEN
            break;
        case "delivery":
            return process.env.TASK_DELIVERY
            break;
        default:
            return null;
    }
}