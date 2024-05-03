import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    moduleId: <number>-1
};

const openedModuleSlice = createSlice({
    name: 'openedModule',
    initialState: initialState,
    reducers: {
        setModule(state, action) {
            state.moduleId = action.payload;
        }
    }
});

export const {setModule} = openedModuleSlice.actions;

export default openedModuleSlice.reducer;