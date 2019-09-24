import React, { Component } from 'react'
import NavBar from './NavBar'
import './CSS/listStyle.css'
import axios from 'axios'
import './CSS/form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
         flag :false,
         clickedEdit :0,
         edit :''
        };
    }
      /*Get Data From MongoDB */
    getData= async () => {
        const ID = {
            id: localStorage.getItem('id')
        }
        console.log('ID', ID)
        const fetchTask = await axios.get('viewTask', {
            params: { id: localStorage.getItem('id') }
        })
        this.setState({
            tasks: fetchTask.data,
               
        })

        
    }//End OF getData

    /*GET data  after the component output has been rendered to the DOM */
    componentDidMount() {
        this.getData()
    }//End OF ComponentDidMount
      
    onChange = e => { this.setState({  [e.target.name]: e.target.value })}    
    
      
      
    EditItem = (index) => {
        this.setState(prevState =>({
            flag : !(prevState.flag),
            clickedEdit :index,
        }))
    }// End Of Edit Item

    EditItemOnClick= (item,index)=>{
        const {TASK} =this.state
        let taskArrayEdit = this.state.tasks
        taskArrayEdit[index]=TASK
        this.setState({
           tasks: taskArrayEdit
       })
       this.setState({
           edit:TASK
       })
       const EditInfo = {
           old :item,
           newTask : TASK
       }

       axios.post('/editItem',EditInfo)
      this.getData()

       this.Task.value=""

    }//End Of EditOnclick Method

    deleteItem = (id)=>{
        let taskList = [...this.state.tasks]
        taskList.splice(id, 1);
        this.setState({tasks: taskList})

        axios.post('/deleteItem',this.state.tasks[id])
        .then(res =>this.getData())

    }//End Of Delete Item
     
    render() {
        const { tasks } = this.state;
        return (
            <div>
                <NavBar />              
                        <div className="list-type1">
                            <ol>
                                {tasks.length > 0 ? tasks.map((item,index) => {
                                    return(
                                    <li key={index}>
                                     <h6>{item.DateTodo}</h6>
                                        <a>
                                        {item.Task} 
                                        <div  >
                                        <FontAwesomeIcon className="iconsize"  icon={faTrash}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.deleteItem(index)}}
                                        />
                                       
                                        </div>
                                        <FontAwesomeIcon className="iconsize" key={index}  icon={faEdit}
                                        
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.EditItem(index)}}
                                        />
                                         {this.state.flag && this.state.clickedEdit==index
                                            ?<div><input  onChange={e => this.onChange(e)}  name="TASK" 
                                            ref={(Task)=>this.Task=Task}/> 
                                            <button onClick={()=>this.EditItemOnClick(item.Task,index)}>edit</button>
                                            </div> 
                                            
                                            : null}

                                        </a></li>
                                    )} ): null}                            
                            </ol>
                            </div>   
             </div>
        )
    }
}
