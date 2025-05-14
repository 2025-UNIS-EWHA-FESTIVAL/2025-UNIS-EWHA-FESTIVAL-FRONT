import axios from "axios";

const Api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'no-cache',
    },
    withCredentials: false 
})

export default Api;