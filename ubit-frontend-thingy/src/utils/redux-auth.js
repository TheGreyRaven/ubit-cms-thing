import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'auth',
  initialState: {
    authed: false,
    role: 'User',
    jwt: null,
    posts: []
  },
  reducers: {
    logout: state => { // Remove all auth data
      state.authed = false
      state.role = 'user'
      state.jwt = null
    },
    signin: (state, action) => { // Set authed to true and store the role plus JWT so we can use it later.
      state.authed = true
      state.role = action.payload.role
      state.jwt = action.payload.jwt
    },
    savePosts: (state, action) => { // Cache all posts
      state.posts = action.payload
    }
  },
})

export const { logout, signin, savePosts } = slice.actions

export const getAuthed = state => state.auth.authed
export const getRole = state => state.auth.role
export const getJWT = state => state.auth.jwt
export const getPosts = state => state.auth.posts

export default slice.reducer