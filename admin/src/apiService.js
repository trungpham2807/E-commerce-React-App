import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log(user);
const currentUser = user && JSON.parse(user).currentUser;
console.log(currentUser);
const TOKEN = currentUser?.accessToken;
// console.log("Token", TOKEN);
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    user: currentUser,
    headers: {token: `Bearer ${TOKEN}`},
});