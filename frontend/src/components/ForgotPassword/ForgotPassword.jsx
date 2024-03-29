import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error, loading, message} = useSelector((state) => state.like);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
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
        <div className='forgotPassword'>
        <form 
            className='forgotPasswordForm' 
            onSubmit={submitHandler}
        >
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>
            <input 
                type="email" 
                placeholder='Enter Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className='forgotPasswordInputs'
            />
            <Button disabled={loading} type='submit' variant='outlined'>Send Token</Button>
        </form>
        </div>
    )
}

export default ForgotPassword