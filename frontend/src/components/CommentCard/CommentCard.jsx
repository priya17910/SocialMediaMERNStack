import React from 'react';
import './CommentCard.css';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentOnPosts} from '../../actions/postAction';
import { getFollowingPost, getMyPosts, getUserPosts } from '../../actions/userAction';


const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount,
}) => {
    
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const deleteCommentHandler = async () => {
        await dispatch(deleteCommentOnPosts(postId, commentId));
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
            dispatch(getUserPosts(userId));
        }
    };
    return (
    <div className='commentUser'>
        <Link to={`/user/${userId}`}>
            <img src={avatar} alt={name} />
            <Typography style={{minWidth: "6vmax"}}>{name}</Typography>
        </Link>
        <Typography>
            {comment}
        </Typography>
        {
            isAccount === "account" ?
            (
                <Button onClick={deleteCommentHandler}>
                    <Delete />
                </Button>
            )
            :
            userId === user._id ? 
            (
                <Button onClick={deleteCommentHandler}>
                    <Delete />
                </Button>
            )
                :
                null
        }
    </div>
  );
};

export default CommentCard;