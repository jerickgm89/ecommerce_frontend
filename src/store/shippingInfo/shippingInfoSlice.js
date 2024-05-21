import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: ''
};

const shippingInfoSlice = createSlice({
    name: 'shippingInfo',
    initialState,
    reducers: {
        setShippingInfo: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearShippingInfo: () => initialState
    }
});

export const { setShippingInfo, clearShippingInfo } = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;
