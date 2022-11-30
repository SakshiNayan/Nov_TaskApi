const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{type: String},
    is_complete:{type : Boolean}
})
const taskModal= mongoose.model("task", taskSchema);
module.exports= taskModal