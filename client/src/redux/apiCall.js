import {loginFailure, loginStart, loginSuccess} from "./userRedux"
import {publicRequest} from "../request"
// username, password
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}
// username, email, password
// export const register = async (dispatch, user) => {
//     dispatch(registerStart());
//     try{
//         const res = await publicRequest.post("/auth/register", user);
//         dispatch(registerSuccess());
//     }catch(err){
//         dispatch(registerFailure())
//     }
// }
