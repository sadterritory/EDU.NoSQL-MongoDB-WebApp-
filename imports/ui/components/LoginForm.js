import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import '../styles/login.css'

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signup = (e) => {
        e.preventDefault();
        Accounts.createUser({
            username: username,
            password: password,
        });
        Meteor.loginWithPassword(username, password);
    };

    const login = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password);
    };

    return (
        <form className="login-form center">
            <div className='input-block'>
                <label className="login-label" htmlFor="username">Username</label>
                <input className="login-input"
                    type="text"
                    placeholder=""
                    name="username"
                    required
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <br />
            </div>
            <div className='input-block'>
                <label className="login-label" htmlFor="password">Password</label>
                <input className="login-input"
                    type="password"
                    placeholder=""
                    name="password"
                    required
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <br />
            </div>
            <div className="login-buttons">
                <button onClick={signup}>Sign Up</button>
                <button onClick={login}>Log In</button>
            </div>
        </form>
    );
};