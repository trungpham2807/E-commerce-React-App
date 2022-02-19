import { loginFailure, loginStart, loginSuccess, } from "./userRedux";
import {publicRequest, userRequest} from "../apiService";
import { 
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
    } from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductRequest());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure())
    }
};

export const deleteProducts = async (id, dispatch) => {
    dispatch(deleteProductRequest());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure())
    }
};

export const updateProducts = async (id, title, price, stock, img, dispatch) => {
    dispatch(updateProductRequest());
    try {
        console.log("update product",id, title, price, stock, img);
        const res = await userRequest.put(`/products/${id}`, {title, price, stock, img});
        console.log(res, 'result update product');
        // dispatch(updateProductSuccess({id, product}));
    } catch (err) {
        console.log("err", err);
        dispatch(updateProductFailure())
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductRequest());
    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};