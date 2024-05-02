import { createSlice } from "@reduxjs/toolkit";
import UserType from "../Types/UserType";

const initialState = <UserType>{
    isLogin: false,
    name: "",
    accessToken: "",
};

const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn(state, action) {
            state.name = action.payload.name;
            state.accessToken = action.payload.accessToken;

            state.isLogin = state.name !== "" && state.accessToken !== "";
        },
        logOut(state, action) {

        }
    }
});

export const {logIn, logOut} = UserSlice.actions;

export default UserSlice.reducer;