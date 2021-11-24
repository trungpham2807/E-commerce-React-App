import axios from "axios";

const BASE_URL = "http://localhost:5000/api"
// trung1
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTY3ODBiMWI3OWI1ODc4Y2JjNjI2YiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Mzc3NzU2MDcsImV4cCI6MTYzODAzNDgwN30.p0lXkl-hNjasW4tflRBZCMbohHxU5ZeiPNQrYFaJra4"
export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer${TOKEN} `}

})