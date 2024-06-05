import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        unansweredCount: 0,
        reviewsCount: 0,
    },
    reducers: {
        setUnansweredCount: (state, action) => {
            state.unansweredCount = action.payload;
        },
        setReviewsCount: (state, action) => {
            state.reviewsCount = action.payload;
        },
    }
});

export const { 
    setUnansweredCount,
    setReviewsCount,
} = notificationsSlice.actions;