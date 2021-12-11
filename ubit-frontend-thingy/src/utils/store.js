import { configureStore } from '@reduxjs/toolkit'
import auth from './redux-auth'

export default configureStore({
  reducer: {
    auth: auth,
  },
})