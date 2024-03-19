import { createReducer } from "@reduxjs/toolkit";
const initialState = {}
export const userReducer = createReducer(initialState, {
    LoginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    RegisterRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    LoadUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LoadUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    },

    LogoutUserRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    LogoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },

    clearErrors: (state) => {
        state.error = null;
    },
});



export const postOfFollowingReducer = createReducer(initialState,{
    PostOfFollowingRequest: (state) => {
        state.loading = true;
    },
    PostOfFollowingSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    PostOfFollowingFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});


export const allUsersReducer = createReducer(initialState,{
    AllUsersRequest: (state) => {
        state.loading = true;
    },
    AllUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    AllUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});


export const userProfileReducer = createReducer(initialState,{
    UserProfileRequest: (state) => {
        state.loading = true;
    },
    UserProfileSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    UserProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
});