import React, { useState, useEffect } from 'react'
import './UpdatePassword.css'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, updatePassword } from '../../actions/userAction'
import { useAlert } from 'react-alert'


const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updatePassword(oldPassword, newPassword));
        dispatch(logoutUser());
        navigate("/");
    };
    const alert = useAlert();
    const {error, loading, message} = useSelector((state) => state.like);
    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if (message)
        {
            alert.success(message);
            dispatch({
                type: "clearMessage"
            });
        }
    },[dispatch, alert, error, message]);


    return (
    <div className='updatePassword'>
        <form 
            className='updatePasswordForm' 
            onSubmit={submitHandler}
        >
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>
            
            <input 
                type="password" 
                placeholder='Enter Old Password' 
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                className='updatePasswordInputs'
                required 
            />

            <input 
                type="password" 
                placeholder='Enter New Password' 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className='updatePasswordInputs'
                required 
            />
            <Button disabled={loading} type='submit' variant='outlined'>Change Password</Button>
        </form>
    </div>
  )
}

export default UpdatePassword