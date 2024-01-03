import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    token: '',
    isloggedin: false,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login(state, action) {
        state.token = action.payload;
        state.isloggedin = true;
      },
      logout(state) {
        state.token = '';
        state.isloggedin = false;
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;
  export default authSlice.reducer;