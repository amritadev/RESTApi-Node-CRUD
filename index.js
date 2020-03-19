var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
var route = express.Router();
var Manager = require('./models/manager.model')
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/company",function(){
    console.log('Mongo connection established')
})
route.get('/',function(req,res){
    Manager.find({},function(err,managers){
        if(err){
            console.log(err)
        }
        res.json(managers)
    })
})

route.put('/managers/:id',function(req,res){
    Manager.update({_id : req.params.id},req.body,function(err,manager){
        if(err){
            console.log(err)
        }
        res.json({message :"Record updated"})
    })
})



route.delete("/managers/:id",function(req,res){
    Manager.remove({_id : req.params.id},function(err,manager){
        if(err){
            console.log('The eeror is ,err')
        }
        res.json({message : "Record deleted"})
    })
})

route.post('/managers',function(req,res){

    console.log('The req is ',req.body);
    Manager.create(req.body,function(err,manager){
        console.log("Inside create")
        if(err){
            console.log("The error is ",err)
        }
        res.json({message : 'Record saved'})
    })


})

route.get('/managers/:id',function(req,res){
    var id = req.params.id;
    Manager.find({_id : id},function(err,manager){
        if(err){
            console.log(err)
        }
        res.json(manager)
    })
})



app.use('/api',route)
app.listen(3000,function(){
    console.log('Server starts')
})