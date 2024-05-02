import { configureStore } from '@reduxjs/toolkit';
import editableModuleReducer from './editableModuleSlice';
import userReducer from './userSlice';

export default configureStore({
    reducer: {
        editableModule: editableModuleReducer,
        user: userReducer
    }
});
