import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        unansweredCount: 0,
    },
    reducers: {
        setUnansweredCount: (state, action) => {
            state.unansweredCount = action.payload;
        },
    }
});

export const { 
    setUnansweredCount, 
} = notificationsSlice.actions;