import { configureStore } from '@reduxjs/toolkit';
import editableModuleReducer from './editableModuleSlice';

export default configureStore({
    reducer: {
        editableModule: editableModuleReducer,
    }
});
