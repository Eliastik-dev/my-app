import React from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import axios from 'axios';

import { AUTH_TOKEN_KEY } from "./App";

class Login extends React.Component {

    constructor() {
        super();
        this.state = { userData: {} }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(event) {
        let currentState = {...this.state.userData};
        currentState[event.target.name] = event.target.value;
        this.setState({ userData: currentState })
    }
    onSubmit(event) {
        event.preventDefault();
        axios.post('/authenticate', {
            ...this.state.userData
        }).then((response) => {
            const bearerToken = response?.headers?.authorization;
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                sessionStorage.setItem(AUTH_TOKEN_KEY,jwt)
            }
            this.props.setUserInfo(response.data.userName)
            this.props.history('/myBooks')
        })
    }    

    render() {
        return (
            <div className='login-container'>
                <div>
                    <div>
                        <img src={logo} alt="Logo"style={{margin: '20px'}}/>
                    </div>
                    <div className="title">
                        Bienvenue sur Sharebook
                    </div>
                    <div className='form-container'>
                        <form onSubmit={this.onSubmit}>
                            <span>Email: </span>
                            <input type='text' className='form-control' name='email' onChange={this.handleChange}></input>
                            <span>Mot de passe: </span>
                            <input type='password' className='form-control' name='password' onChange={this.handleChange}></input>
                            <div className='button-connexion'>
                                <input type='submit' className='btn btn-primary' value='Connexion'></input>
                            </div>
                        </form>
                    </div>
                    <div className='signInLink'><Link to="/addUser" style={{textDecoration: 'none', color: 'black'}}>Inscription</Link></div>
                </div>
            </div>
        )
    }
}

export default function Wrapper(props) {
    const history = useNavigate();
    return <Login {...props} history={history} />;
}