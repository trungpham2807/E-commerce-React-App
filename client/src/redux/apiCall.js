import {loginFailure, loginStart, loginSuccess, registerSuccess, registerFailure, registerStart} from "./userRedux"
import {publicRequest} from "../apiService"
import {userRequest} from "../apiService"
// username, password
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await userRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}
// username, email, password
export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try{
        const res = await userRequest.post("/auth/register", user);
        dispatch(registerSuccess());
    }catch(err){
        dispatch(registerFailure())
    }
}
