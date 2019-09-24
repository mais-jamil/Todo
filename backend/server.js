const express = require('express')
const app = express()
const PORT =  process.env.PORT || 5050;
const mongoose = require('mongoose')
const Todo = require('./Module/todoList')
const signupUser = require('./Module/signupUserSchema')
const URL = 'mongodb+srv://team:1234@cluster0-0bpu8.mongodb.net/test?retryWrites=true&w=majority'

const path = require('path');

mongoose.connect(URL,{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify: false,useCreateIndex:true })
.then(() => console.log('Connected to DB'))
.catch(err => console.log('Error', err))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../build/')))

app.post('/signUp',(req,res)=>{
    const newUser =  new signupUser(req.body)
    newUser.save()
    .then(Saved => res.send(Saved))
    .catch(err =>  { res.send(err)})
})

app.post('/login', (req,res)=>{
    signupUser.findOne({email:req.body.email, password:req.body.password})
    .then(data => {
        res.send(data)
        console.log('data.id', data.id)
    })
    .catch(err => res.send(err).status(400))
})

app.post('/todo',(req,res)=>{
    console.log('TODO', req.body)
    const task = new Todo({
        postBy : req.body.UserID,
        Task : req.body.s,
        DateTodo : req.body.DateTodo
        
    })
    console.log(task)
    task.save()
    .then()
    .catch(err => console.log('err', err))
})


app.get('/viewTask',(req,res)=>{
    
    Todo.find({postBy:req.query.id})
    .then(data => res.send(data))
    .catch(err => console.log('Error form get View Task ', err))
})

app.post('/deleteItem',(req,res) =>{
    console.log('req.body', req.body._id)
    Todo.remove({_id : req.body._id })
    .then(res => console.log('Response After Delete', res))
    .catch(err => console.log('Error form POST Delete Task ', err))
})

app.post('/editItem',(req,res) =>{
    console.log('req.body', req.body.newTask)
    Todo.updateOne({Task : req.body.old},{$set :{Task:req.body.newTask}})
    .then(res => console.log('Response After Edit', res.Task))
    .catch(err => console.log('Error form POST Edit Task ', err))
})


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../build/index.html')))
})

app.listen(PORT)