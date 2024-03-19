import React, {useState} from 'react';
import './Search.css';
import { Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userAction';
import User from '../User/User';

const Search = () => {
    const [name, setName] = useState("");
    const { users, loading } = useSelector((state) => state.allUsers);
    const dispatch = useDispatch();
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(getAllUsers(name));
    };
    return (
    <div className='search'>
        <form className='search' onSubmit={submitHandler}>
            <Typography variant='h3' style={{padding: "2vmax"}}>Tea Chat</Typography>


            <input 
                type="text"
                className='searchInputs'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Search Here...'
                required
            />

            <Button disabled={loading} type='submit' variant="outlined" style={{fontFamily: "cursive"}}>Search</Button>
            <div className='searchResults'>
            {
                users && users.map((user) => (
                    <User 
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        avatar={user.avatar.url}
                    />
                ))
            }
        </div>
        </form>
    </div>
  )
}

export default Search