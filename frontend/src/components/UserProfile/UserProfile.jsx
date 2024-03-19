import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser, getFollowingPost, getUserPosts, getUserProfile, loadUser } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { Button, Dialog, Typography } from '@mui/material';
import image from '../../assets/image.jpg'
import { useAlert } from 'react-alert';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import User from '../User/User';
import '../Account/Account.css';


const UserProfile = () => {

    const dispatch = useDispatch();

    const {users, loading: userLoading, error: userError} = useSelector((state) => state.userProfile);
    const {user: me} = useSelector((state) => state.user) 
    const { loading, error, posts } = useSelector((state) =>  state.userPosts)
    
    const {error: followError, message, loading: followLoading} = useSelector((state) =>  state.like);
    const alert = useAlert();
    
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);
    const params = useParams();

    const followHandler = async () => {
        setFollowing(!following);
        await dispatch(followAndUnfollowUser(users._id));
        await dispatch(getUserProfile(params.id));
        await dispatch(loadUser());
    };


    useEffect(() => {
        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));
    },[dispatch, params.id]);

    useEffect(() => {
        if(me._id === params.id)
        {
            setMyProfile(true);
        }
        if (users)
        {
            users.followers.forEach((item) => {
                if(item._id === me._id)
                {
                    setFollowing(true);
                }
                else
                {
                    setFollowing(false);
                }
            });
        }
        if (error)
        {
            alert.error(error);
            dispatch({
                type: "clearErrors"
            });
        }
        if (followError)
        {
            alert.error(followError);
            dispatch({
                type: "clearErrors"
            });
        }
        if (userError)
        {
            alert.error(userError);
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
    },[alert, error, followError, message, userError, dispatch, users, me._id, params.id]);


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
                                isAccount="userProfile"
                                // isAccount={true}
                                // isDelete={true}
                            />
                        ))
                        :
                        (<Typography variant='h6'>User has not made any post</Typography>)
                    }
                </div>
                <div className='accountright'>
                {
                    users && 
                    (
                   <>
                        <Avatar 
                        src={users.avatar.url} /*{user.avatar.url}*/
                        sx={{height: "8vmax", width: "8vmax", cursor: "pointer"}}
                    />
                    <Typography variant='h5'>{users.name}</Typography>
                    <div>
                        <button onClick={() => setFollowersToggle(!followersToggle)}>
                            <Typography>
                                Followers
                            </Typography>
                        </button>
                        <Typography>{users.followers.length}</Typography>
                    </div>
                    <div>
                        <button onClick={() => setFollowingToggle(!followingToggle)}>
                            <Typography>
                                Following
                            </Typography>
                        </button>
                        <Typography>{users.following.length}</Typography>
                    </div>
                    <div>
                        <Typography>
                            Posts
                        </Typography>
                        <Typography>{users.posts.length}</Typography>
                    </div>
                    {
                        myProfile ? null: 
                        (
                            <Button
                            disabled={followLoading}
                            variant="outlined" 
                            sx={{backgroundColor: following ? "lightcoral" : "lightsteelblue", color: "black" }} 
                            onClick={followHandler}>
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                        )
                    }
                            </>
                    )
                }
                    <Dialog
                        style={{backgroundColor: 'lightsteelblue'}}
                        open = {followersToggle} 
                        onClose={() => setFollowersToggle(!followersToggle)}>
                    <div className='DialogBox'>
                    <Typography variant='outlined'>Followers</Typography>
                    {
                        users && users.followers.length > 0 ?
                        users.followers.map((follower) => (
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
                        users && users.following.length > 0 ?
                        users.following.map((follow) => (
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

export default UserProfile;