import React, {useState, useEffect} from 'react'
import './ResetPassword.css'
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { resetPassword } from '../../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const {error, loading, message} = useSelector((state) => state.like);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword));
        navigate("/");
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
    <div className='resetPassword'>
        <form 
            className='resetPasswordForm' 
            onSubmit={submitHandler}
        >
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>

            <input 
                type="password" 
                placeholder='Enter New Password' 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className='resetPasswordInputs'
                required 
            />
            <Link to='/'>
                <Typography sx={{color: 'lightcoral'}}>Login</Typography>
            </Link>
            <Link to='/forgot/password'>
                <Typography sx={{color: 'lightcoral'}}>
                    Request Another Token!
                </Typography>
            </Link>
            <Button disabled={loading} type='submit' variant='outlined'>Reset Password</Button>
        </form>
    </div>
  )
}

export default ResetPassword