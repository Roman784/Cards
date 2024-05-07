import { createSlice } from "@reduxjs/toolkit";
import IUser from "../types/IUser";

const initialState = <IUser>{
    isLogin: false,
    id: -1,
    name: "",
    accessToken: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logIn(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.accessToken = action.payload.accessToken;

            state.isLogin = state.name !== "" && state.accessToken !== "" && state.id > -1;
        },
        logOut(state) {
            state.isLogin = initialState.isLogin;
            state.id = initialState.id;
            state.name = initialState.name;
            state.accessToken = initialState.accessToken;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;