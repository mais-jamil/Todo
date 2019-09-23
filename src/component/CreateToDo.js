import React, { Component } from 'react'
import NavBar from './NavBar'
import './CSS/form.css'
import axios from 'axios'

export  class CreateToDo extends Component {
    
    constructor(props) {
        super(props);
        /*
            Have 2 props 
            the task for saveing Task that user want 
            and done that user have done of the task

        */
        this.state = {
         task :'',
         flag :false
        };

      }

      /**
       * the value of Input that name is TASK has been changed.
       */
      onChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }    
    
    /*  Add Task  */
    addTask = ()=>{
        const {TASK} =this.state// define a referance to the input and after insert 
        this.setState( prev => ({
            task : prev.task.concat(TASK)
        }))
        this.setState({
            flag:true
        })
        console.log(this.state.task)
        const test = [];
        test.push({
           task: TASK
        })
        const UserID = localStorage.getItem('id')
        console.log('User ID ',UserID)
        const itemToAdd = {
            s: TASK,
            UserID : UserID
        }

        axios.post(`todo`, itemToAdd )
        .then(res => {
          console.log(res);
        })
    
        this.Task.value="" 

    }// End of Add Task 

    render() {        
        return (
            <div>
                <NavBar />
                    <div className="container">
                    <div className="row">
                        <div className="col-25">
                        <label >Add Task</label>
                        
                        </div>
                        <div className="col-75">
                        <input className="task-text" type="text" id="Task" placeholder="Your Task.."
                        onChange={e => this.onChange(e)}  name="TASK" 
                        ref={(Task)=>this.Task=Task}
                        />
                        {this.state.flag ?  <p>Task Added</p> : <p> </p>}
                        </div>
                    </div>


                    <div className="row">
                        <input className="add-task" type="submit" value="Submit"
                        onClick={this.addTask}
                        />
                    </div>
                    </div>
            </div>
       
       
       )
    }
}

export default CreateToDo
