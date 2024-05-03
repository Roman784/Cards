import { configureStore } from '@reduxjs/toolkit';
import editableModuleReducer from './editableModuleSlice';
import userReducer from './userSlice';
import openedModuleReducer from './openedModuleSlice';

export default configureStore({
    reducer: {
        editableModule: editableModuleReducer,
        user: userReducer,
        openedModule: openedModuleReducer
    }
});
