import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import * as authAction from '../../actions/authAction';
import {removeAuthErrors} from "../../actions/authAction";

const Auth = () => {
    const [isLoggingIn, setIsLogginIn] = useState(true);
    const [formDataExceptUsername, setFormDataExceptUsername] = useState({
        email: '',
        password: '',
        acceptedAgreement: ''
    });
    const {email, password} = formDataExceptUsername;
    const [userName, setUsername] = useState('');

    const {isAuthenticated, msg} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();

    const authStateHandler = () => {
        dispatch(removeAuthErrors());
        setFormDataExceptUsername({email: '', password: '', acceptedAgreement: ''});
        setUsername('');
        setIsLogginIn(!isLoggingIn);
    };

    const formDataExceptUserNameChangeHandler = (event) => {
        setFormDataExceptUsername({...formDataExceptUsername, [event.target.name]: event.target.name === 'acceptedAgreement' ? event.target.checked.toString() : event.target.value})
    };

    const userNameChangeHandler = (event) => {
        setUsername(event.target.value)
    };

    const authHandler = async (event) => {
        if (event.target.name === 'login') {
            dispatch(authAction.login(formDataExceptUsername.email, formDataExceptUsername.password))
        } else {
            dispatch(authAction.register(userName, formDataExceptUsername.email, formDataExceptUsername.password, formDataExceptUsername.acceptedAgreement));

        }
    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='background-light-blue'>
            <div className='container p-0'>
                <div className='row no-gutters'>
                    <div className='col-md-12 bg-white pt-5'>
                        <div className="sign-in-from">
                            <h1 className='mb-0'>{!isLoggingIn ? 'Sign Up' : 'Log In'}</h1>
                            <p>{!isLoggingIn ? 'Sign up with a username, ' : 'Login with your '}email and password</p>
                            <div className='mt-4'>
                                {!isLoggingIn &&
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input type="text" className="form-control mb-0" id="exampleInputEmail1"
                                           placeholder="Show Watcher" onChange={userNameChangeHandler} value={userName} required={!isLoggingIn}/>
                                        {msg && msg.find(msg => msg.param === "name") ? <span className='text-danger'>{msg.find(msg => msg.param === "name").msg}</span> : null}
                                </div>
                                }
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">Email address</label>
                                    <input type="email" className="form-control mb-0" id="exampleInputEmail2"
                                           placeholder="example@email.com" name='email' onChange={e => formDataExceptUserNameChangeHandler(e)} value={email} required/>
                                    {msg && msg.find(msg => msg.param === "email") ? <span className='text-danger'>{msg.find(msg => msg.param === "email").msg}</span> : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control mb-0" id="exampleInputPassword1"
                                           placeholder="Password" name='password' onChange={e => formDataExceptUserNameChangeHandler(e)} value={password} required/>
                                    {msg && msg.find(msg => msg.param === "password") ? <span className='text-danger'>{msg.find(msg => msg.param === "password").msg}</span> : null}
                                </div>

                                {!isLoggingIn ?
                                    <div className="d-inline-block w-100">
                                        <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                                            <input type="checkbox" name='acceptedAgreement' onChange={e => formDataExceptUserNameChangeHandler(e)} className="custom-control-input" id="customCheck1"/>
                                            <label className="custom-control-label" htmlFor="customCheck1">I accept that
                                                this is
                                                not a finished product</label><br />
                                            {msg && msg.find(msg => msg.param === "acceptedAgreement") ? <span className='text-danger'>{msg.find(msg => msg.param === "acceptedAgreement").msg}</span> : null}
                                        </div>
                                        <button type='button' name='signup' onClick={e => authHandler(e)} className="btn btn-primary float-right">Sign Up</button>
                                    </div> :
                                    <div className="d-inline-block w-100">
                                        <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1"/>
                                        {msg && msg.find(msg => msg.msg === "Invalid credentials") ? <span className='text-danger'>{msg[0].msg}</span> : null}
                                        <button type='button' name='login' onClick={e => authHandler(e)} className="btn btn-primary float-right">Log In</button>
                                    </div>
                                }


                                <div className="sign-info">
                                    {!isLoggingIn ?
                                        <span
                                            className="dark-color d-inline-block line-height-2">Already Have Account ? &nbsp;
                                            <button type='button' onClick={authStateHandler} className='btn btn-sm btn-success p-2'>Log In</button></span>
                                        :
                                        <span
                                            className="dark-color d-inline-block line-height-2">Don't Have Account ? &nbsp;
                                            <button type='button' onClick={authStateHandler} className='btn btn-sm btn-success p-2'>Sign Up</button></span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;