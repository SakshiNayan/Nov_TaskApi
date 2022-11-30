const express = require('express');
const mongoose = require('mongoose');
const taskModal = require('./Schema')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.post('/post',(req,res)=>{
    try{
        taskModal.create({
            title : req.body.title,
            is_complete : req.body.is_complete
        }).then((data)=>{
            res.status(200).send({status:'Successfully Added task'})
        })
    }
    catch(err){
        res.status(400).send(err.message)
    }
});

app.get('/fetch',(req,res)=>{
    taskModal.find().then((data)=>{
        res.status(200).send({task: data})
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
});
app.get('/fetch/:id',(req,res)=>{
    taskModal.find({_id: req.params.id}).then((data)=>{
        res.status(200).send({specific_task: data})
    }).catch((err)=>{
        res.status(400).send("could not find the task")
    })
})

app.delete('/delete/:id',(req,res)=>{
    taskModal.deleteOne({_id: req.params.id}).then((task)=>{
        res.status(200).send("Task is deleted Successfully")
    }).catch((err)=>{
        res.status(400).send("could not find the task")
    })
});

app.put('/update/:id',(req,res)=>{
    // try{
    //     const task = taskModal.find({_id: req.params.id})
    //     if(task){
    //         taskModal.updateMany({
    //             title : req.params.title,
    //             is_complete : req.params.is_complete
    //         }, req.body)
    //         .then((data)=>{
    //             res.status(200).send('Status Updated')
    //         })
    //     }else{
    //         res.status(400).send('Invalid input')
    //     }
    // }
    // catch(err){
    //     res.status(400).send(err)
    // }
    taskModal.find({_id: req.params.id}).then((data)=>{
        taskModal.updateOne({title : req.params.title}, {is_complete : req.params.is_complete})
        .then(()=>{
            res.status(200).send('Status Updated')
        }).catch((err)=>{
            res.status(400).send(err)
        })
    })

});


app.listen(3000, (err)=>{
    if(!err){
        console.log('Server at 3000')
    }
})
mongoose.connect('mongodb://localhost/Nov_taskApi',()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})
app.get('/', function(req,res){
    res.send("Task_Api")
})