import React, { useEffect } from 'react'
import './Home.css'
import User from '../User/User'
import Post from '../Post/Post'
import image from '../../assets/image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getFollowingPost } from '../../actions/userAction';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';

const Home = () => {
    const dispatch = useDispatch();

    const { loading, posts, error } = useSelector(
        (state) => state.postOfFollowing
    );

    const {error: likeError, message} = useSelector((state) =>  state.like);
    const alert = useAlert();
    
    const { users, loading: usersLoading } = useSelector((state) => state.allUsers);


    useEffect(() => {
        dispatch(getFollowingPost());
        dispatch(getAllUsers());
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
    },[alert, error, likeError, message, dispatch]);

    return loading === true || usersLoading === true ? (
        <Loader />
      ) :
      (
        <div className="home">
          <div className="homeleft">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
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
                    isAccount="home"
                />
              ))
            ) : (
              <Typography variant="h6">No posts yet</Typography>
            )}
          </div>
          <div className="homeright">
                {
                    users && users.length > 0 ?
                    users.map((user) => (
                        <User
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        avatar={user.avatar.url} //user.avatar.url
                        />
                    )) : (
                        <Typography variant='h6'>No Users Yet</Typography>
                    )
                }
          </div>
        </div>
      );


}

export default Home