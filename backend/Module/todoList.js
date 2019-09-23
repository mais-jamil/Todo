const mongoose = require('mongoose')
const todoList = new mongoose.Schema({
    postBy: {
        type :mongoose.Schema.Types.ObjectId,
        ref : 'signupUser'
    },
    Task : {
        type : String
    },
    DateTodo :{
        type: Date,
        default : Date.now
    }
    
})

const Todo = mongoose.model('Todo', todoList)

module.exports = Todo