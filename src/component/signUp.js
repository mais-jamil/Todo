import React, { Component } from 'react';
import preview from './Img/preview.png';
import axios from 'axios';
import './CSS/Home.css';

class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
        };
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    click = () => {
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('signUp', user)
            .then((res) => console.log(res))
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div className="edit_container">
                    <div>
                        <img src={preview} width="450px" height="450px" />
                    </div>
                    <div className="form">
                        <h1 className="title">Create Account</h1>
                        <input name="firstName" type="text" placeholder="First Name" className="textBox2" onChange={this.onChange} />
                        <input name="lastName" type="text" placeholder="Last Name" className="textBox2" onChange={this.onChange} />
                        <input name="email" type="email" placeholder="E-mail" className="textBox2" onChange={this.onChange} />
                        <input name="password" type="password" placeholder="Password" className="textBox2" onChange={this.onChange} />
                        <button className="b1" type="submit" onClick={this.click}>Submit</button>
                    </div>
                </div>
            </div>

        )
    }
}
export default signUp


