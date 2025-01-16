import { configureStore } from '@reduxjs/toolkit';
import userReducer from './redux/UserSlice';

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
