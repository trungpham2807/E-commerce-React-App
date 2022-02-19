import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice ({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        removeProduct: (state, action) => {
            state.quantity -= 1
            state.products = state.products.filter(item => item._id !== action.payload._id)
            state.total -= action.payload.price * action.payload.quantity;
        },
        resetCart: (state) => {
            state.quantity = 0
            state.products = []
            state.total = 0
        },
        remQuant: (state, action) => {
            state.products = state.products.map(item => (item._id === action.payload._id) ? {...item, quantity: item.quantity -= 1} : {...item})
            state.total = state.products.map((item) => {
                return item.quantity * item.price
            }).reduce((sum, quantity) => sum + quantity)
        },
        addQuant: (state, action) => {
            state.products = state.products.map(item => (item._id === action.payload._id) ? {...item, quantity: item.quantity += 1} : {...item})
            state.total = state.products.map((item) => {
                return item.quantity * item.price
            }).reduce((sum, quantity) => sum + quantity)
        },
    }
});

export const {addProduct, resetCart, remQuant, addQuant, removeProduct} = cartSlice.actions
export default cartSlice.reducer;