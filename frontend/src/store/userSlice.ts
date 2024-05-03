import { createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

const initialState = <UserType>{
    isLogin: false,
    name: "",
    accessToken: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn(state, action) {
            state.name = action.payload.name;
            state.accessToken = action.payload.accessToken;

            state.isLogin = state.name !== "" && state.accessToken !== "";
        },
        logOut(state) {
            state.isLogin = initialState.isLogin;
            state.name = initialState.name;
            state.accessToken = initialState.accessToken;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;