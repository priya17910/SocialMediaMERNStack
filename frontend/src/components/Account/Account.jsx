import React, { useEffect, useState } from 'react';
import './Account.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProfile, getMyPosts, logoutUser } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Button, Dialog, Typography } from '@mui/material';
import image from '../../assets/image.jpg'
import { useAlert } from 'react-alert';
import { likePost } from '../../actions/postAction';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit  } from '@mui/icons-material';
import User from '../User/User';

const Account = () => {

    const dispatch = useDispatch();

    const {user, loading: userLoading} = useSelector((state) => state.user);

    const { loading, error, posts } = useSelector((state) =>  state.myPosts)
    
    const {error: likeError, message, loading: deleteLoading} = useSelector((state) =>  state.like);
    const alert = useAlert();
    
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        await dispatch(logoutUser());
        alert.success("User Logged  Out Successfully");
    };

    const deleteProfileHandler = async () => {
        await dispatch(deleteMyProfile());
        dispatch(logoutUser());
        navigate("/");
    }



    useEffect(() => {
        dispatch(getMyPosts());
    },[dispatch]);

    useEffect(() => {
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if (likeError)
        {
            alert.error(likeError);
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
        //dispatch(likePost(postId));
    },[alert, error, likeError, message, dispatch]);


    return (
        loading === true || userLoading === true ? (<Loader />)
        :
        (
            <div className='account'>
                <div className='accountleft'>
                    {
                        posts && posts.length > 0 ?
                        posts.map ((post) => (
                            <Post
                                key={post._id}
                                caption={post.caption}
                                postImage={post.image.url} // post.image.url
                                ownerName={post.owner.name}
                                postId={post._id}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerId={post.owner._id}
                                isAccount="account"
                                isDelete={true}
                            />
                        ))
                        :
                        <Typography variant='h6'>You have not made any post</Typography>
                    }
                </div>
                <div className='accountright'>
                    <Avatar 
                        src={user.avatar.url} /*{user.avatar.url}*/
                        sx={{height: "8vmax", width: "8vmax", cursor: "pointer"}}
                    />
                    <Typography variant='h5'>{user.name}</Typography>
                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>
                                Followers
                            </Typography>
                        </button>
                        <Typography>{user.followers.length}</Typography>
                    </div>
                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>
                                Following
                            </Typography>
                        </button>
                        <Typography>{user.following.length}</Typography>
                    </div>
                    <div>
                        <Typography>
                            Posts
                        </Typography>
                        <Typography>{user.posts.length}</Typography>
                    </div>
                    <Button variant="contained" sx={{backgroundColor: "cadetblue"}} onClick={logoutHandler}>Logout</Button>
                    <Link to='/update/profile'>Edit Profile <Edit sx = {{color: "cadetblue"}}/></Link>
                    <Link to='/update/password'>Change Password</Link>
                    <Button 
                        variant="text"
                        style={{ color: "lightCoral", margin: "2vmax" }}
                        onClick={deleteProfileHandler}
                        disabled={deleteLoading}
                    >
                        Delete My Profile <Delete sx={{color: "lightcoral"}}/>
                    </Button>
                    <Dialog
                        style={{backgroundColor: 'lightsteelblue'}}
                        open = {followersToggle} 
                        onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className='DialogBox'>
                    <Typography variant='h4'>Followers</Typography>
                    {
                        user && user.followers.length > 0 ?
                        user.followers.map((follower) => (
                            <User
                            key={follower._id}
                            userId={follower._id}
                            name={follower.name}
                            avatar={follower.avatar.url} //follower.avatar.url
                            />
                        )):
                        (
                        <Typography variant='h6' style={{margin: "2vmax"}}>You have no Followers</Typography>
                        )

                    }
                    </div>
                    </Dialog>
                    <Dialog
                        style={{backgroundColor: 'lightsteelblue'}}
                        open = {followingToggle} 
                        onClose={() => setFollowingToggle(!followingToggle)}>
                    <div className='DialogBox'>
                    <Typography variant='h4'>Following</Typography>
                    {
                        user && user.following.length > 0 ?
                        user.following.map((follow) => (
                            <User
                            key={follow._id}
                            userId={follow._id}
                            name={follow.name}
                            avatar={follow.avatar.url} //follower.avatar.url
                            />
                        )):
                        (
                        <Typography variant='h6' style={{margin: "2vmax"}}>You are not following anyone</Typography>
                        )

                    }
                    </div>
                    </Dialog>
                </div>
            </div>
        )
  )
}

export default Account