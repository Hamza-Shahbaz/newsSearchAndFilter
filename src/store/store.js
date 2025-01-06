import { configureStore } from '@reduxjs/toolkit';

// Example: Reducers for the store
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
