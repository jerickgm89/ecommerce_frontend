import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    phoneArea: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    provinceAddress: '',
    identifierName: ''
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