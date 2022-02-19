import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL PRODUCTS 
        getProductRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        getProductFailure: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },
        //DELETE PRODUCT
        deleteProductRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.products = true;
        },
        //UPDATE PRODUCT
        updateProductRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product;
        },
        updateProductFailure: (state) => {
            state.isFetching = false;
            // state.products = true;
        },
        //ADD NEW PRODUCT
        addProductRequest: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload);
        },
        addProductFailure: (state) => {
            state.isFetching = false;
            state.products = true;
        },
    },
});

export const {
    getProductRequest,
    getProductSuccess,
    getProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductRequest,
    updateProductSuccess,
    updateProductFailure,
    addProductRequest,
    addProductSuccess,
    addProductFailure,
} = productSlice.actions;

export default productSlice.reducer;