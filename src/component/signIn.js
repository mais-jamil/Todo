import React, { Component } from 'react';
import img from './Img/icons8-todo-list-100.png';
import axios from 'axios';
import './CSS/Home.css'

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state={
            email: "",
            password: ""
        };
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    loginClick = () => {
        const loginInfo = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('login', loginInfo)
        .then(({ data }) => {
            // Save the data in local storage.
            console.log('Data ID',data)

            if (data) {
                console.log('data', data)
                localStorage.setItem('email', data.email)
                localStorage.setItem('password', data.password)
                localStorage.setItem('id', data._id)
                console.log('Data ID',localStorage.getItem('id'))
                window.location.href= '/create'
            } else {
                alert('Wrong Email Or Password')
            }
        })
        .catch(() => {
            alert('Wrong Email Or Password')
        })
    }

    render(){
        console.log(this.state)
    return (
        <div className="nav">
            <div className="img">
              <img src={img} width= '50px' height= '46px' />  
            </div>
            <div className="signIn">
                <div className="t1">
                <input name="email" type="email" placeholder="E-mail" className="textBox"  onChange={this.onChange}/>
                <input name="password" type="password" placeholder="Password" className="textBox" onChange={this.onChange}/>
                <button className="logInButton" type="submit" onClick={this.loginClick}>Login</button>
                </div>
            </div>
        </div>
    )
    }
}
export default SignIn