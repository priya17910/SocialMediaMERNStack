import React, {useEffect, useState} from 'react';
import './NewPost.css';
import { Typography, Button } from "@mui/material";
import image1 from '../../assets/image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../actions/postAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { getMyPosts, loadUser } from '../../actions/userAction';
const NewPost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const navigate = useNavigate();
    const {loading, error, message} = useSelector((state) => state.like);
    const dispatch = useDispatch();
    const alert = useAlert();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2)
            {
                setImage(Reader.result);
            }
        };
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        navigate('/account');
        dispatch(getMyPosts());
        dispatch(loadUser());
    };

    useEffect(() => {
        if(error)
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
    },[dispatch, error, message, alert]);


    return (
    <div className='newPost'>
        <form className='newPostForm' onSubmit={submitHandler}>
            <Typography variant="h3">New Posts</Typography>
            {
                image && <img src={image} alt="post" />
            }
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            <input 
            type="text" 
            placeholder='Caption...'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            
            />
            <Button disabled={loading} type='submit' sx={{backgroundColor: "cadetblue",color: "black", fontWeight: "bold", width: "6vmax"}}>
                Post
            </Button>
        </form>
    </div>
  )
}

export default NewPost;