import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./reducers/userReducer";
import { likeReducer, myPostsReducer, userPostsReducer } from "./reducers/postReducer";
const store = configureStore({
    reducer: {
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userPosts: userPostsReducer,
        userProfile: userProfileReducer,
    },
});

export default store;