import React, { useEffect, useState } from 'react'
import './Login.css'
import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, loginUser } from '../../actions/userAction'
import { useAlert } from 'react-alert'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error} = useSelector((state) => state.user);
    const {message} = useSelector((state) => state.like);
    const loginHandler = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(email, password));
        dispatch(loadUser());
    };
    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if(message)
        {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            });
        }
    },[alert, error, dispatch, message]);
    return (
    <div className='login'>
        <form 
            className='loginForm' 
            onSubmit={loginHandler}
        >
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>
            <input 
                type="email" 
                placeholder='Enter Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
            <input 
                type="password" 
                placeholder='Enter Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <Link to="/forgot/password" style={{color: 'crimson'}}>
                <Typography>
                    Forgot Password
                </Typography>
            </Link>
            <Button type='submit' variant='outlined'>Login</Button>
            <Link to="/register" style={{color: 'lightcoral'}}>
                <Typography>
                    New User?
                </Typography>
            </Link>
        </form>
    </div>
  )
}

export default Login