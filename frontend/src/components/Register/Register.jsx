import React, { useState, useEffect } from 'react';
import './Register.css';
import { Avatar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, registerUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.user);
    const alert = useAlert();
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2)
            {
                setAvatar(Reader.result);
            }
        };
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(name, email, password, avatar));
        if (!error)
        {
            await dispatch(loadUser());
            navigate('/account');
        }
    };


    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
    },[dispatch, alert, error]);


    return (
    <div className='register'>
        <form className='registerForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>
            
            <Avatar 
                src={avatar}
                alt="User"
                sx={{height: "10vmax", width: "10vmax"}}    
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />


            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="registerInputs"
                placeholder='Name'
                required
            />

            <input 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="registerInputs"
                required
            />
            <input 
                type="password" 
                placeholder='Password' 
                value={password} 
                className="registerInputs"
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <Link to="/">
                <Typography style={{color: "lightcoral"}}>
                    Already Signed Up ? Login Now
                </Typography>
            </Link>

            <Button disabled={loading} type='submit' variant="outlined">Sign Up</Button>
        </form>
    </div>
  )
}

export default Register