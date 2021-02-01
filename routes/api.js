const express = require('express')
const workflow = require('../modules/workflow');
const erp = require('../modules/erp');
const map = require('../modules/map');
const router = express.Router();

router.get('/', (req,res) => res.send('<h1>SMB Eats 🍕 Workflow API</h1>'));

module.exports = router

router.get('/tasks', function (req, res) { 
    workflow.GetTasks(req.query.user).then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(formatTasks(data));
    }).catch((error) => {
        console.error("Error getting user tasks" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
   
});

router.post('/completeTask', function (req, res) { 
    //Complete a task for an ID and if passed a WF instance ID it also
    //Returns the subsequent task as response.
    workflow.CompleteTask(req.query.taskId).then((data) => {
        if(req.query.instanceID){
            workflow.GetOpenTaskOnInstance(req.query.instanceID).then((data) => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.send(data);
            })
        }else{
            res.statusCode = 204
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    }).catch((error) => {
        console.error("Error completing task" + error)
        if(error.response.data.error.details[0].message){
            console.error(error.response.data.error.details[0].message)
        }
        res.statusCode = error.response.status
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
});

router.get('/taskContext', function (req, res) { 
    workflow.GetTaskContext(req.query.taskId).then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        data.id = req.query.taskId
        res.send(data);
    }).catch((error) => {
        console.error("Error getting task context" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
   
});

router.get('/instanceStatus', function (req, res) { 
    workflow.GetOpenTaskOnInstance(req.query.instanceID).then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((error) => {
        console.error("Error getting instance status" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
   
});

router.post('/start', function (req, res) { 
    workflow.StartInstance(req.body).then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((error) => {
        console.error("Error starting instance")
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
});

router.get('/items', function (req, res) { 
    erp.GetItems().then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((error) => {
        console.error("Error getting Items context" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
    })
   
});

router.get('/map', function (req, res) { 
    map.GetPlace(req.query.address).then((data) => {
        if(!data){
            throw new Error("Invalid Address")
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }).catch((error) => {
        console.error("Error getting Map Place" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        if(error.message){
            error = error.message
        }
        res.send({msg: error});
    })
});

function formatTasks(tasks){
    // var formattedTasks = []
    // tasks.forEach(element => {
    //     item = {
    //         id: element.id, 
    //         createdAt: element.createdAt, 
    //         subject:element.subject,
    //         workflowInstanceId:element.workflowInstanceId}
    //         formattedTasks.push(item)
    // });
    return tasks;
}
