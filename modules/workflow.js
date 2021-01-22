const axios = require("axios")
var TOKEN;

module.exports = {
    GetTasks: function (user) {
        //Retrieve tasks for a given (UI) user. 
        return (GetTasks(user));
    },
    GetOpenTaskOnInstance: function (instanceID) {
        //Retrive the open task on a worfklow instance
        return (GetOpenTaskOnInstance(instanceID));
    },
    CompleteTask: function (taskId) {
        //PATCH a task to complete and continue the workflow
        return (CompleteTask(taskId));
    }
}

let GetTasks = function (user) {
    //Fetch all open (READY) task instances for a given activity(id)
    return new Promise(function (resolve, reject) {    
        const activityId = convertUserToActivity(user)       
        if (!activityId) {
            reject("Invalid User - " + user)
        }else{
            axios.request({
                url: "/v1/task-instances",
                method: "GET",
                baseURL: process.env.WF_REST_URL,
                params: {
                    "status": "READY",
                    "activityId": activityId
                }
            }).then((res) => {
                console.log("Retrieving Tasks from Workflow for User " + user)
                resolve(res.data)
            }).catch((error) => {
                console.error(error)
                reject(error)
            });
        }
    })
}

let GetOpenTaskOnInstance = function (instanceID) {
    //Fetch all open (READY) task instances for a given workflow(id)
    //This should be the last task (Rider going to deliver)
    return new Promise(function (resolve, reject) {    
       
        axios.request({
            url: "/v1/task-instances",
            method: "GET",
            baseURL: process.env.WF_REST_URL,
            params: {
                "status": "READY",
                "workflowInstanceId": instanceID
            }
        }).then((res) => {
            console.log("Retrieving Task from Workflow WF instance " + instanceID)
            resolve(res.data)
        }).catch((error) => {
            console.error(error)
            reject(error)
        });
    })

}
let CompleteTask = function (taskId) {
    //Mark Task as completed
    return new Promise(function (resolve, reject) {    
        if (!taskId) {
            reject("Invalid Task ID - " + taskId)
        }else{
            axios.request({
                url: "/v1/task-instances/"+taskId,
                method: "PATCH",
                baseURL: process.env.WF_REST_URL,
                data: {"context": {},"status": "COMPLETED"}
            }).then((res) => {
                console.log("Task "+ taskId + " completed!")
                resolve(res.data)
            }).catch((error) => {
                console.error(error)
                reject(error)
            });
        }
    })
}

let getAccessToken = () => {
    //Get the Oauth2 access token and store it as defaults of the axios client
    return new Promise(function (resolve, reject) {
        axios.request({
            url: "/oauth/token",
            method: "POST",
            baseURL: process.env.AUTH_URL,
            auth: {
                username: process.env.AUTH_CLIENT_ID,
                password: process.env.AUTH_CLIENT_SECRET
            },
            params: {
                "grant_type": "client_credentials",
                // "scope": ""
            }
        }).then((res) => {
            console.log("Oauth Token retrieved Succesfully!");
            axios.defaults.headers.common['Authorization'] = "Bearer "+res.data.access_token;
            resolve(res.data.access_token)
        }).catch((error) => {
            console.error(error)
        });
    })
}

function convertUserToActivity(user) {
    //Each Area has an activity. The tasks are assigned to the areas.
    //This is a from/to reference between Areas x Activity types
    switch (user) {
        case "kitchen":
            return process.env.ACTIVITY_KITCHEN
            break;
        case "delivery":
            return process.env.ACTIVITY_DELIVERY
            break;
        default:
            return null;
    }
}
//First request to have the Oauth token saved
getAccessToken()
