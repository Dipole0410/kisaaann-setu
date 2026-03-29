import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authslice.js';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: {
    auth: {
      token: localStorage.getItem('token'),
      user: readStoredUser(),
      loading: false,
    },
  },
});
