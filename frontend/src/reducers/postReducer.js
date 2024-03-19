import { createReducer } from "@reduxjs/toolkit"

const initialState = {}
export const likeReducer = createReducer(initialState, {
    LikeRequest: (state) => {
        state.loading = true;
    },
    LikeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    LikeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    AddCommentRequest: (state) => {
        state.loading = true;
    },
    AddCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    AddCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    DeleteCommentRequest: (state) => {
        state.loading = true;
    },
    DeleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DeleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    NewPostRequest: (state) => {
        state.loading = true;
    },
    NewPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    NewPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    UpdateCaptionRequest: (state) => {
        state.loading = true;
    },
    UpdateCaptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    UpdateCaptionFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    DeletePostRequest: (state) => {
        state.loading = true;
    },
    DeletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DeletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    UpdateProfileRequest: (state) => {
        state.loading = true;
    },
    UpdateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    UpdateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    UpdatePasswordRequest: (state) => {
        state.loading = true;
    },
    UpdatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    UpdatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    DeleteProfileRequest: (state) => {
        state.loading = true;
    },
    DeleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    DeleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    ForgotPasswordRequest: (state) => {
        state.loading = true;
    },
    ForgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    ForgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    ResetPasswordRequest: (state) => {
        state.loading = true;
    },
    ResetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    ResetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    FollowUserRequest: (state) => {
        state.loading = true;
    },
    FollowUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    FollowUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    clearErrors: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});


export const myPostsReducer = createReducer(initialState, {
    MyPostsRequest: (state) => {
        state.loading = true;
    },
    MyPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    MyPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});


export const userPostsReducer = createReducer(initialState, {
    UserPostsRequest: (state) => {
        state.loading = true;
    },
    UserPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    UserPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});