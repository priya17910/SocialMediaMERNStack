import Login from './components/Login/Login';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import NewPost from './components/NewPost/NewPost';
import Register from './components/Register/Register';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UserProfile from './components/UserProfile/UserProfile';
import Search from './components/Search/Search';
import NotFound from './components/NotFound/NotFound';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
          dispatch(loadUser());
    },[dispatch]);

    const { isAuthenticated } = useSelector((state) => state.user);


    return (
    <div className="App">
      <Router>
          {
              isAuthenticated && <Header />
          }
          <Routes>
            <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
            <Route path='/account' element={isAuthenticated ? <Account /> : <Login />} />
            <Route path='/newpost' element={isAuthenticated ? <NewPost /> : <Login />} />
            <Route path='/register' element={isAuthenticated ? <Account /> : <Register />} />
            <Route path='/update/profile' element={isAuthenticated ? <UpdateProfile /> : <Login />} />
            <Route path='/update/password' element={isAuthenticated ? <UpdatePassword /> : <Login />} />
            <Route path='/forgot/password' element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />} />
            <Route path='/password/reset/:token' element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />} />
            <Route path='/user/:id' element={isAuthenticated ? <UserProfile /> : <Login />} />
            <Route path='/search' element={<Search />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
