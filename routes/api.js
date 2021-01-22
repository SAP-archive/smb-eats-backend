const { query } = require('express');
const express = require('express')
const workflow = require('../modules/workflow');
const router = express.Router();

router.get('/', (req,res) => res.send('Workflow API'));

module.exports = router

//EndPoint To retrieve BusinessPartners from ERP
router.get('/tasks', function (req, res) { 
    workflow.GetTasks(req.query.user).then((data) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
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
    workflow.CompleteTask(req.query.taskId).then((data) => {
        res.statusCode = 204
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
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