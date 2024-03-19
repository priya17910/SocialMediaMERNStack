import React, { useEffect, useState } from 'react'
import './Post.css'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Typography, Button, Dialog } from '@mui/material'
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {addCommentOnPost, deleteComment, deletePost, likePost, updateCaptionPost} from '../../actions/postAction'
import { getFollowingPost, getMyPosts, getUserPosts, loadUser } from '../../actions/userAction';
import image from '../../assets/image.jpg';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard'

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = "home",
}) => {

    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);

    const params = useParams();

    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);
    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount === "account")
        {
            dispatch(getMyPosts());
        }
        else if (isAccount === "home")
        {
            dispatch(getFollowingPost());
        }
        else
        {
            dispatch(getUserPosts(params.id));
        }
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));

        if (isAccount === "account")
        {
            dispatch(getMyPosts());
        }
        else if (isAccount === "home")
        {
            dispatch(getFollowingPost());
        }
        else
        {
            dispatch(getUserPosts(params.id));
        }
    };



    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updateCaptionPost(captionValue, postId));
        dispatch(getMyPosts());
    };


    const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
    };

    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id)
            {
                setLiked(true);
            }
        });
    },[likes, user._id]);
    return (
    <div className='post'>
        <div className='postHeader'>
            {
                isAccount === 'account' ? 
                    (
                        <Button onClick={() => setCaptionToggle(!captionToggle)}>
                            <MoreVert />
                        </Button> 
                    )
                    : 
                    null
            }
        </div>
            <img src={postImage} alt="Post" />
            <div className='postDetails'>
                <Avatar src={ownerImage} alt='User' 
                    sx={{
                        height: "3vmax",
                        width: "3vmax",
                    }}
                />
                <Link to={ `/user/${ownerId}` }>
                    <Typography fontWeight={500} fontSize={10} marginTop={0}>{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    fontSize={15}
                    color='rgba(0, 0, 0, 0.582)'
                    style={{ alignSelf: "center", margin: "0" }}
                    >
                    {caption}
                </Typography>
            </div>
            <button style={{
                    backgroundColor: "white",
                    border: "none",
                    cursor: "pointer",
                    margin: "1vmax 2vmax"
                }}
                onClick={() => setLikesUser(true)}
                disabled={likes.length === 0 ? true : false}
            >
                <Typography fontSize={12} lineHeight={0.5}>
                    {likes.length} Likes
                </Typography>
            </button>
            <div className='postFooter'>
                <Button onClick={handleLike}>
                    {
                        liked ? <Favorite style={{color: 'lightcoral'}} /> : <FavoriteBorder />
                    }
                </Button>
                <Button onClick={() => setCommentToggle(!commentToggle)}>
                    <ChatBubbleOutline />
                </Button>
                    {
                        isDelete ? (
                        <Button onClick={deletePostHandler}>
                            <DeleteOutline />
                        </Button>) : null
                    }
            </div>
            <Dialog
                style={{backgroundColor: 'lightsteelblue'}}
                open = {likesUser} 
                onClose={() => setLikesUser(!likesUser)}>
                <div className='DialogBox'>
                    <Typography variant='h4'>Liked By: </Typography>
                    {
                        likes.map((like) => (
                            <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url} //user.avatar.url
                        />
                        ))
                    }
                </div>
            </Dialog>
            <Dialog
                style={{backgroundColor: 'lightsteelblue'}}
                open = {commentToggle} 
                onClose={() => setCommentToggle(!commentToggle)}
            >
                <div className='DialogBox'>
                    <Typography variant='h4'>Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                        <input 
                            type="text" 
                            value={commentValue} 
                            onChange={(e) => setCommentValue(e.target.value)} 
                            placeholder='Comment Here...'
                            required
                        />
                        <button type='submit'>Add</button>
                    </form>
                    {
                        comments.length > 0 ? comments.map((item) => (
                            <CommentCard
                                key={item._id}
                                userId={item.user._id} 
                                name={item.user.name}
                                avatar={item.user.avatar.url}//{item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                        )) :
                        <Typography variant='h6'>No Comments Yet</Typography>
                    }
                </div>
            </Dialog>

            <Dialog
                style={{backgroundColor: 'lightsteelblue'}}
                open = {captionToggle} 
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className='DialogBox'>
                    <Typography variant='h4'>Update Caption</Typography>
                    <form className='commentForm' onSubmit={updateCaptionHandler}>
                        <input 
                            type="text" 
                            value={captionValue} 
                            onChange={(e) => setCaptionValue(e.target.value)} 
                            placeholder='Caption Here...'
                            required
                        />
                        <button type='submit'>Update</button>
                    </form>
                    
                </div>
            </Dialog>       
    </div>
  )
}

export default Post