import React, { Component } from 'react'
import './CSS/nav.css'
import logo from './Img/icon.png'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

function logout() {
    window.location.href ="/"
    localStorage.clear()
}
export default class NavBar extends Component {

    render() {

        return (
            <div>
                <ul>
                    <li><img src={logo} alt="dwdwdw"></img></li>
                    <li><Link to="/create">TODO App</Link></li>
                    <li><Link to="/viewtodo">View Todo</Link></li>
                    <FontAwesomeIcon className="iconsize"  icon={faSignOutAlt} onClick={logout}/>
                </ul>
            </div>
        )
    }
}
