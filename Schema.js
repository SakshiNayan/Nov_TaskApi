const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    id:{ type: Number},
    title:{type: String},
    is_complete:{type : Boolean}
})
const taskModal= mongoose.model("task", taskSchema);

const counterSchema =mongoose.Schema({
    id:{type:String},
    seq:{type:Number}
})
const countModel = mongoose.model("id", counterSchema)
module.exports= {taskModal, countModel}