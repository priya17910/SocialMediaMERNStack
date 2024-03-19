import './UpdateProfile.css';
import React, { useState, useEffect } from 'react';
import { Avatar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, registerUser, updateProfile } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';


const UpdateProfile = () => {
    const {user, loading, error} = useSelector((state) => state.user);
    const {loading: updateLoading, error: updateError, message} = useSelector((state) => state.like);
    const [name, setName] = useState(user.name);
    
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
    const dispatch = useDispatch();
    
    const alert = useAlert();
    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2)
            {
                setAvatarPreview(Reader.result);
                setAvatar(Reader.result);
            }
        };
    };



    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
        navigate("/account");
    };


    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if (updateError)
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
    },[dispatch, alert, error, updateError, message]);


    return (
        loading ? (<Loader />)
        :
        (
            <div className='updateProfile'>
        <form className='updateProfileForm' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>
            
            <Avatar 
                src={avatarPreview}
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
                className="updateProfileInputs"
                placeholder='name'
                required
            />

            <input 
                type="email" 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="updateProfileInputs"
                required
            />

            <Button disabled={updateLoading} type='submit' variant="outlined">Update Profile</Button>
        </form>
    </div>
        )
  );
}

export default UpdateProfile