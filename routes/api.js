const { query } = require('express');
const express = require('express')
const workflow = require('../modules/workflow');
const router = express.Router();

router.get('/', (req,res) => res.send('Workflow API'));

module.exports = router

//EndPoint To retrieve BusinessPartners from ERP
router.get('/tasks', function (req, res) { 
    workflow.GetTasks(req.query.user).then((data) => {
        console.log(data)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.send({msg: "User Tasks"});
    }).catch((error) => {
        console.error("Error getting user tasks" + error)
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json');
        res.send({msg: error});
    })
   
});

router.post('/completeTask', function (req, res) { 
    console.log("Completing task")
    res.setHeader('Content-Type', 'application/json');
    res.send({msg: "task Completed Tasks"});
});