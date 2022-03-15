import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  privateKey: '',
  publicKey: '',
  token: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPrivateKey: (state, action) => {
      state.privateKey = action.payload;
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});
export const {
  setName,
  setEmail,
  setToken,
  setPrivateKey,
  setPublicKey,
} = homeSlice.actions;

export const name = state => state.home.name;
export const email = state => state.home.email;
export const privateKey = state => state.home.privateKey;
export const publicKey = state => state.home.publicKey;
export const token = state => state.home.token;

export default homeSlice.reducer;
