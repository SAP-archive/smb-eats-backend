const axios = require("axios")
var TOKEN;

module.exports = {
    GetTasks: function (user) {
        return (GetTasks(user));
    },
    CompleteTask: function (taskId) {
        return (CompleteTask(taskId));
    }
}

let GetTasks = function (user) {
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
                    // "scope": ""
                }
            }).then((res) => {
                console.log("Retrieving Tasks from Workflow for User " + user)
                console.log(res);
                resolve(res.data)
            }).catch((error) => {
                console.error(error)
            });
        }
    })
}

let getAccessToken = () => {
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

getAccessToken().then(token =>{
    TOKEN = token
})
